<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useSupplierStore } from "@/stores/inventory/supplier";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import DialogTambah from "./DialogTambahSupplier.vue"
import DialogDelete from "./DialogDeleteSupplier.vue"

// State Management
const searchQuery = ref<string>("");
const SupplierStore = useSupplierStore();
const UseUtilsStore = utilsStore();
const SupplierPayload = ref<any[]>([]);
const SupplierProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => SupplierPayload.value && SupplierPayload.value.length > 0
);

// Fetch RulesOfUse
const fetchSupplier = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await SupplierStore.getApi(
      SupplierProperties.value.page,
      SupplierProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      SupplierProperties.value.total = response.properties.total;
      SupplierPayload.value = response.payload;
    } else {
      SupplierPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    SupplierPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchSupplier();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  SupplierProperties.value.page = event.page + 1;
  SupplierProperties.value.page_size = event.rows;
  fetchSupplier();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  openDialog("detail", "Detail Data", selectedData.value);
};

// Dialog Management
const SupplierDialog = ref(false);
const DeleteSupplierDialog = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  SupplierDialog.value = true;
};

const deleteDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  DeleteSupplierDialog.value = true;
};

const confirmDelete = async (item: any) => {
  if (item) {
    UseUtilsStore.setLoading(true);
    try {
      await SupplierStore.deleteApi(item.uuid);
      fetchSupplier();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      UseUtilsStore.setLoading(false);
      DeleteSupplierDialog.value = false;
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
    const response = await SupplierStore.importApi(dataUpload);
    fetchSupplier();
    console.log("File uploaded successfully:", response);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// Export Excel
const ExportExcel = async () => {
  try {
    const response = await SupplierStore.getApi(
      SupplierProperties.value.page,
      SupplierProperties.value.page_size,
      searchQuery.value
    );

    const rows = response.payload;
    if (!rows || rows.length === 0) {
      console.error("No data available for export");
      return;
    }

    // Prepare Data for Export
    const title = ["DATAMASTER SUPPLIER"];
    const data = [];

    // Header Row (Kosong untuk baris kedua tanpa border)
    data.push({});
    data.push({});
    data.push({
      No: "No",
      Kode: "Kode Supplier",
      Nama: "Nama Supplier",
      Provinsi: "Provinsi",
      Kabupaten: "Kabupaten",
      Kecamatan: "Kecamatan",
      Kelurahan: "Kelurahan",
      Alamat: "Alamat",
      NoTelp: "No. Telepon",
      Kategori: "Kategori Item",
      Status: "Status"
    });

    // Data Rows
    for (let i = 0; i < rows.length; i++) {
      data.push({
        No: i + 1,
        Kode: rows[i].code,
        Nama: rows[i].name,
        Provinsi: rows[i].province?.name,
        Kabupaten: rows[i].kabupaten?.name,
        Kecamatan: rows[i].kecamatan?.name,
        Kelurahan: rows[i].kelurahan?.name,
        Alamat: rows[i].alamat,
        NoTelp: rows[i].noTlp,
        Kategori: rows[i].supplierItems.map((item: any) => item.kategoriItem).join(", "),
        Status: rows[i].status ? "AKTIF" : "NON-AKTIF",
      });
    }

    // Create Workbook and Worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    // Add Title and Merge Cells
    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 10 } }];

    // Style Title
    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { bold: true, sz: 14 },
      fill: {
        fgColor: { rgb: "D9D9D9" }, // Warna abu-abu muda
      },
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
           // **Tambahkan Font Bold di Row 3**
          worksheet[cellAddress].s.font = {
            bold: true,
            sz: 11
          };
        }
      }
    }

    // Append Worksheet to Workbook and Save
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datamaster Supplier");
    XLSX.writeFile(workbook, `Datamaster Supplier.xlsx`);
  } catch (error) {
    console.error("Error while exporting Excel", error);
  }
};

onMounted(() => {
  fetchSupplier();
});
</script>

<template>
  <div>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchSupplier"/>
                <CustomBreadCrumb
                  :home="{
                    label: 'Datamaster',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">
                    Supplier
                  </p>
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
                label="Cari Supplier"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama Supplier"
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
          :value="SupplierPayload"
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
              <div class="">No.</div>
            </template>
            <template #body="slotProps">
              <div class=""> {{ slotProps.index + 1 }} </div>
            </template>
          </Column>
          <Column field="code" header="Kode" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="name" header="Nama Supplier" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="noTlp" header="No. Telepon" headerClass="bg-adameds-50 font-semibold text-SM"></Column>        
          <Column field="status" headerClass="bg-adameds-50">
            <template #header="">
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
        <DialogTambah
          v-model:isDialogVisible="SupplierDialog"
          :title="dialogConfig.title"
          :method="dialogConfig.method"
          :payload="dialogConfig.data"
          @data-updated="fetchSupplier"
        />
        <DialogDelete
          v-model:isDialogVisible="DeleteSupplierDialog"
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
          </div>
          <CustomPaginator
            :rows="SupplierProperties.page_size"
            :totalRecords="SupplierProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
