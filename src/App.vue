<template>
  <div class="flex flex-col min-h-screen overflow-auto bg-gray-100 ">
    <div class="sticky top-0 bg-white shadow h-12">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script>
import { firebaseAuth, firestore } from './services/firebase';
export default {
  components: {},
  data() {
    return {
      user: null,
    };
  },
  computed: {},
  created() {
    firebaseAuth.onAuthStateChanged(user => {
      this.user = user;

      if (user) {
        const userDTO = {
          ...user.providerData[0],
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
        };

        firestore
          .collection('users')
          .doc(user.uid)
          .set(userDTO, { merge: true });

        if (this.$route.name === 'login') {
          this.$router.replace({ name: 'overview' });
        }
      }
    });
  },
};
</script>

<style lang="postcss">
@import '~@/app.pcss';
</style>
