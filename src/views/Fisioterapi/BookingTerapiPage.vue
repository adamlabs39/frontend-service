<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";

import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

import CariJadwalTerapi from "./Section/BookingTerapi/CariJadwalTerapi.vue";

import NoData from "@/components/section/NoData.vue";
import PopUpBookingDetailPasien from "./Layout/PopUpBookingDetailPasien.vue";

type PatientItem = {
  noPendaftaran: string;
  name: string;
  address: string;
  doctor: string;
  practicHour: string;
  tanggalDaftar: string;
  tanggalJadwal: string;
  no_SEP: string;
  insuranceAccountName: string;
  polyclinic: string;
  gender: string;
  phone: string;
  ageYear: number;
  ageMonth: number;
  ageDay: number;
  noMT: string;
  noREG: string;
  newPatient: boolean;
  statusPelayanan: string;
  statusPembayaran: string;
};

const storeUtils = utilsStore();
const pageType = ref("");
const route = useRoute();
const rowsPerPage = ref(10);
const currentPage = ref(0);
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string, data: any = null) => {
  let tempData = { label: label };
  if (data) {
    tempData = { ...tempData, ...data };
  }
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = tempData;
  } else {
    dataBreadCrumb.value.push(tempData);
  }
};

const updatePageType = (path: string) => {
  dataBreadCrumb.value = [];
  let tempArrPath = path.split("/");
  pageType.value = tempArrPath[2] ?? "";
};
onBeforeRouteLeave((to, from) => {
  updatePageType(to.path);
});
onMounted(() => {
  updatePageType(route.path);

  if (storeUtils.selectedRoom) {
    changeSection("Cari Jadwal & Bed");
  }
});

const itemsPasien = ref([
  {
    noPendaftaran: "BOK673",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "",
    insuranceAccountName: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-01",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "ORDER",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "BOK1234",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Nama Dokter Sp. M",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "",
    insuranceAccountName: "TUNAI",
    polyclinic: "POLI MATA",
    gender: "P", // Perempuan
    phone: "081234567890",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-02",
    noREG: "REG2407010049",
    newPatient: false,
    statusPelayanan: "DIPERIKSA",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "BOK453",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insuranceAccountName: "BPJS",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-03",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "ORDER",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "BOK234",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Nama Dokter Sp. M",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insuranceAccountName: "BPJS",
    polyclinic: "POLI MATA",
    gender: "P", // Perempuan
    phone: "081234567890",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-04",
    noREG: "REG2407010049",
    newPatient: false,
    statusPelayanan: "ORDER",
    statusPembayaran: "Belum Lunas",
  },
  {
    noPendaftaran: "BOK123",
    name: "Nama Pasien Lengkap",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    practicHour: "08:00 - 10:00",
    tanggalDaftar: "10-10-2024 09:00",
    tanggalJadwal: "10-10-2024 10:00",
    no_SEP: "9999999999999999",
    insuranceAccountName: "BPJS",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    ageYear: 20,
    ageMonth: 3,
    ageDay: 5,
    noMT: "MT-01-03",
    noREG: "REG2407010049",
    newPatient: true,
    statusPelayanan: "DIBATALKAN",
  },
]);
const selectedPatient = ref([]);

const showCancelVisit = ref(false);
const cancelReason = ref<string>();

const patientData = ref<any>({});

const selectedPaymentMethod = ref<string[]>([]);
const filteredData = computed(() => {
  if (selectedPaymentMethod.value.length === 0) {
    return itemsPasien.value;
  }
  if (
    selectedPaymentMethod.value.includes("TUNAI") &&
    !selectedPaymentMethod.value.includes("ASURANSI")
  ) {
    return itemsPasien.value.filter(
      (item) => item.insuranceAccountName === "TUNAI"
    );
  }
  if (
    !selectedPaymentMethod.value.includes("TUNAI") &&
    selectedPaymentMethod.value.includes("ASURANSI")
  ) {
    return itemsPasien.value.filter(
      (item) => item.insuranceAccountName !== "TUNAI"
    );
  }
  return itemsPasien.value;
});

const totalFilteredData = computed(() => filteredData.value.length);

const popupDialog = ref({
  isVisible: false,
  title: "Detail Booking Pasien",
});

// function onRowClick() {
//   dialogTambahMultiplePermintaan.value.isVisible = true;
// }
function onRowClick(event: { data: PatientItem }) {
  patientData.value = event.data; // Select the clicked patient row's data
  popupDialog.value.isVisible = true; // Show the dialog
}
</script>

<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Booking Terapi',
                    home: true,
                  }"
                />
                <!-- <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Bed Ruangan</p>
                </div>
                  -->
              </div>
              <CustomButton
                @click="changeSection('Cari Jadwal & Bed')"
                icon="PhPlus"
                label="Book"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / Alamat / No. RM"
                class="mr-5 grow"
              />

              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[130px]"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[130px]"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                borderColor="border-adameds-300"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
            </div>
            <hr class="mt-3 border-gray-300" />
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
        <DataTable
          v-if="filteredData.length"
          v-model:selection="selectedPatient"
          :value="filteredData"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="onRowClick"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.noPendaftaran }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="pasien"
            header="Pasien"
            headerClass="bg-adameds-50"
            class="w-auto"
          >
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.ageYear }}Th
                  {{ slotProps.data.ageMonth }}Bln
                  {{ slotProps.data.ageDay }}Hr)
                </span>
              </div>
              <div class="text-XS">{{ slotProps.data.address }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="
                    slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'
                  "
                  :bgColor="
                    slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'
                  "
                  :textColor="
                    slotProps.data.gender == 'P'
                      ? 'text-female-300'
                      : 'text-male-300'
                  "
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.phone"
                  bgColor="bg-adameds-50"
                  textColor="text-adameds-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </template>
          </Column>

          <Column
            field="data-kunjungan"
            header="Data Kunjungan"
            headerClass="bg-adameds-50"
            class=""
          >
            <template #body="slotProps">
              <div class="text-SM">
                <div
                  class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min"
                >
                  Daftar
                  <PhArrowRight
                    :size="18"
                    class="my-auto mr-5 text-grey-300"
                    weight="bold"
                  />
                  {{ slotProps.data.tanggalDaftar }}
                </div>
                <div
                  class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]"
                >
                  Jadwal
                  <PhArrowRight
                    :size="18"
                    class="my-auto mr-5 text-blueJeans-300"
                    weight="bold"
                  />
                  {{ slotProps.data.tanggalJadwal }}
                </div>
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
        <PopUpBookingDetailPasien
          v-model:isDialogVisible="popupDialog.isVisible"
          :title="'Detail Booking Pasien'"
          :patientDetails="patientData"
        />
      </template>

      <template #footer>
        <div class="flex justify-between">
          <div class="flex">
            <CustomButton
              v-if="!showCancelVisit"
              @click="showCancelVisit = true"
              class="my-auto bg-danger-300"
              label="Batal Booking"
            />

            <CustomButton
              v-if="showCancelVisit"
              @click="showCancelVisit = false"
              class="my-auto mr-[10px]"
              label="Batal"
              outlined
              borderColor="border-grey-200"
              textColor="text-grey-300"
            />

            <CustomButton
              v-if="showCancelVisit"
              @click="showCancelVisit = true"
              class="my-auto mr-[10px] bg-danger-300 w-[20%]"
              label="Iya, Batalkan"
              :disabled="!cancelReason"
            />

            <CustomTextfield
              v-if="showCancelVisit"
              v-model="cancelReason"
              :showLabel="false"
              class="my-auto w-[400px]"
              placeholder="Alasan Batal Booking"
            />
          </div>
          <CustomPaginator
            :rows="rowsPerPage"
            :totalRecords="totalFilteredData"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>

    <CariJadwalTerapi
      v-else-if="dataBreadCrumb[0].label == 'Cari Jadwal & Bed'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :patientData="patientData"
      @back="dataBreadCrumb.pop()"
    />
  </div>
</template>
