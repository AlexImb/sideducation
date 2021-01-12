<template>
  <div v-if="course" class="p-6">
    <section class="flex flex-col md:flex-row justify-between">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ course.title }}
      </h1>

      <div class="flex items-center cursor-pointer">
        <Checkbox v-model="isTeacher" />
        <span @click="isTeacher = !isTeacher">Toggle between the teacher and student view</span>
      </div>
    </section>

    <section v-if="isTeacher" class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
      <div class="card h-32 bg-indigo-400">
        <div class="text-5xl">38</div>
        <div>students enrolled</div>
      </div>
      <div class="card h-32 bg-green-400">
        <div class="text-5xl">
          7
          <span class="text-2xl">/ 8</span>
        </div>
        <div>modules visible to students</div>
      </div>
      <div class="card h-32 bg-purple-400">
        <div class="text-5xl">
          4
          <span class="text-2xl">/ 5</span>
        </div>
        <div>learning methods active</div>
      </div>
      <div class="card h-32 bg-yellow-300">
        <div class="text-5xl">58%</div>
        <div>estimated retention rate</div>
      </div>
      <div class="card h-32 bg-red-400">
        <div class="text-5xl">4</div>
        <div>students without recent activity</div>
      </div>
    </section>

    <section v-if="isTeacher" class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
      <div class="md:col-span-3 card bg-white">
        <div class="mb-2">Aggregated course activity</div>
        <ActivityLineChart :chart-data="activityChartData" />
      </div>
      <div class="md:col-span-2 card bg-white">
        <div class="mb-2">Learning methods</div>
        <MethodsRadarChart :chart-data="methodsRadaData" />
      </div>
    </section>
    <section v-else class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
      <div class="md:col-span-3 card bg-white">
        <div class="mb-2">Learning activity</div>
        <ActivityLineChart :chart-data="activityChartData" />
      </div>
      <div class="md:col-span-2 card bg-white">
        <div class="mb-2">Learning methods</div>
        <MethodsRadarChart :chart-data="methodsRadaData" />
      </div>
    </section>

    <section class="my-4 text-gray-700">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Modules</h2>
        <router-link
          v-if="!isTeacher"
          tag="button"
          class="btn"
          :to="{ name: 'learn', params: { id, qid: 1 } }"
        >
          Resume learning
        </router-link>
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

          <div v-if="!isTeacher" class="flex items-center">
            <ProgressBar :splits="courseModule.progress.splits" class="hidden md:flex w-64 mr-4" />
            <div>{{ getModuleTotalProgress(courseModule.progress.splits) }}%</div>
          </div>

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

        <transition enter-class="opacity-0" leave-class="opacity-0">
          <div v-if="courseModule.expanded" class="py-2 border-t duration-200">
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
        </transition>
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
import MethodsRadarChart from '@/components/charts/MethodsRadarChart';
import ActivityLineChart from '@/components/charts/ActivityLineChart';
import ProgressBar from '@/components/charts/ProgressBar';

export default {
  components: { Checkbox, MethodsRadarChart, ActivityLineChart, ProgressBar },
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

    methodsRadaData() {
      return this.isTeacher
        ? {
            labels: ['Method 1', 'Method 2', 'Method 3', 'Method 4', 'Method 5'],
            datasets: [
              {
                label: 'Frequency',
                backgroundColor: 'rgb(250,204,21,0.75)',
                borderColor: '#FACC15',
                pointBackgroundColor: '#FACC15',
                data: [0.3, 0.4, 0, 0.41, 0.35],
              },
              {
                label: 'Correctness',
                backgroundColor: 'rgb(99,102,241,0.5)',
                borderColor: '#6366F1',
                pointBackgroundColor: '#6366F1',
                data: [0.6, 0.7, 0, 0.6, 0.5],
              },
            ],
          }
        : {
            labels: ['Method 1', 'Method 2', 'Method 3', 'Method 4'],
            datasets: [
              {
                label: 'Frequency',
                backgroundColor: 'rgb(250,204,21,0.75)',
                borderColor: '#FACC15',
                pointBackgroundColor: '#FACC15',
                data: [0.25, 0.25, 0.25, 0.25],
              },
              {
                label: 'Correctness',
                backgroundColor: 'rgb(99,102,241,0.5)',
                borderColor: '#6366F1',
                pointBackgroundColor: '#6366F1',
                data: [0.55, 0.65, 0.78, 0.85],
              },
            ],
          };
    },
    activityChartData() {
      return this.isTeacher
        ? {
            labels: ['11-01', '12-01', '13-01', '14-01', '15-01'],
            datasets: [
              {
                label: 'Questions answered correctly',
                backgroundColor: '#6366F1',
                data: [23, 20, 32, 13, 33],
              },
              {
                label: 'Questions displayed',
                backgroundColor: '#FACC15',
                data: [38, 22, 47, 20, 43],
              },
            ],
          }
        : {
            labels: ['11-01', '12-01', '13-01', '14-01', '15-01'],
            datasets: [
              {
                label: 'Questions answered correctly',
                backgroundColor: '#6366F1',
                data: [0, 4, 11, 0, 0],
              },
              {
                label: 'Questions displayed',
                backgroundColor: '#FACC15',
                data: [0, 5, 13, 0, 0],
              },
            ],
          };
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
              progress: {
                splits: [
                  {
                    label: 'Method 1',
                    percentage: Math.random() * (0.2 - 0.1) + 0.1,
                    color: 'bg-indigo-400',
                  },
                  {
                    label: 'Method 2',
                    percentage: Math.random() * (0.3 - 0.1) + 0.1,
                    color: 'bg-blue-400',
                  },
                  {
                    label: 'Method 3',
                    percentage: Math.random() * (0.3 - 0.1) + 0.1,
                    color: 'bg-red-400',
                  },
                  {
                    label: 'Method 4',
                    percentage: Math.random() * (0.3 - 0.1) + 0.1,
                    color: 'bg-green-400',
                  },
                ],
              },
            }),
          );
        });
    },

    getModuleTotalProgress(splits) {
      return Math.min(
        Math.floor(splits.reduce((acc, split) => acc + split.percentage, 0) * 100),
        100,
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply p-6 rounded-lg shadow font-semibold text-gray-700;
}
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
