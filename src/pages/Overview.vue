<template>
  <div>
    <div class="text-2xl font-semibold text-gray-900 p-6">
      Courses
    </div>
    <div class="flex flex-wrap">
      <template v-if="courses && courses.length">
        <div
          v-for="course in courses"
          :key="course.id"
          class="w-full p-5 my-2 mx-6 rounded-md cursor-pointer md:w-1/6 bg-white border shadow hover:shadow-md"
          @click="$router.push({ name: 'course', params: { id: course.id } })"
        >
          {{ course.title }}
        </div>
      </template>
      <div v-else class="w-full p-6">
        No courses available. Start by adding one!
      </div>

      <div
        class="w-full p-5 my-2 mx-6 shadow-md rounded-md cursor-pointer md:w-1/6 border border-indigo-700 bg-white font-semibold"
        @click="addCourse()"
      >
        Add new course
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseAuth, firestore, serverTimestamp } from '@/services/firebase';

export default {
  components: {},
  data() {
    return {
      courses: null,
    };
  },
  created() {
    this.fetchCourses();
  },
  methods: {
    fetchCourses() {
      firestore
        .collection('course')
        .where('userId', '==', firebaseAuth.currentUser.uid)
        .onSnapshot(courses => {
          this.courses = [];
          courses.forEach(course => this.courses.push({ id: course.id, ...course.data() }));
        });
    },
    addCourse() {
      firestore
        .collection('courses')
        .add({
          title: 'New course ' + new Date().toLocaleString(),
          createdAt: serverTimestamp(),
          userReference: firestore.doc(`users/${firebaseAuth.currentUser.uid}`),
          userId: firebaseAuth.currentUser.uid,
        })
        .then(course => this.$router.replace({ name: 'course', params: { id: course.id } }));
    },
  },
};
</script>
