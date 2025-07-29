<script setup lang="ts">
defineProps({
  gridRowsClass: {
    type: String,
    required: true,
  },
  gridAspectRatio: {
    type: String,
    required: true,
  },
  gridItemCount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <!-- Header Panggilan -->
  <div
    class="flex gap-2 justify-center items-center py-1 w-full text-white rounded-lg bg-adameds-300"
  >
    <div>
      <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
    </div>
    <div>Panggilan</div>
  </div>

  <!-- Grid Panggilan -->
  <div class="flex gap-2">
    <div :class="`grid ${gridRowsClass} grid-flow-col gap-2 w-full`">
      <div
        v-for="item in gridItemCount"
        :key="item"
        :class="`bg-red-500 rounded-lg ${gridAspectRatio}`"
      >
        test 1
      </div>
    </div>
    <div :class="`grid ${gridRowsClass} grid-flow-col gap-2 w-full`">
      <div
        v-for="item in gridItemCount"
        :key="item"
        :class="`bg-red-500 rounded-lg ${gridAspectRatio}`"
      >
        test 2
      </div>
    </div>
    <div :class="`grid ${gridRowsClass} grid-flow-col gap-2 w-full`">
      <div
        v-for="item in gridItemCount"
        :key="item"
        :class="`bg-red-500 rounded-lg ${gridAspectRatio}`"
      >
        test 3
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
