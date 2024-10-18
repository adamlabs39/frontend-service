<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useTarifStore } from "@/stores/datamaster/tarif";
import { useKategoriRuanganStore } from "@/stores/datamaster/kategoriRuangan";
import { usePenjaminStore } from "@/stores/datamaster/penjamin";
import CustomButton from "@/components/Base/CustomButton.vue";
import { utilsStore } from "@/stores/utils";
import FooterPaginator from "../Layout/FooterPaginator.vue";
import TablesRuangan from "./TarifRuangan/TablesRuangan.vue";
import TablesTindakan from "./TarifTindakan/TablesTindakan.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import FormTarifTindakan from "./TarifTindakan/FormTarifTindakan.vue";
import FormTarifRuangan from "./TarifRuangan/FormTarifRuangan.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import NoData from "@/components/section/NoData.vue";

const selectedTab = ref("0");
const tarifStore = useTarifStore();
const kategoriRuanganStore = useKategoriRuanganStore();
const penjaminStore = usePenjaminStore();
const UseUtilsStore = utilsStore();
const tarifPayload = ref<any[]>([]);
const tindakanPayload = ref<any[]>([]);
const ruanganPayload = ref<any[]>([]);
const kategoriRuanganPayload = ref<any[]>([]);
const penjaminPayload = ref<any[]>([]);

const tarifProperties = ref({
  page: 1,
  page_size: 10,
  jenis: "Tindakan",
  total: 0,
});

const handleSelectedTab = (newTab: string) => {
  selectedTab.value = newTab;
  tarifProperties.value.jenis = newTab === "0" ? "Tindakan" : "Ruangan";
  tarifProperties.value.page = 1;
  resetForm()
  fetchTarifData();
};

// Filter
const searchQuery = ref<string>("");
const selectedKategoriRuangan = ref("");
const selectedPenjamin = ref("");

const handleSearchQuery = (searchValue:string) => {
  searchQuery.value = searchValue;
};
const handleSelectedKategoriRuangan = (selectedValue:any) => {
  selectedKategoriRuangan.value = selectedValue;
};
const handleSelectedPenjamin = (selectedValue:any) => {
  selectedPenjamin.value = selectedValue;
};

// Reset filter fields
const handleReset = () => {
  resetForm()
  fetchTarifData(); 
};


const fetchTarifData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    // Set jenis berdasarkan tab yang aktif
    const jenis = tarifProperties.value.jenis;

    // Fetch data dari API berdasarkan jenis
    const response = await tarifStore.getApi(
      tarifProperties.value.page,
      tarifProperties.value.page_size,
      searchQuery.value,
      jenis,
      selectedKategoriRuangan.value !== null ? selectedKategoriRuangan.value : '',
      selectedPenjamin.value !== null ? selectedPenjamin.value : ''
    );
    

    if (response && response.payload) {
      tarifProperties.value.total = response.properties.total;

      // Simpan payload yang relevan berdasarkan jenis
      if (jenis === "Tindakan") {
        tindakanPayload.value = response.payload;
      } else if (jenis === "Ruangan") {
        ruanganPayload.value = response.payload;
      }

      // Simpan payload penuh jika diperlukan
      tarifPayload.value = response.payload;
    } else {
      // Reset payload jika tidak ada respons
      tarifPayload.value = [];
      tindakanPayload.value = [];
      ruanganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    tarifPayload.value = [];
    tindakanPayload.value = [];
    ruanganPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};


const fetchKategoriRuangan = async () => {
  try {
    const response = await kategoriRuanganStore.getAktifApi();
    if (response && response.payload) {
      kategoriRuanganPayload.value = response.payload;
    } else {
      kategoriRuanganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch fetch kategori ruangan", error);
    kategoriRuanganPayload.value = [];
  }
};

const fetchPenjamin = async () => {
  try {
    const response = await penjaminStore.getAktifApi();
    if (response && response.payload) {
      penjaminPayload.value = response.payload;
    } else {
      penjaminPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch fetch penjamin", error);
    penjaminPayload.value = [];
  }
};

onMounted(() => {
  fetchTarifData();
  fetchKategoriRuangan() 
  fetchPenjamin();
});

// Handle Pagination
const handlePage = (event: any) => {
  tarifProperties.value.page = event.page + 1;
  tarifProperties.value.page_size = event.rows;
  fetchTarifData();
};

// Check if Tindakan Data Exists
const hasTindakanData = computed(() => {
  return (
    Array.isArray(tindakanPayload.value) && tindakanPayload.value.length > 0
  );
});

// Check if Ruangan Data Exists
const hasRuanganData = computed(() => {
  return Array.isArray(ruanganPayload.value) && ruanganPayload.value.length > 0;
});

const isTambahTindakanDialogVisible = ref(false);
const isTambahRuanganDialogVisible = ref(false);
const isDeleteDialogVisible = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const FormTindakanDialog = (
  method: string,
  title: string,
  data: any = null
) => {
  dialogConfig.value = { method, title, data };
  isTambahTindakanDialogVisible.value = true;
};

const FormRUanganDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahRuanganDialogVisible.value = true;
};

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isDeleteDialogVisible.value = true;
};
const resetFormRef = ref();

const resetForm = () => {
  searchQuery.value = ""; 
  selectedKategoriRuangan.value = "";
  selectedPenjamin.value = ""; 
  tarifProperties.value.page = 1;
  resetFormRef.value.resetForm(); // Memanggil fungsi `resetForm` yang diekspos dari child
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <HeaderFilter
        page-type="tarif"
        @update:valueSearch="handleSearchQuery"
        @update:selectedFilter="handleSelectedKategoriRuangan" 
        @update:selectedFilterSecond="handleSelectedPenjamin" 
        @tambah-data="FormTindakanDialog('add', 'Tambah Data')"
        @tarif-ruangan="FormRUanganDialog('add', 'Tambah Data')"
        @selected-tab="handleSelectedTab"
        @reload-data="fetchTarifData()"
        @search="fetchTarifData()"
        @reset="handleReset()"
        :filterSelect="kategoriRuanganPayload"
        :filterSelectSecond="penjaminPayload"
        ref="resetFormRef"
      />
    </template>
    <template #content>
      <div class="h-full">
        <Tabs v-model:value="selectedTab" class="h-full">
          <TabPanels class="h-full">
            <TabPanel value="0" class="h-full ">
              <div v-if="hasTindakanData">
                <TablesTindakan :payload="tindakanPayload" />
              </div>
              <div v-else class="h-full">
                <NoData class="h-full -mx-4" />
              </div>
            </TabPanel>
            <TabPanel value="1" class="h-full">
              <div v-if="hasRuanganData">
                <TablesRuangan :payload="ruanganPayload" />
              </div>
              <div v-else class="h-full">
                <NoData class="h-full -mx-4" />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <FormTarifTindakan
        v-model:isDialogVisible="isTambahTindakanDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :payload="dialogConfig.data"
        @data-updated="fetchTarifData"
      />
      <FormTarifRuangan
        v-model:isDialogVisible="isTambahRuanganDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :payload="dialogConfig.data"
        @data-updated="fetchTarifData"
      />
    </template>
    <template #footer>
      <FooterPaginator
        :rows="tarifProperties.page_size"
        :totalRecords="tarifProperties.total"
        @page="handlePage"
      />
    </template>
  </Card>
</template>
