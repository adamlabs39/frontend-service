<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useDrugSalesStore } from "@/stores/farmasi/DrugSales";
import { utilsStore } from "@/stores/utils";
import { epochToDate, dateToEpoch, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import type { MenuItem } from "primevue/menuitem";
import NoData from "@/components/section/NoData.vue";
import DetailDrugSalesPage from './Layout/DetailDrugSalesPage.vue'
import DetailDrugSalesPage2 from './Layout/DetailDrugSalesPage2.vue'

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const pageType = ref("");

const filterFarmasi = ref([
  { label: "Semua", value: "4" },
  { label: "IGD", value: "2" },
  { label: "Rawat Rajan", value: "1" },
  { label: "Rawat Inap", value: "0" },
]);

// Filter Menunggu Pembayaran
const selectedPayType = ref<string>("belum_lunas");

const onSelectPayType = (label: string) => {
  selectedPayType.value = label;
  fetchDrugSales()
};

// Filter Farmasi
const selectedFilterFarmasi = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterFarmasi.value.includes(label)) {
    
    selectedFilterFarmasi.value = selectedFilterFarmasi.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterFarmasi.value.push(label);
  }
  fetchDrugSales()
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

// Filter Search Data
const searchData = () => {
  searchQuery.value;
  dateToEpoch(startDateFilter.value);
  dateToEpoch(endDateFilter.value);
  fetchDrugSales()
};

// Filter Reset Data
const resetData = () => {
  searchQuery.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  fetchDrugSales()
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
  const selectedTest = [...selectedFilterFarmasi.value];
  try {
    const response = await DrugSalesStore.getApi(
      selectedPayType.value,
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      selectedTest.join(''),
      searchQuery.value,
      DrugSalesProperties.value.page,
      DrugSalesProperties.value.page_size,
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

// Handle Pagination
const handlePage = (event: any) => {
  DrugSalesProperties.value.page = event.page + 1;
  DrugSalesProperties.value.page_size = event.rows;
  fetchDrugSales();
};

// Detail Management
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  changeSection('Detail Obat')
};

const closeDrugsalesPage = () => {
  dataBreadCrumb.value.pop();
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
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchDrugSales" />
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
                placeholder="Cari No. Transaksi / Nama Pembeli"
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

            <!-- Filter Bayar -->
            <div class="grid grid-cols-3 mt-[15px]">
              <CustomButton
                @click="onSelectPayType('belum_lunas')"
                label="BELUM BAYAR"
                :outlined="selectedPayType != 'belum_lunas'"
                borderColor="border-adameds-300"
                :textColor="selectedPayType != 'belum_lunas' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectedPayType != 'belum_lunas' ? 'bg-transparent' : 'bg-adameds-300'"
                class="font-semibold"
              />
              <CustomButton
                @click="onSelectPayType('lunas')"
                label="LUNAS"
                :outlined="selectedPayType != 'lunas'"
                borderColor="border-adameds-300"
                :textColor="selectedPayType != 'lunas' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectedPayType != 'lunas' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold "
              />
              <CustomButton
                @click="onSelectPayType('cancel')"
                label="DIBATALKAN"
                :outlined="selectedPayType != 'cancel'"
                borderColor="border-adameds-300"
                :textColor="selectedPayType != 'cancel' ? 'text-adameds-300' : 'text-white'"
                :backgroundColor="selectedPayType != 'cancel' ? 'bg-transparent' : 'bg-adameds-300'"
                class="ml-[20px] font-semibold"
              />
            </div>
            
            <!-- Filter Farmasi -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[10%] font-semibold text-SM text-grey-300">Filter Farmasi</div>
                <div class="flex">
                  <span class="font-semibold text-grey-300">|</span>
                  <CustomChip
                    v-for="(Pelayanan, index) in filterFarmasi" :key="index"
                    :label="Pelayanan.label"
                    :value="Pelayanan.value"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-50"
                    iconColor="text-adameds-300"
                    textColor="text-adameds-300"
                    customClass="h-7"
                    class="ml-[10px]"
                    :isSelected="selectedFilterFarmasi.includes(Pelayanan.value)"
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
          :value="DrugSalesPayload"
          v-model:selection="selectedData"
          :metaKeySelection="metaKey"
          @rowClick="onRowSelect"
          stripedRows
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          :dt="{
          rowSelectedColor: '#000000',
          rowSelectedBackground: 'transparent',
          bodyCellSelectedBorderColor: 'transparent',
          bodyCellBorderColor: 'transparent',
          rowStripedBackground: '#F8F8F8',
          }"
        >
          <!-- Penjualan -->
          <Column header="Penjualan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p>{{ slotProps.data.noTransaksi }}</p>
                <p>{{ epochToDate(slotProps.data.tanggalPembelian, "dateTime") }}</p>
              </div>
            </template>
          </Column>
          <!-- Pembeli -->
          <Column header="Pembeli" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <p class="font-semibold">{{ slotProps.data.namaPembeli }}</p>
              </div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.lokasiStok.name"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300" 
                  textColor="text-white"
                  customClass="h-6"
                />
              </div>
            </template>
          </Column>
          <!-- Nama Petugas -->
          <Column header="Nama Petugas" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.dokterPemberiResep }}</div>
            </template>
          </Column>
          <!-- Harga -->
          <Column header="Harga" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ formatPrice(slotProps.data.totalHarga) }}</div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            :rows="DrugSalesProperties.page_size"
            :totalRecords="DrugSalesProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
    <DetailDrugSalesPage
      v-else-if="dataBreadCrumb[0].label == 'Beli Obat'"
      :dataBreadCrumb="dataBreadCrumb"
      :pageType="pageType"
      @back="closeDrugsalesPage"
    />
    <DetailDrugSalesPage2
      v-else-if="dataBreadCrumb[0].label == 'Detail Obat'"
      :dataBreadCrumb="dataBreadCrumb"
      :selectedData="selectedData"
      :pageType="pageType"
      @back="closeDrugsalesPage"
    />
  </div>
</template>
  