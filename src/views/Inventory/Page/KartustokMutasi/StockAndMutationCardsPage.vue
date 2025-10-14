<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useStockAndMutationStore } from "@/stores/inventory/stockAndMutation";
import { useStockTypeStore } from "@/stores/datamasterFarmasi/StockType";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { useDrugCategoryStore } from "@/stores/datamasterFarmasi/DrugCategory";
import { utilsStore } from "@/stores/utils";
import { epochToDate, dateToEpoch } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";

function formatDate(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

// State Management Kategori Item
const kategoriItem = ref<string>("");
const optionKategori = ref([
  { name: "Medis", value: "medis" },
  { name: "Non-Medis", value: "non-medis" },
]);

// State Management Jenis Item
const jenisItem = ref<string>("");
const optionJenis = ref([
  { name: "Obat", value: "obat" },
  { name: "Alkes", value: "alkes" },
]);

const value = ref("1");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

// State Management Drug Category
const DrugCategoryStore = useDrugCategoryStore();
const DrugCategoryPayload = ref<any[]>([]);

// Fetch Drug Category
const fetchDrugCategory = async () => {
  try {
    const response = await DrugCategoryStore.getApi(1,1000);

    if (response && response.payload) {
      DrugCategoryPayload.value = response.payload;
    } else {
      DrugCategoryPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    DrugCategoryPayload.value = [];
  }
};

// State Management Stock Type
const jenisStokUuid = ref<string>("");
const StockTypeStore = useStockTypeStore();
const StockTypePayload = ref<any[]>([]);

// Fetch Stock Type
const fetchStockType = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockTypeStore.getApi(1, 9999);

    if (response && response.payload) {
      StockTypePayload.value = response.payload;
    } else {
      StockTypePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockTypePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
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

// ------------------------------------------------------------------------------------------

// State Management Stok
const searchStok = ref<string>("");
const StockAndMutationStore = useStockAndMutationStore();
const UseUtilsStore = utilsStore();
const StockPayload = ref<any[]>([]);
const StockProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasDataStok = computed(
  () => StockPayload.value && StockPayload.value.length > 0
);

// Fetch Stock
const fetchStock = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockAndMutationStore.getApiStok(
      "0196ccc5-2ccf-7040-bddd-5e84647682a2",
      jenisStokUuid.value,
      kategoriItem.value,
      jenisItem.value,
      searchStok.value,
      StockProperties.value.page,
      StockProperties.value.page_size
    );

    if (response && response.payload) {
      StockProperties.value.total = response.properties.total;
      StockPayload.value = response.payload;
    } else {
      StockPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeoutStok: ReturnType<typeof setTimeout> | null = null;
watch(searchStok, (newValue) => {
  if (searchTimeoutStok) clearTimeout(searchTimeoutStok);
  searchTimeoutStok = setTimeout(() => {
    fetchStock();
  }, 500);
});

// Handle Pagination
const handleStok = (event: any) => {
  StockProperties.value.page = event.page + 1;
  StockProperties.value.page_size = event.rows;
  fetchStock();
};

// Filter Reset Stok
const resetStok = () => {
  jenisStokUuid.value = "";
  kategoriItem.value = "";
  jenisItem.value = "";
  searchStok.value = "";
  fetchStock();
};

// ------------------------------------------------------------------------------------------

// State Management Stok
const searchMutasi = ref<string>("");
const MutasiPayload = ref<any[]>([]);
const MutasiProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasDataMutasi = computed(
  () => MutasiPayload.value && MutasiPayload.value.length > 0
);

// Fetch Mutasi
const fetchMutasi = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockAndMutationStore.getApiMutasi(
      "0196ccc5-2ccf-7040-bddd-5e84647682a2",
      jenisStokUuid.value,
      kategoriItem.value,
      jenisItem.value,
      searchStok.value,
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      MutasiProperties.value.page,
      MutasiProperties.value.page_size
    );

    if (response && response.payload) {
      MutasiProperties.value.total = response.properties.total;
      MutasiPayload.value = response.payload;
    } else {
      MutasiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    MutasiPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeoutMutasi: ReturnType<typeof setTimeout> | null = null;
watch(searchMutasi, (newValue) => {
  if (searchTimeoutMutasi) clearTimeout(searchTimeoutMutasi);
  searchTimeoutMutasi = setTimeout(() => {
    fetchMutasi();
  }, 500);
});

// Handle Pagination
const handleMutasi = (event: any) => {
  MutasiProperties.value.page = event.page + 1;
  MutasiProperties.value.page_size = event.rows;
  fetchMutasi();
};

// Filter Reset Stok
const resetMutasi = () => {
  jenisStokUuid.value = "";
  kategoriItem.value = "";
  jenisItem.value = "";
  searchStok.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  fetchMutasi();
};

// ------------------------------------------------------------------------------------------

onMounted(() => {
  fetchDrugCategory();
  fetchStock();
  fetchMutasi();
  fetchStockType();
  fetchStockLocation();
});
</script>

<template>
  <div>
    <Card v-if="dataBreadCrumb.length == 0" pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5"  @click="fetchStock"/>
                <CustomBreadCrumb
                  :home="{
                    label: 'Kartu Stok & Mutasi',
                    home: true,
                  }"
                />
              </div>
              <div class="flex mr-[10px]">
                <CustomButton
                  label="KARTU STOK"
                  :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
                  :border-color="value === '1' ? 'border-none' : 'border-adameds-300'"
                  :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
                  @click="value = '1'"
                  class="w-[300px] mr-[10px]"
                  :outlined="value !== '1'"
                />
                <CustomButton
                  label="MUTASI"
                  :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
                  :border-color="value === '2' ? 'border-none' : 'border-adameds-300'"
                  :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
                  @click="value = '2'"
                  class="w-[300px]"
                  :outlined="value !== '2'"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div v-show="value === '1'">
              <div class="grid grid-cols-4 gap-4 mt-[10px]">
                <CustomSelect
                  label="Kategori"
                  placeHolder="Pilih Kategori"
                  v-model="kategoriItem"
                  :options="optionKategori"
                  optionLabel="name"
                  optionValue="value"
                />
                <CustomSelect
                  label="Jenis Stok"
                  placeHolder="Pilih Jenis Stok"
                  v-model="jenisStokUuid"
                  :options="StockTypePayload"
                  optionLabel="name"
                  optionValue="uuid"
                />
                <CustomSelect
                  label="Jenis Item"
                  placeHolder="Pilih Jenis Item"
                  v-model="jenisItem"
                  :options="optionJenis"
                  optionLabel="name"
                  optionValue="value"
                />
                <CustomSelect
                  label="Lokasi Stok"
                  placeHolder="Pilih Lokasi"
                  :options="StockLocationPayload"
                  optionLabel="name"
                  optionValue="uuid"
                />
              </div>
              <div class="grid grid-cols-[62%,20%,10%,5%] gap-3 mt-[10px]">
                <CustomTextfield
                  label="Pencarian (Nama Item / Kode Item)"
                  v-model="searchStok"
                  prependIcon="PhMagnifyingGlass"
                  placeholder="Cari Nama Item / Kode Item"
                />
                <CustomSelect
                  label="Kategori Obat"
                  placeHolder="Pilih Kategori Obat"
                  v-model="kategoriItem"
                  :options="DrugCategoryPayload"
                  optionLabel="name"
                  optionValue="name"
                  :disabled="kategoriItem != 'medis'"
                />
                <CustomButton
                  icon="PhMagnifyingGlass"
                  label="Tampilkan"
                  class="mt-auto"
                  @click="fetchStock"
                />
                <CustomButton
                  label="Reset"
                  outlined
                  borderColor="border-adameds-300"
                  textColor="text-adameds-300"
                  class="mt-auto"
                  @click="resetStok"
                />
              </div>
            </div>
            <div v-show="value === '2'">
              <div class="grid grid-cols-4 gap-4 mt-[10px]">
                <CustomSelect
                  label="Kategori"
                  placeHolder="Pilih Kategori"
                  v-model="kategoriItem"
                  :options="optionKategori"
                  optionLabel="name"
                  optionValue="value"
                />
                <CustomSelect
                  label="Jenis Stok"
                  placeHolder="Pilih Jenis Stok"
                  v-model="jenisStokUuid"
                  :options="StockTypePayload"
                  optionLabel="name"
                  optionValue="uuid"
                />
                <CustomSelect
                  label="Jenis Item"
                  placeHolder="Pilih Jenis Item"
                  v-model="jenisItem"
                  :options="optionJenis"
                  optionLabel="name"
                  optionValue="value"
                />
                <CustomSelect
                  label="Lokasi Stok"
                  placeHolder="Pilih Lokasi"
                  :options="optionJenis"
                  optionLabel="name"
                  optionValue="value"
                />
              </div>
              <div class="flex justify-between mt-[10px]">
                <CustomTextfield
                  label="Pencarian (Nama Item / Kode Item)"
                  v-model="searchMutasi"
                  prependIcon="PhMagnifyingGlass"
                  placeholder="Cari Nama Item / Kode Item"
                  class="w-[450px]"
                />
                <CustomSelect
                  label="Kategori Obat"
                  placeHolder="Pilih Kategori Obat"
                  v-model="kategoriItem"
                  :options="DrugCategoryPayload"
                  optionLabel="name"
                  optionValue="name"
                  :disabled="kategoriItem != 'medis'"
                />
                <CustomDatePicker
                  v-model="startDateFilter"
                  label="Tanggal"
                  class="w-[150px]"
                />
                <PhMinus class="mt-auto mb-3 text-black" />
                <CustomDatePicker
                  v-model="endDateFilter"
                  :showLabel="false"
                  class="mt-auto w-[150px]"
                />
                <CustomButton
                  icon="PhMagnifyingGlass"
                  label="Tampilkan"
                  class="mt-auto w-[130px]"
                  @click="fetchMutasi"
                />
                <CustomButton
                  label="Reset"
                  outlined
                  borderColor="border-adameds-300"
                  textColor="text-adameds-300"
                  class="mt-auto"
                  @click="resetMutasi"
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
        <!-- Datatable Kartu Stok -->
        <NoData v-if="!hasDataStok" v-show="value === '1'" />
        <DataTable
          v-else
          v-show="value === '1'"
          :value="StockPayload"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
        >
          <!-- No -->
          <Column headerClass="bg-adameds-50" class="w-[50px]">
            <template #header>
              <div class="font-semibold">No</div>
            </template>
            <template #body="slotProps">
              <div>
                <div class="text-center text-SM">
                  {{ slotProps.index + 1 }}
                </div>
              </div>
            </template>
          </Column>
          <!-- Nama Item -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Nama Item</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.nama }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.kategori.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                />
                <CustomChip
                  :label="slotProps.data.jenisItem.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
                <CustomChip
                  :label="slotProps.data.jenisStok.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
                <CustomChip
                  :label="slotProps.data.kategoriObat.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
              </div>
            </template>
          </Column>
          <!-- Lokasi -->
          <Column field="lokasiStok" header="Lokasi" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Sisa Stok -->
          <Column field="sisaStok" header="Sisa Stok" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Satuan -->
          <Column field="satuanObat" header="Satuan" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
        </DataTable>

        <!-- Datatable Mutasi -->
        <NoData v-if="!hasDataMutasi" v-show="value === '2'" />
        <DataTable
          v-else
          v-show="value === '2'"
          :value="MutasiPayload"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
        >
          <!-- Transaksi -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Transaksi</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px]">{{ slotProps.data.transaksi.code }}</div>
              <CustomChip
                :label="slotProps.data.transaksi.sumberMutasi"
                :showCheckedIcon="false"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-300"
                textColor="text-white"
                class="mb-[5px]"
              />
              <p>{{ epochToDate(slotProps.data.transaksi.tanggal, "date") }}</p>
            </template>
          </Column>
          <!-- Item -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Item</div>
            </template>
            <template #body="slotProps">
              <div class="mb-[5px] font-bold">{{ slotProps.data.item.name }}</div>
              <div class="mb-[5px]">{{ slotProps.data.item.code }}</div>
              <div class="flex flex-wrap">
                <CustomChip
                  :label="slotProps.data.item.kategori"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                />
                <CustomChip
                  :label="slotProps.data.item.jenisStok.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
                <CustomChip
                  :label="slotProps.data.item.jenisItem.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()"
                  :showCheckedIcon="false"
                  borderColor="border-adameds-300"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  class="ml-[5px]"
                />
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
                {{ formatDate(slotProps.data.expDate) }}
              </div>
            </template>
          </Column>
          <!-- Keterangan -->
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">Keterangan</div>
            </template>
            <template #body="slotProps">
              <div class="">
                {{ slotProps.data.keterangan }}
              </div>
            </template>
          </Column>
          <!-- Petugas -->
          <Column field="petugas" header="Petugas" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Stok Awal -->
          <Column field="stokAwal" header="Stok Awal" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Mutasi -->
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Mutasi Stok</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center gap-1">
                <div class="text-center text-SM">
                  {{ slotProps.data.stokMutasi }}
                </div>

                <!-- Conditionally render PhArrowCircleDown or PhArrowCircleUp based on mutasiStok value -->
                <PhArrowCircleDown
                  v-if="slotProps.data.stokMutasi < 0"
                  :size="18"
                  color="#E9594C"
                  weight="fill"
                />
                <PhArrowCircleUp
                  v-else
                  :size="18"
                  color="#3AC279"
                  weight="fill"
                />
              </div>
            </template>
          </Column>
          <!-- Sisa Stok -->
          <Column field="sisaStok" header="Sisa Stok" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomPaginator
            v-show="value === '1'"
            :rows="StockProperties.page_size"
            :totalRecords="StockProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handleStok"
          />
          <CustomPaginator
            v-show="value === '2'"
            :rows="MutasiProperties.page_size"
            :totalRecords="MutasiProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handleMutasi"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
