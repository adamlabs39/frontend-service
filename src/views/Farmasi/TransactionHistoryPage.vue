<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useTransactionHistoryStore } from "@/stores/farmasi/TransactionHistory";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { utilsStore } from "@/stores/utils";
import { dateToEpoch, epochToDate } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import DialogDetailObat from "./Layout/DetailTransactionObatPage.vue";
import DialogDetailAlkes from "./Layout/DetailTransactionAlkesPage.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

// State Management
const TransactionHistoryStore = useTransactionHistoryStore();
const UseUtilsStore = utilsStore();
const TransactionHistoryObatPayload = ref<any[]>([]);
const TransactionHistoryAlkesPayload = ref<any[]>([]);
const TransactionHistoryProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");

// Check if Data Exists
const hasDataObat = computed(
  () => TransactionHistoryObatPayload.value && TransactionHistoryObatPayload.value.length > 0
);
const hasDataAlkes = computed(
  () => TransactionHistoryAlkesPayload.value && TransactionHistoryAlkesPayload.value.length > 0
);

// Fetch Transaction History
const fetchTransactionHistory = async () => {
  UseUtilsStore.setLoading(true);
  const selectedPaymentNew = [...selectedPayment.value];
  const selectedLocationNew = [...selectedLocation.value];
  try {
    const response = await TransactionHistoryStore.getApi({
      item_type: selectMedicine.value,
      status_type: selectedHistory.value,
      start_date: dateToEpoch(startDateFilter.value),
      end_date: dateToEpoch(endDateFilter.value),
      search: searchQuery.value,
      lokasi_stok_uuid: selectedLocationNew.join(""),
      payment_method: selectedPaymentNew.join(""),
      page: TransactionHistoryProperties.value.page,
      limit: TransactionHistoryProperties.value.page_size
    });

    if (response && response.payload) {
      TransactionHistoryProperties.value.total = response.properties.total;
      if (selectMedicine.value === "obat") {
        TransactionHistoryObatPayload.value = response.payload;
      } else {
        TransactionHistoryAlkesPayload.value = response.payload;
      }
    } else {
      TransactionHistoryObatPayload.value = [];
      TransactionHistoryAlkesPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    TransactionHistoryObatPayload.value = [];
    TransactionHistoryAlkesPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Filter Riwayat
const selectedHistory = ref<string>("resep");
const onSelectHistory = (label: string) => {
  selectedHistory.value = label;
  fetchTransactionHistory();
};

// Filter Obat
const selectMedicine = ref<string>("obat");
const onSelectMedicine = (label: string) => {
  selectMedicine.value = label;
  fetchTransactionHistory();
};

// Filter Lokasi
const selectedLocation = ref<string[]>([]);
const selectLocation = (label: string) => {
  if (selectedLocation.value.includes(label)) {    
    selectedLocation.value = selectedLocation.value.filter(
      (item) => item != label
    );
  } else {
    selectedLocation.value.push(label);
  }
  fetchTransactionHistory();
};

// Filter Pembayaran
const selectedPayment = ref<string[]>([]);
const onSelectPayment = (label: string) => {
  if (selectedPayment.value.includes(label)) {    
    selectedPayment.value = selectedPayment.value.filter(
      (item) => item != label
    );
  } else {
    selectedPayment.value.push(label);
  }
  fetchTransactionHistory();
};

// Filter Search Data
const searchData = () => {
  searchQuery.value;
  dateToEpoch(startDateFilter.value);
  dateToEpoch(endDateFilter.value);
  fetchTransactionHistory();
};

// Filter Reset Data
const resetData = () => {
  searchQuery.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  fetchTransactionHistory();
};

// State Management Stock Location
const StockLocationStore = useStockLocationStore();
const StockLocationPayload = ref<any[]>([]);

// Fetch Stock Location
const fetchStockLocation = async () => {
  try {
    const response = await StockLocationStore.getApi();

    if (response && response.payload) {
      StockLocationPayload.value = response.payload;
    } else {
      StockLocationPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockLocationPayload.value = [];
  }
};

// Handle Pagination
const handlePage = (event: any) => {
  TransactionHistoryProperties.value.page = event.page + 1;
  TransactionHistoryProperties.value.page_size = event.rows;
  fetchTransactionHistory();
};

// Selected Row Obat
const metaKeyObat = ref(true);
const selectedDataObat = ref();
const DrugHistory = ref(false);
const refDialogDetailObat = ref<InstanceType<typeof DialogDetailObat> | null>(null);

const onRowSelectObat = (event: any) => {
  selectedDataObat.value = event.data;
  DrugHistory.value = true;
  refDialogDetailObat.value?.fetchTransactionHistoryDetail(selectedDataObat.value.uuid);   
};

// Selected Row Alkes
const metaKeyAlkes = ref(true);
const selectedDataAlkes = ref();
const medicalEquipmentHistory = ref(false);
const refDialogDetailAlkes = ref<InstanceType<typeof DialogDetailAlkes> | null>(null);

const onRowSelectAlkes = (event: any) => {
  selectedDataAlkes.value = event.data;
  medicalEquipmentHistory.value = true;
  refDialogDetailAlkes.value?.fetchTransactionHistoryDetail(selectedDataAlkes.value.uuid);
};

onMounted(() => {
  fetchTransactionHistory();
  fetchStockLocation();
});
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
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchTransactionHistory" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Riwayat Transaksi',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari No. Resep / No. RM / Nama Pasien"
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
                @click="searchData"
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                @click="resetData"
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
            </div>
            
            <!-- Filter Riwayat -->
            <div class="grid grid-cols-3 mt-[15px]">
              <CustomButton
                @click="onSelectHistory('resep')"
                label="RIWAYAT RESEP"
                :outlined="selectedHistory != 'resep'"
                borderColor="border-adameds-300"
                :textColor="selectedHistory != 'resep' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectedHistory != 'resep' ? 'bg-transparent' : 'bg-adameds-300'"
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectHistory('retur')"
                label="RIWAYAT RETUR"
                :outlined="selectedHistory != 'retur'"
                borderColor="border-adameds-300"
                :textColor="selectedHistory != 'retur' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectedHistory != 'retur' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold"
              />
              <CustomButton
                @click="onSelectHistory('batal')"
                label="RIWAYAT PEMBATALAN"
                :outlined="selectedHistory != 'batal'"
                borderColor="border-adameds-300"
                :textColor="selectedHistory != 'batal' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectedHistory != 'batal' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold"
              />
            </div>

            <!-- Filter Obat -->
            <div class="grid grid-cols-2 mt-[15px]">
              <CustomButton
                @click="onSelectMedicine('obat')"
                label="OBAT"
                :outlined="selectMedicine != 'obat'"
                borderColor="border-adameds-300"
                :textColor="selectMedicine != 'obat' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectMedicine != 'obat' ? 'bg-transparent' : 'bg-adameds-300'"
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectMedicine('alkes')"
                label="MATERIAL"
                :outlined="selectMedicine != 'alkes'"
                borderColor="border-adameds-300"
                :textColor="selectMedicine != 'alkes' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectMedicine != 'alkes' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold"
              />
            </div>

            <!-- Filter Lokasi -->
            <div class="flex mt-[15px]">
              <div class="w-[10%] font-semibold text-SM text-grey-300">
                Filter Lokasi
              </div>
              <div class="flex">
                <span class="text-grey-300">|</span>
                <CustomChip
                  v-for="(item, index) in StockLocationPayload"
                  :key="item + index"
                  :label="item.name"
                  :value="item.uuid"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-6 w-100"
                  class="ml-[10px]"
                  :isSelected="selectedLocation.includes(item.uuid)"
                  @selected="selectLocation"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
              </div>
            </div>

            <!-- Filter Pembayaran -->
            <div class="flex mt-[15px]">
              <div class="w-[10%] font-semibold text-SM text-grey-300">
                Filter Pembayaran
              </div>
              <div class="flex">
                <span class="text-grey-300">|</span>
                <CustomChip
                  label="TUNAI"
                  value="1"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-50"
                  iconColor="text-adameds-300"
                  textColor="text-adameds-300"
                  customClass="h-7"
                  class="ml-[10px]"
                  :isSelected="selectedPayment.includes('1')"
                  @selected="onSelectPayment"
                  selectedColor="bg-adameds-300 border-adameds-300"
                />
                <CustomChip
                  label="ASURANSI"
                  value="2"
                  borderColor="border-warning-300"
                  bgColor="bg-warning-50"
                  iconColor="text-warning-300"
                  textColor="text-warning-300"
                  customClass="h-7"
                  class="ml-[10px]"
                  :isSelected="selectedPayment.includes('2')"
                  @selected="onSelectPayment"
                  selectedColor="bg-warning-300 border-warning-300"
                />
              </div>
            </div>
            <hr class="mt-[15px] border-[1px] border-grey-200" />
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
        <!-- Datatable Obat -->
        <NoData v-if="!hasDataObat" v-show="selectMedicine === 'obat'"/>
        <DataTable
          v-else
          v-show="selectMedicine === 'obat'"
          :value="TransactionHistoryObatPayload"
          v-model:selection="selectedDataObat"
          :metaKeySelection="metaKeyObat"
          @rowClick="onRowSelectObat"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
          :dt="{
            rowSelectedColor: '#000000',
            rowSelectedBackground: 'transparent',
            bodyCellSelectedBorderColor: 'transparent',
            bodyCellBorderColor: 'transparent',
            rowStripedBackground: '#F8F8F8',
          }"
        >
          <!-- Resep -->
          <Column header="Resep" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p>{{ slotProps.data.code }}</p>
                <p class="mt-[3px]">{{ epochToDate(slotProps.data.date, "dateTime") }}</p>
              </div>
            </template>
          </Column>

          <!-- Pasien -->
          <Column header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p class="font-semibold">{{ slotProps.data.name }}</p>
              </div>
              <div class="flex flex-wrap mt-[3px]">
                <CustomChip
                  :label="slotProps.data.noRm"
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
          <Column header="Keperawatan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div>
                <p class="text-SM">{{ slotProps.data.jenisPelayanan }}</p>
              </div>
              <div class="flex">
                <div class="mt-[3px]">
                  <CustomChip
                    :label="slotProps.data.lokasiStok"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px] mt-[3px]">
                  <CustomChip
                    label="Obat"
                    :showCheckedIcon="false"
                    borderColor="border-lavender-300"
                    bgColor="bg-lavender-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px] mt-[3px]">
                  <CustomChip
                    v-if="slotProps.data.paymentMethod == 'Tunai'"
                    label="TUNAI"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                  <CustomChip
                    v-else
                    label="BPJS"
                    :showCheckedIcon="false"
                    borderColor="border-warning-300"
                    bgColor="bg-warning-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px] mt-[3px]">
                  <CustomChip
                    v-if="slotProps.data.racikan == true"
                    label="MENGANDUNG RACIKAN"
                    :showCheckedIcon="false"
                    borderColor="border-danger-300"
                    bgColor="bg-danger-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                  <CustomChip
                    v-if="slotProps.data.kronis == true"
                    label="KRONIS"
                    :showCheckedIcon="false"
                    borderColor="border-sunFlower-300"
                    bgColor="bg-sunFlower-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
              </div>
            </template>
          </Column>
          
          <!-- Status -->
          <Column header="Status" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.status == 'Lunas' ? 'Lunas' : 'Piutang'"
                  :bgColor="slotProps.data.status == 'Lunas' ? 'bg-success-300' : 'bg-danger-75'"
                  :textColor="slotProps.data.status == 'Lunas' ? 'text-white' : 'text-danger-300'"
                  customClass="h-6 pr-[6px] border-none"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <!-- Datatable Alkes -->
        <NoData v-if="!hasDataAlkes" v-show="selectMedicine === 'alkes'" />
        <DataTable
          v-else
          v-show="selectMedicine === 'alkes'"
          :value="TransactionHistoryAlkesPayload"
          v-model:selection="selectedDataAlkes"
          :metaKeySelection="metaKeyAlkes"
          @rowClick="onRowSelectAlkes"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
          :dt="{
            rowSelectedColor: '#000000',
            rowSelectedBackground: 'transparent',
            bodyCellSelectedBorderColor: 'transparent',
            bodyCellBorderColor: 'transparent',
            rowStripedBackground: '#F8F8F8',
          }"
        >
          <!-- Resep -->
          <Column header="Resep" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p>{{ slotProps.data.code }}</p>
                <p class="mt-[3px]">{{ epochToDate(slotProps.data.date, "dateTime") }}</p>
              </div>
            </template>
          </Column>

          <!-- Pasien -->
          <Column header="Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p class="font-semibold">{{ slotProps.data.name }}</p>
              </div>
              <div class="flex flex-wrap mt-[3px]">
                <CustomChip
                  :label="slotProps.data.noRM"
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
          <Column header="Keperawatan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div>
                <p class="text-SM">{{ slotProps.data.jenisPelayanan }}</p>
              </div>
              <div class="flex">
                <div class="mt-[3px]">
                  <CustomChip
                    :label="slotProps.data.lokasiStok"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px] mt-[3px]">
                  <CustomChip
                    label="Alkes"
                    :showCheckedIcon="false"
                    borderColor="border-lavender-300"
                    bgColor="bg-lavender-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px] mt-[3px]">
                  <CustomChip
                    v-if="slotProps.data.paymentMethod == 'Tunai'"
                    label="TUNAI"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                  <CustomChip
                    v-else
                    label="BPJS"
                    :showCheckedIcon="false"
                    borderColor="border-warning-300"
                    bgColor="bg-warning-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
                <div class="ml-[5px] mt-[3px]">
                  <CustomChip
                    v-if="slotProps.data.racikan == true"
                    label="MENGANDUNG RACIKAN"
                    :showCheckedIcon="false"
                    borderColor="border-danger-300"
                    bgColor="bg-danger-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                  <CustomChip
                    v-if="slotProps.data.kronis == true"
                    label="KRONIS"
                    :showCheckedIcon="false"
                    borderColor="border-sunFlower-300"
                    bgColor="bg-sunFlower-300"
                    textColor="text-white"
                    customClass="h-6"
                  />
                </div>
              </div>
            </template>
          </Column>
          <!-- Status -->
          <Column header="Status" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="">
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.status == 'Lunas' ? 'Lunas' : 'Piutang'"
                  :bgColor="slotProps.data.status == 'Lunas' ? 'bg-success-300' : 'bg-danger-75'"
                  :textColor="slotProps.data.status == 'Lunas' ? 'text-white' : 'text-danger-300'"
                  customClass="h-6 pr-[6px] border-none"
                />
              </div>
            </template>
          </Column>
        </DataTable>

        <DialogDetailObat
          v-model:isDialogVisible="DrugHistory"
          :payloadObat="selectedDataObat"
          :filterItem="selectMedicine"
          :filterStatus="selectedHistory"
          ref="refDialogDetailObat"
        />
        
        <DialogDetailAlkes
          v-model:isDialogVisible="medicalEquipmentHistory"
          :payloadAlkes="selectedDataAlkes"
          :filterItem="selectMedicine"
          :filterStatus="selectedHistory"
          ref="refDialogDetailAlkes"
        />
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="TransactionHistoryProperties.page_size"
            :totalRecords="TransactionHistoryProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
