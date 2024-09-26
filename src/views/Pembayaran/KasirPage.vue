<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import ScrollPanel from 'primevue/scrollpanel';
import type { DataTableRowClickEvent } from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const filterPoliList = ref([
  "POLI UMUM",
  "POLI ANAK",
  "POLI GIGI POLI MATA",
  "APS",
]);

// Filter Menunggu Pembayaran
const selectedPayType = ref<string>("MenungguPembayaran");

const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  console.log(selectedPayType, 'selectedPayType');
  
};

// Filter Pelayanan
const selectedFilterPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterPoli.value.includes(label)) {
    console.log(selectedFilterPoli, 'selectedFilterPoli');
    
    selectedFilterPoli.value = selectedFilterPoli.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPoli.value.push(label);
  }
};

// Filter Pembayaran
const selectedPaymentMethod = ref<string[]>([]);
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
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    gender: "L",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: true,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "-",
    no_SEP: "9999999999999999",
    insurance_account_name: "BPJS",
    polyclinic: "POLI KANDUNGAN",
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: true,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: false,
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. A",
    tanggal_jadwal: " - ",
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
  },
]);

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
  console.log('Rows updated:', handleRowsUpdate);
};
const handlePageUpdate = (page: number) => {
  console.log('Page updated:', handleRowsUpdate);
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const showSEPDetail = (event: DataTableRowClickEvent) => {
  let data = event.data;
  dataBreadCrumb.value.push({
    label: data.name,
    noRM: data.noRM,
    age: `(${data.age_year}Th ${data.age_month}Bln ${data.age_day}Hr)`,
  });
};
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Kasir',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian Transaksi"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / address / No. RM"
                class="w-2/4 mr-5"
              />
              <CustomTextfield pr label="Saldo Awal" placeholder="0" class="mr-5">
                <template #prependText>
                  <div
                    class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r"
                  >
                    Rp.
                  </div>
                </template>
              </CustomTextfield>
              <CustomSelect
                label="Pilih Shift"
                class="grow"
                optionLabel=""
                optionValue=""
                :options="['Pagi', 'Siang', 'Sore', 'Malem']"
              />
              <CustomButton
                label="Open Kasir"
                class="ml-5 mr-[10px] mt-auto"
              />
            </div>
            <div class="flex mt-[10px]">
              
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
        <!-- <ScrollPanel style="width: 100%; height: 200px"> -->
          <div class="grid grid-cols-[50%_50%] gap-5 h-full mr-5">
            <div class="flex flex-col text-center border border-[1px] border-grey-300 rounded-lg">
              <div class="m-auto text-SM">
                <img
                  src="../../assets/icons/no-data-icon.svg"
                  alt="no data"
                  class="mx-auto"
                />
                <div class="text-grey-300">Silahkan Cari Tagihan Pasien</div>
              </div>
            </div>
            <div class="relative p-5 rounded-lg bg-adameds-50">
              <!-- Total Pembayaran -->
              <div class="flex items-center justify-between">
                <div class="text-base font-bold font-poppins">
                  Total Pembayaran
                </div>
              </div>
              <hr class="mt-2 mb-2 border border-slate-300"/>
              <!-- Biaya Administrasi -->
              <div class="flex justify-between mt-6">
                <div class="text-sm text-black font-poppins">
                  Biaya Administrasi
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- Biaya Tindakan -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  Biaya Tindakan
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- Biaya Obat -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  Biaya Obat
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- Biaya Kamar -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  Biaya Kamar
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- PPN -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  PPN
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <hr class="mt-4 border-dashed border-[1px] border-slate-300"/>
              <!-- Diskon -->
              <div class="flex justify-between mt-6">
                <div class="text-sm font-poppins">
                  Diskon
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <hr class="mt-6 mb-2 border border-black"/>
              <!-- Grand Total -->
              <div class="flex justify-between mt-6">
                <div class="text-sm font-bold font-poppins">
                  Grand Total
                </div>
                <div class="text-sm font-bold font-poppins">
                  Rp, 0
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 mb-4">
                <div class="flex">
                  <!-- <CustomButton
                    label="Bayar"
                    class="w-full mr-4"
                  /> -->
                  <CustomButton
                    label="Close Bill"
                    class="w-full ml-4 mr-4"
                    textColor = "text-slate-400"
                    backgroundColor="bg-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        <!-- </ScrollPanel> -->
      </template>
    </Card>
  </div>
</template>
