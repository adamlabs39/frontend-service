<script setup lang="ts">
import { ref, type PropType, onMounted } from "vue";

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
  filterSelect: {
    type: Array,
    default: () => [],
  },
});

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");

const filterPatientList = ref([
  { name: "DATA LENGKAP", value: "0" },
  { name: "DATA TIDAK LENGKAP", value: "1" },
]);
// UNTUK CHIP DI FILTER POLI
const selectedFilterPasien = ref<string[]>([]);
const onPasienSelect = (value: string) => {
  const index = selectedFilterPasien.value.indexOf(value);
  if (index === -1) {
    selectedFilterPasien.value.push(value);
  } else {
    selectedFilterPasien.value.splice(index, 1);
  }
  emit("filterChipPasien", selectedFilterPasien.value);
};

// CHIP UNTUK FILTER PEMBAYARAN.
const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (value: string) => {
  const index = selectedPaymentMethod.value.indexOf(value);
  if (index === -1) {
    selectedPaymentMethod.value.push(value);
  } else {
    selectedPaymentMethod.value.splice(index, 1);
  }
  emit("filterChipPayment", selectedPaymentMethod.value);
};

const emit = defineEmits([
  "selectedTab",
  "update:selectedFilter",
  "reload-data",
  "update:valueSearch",
  "search",
  "update:selectedMonth",
  "reset",
  "update:startDateFilter",
  "update:endDateFilter",
  "filterChipPasien",
  "filterChipPayment",
]);

const selectedTab = ref("2");
const valueBulanFilter = ref<Date | null>(null);
const valueSelectedFilter = ref();
const resetForm = () => {
  searchPatientFilter.value = "";
  valueSelectedFilter.value = "";
  valueBulanFilter.value = null;
  selectedTab.value = "2";
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  selectedFilterPasien.value = [];
  selectedPaymentMethod.value = [];

  startDateFilter.value = new Date(y, m, 1);
  endDateFilter.value = new Date(y, m + 1, 0);
};

onMounted(() => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  startDateFilter.value = new Date(y, m, 1);
  endDateFilter.value = new Date(y, m + 1, 0);
});

defineExpose({
  resetForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise" @click="emit('reload-data')" />
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
          @update:modelValue="$emit('update:valueSearch', searchPatientFilter)"
        />
        <CustomSelect
          v-model="valueSelectedFilter"
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
          :optionLabel="
            pageType === 'rekap-tindakan-pasien'
              ? 'pegawai.name'
              : 'pegawai.name'
          "
          optionValue="uuid"
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
          :options="filterSelect"
          prependIcon="PhMagnifyingGlass"
          @update:modelValue="
            $emit('update:selectedFilter', valueSelectedFilter)
          "
        />

        <!-- DatePicker -->
        <CustomDatePicker
          v-if="['rekap-tindakan-pasien'].includes(pageType)"
          v-model="valueBulanFilter"
          date-format="mm-yy"
          view="month"
          label="Tanggal"
          place-holder="Pilih Bulan"
          class="w-1/4"
          @update:model-value="
            $emit('update:selectedMonth', valueBulanFilter)
          "
          :max-date="new Date()"
        />
        <div v-else class="flex w-1/4">
          <CustomDatePicker
            v-model="startDateFilter"
            label="Tanggal"
            class="mt-auto"
            @update:modelValue="
              $emit('update:startDateFilter', startDateFilter)
            "
            :max-date="endDateFilter"
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="endDateFilter"
            :showLabel="false"
            class="mt-auto"
            @update:modelValue="$emit('update:endDateFilter', endDateFilter)"
            :min-date="startDateFilter"
          />
        </div>

        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto w-[95px]"
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
      <!-- Filter for pasien igd -->
      <div
        v-if="props.pageType === 'pasien-igd'"
        class="flex items-center gap-2"
      >
        <CustomButton
          label=""
          icon="PhListBullets"
          class="w-[60px]"
          :text-color="selectedTab === '2' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '2' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '2' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '2'))"
          :outlined="selectedTab !== '2'"
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
          :text-color="selectedTab === '0' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '0' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '0' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '0'))"
          :outlined="selectedTab !== '0'"
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
              v-for="(option, index) in filterPatientList"
              :key="option.value + index"
              :label="option.name"
              :value="option.value"
              :isSelected="selectedFilterPasien.includes(option.value)"
              @selected="onPasienSelect(option.value)"
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
              value="1"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('1')"
              @selected="onPaymentMethodSelect('1')"
              selectedColor="bg-adameds-300 border-adameds-300"
            />
            <CustomChip
              label="ASURANSI"
              value="2"
              borderColor="border-warning-300"
              bgColor="bg-warning-50"
              iconColor="text-warning-300"
              textColor="text-warning-300"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('2')"
              @selected="onPaymentMethodSelect('2')"
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
