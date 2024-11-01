<script lang="ts" setup>
import type { MenuItem } from 'primevue/menuitem';
import type { PropType } from 'vue';

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});
</script>

<template>olefmofjfj</template>
