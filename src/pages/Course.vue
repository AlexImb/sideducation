<template>
  <div class="p-6">
    <section class="flex flex-col md:flex-row justify-between">
      <h1 v-if="course" class="text-2xl font-semibold text-gray-900">
        {{ course.title }}
      </h1>

      <div v-if="course" class="flex items-center cursor-pointer">
        <Checkbox v-model="isTeacher" />
        <span @click="isTeacher = !isTeacher">Toggle between the teacher and student view</span>
      </div>
    </section>

    <section v-if="course" class="my-4 text-gray-700">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Modules</h2>
        <button v-if="isTeacher" class="btn">Edit methods</button>
        <button v-else class="btn">Resume learning</button>
      </div>
      <article
        v-for="courseModule in visibleCourseModules"
        :key="courseModule.id"
        class="course-module"
      >
        <div
          class="flex justify-between items-center py-3"
          @click="$set(courseModule, 'expanded', !courseModule.expanded)"
        >
          <div class="w-6 mr-4">
            <Icon v-if="courseModule.expanded" :path="mdiChevronUp" />
            <Icon v-else :path="mdiChevronRight" />
          </div>

          <div class="flex-auto">{{ courseModule.title }}</div>

          <div class="actions flex">
            <div v-if="isTeacher && !courseModule.hiddenForStudent" class="w-6 mr-4">
              <Icon :path="mdiChartTimelineVariantShimmer" />
            </div>
            <div v-if="isTeacher" class="w-6">
              <Icon v-if="courseModule.hiddenForStudent" :path="mdiEyeOff" />
              <Icon v-else :path="mdiEye" />
            </div>
          </div>
        </div>

        <div v-if="courseModule.expanded" class="py-2 border-t">
          <div
            v-for="material in courseModule.materials"
            :key="material.id"
            class="p-3 ml-8 border-b text-gray-700"
          >
            {{ material.title }}
          </div>
          <div v-if="!isTeacher" class="text-right mt-4">
            <button class="btn">Learn module</button>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import {
  mdiChevronRight,
  mdiChevronUp,
  mdiEye,
  mdiEyeOff,
  mdiChartTimelineVariantShimmer,
} from '@mdi/js';
import { firebaseAuth, firestore } from '@/services/firebase';
import Checkbox from '@/components/Checkbox';

export default {
  components: { Checkbox },
  data() {
    return {
      course: null,
      courseModules: null,
      mockMaterials: [
        {
          id: 1,
          title: 'Lecture slides',
        },
        {
          id: 2,
          title: 'Research papers',
        },
        {
          id: 3,
          title: 'Educational videoclips',
        },
      ],
      isTeacher: true,
      user: firebaseAuth.currentUser,
      mdiChevronRight,
      mdiChevronUp,
      mdiEye,
      mdiEyeOff,
      mdiChartTimelineVariantShimmer,
    };
  },
  computed: {
    visibleCourseModules() {
      if (this.isTeacher) return this.courseModules;
      return this.courseModules.filter(cm => !cm.hiddenForStudent);
    },
  },
  created() {
    this.id = this.$route.params.id;
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
            this.fetchCourseModules();
          } else {
            this.$router.replace({ name: 'overview' });
          }
        });
    },

    fetchCourseModules() {
      firestore
        .collection(`courses/${this.id}/modules`)
        .orderBy('order')
        .onSnapshot(courseModules => {
          this.courseModules = [];
          courseModules.forEach(courseModule =>
            this.courseModules.push({
              id: courseModule.id,
              ...courseModule.data(),
              materials: this.mockMaterials,
            }),
          );
        });
    },
  },
};
</script>

<style lang="postcss" scoped>
.course-module {
  @apply p-4
  my-4
  bg-white
  font-semibold
  shadow
  rounded-lg
  cursor-pointer;
}
</style>
