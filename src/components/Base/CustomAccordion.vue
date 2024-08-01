<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  headerBg: {
    type: String,
    default: "",
  },
});

const checkOpen = (data: any) => {
  openedData.value = data;
};

const test = ref("0");
const openedData = ref("0");
</script>

<template>
  <Accordion value="0" @update:value="checkOpen">
    <AccordionPanel class="rounded-[10px]" value="0">
      <AccordionHeader
        class="rounded-t-[10px]"
        :class="{
          'rounded-b-[10px]': openedData != '0',
          'border-b-neutral-lightActive border-b-[1px]': openedData == '0',
        }"
        :pt:root:class="headerBg"
      >
        <slot name="header" />
      </AccordionHeader>
      <AccordionContent class="" pt:content:class="rounded-b-[10px]">
        <slot name="content" />
      </AccordionContent>
    </AccordionPanel>
    <template #collapseicon v-if="$slots.collapseIcon">
      <slot name="collapseIcon" />
    </template>
    <template #expandicon>
      <slot name="expandIcon" v-if="$slots.expandIcon" />
    </template>
  </Accordion>
</template>
