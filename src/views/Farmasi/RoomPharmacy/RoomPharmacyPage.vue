<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoomPharmacyStore } from "@/stores/farmasi/RoomPharmacy";
import { utilsStore } from "@/stores/utils";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { epochToDate, dateToEpoch } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import NoData from "@/components/section/NoData.vue";
import DetailRoomPharmacyPage from "./DetailRoomPharmacyPage.vue";
import DetailRoomPharmacyPage2 from "./DetailRoomPharmacyPage2.vue";
import DetailRoomPharmacyPage3 from "./DetailRoomPharmacyPage3.vue";

const startDate = ref<Date>(new Date());
const endDate = ref<Date>(new Date());
const stockLocation = ref<string>("");
const searchQuery = ref<string>("");
const UseUtilsStore = utilsStore();

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

interface RoomPharmacyResponse {
  uuid: string;
  noOrderAlkes: string;
  orderStatus: number;
  createdAt: number;
  petugasOrder: string;
  noReg: string;
  noRm: string;
  jenisPelayanan: string;
  paymentMethod: string;
  patient: string;
  lokasiStok: { name: string };
}

interface ApiResponse {
  orderMasuk: RoomPharmacyResponse[];
  sedangDisiapkan: RoomPharmacyResponse[];
  penyerahanAlkes: RoomPharmacyResponse[];
}

const RoomPharmacyPayload = ref<ApiResponse>({
  orderMasuk: [],
  sedangDisiapkan: [],
  penyerahanAlkes: [],
});

// State Management Room Pharmacy
const RoomPharmacyStoreStore = useRoomPharmacyStore();
const RoomPharmacyIncomingDetail = ref<any>({});
const RoomPharmacyReadyDetail = ref<any>({});
const RoomPharmacyHandoverDetail = ref<any>({});

// Fetch Room Pharmacy
const fetchRoomPharmacy = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await RoomPharmacyStoreStore.getApi({
      startDate: dateToEpoch(startDate.value),
      endDate: dateToEpoch(endDate.value),
      search: searchQuery.value,
      lokasiStokUuid: stockLocation.value,
    });

    if (response && response.payload) {
      RoomPharmacyPayload.value = response.payload;
    } else {
      RoomPharmacyPayload.value = {
        orderMasuk: [],
        sedangDisiapkan: [],
        penyerahanAlkes: [],
      };
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    RoomPharmacyPayload.value = {
      orderMasuk: [],
      sedangDisiapkan: [],
      penyerahanAlkes: [],
    };
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const IncomingDetail = async (uuid: string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await RoomPharmacyStoreStore.detailApi(uuid);
    if (response && response.payload) {
      RoomPharmacyIncomingDetail.value = response.payload;
      RoomPharmacyIncomingDetail.value.alkesItems.forEach((element: any) => {
        element.listAlkes = [{
        stokAlkes: "",
        sisaStok: 0,
        hargaSatuan: 0,
        total: 0,
      }]
      });      
    } else {
      RoomPharmacyIncomingDetail.value = {};
    }    
  } catch (error) {
    console.error("Failed to fetch data", error);
    RoomPharmacyIncomingDetail.value = {};
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Incoming
const incoming = ref(true);
const incomingDetail = ref(false);

const incomingOpen = async (uuid: string) => {
  readyMedicine.value = false;
  drugHandover.value = false;
  await IncomingDetail(uuid);
  incomingDetail.value = true;
};

const incomingClose = () => {
  readyMedicine.value = true;
  drugHandover.value = true;
  incomingDetail.value = false;
};

const ReadyDetail = async (uuid: string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await RoomPharmacyStoreStore.detailApi(uuid);
    if (response && response.payload) {
      RoomPharmacyReadyDetail.value = response.payload;     
    } else {
      RoomPharmacyReadyDetail.value = {};
    }    
  } catch (error) {
    console.error("Failed to fetch data", error);
    RoomPharmacyReadyDetail.value = {};
  } finally {
    UseUtilsStore.setLoading(false);
  }  
};

// Ready Medicine
const readyMedicine = ref(true);
const readyMedicineDetails = ref(false);

const readyMedicineOpen = async (uuid: string) => {
  incoming.value = false;
  drugHandover.value = false;
  await ReadyDetail(uuid);
  readyMedicineDetails.value = true;
};

const readyMedicineClose = () => {
  incoming.value = true;
  drugHandover.value = true;
  readyMedicineDetails.value = false;
};

const HandoverDetail = async (uuid: string) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await RoomPharmacyStoreStore.detailApi(uuid);
    if (response && response.payload) {
      RoomPharmacyHandoverDetail.value = response.payload;     
    } else {
      RoomPharmacyHandoverDetail.value = {};
    }    
  } catch (error) {
    console.error("Failed to fetch data", error);
    RoomPharmacyHandoverDetail.value = {};
  } finally {
    UseUtilsStore.setLoading(false);
  }  
};

// Drug Handover
const drugHandover = ref(true);
const drugHandoverDetails = ref(false);

const drugHandoverOpen = async (uuid: string) => {
  incoming.value = false;
  readyMedicine.value = false;
  await HandoverDetail(uuid);
  drugHandoverDetails.value = true;
};

const drugHandoverClose = () => {
  incoming.value = true;
  readyMedicine.value = true;
  drugHandoverDetails.value = false;
};

// Filter Search Data
const searchData = () => {
  dateToEpoch(startDate.value),
  dateToEpoch(endDate.value),
  searchQuery.value,
  stockLocation.value,
  fetchRoomPharmacy();
};

// Filter Reset Data
const resetData = () => {
  startDate.value = new Date();
  endDate.value = new Date();
  searchQuery.value = "";
  stockLocation.value = "";
  fetchRoomPharmacy();
};

// funcNextPage1
const funcNextPage1 = (uuid: string) => {  
  incomingDetail.value = false;
  readyMedicineOpen(uuid);
  incoming.value = false;
  readyMedicine.value = true;
  drugHandover.value = false;
};

// funcNextPage2
const funcNextPage2 = (uuid: string) => {  
  readyMedicineDetails.value = false;
  drugHandoverOpen(uuid);
  incoming.value = false;
  readyMedicine.value = false;
  drugHandover.value = true;
};

// funcPrevious
const funcPrevious = (uuid: string) => {  
  drugHandoverDetails.value = false;
  readyMedicineOpen(uuid);
  incoming.value = false;
  readyMedicine.value = true;
  drugHandover.value = false;
};

onMounted(() => {
  fetchRoomPharmacy();
  fetchStockLocation();
});
</script>

<template>
  <div>
    <Card pt:body:class="h-full pt-0" pt:content:class="h-full" class="h-full overflow-hidden overflow-y-auto">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton
                  icon="PhArrowClockwise"
                  class="mr-5"
                  @click="fetchRoomPharmacy"
                />
                <CustomBreadCrumb
                  :home="{
                    label: 'Farmasi Ruangan',
                    home: true,
                  }"
                />
              </div>
              <div class="flex mr-[20px]">
                <CustomDatePicker
                  v-model="startDate"
                  @update:model-value="fetchRoomPharmacy"
                  :showLabel="false"
                  class="w-[150px]"
                />
                <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
                <CustomDatePicker
                  v-model="endDate"
                  @update:model-value="fetchRoomPharmacy"
                  :showLabel="false"
                  class="w-[150px]"
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
                class="w-[70%] mr-5"
              />
              <CustomSelect
                v-model="stockLocation"
                place-holder="Pilih Lokasi"
                label="Lokasi"
                class="mr-5 w-[30%]"
                optionLabel="name"
                optionValue="uuid"
                :options="StockLocationPayload"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                class="mt-auto"
                @click="searchData"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto ml-[10px]"
                @click="resetData"
              />
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
        <div class="grid grid-cols-3 gap-3">
          <!-- Order Masuk -->
          <div v-show="incoming">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md flex justify-between">
              <div class="text-lg font-bold text-white font-poppins">Order Masuk</div>
              <div class="w-[40px] bg-white rounded-lg">
                <div class="flex items-center justify-center font-bold text-adameds-300 text-MD font-poppins mt-[3px]">
                  {{ RoomPharmacyPayload.orderMasuk.length }}
                </div>
              </div>
            </div>
            <div class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
              <div v-if="RoomPharmacyPayload.orderMasuk.length"
                v-for="itemIncoming in RoomPharmacyPayload.orderMasuk"
                :key="itemIncoming.uuid"
                @click="incomingOpen(itemIncoming.uuid)"
              >
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">{{ itemIncoming.noRm }}</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">{{ itemIncoming.petugasOrder }}</div>
                    <div>
                      <CustomChip
                        label="MAWAR 1"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">{{ itemIncoming.noOrderAlkes }}</div>
                    <div class="text-sm font-bold mt-[5px]">{{ itemIncoming.noReg }}</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">{{ epochToDate(itemIncoming.createdAt, "date") }}</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200" />
              </div>
              <NoData v-else />
            </div>
          </div>

          <!-- Sedang Disiapkan -->
          <div v-show="readyMedicine">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md flex justify-between">
              <div class="text-lg font-bold text-white font-poppins">Sedang Disiapkan</div>
              <div class="w-[40px] bg-white rounded-lg">
                <div class="flex items-center justify-center font-bold text-adameds-300 text-MD font-poppins mt-[3px]">
                  {{ RoomPharmacyPayload.sedangDisiapkan.length }}
                </div>
              </div>
            </div>
            <div class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
              <div v-if="RoomPharmacyPayload.sedangDisiapkan.length"
                v-for="itemPrepared in RoomPharmacyPayload.sedangDisiapkan"
                :key="itemPrepared.uuid"
                @click="readyMedicineOpen(itemPrepared.uuid)"
              >
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">{{ itemPrepared.noRm }}</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">{{ itemPrepared.petugasOrder }}</div>
                    <div>
                      <CustomChip
                        label="MAWAR 1"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">{{ itemPrepared.noOrderAlkes }}</div>
                    <div class="text-sm font-bold mt-[5px]">{{ itemPrepared.noReg }}</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">{{ epochToDate(itemPrepared.createdAt, "date") }}</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200" />
              </div>
              <NoData v-else />
            </div>
          </div>

          <!-- Penyerahan Alkes -->
          <div v-show="drugHandover">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md flex justify-between">
              <div class="text-lg font-bold text-white font-poppins">Penyerahan Alkes</div>
              <div class="w-[40px] bg-white rounded-lg">
                <div class="flex items-center justify-center font-bold text-adameds-300 text-MD font-poppins mt-[3px]">
                  {{ RoomPharmacyPayload.penyerahanAlkes.length }}
                </div>
              </div>
            </div>
            <div class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
              <div v-if="RoomPharmacyPayload.penyerahanAlkes.length"
                v-for="itemHandover in RoomPharmacyPayload.penyerahanAlkes"
                :key="itemHandover.uuid"
                @click="drugHandoverOpen(itemHandover.uuid)"
              >
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">{{ itemHandover.noRm }}</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">{{ itemHandover.petugasOrder }}</div>
                    <div>
                      <CustomChip
                        label="MAWAR 1"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">{{ itemHandover.noOrderAlkes }}</div>
                    <div class="text-sm font-bold mt-[5px]">{{ itemHandover.noReg }}</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">{{ epochToDate(itemHandover.createdAt, "date") }}</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200" />
              </div>
              <NoData v-else />
            </div>
          </div>

          <!-- Detail Order Masuk -->
          <DetailRoomPharmacyPage 
            v-if="incomingDetail" 
            :payloadDetail="RoomPharmacyIncomingDetail" 
            @close="incomingClose"
            @nextPage1="funcNextPage1"  
          />
          <!-- Detail Sedang Disiapkan -->
          <DetailRoomPharmacyPage2 
            v-if="readyMedicineDetails" 
            :payloadDetail2="RoomPharmacyReadyDetail" 
            @close="readyMedicineClose(), fetchRoomPharmacy()"
            @nextPage2="funcNextPage2"
            />
          <!-- Detail Penyerahan Alkes -->
          <DetailRoomPharmacyPage3 
            v-if="drugHandoverDetails" 
            :payloadDetail3="RoomPharmacyHandoverDetail" 
            @close="drugHandoverClose(), fetchRoomPharmacy()"
            @previous="funcPrevious"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
