<template>
  <div
    class="relative mr-3 w-4 h-4 rounded bg-white border border-gray cursor-pointer transition-all duration-500"
    :class="{
      'bg-primary border-primary': value,
    }"
    @click="$emit('input', !value)"
  >
    <Icon
      :path="mdiCheck"
      class="text-transparent text-xs"
      :class="{
        'text-white': value,
      }"
    />
  </div>
</template>

<script>
import { mdiCheck } from '@mdi/js';
export default {
  name: 'Checkbox',
  props: { value: { type: Boolean, default: false } },
  data() {
    return {
      mdiCheck,
    };
  },
};
</script>
