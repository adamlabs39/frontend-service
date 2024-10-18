<script setup lang="ts">
import { onMounted, computed, ref, type PropType } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import PenjadwalanTerapiDetailPage from "./Layout/PenjadwalanTerapiDetailPage.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const pageType = ref("");
const patientData = ref<any>({});

// Filter Menunggu Pembayaran
const selectedPayType = ref<string>("MenungguPembayaran");

const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  console.log(selectedPayType, "selectedPayType");
};

// Filter Pembayaran
const selectedPaymentMethod = ref<string[]>([]);
const selectedPayStatus = ref<string>("Semua"); // Default: tampilkan semua

const filteredData = computed(() => {
  let data = itemsPasien.value;

  // Filter Pembayaran
  if (
    selectedPaymentMethod.value.includes("TUNAI") &&
    !selectedPaymentMethod.value.includes("ASURANSI")
  ) {
    data = data.filter((item) => item.insuranceAccountName === "TUNAI");
  } else if (
    !selectedPaymentMethod.value.includes("TUNAI") &&
    selectedPaymentMethod.value.includes("ASURANSI")
  ) {
    data = data.filter((item) => item.insuranceAccountName !== "TUNAI");
  }

  // Filter Terjadwal/Belum Terjadwal
  if (selectedPayType.value === "MenungguPembayaran") {
    data = data.filter((item) => item.tanggalJadwal === ""); // Belum Terjadwal
  } else if (selectedPayType.value === "Lunas") {
    data = data.filter((item) => item.tanggalJadwal !== ""); // Terjadwal
  }

  return data;
});

const totalFilteredData = computed(() => filteredData.value.length);

const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
};

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
    tanggalJadwal: "",
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

const emits = defineEmits(["update:rows", "update:current-page"]);
const handleRowsUpdate = (rows: number) => {
  console.log("Rows updated:", rows);
};
const handlePageUpdate = (page: number) => {
  console.log("Page updated:", page);
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const showDetail = (event: DataTableRowClickEvent) => {
  changeSection("Penjadwalan Terapi");
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
                    label: 'Penjadwalan Terapi',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama, Alamat, No RM"
                class="mr-5 grow"
              />
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
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
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
            <div class="flex mt-[10px]">
              <CustomButton
                @click="onSelectPayType('MenungguPembayaran')"
                label="BELUM TERJADWAL"
                :outlined="selectedPayType != 'MenungguPembayaran'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'MenungguPembayaran'
                    ? 'text-adameds-300'
                    : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'MenungguPembayaran'
                    ? 'bg-transparent'
                    : 'bg-adameds-300'
                "
                class="mt-auto mr-[5px] font-semibold"
                full
              />
              <CustomButton
                @click="onSelectPayType('Lunas')"
                label="TERJADWAL"
                :outlined="selectedPayType != 'Lunas'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Lunas' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Lunas'
                    ? 'bg-transparent'
                    : 'bg-adameds-300'
                "
                class="mt-auto ml-[5px] font-semibold"
                full
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
          :value="filteredData"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="showDetail"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.noPendaftaran }}</div>

                <div class="mt-3 text-SM">{{ slotProps.data.noREG }}</div>
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
                  v-if="slotProps.data.tanggalJadwal !== ''"
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
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="10"
            :totalRecords="totalFilteredData"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
    <PenjadwalanTerapiDetailPage
      v-else-if="dataBreadCrumb[0].label == 'Penjadwalan Terapi'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      :patientData="patientData"
      @back="dataBreadCrumb.pop()"
    />
  </div>
</template>
