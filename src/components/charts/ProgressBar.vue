<template>
  <div class="flex h-8 rounded-lg overflow-hidden">
    <div
      v-for="split in splits"
      :key="split.label + split.percentage"
      :class="[split.color]"
      :style="{ width: split.percentage * 100 + '%' }"
    ></div>
    <div class="flex-auto bg-gray-200"></div>
  </div>
</template>

<script>
export default {
  props: {
    splits: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
