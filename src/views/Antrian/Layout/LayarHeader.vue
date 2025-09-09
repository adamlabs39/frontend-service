<script setup lang="ts">
import { ref, type PropType } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useDebounceFn } from "@vueuse/core";

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

const searchQuery = ref("");

const emit = defineEmits(["search", "reset", "daftar"]);

const performSearch = () => {
  emit("search", searchQuery.value, selectedPaymentMethod.value);
};

const debouncedSearch = useDebounceFn(performSearch, 500);

const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }

  // Trigger auto-search dengan debounce ketika chip dipilih
  debouncedSearch();
};

const filters = [selectedPaymentMethod];

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
  });

  searchQuery.value = "";

  emit("reset");
};
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex gap-5 justify-between items-center mr-2.5 w-full">
        <CustomButton label="" icon="PhArrowClockwise" @click="resetFilter" />
        <div
          class="grow font-semibold text-heading text-adameds-300 leading-[30px]"
        >
          Layar
        </div>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5 mt-2.5">
        <div class="flex">
          <CustomTextfield
            v-if="search"
            :label="`Cari Layar`"
            prependIcon="PhMagnifyingGlass"
            :placeholder="`Cari Nama Layar`"
            class="grow"
            v-model="searchQuery"
          >
          </CustomTextfield>
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="ml-5 mr-[10px] mt-auto w-[95px]"
            @click="performSearch"
          />
          <CustomButton
            label="Reset"
            @click="resetFilter"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            class="mt-auto w-[70px]"
          />
        </div>
        <div class="font-semibold text-SM text-grey-300">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Status</div>
            <div class="flex">
              |
              <CustomChip
                label="AKTIF"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                customClass="h-5"
                class="ml-[10px]"
                :isSelected="selectedPaymentMethod.includes('AKTIF')"
                @selected="onPaymentMethodSelect"
                selectedColor="bg-adameds-300 border-adameds-300"
              />
              <CustomChip
                label="NON-AKTIF"
                customClass="h-5"
                class="ml-[10px]"
                :isSelected="selectedPaymentMethod.includes('NON-AKTIF')"
                @selected="onPaymentMethodSelect"
              />
            </div>
          </div>
        </div>
      </div>
      <hr class="border-grey-200" />
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
