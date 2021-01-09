<template>
  <header class="sticky top-0 bg-white shadow-md h-24">
    <nav class="flex items-center p-4">
      <div class="flex-1">
        <div
          v-show="isAuth && !['overview', 'landing'].includes($route.name)"
          class="flex cursor-pointer"
          @click="$router.go(-1)"
        >
          <Icon class="h-6 mx-1" :path="mdiChevronLeft" />
          <div class="m-w-10 hidden md:block">
            Go back
          </div>
        </div>
      </div>

      <div class="flex-auto flex justify-center">
        <router-link :to="{ name: isAuth ? 'overview' : 'landing' }">
          <img src="/img/brand.png" class="w-56" />
        </router-link>
      </div>

      <div class="flex-1 flex justify-end">
        <div v-if="isAuth" class="flex cursor-pointer" @click="logOut()">
          <Icon class="h-6 mx-1" :path="mdiLogoutVariant" />
          <div class="m-w-10 hidden md:block">
            Log out
          </div>
        </div>

        <div
          v-else
          class="cursor-pointer flex font-semibold p-2"
          @click="$router.push({ name: 'login' })"
        >
          <Icon class="h-6 mx-1" :path="mdiLoginVariant" />
          <div class="m-w-10 hidden md:block">
            Log in
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mdiLogoutVariant, mdiLoginVariant, mdiChevronLeft } from '@mdi/js';
import { firebaseAuth } from '@/services/firebase';

export default {
  props: { isAuth: Boolean },
  data() {
    return {
      mdiLogoutVariant,
      mdiLoginVariant,
      mdiChevronLeft,
    };
  },
  methods: {
    logOut() {
      firebaseAuth
        .signOut()
        .then(() => this.$router.replace({ name: 'login' }))
        .catch(alert);
    },
  },
};
</script>

<style scoped></style>
