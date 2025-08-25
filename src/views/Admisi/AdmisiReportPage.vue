<script setup lang="ts">
import { onMounted, ref, watch, nextTick, defineEmits, computed, reactive } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import { utilsStore } from "@/stores/utils";
import { useAdmisiReportStore } from "@/stores/admisi/laporan";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { usePenjaminStore } from "@/stores/datamaster/penjamin";
import { epochToDate, dateToEpoch, setTimeForDate } from "@/utils/Helpers";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { downloadExportExcelKunjungan, downloadExportExcelBatalKunjungan, downloadExportExcelStatusKamar, downloadExportExcelKeperawatanInapPasien, downloadExportExcelBayiBaruLahir } from "@/utils/exportexceladmisi";
import axios from "axios";
import { useLokasiStore } from "@/stores/datamaster/lokasi";

const penjaminStore = usePenjaminStore();
const storeUtils = utilsStore();
const admisiLaporanStore = useAdmisiReportStore();
const praktisiStore = usePraktisiStore();
const lokasiStore = useLokasiStore();
const emit = defineEmits(["search"]);
const route = useRoute();
const pageType = ref("");
const listPenjamin = ref<any[]>([]);
const penjaminOptions = computed(() => {
  return listPenjamin.value;
});
const dataBreadCrumb = ref<MenuItem[]>([]);
const properties = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const jenisKunjunganOptions = [
  { label: "Semua", value: null },
  { label: "RJ", value: "RJ" },
  { label: "RI", value: "RI" },
  { label: "IGD", value: "IGD" }
];


type RekapRow = {
  name: string;
  total: number;
} & { [key: string]: number | string };

const reportType = ref("");
const reportData = ref<RekapRow[]>([]);
const expandedRows = ref();
const expandedRowsBayi = ref();
const isLoading = ref(false)
const rekapData = ref<any[]>([]);
const daysInMonth = ref(31);
const rekapDokterData = ref<any[]>([]);
const totalDokterPerDay = ref<{ [key: string]: number }>({});
const grandTotalDokter = ref(0);
const rekapPenjaminData = ref<any[]>([]);
const totalPenjaminPerDay = ref<{ [key: string]: number }>({});
const grandTotalPenjamin = ref(0);

const totalPerDay = computed(() => {
  const totals: { [key: string]: number } = {};
  for (let day = 1; day <= 31; day++) {
    const key = day.toString().padStart(2, "0");
    totals[key] = rekapData.value.reduce(
      (sum, row) => sum + (Number(row[key]) || 0),
      0
    );
  }
  return totals;
});


const grandTotal = computed(() => {
  return rekapData.value.reduce(
    (sum, row) => sum + (row.total || 0),
    0
  );
});

const fetchRekapData = async () => {
  storeUtils.setLoading(true);
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/rekap/jenis-kunjungan`;
    
    const startDate = dateToEpoch(setTimeForDate(startDateFilter.value, 0, 0, 0));
    const endDate = dateToEpoch(setTimeForDate(endDateFilter.value, 23, 59, 59));

    const response = await axios.get(apiUrl, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
      headers: {
        Authorization: token,
      },
    });

    if (response && response.data.payload && response.data.payload.kunjungan) {
      const selectedDate = startDateFilter.value;
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      processRekapData(response.data.payload.kunjungan, year, month);
    } else {
      rekapData.value = [];
    }
  } catch (error) {
    console.error("Gagal mengambil data rekap:", error);
    rekapData.value = [];
  } finally {
    storeUtils.setLoading(false);
  }
};

const processRekapData = (apiData: any[], year: number, month: number) => {
  daysInMonth.value = new Date(year, month + 1, 0).getDate();
  const groupedData: { [key: string]: any } = {};
  for (const item of apiData) {
    const jenis = item.jenis_kunjungan;
    if (!groupedData[jenis]) {
      groupedData[jenis] = { name: jenis };
    }
    const day = item.tanggal.split('-')[2];
    groupedData[jenis][day] = Number(item.total_harian);
  }
  const finalData: RekapRow[] = [];
  const visitTypes = ["IGD", "RI", "RJ"]; 
  for (const key of visitTypes) {
    if (groupedData[key]) {
      const rowData: RekapRow = { name: key, total: 0 };
      let totalKeseluruhan = 0;
      for (let day = 1; day <= daysInMonth.value; day++) {
        const dayKey = day.toString().padStart(2, '0');
        const value = groupedData[key][dayKey] || 0;
        rowData[dayKey] = value;
        totalKeseluruhan += value;
      }
      rowData.total = totalKeseluruhan;
      finalData.push(rowData);
    }
  }
  rekapData.value = finalData;
};

const fetchRekapDokter = async () => {
  storeUtils.setLoading(true);
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/rekap/dokter`;

    const startDate = dateToEpoch(setTimeForDate(startDateFilter.value, 0, 0, 0));
    const endDate = dateToEpoch(setTimeForDate(endDateFilter.value, 23, 59, 59));

    const response = await axios.get(apiUrl, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
      headers: {
        Authorization: token,
      },
    });

    if (response && response.data.payload) {
      const selectedDate = startDateFilter.value;
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      processRekapDokter(response.data.payload, year, month);
    } else {
      rekapDokterData.value = [];
      totalDokterPerDay.value = {};
      grandTotalDokter.value = 0;
    }
  } catch (error) {
    console.error("Gagal mengambil data rekap dokter:", error);
    rekapDokterData.value = [];
    totalDokterPerDay.value = {};
    grandTotalDokter.value = 0;
  } finally {
    storeUtils.setLoading(false);
  }
};

const processRekapDokter = (payload: any, year: number, month: number) => {
  const dailyTotals: { [key: string]: number } = {};
  for (const item of payload.total_harian) {
    const day = item.tanggal.split('-')[2];
    dailyTotals[day] = item.total;
  }
  totalDokterPerDay.value = dailyTotals;

  grandTotalDokter.value = payload.total_keseluruhan;

  daysInMonth.value = new Date(year, month + 1, 0).getDate();
  const groupedData: { [key: string]: any } = {};

  for (const item of payload.dokter) {
    const dokterName = item.nama_dokter;
    if (!groupedData[dokterName]) {
      groupedData[dokterName] = { name: dokterName };
    }
    const day = item.tanggal.split('-')[2];
    groupedData[dokterName][day] = Number(item.total_harian);
  }

  const finalData: RekapRow[] = [];
  for (const dokterTotal of payload.total_dokter) {
    const dokterName = dokterTotal.nama_dokter;
    if (groupedData[dokterName]) {
      const rowData: RekapRow = { name: dokterName, total: dokterTotal.total };
      for (let day = 1; day <= daysInMonth.value; day++) {
        const dayKey = day.toString().padStart(2, '0');
        rowData[dayKey] = groupedData[dokterName][dayKey] || 0;
      }
      finalData.push(rowData);
    }
  }
  
  rekapDokterData.value = finalData;
};

const fetchRekapPenjamin = async () => {
  storeUtils.setLoading(true);
  try {
    const token = localStorage.getItem("access_token");
    const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/rekap/penjamin`;

    const startDate = dateToEpoch(setTimeForDate(startDateFilter.value, 0, 0, 0));
    const endDate = dateToEpoch(setTimeForDate(endDateFilter.value, 23, 59, 59));

    const response = await axios.get(apiUrl, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
      headers: {
        Authorization: token,
      },
    });

    if (response && response.data.payload) {
      const selectedDate = startDateFilter.value;
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      processRekapPenjamin(response.data.payload, year, month);
    } else {
      rekapPenjaminData.value = [];
      totalPenjaminPerDay.value = {};
      grandTotalPenjamin.value = 0;
    }
  } catch (error) {
    console.error("Gagal mengambil data rekap penjamin:", error);
    rekapPenjaminData.value = [];
    totalPenjaminPerDay.value = {};
    grandTotalPenjamin.value = 0;
  } finally {
    storeUtils.setLoading(false);
  }
};

const processRekapPenjamin = (payload: any, year: number, month: number) => {
  const dailyTotals: { [key: string]: number } = {};
  for (const item of payload.total_harian) {
    const day = item.tanggal.split('-')[2];
    dailyTotals[day] = item.total;
  }
  totalPenjaminPerDay.value = dailyTotals;

  grandTotalPenjamin.value = payload.total_keseluruhan;

  daysInMonth.value = new Date(year, month + 1, 0).getDate();
  const groupedData: { [key: string]: any } = {};

  for (const item of payload.penjamin) {
    const penjaminName = item.nama_penjamin;
    if (!groupedData[penjaminName]) {
      groupedData[penjaminName] = { name: penjaminName };
    }
    const day = item.tanggal.split('-')[2];
    groupedData[penjaminName][day] = Number(item.total_harian);
  }

  const finalData: RekapRow[] = [];
  for (const penjaminTotal of payload.total_penjamin) {
    const penjaminName = penjaminTotal.nama_penjamin;
    if (groupedData[penjaminName]) {
      const rowData: RekapRow = { name: penjaminName, total: penjaminTotal.total };
      for (let day = 1; day <= daysInMonth.value; day++) {
        const dayKey = day.toString().padStart(2, '0');
        rowData[dayKey] = groupedData[penjaminName][dayKey] || 0;
      }
      finalData.push(rowData);
    }
  }
  
  rekapPenjaminData.value = finalData;
};

const updatePageType = async (path: string) => {
  resetFilter();
  try {
    const responseDpjp = await praktisiStore.getApi({
      limit: 9999,
      non_doctor: false,
    });
    if (responseDpjp && responseDpjp.payload) {
      listDpjp.value = responseDpjp.payload.filter(
        (praktisi: any) => praktisi.isDoctor && praktisi.status
      );
    }
    const responseRuangan = await lokasiStore.getApi(1,9999);
    if (responseRuangan && responseRuangan.payload) {
      listRuangan.value = responseRuangan.payload.filter(
        (lokasi: any) => lokasi.locationType === "Room"
      );
    }
    const responsePenjamin = await penjaminStore.getAktifApi();
    if (responsePenjamin && responsePenjamin.payload) {
      listPenjamin.value = responsePenjamin.payload;
    }

  } catch (error) {
    console.error("Failed to fetch dropdown data", error);
  } finally {
    storeUtils.setLoading(false);
  }
  
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
  
  if (pageType.value === "rekap-kunjungan") {
    storeUtils.setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const apiUrl = `${import.meta.env.VITE_BASE_ADMISI}/rekap/jenis-kunjungan`;

      const startDate = dateToEpoch(setTimeForDate(startDateFilter.value, 0, 0, 0));
      const endDate = dateToEpoch(setTimeForDate(endDateFilter.value, 23, 59, 59));
      
      const response = await axios.get(apiUrl, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
        headers: {
          Authorization: token,
        },
      });

      if (response && response.data.payload && response.data.payload.kunjungan) {
        const selectedDate = startDateFilter.value;
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        processRekapData(response.data.payload.kunjungan, year, month);
      } else {
        rekapData.value = [];
      }
    } catch (error) {
      console.error("Gagal mengambil data rekap:", error);
      rekapData.value = [];
    } finally {
      storeUtils.setLoading(false);
    }
    return;
  }
  
  let filter = {} as Filter;
  filter = setFilter();
  filter.practitionerUuid =
    filter.practitionerUuid == "Semua" ? "" : filter.practitionerUuid;
  filter.ruangan = filter.ruangan == "Semua" ? "" : filter.ruangan;
  reportData.value = await fetchReportData(filter);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});

onMounted(async () => {
  updatePageType(route.path);
});

const search = ref("");
const dpjpFilter = ref("Semua");
const visitTypeFilter = ref("Semua");
const penjaminFilter = ref(null);
const ruanganFilter = ref("Semua");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const rekapTabelFilter = ref(['kunjungan', 'dpjp', 'penjamin']);
const rekapTabelOptions = ref([
  { label: 'Rekap Kunjungan', value: 'kunjungan' },
  { label: 'Rekap DPJP', value: 'dpjp' },
  { label: 'Rekap Penjamin', value: 'penjamin' },
]);

const listDpjp = ref<any[]>([]);
const listRuangan = ref<any[]>([]);
const nameOptions = ref<any[]>([]);
const nameFilter = ref<any[]>([]);


watch(startDateFilter, (newDate) => {
    if (newDate) {
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        daysInMonth.value = new Date(year, month + 1, 0).getDate();
    }
}, { immediate: true });

const resetFilter = () => {
  search.value = "";
  dpjpFilter.value = "Semua";
  filterParams.jenis_kunjungan = "";
  filterParams.penjamin_uuid = "";
  ruanganFilter.value = "Semua";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  if (pageType.value === 'rekap-kunjungan') {
    rekapTabelFilter.value = ['kunjungan', 'dpjp', 'penjamin'];
  }
  searchData();
};

const onSelectJenisKunjungan = (val: string | null) => {
  filterParams.jenis_kunjungan = val ?? "";
};

const onSelectPenjamin = (val: string | null) => {
  filterParams.penjamin_uuid = val ?? "";
};

interface Filter {
  page?: number;
  limit?: number;
  q?: string;
  practitionerUuid?: string;
  jenisKunjungan?: string | null;
  penjamin?: string | null;
  ruangan?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  penjamin_uuid?: string | null;
  jenis_kunjungan?: string | null;
};

const setFilter = () => {
  let filter = {} as Filter;

  filter.page = properties.value.page;
  filter.limit = properties.value.pageSize;
  filter.q = search.value;
  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;

  if (pageType.value == "kunjungan") {
    filter.practitionerUuid =
      filterParams.practitioner_uuid ||
      (dpjpFilter.value == "Semua" || !dpjpFilter.value ? "" : dpjpFilter.value);

    filter.jenisKunjungan =
      filterParams.jenis_kunjungan && filterParams.jenis_kunjungan !== "Semua"
        ? filterParams.jenis_kunjungan
        : (visitTypeFilter.value == "Semua" || !visitTypeFilter.value
            ? ""
            : visitTypeFilter.value);
  } else if (pageType.value == "penjamin") {
    filter.practitionerUuid =
      filterParams.practitioner_uuid ||
      (dpjpFilter.value == "Semua" || !dpjpFilter.value ? "" : dpjpFilter.value);

    filter.jenisKunjungan =
      filterParams.jenis_kunjungan && filterParams.jenis_kunjungan !== "Semua"
        ? filterParams.jenis_kunjungan
        : (visitTypeFilter.value == "Semua" || !visitTypeFilter.value
            ? ""
            : visitTypeFilter.value);

    filter.penjamin =
      filterParams.penjamin_uuid ||
      (!penjaminFilter.value ? "" : penjaminFilter.value);
  } else if (
    pageType.value == "batal-kunjungan" ||
    pageType.value == "bayi-baru-lahir" ||
    pageType.value == "rekap-kunjungan"
  ) {
    filter.jenisKunjungan =
      filterParams.jenis_kunjungan && filterParams.jenis_kunjungan !== "Semua"
        ? filterParams.jenis_kunjungan
        : (visitTypeFilter.value == "Semua" || !visitTypeFilter.value
            ? ""
            : visitTypeFilter.value);
  } else if (
    pageType.value == "status-kamar" ||
    pageType.value == "keperawatan-inap-pasien"
  ) {
    filter.ruangan =
      filterParams.room ||
      (ruanganFilter.value == "Semua" || !ruanganFilter.value
        ? ""
        : ruanganFilter.value);
  }

  return filter;
};

const fetchReportData = async (filter: Filter = {}) => {
  filter = {
    ...filter,
    penjamin_uuid: filterParams.penjamin_uuid || "",
    jenis_kunjungan:
      filterParams.jenis_kunjungan && filterParams.jenis_kunjungan !== "Semua"
        ? filterParams.jenis_kunjungan
        : "",
    start_date: startDateFilter.value || "",
    end_date: endDateFilter.value || "",
    room: filter.ruangan || "",
    practitioner_uuid: filter.practitionerUuid || "",
  };

  storeUtils.setLoading(true);
  let response;
  try {
    if (pageType.value == "kunjungan") {
      response = await admisiLaporanStore.getKunjunganReport(filter as any);
    } else if (pageType.value == "penjamin") {
      response = await admisiLaporanStore.getPenjaminReport(filter as any);
    } else if (pageType.value == "batal-kunjungan") {
      response = await admisiLaporanStore.getBatalKunjunganReport(filter as any);
    } else if (pageType.value == "status-kamar") {
      response = await admisiLaporanStore.getStatusRuanganReport(filter as any);
    } else if (pageType.value == "keperawatan-inap-pasien") {
      response = await admisiLaporanStore.getKeperawatanInapReport(filter as any);
    } else if (pageType.value == "bayi-baru-lahir") {
      response = await admisiLaporanStore.getBayiBaruLahirReport(filter as any);
    }

    if (response && response.payload) {
      properties.value.total = response.properties.totalData;
      return response.payload;
    } else return [];
  } catch (error) {
    console.error("Failed to fetch data", error);
    return [];
  } finally {
    storeUtils.setLoading(false);
  }
};

const searchData = async () => {
  if (pageType.value === 'rekap-kunjungan') {
    await Promise.all([
    fetchRekapData(),
    fetchRekapDokter(),
    fetchRekapPenjamin()
  ]); 

  }
  let filter = {} as Filter;
  filter = setFilter();
  filter.practitionerUuid =
    filter.practitionerUuid == "Semua" ? "" : filter.practitionerUuid;
  reportData.value = await fetchReportData(filter);
};

const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.pageSize = event.rows;
  searchData();
};

const filters = ref({
  startDate: '',
  endDate: '',
  paymentMethod: '',
  dpjp: '',
  status: '',
  jenis_kunjungan: '',
  penjamin_uuid: '',
  q: ''
});

const filterParams = reactive({
  start_date: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000), 
  end_date: Math.floor(new Date().setHours(23, 59, 59, 999) / 1000), 
  q: '', 
  practitioner_uuid: '',
  jenis_kunjungan: '',
  room: '',
  penjamin_uuid: '',
  page: 1,
  limit: 10,
});


const handleExport = () => {
  const filterCamelCase = setFilter();
  delete filterCamelCase.page;
  delete filterCamelCase.limit;

  const filterSnakeCase: any = {};

  if (filterCamelCase.q) filterSnakeCase.q = filterCamelCase.q;
  if (filterCamelCase.startDate) filterSnakeCase.start_date = filterCamelCase.startDate;
  if (filterCamelCase.endDate) filterSnakeCase.end_date = filterCamelCase.endDate;
  if (filterCamelCase.practitionerUuid) filterSnakeCase.practitioner_uuid = filterCamelCase.practitionerUuid;
  if (filterCamelCase.jenisKunjungan) filterSnakeCase.jenis_kunjungan = filterCamelCase.jenisKunjungan;
  if (filterCamelCase.penjamin) filterSnakeCase.penjamin_uuid = filterCamelCase.penjamin; 
  if (filterCamelCase.ruangan) filterSnakeCase.room = filterCamelCase.ruangan; 

  switch (route.path) {
    case "/admisi/laporan/kunjungan":
      downloadExportExcelKunjungan(filterSnakeCase);
      break;
    case "/admisi/laporan/batal-kunjungan":
      downloadExportExcelBatalKunjungan(filterSnakeCase);
      break;
    case "/admisi/laporan/status-kamar":
      downloadExportExcelStatusKamar(filterSnakeCase);
      break;
    case "/admisi/laporan/keperawatan-inap-pasien":
      downloadExportExcelKeperawatanInapPasien(filterSnakeCase);
      break;
    case "/admisi/laporan/bayi-baru-lahir":
      downloadExportExcelBayiBaruLahir(filterSnakeCase);
      break;
    default:
      console.warn("Fungsi export belum diatur untuk halaman ini.");
  }
};

defineExpose({
  resetFilter,
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex justify-between w-full align-middle">
            <div class="flex">
              <CustomButton
                @click="searchData"
                icon="PhArrowClockwise"
                class="mr-5"
              />
              <CustomBreadCrumb
                :home="{
                  label: 'Laporan',
                  home: true,
                }"
                :model="dataBreadCrumb"
                class=""
              />
            </div>
          </div>
        </template>
        <template #content>
          <div
            v-if="pageType == 'kunjungan'"
            class="grid grid-cols-2 mt-[10px] gap-5"
          >
            <CustomTextfield
              v-model="search"
              label="Cari Pasien"
              placeholder="Cari Nama / Alamat / No. RM"
              class="grow"
            />
            <CustomSelect
              v-model="dpjpFilter"
              label="DPJP"
              class="grow"
              optionLabel="pegawai.name"
              optionValue="uuid"
              :options="[
                {
                  uuid: 'Semua',
                  detailPegawai: {
                    name: 'Semua',
                  },
                },
                ...listDpjp,
              ]"
              prependIcon="PhMagnifyingGlass"
            />
          </div>
          <div class="flex mt-[10px]">
            <div class="flex grow">
              <CustomMultiSelect
                v-if="pageType === 'rekap-kunjungan'"
                v-model="rekapTabelFilter"
                :options="rekapTabelOptions"
                label="Tampilkan Tabel"
                placeHolder="Pilih satu atau lebih tabel"
                optionLabel="label"
                optionValue="value"
                class="mr-5 grow"
              />
              <CustomTextfield
                v-if="pageType != 'kunjungan' && pageType != 'penjamin' && pageType != 'status-kamar' && pageType != 'rekap-kunjungan'"
                v-model="filterParams.q"
                label="Cari Pasien"
                placeholder="Cari Nama / Alamat / No. RM"
                class="mr-5"
                :class="[pageType == 'bayi-baru-lahir' ? 'grow' : 'w-[60%]']"
              />
              <CustomSelect
                v-if="pageType == 'status-kamar' || pageType == 'keperawatan-inap-pasien'"
                v-model="filterParams.room"
                label="Ruangan"
                class="mr-5 grow"
                optionLabel="name"
                optionValue="name"
                :options="[
                  { name: 'Semua' },
                  ...listRuangan,
                ]"
              />
              <CustomSelect
                v-if="pageType !== 'bayi-baru-lahir' && pageType !== 'batal-kunjungan' && pageType !== 'keperawatan-inap-pasien' && pageType !== 'status-kamar'"
                v-model="filterParams.penjamin_uuid" label="Penjamin"
                @update:model-value="onSelectPenjamin"
                placeHolder="Pilih Penjamin"
                class="mr-5 grow"
                optionLabel="name"
                optionValue="uuid"
                :options="penjaminOptions"
              />
              <CustomSelect
                v-if="pageType != 'status-kamar' && pageType != 'keperawatan-inap-pasien'"
                v-model="filterParams.jenis_kunjungan"
                placeHolder="Pilih Jenis Kunjungan"
                @update:model-value="onSelectJenisKunjungan"
                label="Jenis Kunjungan"
                class="mr-5 grow"
                optionLabel="label"
                optionValue="value"
                :options="jenisKunjunganOptions"
              />
            </div>
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
              @click="searchData"
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
    <template #content>
      <!-- <div v-if="reportType === 'rekap-kunjungan'">
            <CustomAccordion
              class="max-w-[1000px] mx-auto"
              :openWithHeader="true"
              initialState="0"
              headerClass="flex w-full items-center justify-between rounded-lg bg-adameds-300 p-3"
            >
              <template #header>
                <span class="font-semibold text-white">Rekap Kunjungan</span>
              </template>

              <template #collapseIcon>
                <CustomButton
                  icon="PhCaretUp"
                  backgroundColor="bg-transparent"
                  textColor="text-white"
                />
              </template>
              <template #expandIcon>
                <CustomButton
                  icon="PhCaretDown"
                  backgroundColor="bg-transparent"
                  textColor="text-white"
                />
              </template>
              <template #content>
                <div class="border-x border-b rounded-b-lg overflow-hidden bg-white mt-2">
                  <div class="flex items-center p-4 bg-adameds-50">
                    <label class="w-40 font-semibold">Jenis Kunjungan</label>
                    <CustomSelect
                      :showLabel="false"
                      v-model="visitTypeFilter"
                      class="w-full md:w-1/4"
                    />
                  </div>
                  <DataTable
                    :value="rekapData"
                    tableStyle="min-width: 50rem"
                    scrollable
                    scrollHeight="flex"
                    :pt="{ headerRow: 'text-SM' }"
                    showGridlines
                  >
                    <Column
                      field="name"
                      header="Nama"
                      header-class="text-black bg-adameds-50"
                      style="width: 150px"
                      frozen
                      align-frozen="left"
                    >
                      <template #footer>
                        <span style="font-weight: bold;">Total Harian:</span>
                      </template>
                    </Column>

                    <Column
                      v-for="day in daysInMonth"
                      :key="day"
                      :field="day.toString().padStart(2, '0')"
                      :header="day.toString().padStart(2, '0')"
                      header-class="text-black bg-adameds-50"
                      style="width: 40px; text-align: center"
                      :body="(row: any) => row[day.toString().padStart(2, '0')] || 0"
                    >
                      <template #footer>
                        <span style="font-weight: bold; text-align: center; display: block;">
                          {{ (totalPerDay[day.toString().padStart(2, '0')] || 0).toString() }}
                        </span>
                      </template>
                    </Column>

                    <Column
                      field="total"
                      header="Total"
                      header-class="text-black bg-adameds-50"
                      style="width: 60px; font-weight: bold; text-align: center"
                      frozen
                      align-frozen="right"
                    >
                      <template #footer>
                        <span style="font-weight: bold; text-align: center; display: block;">
                          {{ grandTotal.toString() }}
                        </span>
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </template> 
            </CustomAccordion>
      </div> -->
      <div class =" flex flex-col gap-6" v-if="reportType === 'rekap-kunjungan'">
        <CustomAccordion
          v-if="rekapTabelFilter.includes('kunjungan')"
          class="max-w-[1000px] mx-auto min-w-[1000px]"
          :openWithHeader="true"
          initialState="0"
          headerClass="flex w-full items-center justify-between rounded-lg bg-adameds-300 p-3"
        >
          <template #header>
            <span class="font-semibold text-white">
              Rekap Kunjungan 
            </span>
          </template>
          
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-white"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-white"
            />
          </template>
          <template #content>
            <div class="border-x border-b rounded-b-lg overflow-hidden bg-white mt-2">
              <div class="flex items-center p-4 bg-adameds-50">
                  <label class="w-40 font-semibold">Jenis Kunjungan</label>
                  <CustomSelect
                    :showLabel="false"
                    v-model="visitTypeFilter"
                    class="w-full md:w-1/4"
                  />
                </div>
              <DataTable
                :value="rekapData"
                tableStyle="min-width: 50rem"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
                showGridlines
              >
                <Column
                  field="name"
                  header="Nama"
                  header-class="text-black bg-adameds-50"
                  style="width: 150px"
                  frozen
                  align-frozen="left"
                >
                  <template #footer>
                    <span style="font-weight: bold;">Total Harian:</span>
                  </template>
                </Column>

                <Column
                  v-for="day in daysInMonth"
                  :key="day"
                  :field="day.toString().padStart(2, '0')"
                  :header="day.toString().padStart(2, '0')"
                  header-class="text-black bg-adameds-50"
                  style="width: 40px; text-align: center"
                >
                  <template #footer>
                    <span style="font-weight: bold; text-align: center; display: block;">
                      {{ (totalPerDay[day.toString().padStart(2, '0')] || 0).toString() }}
                    </span>
                  </template>
                </Column>

                <Column
                  field="total"
                  header="Total"
                  header-class="text-black bg-adameds-50"
                  style="width: 60px; font-weight: bold; text-align: center"
                  frozen
                  align-frozen="right"
                >
                  <template #footer>
                    <span style="font-weight: bold; text-align: center; display: block;">
                      {{ grandTotal.toString() }}
                    </span>
                  </template>
                </Column>
              </DataTable>
            </div>
            
          </template> 
        </CustomAccordion>
        <CustomAccordion
          v-if="rekapTabelFilter.includes('dpjp')"
          class="max-w-[1000px] mx-auto min-w-[1000px]"
          :openWithHeader="true"
          initialState="0"
          headerClass="flex w-full items-center justify-between rounded-lg bg-adameds-300 p-3"
        >
          <template #header>
            <span class="font-semibold text-white">
              Rekap DPJP 
            </span>
          </template>
          
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-white"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-white"
            />
          </template>
          <template #content>
            <div class="border-x border-b rounded-b-lg overflow-hidden bg-white mt-2">
              <div class="flex items-center p-4 bg-adameds-50">
                <label class="w-40 font-semibold">Dokter DPJP</label>
                <CustomMultiSelect
                  :showLabel="false"
                  v-model="nameFilter"
                  :options="nameOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Pilih satu atau lebih nama untuk ditampilkan"
                  class="w-full md:w-2/4"
              />
              </div>
              <DataTable
                :value="rekapDokterData"
                tableStyle="min-width: 50rem"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
                showGridlines
              >
                <Column
                  field="name"
                  header="Nama"
                  header-class="text-black bg-adameds-50"
                  style="width: 150px"
                  frozen
                  align-frozen="left"
                >
                  <template #footer>
                    <span style="font-weight: bold;">Total Harian:</span>
                  </template>
                </Column>

                <Column
                  v-for="day in daysInMonth"
                  :key="day"
                  :field="day.toString().padStart(2, '0')"
                  :header="day.toString().padStart(2, '0')"
                  header-class="text-black bg-adameds-50"
                  style="width: 40px; text-align: center"
                >
                  <template #footer>
                    <span style="font-weight: bold; text-align: center; display: block;">
                      {{ (totalDokterPerDay[day.toString().padStart(2, '0')] || 0).toString() }}
                    </span>
                  </template>
                </Column>

                <Column
                  field="total"
                  header="Total"
                  header-class="text-black bg-adameds-50"
                  style="width: 60px; font-weight: bold; text-align: center"
                  frozen
                  align-frozen="right"
                >
                  <template #footer>
                    <span style="font-weight: bold; text-align: center; display: block;">
                      {{ grandTotalDokter.toString() }}
                    </span>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template> 
        </CustomAccordion>
        <CustomAccordion
          v-if="rekapTabelFilter.includes('penjamin')"
          class="max-w-[1000px] mx-auto min-w-[1000px]"
          :openWithHeader="true"
          initialState="0"
          headerClass="flex w-full items-center justify-between rounded-lg bg-adameds-300 p-3"
        >
          <template #header>
            <span class="font-semibold text-white">
              Rekap Penjamin 
            </span>
          </template>
          
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-transparent"
              textColor="text-white"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-transparent"
              textColor="text-white"
            />
          </template>
          <template #content>
            <div class="border-x border-b rounded-b-lg overflow-hidden bg-white mt-2">
              <div class="flex items-center p-4 bg-adameds-50">
                <label class="w-40 font-semibold">Penjamin</label>
                <CustomSelect
                  :showLabel="false"
                  v-model="penjaminFilter" 
                  class="w-full md:w-1/4"
                />
              </div>
              <DataTable
                :value="rekapPenjaminData"
                tableStyle="min-width: 50rem"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
                showGridlines
              >
                <Column
                  field="name"
                  header="Nama"
                  header-class="text-black bg-adameds-50"
                  style="width: 150px"
                  frozen
                  align-frozen="left"
                >
                  <template #footer>
                    <span style="font-weight: bold;">Total Harian:</span>
                  </template>
                </Column>

                <Column
                  v-for="day in daysInMonth"
                  :key="day"
                  :field="day.toString().padStart(2, '0')"
                  :header="day.toString().padStart(2, '0')"
                  header-class="text-black bg-adameds-50"
                  style="width: 40px; text-align: center"
                >
                  <template #footer>
                    <span style="font-weight: bold; text-align: center; display: block;">
                      {{ (totalPenjaminPerDay[day.toString().padStart(2, '0')] || 0).toString() }}
                    </span>
                  </template>
                </Column>

                <Column
                  field="total"
                  header="Total"
                  header-class="text-black bg-adameds-50"
                  style="width: 60px; font-weight: bold; text-align: center"
                  frozen
                  align-frozen="right"
                >
                  <template #footer>
                    <span style="font-weight: bold; text-align: center; display: block;">
                      {{ grandTotalPenjamin.toString() }}
                    </span>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template> 
        </CustomAccordion>
      </div>
      <Tabs v-else-if="reportData.length" v-model:value="reportType">
        <TabPanels class="p-0">
          <TabPanel value="kunjungan">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              stripedRows
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              >
                <template #body="{ index }">{{ index + 1 }}</template>
              </Column>
              <Column
                field="tglRegistrasi"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ epochToDate(data.tglRegistrasi, "dateTime") }}
                </template>
              </Column>
              <Column
                field="noreg"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="jenisKunjungan"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patient.noRm"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patient.name"
                header="Nama Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="polyclinic"
                header="Poli"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="practitioner.nama"
                header="Dokter"
                header-class="text-black bg-adameds-50"
              ></Column>
              <template #expansion="slotProps">
                <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
                  <DataTable
                    :value="[slotProps.data]"
                    class="overflow-hidden rounded-lg bg-adameds-50"
                    :pt="{ headerRow: 'text-SM' }"
                  >
                    <Column
                      field="gender"
                      header="Jenis Kelamin"
                      header-class="text-black bg-adameds-50"
                    >
                      <template #body="{ data }">
                        {{ data.patient.gender == "Male" ? "L" : "P" }}
                      </template>
                    </Column>
                    <Column
                      field="patient.birthDetail.birthDate"
                      header="Tgl. Lahir"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="patient.birthDetail.birthDate"
                      header="Umur"
                      header-class="text-black bg-adameds-50"
                    >
                      <template #body="{ data }">
                        {{
                          `${data.patient.birthDetail.ageYear} Tahun ${data.patient.birthDetail.ageMonth} Bulan ${data.patient.birthDetail.ageDay} Hari`
                        }}
                      </template>
                    </Column>
                    <Column
                      field="patient.address.fullAddress"
                      header="Alamat"
                      header-class="text-black bg-adameds-50"
                    />
                    <Column
                      field="patient.identity"
                      header="Jenis ID"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                      <Column
                      field="noPenjamin.name"
                      header="Penjamin"
                      header-class="text-black bg-adameds-50"
                      >
                      <template #body="{ data }">
                        {{ data.patient.insurance?.[0]?.name ?? "-" }}
                      </template>
                    </Column>
                    <Column
                      field="noPenjamin.accountNumber"
                      header="No. Penjamin"
                      header-class="text-black bg-adameds-50"
                      >
                      <template #body="{ data }">
                        <!-- <pre>{{ data }}</pre> -->
                        {{ data.patient.insurance?.[0]?.accountNumber ?? "-" }}
                      </template>
                    </Column>
                    <Column
                      field="patient.noIdentity"
                      header="No. Identitas"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
          <TabPanel value="batal-kunjungan">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              >
                <template #body="{ index }">{{ index + 1 }}</template>
              </Column>
              <Column
                field="tglRegistrasi"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ epochToDate(data.tglRegistrasi, "dateTime") }}
                </template>
              </Column>
              <Column
                field="noreg"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="jenisKunjungan"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patient.noRm"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patient.name"
                header="Nama Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="cancelDate"
                header="Tgl. Batal"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ epochToDate(data.cancelDate, "dateTime") }}
                </template>
              </Column>
              <Column
                header="Petugas"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.cancelBy ?? '-' }}
                </template>
              </Column>
              <template #expansion="slotProps">
                <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
                  <DataTable
                    :value="[slotProps.data]"
                    class="overflow-hidden rounded-lg bg-adameds-50"
                    :pt="{ headerRow: 'text-SM' }"
                  >
                    <Column
                      field="polyclinic"
                      header="Poli"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="practitioner.nama"
                      header="Dokter DPJP"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="cancelReason"
                      header="Alasan Batal"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
          <TabPanel value="status-kamar">
            <DataTable
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              >
                <template #body="{ index }">{{ index + 1 }}</template>
              </Column>
              <Column
                field="room"
                header="Ruangan"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.room?.name ?? '-' }}
                </template>
              </Column>
              <Column
                field="roomClass"
                header="Kelas"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.room?.className ?? '-' }}
                </template>
              </Column>
              <Column
                field="totalPatients"
                header="Jumlah Pasien"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.jumlahPasien ?? '-' }}
                </template>
              </Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="keperawatan-inap-pasien">
            <DataTable
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              >
                <template #body="{ index }">{{ index + 1 }}</template>
              </Column>
              <Column
                field="noRm"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="monitoringRoom.bedLokasi.name"
                header="Ruangan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="monitoringRoom.bedLokasi.className"
                header="Kelas"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="monitoringRoom.noBed"
                header="No. Bed"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="enterDate"
                header="Tgl. Masuk"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{
                    data.tanggalDirawat
                      ? epochToDate(data.tanggalDirawat, "dateTime")
                      : "-"
                  }}
                </template>
              </Column>
              <Column
                field="exitDate"
                header="Tgl. Keluar"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{
                    data.dischargeDate
                      ? epochToDate(data.dischargeDate, "dateTime")
                      : "-"
                  }}
                </template>
              </Column>
            </DataTable>
          </TabPanel>
          <TabPanel value="bayi-baru-lahir">
            <DataTable
              v-model:expandedRows="expandedRowsBayi"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              >
                <template #body="{ index }">{{ index + 1 }}</template>
              </Column>
              <Column
                field="tglRegistrasi"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.tanggalDaftar && reportType === 'bayi-baru-lahir' ? data.tanggalDaftar.split('T')[0] : '' }}
                </template>
              </Column>
              <Column
                field="noRmBaby"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="nameBaby"
                header="Nama Bayi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="birthDetail.birthDate"
                header="Tgl. Lahir"
                header-class="text-black bg-adameds-50"
              >
                <template #body="slotProps">
                  {{ slotProps.data.birthDetail?.birthDate?.split('T')[0] }}
                </template>
              </Column>
              <Column
                field="birthTimeBaby"
                header="Jam Lahir"
                header-class="text-black bg-adameds-50"
              ></Column>
              <template #expansion="slotProps">
                <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
                  <DataTable
                    :value="[slotProps.data]"
                    class="overflow-hidden rounded-lg bg-adameds-50"
                    :pt="{ headerRow: 'text-SM' }"
                  >
                    <Column
                      field="genderBaby"
                      header="Jenis Kelamin"
                      header-class="text-black bg-adameds-50"
                    >
                      <template #body="{ data }">
                        {{ data.genderBaby == "Male" ? "L" : "P" }}
                      </template>
                    </Column>
                    <Column
                      field="birthDetail.birthPlace"
                      header="Tempat Lahir"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="nameMom"
                      header="Identitas Ibu"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="nameMom"
                      header="Nama Ibu"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
          <TabPanel value="rekap-pasien-bpjs">
            <DataTable
              v-model:expandedRows="expandedRows"
              :value="reportData"
              tableStyle="min-width: 50rem"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
            >
              <Column
                expander
                style="width: 40px"
                header-class="text-black bg-adameds-50"
              />
              <Column
                field="no"
                header="No."
                header-class="text-black bg-adameds-50"
                style="width: 40px"
              ></Column>
              <Column
                field="registrationDate"
                header="Tgl. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="registrationNo"
                header="No. Registrasi"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="visitType"
                header="Jenis Kunjungan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="rmNumber"
                header="No. RM"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="patientName"
                header="Nama Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="cardNo"
                header="No. Kartu"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="referenceNo"
                header="No. Rujukan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <template #expansion="slotProps">
                <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
                  <DataTable
                    :value="slotProps.data.orders"
                    class="overflow-hidden rounded-lg bg-adameds-50"
                    :pt="{ headerRow: 'text-SM' }"
                  >
                    <Column
                      field="gender"
                      header="Jenis Kelamin"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="birthDate"
                      header="Tgl. Lahir"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="age"
                      header="Umur"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="address"
                      header="Alamat"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="idType"
                      header="Jenis ID"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="identityNo"
                      header="No. Identitas"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="insurance"
                      header="Penjamin"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                    <Column
                      field="spri"
                      header="No. SPRI/SKDP"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <NoData v-else />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <CustomButton
          @click="handleExport"
          icon="PhPrinter"
          label="Cetak"
          class="mr-[10px]"
          backgroundColor="bg-adameds-300"
        />
        <CustomPaginator
          :rows="properties.pageSize"
          :totalRecords="properties.total"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>