<template>
  <header class="sticky top-0 bg-white shadow-md h-24">
    <nav class="flex justify-between items-center p-4">
      <div class="flex cursor-pointer w-24" @click="$router.go(-1)">
        <template v-if="isAuth && !['overview', 'landing'].includes($route.name)">
          <icon class="h-6 mx-1" :path="mdiChevronLeft" />
          <div class="m-w-10 hidden md:block">
            Go back
          </div>
        </template>
      </div>
      <router-link
        class="font-lucky text-xl leading-1"
        :to="{ name: isAuth ? 'overview' : 'landing' }"
      >
        <img src="/img/brand.png" class="h-16" />
      </router-link>

      <div v-if="isAuth" class="cursor-pointer flex" @click="logOut()">
        <icon class="h-6 mx-1" :path="mdiLogoutVariant" />
        <div class="m-w-10 hidden md:block">
          Log out
        </div>
      </div>

      <div
        v-else
        class="cursor-pointer flex font-semibold p-2"
        @click="$router.push({ name: 'login' })"
      >
        <icon class="h-6 mx-1" :path="mdiLoginVariant" />
        <div class="m-w-10 hidden md:block">
          Log in
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
