<template>
  <div>
    <section class="flex justify-center text-center p-4 pt-8">
      <h1 class="font-extrabold text-gray-800 text-6xl leading-tight">
        A platform to enrich your
        <div class="text-primary">
          teaching experience
        </div>
      </h1>
    </section>

    <section class="flex justify-center text-center p-4">
      <p class="text-gray-600 text-2xl">
        Provide an alternative and adaptive learning environment for your students.
      </p>
    </section>

    <section class="flex justify-center text-center p-4">
      <router-link
        class="rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-primary hover:bg-indigo-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
        :to="{ name: 'overview' }"
      >
        Try our demo
      </router-link>
      <a
        href="#why"
        class="ml-6 rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md"
        >Why Sideducation?</a
      >
    </section>

    <section class="flex justify-center p-4 mb-16 md:px-16 lg:px-32">
      <img class="xl:w-3/4" src="/img/landing-window-teacher.png" />
    </section>

    <section class="text-center bg-gray-800 p-6 pt-12">
      <h1 class="block font-bold text-gray-100 text-4xl">
        Pricing Plans
      </h1>
      <h2 class="block font-bold text-gray-200 text-2xl mt-4">
        Flexible pricing tailored to the sive of your audience
      </h2>
    </section>

    <section class="flex flex-wrap justify-center bg-gray-800 p-8 md:p-12">
      <div class="w-full md:w-1/3 md:max-w-md md:mr-12 pricing-card">
        <h3 class="text-2xl font-bold">Department</h3>
        <p>less than 100 monthly active students</p>

        <div class="text-2xl font-bold mt-8">€15.25</div>
        <div class="text-gray-400">per person, per month, when billed yearly</div>
        <div class="text-gray-400">€14.50/person, per month, when billed monthly</div>

        <a href="#why" class="pricing-card-btn">Buy now</a>
      </div>
      <div class="w-full md:w-1/3 md:max-w-md md:mr-12 pricing-card">
        <h1 class="text-2xl font-bold">Faculty</h1>
        <p>less than 1000 monthly active students</p>
        <div class="text-2xl font-bold mt-8">€11.75</div>
        <div class="text-gray-400">per person, per month, when billed yearly</div>
        <div class="text-gray-400">€9.75/person, per month, when billed monthly</div>

        <a href="#why" class="pricing-card-btn">Buy now</a>
      </div>
      <div class="w-full md:w-1/3 md:max-w-md pricing-card">
        <h1 class="text-2xl font-bold">Institution</h1>
        <p>1000+ monthly active students</p>
        <div class="text-2xl font-bold mt-8">from €6.25</div>
        <div class="text-gray-400">
          To get a customized price estimate for your whole institution, please contact our sales
          team
        </div>

        <a href="#why" class="pricing-card-btn">Contact sales</a>
      </div>
    </section>

    <section id="why" class="flex flex-wrap justify-between px-4 py-16 md:p-24 xl:px-64">
      <img
        class="w-full md:w-1/2 object-contain md:order-last p-12"
        src="/img/landing-learning.svg"
      />
      <div class="w-full md:w-1/2">
        <h2 class="font-bold text-gray-800 text-2xl xl:text-5xl mb-4 md:mb-10">
          A learning experience platform that works!
        </h2>
        <p class="text-gray-700 text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar est bibendum
          nulla eleifend, id ultricies mauris pulvinar. Phasellus condimentum dolor non orci maximus
          semper. Nullam quis varius erat. Aliquam pellentesque iaculis lacus in vehicula. Sed
          ultricies tortor sit amet dui sollicitudin, et luctus nunc porttitor. Aenean laoreet felis
          a arcu sodales varius quis vel nisl. Fusce in metus magna.
        </p>
        <p class="text-gray-700 text-xl mt-10">
          Morbi vestibulum arcu vitae nisi ultricies gravida. Nunc elementum libero vel sapien
          euismod, consectetur hendrerit est rutrum. Donec eget bibendum felis. Etiam eu mattis
          urna, vel blandit sem. Maecenas vel odio sed ligula laoreet laoreet eu non tortor. Aliquam
          enim turpis, porttitor fermentum sem quis, maximus dictum sem. Donec sit amet porttitor
          tellus, non hendrerit urna.
        </p>

        <div class="mt-12 xl:mt-16">
          <router-link
            class="px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-primary hover:bg-indigo-600 md:text-lg xl:text-base text-white font-semibold shadow-md rounded-lg focus:outline-none"
            :to="{ name: 'overview' }"
            tag="button"
          >
            Experience the educator demo
          </router-link>
        </div>

        <div class="mt-12 xl:mt-16">
          <h2 class="font-bold text-gray-800 text-2xl xl:text-4xl mb-4 md:mb-10">
            Need more information about what Sideducation means for your institution?
            <div class="text-primary">
              We are happy to contact you.
            </div>
          </h2>
          <form v-if="!submitted" @submit.prevent="submitEmail()">
            <input
              v-model="email"
              aria-label="Email address"
              name="email"
              type="email"
              required
              class="w-2/4 md:w-1/3 rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 mr-4 border-2 focus:outline-none focus:shadow-outline-indigo focus:border-primary"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              class="px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-primary hover:bg-indigo-600 md:text-lg xl:text-base text-white font-semibold shadow-md rounded-lg focus:outline-none"
            >
              Request info
            </button>
          </form>
          <p v-else class="text-gray-700 text-xl mt-4 md:mt-6 xl:mt-10">
            Thank you for your interest! One of our sales representatives will contact you as soon
            as possible.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { firestore, serverTimestamp } from '@/services/firebase';
export default {
  components: {},
  data() {
    return {
      email: '',
      submitted: false,
    };
  },
  methods: {
    submitEmail() {
      if (!this.email) return;
      const urlParams = new URLSearchParams(window.location.search);
      firestore
        .collection('emails')
        .add({
          email: this.email,
          timestamp: serverTimestamp(),
          location: window.location.href,
          utm_source: urlParams.get('utm_source'),
          utm_medium: urlParams.get('utm_medium'),
        })
        .then(() => {
          this.submitted = true;
        })
        .catch(alert);
    },
  },
};
</script>

<style lang="postcss" scoped>
.pricing-card {
  @apply bg-white rounded-lg shadow-lg p-6 m-6;
}

.pricing-card-btn {
  @apply block 
  w-full 
  mt-8 p-4 
  text-center 
  text-white
  font-bold
  rounded-lg 
  bg-indigo-500 
  hover:bg-indigo-600 
  shadow-md;
}
</style>
