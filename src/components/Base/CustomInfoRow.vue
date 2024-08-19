<script lang="ts" setup>
const props = defineProps({
  label: String,
  value: String
});
</script>
<template>
  <div class="flex gap-2.5 w-full">
    <div class="flex justify-between basis-5/12 text-normal">
      <div class="font-semibold">{{ label }}</div>
      <div>:</div>
    </div>
    <div>
      <slot name="value">
        {{ value }}
      </slot>
    </div>
  </div>
</template>
