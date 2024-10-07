<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Footer from "../Layout/FooterPaginator.vue";
import FormPraktisi from "./FormsPraktisi.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import DialogDelete from "../Layout/DialogDelete.vue";
import NoData from "@/components/section/NoData.vue";

// State Management
const praktisiStore = usePraktisiStore();
const UseUtilsStore = utilsStore();
const praktisiPayload = ref<any[]>([]);
const praktisiProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Search Query
const searchQuery = ref<string>("");

// Fetch praktisi Data from API
const fetchPraktisiData = async () => {
  UseUtilsStore.setLoading(true)
  try {
    const response = await praktisiStore.getApi(
      praktisiProperties.value.page,
      praktisiProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      praktisiProperties.value.total = response.properties.total;
      praktisiPayload.value = response.payload;
    } else {
      praktisiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    praktisiPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false)
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchPraktisiData();
  }, 500); 
});

onMounted(() => {
  fetchPraktisiData();
});

// Handle Pagination
const handlePage = (event: any) => {
  praktisiProperties.value.page = event.page + 1;
  praktisiProperties.value.page_size = event.rows;
  fetchPraktisiData();
};

// Check if Data Exists
const hasData = computed(
  () => praktisiPayload.value && praktisiPayload.value.length > 0
);

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  openDialog("detail", "Detail Data", selectedData.value);
};

// Dialog Management
const isTambahDataDialogVisible = ref(false);
const isDeleteDialogVisible = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahDataDialogVisible.value = true;
};

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isDeleteDialogVisible.value = true;
};

const confirmDelete = async (item: any) => {
  if (item) {
    UseUtilsStore.setLoading(true)
    try {
      await praktisiStore.deleteApi(item.uuid);
      fetchPraktisiData();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      UseUtilsStore.setLoading(false)
      isDeleteDialogVisible.value = false;
    }
  }
};

// Export Excel
const downloadExportExcel = async () => {
  try {
    const response = await praktisiStore.exportApi();
    const rows = response.payload;
    if (!rows || rows.length === 0) {
      console.error("No data available for export");
      return;
    }

    // Prepare Data for Export
    const title = ["DATAMASTER ICD-9 CM"];
    const data = [];

    // Header Row (Kosong untuk baris kedua tanpa border)
    data.push({}); 
    data.push({}); 
    data.push({
      No: "No",
      Kode: "Kode Praktisi",
      Nama: "Nama Praktisi",
      Status: "Status",
    });

    // Data Rows
    for (let i = 0; i < rows.length; i++) {
      data.push({
        No: i + 1,
        Kode: rows[i].code,
        Nama: rows[i].name,
        Status: rows[i].status ? "AKTIF" : "NON-AKTIF",
      });
    }

    // Create Workbook and Worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    // Add Title and Merge Cells
    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

    // Style Title
    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
    };

    // Column Widths
    worksheet["!cols"] = [{ wch: 5 }, { wch: 10 }, { wch: 30 }, { wch: 10 }];

    // Apply Styles to Cells
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:D1");

    // Start formatting from row 3 (index 2 in array)
    for (let row = 2; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: "" };

        // Apply border only to row 3 and beyond (table rows)
        if (row >= 2) {
          worksheet[cellAddress].s = worksheet[cellAddress].s || {};
          worksheet[cellAddress].s.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        }

        // Align header cells (row 3)
        if (row === 2 || col === 0) {
          worksheet[cellAddress].s.alignment = {
            horizontal: "center",
            vertical: "center",
          };
        }

        // Fill header with background color (row 3)
        if (row === 2) {
          worksheet[cellAddress].s.fill = {
            fgColor: { rgb: "9fe2db" },
          };
        }
      }
    }

    // Append Worksheet to Workbook and Save
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datamaster ICD 9 CM");
    XLSX.writeFile(workbook, `Datamaster ICD 9 CM.xlsx`);
  } catch (error) {
    console.error("Error while exporting Excel", error);
  }
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
        page-type="praktisi"
        :value-search="searchQuery"
        @update:valueSearch="searchQuery = $event"
        @tambah-data="openDialog('add', 'Tambah Data')"
      />
    </template>
    <template #content>
      <NoData v-if="!hasData" />
      <DataTable
       v-else
        :value="praktisiPayload"
        v-model:selection="selectedData"
        :metaKeySelection="metaKey"
        @rowClick="onRowSelect"
        selectionMode="single"
        tableStyle="min-width: 50rem"
        class="text-xs"
        stripedRows
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
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="codeBpjs"
          header="kode HFIS (BPJS)"
          headerClass="bg-adameds-50"
        ></Column>
        <Column field="sip" header="SIP" headerClass="bg-adameds-50"></Column>
        <Column field="str" header="STR" headerClass="bg-adameds-50"></Column>
        <Column
          field="detailPegawai.name"
          header="Nama Praktisi"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          header="Tipe Praktisi"
          headerClass="bg-adameds-50"
        >
        <template #body="slotProps">
            <CustomChip
            :label="slotProps.data.detailPegawai.tipe === 1 ? 'DOKTOR' : 'NON-DOKTOR'"
              :showCheckedIcon="false"
              border-color="border-none"
              bg-color="bg-adameds-300"
              customClass="text-xs font-semibold cursor-auto h-5 bg-adameds-300 text-white"
            />
          </template>
        </Column>

        <Column field="status" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Status</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
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
                customClass="text-xs font-semibold h-5 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header="slotProps">
            <div class="w-full font-semibold text-center text-SM">Action</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton
                label=""
                background-color="bg-[#3D84E5] rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="openDialog('edit', 'Edit Data', slotProps.data)"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="deleteDialog('delete', `Praktisi ${slotProps.data}`, slotProps.data)"

              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <!-- Dialog for Tambah Data Dokter -->
      <FormPraktisi
      v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :payload="dialogConfig.data"
        @data-updated="fetchPraktisiData"
      />
      <DialogDelete
        v-model:isDialogVisible="isDeleteDialogVisible"
        :title="dialogConfig.title"
        :itemToDelete="dialogConfig.data"
        @delete="confirmDelete"
      />
    </template>

    <template #footer>
      <Footer
        :rows="praktisiProperties.page_size"
        :totalRecords="praktisiProperties.total"
        @page="handlePage"
        @export="downloadExportExcel"
      />
    </template>
  </Card>
</template>
