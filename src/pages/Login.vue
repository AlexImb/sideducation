<template>
  <div class="flex justify-center items-center md:mt-16">
    <form
      class="w-full max-w-xl p-6 md:p-16 md:shadow-xl md:border md:rounded md:bg-white"
      @submit.prevent="signInWithEmailAndPassword()"
    >
      <h2 class="font-bold text-2xl text-gray-900 mb-10">
        Sign in to your account
      </h2>

      <div class="rounded-md shadow-sm md:px-2">
        <div>
          <input
            v-model="email"
            aria-label="Email address"
            name="email"
            type="email"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10"
            placeholder="Email address"
          />
        </div>
        <div class="-mt-px">
          <input
            v-model="password"
            aria-label="Password"
            name="password"
            type="password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 focus:z-10"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="my-6 px-3 flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
            Remember me
          </label>
        </div>

        <div class="text-sm leading-5">
          <router-link
            :to="{ name: 'forgot' }"
            class="font-medium text-indigo-600 hover:text-primary focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot your password?
          </router-link>
        </div>
      </div>

      <div class="md:flex md:justify-center">
        <button
          type="submit"
          class="w-full shadow bg-primary my-1 md:w-1/2 md:mx-2 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          :disabled="!email || !password"
        >
          Sign in
        </button>

        <button
          type="button"
          class="w-full shadow border border-primary my-1 md:w-1/2 md:mx-2 focus:shadow-outline focus:outline-none text-primary font-bold py-2 px-4 rounded"
          @click.prevent="() => $router.push({ name: 'register' })"
        >
          Register
        </button>
      </div>
      <social-logins />
    </form>
  </div>
</template>

<script>
import SocialLogins from '@/components/SocialLogins.vue';
import { firebaseAuth } from '@/services/firebase';
export default {
  components: {
    SocialLogins,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signInWithEmailAndPassword() {
      firebaseAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push({ name: 'overview' }))
        .catch(alert);
    },
  },
};
</script>

<style></style>
