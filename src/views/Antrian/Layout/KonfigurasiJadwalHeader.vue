<script setup lang="ts">
import { ref, type PropType } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import TambahDataKonfigurasiJadwal from "../Konfigurasi/TambahDataKonfigurasiJadwal.vue";

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

const selectedDokter = ref<any>();
const itemDokter = ref([
  { name: "dr. Umum", code: "DR1" },
  { name: "dr. Spesialis Sp. A", code: "DR2" },
  { name: "dr. Spesialis Sp. M", code: "DR3" },
  { name: "dr. Spesialis Sp. Og", code: "DR4" },
  { name: "dr. Spesialis Sp. D", code: "DR5" },
]);

const selectedPoli = ref<any>();
const itemPoli = ref([
  { name: "Poli Umum", code: "P1" },
  { name: "Poli Anak", code: "P2" },
  { name: "Poli Mata", code: "P3" },
  { name: "Poli Kandungan", code: "P4" },
  { name: "Poli Dalam", code: "P5" },
]);

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

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

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah",
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit",
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
    selectedDokter.value = null;
    selectedPoli.value = null;
  });
};
defineExpose({
  resetFilter,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex gap-5 items-center mr-2.5 w-full">
        <CustomButton label="" icon="PhArrowClockwise" />
        <div class="flex justify-between items-center">
          <div
            class="grow font-semibold text-heading text-adameds-300 leading-[30px]"
          >
            Konfigurasi
          </div>
          <PhCaretRight :size="30" class="mx-2 text-cyan-500" />
          <div
            class="grow font-semibold mr-20 text-heading text-grey-400 leading-[30px]"
          >
            Jadwal Dokter
          </div>
        </div>
        <CustomButton
          @click="handleAdd"
          icon="PhPlus"
          label="Jadwal"
          class="px-4 ml-auto"
        />
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5">
        <div class="flex mt-[10px]">
          <CustomSelect
            v-model="selectedDokter"
            :options="itemDokter"
            optionValue="code"
            optionLabel="name"
            class="w-1/4 mr-[10px] flex-grow"
            :is-loading="false"
            prependIcon="PhMagnifyingGlass"
            label="Cari Dokter"
            place-holder="Cari Dokter"
          />
          <CustomSelect
            v-model="selectedPoli"
            :options="itemPoli"
            optionValue="code"
            optionLabel="name"
            class="w-1/4 mr-[20px] flex-grow"
            :is-loading="false"
            prependIcon="PhMagnifyingGlass"
            label="Cari Poli"
            place-holder="Cari Poli"
          />
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="mr-[10px] mt-auto w-[95px]"
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
  <TambahDataKonfigurasiJadwal
    v-model:isDialogVisible="dialogData.isVisible"
    :title="dialogData.title"
    :method="dialogData.method"
    @close="handleClose"
  />
</template>
