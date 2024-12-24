<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch} from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import DataPoliBPJSHeader from "../Layout/Header/DataPoliBPJSHeader.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import type { FilterAdmisi } from "@/utils/Interface";
import { dateToEpoch, setTimeForDate } from "@/utils/Helpers";
import { utilsStore } from "@/stores/utils";
import { useAdmisiRIStore } from "@/stores/admisi/rawatInap";
import DataPelayananRawatJalan from "@/views/RawatJalan/Layout/Tabel/Poli/DataPelayananRawatJalan.vue";
import NoData from "@/components/section/NoData.vue";
import DataPasienRawatInap from "../Layout/Tabel/Ruangan/DataPasienRawatInap.vue";

// STORE
const storeUtils = utilsStore();
const admisiRIStore = useAdmisiRIStore();
// ROUTE
const route = useRoute();
const currentRouteName = ref("");

// PROPERTIES FOR PAGINATION
const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// FIlter for Sidebar Ruangan
const props = defineProps<{
  filterRuangan: Filter;
}>();

interface Filter {
  name: string;
  uuid: string;
}

const isDataFetched = ref(false);

// Data Patient From API
const patientData = ref<any>([]);
// DIRAWAT / DISCHARGE
const statusPelayanan = ref("");

const showCancelVisit = ref(false);
const cancelReason = ref<string>();

// Menyimpan emit ke variabel
const searchQuery = ref("");
const dokter = ref("");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const selectedFilterPayment = ref<string[]>([]);

// Event emit FROM HEADER
const handleSearchQuery = (value: string) => {
  searchQuery.value = value;
};
const handleDokter = (value: string) => {
  dokter.value = value;
};
const handleStartDate = (value: any) => {
  startDateFilter.value = value;
};
const handleEndDate = (value: any) => {
  endDateFilter.value = value;
};
const handleReset = () => {
  resetFilter();
  reloadData();
};
const handleChipPayment = (filters: string[]) => {
  selectedFilterPayment.value = filters;
  reloadData();
};

// Filter Data
const filterData = ref<FilterAdmisi>({});

// Ambil dari RI
const fetchRIPatient = async (filter: FilterAdmisi = {}) => {
  storeUtils.setLoading(true);
  let response;
  // console.log(currentRouteName.value)
  try {
    if (currentRouteName.value === 'ruangan') {
      response = await admisiRIStore.getRI(filter);
      return response.payload;
    }
   
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    storeUtils.setLoading(false);
    isDataFetched.value = true;
  }
};

// Reload dan Terapkan Filter
const reloadData = async () => {
  let filter = {} as FilterAdmisi;
  filter = setFilter();
  patientData.value = await fetchRIPatient(filter);
};



const setFilter = () => {
  let filter = {} as FilterAdmisi;
  filter.page = properties.value.page;
  filter.limit = properties.value.page_size;
  filter.q = searchQuery.value;
  filter.paymentMethod =
    selectedFilterPayment.value.length > 1 ||
    !selectedFilterPayment.value.length
      ? ""
      : selectedFilterPayment.value[0];
  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;
  filter.status = statusPelayanan.value;

  // Simpan props.filterRuangan ke variabel baru

  // Terapkan ke filter.room
  filter.room = [props.filterRuangan.name];
  filter.dpjp = dokter.value;

  return filter;
};


// ACCESSING FROM OUTSIDE COMPONENT
const resetFormRef = ref();

const resetFilter = () => {
  searchQuery.value = "";
  selectedFilterPayment.value = [];
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  resetFormRef.value.resetForm();
  dokter.value = "";
  selectedFilterPayment.value = [];
  statusPelayanan.value = "";
};

// PAGINATION
const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  reloadData();
};

// New flag to track the first fetch
// const isDataFetched = ref(false);

// Watcher Ruangan
watch(
  () => props.filterRuangan,
  async(newFilter) => {
    //  console.log(`Filter anyar`, newFilter);
    // resetFilter();
    // reloadData();
    filterData.value = {
      ...filterData.value,
      room: [newFilter.name],
      startDate: `${dateToEpoch(
        setTimeForDate(startDateFilter.value, 0, 0, 0)
      )}`,
      endDate: `${dateToEpoch(
        setTimeForDate(endDateFilter.value, 23, 59, 59)
      )}`,
    }
    console.log(`filter paling baru`, filterData.value);
    patientData.value = await fetchRIPatient(filterData.value);
  },
  // { immediate: false }
);

// DISCHARGE / DIRAWAT
const filterStatus = (status: string) => {
  statusPelayanan.value = status;
  reloadData();
  // fetchRIPatient()
};

// WHEN PAGE CHANGE
const updatePageType = async (path: string) => {
  resetFilter();
  const tempArrPath = path.split("/");
  currentRouteName.value = tempArrPath[2] ?? "";

  let filter = {} as FilterAdmisi;
  filter = setFilter();
  // console.log(currentRouteName.value);
  patientData.value = await fetchRIPatient(filter);
};


onBeforeRouteLeave((to, from) => {
  console.log('Navigating from:', from.path, 'to:', to.path);
  updatePageType(to.path);
});



onMounted(() => {
  updatePageType(route.path);
  // fetchRIPatient();
  // isDataFetched.value = true;
});
</script>
<template>
  <!-- {{ patientData }} -->
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <DataPoliBPJSHeader
        ref="resetFormRef"
        @update:value-search="handleSearchQuery"
        @update:value-dokter="handleDokter"
        @update:valueStartDate="handleStartDate"
        @update:value-end-date="handleEndDate"
        @search="reloadData()"
        @reset="handleReset()"
        @payment="handleChipPayment"
        @reloadData="reloadData()"
        :filter-menu="filterRuangan"
        :filter-data="filterData"
        :current-route-name="currentRouteName"
      >
        <template #content>
          <div class="flex items-center gap-2">
            <CustomButton
              label=""
              icon="PhListBullets"
              class="w-[60px]"
              :text-color="
                statusPelayanan === '' ? 'text-white' : 'text-adameds-300'
              "
              :border-color="
                statusPelayanan === '' ? 'border-none' : 'border-adameds-300'
              "
              :class="statusPelayanan === '' ? 'bg-adameds-300' : 'bg-white'"
              @click="filterStatus('')"
              :outlined="statusPelayanan !== ''"
            />
            <!-- Filter = {{ props.filter }} -->
            <CustomButton
              label="DIRAWAT"
              class="grow"
              :text-color="
                statusPelayanan === '1' ? 'text-white' : 'text-adameds-300'
              "
              :border-color="
                statusPelayanan === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="statusPelayanan === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="filterStatus('1')"
              :outlined="statusPelayanan !== '1'"
            />
            <CustomButton
              label="DISCHARGE"
              class="grow"
              :text-color="
                statusPelayanan === '0' ? 'text-white' : 'text-adameds-300'
              "
              :border-color="
                statusPelayanan === '0' ? 'border-none' : 'border-adameds-300'
              "
              :class="statusPelayanan === '0' ? 'bg-adameds-300' : 'bg-white'"
              @click="filterStatus('0')"
              :outlined="statusPelayanan !== '0'"
            />
          </div>
        </template>
      </DataPoliBPJSHeader>
    </template>
    <template #content>
      <Tabs v-model:value="statusPelayanan" class="h-full">
        <TabPanels class="flex flex-col w-full h-full p-0">
          <TabPanel value="1" class="flex-1">
            <DataPasienRawatInap :data-patient="patientData" />
          </TabPanel>
          <TabPanel value="0" class="flex-1">
            <!-- <Discharge /> -->
            <NoData class="w-full h-full" />
          </TabPanel>
          <TabPanel value="" class="flex-1">
            <NoData class="w-full h-full" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <div class="flex">
          <CustomButton
            v-if="!showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto bg-danger-300"
            label="Batal Kunjungan"
          />
          <CustomButton
            v-if="showCancelVisit"
            class="my-auto mr-[10px]"
            label="Batal"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            v-if="showCancelVisit"
            class="my-auto mr-5 bg-danger-300"
            label="Iya, Batalkan"
          />

          <CustomTextfield
            v-if="showCancelVisit"
            v-model="cancelReason"
            :showLabel="false"
            class="my-auto w-[400px]"
            placeholder="Alasan Batal Kunjungan"
          />
        </div>
        <CustomPaginator
          :rows="properties.page_size"
          :totalRecords="properties.total"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>
