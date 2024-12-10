<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useDrugSalesStore } from "@/stores/farmasi/DrugSales";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import DetailDrugSalesPage from './Layout/DetailDrugSalesPage.vue'
import DetailDrugSalesPage2 from './Layout/DetailDrugSalesPage2.vue'

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const pageType = ref("");

const filterFarmasi = ref([
  "Semua",
  "Rawat Jalan",
  "Rawat Inap",
  "IGD",
]);

// Filter Menunggu Pembayaran
const selectedPayType = ref<string>("BelumBayar");

const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  // console.log(selectedPayType, 'selectedPayType');
  
};

// Filter Farmasi
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

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

// State Management
const DrugSalesStore = useDrugSalesStore();
const UseUtilsStore = utilsStore();
const DrugSalesPayload = ref<any[]>([]);
const DrugSalesProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");

// Check if Data Exists
const hasData = computed(
  () => DrugSalesPayload.value && DrugSalesPayload.value.length > 0
);

// Fetch Drug Sales
const fetchDrugSales = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await DrugSalesStore.getApi(
      DrugSalesProperties.value.page,
      DrugSalesProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      DrugSalesProperties.value.total = response.properties.total;
      DrugSalesPayload.value = response.payload;
    } else {
      DrugSalesPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    DrugSalesPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchDrugSales();
  }, 500); 
});

// Handle Pagination
const handlePage = (event: any) => {
  DrugSalesProperties.value.page = event.page + 1;
  DrugSalesProperties.value.page_size = event.rows;
  fetchDrugSales();
};

onMounted(() => {
  fetchDrugSales();
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
                    label: 'Penjualan Obat',
                    home: true,
                  }"
                />
              </div>
              <CustomButton
                @click="changeSection('Beli Obat')"
                icon="PhPlus"
                label="Beli"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
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

            <!-- Filter Bayar -->
            <div class="grid grid-cols-3 mt-[15px]">
              <CustomButton
                @click="onSelectPayType('BelumBayar')"
                label="BELUM BAYAR"
                :outlined="selectedPayType != 'BelumBayar'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'BelumBayar' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'BelumBayar' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectPayType('Lunas')"
                label="LUNAS"
                :outlined="selectedPayType != 'Lunas'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Lunas' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Lunas' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="ml-[20px] font-semibold "
              />
              <CustomButton
                @click="onSelectPayType('Dibatalkan')"
                label="DIBATALKAN"
                :outlined="selectedPayType != 'Dibatalkan'"
                borderColor="border-adameds-300"
                :textColor="
                  selectedPayType != 'Dibatalkan' ? 'text-adameds-300' : 'text-white'
                "
                :backgroundColor="
                  selectedPayType != 'Dibatalkan' ? 'bg-transparent' : 'bg-adameds-300'
                "
                class="ml-[20px] font-semibold"
              />
            </div>
            
            <!-- Filter Farmasi -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300">Filter Farmasi</div>
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
      <template #content>
        <NoData v-if="!hasData" />
        <DataTable
          v-else
          :value="DrugSalesPayload"
          tableStyle="min-width: 50rem"
          class="mt-2"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
        >
          <!-- Penjualan -->
          <Column field="penjualan" header="Penjualan" headerClass="bg-adameds-50">
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
          <!-- Pembeli -->
          <Column field="pembeli" header="Pembeli" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p class="font-semibold">{{ slotProps.data.name }}</p>
              </div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.layanan"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
              </div>
            </template>
          </Column>
          <!-- Harga -->
          <Column field="harga" header="Harga" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.harga }}</div>
            </template>
          </Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-end">
        </div>
      </template>
    </Card>
    <DetailDrugSalesPage
      v-else-if="dataBreadCrumb[0].label == 'Beli Obat'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="dataBreadCrumb.pop()"
    />
  </div>
</template>
  