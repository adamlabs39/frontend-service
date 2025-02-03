<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useCompositionStore } from "@/stores/datamasterFarmasi/Composition";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import AddComposition from "./DialogComposition/AddComposition.vue";
import DeleteComposition from "./DialogComposition/DeleteComposition.vue";

// State Management
const searchQuery = ref<string>("");
const CompositionStore = useCompositionStore();
const UseUtilsStore = utilsStore();
const CompositionPayload = ref<any[]>([]);
const CompositionProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => CompositionPayload.value && CompositionPayload.value.length > 0
);

// Fetch Composition
const fetchComposition = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await CompositionStore.getApi(
      CompositionProperties.value.page,
      CompositionProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      CompositionProperties.value.total = response.properties.total;
      CompositionPayload.value = response.payload;
    } else {
      CompositionPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    CompositionPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchComposition();
  }, 500); 
});

// Handle Pagination
const handlePage = (event: any) => {
  CompositionProperties.value.page = event.page + 1;
  CompositionProperties.value.page_size = event.rows;
  fetchComposition();
};

// Dialog Management
const CompositionDialog = ref(false);
const DeleteCompositionDialog = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  CompositionDialog.value = true;
};

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  DeleteCompositionDialog.value = true;
};

const confirmDelete = async (item: any) => {
  // console.log(item,'item');
  if (item) {
    UseUtilsStore.setLoading(true);
    try {
      await CompositionStore.deleteApi(item.uuid);
      fetchComposition();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      UseUtilsStore.setLoading(false);
      DeleteCompositionDialog.value = false;
    }
  }
};

const onUpload = (event: any) => {
  const uploadedFiles = event.files[0]; // Ambil file yang diunggah
  importExcel(uploadedFiles);
};

// Import Excel
const importExcel = async (file: File) => {
  const dataUpload = new FormData();
  dataUpload.append("files", file);
  try {
    const response = await CompositionStore.importApi(dataUpload);
    fetchComposition();
    console.log("File uploaded successfully:", response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// Export Excel
const ExportExcel = async () => {
  try {
    const response = await CompositionStore.exportApi();
    const rows = response.payload;
    if (!rows || rows.length === 0) {
      console.error("No data available for export");
      return;
    }

    // Prepare Data for Export
    const title = ["DATAMASTER KOMPOSISI"];
    const data = [];

    // Header Row (Kosong untuk baris kedua tanpa border)
    data.push({});
    data.push({});
    data.push({
      No: "No",
      Kode: "Kode Komposisi",
      Nama: "Nama Komposisi",
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
        worksheet[cellAddress].s.alignment = {
          horizontal: "center",
          vertical: "center",
        };

        // Fill header with background color (row 3)
        if (row === 2) {
          worksheet[cellAddress].s.fill = {
            fgColor: { rgb: "9fe2db" },
          };
        }
      }
    }

    // Append Worksheet to Workbook and Save
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datamaster Komposisi");
    XLSX.writeFile(workbook, `Datamaster Komposisi.xlsx`);
  } catch (error) {
    console.error("Error while exporting Excel", error);
  }
};

// Download Excel
const downloadExcel = async () => {
  try {
    // Prepare Data for Export
    const data = [];

    // Header Row
    data.push({
      No: "No",
      Kode: "Kode Komposisi*",
      Nama: "Nama Komposisi*",
    });

    // Add Empty Rows (4 empty rows to match the example)
    data.push({ No: "1", Kode: "KODE-001", Nama: "Nama Komposisi 1" });

    // Create Workbook and Worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    // Column Widths
    const columnWidths = data.reduce((widths: any, row: any) => {
      Object.keys(row).forEach((key, colIdx) => {
        const cellValue = row[key] ? row[key].toString() : "";
        widths[colIdx] = Math.max(widths[colIdx] || 10, cellValue.length + 2);
      });
      return widths;
    }, []);

    worksheet["!cols"] = columnWidths.map((wch: any) => ({ wch }));

    // Apply Styles to Cells
    const range = XLSX.utils.decode_range("A1:C5");

    // Append Worksheet to Workbook and Save
    XLSX.utils.book_append_sheet(workbook, worksheet, "Format Datamaster Komposisi");
    XLSX.writeFile(workbook, `Format Datamaster Komposisi.xlsx`);
  } catch (error) {
    console.error("Error while exporting Excel", error);
  }
};

onMounted(() => {
  fetchComposition();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
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
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Komposisi</p>
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
                label="Cari Komposisi"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama Komposisi"
                class=""
              />
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
        <NoData v-if="!hasData" />
        <DataTable
          v-else
          :value="CompositionPayload"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
        >
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="">No.</div>
            </template>
            <template #body="slotProps">
              <div class="">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column field="code" header="Kode Komposisi" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="name" header="Nama Komposisi" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column headerClass="bg-adameds-50">
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
                  @click="deleteDialog('delete', `${slotProps.data.code} - ${slotProps.data.name}`, slotProps.data)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <AddComposition 
          v-model:isDialogVisible="CompositionDialog"
          :title="dialogConfig.title"
          :method="dialogConfig.method"
          :payload="dialogConfig.data"
          @data-updated="fetchComposition"
        />
        <DeleteComposition
          v-model:isDialogVisible="DeleteCompositionDialog"
          :title="dialogConfig.title"
          :itemToDelete="dialogConfig.data"
          @delete="confirmDelete"
        />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="flex items-center gap-2.5">
            <FileUpload
              mode="basic"
              accept=".xls,.xlsx"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              auto
              class="bg-adameds-300 rounded-[10px] h-10 text-white border-adameds-300"
              @select="onUpload"
              custom-upload
              name="dems[]"
            >
              <template #chooseicon>
                <img src="@/assets/icons/File Import.svg" alt="" />
              </template>
            </FileUpload>
            <CustomButton @click="ExportExcel">
              <img src="@/assets/icons/File Export.svg" alt="" />Export
            </CustomButton>
            <CustomButton @click="downloadExcel">
              <img src="@/assets/icons/download.svg" alt="" />Download
            </CustomButton>
          </div>
          <CustomPaginator
            :rows="CompositionProperties.page_size"
            :totalRecords="CompositionProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
