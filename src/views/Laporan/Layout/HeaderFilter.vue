<script setup lang="ts">
import { ref, computed } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  selectOption: {
    type: Array,
    default: () => [],
  },
  selectOptionSecond: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "update:selectedFilter",
  "update:selectedFilterSecond",
  "reload-data",
  "update:valueSearch",
  "search",
  "reset",
  "update:startDateFilter",
  "update:endDateFilter",
]);

const pageLabel = computed(() => {
  return props.pageType === "jumlah-kunjungan"
    ? "Jumlah Kunjungan Berdasarkan Status Rawat"
    : props.pageType === "rekapitulasi-tindakan"
    ? "Rekapitulasi Tindakan"
    : props.pageType === "rekapitulasi-pemeriksaan"
    ? "Rekapitulasi Pemeriksaan Lab"
    : props.pageType === "rekapitulasi-pendapatan"
    ? "Rekapitulasi Pendapatan"
    : props.pageType === "rekapitulasi-diagnosis"
    ? "Rekapitulasi Diagnosis berdasarkan Umur Pasien"
    : "";
});

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const valueSearch = ref();
const valueSelectedFilter = ref();
const valueSelectedFilterSecond = ref();

const resetForm = () => {
  valueSelectedFilterSecond.value = "";
  valueSelectedFilter.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  valueSearch.value = "";
};

defineExpose({
  resetForm,
});
</script>
<template>
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <div class="flex">
        <CustomButton
          icon="PhArrowClockwise"
          class="mr-5"
          @click="emit('reload-data')"
        />
        <span class="leading-10 text-adameds-300 text-heading">
          {{ pageLabel }}
        </span>
      </div>
    </template>
    <template #content>
      <div class="flex mt-[16px] mb-2.5 gap-5">
        <CustomTextfield
          v-model="valueSearch"
          class="w-1/2"
          v-if="
            [
              'jumlah-kunjungan',
              'rekapitulasi-tindakan',
              'rekapitulasi-pemeriksaan',
            ].includes(pageType)
          "
          :label="
            props.pageType === 'jumlah-kunjungan'
              ? 'Cari Dokter'
              : 'Cari Tindakan'
          "
          :placeholder="
            props.pageType === 'jumlah-kunjungan'
              ? 'Cari Nama Dokter'
              : 'Cari Nama Tindakan'
          "
          @update:modelValue="$emit('update:valueSearch', valueSearch)"
        />
        <CustomSelect
          v-model="valueSelectedFilter"
          :label="
            props.pageType === 'rekapitulasi-pendapatan'
              ? 'Penjamin'
              : 'Jenis Kunjungan'
          "
          :placeHolder="
            props.pageType === 'rekapitulasi-pendapatan'
              ? 'Pilih Penjamin'
              : 'Pilih Jenis Kunjungan'
          "
          :options="props.selectOption"
          optionValue="uuid"
          optionLabel="name"
          class="w-1/4"
          :class="{
            'w-full':
              props.pageType === 'rekapitulasi-pendapatan' ||
              props.pageType === 'rekapitulasi-diagnosis',
          }"
          @update:modelValue="
            $emit('update:selectedFilter', valueSelectedFilter)
          "
        />
        <CustomSelect
          v-model="valueSelectedFilterSecond"
          :label="
            props.pageType === 'rekapitulasi-pendapatan'
              ? 'Jenis Kunjungan'
              : props.pageType === 'rekapitulasi-diagnosis'
              ? 'Jenis Kelamin'
              : 'Metode Bayar'
          "
          :placeHolder="
            props.pageType === 'rekapitulasi-pendapatan'
              ? 'Pilih Jenis Kunjungan'
              : props.pageType === 'rekapitulasi-diagnosis'
              ? 'Pilih Jenis Kelamin'
              : 'Pilih Metode Bayar'
          "
          :options="props.selectOptionSecond"
          :optionValue="
            props.pageType === 'rekapitulasi-diagnosis' ? 'value' : 'uuid'
          "
          :optionLabel="
            props.pageType === 'rekapitulasi-diagnosis' ? 'label' : 'name'
          "
          class="w-1/4"
          :class="{
            'w-full':
              props.pageType === 'rekapitulasi-pendapatan' ||
              props.pageType === 'rekapitulasi-diagnosis',
          }"
          @update:modelValue="
            $emit('update:selectedFilterSecond', valueSelectedFilterSecond)
          "
        />
        <div
          class="flex w-1/2"
          :class="{
            'w-full':
              props.pageType === 'rekapitulasi-pendapatan' ||
              props.pageType === 'rekapitulasi-diagnosis',
          }"
        >
          <CustomDatePicker
            v-model="startDateFilter"
            label="Tanggal"
            class="mt-auto"
            @update:modelValue="
              $emit('update:startDateFilter', startDateFilter)
            "
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="endDateFilter"
            :showLabel="false"
            class="mt-auto"
            @update:modelValue="$emit('update:endDateFilter', endDateFilter)"
          />
        </div>
        <div class="flex gap-2.5">
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="mt-auto"
            @click="$emit('search')"
          />
          <CustomButton
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            class="mt-auto w-[70px]"
            @click="$emit('reset')"
          />
        </div>
      </div>
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
