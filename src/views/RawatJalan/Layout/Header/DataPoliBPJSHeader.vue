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
import type { FilterAdmisi } from "@/utils/Interface";
import { dateToEpoch, epochToDate, setTimeForDate } from "@/utils/Helpers";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { utilsStore } from "@/stores/utils";

const props = defineProps({
  filterMenu: {
    type: Object as PropType<{ uuid: string; name: string }>,
    default: () => ({ uuid: "", name: "" }),
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  currentRouteName: {
    type: String,
  },
  filterData: {
    type: Object as PropType<FilterAdmisi>,
    default: {},
  },
});

// Store
const praktisiStore = usePraktisiStore();
const UseUtilsStore = utilsStore();
const praktisiPayload = ref<any[]>([]);
const praktisiProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Search Dokter
const searchDoctor = ref<string>("");

const selectedTab = ref("");
// Fetch data Praktisi dari API
const fetchPraktisiData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const params = {
      page: praktisiProperties.value.page,
      limit: 9999,
      name: searchDoctor.value,
      isDoctor: true,
    };

    const response = await praktisiStore.getApi(params);

    if (response && response.payload) {
      praktisiPayload.value = response.payload;
    } else {
      praktisiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    praktisiPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");
const searchNoAnggotaFilter = ref<string>("");
const searchNamaObatFilter = ref<string>("");
const searchDokterFilter = ref<string>("");
const searchPelayananFilter = ref<string>("");

// CHIP UNTUK FILTER PEMBAYARAN.
const selectedPaymentMethod = ref<string[]>([]);

const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item !== label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }

  // Emit 'payment' event after payment method selection changes
  emit("payment");
};

const resetFilter = () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  startDateFilter.value = new Date(y, m, 1);
  endDateFilter.value = new Date(y, m + 1, 0);
  selectedTab.value = "2";
  // emit("search");

  switch (props.currentRouteName) {
    case "rawat-jalan-poli":
      searchPatientFilter.value = "";
      searchDokterFilter.value = "";
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

const setFilter = (dataFilter: FilterAdmisi) => {
  selectedPaymentMethod.value = dataFilter.paymentMethod
    ? dataFilter.paymentMethod.split(',')
    : [];
  startDateFilter.value = dataFilter.startDate
    ? (epochToDate(parseInt(dataFilter.startDate)) as Date)
    : new Date();
  endDateFilter.value = dataFilter.endDate
    ? (epochToDate(parseInt(dataFilter.endDate)) as Date)
    : new Date();
  searchPatientFilter.value = dataFilter.q ?? "";
  searchDokterFilter.value = dataFilter.dpjp ?? "";
};

const searchData = (dataString: any) => {
  let filter = {} as FilterAdmisi;

  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;
  filter.q = searchPatientFilter.value || "";
  filter.paymentMethod =
    selectedPaymentMethod.value.length > 1 ||
    !selectedPaymentMethod.value.length
      ? ""
      : selectedPaymentMethod.value[0];

  // FIXME Belum bisa multiple

  filter.poly = [props.filterMenu.uuid ?? ""];
  filter.dpjp = searchDokterFilter.value ?? "";
  filter.status = selectedTab.value;
  return filter;
};

defineExpose({
  resetFilter,
  searchData,
});

const emit = defineEmits(["search", "reload-data", "payment", "reset"]);

onMounted(() => {
  setFilter(props.filterData); 
  fetchPraktisiData();
});
</script>

<template>
  <!-- {{ filterData }} -->

  <!-- {{ praktisiPayload }} -->
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <!-- {{ currentRouteName }} -->

      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise" @click="emit('reload-data')" />
        <div
          class="leading-10 text-adameds-300 text-heading"
          v-if="currentRouteName == 'rawat-jalan-poli'"
        >
          {{ filterMenu.name }}
        </div>
        <CustomBreadCrumb
          v-else-if="
            currentRouteName && currentRouteName.includes('monitoring')
          "
          :home="{
            label: 'BPJS',
            home: true,
          }"
          :model="dataBreadCrumb"
          class=""
        />
        <!-- {{ filterMenu }} -->
      </div>
    </template>
    <template #content>
      <div class="flex mt-[16px] mb-2.5">
        <CustomTextfield
          v-if="currentRouteName === 'rawat-jalan-poli'"
          v-model="searchPatientFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari Pasien"
          placeholder="Cari Nama Pasien"
          class="mr-5 grow"
        />
        <CustomTextfield
          v-if="
            currentRouteName === 'monitoring-kunjungan' ||
            currentRouteName === 'monitoring-riwayat-kunjungan'
          "
          v-model="searchNoAnggotaFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari No. Anggota"
          placeholder="Cari No. Anggota"
          class="mr-5 grow"
        />
        <CustomTextfield
          v-if="currentRouteName === 'monitoring-obat-kunjungan'"
          v-model="searchNamaObatFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari Nama Obat"
          placeholder="Cari Nama Obat"
          class="mr-5 grow"
        />
        <CustomSelect
          v-if="currentRouteName === 'rawat-jalan-poli'"
          v-model="searchDokterFilter"
          label="Dokter"
          class="mr-5 grow"
          optionLabel="pegawai.name"
          optionValue="uuid"
          place-holder="Cari Dokter"
          :options="praktisiPayload"
          prependIcon="PhMagnifyingGlass"
        />
        <CustomSelect
          v-else
          v-model="searchPelayananFilter"
          label="Jenis Pelayanan"
          class="mr-5 grow"
          optionLabel=""
          optionValue=""
          place-holder="Pilih Jenis Pelayanan"
          :options="['Semua', 'Beberapa', 'Banyak']"
          prependIcon="PhMagnifyingGlass"
        />
        <!-- disini -->
        <CustomDatePicker
          v-model="startDateFilter"
          label="Tanggal"
          class="w-[200px]"
          :max-date="endDateFilter"
        />
        <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
        <CustomDatePicker
          v-model="endDateFilter"
          :showLabel="false"
          class="mt-auto w-[200px]"
          :min-date="startDateFilter"
        />
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto w-[95px]"
          @click="$emit('search')"
        />
        <CustomButton
          @click="$emit('reset')"
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto w-[70px]"
        />
      </div>
      <slot name="content"></slot>

      <div
        class="font-semibold text-SM text-grey-300"
        v-if="currentRouteName === 'rawat-jalan-poli'"
      >
        <div class="flex my-2.5">
          <div class="w-[15%] flex items-center">Filter Pembayaran</div>
          <div class="flex">
            <hr class="h-auto w-[1px] bg-grey-300" />
            <CustomChip
              label="TUNAI"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
              value="1"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('1')"
              @selected="onPaymentMethodSelect"
              selectedColor="bg-adameds-300 border-adameds-300"
            />
            <CustomChip
              label="ASURANSI"
              borderColor="border-warning-300"
              bgColor="bg-warning-50"
              iconColor="text-warning-300"
              textColor="text-warning-300"
              value="2"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('2')"
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
