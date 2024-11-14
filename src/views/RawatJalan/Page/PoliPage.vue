<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";
import { useIndexStore } from "@/stores";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { downloadPdf } from "@/utils/PdfMake";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import OdontogramInput from "@/components/RekamMedis/PemeriksaanGigi/OdontogramInput.vue";
import RMCustomSelect from "@/components/Base/RMCustomSelect.vue";
import Pelayanan from "../Layout/Tabel/Poli/DataPelayananRawatJalan.vue";
import { useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import Discharge from "../Layout/Tabel/Poli/DataDischargeRawatJalan.vue";
import { utilsStore } from "@/stores/utils";
import { useAdmisiRJStore } from "@/stores/admisi/rawatJalan";

import type { FilterAdmisi } from "@/utils/Interface";
import { dateToEpoch, setTimeForDate } from "@/utils/Helpers";
import DataPoliBPJSHeader from "../Layout/Header/DataPoliBPJSHeader.vue";

// const filterPoliList = ref([
//   { name: "POLI UMUM", uuid: "0191a18a-22e4-773b-8229-a023f420d0bc" },
//   { name: "POLI ANAK", uuid: "0191a18a-22e4-773b-8229-a023f420d0bd" },
//   { name: "POLI GIGI POLI MATA", uuid: "0191a18a-22e4-773b-8229-a023f420d0be" },
//   { name: "Faskes Example", uuid: "0191a18a-22e4-773b-8229-a023f420d0bb" },
// ]);

// NOTE Store
const storeUtils = utilsStore();
const admisiRJStore = useAdmisiRJStore();

const headerPoliBPJSRef = ref<typeof DataPoliBPJSHeader>();

const resetFilter = () => {
  headerPoliBPJSRef.value?.resetFilter();
  filterData.value = headerPoliBPJSRef.value?.searchData() ?? {
    startDate: dateToEpoch(setTimeForDate(new Date(), 0, 0, 0)),
    endDate: dateToEpoch(setTimeForDate(new Date(), 23, 59, 59)),
  };
};

const patientData = ref<any>([]);

const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const filterData = ref<FilterAdmisi>({});

const search = async () => {
  filterData.value = headerPoliBPJSRef.value?.searchData();
  if (currentRouteName.value == "rawat-jalan-poli") {
    patientData.value = await fetchRJPatient();
  }
};

const fetchRJPatient = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await admisiRJStore.getRJ(filterData.value);
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
interface Filter {
  name: string;
  uuid: string;
}

const props = defineProps<{
  filter: Filter;
}>();

// Saat klik Filter Poli
watch(
  () => props.filter,
  (newFilter) => {
    if (newFilter) {
      resetFilter();
      filterData.value = {
        ...filterData.value,
        poly: newFilter.uuid,
      };

      fetchRJPatient();
    } else {
      console.warn("Invalid filter format:", newFilter);
    }
  }
);

const value = ref("0");

const showCancelVisit = ref(false);
const cancelReason = ref<string>();
const selectedPatient = ref<any[]>([]);

const route = useRoute();
const currentRouteName = ref("");

onMounted(() => {
  currentRouteName.value = route.name ? String(route.name) : "";
  search();
});

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

const isResetPatient = ref(false);

const resetCancelVisit = () => {
  cancelReason.value = ''; // Kosongkan cancelReason
  selectedPatient.value = []; // Kosongkan selectedPatient
  showCancelVisit.value = false; // Menutup tampilan cancel visit
  isResetPatient.value = !isResetPatient.value;
};

const handleResetPatient = () => {
  isResetPatient.value = false
};



</script>

<template>
  {{selectedPatient.length}}
  {{ selectedPatient }}
  <!-- {{ currentRouteName }} -->
  <!-- {{ filterData }} -->
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <DataPoliBPJSHeader
        ref="headerPoliBPJSRef"
        :activeTab="value"
        @search="search"
        @payment="search"
        :filter-menu="filter"
        :filter-data="filterData"
        :current-route-name="currentRouteName"
      >
        <template #content>
          <div class="flex items-center gap-2">
            <CustomButton
              label=""
              icon="PhListBullets"
              class="w-[60px]"
              :text-color="value === '0' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '0' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '0' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '0'"
              :outlined="value !== '0'"
            />
            <!-- Filter = {{ props.filter }} -->
            <CustomButton
              label="PELAYANAN"
              class="grow"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="DISCHARGE"
              class="grow"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '2' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
          </div>
        </template>
      </DataPoliBPJSHeader>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="1">
            <Pelayanan
            :isResetPatient ="isResetPatient"
              :show-cancel-visit="showCancelVisit"
              @handle-selected-patient="updateSelectedPatient"
              @handle-unselected-patient="updateUnselectedPatient"
              @selectedAll="updateSelectedPatient"
              @handle-unselect-all="updateUnselectAll"
              @is-reset-patient="handleResetPatient"
            />
          </TabPanel>
          <TabPanel value="2">
            <Discharge />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <div :class="value === '1' ? 'flex justify-between' : 'flex justify-end'">
        <div class="flex" v-if="value == '1'">
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
            @click="showCancelVisit = true"
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
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: 0</template>
        </Paginator>
      </div>
    </template>
  </Card>
</template>
