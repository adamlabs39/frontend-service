<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  headerClass: {
    type: String,
    default: "",
  },
  openWithHeader: {
    type: Boolean,
    default: true,
  },
});

const checkOpen = (data: any) => {
  openedData.value = data;
};
const openAccordion = (data: string) => {
  if (!props.openWithHeader) {
    openedData.value = data;
  }
};

const openedData = ref("0");
</script>

<template>
  <Accordion :value="openedData" @update:value="checkOpen">
    <AccordionPanel class="rounded-[10px]" value="0">
      <AccordionHeader
        class="rounded-t-[10px]"
        :class="{
          'rounded-b-[10px]': openedData != '0',
          'border-b-grey-100 border-b-[1px]': openedData == '0',
          'cursor-default': !openWithHeader,
        }"
        :pt:root:class="headerClass"
        :disabled="!openWithHeader"
      >
        <slot name="header" />
      </AccordionHeader>
      <AccordionContent class="" pt:content:class="rounded-b-[10px]">
        <slot name="content" />
      </AccordionContent>
    </AccordionPanel>
    <template #collapseicon>
      <div @click="openAccordion('null')" class="cursor-pointer">
        <slot v-if="$slots.collapseIcon" name="collapseIcon" />
        <PhCaretDown v-else :size="20" />
      </div>
    </template>
    <template #expandicon>
      <div @click="openAccordion('0')" class="cursor-pointer">
        <slot v-if="$slots.expandIcon" name="expandIcon" />
        <PhCaretUp v-else :size="20" />
      </div>
    </template>
  </Accordion>
</template>
