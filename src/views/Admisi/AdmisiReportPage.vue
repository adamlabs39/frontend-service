<script setup lang="ts">
import { onMounted, ref, watch, nextTick, defineEmits, computed } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import { utilsStore } from "@/stores/utils";
import { useAdmisiIGDStore } from "@/stores/admisi/laporan";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { useRuanganStore } from "@/stores/datamaster/ruangan";
import { epochToDate, dateToEpoch, setTimeForDate } from "@/utils/Helpers";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { downloadExportExcelKunjungan, downloadExportExcelBatalKunjungan, downloadExportExcelStatusKamar, downloadExportExcelKeperawatanInapPasien, downloadExportExcelBayiBaruLahir } from "@/utils/exportexceladmisi";

// NOTE Store
const storeUtils = utilsStore();
const admisiLaporanStore = useAdmisiIGDStore();
const praktisiStore = usePraktisiStore();
const ruanganStore = useRuanganStore();
const emit = defineEmits(["search"]);
const route = useRoute();
const pageType = ref("");
// const pageType = computed<string>(() => {
//   const segments = route.path.split('/')
//   return segments[segments.length - 1] || ''
// })
// const pageType = ref(route.meta.pageType || '')

// watch(
//   () => route.meta.pageType,
//   (newVal) => {
//     pageType.value = newVal || ''
//   }
// )
// console.log('Nilai awal pageType:', pageType.value);
const dataBreadCrumb = ref<MenuItem[]>([]);
const properties = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

  type RekapRow = {
    name: string;
    total: number;
  } & { [key: string]: number | string };

const reportType = ref("");
// const reportData = ref<any[]>([]);
const reportData = ref<RekapRow[]>([]);
const expandedRows = ref();
const expandedRowsBayi = ref();

// Variabel ini khusus untuk halaman 'rekap-kunjungan'.
const rekapData = ref<any[]>([]);
const daysInMonth = ref(31);

// --- KOREKSI 1: Menyederhanakan Computed Properties ---
// Karena tujuannya hanya menampilkan kerangka kosong, kita bisa sederhanakan logikanya
// agar lebih jelas dan efisien.
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
// --- AKHIR KOREKSI 1 ---

const fetchReportData = async (filter: Filter = {}) => {
  storeUtils.setLoading(true);
  let response;
  try {
    if (pageType.value == "kunjungan") {
      response = await admisiLaporanStore.getKunjunganReport(filter);
    } else if (pageType.value == "penjamin") {
    response = await admisiLaporanStore.getPenjaminReport(filter);
    } else if (pageType.value == "batal-kunjungan") {
      response = await admisiLaporanStore.getBatalKunjunganReport(filter);
    } else if (pageType.value == "status-kamar") {
      response = await admisiLaporanStore.getStatusRuanganReport(filter);
    } else if (pageType.value == "keperawatan-inap-pasien") {
      response = await admisiLaporanStore.getKeperawatanInapReport(filter);
    } else if (pageType.value == "bayi-baru-lahir") {
      response = await admisiLaporanStore.getBayiBaruLahirReport(filter);
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
    const responseRuangan = await ruanganStore.getAktifApi();
    if (responseRuangan && responseRuangan.payload) {
      listRuangan.value = responseRuangan.payload;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
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
  let filter = {} as Filter;
  filter = setFilter();
  filter.practitionerUuid =
    filter.practitionerUuid == "Semua" ? "" : filter.practitionerUuid;
  filter.ruangan = filter.ruangan == "Semua" ? "" : filter.ruangan;



  const generateDummyData = (name: string): RekapRow => {
  const row: RekapRow = { name, total: 0 };
  let total = 0;
  for (let day = 1; day <= 31; day++) {
    const key = day.toString().padStart(2, '0');
    const value = Math.floor(Math.random() * 11);
    row[key] = value;
    total += value;
  }
  row.total = total;
  return row;
};
  if (pageType.value === "rekap-kunjungan") {
    reportData.value = [];
    rekapData.value = [
      generateDummyData("Rawat Jalan"),
      generateDummyData("Rawat Inap"),
      generateDummyData("IGD"),
    ];
    // Hitung totalPerDay dan grandTotal agar footer tabel bisa pakai
    totalPerDay.value = {};
    for (let day = 1; day <= 31; day++) {
      const key = day.toString().padStart(2, "0");
      totalPerDay.value[key] = rekapData.value.reduce(
        (sum, row) => sum + (Number(row[key]) || 0),
        0
      );
    }
    grandTotal.value = rekapData.value.reduce(
      (sum, row) => sum + (row.total || 0),
      0
    );
    return;
  }
  reportData.value = await fetchReportData(filter);
};

onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(async () => {
  updatePageType(route.path);
  // console.log('Nilai pageType saat mounted:', pageType.value);
});

const search = ref("");
const dpjpFilter = ref("Semua");
const visitTypeFilter = ref("Semua");
const penjaminFilter = ref("0");
const ruanganFilter = ref("Semua");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const listDpjp = ref<any[]>([]);
const listRuangan = ref<any[]>([]);

// Watcher untuk header dinamis (Sudah Benar)
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
  visitTypeFilter.value = "Semua";
  penjaminFilter.value = "0";
  ruanganFilter.value = "Semua";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchData();
};

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
      dpjpFilter.value == "Semua" || !dpjpFilter.value ? "" : dpjpFilter.value;
    filter.jenisKunjungan =
      visitTypeFilter.value == "Semua" || !visitTypeFilter.value
        ? ""
        : visitTypeFilter.value;
  } else if (pageType.value == "penjamin") {
    filter.practitionerUuid =
      dpjpFilter.value == "Semua" || !dpjpFilter.value ? "" : dpjpFilter.value;
    filter.jenisKunjungan =
      visitTypeFilter.value == "Semua" || !visitTypeFilter.value
        ? ""
        : visitTypeFilter.value;
    filter.penjamin =
      penjaminFilter.value == "0" || !penjaminFilter.value
        ? ""
        : penjaminFilter.value;
  } else if (
    pageType.value == "batal-kunjungan" ||
    pageType.value == "bayi-baru-lahir" ||
    pageType.value == "rekap-kunjungan"
  ) {
    filter.jenisKunjungan =
      visitTypeFilter.value == "Semua" || !visitTypeFilter.value
        ? ""
        : visitTypeFilter.value;
  } else if (
    pageType.value == "status-kamar" ||
    pageType.value == "keperawatan-inap-pasien"
  ) {
    filter.ruangan =
      ruanganFilter.value == "Semua" || !ruanganFilter.value
        ? ""
        : ruanganFilter.value;
  }
  return filter;
};

const searchData = async () => {
  let filter = {} as Filter;
  filter = setFilter();
  filter.practitionerUuid =
    filter.practitionerUuid == "Semua" ? "" : filter.practitionerUuid;

  // Logika penghalang untuk 'rekap-kunjungan' (Sudah Benar)
  if (pageType.value === 'rekap-kunjungan') {
    reportData.value = [];
    rekapData.value = []; 
    return;
  }
  reportData.value = await fetchReportData(filter);
};

const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.pageSize = event.rows;
  searchData();
};

const handleExport = () => {
  switch (route.path) {
    case "/admisi/laporan/kunjungan":
      downloadExportExcelKunjungan(reportData.value);
      break;
    case "/admisi/laporan/batal-kunjungan":
      downloadExportExcelBatalKunjungan(reportData.value);
      break;
    case "/admisi/laporan/status-kamar":
      downloadExportExcelStatusKamar(reportData.value);
      break;
    case "/admisi/laporan/keperawatan-inap-pasien":
      downloadExportExcelKeperawatanInapPasien(reportData.value);
      break;
    case "/admisi/laporan/bayi-baru-lahir":
      downloadExportExcelBayiBaruLahir(reportData.value);
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
              <CustomSelect
                v-if="pageType == 'penjamin'"
                v-model="penjaminFilter"
                label="Penjamin"
                class="mr-5 grow"
                optionLabel="name"
                optionValue="uuid"
                :options="[
                  { uuid: '0', name: 'Semua' },
                  { uuid: '1', name: 'TUNAI' },
                  { uuid: '2', name: 'ASURANSI' },
                ]"
              />
              <CustomTextfield
                v-if="pageType != 'kunjungan' && pageType != 'penjamin' && pageType != 'status-kamar'"
                v-model="search"
                label="Cari Pasien"
                placeholder="Cari Nama / Alamat / No. RM"
                class="mr-5"
                :class="[pageType == 'bayi-baru-lahir' ? 'grow' : 'w-[60%]']"
              />
              <CustomSelect
                v-if="
                  pageType == 'status-kamar' ||
                  pageType == 'keperawatan-inap-pasien'
                "
                v-model="ruanganFilter"
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
                v-else-if="pageType != 'bayi-baru-lahir'"
                v-model="penjaminFilter"
                label="Penjamin"
                class="mr-5 grow"
                optionLabel="name"
                optionValue="uuid"
                :options="[
                  { uuid: '0', name: 'Semua' },
                  { uuid: '1', name: 'TUNAI' },
                  { uuid: '2', name: 'ASURANSI' },
                ]"
              />
              <CustomSelect
                v-if="pageType != 'status-kamar'"
                v-model="visitTypeFilter"
                label="Jenis Kunjungan"
                class="mr-5 grow"
                optionLabel=""
                optionValue=""
                :options="['Semua', 'RJ', 'RI', 'IGD']"
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
      <div v-if="reportType === 'rekap-kunjungan'">
        <!-- <div class="rekap-kunjungan-container"> -->
            <CustomAccordion
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
          <!-- </div>  -->
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
          <!-- <TabPanel value="penjamin">
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
                field="noPenjamin.name"
                header="Penjamin"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data?.noPenjamin?.name ?? "-" }}
                </template>
              </Column>
              <Column
                field="noPenjamin.accountNumber"
                header="No. Penjamin"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data?.noPenjamin?.accountNumber ?? "-" }}
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
                      field="patient.noIdentity"
                      header="No. Identitas"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel> -->
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
                  {{ data.practitioner?.nama ?? '-' }}
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
                field="roomClass"
                header="Kelas"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.room?.className ?? '-' }}
                </template>
              </Column>
              <Column
                field="room"
                header="Room"
                header-class="text-black bg-adameds-50"
              >
                <template #body="{ data }">
                  {{ data.room?.name ?? '-' }}
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
              ></Column>
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
          <TabPanel value="rekap-kunjungan">
            <div v-if="pageType === 'rekap-kunjungan'">
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
                />
                <Column
                  v-for="day in daysInMonth"
                  :key="day"
                  :field="day.toString().padStart(2, '0')"
                  :header="day.toString().padStart(2, '0')"
                  header-class="text-black bg-adameds-50"
                  style="width: 40px; text-align: center"
                  :body="(row: any) => row[day.toString().padStart(2, '0')] || 0"
                />
                <Column
                  field="total"
                  header="Total"
                  header-class="text-black bg-adameds-50"
                  style="width: 60px; font-weight: bold; text-align: center"
                />
              </DataTable>

              <div class="mt-2 font-bold text-right" style="padding-right: 4.5rem;">
                <span class="inline-block" style="width: 150px; text-align: left;">Total Harian:</span>
                <span v-for="day in daysInMonth" :key="'total-'+day" class="inline-block w-10 text-center" style="width: 40px;">
                  {{ totalPerDay[day.toString().padStart(2, '0')] || 0 }}
                </span>
                <span class="inline-block font-bold text-center" style="width: 60px; margin-left: -2px;">{{ grandTotal }}</span>
              </div>
            </div>
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