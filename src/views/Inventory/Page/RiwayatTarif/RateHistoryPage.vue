<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useRateHistoryStore } from "@/stores/inventory/rateHistory";
import { useStockTypeStore } from "@/stores/datamasterFarmasi/StockType";
import { utilsStore } from "@/stores/utils";
import { epochToDate, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import DetailRiwayatTarif from "./DetailRiwayatTarif.vue";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";

const props = defineProps({
  lokasiStokUuid: {
    type: String,
    default: "",
  },
});

// State Management Kategori Item
const kategoriItem = ref<string>("");
const optionKategori = ref([
  { name: "Medis", value: "medis" },
  { name: "Non-Medis", value: "non-medis" },
  { name: "", value:""},
]);

// State Management Jenis Item
const jenisItem = ref<string>("");
const optionJenis = ref([
  { name: "Obat", value: "obat" },
  { name: "Alkes", value: "alkes" },
  { name: "", value: "" },
]);

// State Management Stock Type
const jenisStokUuid = ref<string>("");
const StockTypeStore = useStockTypeStore();
const StockTypePayload = ref<any[]>([]);
const StockLocationStore = useStockLocationStore();
const StockLocationPayload = ref<any[]>([]);
const lokasiStokUuid = ref<string>(""); // Define lokasiStokUuid as a ref

// Fetch Stock Type
const fetchDropdownData = async () => {
  try {
    const [stockTypeRes, stockLocationRes] = await Promise.all([
      StockTypeStore.getApi(1, 9999),
      StockLocationStore.getApi(1, 9999)
    ]);
    StockTypePayload.value = stockTypeRes?.payload || [];
    StockLocationPayload.value = stockLocationRes?.payload || [];
  } catch (error) {
    console.error("Gagal mengambil data dropdown:", error);
  }
};

// Title Label
const pageType = ref("");
const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

// State Management
const searchQuery = ref<string>("");
const RateHistoryStore = useRateHistoryStore();
const UseUtilsStore = utilsStore();
const RateHistoryPayload = ref<any[]>([]);
const RateHistoryProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => RateHistoryPayload.value && RateHistoryPayload.value.length > 0
);

// Fetch
const fetchRateHistory = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await RateHistoryStore.getApi(
      lokasiStokUuid.value|| "",
      jenisStokUuid.value|| "",
      kategoriItem.value|| "",
      jenisItem.value|| "",
      searchQuery.value,
      RateHistoryProperties.value.page,
      RateHistoryProperties.value.page_size
    );
    RateHistoryPayload.value = response?.payload || [];
    RateHistoryProperties.value.total = response?.properties?.total || 0;
  } finally {
    UseUtilsStore.setLoading(false);
  }
};
watch(() => props.lokasiStokUuid, (newVal) => {
  if (newVal !== lokasiStokUuid.value) { // Hanya update jika berbeda
    lokasiStokUuid.value = newVal || ""; // Update filter lokal
    RateHistoryProperties.value.page = 1; // Reset halaman
    fetchRateHistory(); // Fetch data baru
  }
}, { immediate: true });

// let searchTimeout: ReturnType<typeof setTimeout> | null = null;
// watch(searchQuery, (newValue) => {
//   if (searchTimeout) clearTimeout(searchTimeout);
//   searchTimeout = setTimeout(() => {
//     fetchRateHistory();
//   }, 500);
// });

// Handle Pagination
const handlePage = (event: any) => {
  RateHistoryProperties.value.page = event.page + 1;
  RateHistoryProperties.value.page_size = event.rows;
  fetchRateHistory();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();
const isDetailView = ref(false); // Define isDetailView as a ref

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  isDetailView.value = true; // [FIX] Cukup ubah state ini untuk pindah halaman
};

// Filter Reset Data
const resetData = () => {
  lokasiStokUuid.value = props.lokasiStokUuid || "";
  jenisStokUuid.value = "";
  kategoriItem.value = "";
  jenisItem.value = "";
  searchQuery.value = "";
  RateHistoryProperties.value.page = 1; // Reset halaman juga
  fetchRateHistory(); // Fetch ulang setelah reset
};

const closeDetailPage = () => {
  isDetailView.value = false;
  selectedData.value = null;
}

// const closeEditPage = async () => {
//   dataBreadCrumb.value.pop();
//   dataBreadCrumb.value.pop();
//   await fetchRateHistory();
// };

onMounted(() => {
  // fetchRateHistory();
  fetchDropdownData();
});
</script>

<template>
  <div>
    <Card v-if="!isDetailView" pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchRateHistory" />
                <CustomBreadCrumb :home="{
                  label: 'Riwayat Tarif',
                  home: true,
                }" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-4">
              <CustomTextfield label="Pencarian (Nama Item / Kode Item)" v-model="searchQuery"
                prependIcon="PhMagnifyingGlass" placeholder="Cari Nama Item / Kode Item" />
              <CustomSelect label="Kategori" placeHolder="Semua" v-model="kategoriItem" :options="optionKategori"
                optionLabel="name" optionValue="value" />
            </div>
            <div class="grid grid-cols-4 md:grid-cols-2 gap-4">
              <CustomSelect label="Jenis Stok" placeHolder="Semua" v-model="jenisStokUuid" :options="StockTypePayload"
                optionLabel="name" optionValue="uuid" />
              <CustomSelect label="Jenis Item" placeHolder="Semua" v-model="jenisItem" :options="optionJenis"
                optionLabel="name" optionValue="value" />
              <div class="flex items-end col-start-4 gap-2">
                <CustomButton icon="PhMagnifyingGlass" label="Tampilkan" class="w-full" @click="fetchRateHistory" />
                <CustomButton label="Reset" outlined borderColor="border-adameds-300" textColor="text-adameds-300"
                  class="mt-auto" @click="resetData" />
              </div>
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
        <NoData v-if="!hasData" />
        <DataTable v-else :value="RateHistoryPayload" v-model:selection="selectedData" @row-click="onRowSelect" :metaKeySelection="metaKey" tableStyle="min-width: 50rem" stripedRows class="text-xs" scrollable
          scrollHeight="flex" :dt="{
            rowSelectedColor: '#000000',
            rowSelectedBackground: 'transparent',
            bodyCellSelectedBorderColor: 'transparent',
            bodyCellBorderColor: 'transparent',
            rowStripedBackground: '#F8F8F8',
          }">
          <!-- Nama Item -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Nama Item</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.name }}</div>
              <div class="flex flex-wrap">
                <CustomChip :label="slotProps.data.kategoriItem.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false" borderColor="border-adameds-300" bgColor="bg-adameds-300"
                  textColor="text-white" />
                <CustomChip :label="slotProps.data.jenisStok.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false" borderColor="border-adameds-300" bgColor="bg-adameds-300"
                  textColor="text-white" class="ml-[5px]" />
                <CustomChip :label="slotProps.data.jenisItem.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false" borderColor="border-adameds-300" bgColor="bg-adameds-300"
                  textColor="text-white" class="ml-[5px]" />
              </div>
            </template>
          </Column>
          <!-- Exp. Date -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Exp. Date</div>
            </template>
            <template #body="slotProps">
              <div class="">
                {{ epochToDate(slotProps.data.expDate || '-', "date")}}
              </div>
            </template>
          </Column>
          <!-- Stok -->
          <Column field="stok" header="Stok" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Satuan Jual -->
          <Column field="satuanPembelian" header="Satuan Jual" headerClass="bg-adameds-50 font-semibold text-SM">
          </Column>
          <!-- Harga Dasar -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Harga Dasar</div>
            </template>
            <template #body="slotProps">
              <div class="">{{ slotProps.data.hargaDasar || '-' }}</div>
            </template>
          </Column>
          <!-- HNA -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">HNA</div>
            </template>
            <template #body="slotProps">
              <div class="">{{ slotProps.data.hna || '-' }}</div>
            </template>
          </Column>
          <!-- HJA -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">HJA</div>
            </template>
            <template #body="slotProps">
              <div class="">{{ slotProps.data.hja  || '-' }}</div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator :rows="RateHistoryProperties.page_size" :totalRecords="RateHistoryProperties.total"
            :rowsPerPageOptions="[10, 20, 30]" @page="handlePage" />
        </div>
      </template> 
    </Card>

    <DetailRiwayatTarif 
    v-else 
    :selectedDataUuid="selectedData.uuid" 
    @kembali="closeDetailPage" />
  </div>
</template>
