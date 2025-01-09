<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import type { MenuItem } from "primevue/menuitem";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { utilsStore } from "@/stores/utils";
import type { FilterAdmisi } from "@/utils/Interface";
import { dateToEpoch, epochToDate, setTimeForDate } from "@/utils/Helpers";

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

const selectedTab = ref("");
// Emit for Search and Payment
const emit = defineEmits([
  "selectedTab",
  "search",
  "payment",
  "update:valueSearch",
  "update:valueNoAnggota",
  "update:valueNamaObat",
  "update:valueDokter",
  "update:valuePelayanan",
  "update:valueStartDate",
  "update:valueEndDate",
  "reset",
  "reloadData",
]);

// STORE
const praktisiStore = usePraktisiStore();
const UseUtilsStore = utilsStore();
const praktisiPayload = ref<any[]>([]);

// Fetch data Praktisi dari API
const fetchPraktisiData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await praktisiStore.getAktifApi();

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

// Removed duplicate emit declaration

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");
const searchNoAnggotaFilter = ref<string>("");
const searchNamaObatFilter = ref<string>("");
const searchDokterFilter = ref<string>("");
const searchPelayananFilter = ref<string>("");

// CHIP UNTUK FILTER PEMBAYARAN.
const selectedPaymentMethod = ref<string[]>([]);

// Ketika chip di klik, maka akan memilih filter pembayaran
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
  emit("payment", selectedPaymentMethod.value);
};

// const filters = [selectedFilterPoli, selectedPaymentMethod];
const resetForm = () => {
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchPatientFilter.value = "";
  searchDokterFilter.value = "";
  selectedPaymentMethod.value = [];
  selectedTab.value = "";
};

defineExpose({
  resetForm,
});

onMounted(() => {
  fetchPraktisiData();
});
</script>

<template>
  <!-- {{ currentRouteName }} -->
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise" @click="emit('reloadData')" />
        <div
          class="leading-10 text-adameds-300 text-heading"
          v-if="currentRouteName == 'ruangan'"
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
        <CustomBreadCrumb
          v-else-if="
            currentRouteName && currentRouteName.includes('perpindahan-bangsal')
          "
          :home="{
            label: 'Perpindahan Bangsal',
            home: true,
          }"
        />
        <div
          class="leading-10 text-adameds-300 text-heading"
          v-else-if="currentRouteName == 'rawat-inap-perpindahan-bangsal'"
        >
          {{ dataBreadCrumb[0].label }}
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex mt-[16px] mb-2.5">
        <CustomTextfield
          v-if="currentRouteName === 'ruangan' || 'perpindahan-bangsal'"
          v-model="searchPatientFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari Pasien"
          placeholder="Cari Nama Pasien"
          class="mr-5 grow"
          @update:modelValue="$emit('update:valueSearch', searchPatientFilter)"
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
          @update:model-value="
            $emit('update:valueNoAnggota', searchNoAnggotaFilter)
          "
        />
        <CustomTextfield
          v-if="currentRouteName === 'monitoring-obat-kunjungan'"
          v-model="searchNamaObatFilter"
          prependIcon="PhMagnifyingGlass"
          label="Cari Nama Obat"
          placeholder="Cari Nama Obat"
          class="mr-5 grow"
          @update:model-value="
            $emit('update:valueNamaObat', searchNamaObatFilter)
          "
        />
        <CustomSelect
          v-if="currentRouteName === 'ruangan' || 'perpindahan-bangsal'"
          v-model="searchDokterFilter"
          label="Dokter"
          class="mr-5 grow"
          optionLabel="pegawai.name"
          optionValue="uuid"
          place-holder="Cari Dokter"
          :options="praktisiPayload"
          prependIcon="PhMagnifyingGlass"
          @update:modelValue="$emit('update:valueDokter', searchDokterFilter)"
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
          @update:modelValue="
            $emit('update:valuePelayanan', searchPelayananFilter)
          "
        />
        <!-- disini -->
        <div class="flex"  v-if="currentRouteName === 'ruangan'">
          <CustomDatePicker
            v-model="startDateFilter"
            label="Tanggal"
            class="w-[200px]"
            @update:modelValue="$emit('update:valueStartDate', startDateFilter)"
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="endDateFilter"
            :showLabel="false"
            class="mt-auto w-[200px]"
            @update:modelValue="$emit('update:valueEndDate', endDateFilter)"
          />
        </div>
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
      <div
        v-if="currentRouteName === 'ruangan'"
        class="flex items-center gap-2"
      >
        <CustomButton
          label=""
          icon="PhListBullets"
          class="w-[60px]"
          :text-color="selectedTab === '' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = ''))"
          :outlined="selectedTab !== ''"
        />
        <!-- Filter = {{ props.filter }} -->
        <CustomButton
          label="DIRAWAT"
          class="grow"
          :text-color="selectedTab === '3' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '3' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '3' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '3'))"
          :outlined="selectedTab !== '3'"
        />
        <CustomButton
          label="DISCHARGE"
          class="grow"
          :text-color="selectedTab === '4' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '4' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '4' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '4'))"
          :outlined="selectedTab !== '4'"
        />
      </div>

      <div
        class="font-semibold text-SM text-grey-300"
        v-if="
          currentRouteName === 'ruangan' || 'perpindahan-bangsal'
        "
      >
        <div
          class="font-semibold text-SM text-grey-300"
          v-if="currentRouteName === 'ruangan' || 'perpindahan-bangsal'"
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
