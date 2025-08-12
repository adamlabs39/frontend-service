<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import HeaderFilter from "../../Layout/KonfigurasiLayarHeader.vue";
import { onMounted, ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import type { MenuItem } from "primevue/menuitem";
import AntrianFooter from "../../Layout/AntrianFooter.vue";
import TambahDataKonfigurasiLayar from "./SectionTambahKonfigurasiLayar.vue";
import NoData from "@/components/section/NoData.vue";
import { useConfigLayarAntrianStore } from "@/stores/antrian/configLayarAntrian";
import { utilsStore } from "@/stores/utils";
import EditDataKonfigurasiLayar from "./SectionEditKonfigurasiLayar.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const pageType = ref("");
const route = useRoute();

const configLayarAntrianStore = useConfigLayarAntrianStore();
const useUtilsStore = utilsStore();

const jadwalAntrianPayload = ref<any[]>();
const originalJadwalAntrianPayload = ref<any[]>(); // Store original data
const jadwalLayarAntrianProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Search and filter states
const searchQuery = ref("");
const selectedTipeLayar = ref(null);
const selectedStatus = ref<string[]>([]);

const fetchJadwalAntrian = async () => {
  useUtilsStore.setLoading(true);
  try {
    const response = await configLayarAntrianStore.getApi(
      jadwalLayarAntrianProperties.value.page,
      jadwalLayarAntrianProperties.value.page_size
    );
    console.log("Respon layar antrian get:", response.payload);
    if (response && response.payload) {
      originalJadwalAntrianPayload.value = response.payload;
      applyFilters(); // Apply current filters
      jadwalLayarAntrianProperties.value.total =
        response.properties?.total || response.payload.length;
    }
  } catch (error) {
    console.log(error);
  } finally {
    useUtilsStore.setLoading(false);
  }
};

// Get unique tipe layar from database
const availableTipeLayar = computed(() => {
  if (!originalJadwalAntrianPayload.value) return [];

  const uniqueTipeLayar = [
    ...new Set(
      originalJadwalAntrianPayload.value.map((item) => item.tipeLayar)
    ),
  ];

  return itemsLayar.value.filter((layar) =>
    uniqueTipeLayar.includes(parseInt(layar.code))
  );
});

// Apply search and filters
const applyFilters = () => {
  if (!originalJadwalAntrianPayload.value) return;

  let filteredData = [...originalJadwalAntrianPayload.value];

  // Apply search filter
  if (searchQuery.value.trim()) {
    filteredData = filteredData.filter((item) =>
      item.namaLayar?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Apply tipe layar filter
  if (selectedTipeLayar.value) {
    filteredData = filteredData.filter(
      (item) => item.tipeLayar === parseInt(selectedTipeLayar.value)
    );
  }

  // Apply status filter
  if (selectedStatus.value.length > 0) {
    filteredData = filteredData.filter((item) => {
      const status = item.status ? "AKTIF" : "NON-AKTIF";
      return selectedStatus.value.includes(status);
    });
  }

  jadwalAntrianPayload.value = filteredData;
  jadwalLayarAntrianProperties.value.total = filteredData.length;
};

// Handle search from header
const handleSearch = (
  query: string,
  tipeLayar: any,
  statusFilters: string[]
) => {
  searchQuery.value = query;
  selectedTipeLayar.value = tipeLayar;
  selectedStatus.value = statusFilters;
  applyFilters();
};

// Handle reset filters
const handleResetFilters = () => {
  searchQuery.value = "";
  selectedTipeLayar.value = null;
  selectedStatus.value = [];
  applyFilters();
};

// ... existing code ...

const deleteLayarAntrian = async (layarAntrianUuid: string) => {
  useUtilsStore.setLoading(true);
  try {
    const response = await configLayarAntrianStore.deleteLayarAntrian(
      layarAntrianUuid
    );
    fetchJadwalAntrian();
  } catch (error) {
    console.log("Failed to delete layar antrian", error);
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const headerFilterRef = ref<typeof HeaderFilter>();
const resetFilter = () => {
  headerFilterRef.value?.resetFilter();
  handleResetFilters();
};

const handleRowsUpdate = (rows: number) => {
  jadwalLayarAntrianProperties.value.page_size = rows;
  fetchJadwalAntrian();
};

const handlePageUpdate = (page: number) => {
  jadwalLayarAntrianProperties.value.page = page;
  fetchJadwalAntrian();
};

const dataBreadCrumb = ref<MenuItem[]>([]);

const changeSection = (label: string) => {
  if (dataBreadCrumb.value.length) {
    dataBreadCrumb.value[0] = { label: label };
  } else {
    dataBreadCrumb.value.push({ label: label });
  }
};

onMounted(() => {
  fetchJadwalAntrian();
});

const itemsLayar = ref([
  {
    code: "1",
    tipe_layar: "3 x 3 Panggilan",
  },
  {
    code: "2",
    tipe_layar: "3 x 2 Panggilan",
  },
  {
    code: "3",
    tipe_layar: "3 list & 3 Panggilan",
  },
  {
    code: "4",
    tipe_layar: "2 list & 2 Panggilan",
  },
  {
    code: "5",
    tipe_layar: "1 list & 1 Panggilan",
  },
]);

// Fungsi konverter tipe layar
const getTipeLayarDescription = (tipeLayarCode: number): string => {
  const tipeLayar = itemsLayar.value.find(
    (item) => parseInt(item.code) === tipeLayarCode
  );
  return tipeLayar ? tipeLayar.tipe_layar : `Tipe ${tipeLayarCode}`;
};

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
  payload: {},
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah",
    payload: {},
  };
}

function handleEdit(rowData: any) {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit",
    payload: { ...rowData },
  };
}

const handlePage = (event: any) => {
  jadwalLayarAntrianProperties.value.page = event.page + 1;
  jadwalLayarAntrianProperties.value.page_size = event.rows;
  fetchJadwalAntrian();
};

function handleRefresh() {
  dialogData.value.isVisible = false;
  fetchJadwalAntrian();
}

function handleClose() {
  dialogData.value.isVisible = false;
}

const totalItems = computed(() => itemsLayar.value.length);

const selectedPatient = ref([]);
</script>

<template>
  <Card
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full"
    class=""
  >
    <template #header>
      <HeaderFilter
        ref="headerFilterRef"
        :pageType="pageType"
        :availableTipeLayar="availableTipeLayar"
        @search="handleSearch"
        @reset="handleResetFilters"
        @daftar="changeSection('Daftar')"
        @refresh="fetchJadwalAntrian"
      />
    </template>
    <template #content>
      <DataTable
        v-if="jadwalLayarAntrianProperties.total > 0"
        v-model:selection="selectedPatient"
        :value="jadwalAntrianPayload"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column field="No." headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              <div class="text-sm">{{ slotProps.index + 1 }}</div>
            </div>
          </template>
        </Column>
        <Column
          field="Nama Layar"
          header="Nama Layar"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.namaLayar }}</div>
          </template>
        </Column>
        <Column
          field="Tipe Layar"
          header="Tipe Layar"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="text-SM">
              {{ getTipeLayarDescription(slotProps.data.tipeLayar) }}
            </div>
          </template>
        </Column>
        <Column
          field="Isi Konten"
          header="Isi Konten"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div
                v-if="
                  Array.isArray(slotProps.data.lokasi) &&
                  slotProps.data.lokasi.length > 0
                "
                class=""
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.lokasi"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten.name"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
              <div v-else class="flex justify-center items-center">
                <PhMinus :size="18" weight="bold" />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="flash-text"
          header="Flash Text"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap">
              <div
                v-if="
                  Array.isArray(slotProps.data.flashText) &&
                  slotProps.data.flashText.length > 0
                "
              >
                <CustomChip
                  v-for="(konten, index) in slotProps.data.flashText"
                  :key="index"
                  :showCheckedIcon="false"
                  :label="konten"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 border-none mr-[5px]"
                />
              </div>
              <div v-else class="flex justify-center items-center">
                <PhMinus :size="18" weight="bold" />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          headerClass="bg-adameds-50 items-center justify-center"
        >
          <template #header>
            <div class="w-full font-semibold text-center">Status</div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
                :textColor="
                  slotProps.data.status ? 'text-white' : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
                :borderColor="
                  slotProps.data.status ? 'border-none' : 'border-[#80868d]'
                "
                :icon-color="slotProps.data.status ? 'white' : '#80868d'"
                customClass="text-xs font-semibold h-6 flex"
              />
            </div>
          </template>
        </Column>
        <Column
          field="Action"
          header="Action"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex gap-2.5 justify-center items-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                @click="handleEdit(slotProps.data)"
              >
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                @click="deleteLayarAntrian(slotProps.data.uuid)"
              >
                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <NoData v-else />
      <TambahDataKonfigurasiLayar
        :full-screen="true"
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"
        @refresh="handleRefresh"
      />
      <EditDataKonfigurasiLayar
        :full-screen="true"
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"
        @refresh="handleRefresh"
        :payload="dialogData.payload"
      />
    </template>
    <template #footer>
      <div class="flex justify-between px-5 py-2.5">
        <CustomPaginator
          class="ml-auto"
          :rows="jadwalLayarAntrianProperties.page_size"
          :totalRecords="jadwalLayarAntrianProperties.total"
          :rowsPerPageOptions="[10, 20, 30]"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>

<style></style>
