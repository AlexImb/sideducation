<template>
  <div v-if="course" class="p-6">
    <section class="flex flex-col md:flex-row justify-between">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ course.title }}
      </h1>
    </section>

    <section class="grid grid-cols-1 mt-10">
      <div class="card h-32 bg-white">
        <div class="text-xl">Week 1</div>
        <div class="mt-4 flex items-center">
          <ProgressBar :splits="[]" class="w-full mr-4" />
          <div>56%</div>
        </div>
      </div>
    </section>

    <div class="font-semibold text-gray-700 mt-10">Read the following material</div>
    <section class="card h-64 bg-white mt-4"></section>
    <div class="font-semibold text-gray-700 mt-10">Solve the following task</div>
    <section class="card h-64 bg-white mt-4"></section>

    <section class="flex justify-end mt-10">
      <button class="btn">Continue</button>
    </section>
  </div>
  <div v-else>Loading</div>
</template>

<script>
import { firebaseAuth, firestore } from '@/services/firebase';
import ProgressBar from '@/components/charts/ProgressBar';

export default {
  components: { ProgressBar },
  data() {
    return {
      course: null,
      isTeacher: true,
      user: firebaseAuth.currentUser,
    };
  },
  computed: {},
  created() {
    this.id = this.$route.params.id;
    this.qid = this.$route.params.qid;
    this.isTeacher = !this.$route.query.studentView;
    this.fetchCourse();
  },
  mounted() {
    firebaseAuth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    fetchCourse() {
      firestore
        .collection('courses')
        .doc(this.id)
        .get()
        .then(course => {
          if (course.exists) {
            this.course = { id: course.id, ...course.data() };
          } else {
            this.$router.replace({ name: 'overview' });
          }
        });
    },
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply p-6 rounded-lg shadow font-semibold text-gray-700;
}
</style>
