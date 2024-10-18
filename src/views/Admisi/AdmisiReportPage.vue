<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
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
import { epochToDate, dateToEpoch } from "@/utils/Helpers";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

// NOTE Store
const storeUtils = utilsStore();
const admisiLaporanStore = useAdmisiIGDStore();

const pageType = ref("");
const route = useRoute();

const dataBreadCrumb = ref<MenuItem[]>([]);
const properties = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const reportType = ref("");
const reportData = ref<any[]>([]);
const expandedRows = ref();
const expandedRowsBayi = ref();

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
    // else if (pageType.value == "rekap-jumlah-pasien-BPJS") {
    //   response = await admisiLaporanStore.getJumlahBPJSReport({})
    //   response = {};
    // }

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
  reportData.value = await fetchReportData(filter);
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);
});

const search = ref("");
const dpjpFilter = ref("");
const visitTypeFilter = ref("Semua");
const penjaminFilter = ref("0");
const ruanganFilter = ref("");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

// Function to set the desired time for startDate and endDate
const setTimeForDate = (
  date: Date,
  hours: number,
  minutes: number,
  seconds: number
) => {
  const newDate = new Date(date); // Clone the date to avoid mutation
  newDate.setHours(hours, minutes, seconds, 0);
  return newDate;
};

const resetFilter = () => {
  search.value = "";
  dpjpFilter.value = "";
  visitTypeFilter.value = "Semua";
  penjaminFilter.value = "0";
  ruanganFilter.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
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

  filter.page = properties.value.page
  filter.limit = properties.value.pageSize
  filter.q = search.value;
  filter.startDate = `${dateToEpoch(
    setTimeForDate(startDateFilter.value, 0, 0, 0)
  )}`;
  filter.endDate = `${dateToEpoch(
    setTimeForDate(endDateFilter.value, 23, 59, 59)
  )}`;
  if (pageType.value == "kunjungan") {
    filter.practitionerUuid = dpjpFilter.value ?? "";
    filter.jenisKunjungan =
      visitTypeFilter.value == "Semua" || !visitTypeFilter.value
        ? ""
        : visitTypeFilter.value;
  } else if (pageType.value == "penjamin") {
    filter.practitionerUuid = dpjpFilter.value ?? "";
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
    pageType.value == "rekap-jumlah-pasien-bpjs"
  ) {
    filter.jenisKunjungan =
      visitTypeFilter.value == "Semua" || !visitTypeFilter.value
        ? ""
        : visitTypeFilter.value;
  } else if (
    pageType.value == "status-kamar" ||
    pageType.value == "keperawatan-inap-pasien"
  ) {
    filter.ruangan = ruanganFilter.value ?? "";
  }
  return filter;
};

const searchData = async () => {
  let filter = {} as Filter;
  filter = setFilter();

  reportData.value = await fetchReportData(filter);
};

const handlePage = (event: any) => {
  properties.value.page = event.page + 1;
  properties.value.pageSize = event.rows;
  searchData();
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
            v-if="pageType == 'kunjungan' || pageType == 'penjamin'"
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
              optionLabel="name"
              optionValue="uuid"
              :options="[
                {
                  uuid: '0191a18a-22e4-79f7-9da5-a10a6e1a60f9',
                  name: 'Rudi tabuti',
                },
                { uuid: '7379hdishdjsfggy73984', name: 'dr. Ali' },
                { uuid: '7379hdishdjsfggy73985', name: 'dr. Doom' },
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
                v-if="pageType != 'kunjungan' && pageType != 'penjamin'"
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
                optionLabel=""
                optionValue=""
                :options="['101', '102']"
              />
              <CustomSelect
                v-else-if="pageType != 'bayi-baru-lahir'"
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
              label="Tanggal"
              class="w-[150px]"
            />
            <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
            <CustomDatePicker
              v-model="endDateFilter"
              :showLabel="false"
              class="mt-auto w-[150px]"
              :minDate="startDateFilter"
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
      <Tabs v-if="reportData.length" v-model:value="reportType">
        <TabPanels class="p-0">
          <TabPanel value="kunjungan">
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
                      field="patient.noIdentity"
                      header="No. Identitas"
                      header-class="text-black bg-adameds-50"
                    ></Column>
                  </DataTable>
                </div>
              </template>
            </DataTable>
          </TabPanel>
          <TabPanel value="penjamin">
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
                field="cancelBy"
                header="Petugas"
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
              ></Column>
              <Column
                field="room"
                header="Room"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="totalPatients"
                header="Jumlah Pasien"
                header-class="text-black bg-adameds-50"
              ></Column>
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
                field="monitoringRoom.room"
                header="Ruangan"
                header-class="text-black bg-adameds-50"
              ></Column>
              <Column
                field="monitoringRoom.roomClass"
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
                  {{ data.tanggalDaftar }}
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
        </TabPanels>
      </Tabs>
      <NoData v-else />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <CustomButton
          @click="() => {}"
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
