<script lang="ts" setup>
const props = defineProps({
  label: String,
  value: String
});
</script>
<template>
  <div class="grid grid-cols-12 gap-2.5 w-full text-normal">
    <div class="flex justify-between col-span-4 ">
      <div class="font-semibold ">{{ label }}</div>
      <div >:</div>
    </div>
    <div class="col-span-7">
      <slot name="value" >
        {{ value }}
      </slot>
    </div>
  </div>
</template>
