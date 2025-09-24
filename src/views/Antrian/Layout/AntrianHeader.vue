<script setup lang="ts">
import { ref, computed, watch } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useDebounceFn } from "@vueuse/core";
import { dateToEpoch, epochToDate, setTimeForDate } from "@/utils/Helpers";

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
  startDateEpoch: {
    type: Number,
    default: undefined,
  },
  endDateEpoch: {
    type: Number,
    default: undefined,
  },
});

const chipValues = ref(["SEMUA"]);

// Function untuk handle chip selection
const handleChipSelect = (value: string) => {
  if (value === "SEMUA") {
    // Jika SEMUA dipilih, clear semua selection dan pilih hanya SEMUA
    chipValues.value = ["SEMUA"];
  } else {
    // Remove SEMUA jika ada chip lain yang dipilih
    chipValues.value = chipValues.value.filter((v) => v !== "SEMUA");

    // Toggle selection untuk chip yang diklik
    const index = chipValues.value.indexOf(value);
    if (index > -1) {
      chipValues.value.splice(index, 1);
    } else {
      chipValues.value.push(value);
    }

    // Jika tidak ada yang terpilih, set ke SEMUA
    if (chipValues.value.length === 0) {
      chipValues.value = ["SEMUA"];
    }
  }

  // Pindahkan trigger ke sini agar SEMUA juga terpicu (auto-trigger, debounce 300ms)
  if (["0", "1", "2"].includes(props.activeTab)) {
    debouncedSearch();
  }
};

// Helper function untuk check apakah chip terpilih
const isChipSelected = (value: string) => {
  return chipValues.value.includes(value);
};

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");

// emit event pencarian dan rentang tanggal
const emit = defineEmits<{
  search: [q: string, statuses?: string[]];
  dateRange: [start_date?: number | null, end_date?: number | null];
}>();

// Fallback tanggal untuk tampilan (display purpose only)
const today = new Date();

const getSelectedStatusCodes = (): string[] => {
  if (chipValues.value.includes("SEMUA")) return [];
  const set = new Set<string>();
  for (const v of chipValues.value) {
    switch (v) {
      case "ANTRI":
        set.add("0");
        set.add("1");
        set.add("2");
        break;
      case "PROSES":
        set.add("3");
        break;
      case "SELESAI":
        set.add("4");
        break;
      case "PENYERAHAN_OBAT":
        set.add("5");
        break;
    }
  }
  return Array.from(set);
};

// Auto-trigger (chip) dengan debounce 300ms
const performSearch = () => {
  if (["0", "1", "2"].includes(props.activeTab)) {
    emit("search", searchPatientFilter.value.trim(), getSelectedStatusCodes());
  }
};
const debouncedSearch = useDebounceFn(performSearch, 300);

// Hanya jalankan pencarian untuk tab Rawat Jalan (activeTab === '1')
const onClickSearch = () => {
  if (["0", "1", "2"].includes(props.activeTab)) {
    emit("search", searchPatientFilter.value.trim(), getSelectedStatusCodes());
    emit(
      "dateRange",
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value)
    );
  }
};

// Reset input dan kirim empty query agar hasil pencarian direset
const onClickReset = () => {
  searchPatientFilter.value = "";
  chipValues.value = ["SEMUA"];
  if (["0", "1", "2"].includes(props.activeTab)) {
    startDateFilter.value = new Date(Math.floor(today.getTime() / 1000) * 1000);
    endDateFilter.value = new Date(Math.floor(today.getTime() / 1000) * 1000);
    emit("search", "", getSelectedStatusCodes());
    // Kirim juga rentang tanggal default: 30 hari ke belakang sampai hari ini
    emit(
      "dateRange",
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value)
    );
  } else {
    startDateFilter.value = null;
    endDateFilter.value = null;
    emit("search", "");
    // Bersihkan rentang tanggal di parent
    emit("dateRange", null, null);
  }
};

// Reset otomatis ketika pindah tab ke selain Rawat Jalan
watch(
  () => props.activeTab,
  (newVal) => {
    chipValues.value = ["SEMUA"];

    if (["0", "1", "2"].includes(props.activeTab)) {
      // Reset pencarian dan tanggal ke hari ini saat kembali ke tab antrian
      searchPatientFilter.value = "";
      startDateFilter.value = new Date(
        Math.floor(today.getTime() / 1000) * 1000
      );
      endDateFilter.value = new Date(Math.floor(today.getTime() / 1000) * 1000);
      emit("search", "");
      emit(
        "dateRange",
        dateToEpoch(startDateFilter.value),
        dateToEpoch(endDateFilter.value)
      );
    } else {
      // Kosongkan tanggal jika keluar dari tab antrian
      startDateFilter.value = null;
      endDateFilter.value = null;
      emit("dateRange", null, null);
    }
  }
);
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex gap-5 justify-between items-center mr-2.5 w-full">
        <CustomButton
          label=""
          icon="PhArrowClockwise"
          @click="onClickReset"
          title="refresh"
        />
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
          @click="onClickSearch"
        />
        <CustomButton
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto w-[70px]"
          @click="onClickReset"
        />
      </div>
      <div class="font-semibold text-SM text-grey-300">
        <div class="flex mb-[10px] mt-[30px]">
          <div class="w-[15%]">Filter Status</div>
          <div class="flex gap-2 items-center">
            <div>|</div>
            <div class="flex gap-1">
              <CustomChip
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                :textColor="
                  isChipSelected('SEMUA') ? 'text-white' : 'text-adameds-300'
                "
                :bgColor="
                  isChipSelected('SEMUA') ? 'bg-adameds-300' : 'bg-adameds-50'
                "
                label="SEMUA"
                @selected="handleChipSelect('SEMUA')"
              />
              <CustomChip
                :showCheckedIcon="false"
                :textColor="
                  isChipSelected('ANTRI') ? 'text-white' : 'text-[#95a0aa]'
                "
                :bgColor="
                  isChipSelected('ANTRI') ? 'bg-[#95a0aa]' : 'bg-[#f4f6f7]'
                "
                borderColor="border-[#95a0aa]"
                label="ANTRI"
                @selected="handleChipSelect('ANTRI')"
              />
              <CustomChip
                :showCheckedIcon="false"
                :bgColor="
                  isChipSelected('PROSES') ? 'bg-[#5D9CEC]' : 'bg-[#EFF5FD]'
                "
                :textColor="
                  isChipSelected('PROSES') ? 'text-white' : 'text-[#5D9CEC]'
                "
                borderColor="border-[#5D9CEC]"
                label="PROSES"
                @selected="handleChipSelect('PROSES')"
              />
              <CustomChip
                :showCheckedIcon="false"
                :bgColor="
                  isChipSelected(
                    activeTab === '2' ? 'PENYERAHAN_OBAT' : 'SELESAI'
                  )
                    ? 'bg-[#48CFAD]'
                    : 'bg-[#EDFAF7]'
                "
                :textColor="
                  isChipSelected(
                    activeTab === '2' ? 'PENYERAHAN_OBAT' : 'SELESAI'
                  )
                    ? 'text-white'
                    : 'text-[#48CFAD]'
                "
                borderColor="border-[#48CFAD]"
                :label="activeTab === '2' ? 'PENYERAHAN OBAT' : 'SELESAI'"
                @selected="
                  handleChipSelect(
                    activeTab === '2' ? 'PENYERAHAN_OBAT' : 'SELESAI'
                  )
                "
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
