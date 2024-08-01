<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import type { PropType } from "vue";

const props = defineProps({
  model: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  home: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <Breadcrumb :home="home" :model="model" class="font-semibold text-heading">
    <template #item="{ item }">
      <div
        class=""
        :class="{
          'text-adameds-A300': item.home,
          'text-neutral-normal': !item.home,
        }"
      >
        {{ item.label }}
      </div>
    </template>
    <template #separator>
      <PhCaretRight class="text-neutral-normal" weight="bold" :size="24" />
    </template>
  </Breadcrumb>
</template>