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
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import DaftarOrderFisioPage from "./Layout/DaftarOrderFisioPage.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";
import HeaderEditDataPasienPage from "./Layout/HeaderEditDataPasienPage.vue";
import PopUpOrderFisioPage from "./Layout/PopUpOrderFisioPage.vue";

import NoData from "@/components/section/NoData.vue";

const storeUtils = utilsStore();
const pageType = ref("");
const route = useRoute();
const rowsPerPage = ref(10);
const currentPage = ref(0);
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const editOrderDialog = ref(false);

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

// Filter Pembayaran

const selectedStatus = ref<any>();
const itemStatus = ref([
  { name: "Semua", code: "S1" },
  { name: "Belum Lunas", code: "S2" },
  { name: "Batal Order", code: "S3" },
]);
const patientData = ref<any>({});

// State untuk filter pembayaran
const selectedPaymentMethod = ref<string[]>([]);

// Filter data berdasarkan metode pembayaran
const filteredData = computed(() => {
  if (selectedPaymentMethod.value.length === 0) {
    // Jika tidak ada filter yang dipilih, tampilkan semua data
    return itemsPasien.value;
  }

  // Jika hanya "TUNAI" yang dipilih, filter data dengan insuranceAccountName "TUNAI"
  if (
    selectedPaymentMethod.value.includes("TUNAI") &&
    !selectedPaymentMethod.value.includes("ASURANSI")
  ) {
    return itemsPasien.value.filter(
      (item) => item.insuranceAccountName === "TUNAI"
    );
  }

  // Jika hanya "ASURANSI" yang dipilih, filter data dengan insuranceAccountName selain "TUNAI"
  if (
    !selectedPaymentMethod.value.includes("TUNAI") &&
    selectedPaymentMethod.value.includes("ASURANSI")
  ) {
    return itemsPasien.value.filter(
      (item) => item.insuranceAccountName !== "TUNAI"
    );
  }

  // Jika keduanya dipilih (TUNAI dan ASURANSI), tampilkan semua data
  return itemsPasien.value;
});

// Total data yang difilter
const totalFilteredData = computed(() => filteredData.value.length);

// Fungsi untuk mengubah metode pembayaran yang dipilih
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item !== label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
};

const dateFilter = ref<Date>(new Date());
const dataTindakan = ref<any[]>([]);

const tambahTindakan = toTypedSchema(
  yup.object({
    listTindakan: yup.string(),
    jumlah: yup.number(),
    harga: yup.number(),
  })
);

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: tambahTindakan,
  initialValues: {
    listTindakan: "",
    jumlah: 0,
    harga: 0,
  },
});

const listTindakan = ref([
  { id: "1", value: "Fisio 1" },
  { id: "2", value: "Fidio 2" },
  { id: "3", value: "Fisio 3" },
]);

const deleteDataTindakan = (index: number) => {
  dataTindakan.value.splice(index, 1);
};

const myPushFunction = () => {
  dataTindakan.value.push({
    listTindakan: "",
    jumlah: 0,
    harga: 0,
  });
};

const medicalRecord = ref<typeof MedicalRecord>();
const openDialogRM = () => {
  medicalRecord.value?.showDialogRM();
};
const popupDialog = ref(false);

const editIdentitas = () => {
  popupDialog.value = false;
  changeSection("Edit Profil Pasien");
};
const handleBack = () => {
  popupDialog.value = true; // Menampilkan popup dialog
  dataBreadCrumb.value = [];
};
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
                    label: 'Order Fisioterapi',
                    home: true,
                  }"
                />
                <!-- <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Bed Ruangan</p>
                </div> -->
              </div>
              <CustomButton
                @click="changeSection('Daftar')"
                icon="PhPlus"
                label="Daftar"
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
              <CustomSelect
                v-model="selectedStatus"
                :options="itemStatus"
                label="Status"
                class="mr-5 w-[150px]"
                optionLabel="name"
                optionValue="code"
                place-holder="Semua"
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

            <div
              class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300"
            >
              <div class="w-[15%]">Filter Pembayaran</div>
              <div class="flex">
                |
                <CustomChip
                  label="TUNAI"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  :isSelected="selectedPaymentMethod.includes('TUNAI')"
                  @selected="onPaymentMethodSelect"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
                <CustomChip
                  label="ASURANSI"
                  borderColor="border-warning-300"
                  bgColor="bg-warning-50"
                  iconColor="text-warning-300"
                  textColor="text-warning-300"
                  customClass="h-5"
                  class="ml-[10px]"
                  :isSelected="selectedPaymentMethod.includes('ASURANSI')"
                  @selected="onPaymentMethodSelect"
                  selectedColor="bg-warning-300 border-warning-300"
                />
              </div>
            </div>
            <hr class="mt-5 border-[1px] border-grey-200" />
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
          @rowClick="popupDialog = true"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.noPendaftaran }}</div>
                <div
                  class="max-w-[75px] mx-auto bg-adameds-50 text-adameds-300 rounded-[5px] text-SM font-semibold"
                >
                  {{ slotProps.data.noMT }}
                </div>
                <div class="text-SM">{{ slotProps.data.noREG }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="pasien"
            header="Pasien"
            headerClass="bg-adameds-50"
            class="w-[300px]"
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
                <PhUserCirclePlus
                  v-if="slotProps.data.newPatient"
                  :size="22"
                  class="text-adameds-300 mt-auto mr-[5px]"
                  weight="fill"
                />
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
            field="keperawatan"
            header="Keperawatan"
            headerClass="bg-adameds-50"
            class="w-[350px]"
          >
            <template #body="slotProps">
              <div class="flex gap-1.5">
                <div class="text-SM">{{ slotProps.data.doctor }}</div>
                <hr class="w-px min-h-5 bg-adameds-300" />
                <div class="text-SM">{{ slotProps.data.practicHour }}</div>
              </div>
              <div class="flex flex-wrap mt-1">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.polyclinic"
                  customClass="h-5 pr-[5px] mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.insuranceAccountName"
                  :bgColor="
                    slotProps.data.insuranceAccountName == 'TUNAI'
                      ? 'bg-adameds-50'
                      : 'bg-warning-50'
                  "
                  :textColor="
                    slotProps.data.insuranceAccountName == 'TUNAI'
                      ? 'text-adameds-300'
                      : 'text-warning-300'
                  "
                  :borderColor="
                    slotProps.data.insuranceAccountName == 'TUNAI'
                      ? 'border-adameds-300'
                      : 'border-warning-300'
                  "
                  customClass="h-5 pr-[6px] mr-[5px]"
                />
                <CustomChip
                  v-if="slotProps.data.no_SEP"
                  :showCheckedIcon="false"
                  :label="`SEP.${slotProps.data.no_SEP}`"
                  bgColor="bg-warning-50"
                  textColor="text-warning-300"
                  borderColor="border-warning-300"
                  customClass="h-5 pr-[6px]"
                />
              </div>
            </template>
          </Column>
          <Column
            field="data-kunjungan"
            header="Data Kunjungan"
            headerClass="bg-adameds-50"
            class="max-w-[240px]"
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
                <!-- <div class="grid content-center grid-cols-[80px_min-content_150px] mt-[5px]">
                  Jadwal
                  <PhArrowRight :size="18" class="my-auto mr-5 text-blueJeans-300" weight="bold" />
                  {{ slotProps.data.tanggalJadwal }}
                </div> -->
              </div>
            </template>
          </Column>
          <Column
            field="status"
            header="Status"
            headerClass="bg-adameds-50"
            class="w-[150px]"
          >
            <template #body="slotProps">
              <div>
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.statusPelayanan"
                  customClass="h-5 pr-[5px] mr-[5px] border-none"
                  :bgColor="
                    slotProps.data.statusPelayanan == 'DIPERIKSA'
                      ? 'text-blueJeans-300'
                      : slotProps.data.statusPelayanan == 'ORDER'
                      ? 'bg-grey-75'
                      : 'bg-danger-75'
                  "
                  :textColor="
                    slotProps.data.statusPelayanan == 'DIPERIKSA'
                      ? 'text-blueJeans-300'
                      : slotProps.data.statusPelayanan == 'ORDER'
                      ? 'text-grey-400'
                      : 'text-danger-300'
                  "
                />
              </div>
              <div v-if="slotProps.data.statusPembayaran">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.statusPembayaran"
                  customClass="h-5 pr-[5px] mr-[5px] border-none"
                  :bgColor="
                    slotProps.data.statusPembayaran == 'Belum Lunas'
                      ? 'bg-grey-100'
                      : 'bg-none'
                  "
                  :textColor="
                    slotProps.data.statusPembayaran == 'Belum Lunas'
                      ? 'text-grey-400'
                      : 'text-white'
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
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="flex">
            <CustomButton
              v-if="!showCancelVisit"
              @click="showCancelVisit = true"
              class="my-auto bg-danger-300"
              label="Batal Order"
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
              placeholder="Alasan Batal Order"
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

    <DaftarOrderFisioPage
      v-else-if="dataBreadCrumb[0].label == 'Daftar'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :patientData="patientData"
      @back="dataBreadCrumb.pop()"
    />

    <HeaderEditDataPasienPage
      v-else-if="dataBreadCrumb[0].label == 'Edit Profil Pasien'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :patientData="patientData"
      @back="handleBack"
    />

    <!-- Pop Up Dialog -->
    <CustomDialog v-model:visible="popupDialog" width="1000px">
      <template #header>
        <div class="flex justify-between">
          <div class="flex">
            <p>
              Detail Order Fisioterapi
              <CustomChip
                label="TUNAI"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                textColor="text-adameds-300"
                customClass="h-6"
                class="ml-[5px]"
              />
            </p>
          </div>
          <div></div>
          <div class="flex ml-[470px]">
            <div class="bg-white w-[1px] h-[30px]"></div>
            <p class="text-sm ml-[10px] mt-[3px]">Tgl. Order : 3-10-2024</p>
          </div>
          <div></div>
        </div>
      </template>
      <template #body>
        <div>
          <div class="pt-5 mb-20">
            <div class="flex flex-row">
              <div class="basis-1/4">
                <p class="font-bold text-MD">Nama lengkap pasien</p>
                <p>REG1231235</p>
                <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                />
              </div>
              <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Tgl. Lahir
                </p>
                <p class="">10 Januari 2090</p>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Umur
                </p>
                <p class="">24Thn 2Bln 1Hari</p>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Alergi
                </p>
                <p class="">Tidak Ada</p>
              </div>
            </div>

            <!-- Asesmen Medis -->
            <div class="grid grid-cols-1 mt-2">
              <CustomAccordion
                no-border
                :openWithHeader="false"
                initial-state="0"
              >
                <template #header>
                  <div class="flex justify-between w-full mt-5">
                    <div class="mt-4 basis-1/4">
                      <p class="font-bold text-MD">Asesmen Medis</p>
                    </div>
                    <div>
                      <CustomButton
                        @click="openDialogRM"
                        label="Rekam Medis"
                        class="mr-4"
                      />
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="flex flex-row mt-8">
                    <div class="basis-1/4">
                      <p class="text-xs font-bold underline underline-offset-2">
                        Keluhan Utama
                      </p>
                      <p>Sakit Mata</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Dokter Pengirim
                        <span> </span>
                      </p>
                      <p>dr. Anji Sp. M</p>
                    </div>
                    <div
                      class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"
                    ></div>
                    <div class="mr-[180px]">
                      <p class="text-xs font-bold underline underline-offset-2">
                        Diagnosa Primer
                      </p>
                      <p class="">H10.9 Conjuctivitis</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Diagnosa Sekunder
                      </p>
                      <p class="">-</p>
                    </div>
                    <div class="mr-[80px]">
                      <p class="text-xs font-bold underline underline-offset-2">
                        Diagnosa Sekunder
                      </p>
                      <p class="">-</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Diagnosa Sekunder
                      </p>
                      <p class="">-</p>
                    </div>
                  </div>
                </template>
                <template #collapseIcon>
                  <CustomButton
                    icon="PhCaretUp"
                    backgroundColor="bg-transparent"
                    textColor="text-adameds-300"
                  />
                </template>
                <template #expandIcon>
                  <CustomButton
                    icon="PhCaretDown"
                    backgroundColor="bg-transparent"
                    textColor="text-adameds-300"
                  />
                </template>
              </CustomAccordion>
            </div>

            <!-- Profil Pasien  -->

            <div class="grid grid-cols-1 mt-2">
              <CustomAccordion
                no-border
                :openWithHeader="false"
                initial-state="0"
              >
                <template #header>
                  <div class="flex justify-between w-full mt-5">
                    <div class="mt-4 basis-1/4">
                      <p class="font-bold text-MD">Profil Pasien</p>
                    </div>
                    <div>
                      <CustomButton
                        @click="editIdentitas"
                        label="Edit Data"
                        class="mr-4"
                      />
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="grid grid-cols-3 gap-4 mt-8">
                    <div class="">
                      <p class="text-xs font-bold underline underline-offset-2">
                        KTP
                      </p>
                      <p>1666666666666666</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Provinsi
                        <span> </span>
                      </p>
                      <p>Jawa Timur</p>
                      <p
                        class="mt-3 text-xs font-bold underline underline-offset-2"
                      >
                        Kelurahahn / Desa
                      </p>
                      <p>Keputih</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Alamat
                        <span> </span>
                      </p>
                      <p>Jl. Ijo Abang no. 17</p>
                    </div>

                    <div>
                      <p class="text-xs font-bold underline underline-offset-2">
                        No. Handphone
                      </p>
                      <p class="">081234567890</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Kabupaten / Kota
                      </p>
                      <p class="">Surabaya</p>
                      <div class="flex flex-row mt-[10px]">
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            RT
                          </p>
                          <p>01</p>
                        </div>
                        <div class="basis-1/4">
                          <p
                            class="text-xs font-bold underline underline-offset-2"
                          >
                            RW
                          </p>
                          <p>02</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p class="text-xs font-bold underline underline-offset-2">
                        Agama
                      </p>
                      <p class="">Islam</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Kecamatan
                      </p>
                      <p class="">Sukolilo</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Kode Pos
                      </p>
                      <p class="">12345</p>
                    </div>
                  </div>
                </template>
                <template #collapseIcon>
                  <CustomButton
                    icon="PhCaretUp"
                    backgroundColor="bg-transparent"
                    textColor="text-adameds-300"
                  />
                </template>
                <template #expandIcon>
                  <CustomButton
                    icon="PhCaretDown"
                    backgroundColor="bg-transparent"
                    textColor="text-adameds-300"
                  />
                </template>
              </CustomAccordion>
            </div>

            <!-- List Order Terapi -->
            <div class="grid grid-cols-1 mt-[20px]">
              <CustomAccordion
                no-border
                :openWithHeader="false"
                initial-state="0"
              >
                <template #header>
                  <div class="flex justify-between w-full">
                    <div class="mt-2">
                      <p>List Order Terapi</p>
                    </div>

                    <div class="flex ml-[460px] mt-2">
                      <div class="bg-mediumGrey-300 w-[1px] h-[30px]"></div>
                      <p class="text-xs ml-[10px] mt-[3px]">
                        Tgl. Order : 3-10-2024
                      </p>
                    </div>
                    <CustomButton
                      @click="editOrderDialog = true"
                      label="Edit Order"
                      class="mr-4"
                    />
                  </div>
                </template>
                <template #content>
                  <div class="mt-[20px]">
                    <card class="bg-adameds-50">
                      <template #content>
                        <div class="flex justify-between">
                          <div class="flex">
                            <p class="text-base font-bold text-adameds-300">
                              FISK82L
                            </p>
                            <div
                              class="bg-black w-[2px] h-[15px] ml-2 mt-1"
                            ></div>
                            <p class="ml-2 text-base font-bold">
                              Rincian Pemeriksaan & Biaya
                            </p>
                          </div>
                        </div>
                      </template>
                    </card>
                    <div class="pt-5 mt-[-20px]">
                      <DataTable
                        class="overflow-hidden rounded-[10px]"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM', thead: 'z-0' }"
                      >
                        <Column
                          field="pemeriksaanName"
                          header="Nama Pemeriksaan"
                        >
                          <template #body="slotProps">
                            <div class="flex justify-between">
                              <div>
                                <p class="text-SM">
                                  {{ slotProps.data.pemeriksaanName }}
                                </p>
                              </div>
                            </div>
                          </template>
                        </Column>

                        <Column field="diagnosa" header="Diagnosis">
                          <template #body="slotProps">
                            <div>
                              <p class="text-sm">
                                {{ slotProps.data.diagnosa }}
                              </p>
                            </div>
                          </template>
                        </Column>

                        <!-- Harga -->
                        <Column field="harga">
                          <template #header>
                            <div class="font-bold text-end">Harga</div>
                          </template>
                          <template #body="slotProps">
                            <div class="text-SM text-end">
                              {{ slotProps.data.harga }}
                            </div>
                          </template>
                        </Column>
                      </DataTable>
                    </div>
                    <div class="mt-4">
                      <card class="bg-adameds-50">
                        <template #content>
                          <div class="grid grid-cols-3">
                            <div>
                              <p
                                class="text-xs font-bold underline underline-offset-2"
                              >
                                Dokter Pengirim
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                            <div class="flex">
                              <div class="bg-black w-[1px] h-[30px] ml-2"></div>
                              <p class="mt-1 ml-4 text-base font-bold">
                                Total Tagihan Fisio
                              </p>
                            </div>
                            <div>
                              <p
                                class="flex justify-end mt-1 text-base font-bold"
                              >
                                RP. 0, 00
                              </p>
                            </div>
                          </div>
                        </template>
                      </card>
                    </div>
                  </div>
                </template>
                <template #collapseIcon>
                  <CustomButton
                    icon="PhCaretUp"
                    backgroundColor="bg-transparent"
                    textColor="text-adameds-300"
                  />
                </template>
                <template #expandIcon>
                  <CustomButton
                    icon="PhCaretDown"
                    backgroundColor="bg-transparent"
                    textColor="text-adameds-300"
                  />
                </template>
              </CustomAccordion>
            </div>
          </div>
        </div>
        <Card class="absolute inset-x-0 bottom-0">
          <template #footer>
            <div class="flex justify-end">
              <CustomButton
                label="Validasi Order"
                backgroundColor="bg-adameds-300"
              />
            </div>
          </template>
        </Card>
      </template>
    </CustomDialog>

    <!-- Edit Order Dialog -->
    <CustomDialog
      v-model:visible="editOrderDialog"
      class="h-[600px]"
      width="800px"
    >
      <template #header>
        <div class="flex">
          <p>Edit Order Fisio</p>
        </div>
      </template>
      <template #body>
        <div class="pt-5 grid grid-cols-[25%_75%] gap-4">
          <div>
            <CustomDatePicker
              v-model="dateFilter"
              label="Tanggal"
              class="mr-[20px]"
            />
          </div>
          <div>
            <CustomSelect
              label="Jenis Fisioterapi"
              place-holder="Pilih Jenis Fisioterapi"
              class="mr-[20px]"
              optionLabel=""
              optionValue=""
              :options="['Jenis 1', 'Jenis 2', 'Jenis 3']"
            />
          </div>
        </div>
        <div>
          <CustomSelect
            label="Diagnosis"
            place-holder="Cari dan Pilih Diagnosis"
            class="w-full mt-4"
            optionLabel=""
            optionValue=""
            :options="['Diagnosis 1', 'Diagnosis 2', 'Diagnosis 3']"
            prependIcon="PhMagnifyingGlass"
          />
        </div>

        <!-- Data Tabel dialog -->
        <div class="mt-[20px]">
          <div class="relative overflow-y-auto" style="max-height: 220px">
            <DataTable
              :pt="{ headerRow: 'text-SM' }"
              :value="dataTindakan"
              scrollable
              scrollHeight="160px"
              class="overflow-hidden text-xs rounded-lg bg-adameds-50"
            >
              <Column
                headerClass="bg-adameds-50 font-semibold text-SM"
                class="w-[20px]"
              >
                <template #header>
                  <div class="flex items-center">No.</div>
                </template>
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    {{ slotProps.index + 1 }}
                  </div>
                </template>
              </Column>

              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="font-semibold">List Tindakan</div>
                </template>
                <template #body="slotProps">
                  <CustomSelect
                    prepend-icon="PhMagnifyingGlass"
                    v-model="slotProps.data.listTindakan"
                    :options="listTindakan"
                    optionValue="value"
                    optionLabel="value"
                    label=""
                    place-holder="Cari & Pilih Tindakan"
                  />
                </template>
              </Column>
              <Column headerClass="bg-adameds-50 " class="w-[150px]">
                <template #header>
                  <div class="w-full font-semibold text-center">Jumlah</div>
                </template>
                <template #body="slotProps">
                  <CustomInputNumber
                    :show-label="false"
                    v-model="slotProps.data.jumlah"
                    :show-buttons="true"
                    class="text-center"
                  />
                </template>
              </Column>

              <Column headerClass="bg-adameds-50 " class="min-w-[150px]">
                <template #header>
                  <div class="w-full font-semibold text-center">Harga</div>
                </template>
                <template #body="slotProps">
                  <CustomInputNumber
                    v-model="slotProps.data.harga"
                    class=""
                    label=""
                  >
                    <template #prependText>
                      <div
                        class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                      >
                        Rp.
                      </div>
                    </template>
                  </CustomInputNumber>
                </template>
              </Column>

              <Column headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-semibold text-center">Action</div>
                </template>
                <template #body="slotProps">
                  <div class="flex items-center justify-center">
                    <CustomButton
                      label=""
                      background-color="bg-danger-300 rounded-lg"
                      @click="deleteDataTindakan(slotProps.index)"
                    >
                      <img
                        src="@/assets/icons/delete.svg"
                        alt=""
                        width="14px"
                      />
                    </CustomButton>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <div
          class="flex items-center justify-center mt-5 p-5 border border-dashed rounded-lg border-adameds-300 gap-2.5 mb-[70px]"
        >
          <CustomButton
            icon="PhPlus"
            label="Tambah Tindakan"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="myPushFunction"
          />
        </div>
        <Card class="absolute inset-x-0 bottom-0">
          <template #footer>
            <div class="flex justify-end">
              <CustomButton
                label="Reset"
                class="mr-[10px]"
                outlined
                borderColor="border-grey-200"
                textColor="text-grey-300"
              />
              <CustomButton
                label="Batal Edit"
                class="mr-[10px]"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
              />
              <CustomButton
                label="Simpan"
                class=""
                backgroundColor="bg-adameds-300"
              />
            </div>
          </template>
        </Card>
      </template>
    </CustomDialog>
  </div>
  <MedicalRecord ref="medicalRecord" />
</template>
