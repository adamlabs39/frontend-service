<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import { utilsStore } from "@/stores/utils";
import type { DataTableRowClickEvent } from "primevue/datatable";
import NoData from "@/components/section/NoData.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import FooterPagination from "../Layout/FooterPagination.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import { useAdmisiIGDStore } from "@/stores/admisi/igd";
import type { FilterAdmisi } from "@/utils/Interface";
import { epochToDate, dateToEpoch, setTimeForDate } from "@/utils/Helpers";

const storeUtils = utilsStore();
const admisiIGDStore = useAdmisiIGDStore();
const pageType = ref("");
const route = useRoute();
const searchQuery = ref("");
const reportData = ref<any[]>([]);
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const dataBreadCrumb = ref<MenuItem[]>([]);
const updatePageType = (path: string) => {
  resetFilter();
  dataBreadCrumb.value = [];
  const tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
  reloadData();
};

const changeSection = (label: string, data: any = null) => {
  let tempData = { label };
  if (data) {
    tempData = { ...tempData, ...data };
  }
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = tempData;
  } else {
    dataBreadCrumb.value.push(tempData);
  }
};

onBeforeRouteLeave((to) => {
  updatePageType(to.path);
});

onMounted(() => {
  updatePageType(route.path);

  if (storeUtils.selectedRoom) {
    changeSection("Daftar");
  }
});
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
  filter.withoutIdentity =
    selectedFilterPatient.value.length > 1 ||
    !selectedFilterPatient.value.length
      ? ""
      : selectedFilterPatient.value[0];
  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;
  filter.dpjp = selectedFilterValue.value ?? "";
  return filter;
};
const handleStartDate = (value: any) => {
  startDateFilter.value = value;
};
const handleEndDate = (value: any) => {
  endDateFilter.value = value;
};
const handleSearchQuery = (value: string) => {
  searchQuery.value = value;
};

const reloadData = async () => {
  let filter = {} as FilterAdmisi;
  filter = setFilter();
  reportData.value = await fetchIGDPatient(filter);
};

const onFilterCipPasien = (filters: string[]) => {
  selectedFilterPatient.value = filters; // Update selected filters
  reloadData();
};
const onFilterCipPayment = (filters: string[]) => {
  selectedFilterPayment.value = filters; // Update selected filters
  reloadData();
};
const handleReset = () => {
  resetFilter();
  reloadData();
};
const resetFormRef = ref();
const resetFilter = () => {
  searchQuery.value = "";
  selectedFilterPayment.value = [];
  selectedFilterPatient.value = [];
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  resetFormRef.value.resetForm();
};

const fetchIGDPatient = async (filter: FilterAdmisi = {}) => {
  storeUtils.setLoading(true);
  try {
    const response = await admisiIGDStore.getIGD(filter);
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

const selectedPatient = ref<any[]>([]);
const showCancelVisit = ref(false);
const cancelReason = ref<string>();
const openedPatientData = ref<any>({});
const selectedTab = ref("2");
const selectedFilterPatient = ref<string[]>([]);
const selectedFilterPayment = ref<string[]>([]);
const selectedFilterValue = ref("");

// const showPatientDetail = (event: DataTableRowClickEvent) => {
//   openedPatientData.value = event.data;
//   if (pageType.value === "rawat-jalan") {
//     if (openedPatientData.value.status_rj === "1") {
//       changeSection("Checkin", { platform: openedPatientData.value.platform });
//     } else {
//       changeSection("Detail");
//     }
//   } else if (pageType.value === "rawat-inap") {
//     if (
//       openedPatientData.value.status_ri === "1" ||
//       openedPatientData.value.status_ri === "2"
//     ) {
//       changeSection("Daftar");
//     } else {
//       changeSection("Detail");
//     }
//   } else {
//     changeSection("Detail");
//   }
// };

const handleSelectedTab = (newTab: string) => {
  selectedTab.value = newTab;
};
const handleSelectedPraktisi = (value: any) => {
  selectedFilterValue.value = value;
};
const toggleCancelVisit = () => {
  showCancelVisit.value = !showCancelVisit.value;
  cancelReason.value="";
};

const confirmCancel = async () => {
  try {
    storeUtils.setLoading(true);
    let payload = {
      listUuid: [] as any[],
      cancelReason: cancelReason.value,
    };
    selectedPatient.value.forEach((patientData: any) => {
      payload.listUuid.push(patientData.uuid);
    });
    console.log("payload cancle visit",payload)
    const response = await admisiIGDStore.cancelVisitIGD(payload);
    console.log("response data",response)
    showCancelVisit.value = false;
    cancelReason.value = undefined;
    await reloadData();
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};
const medicalRecord = ref<any>();

const openDialogRM = () => {
  medicalRecord.value?.showDialogRM();
};

const handleCancleReason = (value: string) => {
  cancelReason.value = value;
};
const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  reloadData();
};

const dokterDJP = ref([
  {
    uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
    name: "Rudi tabuti",
  },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6089", name: "dr. Ali" },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6067", name: "dr. Doom" },
]);

</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        pageType="pasien-igd"
        @update:valueSearch="handleSearchQuery"
        @update:selectedFilter="handleSelectedPraktisi"
        @selected-tab="handleSelectedTab"
        @reload-data="reloadData()"
        @search="reloadData()"
        @update:startDateFilter="handleStartDate"
        @update:endDateFilter="handleEndDate"
        @filterChipPasien="onFilterCipPasien"
        @filterChipPayment="onFilterCipPayment"
        @reset="handleReset()"
        :filterSelect="dokterDJP"
        ref="resetFormRef"
      />
    </template>
    <template #content>
      <DataTable
        v-if="reportData.length"
        v-model:selection="selectedPatient"
        :value="reportData"
        tableStyle="min-width: 50rem"
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
        @rowClick="openDialogRM"
      >
        <Column field="nomor" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">Nomor</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <div class="text-SM">{{ slotProps.data.noRm }}</div>
              <div class="text-SM">{{ slotProps.data.noReg }}</div>
            </div>
          </template>
        </Column>
        <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">
              <span class="font-semibold">{{
                slotProps.data.patient.name
              }}</span>
              <span class="text-grey-300">
                ({{ slotProps.data.birthDetail.ageYear }}Th
                {{ slotProps.data.birthDetail.ageMonth }}Bln
                {{ slotProps.data.birthDetail.ageDay }}Hr)
              </span>
            </div>
            <div class="text-XS">
              {{ slotProps.data.patient.address.full_address }}
            </div>
            <div class="flex flex-wrap">
              <!-- <PhUserCirclePlus
                v-if="slotProps.data.new_patient"
                :size="22"
                class="text-adameds-300 mt-auto mr-[5px]"
                weight="fill"
              /> -->
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.patient.gender == 'Female'
                    ? 'Perempuan'
                    : 'Laki-laki'
                "
                :bgColor="
                  slotProps.data.patient.gender == 'Female'
                    ? 'bg-female-75'
                    : 'bg-male-75'
                "
                :textColor="
                  slotProps.data.patient.gender == 'Female'
                    ? 'text-female-300'
                    : 'text-male-300'
                "
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.patient.phone ?? '-'"
                bgColor="bg-adameds-75"
                textColor="text-adameds-300"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="keperawatan"
          header="Keperawatan"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex mb-[5px] text-SM">
              <div>
                {{ slotProps.data.practitioner.title }}
                {{ slotProps.data.practitioner.nama }}
              </div>
            </div>
            <div class="flex flex-wrap">
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.withoutIdentity
                    ? 'DATA TIDAK TIDAK LENGKAP'
                    : 'DATA LENGKAP'
                "
                customClass="h-5 pr-[5px] mr-[5px]"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.paymentMethod == 1 ? 'TUNAI' : 'ASURANSI'
                "
                :bgColor="
                  slotProps.data.paymentMethod == 1
                    ? 'bg-adameds-50'
                    : 'bg-warning-50'
                "
                :textColor="
                  slotProps.data.paymentMethod == 1
                    ? 'text-adameds-300'
                    : 'text-warning-300'
                "
                :borderColor="
                  slotProps.data.paymentMethod == 1
                    ? 'border-adameds-300'
                    : 'border-warning-300'
                "
                customClass="h-5 pr-[6px] mr-[5px]"
              />
            </div>
          </template>
        </Column>
        <Column
          field="data-kunjungan"
          header="Data Kunjungan"
          headerClass="bg-adameds-50"
          style="width: 25%"
        >
          <template #body="slotProps">
            <div class="text-SM">
              <div
                class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
              >
                Daftar
                <ArrowRightBrokenIcon
                  :size="18"
                  class="my-auto mr-5 text-grey-300"
                  weight="bold"
                />
                {{ epochToDate(slotProps.data.tanggalDaftar, "dateTime") }}
              </div>
              <div
                class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
              >
                Discharge
                <ArrowRightBrokenIcon
                  :size="18"
                  class="my-auto mr-5 text-male-300"
                  weight="bold"
                />
                30 Juli 2024
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50"
          class="w-[114px]"
        >
          <template #body="slotProps">
            <div>
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.statusIgd == 0
                    ? 'Cancle'
                    : slotProps.data.statusIgd == 1
                    ? 'Dirawat'
                    : 'Discharge'
                "
                customClass="h-5 pr-[5px] mr-[5px] border-none"
                :bgColor="
                  slotProps.data.statusIgd == 0
                    ? 'bg-danger-75'
                    : slotProps.data.statusIgd == 1
                    ? 'bg-blueJeans-75'
                    : 'bg-mint-75'
                "
                :textColor="
                  slotProps.data.statusIgd == 0
                    ? 'text-danger-300'
                    : slotProps.data.statusIgd == 1
                    ? 'text-blueJeans-300'
                    : 'text-mint-300'
                "
              />
            </div>
            <div>
              <CustomChip
                :showCheckedIcon="false"
                label="Lunas"
                customClass="h-5 pr-[5px] mr-[5px] border-none"
                :bgColor="
                  slotProps.data.statusPembayaran == 'Belum Lunas'
                    ? 'bg-grey-100'
                    : 'bg-success-75'
                "
                :textColor="
                  slotProps.data.statusPembayaran == 'Belum Lunas'
                    ? 'text-grey-400'
                    : 'text-success-300'
                "
              />
            </div>
          </template>
        </Column>
        <Column
          v-if="showCancelVisit"
          selectionMode="multiple"
          headerStyle="width: 3rem"
          headerClass="bg-adameds-50"
          class="custom-checkbox"
        ></Column>
      </DataTable>
      <NoData v-else />
      <MedicalRecord ref="medicalRecord" />
    </template>
    <template #footer>
      <FooterPagination
        cancleButton
        :rows="properties.page_size"
        :totalRecords="properties.total"
        @page="handlePage"
        :show-cancel-visit="showCancelVisit"
        @toggle-cancel-visit="toggleCancelVisit"
        @confirm-cancel="confirmCancel"
        @update:cancleReason="handleCancleReason"
        :cancleSelected="selectedPatient"
        @update:cancleSelected="selectedPatient = $event"
      />
    </template>
  </Card>
</template>
