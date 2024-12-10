<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataPoliBPJSHeader from "../Layout/Header/DataPoliBPJSHeader.vue";
import DataPasienRawatInap from "../Layout/Tabel/Ruangan/DataPasienRawatInap.vue";
import { useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import type { FilterAdmisi } from "@/utils/Interface";
import { dateToEpoch, setTimeForDate } from "@/utils/Helpers";
import { utilsStore } from "@/stores/utils";
import { useAdmisiRIStore } from "@/stores/admisi/rawatInap";
import DataPelayananRawatJalan from "@/views/RawatJalan/Layout/Tabel/Poli/DataPelayananRawatJalan.vue";
import NoData from "@/components/section/NoData.vue";

const props = defineProps<{
  filterRuang:Filter
}>();

interface Filter {
  name: string;
  uuid: string;
}

const isResetPatient = ref(false);
const selectedPatient = ref<any[]>([]);
const updateSelectedPatient = (patient: any) => {
  console.log("Selected Patient:", patient);
  patient.length > 0
    ? (selectedPatient.value = patient)
    : (selectedPatient.value = []);
};

const updateUnselectedPatient = (patient: any) => {
  if (selectedPatient.value && selectedPatient.value.length > 0) {
    const index = selectedPatient.value.findIndex(
      (p: { id: string }) => p.id === patient.phone
    );
    if (index !== -1) {
      selectedPatient.value.splice(index, 1);
    }
  }
};

const updateUnselectAll = () => {
  selectedPatient.value = [];
};

// Pagination
const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  search();
};


const resetCancelVisit = () => {
  cancelReason.value = ""; // Kosongkan cancelReason
  selectedPatient.value = []; // Kosongkan selectedPatient
  showCancelVisit.value = false; // Menutup tampilan cancel visit
  isResetPatient.value = !isResetPatient.value;
};

const handleResetPatient = () => {
  isResetPatient.value = false;
};

const confirmCancel = async () => {
  console.log(selectedPatient.value);
  try {
    storeUtils.setLoading(true);
    let payload = {
      listUuid: [] as any[],
      cancelReason: cancelReason.value,
    };
    selectedPatient.value.forEach((patient) => {
      payload.listUuid.push(patient.uuid);
    });
    console.log("Payload:", payload);
    const response = await admisiRIStore.cancelVisitRI(payload);
    console.log("Response:", response);
    showCancelVisit.value = false;
    if (response) {
      resetCancelVisit();
      search();
    }
  } catch (error) {
    console.error("Failed to cancel visit", error);
  } finally {
    storeUtils.setLoading(false);
  }
};
// PROPERTIES FOR PAGINATION
const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// STORE
const storeUtils = utilsStore();
const admisiRIStore = useAdmisiRIStore();

// FILTER HEADER
const headerRawatInapRef = ref<typeof DataPoliBPJSHeader>();

// Data Patient From API
const patientData = ref<any>([]);



// DIRAWAT / DISCHARGE
const statusPelayanan = ref("");

const showCancelVisit = ref(false);
const cancelReason = ref<string>();
const route = useRoute();
const currentRouteName = ref("");

// Filter Data
const filterData = ref<FilterAdmisi>({});

// BUTTON CARI
const search = async () => {
  filterData.value = headerRawatInapRef.value?.searchData();
  console.log(`HABIS DI SEARCH`, filterData.value);
  if (currentRouteName.value == "rawat-inap-ruangan") {
    patientData.value = await fetchRIPatient();
  }
};

// BUTTON RESET
const resetFilter = () => {
  headerRawatInapRef.value?.resetFilter();

  filterData.value = headerRawatInapRef.value?.searchData() ?? {
    startDate: dateToEpoch(setTimeForDate(new Date(), 0, 0, 0)),
    endDate: dateToEpoch(setTimeForDate(new Date(), 23, 59, 59)),
  };
};

// Tangani event reset dari DataPoliBPJSHeader
const handleResetStatusPelayanan = () => {
  statusPelayanan.value = "";
};

const fetchRIPatient = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await admisiRIStore.getRI(filterData.value);
    if (response && response.payload) {
      properties.value.total = response.properties.totalData;
      return response.payload;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    storeUtils.setLoading(false);
  }
};


// Cantumkan Status Pelayanan
const filterStatus = async (status: string) => {
  // resetFilter();
  statusPelayanan.value = status;
  filterData.value = {
    ...filterData.value,
    status: statusPelayanan.value,
  };
  patientData.value = await fetchRIPatient();
};

onMounted(() => {
  currentRouteName.value = route.name ? String(route.name) : "";
  console.log(currentRouteName.value)
  search();
});

</script>
<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <DataPoliBPJSHeader
       ref="headerRawatInapRef"
        @search="search"
        @payment="search"
        :filter-menu="props.filterRuang"
        :filter-data="filterData"
        :current-route-name="currentRouteName"
        @resetStatusPelayanan="handleResetStatusPelayanan"
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
        <TabPanels
          class="flex flex-col w-full h-full p-0"
         
        >
          <TabPanel value="1" class="flex-1">
            <DataPelayananRawatJalan
              :data-patient="patientData"
              :isResetPatient="isResetPatient"
              :show-cancel-visit="showCancelVisit"
              @handle-selected-patient="updateSelectedPatient"
              @handle-unselected-patient="updateUnselectedPatient"
              @selectedAll="updateSelectedPatient"
              @handle-unselect-all="updateUnselectAll"
              @is-reset-patient="handleResetPatient"
            />
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
            @click="resetCancelVisit"
            class="my-auto mr-[10px]"
            label="Batal"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="confirmCancel"
            class="my-auto mr-5 bg-danger-300"
            label="Iya, Batalkan"
            :disabled="!cancelReason || selectedPatient.length === 0"
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
