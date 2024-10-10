<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";

import NoData from "@/components/section/NoData.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";

const storeUtils = utilsStore();
const pageType = ref("");
const route = useRoute();
const rowsPerPage = ref(10);
const currentPage = ref(0);

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
    changeSection("Daftar");
  }
});

const itemsPasien = ref([
  {
    noPendaftaran: "00-00-00",
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
    noPendaftaran: "00-00-00",
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
    noPendaftaran: "00-00-00",
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
    noPendaftaran: "00-00-00",
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
    noPendaftaran: "00-00-00",
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

const openedPatientData = ref<any>({});
const showPatientDetail = (event: DataTableRowClickEvent) => {
  openedPatientData.value = event.data;
  if (pageType.value == "order-fisio") {
    if (openedPatientData.value.status_rj == "1") {
      changeSection("Checkin", { platform: openedPatientData.value.platform });
    } else {
      changeSection("Detail");
    }
  } else if (pageType.value == "rawat-inap") {
    if (openedPatientData.value.status_ri == "1" || openedPatientData.value.status_ri == "2") {
      changeSection("Daftar");
    } else {
      changeSection("Detail");
    }
  } else {
    changeSection("Detail");
  }
};
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Order Fisioterapi',
                    home: true,
                  }"
                />
                <!-- <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Bed Ruangan</p>
                </div> -->
              </div>
              <CustomButton icon="PhPlus" label="Order" class="mr-[10px]" />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield label="Cari Ruangan" prependIcon="PhMagnifyingGlass" placeholder="Cari Nama Ruangan" class="" />
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
          <template #expandIcon>
            <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <DataTable v-if="itemsPasien.length" v-model:selection="selectedPatient" :value="itemsPasien" tableStyle="min-width: 50rem" scrollable scrollHeight="flex" :pt="{ headerRow: 'text-SM' }" @rowClick="showPatientDetail">
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.noPendaftaran }}</div>
                <div class="max-w-[75px] mx-auto bg-adameds-50 text-adameds-300 rounded-[5px] text-SM font-semibold">
                  {{ slotProps.data.noMT }}
                </div>
                <div class="text-SM">{{ slotProps.data.noREG }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50" class="w-[300px]">
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
                <span class="text-grey-300"> ({{ slotProps.data.ageYear }}Th {{ slotProps.data.ageMonth }}Bln {{ slotProps.data.ageDay }}Hr) </span>
              </div>
              <div class="text-XS">{{ slotProps.data.address }}</div>
              <div class="flex flex-wrap">
                <PhUserCirclePlus v-if="slotProps.data.newPatient" :size="22" class="text-adameds-300 mt-auto mr-[5px]" weight="fill" />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.gender == 'P' ? 'Perempuan' : 'Laki-laki'"
                  :bgColor="slotProps.data.gender == 'P' ? 'bg-female-75' : 'bg-male-75'"
                  :textColor="slotProps.data.gender == 'P' ? 'text-female-300' : 'text-male-300'"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip :showCheckedIcon="false" :label="slotProps.data.phone" bgColor="bg-adameds-50" textColor="text-adameds-300" customClass="h-5 pr-[6px] border-none mr-[5px]" />
              </div>
            </template>
          </Column>
          <Column field="keperawatan" header="Keperawatan" headerClass="bg-adameds-50" class="w-[350px]">
            <template #body="slotProps">
              <div class="flex gap-1.5">
                <div class="text-SM">{{ slotProps.data.doctor }}</div>
                <hr class="w-px min-h-5 bg-adameds-300" />
                <div class="text-SM">{{ slotProps.data.practicHour }}</div>
              </div>
              <div class="flex flex-wrap mt-1">
                <CustomChip :showCheckedIcon="false" :label="slotProps.data.polyclinic" customClass="h-5 pr-[5px] mr-[5px]" />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.insuranceAccountName"
                  :bgColor="slotProps.data.insuranceAccountName == 'TUNAI' ? 'bg-adameds-50' : 'bg-warning-50'"
                  :textColor="slotProps.data.insuranceAccountName == 'TUNAI' ? 'text-adameds-300' : 'text-warning-300'"
                  :borderColor="slotProps.data.insuranceAccountName == 'TUNAI' ? 'border-adameds-300' : 'border-warning-300'"
                  customClass="h-5 pr-[6px] mr-[5px]"
                />
                <CustomChip v-if="slotProps.data.no_SEP" :showCheckedIcon="false" :label="`SEP.${slotProps.data.no_SEP}`" bgColor="bg-warning-50" textColor="text-warning-300" borderColor="border-warning-300" customClass="h-5 pr-[6px]" />
              </div>
            </template>
          </Column>
          <Column field="data-kunjungan" header="Data Kunjungan" headerClass="bg-adameds-50" class="max-w-[240px]">
            <template #body="slotProps">
              <div class="text-SM">
                <div class="grid content-center grid-cols-[80px_min-content_150px] auto-cols-min">
                  Daftar
                  <PhArrowRight :size="18" class="my-auto mr-5 text-grey-300" weight="bold" />
                  {{ slotProps.data.tanggalDaftar }}
                </div>
                <!-- <div class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]">
                  Jadwal
                  <PhArrowRight :size="18" class="my-auto mr-5 text-blueJeans-300" weight="bold" />
                  {{ slotProps.data.tanggalJadwal }}
                </div> -->
              </div>
            </template>
          </Column>
          <Column field="status" header="Status" headerClass="bg-adameds-50" class="w-[114px]">
            <template #body="slotProps">
              <div>
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.statusPelayanan"
                  customClass="h-5 pr-[5px] mr-[5px] border-none"
                  :bgColor="slotProps.data.statusPelayanan == 'DIPERIKSA' ? 'text-blueJeans-300' : slotProps.data.statusPelayanan == 'ORDER' ? 'bg-grey-75' : 'bg-danger-75'"
                  :textColor="slotProps.data.statusPelayanan == 'DIPERIKSA' ? 'text-blueJeans-300' : slotProps.data.statusPelayanan == 'ORDER' ? 'text-grey-400' : 'text-danger-300'"
                />
              </div>
              <div v-if="slotProps.data.statusPembayaran">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.statusPembayaran"
                  customClass="h-5 pr-[5px] mr-[5px] border-none"
                  :bgColor="slotProps.data.statusPembayaran == 'Belum Lunas' ? 'bg-grey-100' : 'bg-none'"
                  :textColor="slotProps.data.statusPembayaran == 'Belum Lunas' ? 'text-grey-400' : 'text-white'"
                />
              </div>
            </template>
          </Column>
          <Column v-if="showCancelVisit" selectionMode="multiple" headerStyle="width: 3rem" headerClass="bg-adameds-50" class="custom-checkbox"></Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="flex">
            <CustomButton v-if="!showCancelVisit" @click="showCancelVisit = true" class="my-auto bg-danger-300" label="Batal Kunjungan" />

            <CustomButton v-if="showCancelVisit" @click="showCancelVisit = false" class="my-auto mr-[10px]" label="Batal" outlined borderColor="border-grey-200" textColor="text-grey-300" />

            <CustomButton v-if="showCancelVisit" @click="showCancelVisit = true" class="my-auto mr-[10px] bg-danger-300 w-[20%]" label="Iya, Batalkan" :disabled="!cancelReason" />

            <CustomTextfield v-if="showCancelVisit" v-model="cancelReason" :showLabel="false" class="my-auto w-[400px]" placeholder="Alasan Batal Kunjungan" />
          </div>
          <CustomPaginator :rows="rowsPerPage" :totalRecords="itemsPasien.length" :rowsPerPageOptions="[10, 20, 30]" @update:rows="handleRowsUpdate" @update:current-page="handlePageUpdate" />
        </div>
      </template>
    </Card>
  </div>
</template>
