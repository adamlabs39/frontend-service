<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import DataLaporanHeader from "../Layout/Header/DataLaporanHeader.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import DataKunjunganRawatJalan from "../Layout/Tabel/Laporan/DataKunjunganRawatJalan.vue";
import DataPembatalanPoli from "../Layout/Tabel/Laporan/DataPembatalanPoli.vue";
import DataRekapTindakanPasien from "../Layout/Tabel/Laporan/DataRekapTindakanPasien.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { utilsStore } from "@/stores/utils";
import { useRekapTindakanStore } from "@/stores/rawatJalan/laporan/rekapTindakan";
import { useAdmisiIGDStore } from "@/stores/admisi/laporan";
import { dateToEpoch, setTimeForDate } from "@/utils/Helpers";

const properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

const useUtilsStore = utilsStore();

const rekapTindakanPasienStore = useRekapTindakanStore();

const kunjunganRawatJalanStore = useAdmisiIGDStore();

const reportData = ref([]);

const fetchLaporanData = async (filter: Filter = {}) => {
  useUtilsStore.setLoading(true);
  let response;
  try {
    if (pageType.value == "kunjungan-rawat-jalan") {
      response = await kunjunganRawatJalanStore.getKunjunganReport(filter);
    } else if (pageType.value == "pembatalan-poli") {
      console.log("Halo");
    } else {
      response = await rekapTindakanPasienStore.getTindakanPasien(filter);
    }

    if (response && response.payload) {
      properties.value.total = response.properties.totalData;
      return response.payload;
    } else return [];
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const dataBreadCrumb = ref<MenuItem[]>([]);
const route = useRoute();
const pageType = ref("");

const searchPoliklinikFilter = ref<string>("");
const searchDokterDPJPFilter = ref<string>("");
const searchPraktisiFilter = ref<string>("");

// Untuk mengetahui sekarang ada di rute mana

const updatePageType = async (path: string) => {
  // resetFilter();
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
  let filter = {} as Filter;
  filter = setFilter();
  reportData.value = await fetchLaporanData(filter);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
  // fetchRekapTindakanPasienData();
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
}

const searchData = async () => {
  let filter = {} as Filter;
  filter = setFilter();

  reportData.value = await fetchLaporanData(filter);
};

const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.page_size = event.rows;
  searchData();
};

const setFilter = () => {
  let filter = {} as Filter;

  // Menetapkan properti dasar yang diperlukan
  filter.page = properties.value.page
  filter.limit = properties.value.page_size
  filter.q = valueSearchRM.value; // Kata kunci pencarian
  filter.practitionerUuid = valueSearchDPJP.value ?? ""; // ID praktisi/dokter
  filter.startDate = `${dateToEpoch(
    setTimeForDate(valueStartedDate.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(valueEndedDate.value, 23, 59, 59)
  )}`;
  if (pageType.value == 'kunjungan-rawat-jalan') {
  filter.jenisKunjungan = 'RJ'
  }

  return filter;
};

const valueSearchRM = ref();
const valueSearchDPJP = ref();
const valueStartedDate = ref<Date>(new Date());
const valueEndedDate = ref<Date>(new Date());


const handleSearchRM = (searchRM: string) => {
  valueSearchRM.value = searchRM;
};

const handleSearchDPJP = (searchDPJP: string) => {
  valueSearchDPJP.value = searchDPJP;
};

const handleStartedDate = (startedDate: any) => {
  valueStartedDate.value = startedDate
}
const handleEndedDate = (endedDate: any) => {
  valueEndedDate.value = endedDate
}

const resetFormRef = ref()

const resetForm = () => {
  valueSearchRM.value = "";
  valueSearchDPJP.value = "";
  valueStartedDate.value = new Date();
  valueEndedDate.value= new Date();
  resetFormRef.value.resetForm();
};

// Reset filter fields
const handleReset = () => {
  resetForm();
  fetchLaporanData();
};

const handleRefreshPage = () => {
  searchData()
}
</script>

<template>
  <!-- {{ reportData }} -->
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <!-- {{ pageType }} -->
      <DataLaporanHeader
        @update:value-r-m-filter="handleSearchRM"
        @update:selected-dokter-d-p-j-p="handleSearchDPJP"
        @update:started-date-filter="handleStartedDate"
        @update:ended-date-filter="handleEndedDate"
        @search="searchData"
        @reset="handleReset"
        @refresh-page="handleRefreshPage"
        :current-route-name="pageType"
        :data-bread-crumb="dataBreadCrumb"
        ref="resetFormRef"
      >
        <template
          #before-content
          v-if="
            pageType === 'pembatalan-poli' ||
            pageType === 'rekap-tindakan-pasien'
          "
        >
          <div class="grid grid-cols-2 gap-5 pt-2.5">
            <CustomSelect
              v-if="
                pageType === 'pembatalan-poli' ||
                pageType === 'rekap-tindakan-pasien'
              "
              v-model="searchPoliklinikFilter"
              label="Poliklinik"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Poliklinik"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
            <CustomSelect
              v-if="pageType === 'pembatalan-poli'"
              v-model="searchDokterDPJPFilter"
              label="Dokter DPJP"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Dokter"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
            <CustomSelect
              v-if="pageType === 'rekap-tindakan-pasien'"
              v-model="searchPraktisiFilter"
              label="Praktisi"
              class=""
              optionLabel=""
              optionValue=""
              place-holder="Pilih Dokter"
              :options="['Semua', 'Beberapa', 'Banyak']"
            />
          </div>
        </template>
      </DataLaporanHeader>
    </template>
    <template #content>
      <!-- <NoData /> -->
      <DataKunjunganRawatJalan v-if="pageType === 'kunjungan-rawat-jalan'" :kunjunganData ="reportData" />
      <DataPembatalanPoli v-if="pageType === 'pembatalan-poli'" />
      <!-- <DataRekapTindakanPasien
        v-if="pageType === 'rekap-tindakan-pasien'"
      /> -->
    </template>
    <template #footer>
      <div class="flex justify-between">
        <CustomButton
          icon="PhPrinter"
          icon-pos="left"
          icon-type="fill"
          class="my-auto bg-adameds-300"
          label="Cetak"
        />
        <CustomPaginator
          :rows="properties.page_size"
          :totalRecords="properties.total"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>
