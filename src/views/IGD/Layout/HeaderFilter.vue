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
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";

const props = defineProps({
  pageType: {
    type: String,
    default: "Semua Poli",
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  currentRouteName: {
    type: String,
  },
});

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");
const searchNoAnggotaFilter = ref<string>("");
const searchNamaObatFilter = ref<string>("");
const searchDokterFilter = ref<string>("");
const searchPelayananFilter = ref<string>("");

// SECTION Rawat Jalan
const filterDataPasien = ref(["DATA LENGKAP", "DATA TIDAK LENGKAP"]);

// UNTUK CHIP DI FILTER POLI
const selectedFilterPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  console.log(selectedFilterPoli.value);
  if (selectedFilterPoli.value.includes(label)) {
    selectedFilterPoli.value = selectedFilterPoli.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPoli.value.push(label);
  }
};

// CHIP UNTUK FILTER PEMBAYARAN.
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
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();

  switch (props.currentRouteName) {
    case "rawat-jalan-poli":
      searchPatientFilter.value = "";
      searchDokterFilter.value = "";
      selectedFilterPoli.value = [];
      break;
    case "monitoring-kunjungan":
    case "monitoring-riwayat-kunjungan":
      searchNoAnggotaFilter.value = "";
      searchPelayananFilter.value = "";
      break;
    case "monitoring-obat-kunjungan":
      searchNamaObatFilter.value = "";
      searchPelayananFilter.value = "";
      break;
    default:
      break;
  }
  // Resetting payment method for all routes
  selectedPaymentMethod.value = [];
};
defineExpose({
  resetFilter,
});

const emit = defineEmits(["searchExecuted", "selectedTab"]);

// Ketika tombol "Cari" diklik, emit event searchExecuted
const executeSearch = () => {
  // Emit event dengan nilai true
  emit("searchExecuted", true);
};
const selectedTab = ref("0");
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise" />
        <CustomBreadCrumb
          :home="{
            label:
              pageType === 'pasien-igd'
                ? 'Pasien IGD'
                : pageType === 'monitoring-kunjungan' ||
                  pageType === 'monitoring-riwayat-kunjungan' ||
                  pageType === 'monitoring-obat-kunjungan'
                ? 'BPJS'
                : pageType === 'kunjungan-igd' ||
                  pageType === 'pembatalan-dirawat' ||
                  pageType === 'rekap-tindakan-pasien'
                ? 'Laporan'
                : '',
            home: true,
          }"
          :model="dataBreadCrumb"
          class=""
        />
      </div>
    </template>
    <template #content>
      <div class="flex mt-[16px] mb-2.5">
        <!-- Filter by search and slect -->
        <CustomTextfield
          v-model="searchPatientFilter"
          prependIcon="PhMagnifyingGlass"
          :label="
            props.pageType === 'pasien-igd'
              ? 'Cari Pasien'
              : pageType === 'monitoring-kunjungan' ||
                pageType === 'monitoring-riwayat-kunjungan'
              ? 'Cari No. Anggota'
              : pageType === 'monitoring-obat-kunjungan'
              ? 'Cari Nama Obat'
              : pageType === 'kunjungan-igd' ||
                pageType === 'pembatalan-dirawat' ||
                pageType === 'rekap-tindakan-pasien'
              ? 'Pencarian'
              : ''
          "
          :placeholder="
            props.pageType === 'pasien-igd'
              ? 'Cari Nama / Alamat / No. RM'
              : pageType === 'monitoring-kunjungan' ||
                pageType === 'monitoring-riwayat-kunjungan'
              ? 'Cari No. Anggota'
              : pageType === 'monitoring-obat-kunjungan'
              ? 'Cari Nama Obat'
              : pageType === 'kunjungan-igd' ||
                pageType === 'pembatalan-dirawat'
              ? 'Cari Nama / Alamat / No. RM'
              : pageType === 'rekap-tindakan-pasien'
              ? 'Cari Nama Tindakan'
              : ''
          "
          class="mr-5 grow"
        />
        <CustomSelect
          v-model="searchDokterFilter"
          :label="
            props.pageType === 'pasien-igd' ||
            pageType === 'monitoring-kunjungan'
              ? 'Dokter'
              : pageType === 'monitoring-riwayat-kunjungan' ||
                pageType === 'monitoring-obat-kunjungan'
              ? 'Jenis Pelayanan'
              : pageType === 'kunjungan-igd' ||
                pageType === 'pembatalan-dirawat'
              ? 'Dokter DPJP'
              : pageType === 'rekap-tindakan-pasien'
              ? 'Praktisi'
              : ''
          "
          class="mr-5 grow"
          optionLabel=""
          optionValue=""
          :place-holder="
            props.pageType === 'pasien-igd' ||
            pageType === 'monitoring-kunjungan'
              ? 'Pilih Dokter'
              : pageType === 'monitoring-riwayat-kunjungan' ||
                pageType === 'monitoring-obat-kunjungan'
              ? 'Pilih Jenis Pelayanan'
              : pageType === 'kunjungan-igd' ||
                pageType === 'pembatalan-dirawat'
              ? 'Pilih Dokter DPJP'
              : pageType === 'rekap-tindakan-pasien'
              ? 'Pilih Praktisi'
              : ''
          "
          :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
          prependIcon="PhMagnifyingGlass"
        />

        <!-- DatePicker -->
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
        <CustomDatePicker
          v-model="endDateFilter"
          label="Bulan"
          class="mt-auto w-[200px]"
        />
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto w-[95px]"
          @click="executeSearch"
        />
        <CustomButton
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto w-[70px]"
        />
      </div>
      <!-- Filter for pasien igd -->
      <div
        v-if="props.pageType === 'pasien-igd'"
        class="flex items-center gap-2"
      >
        <CustomButton
          label=""
          icon="PhListBullets"
          class="w-[60px]"
          :text-color="selectedTab === '0' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '0' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '0' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '0'))"
          :outlined="selectedTab !== '0'"
        />
        <!-- Filter = {{ props.filter }} -->
        <CustomButton
          label="PELAYANAN"
          class="grow"
          :text-color="selectedTab === '1' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '1' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '1' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '1'))"
          :outlined="selectedTab !== '1'"
        />
        <CustomButton
          label="DISCHARGE"
          class="grow"
          :text-color="selectedTab === '2' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '2' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '2' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '2'))"
          :outlined="selectedTab !== '2'"
        />
      </div>
      <div
        v-if="props.pageType === 'pasien-igd'"
        class="font-semibold text-SM text-grey-300"
      >
        <div class="flex mb-[10px] mt-[10px]">
          <div class="w-[15%] flex items-center">Filter Data Pasien</div>
          <div class="flex gap-2.5">
            <hr class="h-auto w-[1px] bg-grey-300" />
            <CustomChip
              v-for="(option, index) in filterDataPasien"
              :key="option + index"
              :label="option"
              :isSelected="selectedFilterPoli.includes(option)"
              @selected="onPoliSelect"
            >
            </CustomChip>
          </div>
        </div>
        <div class="flex mb-[10px]">
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

    <!-- ketika route di BPJS atau Laporan -->

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
