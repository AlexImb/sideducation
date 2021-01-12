<template>
  <div v-if="course" class="p-6">
    <section class="flex flex-col md:flex-row justify-between">
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ course.title }}
      </h1>
    </section>

    <section class="grid grid-cols-1 mt-10">
      <div class="card h-32 bg-white">
        <div class="text-xl">Session progress</div>
        <div class="mt-4 flex items-center">
          <ProgressBar
            :splits="[
              {
                label: 'Method 1',
                percentage: 0.56,
                color: 'bg-indigo-500',
              },
            ]"
            class="w-full mr-4"
          />
          <div>{{ Math.floor(0.56 * 100) + qid }}%</div>
        </div>
      </div>
    </section>

    <h1 class="text-2xl font-semibold text-gray-900 mt-10">Question {{ qid }}</h1>

    <template v-if="qid == 1 || qid == 2">
      <div class="font-semibold text-gray-700 mt-6">Read the following material</div>
      <section class="card bg-white mt-4" style="height: 60vh">
        <embed :src="`/pdf/${qid}.pdf`" class="w-full h-full" />
      </section>
      <div class="font-semibold text-gray-700 mt-10">Solve the following task</div>

      <section class="card bg-white mt-4">
        <div>
          Pretend you are teaching it to a student in grade 6. Explain the material you just read in
          the following box:
        </div>
        <textarea
          class="w-full h-full border rounded-lg p-4 my-4"
          placeholder="Type your answer"
        ></textarea>
      </section>
    </template>
    <template v-else-if="qid === 3">
      <div class="font-semibold text-gray-700 mt-6">Watch the following video</div>
      <section class="card bg-white mt-4 flex justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/ReM1uqmVfP0"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>
      <div class="font-semibold text-gray-700 mt-10">Solve the following task</div>
      <section class="card bg-white mt-4">
        <textarea
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        ></textarea>
      </section>
    </template>
    <template v-else>
      <div class="font-semibold text-gray-700 mt-6">Read the following material</div>
      <section class="card bg-white mt-4">Example material</section>
      <div class="font-semibold text-gray-700 mt-10">Solve the following task</div>
      <section class="card bg-white mt-4">
        Example task description
        <textarea
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        ></textarea>
      </section>
    </template>

    <section class="flex justify-end mt-10">
      <router-link tag="button" class="btn" :to="{ name: 'learn', params: { qid: qid + 1 } }">
        Continue
      </router-link>
    </section>
  </div>
  <div v-else class="p-6">Loading</div>
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
    this.qid = +this.$route.params.qid;
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
