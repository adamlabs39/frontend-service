<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { useStockTypeStore } from "@/stores/datamasterFarmasi/StockType";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import AddMedicalItem from "./DialogMedicalItem/AddMedicalItem.vue";
import DeleteMedicalItem from "./DialogMedicalItem/DeleteMedicalItem.vue";

const selectedFilterJenisStok = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterJenisStok.value.includes(label)) {    
    selectedFilterJenisStok.value = selectedFilterJenisStok.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterJenisStok.value.push(label);
  }
  fetchMedicalItem()  
};

// State Management
const MedicalItemStore = useMedicalItemStore();
const UseUtilsStore = utilsStore();
const MedicalItemPayload = ref<any[]>([]);
const MedicalItemProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");

// Check if Data Exists
const hasData = computed(
  () => MedicalItemPayload.value && MedicalItemPayload.value.length > 0
);

// Fetch MedicalItem
const fetchMedicalItem = async () => {
  UseUtilsStore.setLoading(true);  
  try {
    const response = await MedicalItemStore.getApi(
      MedicalItemProperties.value.page,
      MedicalItemProperties.value.page_size,
      searchQuery.value,
      {jenis_stok_uuides: selectedFilterJenisStok.value}
    );
    
    if (response && response.payload) {
      MedicalItemProperties.value.total = response.properties.total;
      MedicalItemPayload.value = response.payload;
    } else {
      MedicalItemPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    MedicalItemPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchMedicalItem();
  }, 500); 
});

// Handle Pagination
const handlePage = (event: any) => {
  MedicalItemProperties.value.page = event.page + 1;
  MedicalItemProperties.value.page_size = event.rows;
  fetchMedicalItem();
};

// Export Excel
const ExportExcel = async () => {
  try {
    const response = await  MedicalItemStore.exportApi();
    const rows = response.payload;
    if (!rows || rows.length === 0) {
      console.error("No data available for export");
      return;
    }

    // Prepare Data for Export
    const title = ["DATAMASTER SATUAN"];
    const data = [];

    // Header Row (Kosong untuk baris kedua tanpa border)
    data.push({});
    data.push({});
    data.push({
      No: "No",
      KodeSatuan: "Kode Satuan",
      NamaSatuan: "Nama Satuan",
      SatuanDosis: "Satuan Dosis",
      Status: "Status",
    });

    // Data Rows
    for (let i = 0; i < rows.length; i++) {
      data.push({
        No: i + 1,
        KodeSatuan: rows[i].code,
        NamaSatuan: rows[i].name,
        SatuanDosis: rows[i].satuan_dosis ? "AKTIF" : "NON-AKTIF",
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

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  openDialog("detail", "Detail Data", selectedData.value);
};

// Dialog Management
const MedicalItemDialog = ref(false);
const DeleteMedicalItemDialog = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  MedicalItemDialog.value = true;
};

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  DeleteMedicalItemDialog.value = true;
};

const confirmDelete = async (item: any) => {
  if (item) {
    UseUtilsStore.setLoading(true);
    try {
      await MedicalItemStore.deleteApi(item.uuid);
      fetchMedicalItem();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      UseUtilsStore.setLoading(false);
      DeleteMedicalItemDialog.value = false;
    }
  }
};

// State Management Stock Type
const StockTypeStore = useStockTypeStore();
const StockTypePayload = ref<any[]>([]);

// Fetch Stock Type
const fetchStockType = async () => {
  try {
    const response = await StockTypeStore.getApi();
    if (response && response.payload) {
      StockTypePayload.value = response.payload;
    } else {
      StockTypePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch", error);
    StockTypePayload.value = [];
  }
};

onMounted(() => {
  fetchMedicalItem();
  fetchStockType();
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
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Datamaster',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Item Medis</p>
                </div>
              </div>
              <CustomButton
                @click="openDialog('add', 'Tambah')"
                icon="PhPlus"
                label="Data"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
                label="Cari Item Medis"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama Item Medis (Obat / Alkes / dll)"
                class=""
              />
            </div>
            <!-- Filter Jenis Stok -->
            <div class="flex mb-[10px] mt-5">
              <div class="w-[15%] font-semibold text-SM text-grey-300">Filter Jenis Stok</div>
                <div class="flex">
                  <span class="font-semibold text-grey-300">|</span>
                  <CustomChip
                    v-for="(items, index) in StockTypePayload"
                    :key="items + index"
                    :label="items.name"
                    :value="items.uuid"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-50"
                    iconColor="text-adameds-300"
                    textColor="text-adameds-300"
                    customClass="h-7"
                    class="ml-[10px]"
                    :isSelected="selectedFilterJenisStok.includes(items.uuid)"
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
          :value="MedicalItemPayload"
          v-model:selection="selectedData"
          :metaKeySelection="metaKey"
          @rowClick="onRowSelect"
          tableStyle="min-width: 50rem"
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
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <!-- Kode Item -->
          <Column field="code" header="Kode Item" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Nama Item Medis (Obat, Alkes, dll) -->
          <Column field="name" header="Nama Item Medis (Obat, Alkes, dll)" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Jenis Item -->
          <Column field="jenisItem" header="Jenis Item" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Jenis Stok -->
          <Column header="Jenis Stok" headerClass="bg-adameds-50 font-semibold text-SM">
            <template #body="slotProps">
              <div class="flex">
                <div v-for="items in slotProps.data.jenisStok" :key="items">
                  <CustomChip
                    :label="items.detailStok.name"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300" 
                    textColor="text-white"
                    customClass="h-6"
                    class="mr-[5px]"
                  />
                </div>
              </div>
            </template>
          </Column>
          <!-- Manufaktur -->
          <Column field="manufacture.name" header="Manufaktur" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <!-- Status -->
          <Column field="status" headerClass="bg-adameds-50">
            <template #header="slotProps">
              <div class="w-full font-semibold text-center text-SM">Status</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomChip
                  :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
                  :textColor="slotProps.data.status ? 'text-white' : 'text-[#80868d]'"
                  :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
                  :borderColor="slotProps.data.status ? 'border-none' : 'border-[#80868d]'"
                  :icon-color="slotProps.data.status ? 'white' : '#80868d'"
                  customClass="text-xs font-semibold h-5 flex"
                />
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header="slotProps">
              <div class="w-full font-semibold text-center text-SM">
                Action
              </div>
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
                  @click="deleteDialog('delete', `${slotProps.data.code} - ${slotProps.data.name}`, slotProps.data)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <AddMedicalItem 
          v-model:isDialogVisible="MedicalItemDialog"
          :title="dialogConfig.title"
          :method="dialogConfig.method"
          :payload="dialogConfig.data"
          :dataJenisStok="StockTypePayload"
          @data-updated="fetchMedicalItem"
        />
        <DeleteMedicalItem 
          v-model:isDialogVisible="DeleteMedicalItemDialog"
          :title="dialogConfig.title"
          :itemToDelete="dialogConfig.data"
          @delete="confirmDelete"
        />
      </template>
      <template #footer>
        <div class="flex justify-between px-5 py-2.5">
          <div class="flex items-center gap-2.5">
            <CustomButton label="Import">
              <img src="@/assets/icons/File Import.svg" alt="" />Import
            </CustomButton>
            <CustomButton label="Eksport">
              <img src="@/assets/icons/File Import.svg" alt="" />Eksport
            </CustomButton>
            <CustomButton label="Eksport" @click="">
              <img src="@/assets/icons/download.svg" alt="" />Download
            </CustomButton>
          </div>
          <CustomPaginator
            :rows="MedicalItemProperties.page_size"
            :totalRecords="MedicalItemProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
