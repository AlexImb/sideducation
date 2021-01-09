<template>
  <div class="flex justify-center items-center md:mt-24 xl:mt-32">
    <form
      class="w-full max-w-xl p-6 md:p-16 md:shadow-xl md:border md:rounded md:bg-white"
      @submit.prevent="recover()"
    >
      <h2 class="font-bold text-2xl text-gray-900 mb-10">
        Recover your password
      </h2>
      <div class="rounded-md shadow-sm md:px-2">
        <div>
          <input
            v-model="email"
            aria-label="Email address"
            name="email"
            type="email"
            required
            class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10"
            placeholder="Email address"
          />
        </div>
      </div>

      <div class="md:flex md:justify-center mt-6">
        <button
          type="submit"
          class="w-full shadow bg-primary my-1 md:w-1/2 md:mx-1 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          :disabled="!email"
        >
          Recover
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { firebaseAuth } from '@/services/firebase';
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    recover() {
      firebaseAuth
        .sendPasswordResetEmail(this.email)
        .then(() => this.$router.push({ name: 'login' }))
        .catch(alert);
    },
  },
};
</script>

<style></style>
