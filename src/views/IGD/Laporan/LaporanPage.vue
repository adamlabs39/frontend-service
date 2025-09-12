<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useIgdLaporanStore } from "@/stores/igd/laporan";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { utilsStore } from "@/stores/utils";
import { useAdmisiReportStore } from "@/stores/admisi/laporan";
import { dateToEpoch, setTimeForDate } from "@/utils/Helpers";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import KunjunganIgd from "./KunjunganIgd.vue";
import PembatalanDirawat from "./PembatalanDirawat.vue";
import RekapTindakanPasien from "./RekapTindakanPasien.vue";
import FooterPagination from "../Layout/FooterPagination.vue";
import NoData from "@/components/section/NoData.vue";

//Bread Crumb
const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");

// Store
const praktisiStore = usePraktisiStore();
const IgdLaporanStore = useIgdLaporanStore();
const admisiLaporanStore = useAdmisiReportStore();
const UseUtilsStore = utilsStore();
const reportType = ref("");
const reportData = ref<any[]>([]);
const searchQuery = ref("");
const selectedBulan = ref<number>(0);
const praktisiPayload = ref<any>([]);
const selectedFilterValue = ref("");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

const updatePageType = async (path: string) => {
  resetFilter();
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[3] ?? "";
  dataBreadCrumb.value = [
    {
      label: pageType.value
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    },
  ];
  reportType.value = pageType.value;
  let filter = {} as Filter;
  filter = setFilter();
  reportData.value = await fetchLaporanData(filter);
};

const setFilter = () => {
  let filter = {} as Filter;
  if (pageType.value == "rekap-tindakan-pasien") {
    filter.jenisKunjungan = "igd";
  } else {
    filter.jenisKunjungan = "IGD";
  }

  filter.page = properties.value.page;
  filter.limit = properties.value.page_size;
  filter.q = searchQuery.value;
  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;
  filter.name = searchQuery.value;
  filter.practitionerUuid = selectedFilterValue.value ?? "";
  filter.month = selectedBulan.value !== 0 ? selectedBulan.value : undefined; // Pastikan month hanya ada jika terisi
  return filter;
};

const resetFormRef = ref();
const resetFilter = () => {
  searchQuery.value = "";
  selectedFilterValue.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  resetFormRef.value.resetForm();
  selectedBulan.value = 0;
};
const handleReset = () => {
  resetFilter();
  reloadData();
};

const handleSelectedPraktisi = (value: any) => {
  selectedFilterValue.value = value;
};
const handleSearchQuery = (value: string) => {
  searchQuery.value = value;
};
const handleSelectedBulan = (value: any) => {
  selectedBulan.value = value;
};
const handleStartDate = (value: any) => {
  startDateFilter.value = value;
};
const handleEndDate = (value: any) => {
  endDateFilter.value = value;
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});

interface Filter {
  page?: number;
  limit?: number;
  q?: string;
  practitionerUuid?: string;
  jenisKunjungan?: string;
  penjamin?: string;
  ruangan?: string;
  startDate?: string;
  endDate?: string;
  name?: string;
  lokasiUuid?: string;
  month?: number;
}

const fetchLaporanData = async (filter: Filter = {}) => {
  UseUtilsStore.setLoading(true);
  let response;
  try {
    if (pageType.value == "kunjungan-igd") {
      response = await admisiLaporanStore.getKunjunganReport(filter);
    } else if (pageType.value == "pembatalan-dirawat") {
      response = await admisiLaporanStore.getBatalKunjunganReport(filter);
    } else if (pageType.value == "rekap-tindakan-pasien") {
      response = await IgdLaporanStore.getLaporanTindakan(filter);
    }
    if (response && response.payload) {
      properties.value.total = response.properties.totalData;
      return response.payload;
    } else return [];
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  reloadData();
};

onMounted(() => {
  updatePageType(route.path);
  fetchPraktisi();
});
const fetchPraktisi = async () => {
  try {
    const response = await praktisiStore.getAktifApi();
    if (response && response.payload) {
      praktisiPayload.value = response.payload;
    } else {
      praktisiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kategori ruangan", error);
    praktisiPayload.value = [];
  }
};
const dokterDJP = ref([
  {
    uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
    name: "Rudi tabuti",
  },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6089", name: "dr. Ali" },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6067", name: "dr. Doom" },
]);

const reloadData = async () => {
  let filter = {} as Filter;
  filter = setFilter();
  reportData.value = await fetchLaporanData(filter);
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        :pageType="pageType"
        :dataBreadCrumb="dataBreadCrumb"
        @update:valueSearch="handleSearchQuery"
        @reload-data="reloadData()"
        @update:selectedFilter="handleSelectedPraktisi"
        @search="reloadData()"
        @update:selectedMonth="handleSelectedBulan"
        @reset="handleReset()"
        @update:startDateFilter="handleStartDate"
        @update:endDateFilter="handleEndDate"
        :filterSelect="
          pageType === 'rekap-tindakan-pasien' ? praktisiPayload : dokterDJP
        "
        ref="resetFormRef"
      />
    </template>
    <template #content>
      <!-- has data true -->
      <div v-if="reportData.length">
        <KunjunganIgd
          :payload="reportData"
          v-if="pageType === 'kunjungan-igd'"
        />
        <PembatalanDirawat
          :payload="reportData"
          v-if="pageType === 'pembatalan-dirawat'"
        />
        <RekapTindakanPasien
          :payload="reportData"
          v-if="pageType === 'rekap-tindakan-pasien'"
        />
      </div>

      <NoData v-else />
    </template>
    <template #footer>
      <FooterPagination
        :rows="properties.page_size"
        :totalRecords="properties.total"
        @page="handlePage"
      />
    </template>
  </Card>
</template>
