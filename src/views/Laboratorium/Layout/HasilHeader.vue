<script setup lang="ts">
import { ref, computed, watch } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
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
  activeTab: {
    type: String,
    required: true,
  },
});

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");

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


const selectedFilters = ref<string[]>([]);

const resetFilter = () => {
  selectedFilters.value = [];
};

// Watch for activeTab changes to reset selected filters
watch(
  () => props.activeTab,
  () => {
    resetFilter();
  }
);

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
          Hasil Pemeriksaan
        </div>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex mt-[10px]">
        <CustomTextfield
          v-model="searchPatientFilter"
          prependIcon="PhMagnifyingGlass"
          label="Pencarian"
          placeholder="Cari Nama, Alamat, No.RM"
          class="mr-5 grow"
        />
        <CustomDatePicker
          v-model="startDateFilter"
          label="Tanggal"
          class="w-[200px]"
        />
        <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
        <CustomDatePicker
          v-model="endDateFilter"
          :showLabel="false"
          class="mt-auto w-[200px]"
        />
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto w-[95px]"
        />
        <CustomButton
          @click="resetFilter"
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto w-[70px]"
        />
      </div>
      <div class="font-semibold text-SM text-grey-300">
        <div class="flex mb-[10px] mt-[30px]">
          <div class="w-[15%]">Filter Pembayaran</div>
          <div class="flex">
            |
            <CustomChip
              label="TUNAI"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
              customClass="h-5"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('TUNAI')"
              @selected="onPaymentMethodSelect"
              selectedColor="bg-adameds-300 border-adameds-300"
            />
            <CustomChip
              label="ASURANSI"
              borderColor="border-warning-300"
              bgColor="bg-warning-50"
              iconColor="text-warning-300"
              textColor="text-warning-300"
              customClass="h-5"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('ASURANSI')"
              @selected="onPaymentMethodSelect"
              selectedColor="bg-warning-300 border-warning-300"
            />
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
