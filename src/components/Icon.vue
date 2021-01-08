<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: { path: { type: String, default: '' } },
};
</script>
