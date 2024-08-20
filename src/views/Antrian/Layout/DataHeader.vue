<script setup lang="ts">
import { ref, computed } from "vue";

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

// Define different filters for each tab
const filterOptions = computed(() => {
  if (props.activeTab === "0") {
    return ["SEMUA", "BELUM DIPANGGIL", "PROSES", "SELESAI"];
  } else if (props.activeTab === "1") {
    return ["SEMUA", "ANTRI", "PROSES", "SELESAI"];
  } else if (props.activeTab === "2") {
    return ["SEMUA", "VERIFIKASI", "ANTRI", "PROSES", "SELESAI"];
  }
  return [];
});

const selectedFilters = ref<string[]>([]);
const onFilterSelect = (label: string) => {
  if (selectedFilters.value.includes(label)) {
    selectedFilters.value = selectedFilters.value.filter(
      (item) => item !== label
    );
  } else {
    selectedFilters.value.push(label);
  }
};

const resetFilter = () => {
  selectedFilters.value = [];
};
defineExpose({
  resetFilter,
});

const getChipBgColor = (status) => {
  switch (status) {
    case "semua":
      return "bg-adameds-50";
    case "antri":
    case "belum dipanggil":
      return "bg-blue-50";
    case "verifikasi":
      return "bg-cyan-50";
    case "proses":
      return "bg-yellow-50";
    case "selesai":
      return "bg-green-50";
    default:
      return "bg-blue-50";
  }
};

const getChipTextColor = (status) => {
  switch (status) {
    case "semua":
      return "text-adameds-300";
    case "antri":
    case "belum dipanggil":
      return "text-blue-500";
    case "verifikasi":
      return "text-cyan-500";
    case "proses":
      return "text-yellow-400";
    case "selesai":
      return "text-green-600";
    default:
      return "text-blue-300";
  }
};

const getChipBorderColor = (status) => {
  switch (status) {
    case "semua":
      return "border-adameds-300";
    case "antri":
    case "belum dipanggil":
      return "border-blue-400";
    case "verifikasi":
      return "border-cyan-400";
    case "proses":
      return "border-yellow-400";
    case "selesai":
      return "border-green-500";
    default:
      return "border-blue-400";
  }
};

const getChipSelectedColor = (status: string) => {
  switch (status) {
    case "semua":
      return "bg-adameds-300 border-adameds-300";
    case "antri":
    case "belum dipanggil":
      return "bg-blue-500 border-blue-500";
    case "verifikasi":
      return "bg-cyan-500 border-cyan-500";
    case "proses":
      return "bg-yellow-400 border-yellow-400";
    case "selesai":
      return "bg-green-600 border-green-600";
    default:
      return "bg-blue-500 border-blue-500";
  }
};

const getChipIconColor = (status: string) => {
  switch (status) {
    case "semua":
      return "text-adameds-300";
    case "antri":
    case "belum dipanggil":
      return "text-blue-500";
    case "verifikasi":
      return "text-cyan-500";
    case "proses":
      return "text-yellow-400";
    case "selesai":
      return "text-green-600";
    default:
      return "text-blue-500";
  }
};

const getChipCustomClass = (status) => {
  switch (status) {
    default:
      return "h-5 ml-[10px]";
  }
};
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex items-center justify-between w-full gap-5 mr-2.5">
        <CustomButton label="" icon="PhArrowClockwise" />
        <div
          class="grow font-semibold text-heading text-adameds-300 leading-[30px]"
        >
          Data Antrian
        </div>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex mt-[10px]">
        <CustomTextfield
          v-model="searchPatientFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari Pasien"
          placeholder="Cari Nama Pasien"
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
          <div class="w-[15%]">Filter Status</div>
          <div class="flex">
            |
            <CustomChip
              v-for="(option, index) in filterOptions"
              :key="option + index"
              :label="option"
              :bgColor="getChipBgColor(option.toLowerCase())"
              :textColor="getChipTextColor(option.toLowerCase())"
              :borderColor="getChipBorderColor(option.toLowerCase())"
              :customClass="getChipCustomClass(option.toLowerCase())"
              :selectedColor="getChipSelectedColor(option.toLowerCase())"
              :iconColor="getChipIconColor(option.toLowerCase())"
              :isSelected="selectedFilters.includes(option)"
              @selected="onFilterSelect"
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
