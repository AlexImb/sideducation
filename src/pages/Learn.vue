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
    <template v-if="qid == 1">
      <a
        href="https://learning.subwiki.org/wiki/Feynman_technique"
        class="font-semibold text-sm text-gray-600 italic mt-10"
      >
        Uses: The Feynman Learning Technique
      </a>
      <div class="font-semibold text-gray-700 mt-10">Read the following material</div>
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
    <template v-else-if="qid === 2">
      <a
        href="https://www.researchgate.net/publication/46542890_Evaluating_linear-nonlinear_thinking_style_for_knowledge_management_education"
        class="font-semibold text-sm text-gray-600 italic mt-10"
      >
        Uses: Linear Thinking Learning Process
      </a>
      <div class="font-semibold text-gray-700 mt-6">Read the following material</div>
      <section class="card bg-white mt-4" style="height: 60vh">
        <embed :src="`/pdf/${qid}.pdf`" class="w-full h-full" />
      </section>
      <section class="card bg-white mt-4">
        <div>
          Solve the following tasks in order:
        </div>
        <ol>
          <li class="todo-item">
            <Checkbox v-model="todos[1]" />
            1. Read the abstract
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[2]" />
            2. Read the introduction
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[3]" />
            3. Read the research questions
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[4]" />
            4. Read the conclusion
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[5]" />
            5. Read the rest of the section
          </li>
        </ol>
      </section>
    </template>
    <template v-else-if="qid === 3">
      <a
        href="https://en.wikipedia.org/wiki/Visual_learning"
        class="font-semibold text-sm text-gray-600 italic mt-10"
      >
        Uses: Visual Learning Style, Questioning
      </a>
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
        <div>
          Based on the video you just watch, write a question and 4 answers out of which only one is
          correct. You will be asked to answer this question sometime in the future.
        </div>
        <div class="mt-4">Question</div>
        <textarea
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your question"
        ></textarea>
        <div class="mt-4">Correct Answer</div>
        <input
          type="text"
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        />
        <div class="mt-4">Wrong Answer 1</div>
        <input
          type="text"
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        />
        <div class="mt-4">Wrong Answer 2</div>
        <input
          type="text"
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        />
        <div class="mt-4">Wrong Answer 3</div>
        <input
          type="text"
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        />
      </section>
    </template>
    <template v-else-if="qid === 4">
      <a
        href="https://en.wikipedia.org/wiki/Flashcard"
        class="font-semibold text-sm text-gray-600 italic mt-10"
      >
        Uses: Flashcard, Quiz
      </a>
      <div class="font-semibold text-gray-700 mt-6">Answer the following question</div>
      <section class="card bg-white mt-4">
        Describe how recommender systems work for E-Commerce shops?
        <textarea
          class="w-full h-full border rounded-lg p-4"
          placeholder="Type your answer"
        ></textarea>
      </section>
    </template>
    <template v-else-if="qid === 5">
      <a
        href="https://en.wikipedia.org/wiki/Spaced_repetition"
        class="font-semibold text-sm text-gray-600 italic mt-10"
      >
        Uses: Flashcard, Spaced repetition
      </a>
      <div class="font-semibold text-gray-700 mt-6">Answer the following question</div>
      <section class="card bg-white mt-4">
        What are the two main parts of the Value Proposition Canvas?
        <ol>
          <li class="todo-item">
            <Checkbox v-model="todos[1]" />
            Values, Propositions
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[2]" />
            Value Proposition, Channels
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[3]" />
            Roadmanp, Value Proposition
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[4]" />
            Value Proposition, Methods
          </li>
          <li class="todo-item">
            <Checkbox v-model="todos[5]" />
            Customer Profile, Value Map
          </li>
        </ol>
      </section>
    </template>
    <template v-else>
      <a
        href="https://en.wikipedia.org/wiki/Category:Learning_methods"
        class="font-semibold text-sm text-gray-600 italic mt-10"
      >
        Uses: Example Learning Technique or Style Used
      </a>
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
import Checkbox from '@/components/Checkbox';

export default {
  components: { ProgressBar, Checkbox },
  data() {
    return {
      course: null,
      isTeacher: true,
      user: firebaseAuth.currentUser,
      todos: {},
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

.todo-item {
  @apply flex items-center p-2 border-b;
}

.todo-item:last-child {
  @apply border-b-0;
}
</style>
