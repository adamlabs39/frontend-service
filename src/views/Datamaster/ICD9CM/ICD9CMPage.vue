<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useIcd9Store } from "@/stores/datamaster/icd9";
import { downloadPdf } from "@/utils/PdfMake";
import * as XLSX from "xlsx-js-style";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import TambahDataICD9CMDialog from "./TambahDataICD9CMDialog.vue";
import NoData from "@/components/section/NoData.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import Footer from "../Layout/FooterPaginator.vue";

const icd9Store = useIcd9Store();
const icd9Payload = ref<any[]>([]);
const icd9Properties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");
const loading = ref(true);

const fetchIcd9Data = async () => {
  loading.value = true;
  try {
    const response = await icd9Store.getApi(
      icd9Properties.value.page,
      icd9Properties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      icd9Properties.value.total = response.properties.total;
      icd9Payload.value = response.payload;
    } else {
      icd9Payload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    icd9Payload.value = [];
  } finally {
    loading.value = false;
  }
};

watch([searchQuery], fetchIcd9Data);

onMounted(() => {
  fetchIcd9Data();
});

const handlePage = (event: any) => {
  icd9Properties.value.page = event.page + 1;
  icd9Properties.value.page_size = event.rows;
  fetchIcd9Data();
};

const hasData = computed(
  () => icd9Payload.value && icd9Payload.value.length > 0
);

// Dialog States
const isTambahDataDialogVisible = ref(false);

// Dialog Configuration
const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const openDialog = (method: string, title: string, data: any = null) => {
  dialogConfig.value = { method, title, data };
  isTambahDataDialogVisible.value = true;
};

const closeDialog = () => {
  isTambahDataDialogVisible.value = false;
  fetchIcd9Data();
};

const handleDelete = (dataItem: any) => {
  const confirmed = confirm(
    `Are you sure you want to delete ${dataItem.name}?`
  );

  if (confirmed) {
    loading.value = true;
    icd9Store
      .deleteApi(dataItem.uuid)
      .then(() => {
        fetchIcd9Data();
      })
      .catch((error) => {
        console.error("Failed to delete data", error);
        loading.value = false;
      });
  }
};

const downloadExportExcel = async () => {
  try {
    const response = await icd9Store.exportApi();
    const rows = response.payload; 
    if (!rows || rows.length === 0) {
      console.error('No data available for export');
      return;
    }

    const title = ["REKAP DATA ICD9"];  
    const data = [];
    data.push({});  
    data.push({ No: "No", Kode: "Kode", Nama: "Nama ICD 9 CM", Status: "Status" });  
    for (let i = 0; i < rows.length; i++) {
      data.push({
        No: i + 1,
        Kode: rows[i].code,
        Nama: rows[i].name,
        Status: rows[i].status ? "AKTIF" : "NON-AKTIF",  
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true }); 

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });

    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

    worksheet["A1"].s = {
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      font: { bold: true, sz: 14 },
    };
    worksheet["!cols"] = [
      { wch: 5 }, 
      { wch: 10 },
      { wch: 30 }, 
      { wch: 10 }, 
    ];

    const range = XLSX.utils.decode_range(worksheet['!ref'] || "A1:D1");
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellAddress]) worksheet[cellAddress] = { v: "" };  
        worksheet[cellAddress].s = worksheet[cellAddress].s || {};
        worksheet[cellAddress].s.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };

        if (row === 1 || col === 0) {
          worksheet[cellAddress].s.alignment = {
            horizontal: "center",
            vertical: "center",
          };
        }

        if (row === 1) {
          worksheet[cellAddress].s.fill = {
            fgColor: { rgb: "a4c2f4" },
          };
        }
      }
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Data ICD9");

    XLSX.writeFile(workbook, `Rekap Data ICD9.xlsx`);
  } catch (error) {
    console.error("Error while exporting Excel", error);
  }
};

</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
  >
    <template #header>
      <HeaderFilter
        page-type="icd9-cm"
        :value-search="searchQuery"
        @update:valueSearch="searchQuery = $event"
        @tambah-data="openDialog('add', 'Tambah Data')"
      />
    </template>
    <template #content>
      <div v-if="loading" class="flex items-center justify-center h-full">
        Loading...
      </div>
      <NoData v-else-if="!hasData" />
      <DataTable
        v-else
        :value="icd9Payload"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs"
        scrollable
        scrollHeight="flex"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{
                slotProps.index +
                1 +
                (icd9Properties.page - 1) * icd9Properties.page_size
              }}
            </div>
          </template>
        </Column>
        <Column
          field="code"
          header="Kode"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama ICD 9 CM"
          class="w-3/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column field="status" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Status</div>
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
                customClass="text-xs font-semibold h-5 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
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
                @click="handleDelete(slotProps.data)"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataICD9CMDialog
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :editData="dialogConfig.data"
        @close="closeDialog"
        @data-updated="fetchIcd9Data"
      />
    </template>
    <template #footer>
      <Footer
        :rows="icd9Properties.page_size"
        :totalRecords="icd9Properties.total"
        @page="handlePage"
        @export="downloadExportExcel"
      />
    </template>
  </Card>
</template>
