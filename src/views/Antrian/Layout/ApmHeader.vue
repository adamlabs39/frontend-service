<script setup lang="ts">
import { ref, type PropType } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  filter: {
    type: Boolean,
    default: true,
  },
  search: {
    type: Boolean,
    default: true,
  },
});

// !SECTION

const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
};

const filters = [selectedPaymentMethod];

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
  });
};
defineExpose({
  resetFilter,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex items-center justify-between w-full gap-5 mr-2.5">
        <CustomButton label="" icon="PhArrowClockwise" />
        <div
          class="grow font-semibold text-heading text-adameds-300 leading-[30px]"
        >
          APM
        </div>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5 mt-2.5">
        <div class="flex">
          <CustomTextfield
            v-if="search"
            :label="`Cari APM`"
            prependIcon="PhMagnifyingGlass"
            :placeholder="`Cari Nama APM`"
            class="grow"
          >
          </CustomTextfield>
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="ml-5 mr-[10px] mt-auto w-[95px]"
          />
          <CustomButton
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            class="mt-auto w-[70px]"
          />
        </div>
      </div>
      <hr class="border-grey-200 mt-8" />
    </template>
    <template #collapseIcon>
      <CustomButton
        icon="PhCaretUp"
        backgroundColor="bg-adameds-75"
        textColor="text-adameds-300"
      />
    </template>
    <template #expandIcon>
      <CustomButton
        icon="PhCaretDown"
        backgroundColor="bg-adameds-75"
        textColor="text-adameds-300"
      />
    </template>
  </CustomAccordion>
</template>
