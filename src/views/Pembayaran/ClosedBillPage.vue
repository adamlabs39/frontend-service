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
import CustomSelect from "@/components/Base/CustomSelect.vue";
import ClosedBillDetailPage from "./layout/ClosedBillDetailPage.vue"
import { utilsStore } from "@/stores/utils";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const pageType = ref("");
const route = useRoute();

const storeUtils = utilsStore();

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
    gender: "P",
    phone: "082112341234",
    age_year: 10,
    age_month: 3,
    age_day: 5,
    no_antrian: "00-00-00",
    new_patient: false,
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
    no_SEP: "",
    insurance_account_name: "TUNAI",
    polyclinic: "POLI ANAK",
    phone: "082112341234",
    age_year: 20,
    age_month: 3,
    age_day: 5,
    no_antrian: null,
    new_patient: true,
    status: "Piutang"
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
    status: "Piutang"
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
    status: "Lunas"
  },
]);

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
  console.log('Rows updated:', rows);
};
const handlePageUpdate = (page: number) => {
  console.log('Page updated:', page);
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

const showPatientDetail = () => {
  changeSection("Detail Transaksi Pasien");
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
});
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
                    label: 'Closed Bill',
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
              <CustomSelect
                label="Status"
                class="mr-5 w-[150px]"
                optionLabel=""
                optionValue=""
                :options="['Semua','Lunas', 'Piutang']"
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
            <div class="flex mb-[10px] mt-5 font-semibold text-SM text-grey-300">
              <div class="w-[15%]">Filter Pelayanan</div>
                <div class="flex">
                  |
                  <CustomChip
                    v-for="(poli, index) in filterPoliList"
                    :key="poli + index"
                    :label="poli"
                    class="ml-[10px]"
                    :isSelected="selectedFilterPoli.includes(poli)"
                    @selected="onPoliSelect"
                  />
                </div>
            </div>
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
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          @rowClick="showPatientDetail"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Nomor</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div v-if="slotProps.data.no_antrian"
                  class="text-SM">
                  {{ slotProps.data.no_antrian }}
                </div>
                <div class="text-SM">{{ slotProps.data.noRegis }}</div>
                <div class="text-SM">{{ slotProps.data.noInvoice }}</div>
              </div>
            </template>
          </Column>
          <Column field="pasien" header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
                <span class="text-grey-300">
                  ({{ slotProps.data.age_year }}Th
                  {{ slotProps.data.age_month }}Bln
                  {{ slotProps.data.age_day }}Hr)
                </span>
              </div>
              <div class="text-XS">{{ slotProps.data.address }}</div>
              <div class="flex flex-wrap">
                <PhUserCirclePlus
                  v-if="slotProps.data.new_patient"
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
          >
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.doctor }} <span class="text-adameds-300">|</span> {{ slotProps.data.tanggal_jadwal }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.polyclinic"
                  customClass="h-5 pr-[5px] mr-[5px]"
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
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="flex items-center justify-center w-full font-semibold text-SM">
                Status
              </div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center gap-2.5 justify-center">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="
                    slotProps.data.status == 'Lunas' ? 'Lunas' : 'Piutang'
                  "
                  :bgColor="
                    slotProps.data.status == 'Lunas' ? 'bg-success-75' : 'bg-danger-75'
                  "
                  :textColor="
                    slotProps.data.status == 'Lunas'
                      ? 'text-success-300'
                      : 'text-danger-300'
                  "
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
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
    <ClosedBillDetailPage
      v-else-if="dataBreadCrumb[0].label == 'Detail Transaksi Pasien'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="dataBreadCrumb.pop()"
      @goToDetail="dataBreadCrumb[0].label = 'Detail Transaksi Pasien'"
    />
  </div>
</template>
