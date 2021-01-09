<template>
  <div class="flex flex-col min-h-screen overflow-auto bg-gray-100 ">
    <the-header :is-auth="!!user" />
    <main class="flex-grow">
      <router-view />
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import { firebaseAuth, firestore } from '@/services/firebase';
export default {
  components: { TheHeader, TheFooter },
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
