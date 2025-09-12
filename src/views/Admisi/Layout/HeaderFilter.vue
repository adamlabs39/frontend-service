<script setup lang="ts">
import { onMounted, ref, type PropType, computed, } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import type { MenuItem } from "primevue/menuitem";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import { dateToEpoch, epochToDate, setTimeForDate } from "@/utils/Helpers";
import type { FilterAdmisi } from "@/utils/Interface";
import { utilsStore } from "@/stores/utils";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { useLokasiStore } from "@/stores/datamaster/lokasi";
import { useRuanganStore } from "@/stores/datamaster/ruangan";
import { useMonitoringKamarStore } from "@/stores/admisi/monitoringKamar";

// NOTE Store
const storeUtils = utilsStore();
const praktisiStore = usePraktisiStore();
const lokasiStore = useLokasiStore();
const monitoringStore = useMonitoringKamarStore();

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  isSEP: {
    type: Boolean,
    default: false,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  filterData: {
    type: Object as PropType<FilterAdmisi>,
    default: {},
  },
});

const emit = defineEmits(["daftar", "daftarBayi", "search"]);

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");
const searchDPJPFilter = ref<string | undefined>("Semua");
const selectedRoomName = ref<string | null>(null);


const listDpjp = ref<any[]>([]);

// SECTION Rawat Jalan
const filterPoliList = ref<Poli[]>([]);
interface Poli {
  name: string;
  faskesUuid: string;
}
const selectedFilterPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterPoli.value.includes(label)) {
    selectedFilterPoli.value = selectedFilterPoli.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPoli.value.push(label);
  }
  emit("search");
};

const filterRegisterMethod = ref(["ADMISI", "APM", "MOBILE"]);
const selectedFilterRegisterMethod = ref<string[]>([]);
const onRegisterMethodSelect = (label: string) => {
  if (selectedFilterRegisterMethod.value.includes(label)) {
    selectedFilterRegisterMethod.value =
      selectedFilterRegisterMethod.value.filter((item) => item != label);
  } else {
    selectedFilterRegisterMethod.value.push(label);
  }
  emit("search");
};
// !SECTION

// SECTION Rawat Inap
const payload = ref<any[]>([]); 
const filterRoomList = ref<any[]>([]);
const selectedFilterRoom = ref<string[]>([]);

const onFilterRoomSelect = (label: string) => {
  if (selectedFilterRoom.value.includes(label)) {
    selectedFilterRoom.value = selectedFilterRoom.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterRoom.value.push(label);
  }
  emit("search");
};

const filterBedRoomList = ref(["MAWAR I", "MAWAR II"]);
const selectedFilterBedRoom = ref<string[]>([]);
const onFilterBedRoomSelect = (label: string) => {
  if (selectedFilterBedRoom.value.includes(label)) {
    selectedFilterBedRoom.value = selectedFilterBedRoom.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterBedRoom.value.push(label);
  }
};
// !SECTION

// SECTION IGD
const filterPatientList = ref([
  { name: "DATA LENGKAP", value: "0" },
  { name: "DATA TIDAK LENGKAP", value: "1" },
]);
const selectedFilterPatient = ref<string[]>([]);
const onFilterPatientSelect = (label: string) => {
  if (selectedFilterPatient.value.includes(label)) {
    selectedFilterPatient.value = selectedFilterPatient.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPatient.value.push(label);
  }
  emit("search");
};
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
  emit("search");
};

// NOTE SEP Filter
const selectedSEPType = ref<string>("belumSEP");
const onSEPTypeSelect = (label: string) => {
  selectedSEPType.value = label;
};

const filters = [
  selectedFilterPoli,
  selectedFilterRegisterMethod,
  selectedFilterRoom,
  selectedFilterBedRoom,
  selectedFilterPatient,
  selectedPaymentMethod,
];

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
  });
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchPatientFilter.value = "";
  searchDPJPFilter.value = "Semua";
  emit('search');
};

const setFilter = (dataFilter: FilterAdmisi) => {
  selectedFilterPoli.value = dataFilter.poly ?? [];
  selectedFilterRegisterMethod.value = dataFilter.platform
    ? dataFilter.platform.split(',')
    : [];
  selectedFilterRoom.value = dataFilter.room ?? [];
  selectedFilterPatient.value = dataFilter.withoutIdentity
    ? [dataFilter.withoutIdentity]
    : [];
  selectedPaymentMethod.value = dataFilter.paymentMethod
    ? [dataFilter.paymentMethod]
    : [];
  startDateFilter.value = dataFilter.startDate
    ? (epochToDate(parseInt(dataFilter.startDate)) as Date)
    : new Date();
  endDateFilter.value = dataFilter.endDate
    ? (epochToDate(parseInt(dataFilter.endDate)) as Date)
    : new Date();
  searchPatientFilter.value = dataFilter.q ?? "";
  searchDPJPFilter.value = dataFilter.dpjp == "" ? "Semua" : dataFilter.dpjp;
};

const fetchUtils = async () => {
  storeUtils.setLoading(true);
  try {
    // FIXME Masih menggunakan api biasa dan filter by FE
    const responseDpjp = await praktisiStore.getApi({
      limit: 9999,
      non_doctor: false,
    });
    if (responseDpjp && responseDpjp.payload) {
      listDpjp.value = responseDpjp.payload.filter(
        (praktisi: any) => praktisi.isDoctor && praktisi.status
      );
    } else listDpjp.value = [];
    if (props.pageType == "rawat-jalan") {
      // FIXME Masih menggunakan api biasa dan filter by FE
      const responsePoli = await lokasiStore.getApi(0, 9999);
      if (responsePoli && responsePoli.payload) {
        filterPoliList.value = responsePoli.payload
          .filter((lokasi: any) => lokasi.isPoli && lokasi.status)
          .map((lokasi: any) => {
            return {
              name: lokasi.name,
              faskesUuid: lokasi.uuid,
            };
          });
      } else filterPoliList.value = [];
    }
    if (props.pageType == "rawat-inap" || props.pageType == "rawat-jalan") {
    const responseRoom = await monitoringStore.getAktifRuangan();
    if (responseRoom && responseRoom.payload) {
      filterRoomList.value = responseRoom.payload.map((room: any) => ({
        ...room,
        label:
          props.pageType === "rawat-jalan"
            ? room.className
            : room.name,
      }));
  } else { 
    filterRoomList.value = [];
    console.log("No room data found.");
  }
}
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const searchData = () => {
  let filter = {} as FilterAdmisi;

  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;
  filter.q = searchPatientFilter.value;
  filter.paymentMethod =
    selectedPaymentMethod.value.length > 1 ||
    !selectedPaymentMethod.value.length
      ? ""
      : selectedPaymentMethod.value[0];
  if (props.pageType == "rawat-jalan") {
    filter.platform = selectedFilterRegisterMethod.value.join(',');
    filter.poly = selectedFilterPoli.value;
  }
  // FIXME Belum bisa multiple
  if (props.pageType == "rawat-inap") {
    filter.room = selectedFilterRoom.value;
  }
  if (props.pageType == "igd") {
    filter.withoutIdentity =
      selectedFilterPatient.value.length > 1 ||
      !selectedFilterPatient.value.length
        ? ""
        : selectedFilterPatient.value[0];
  }
  // FIXME Belum bisa berjalan di RJ
  filter.dpjp =
    searchDPJPFilter.value == "Semua" || !searchDPJPFilter.value
      ? ""
      : searchDPJPFilter.value;

  return filter;
};

onMounted(() => {
  fetchUtils();
  setFilter(props.filterData);
});

defineExpose({
  resetFilter,
  searchData,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton
            @click="emit('search')"
            icon="PhArrowClockwise"
            class="mr-5"
          />
          <span v-if="!isSEP" class="leading-10 text-adameds-300 text-heading">
            {{
              pageType == "rawat-jalan"
                ? "Rawat Jalan "
                : pageType == "rawat-inap"
                ? "Rawat Inap"
                : "IGD"
            }}
          </span>
          <CustomBreadCrumb
            v-else
            :home="{
              label: 'SEP',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          />
        </div>
        <CustomButton
          v-if="!isSEP"
          @click="
            pageType == 'rawat-inap' ? emit('daftarBayi') : emit('daftar')
          "
          icon="PhPlus"
          :label="pageType == 'rawat-inap' ? 'Bayi Baru Lahir' : 'Daftar'"
          class="mr-[10px]"
        />
      </div>
    </template>
    <template #content>
      <div class="flex mt-[10px]">
        <CustomTextfield
          v-model="searchPatientFilter"
          label="Cari Pasien"
          placeholder="Cari Nama / address / No. RM"
          class="mr-5 grow"
        />
        <CustomSelect
          v-model="searchDPJPFilter"
          label="DPJP"
          class="mr-5 grow"
          optionLabel="pegawai.name"
          optionValue="uuid"
          :options="[
            {
              uuid: 'Semua',
              pegawai: {
                name: 'Semua',
              },
            },
            // FIXME Dummy
            {
              uuid: '0191a18a-22e4-79f7-9da5-a10a6e1a60f9',
              pegawai: {
                name: 'Rudi tabuti',
              },
            },
            ...listDpjp,
          ]"
          prependIcon="PhMagnifyingGlass"
        />
        <CustomDatePicker
          v-model="startDateFilter"
          :maxDate="endDateFilter"
          label="Tanggal"
          class="w-[150px]"
        />
        <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
        <CustomDatePicker
          v-model="endDateFilter"
          :minDate="startDateFilter"
          :showLabel="false"
          class="mt-auto w-[150px]"
        />
        <CustomButton
          @click="emit('search')"
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto"
        />
        <CustomButton
          @click="resetFilter"
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto"
        />
      </div>
      <div v-if="isSEP" class="flex mt-[10px]">
        <CustomButton
          @click="onSEPTypeSelect('belumSEP')"
          label="BELUM SEP"
          :outlined="selectedSEPType != 'belumSEP'"
          borderColor="border-warning-300"
          :textColor="
            selectedSEPType != 'belumSEP' ? 'text-warning-300' : 'text-white'
          "
          :backgroundColor="
            selectedSEPType != 'belumSEP' ? 'bg-transparent' : 'bg-warning-300'
          "
          class="mt-auto mr-[5px] font-semibold"
          full
        />
        <CustomButton
          @click="onSEPTypeSelect('sudahSEP')"
          label="SUDAH SEP"
          :outlined="selectedSEPType != 'sudahSEP'"
          borderColor="border-warning-300"
          :textColor="
            selectedSEPType != 'sudahSEP' ? 'text-warning-300' : 'text-white'
          "
          :backgroundColor="
            selectedSEPType != 'sudahSEP' ? 'bg-transparent' : 'bg-warning-300'
          "
          class="mt-auto ml-[5px] font-semibold"
          full
        />
      </div>
      <div class="font-semibold text-SM text-grey-300">
        <div v-if="pageType == 'rawat-jalan'">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Poli</div>
            <div class="flex flex-wrap grow">
              <div class="h-5 my-auto border border-grey-300"></div>
              <CustomChip
              v-for="poli in filterPoliList"
              :key="poli.faskesUuid"
              :label="poli.name"
              :value="poli.faskesUuid"
              class="ml-[10px]"
              :isSelected="selectedFilterPoli.includes(poli.faskesUuid)"
              @selected="onPoliSelect"
            />
            </div>
          </div>
          <div v-if="!isSEP" class="flex my-[10px]">
            <div class="w-[15%]">Filter Cara Daftar</div>
            <div class="flex flex-wrap grow">
              <div class="h-5 my-auto border border-grey-300"></div>
              <CustomChip
                v-for="(method, index) in filterRegisterMethod"
                :key="method + index"
                :label="method"
                borderColor="border-adameds-300"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                :iconSize="16"
                class="ml-[10px]"
                selectedColor="bg-adameds-300 border-adameds-300"
                :isSelected="selectedFilterRegisterMethod.includes(method)"
                @selected="onRegisterMethodSelect"
              />
            </div>
          </div>
        </div>
        <div v-else-if="pageType == 'rawat-inap'">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Ruangan</div>
            <div class="flex">
              <div class="h-5 my-auto border border-grey-300"></div>
              <!-- <CustomChip
                v-for="(room, index) in [
                  { uuid: '123', name: '102' },
                  ...filterRoomList,
                ]"
                :key="room.uuid + index"
                :label="room.name"
                class="ml-[10px]"
                :isSelected="selectedFilterRoom.includes(room.name)"
                @selected="onFilterRoomSelect"
              /> -->
              <CustomChip
                  v-for="(room, index) in filterRoomList"
                  :key="room.uuid + index"
                  :label="room.label"
                  class="ml-[10px]"
                  :isSelected="selectedFilterRoom.includes(room.label)"
                  @selected="onFilterRoomSelect"
                />
            </div>
          </div>
          <!-- <div class="flex my-[10px]">
            <div class="w-[15%]">Filter Kamar</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(bedRoom, index) in filterBedRoomList"
                :key="bedRoom + index"
                :label="bedRoom"
                class="ml-[10px]"
                :isSelected="selectedFilterBedRoom.includes(bedRoom)"
                @selected="onFilterBedRoomSelect"
              />
            </div>
          </div> -->
        </div>
        <div v-else-if="pageType == 'igd'">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Pasien</div>
            <div class="flex">
              <div class="h-5 my-auto border border-grey-300"></div>
              <CustomChip
                v-for="(patientType, index) in filterPatientList"
                :key="patientType.name + index"
                :label="patientType.name"
                :value="patientType.value"
                class="ml-[10px]"
                :isSelected="selectedFilterPatient.includes(patientType.value)"
                @selected="onFilterPatientSelect"
              />
            </div>
          </div>
        </div>
        <div v-if="!isSEP" class="flex my-[10px]">
          <div class="w-[15%]">Filter Pembayaran</div>
          <div class="flex">
            <div class="h-5 my-auto border border-grey-300"></div>
            <CustomChip
              label="TUNAI"
              value="1"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
              customClass="h-5"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('1')"
              @selected="onPaymentMethodSelect"
              selectedColor="bg-adameds-300 border-adameds-300"
            />
            <CustomChip
              label="ASURANSI"
              value="2"
              borderColor="border-warning-300"
              bgColor="bg-warning-50"
              iconColor="text-warning-300"
              textColor="text-warning-300"
              customClass="h-5"
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
