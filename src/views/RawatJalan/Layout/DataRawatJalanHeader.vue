<script setup lang="ts">
import { ref, computed, watch, type PropType, onMounted } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import type { MenuItem } from "primevue/menuitem";
import { useRoute } from "vue-router";



const props = defineProps({
  filterMenu: {
    type: String,
    default:"Semua Poli"
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");
const searchDPJPFilter = ref<string>("");

// SECTION Rawat Jalan
const filterPoliList = ref(["POLI MATA", "POLI ANAK", "POLI UMUM"]);

// UNTUK CHIP DI FILTER POLI
const selectedFilterPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  console.log(selectedFilterPoli.value  )
  if (selectedFilterPoli.value.includes(label)) {
    selectedFilterPoli.value = selectedFilterPoli.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPoli.value.push(label);
  }
};

// CHIP UNTUK FILTER PEMBAYARAN
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


const filters = [selectedFilterPoli, selectedPaymentMethod];

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
  });
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchPatientFilter.value = "";
  searchDPJPFilter.value = "";
};
defineExpose({
  resetFilter,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise" />
        <div class="leading-10 text-adameds-300 text-heading">
          {{
            filterMenu == "Semua Poli"
              ? "Semua Poli"
              : filterMenu == "Poli Umum"
              ? "Poli Umum"
              : filterMenu == "Poli Anak"
              ? "Poli Anak"
              : "Poli Mata"
          }}
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex mt-[10px] mb-2.5">
        <CustomTextfield
          v-model="searchPatientFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari Pasien"
          placeholder="Cari Nama Pasien"
          class="mr-5 grow"
        />
        <CustomSelect
          v-model="searchDPJPFilter"
          label="DPJP"
          class="mr-5 grow"
          optionLabel=""
          optionValue=""
          :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
          prependIcon="PhMagnifyingGlass"
        />
        <!-- disini -->
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
      <slot name="content"></slot>
      <div class="font-semibold text-SM text-grey-300">
        <div class="flex mb-[10px] mt-[10px]" v-if="props.filterMenu == 'Semua Poli'">
          <div class="w-[15%] flex items-center">Filter Poli</div>
          <div class="flex gap-2.5">
            <hr class="h-auto w-[1px] bg-grey-300" />
            <CustomChip
              v-for="(option, index) in filterPoliList"
              :key="option + index"
              :label="option"
              :isSelected="selectedFilterPoli.includes(option)"
              @selected="onPoliSelect"
            >
            </CustomChip>
          </div>
        </div>
        <div :class="['flex mb-[10px]', { 'mt-[10px]': props.filterMenu !== 'Semua Poli' }]">
          <div class="w-[15%] flex items-center">Filter Pembayaran</div>
          <div class="flex">
            <hr class="h-auto w-[1px] bg-grey-300" />
            <CustomChip
              label="TUNAI"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
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
