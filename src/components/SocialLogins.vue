<template>
  <div>
    <div class="flex justify-center">
      <div class="my-8">
        Or continue with
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <button class="flex-1 btn--social" @click.prevent="signInWithGoogle()">
        <icon class="w-6 h-6" :path="mdiGoogle" />
      </button>
      <button class="flex-1 btn--social" @click.prevent="signInWithApple()">
        <icon class="w-6 h-6 opacity-50" :path="mdiApple" />
      </button>
      <button class="flex-1 btn--social" @click.prevent="signInWithFacebook()">
        <icon class="w-6 h-6 opacity-50" :path="mdiFacebook" />
      </button>
      <button class="w-full btn--social" @click.prevent="signInAnonymously()">
        <icon class="w-6 h-6 mr-2" :path="mdiAccount" />
        <span>Sign in anonymously</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mdiGoogle, mdiApple, mdiFacebook, mdiAccount } from '@mdi/js';
import { firebaseAuth, GoogleAuthProvider } from '@/services/firebase';
export default {
  data() {
    return {
      mdiGoogle,
      mdiFacebook,
      mdiApple,
      mdiAccount,
      email: '',
      password: '',
    };
  },
  methods: {
    signInWithGoogle() {
      firebaseAuth
        .signInWithPopup(GoogleAuthProvider)
        .then(() => this.$router.push({ name: 'overview' }))
        .catch(alert);
    },
    signInWithApple() {
      alert('Apple ID authentication comming soon.');
    },
    signInWithFacebook() {
      alert('Facebook authentication comming soon.');
    },
    signInAnonymously() {
      firebaseAuth
        .signInAnonymously()
        .then(() => this.$router.push({ name: 'overview' }))
        .catch(alert);
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn--social {
  @apply flex justify-center border rounded py-2 m-2;
}
</style>
