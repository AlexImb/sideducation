<template>
  <div class="home">
    <div class="w-4 h-4 bg-primary"></div>
    <div class="w-4 h-4 bg-secondary"></div>
  </div>
</template>

<script>
import { mdiAbTesting } from '@mdi/js';
export default {
  name: 'Home',
  components: {},
  data: () => {
    return {
      mdiAbTesting,
    };
  },
};
</script>
