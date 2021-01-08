<template>
  <div class="home">
    <Icon :path="mdiAbTesting" />
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
