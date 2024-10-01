<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from '@/components/Base/CustomPaginator.vue';
// import TransactionDetailPage from "./layout/TransactionDetailPage.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const filterFarmasi = ref([
  "Farmasi Rawat Jalan",
  "Farmasi Rawat Inap",
  "Farmasi IGD",
]);

// Filter Menunggu Pembayaran
const selectedPayType = ref<string>("Obat");

const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  // console.log(selectedPayType, 'selectedPayType');
  
};

// Filter Pelayanan
const selectedFilterFarmasi = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterFarmasi.value.includes(label)) {
    // console.log(selectedFilterFarmasi, 'selectedFilterFarmasi');
    selectedFilterFarmasi.value = selectedFilterFarmasi.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterFarmasi.value.push(label);
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
    layanan: "IGD",
    harga: '10000',
    no_antrian: "00-00-00",
    status: "Lunas"
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
    layanan: "Rawat Inap",
    harga: '10000',
    no_antrian: "00-00-00",
    status: "Lunas"
  },
  {
    noRM: "123456",
    name: "Nama Pasien Lengkap",
    noRegis: "REG1203012312",
    noInvoice: "INVI1234",
    address: "Jl. Dipatiukur, Lebak Gede, Bandung City, West Java",
    doctor: "dr. Spesialis Sp. Og",
    tanggal_jadwal: "08.00 - 11.00",
    no_SEP: "123123123123",
    layanan: "Rawat Jalan",
    harga: '10000',
    insurance_account_name: "BPJS",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    no_antrian: '00-00-00',
    status: "Lunas"
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
    layanan: "IGD",
    harga: '10000',
    no_antrian: '00-00-00',
    status: "Lunas"
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
    layanan: "IGD",
    harga: '10000',
    no_antrian: "00-00-00",
    status: "Lunas"
  },
]);

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
};
const handlePageUpdate = (page: number) => {
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
  changeSection("Detail Tagihan");
};
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      v-if="dataBreadCrumb.length == 0"
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
                    label: 'Retur Obat & Material',
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
                placeholder="Cari Nama / address / No. RM"
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
            
            <!-- Filter Obat -->
            <div class="grid grid-cols-2 mt-[15px]">
              <CustomButton
                @click="onSelectPayType('Obat')"
                label="OBAT"
                :outlined="selectedPayType != 'Obat'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Obat' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Obat' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectPayType('Material')"
                label="MATERIAL"
                :outlined="selectedPayType != 'Material'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Material' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Material' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="ml-[20px] font-semibold "
              />
            </div>

            <!-- Filter Farmasi -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300 ">Filter Farmasi</div>
                <div class="flex">
                  <span class="font-semibold text-grey-300">|</span>
                  <CustomChip
                    v-for="(Pelayanan, index) in filterFarmasi" :key="Pelayanan + index"
                    :label="Pelayanan"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-50"
                    iconColor="text-adameds-300"
                    textColor="text-adameds-300"
                    customClass="h-7"
                    class="ml-[10px]"
                    :isSelected="selectedFilterFarmasi.includes(Pelayanan)"
                    @selected="onPoliSelect"
                    selectedColor="bg-adameds-300 border-adameds-300"
                  />
                </div>
            </div>
            
            <!-- Filter Pembayaran -->
            <div class="flex my-[10px] mt-5 font-semibold text-SM text-grey-300">
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
            <hr class="mt-5 border-[1px] border-grey-200">
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
      
      <!-- Datatable -->
      <template #content>
      <DataTable
        v-if="itemsPasien.length"
        :value="itemsPasien"
        tableStyle="min-width: 50rem"
        class="mt-2"
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
        @rowClick="showDetail"
      >
        <!-- Resep -->
        <Column field="resep" header="Resep" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="">
              <div v-if="slotProps.data.no_antrian"
                class="text-SM">
                {{ slotProps.data.no_antrian }}
              </div>
              <div class="text-SM">{{ slotProps.data.noRegis }}</div>
              <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
            </div>
          </template>
        </Column>

        <!-- Pasien -->
        <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">
              <p class="font-semibold">{{ slotProps.data.name }}</p>
            </div>
            <div class="flex flex-wrap">
              <CustomChip
                :label="slotProps.data.no_antrian"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-300" 
                textColor="text-white"
                customClass="h-6"
              />
            </div>
          </template>
        </Column>

        <!-- Keperawatan -->
        <Column field="keperawatan" header="Keperawatan" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.doctor }}</div>
            <div class="flex flex-wrap">
              <CustomChip
                :label="slotProps.data.layanan"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-300" 
                textColor="text-white"
                customClass="h-6"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.insurance_account_name"
                :bgColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'bg-adameds-50'
                    : 'bg-warning-50'
                "
                :textColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'text-adameds-300'
                    : 'text-warning-300'
                "
                :borderColor="
                  slotProps.data.insurance_account_name == 'TUNAI'
                    ? 'border-adameds-300'
                    : 'border-warning-300'
                "
                customClass="h-6 pr-[6px] ml-[5px]"
              />
              <CustomChip
                v-if="slotProps.data.no_SEP"
                :showCheckedIcon="false"
                :label="`SEP.${slotProps.data.no_SEP}`"
                bgColor="bg-warning-50"
                textColor="text-warning-300"
                borderColor="border-warning-300"
                customClass="h-6 pr-[6px] ml-[5px]"
              />
            </div>
          </template>
        </Column>

        <!-- Status -->
        <Column field="status" header="Status" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="">
              <CustomChip
                :showCheckedIcon="false"
                :label="
                  slotProps.data.status == 'Lunas' ? 'Lunas' : 'Piutang'
                "
                :bgColor="
                  slotProps.data.status == 'Lunas' ? 'bg-success-300' : 'bg-danger-75'
                "
                :textColor="
                  slotProps.data.status == 'Lunas'
                    ? 'text-white'
                    : 'text-danger-300'
                "
                customClass="h-6 pr-[6px] border-none"
              />
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
            :totalRecords="100"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>
    <!-- <TransactionDetailPage
      v-else-if="dataBreadCrumb[0].label == 'Detail Tagihan'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="dataBreadCrumb.pop()"
      @goToDetail="dataBreadCrumb[0].label = 'Detail Tagihan'"
    /> -->
  </div>
</template>
