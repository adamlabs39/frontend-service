<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useKategoriRuanganStore } from "@/stores/datamaster/kategoriRuangan";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Footer from "../Layout/FooterPaginator.vue";
import FormKategoriRuangan from "./FormKategoriRuangan.vue";
import NoData from "@/components/section/NoData.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import DialogDelete from "../Layout/DialogDelete.vue";

// State Management
const kategoriRuanganStore = useKategoriRuanganStore();
const UseUtilsStore = utilsStore();
const kategoriRuanganPayload = ref<any[]>([]);
const kategoriRuanganProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Search Query
const searchQuery = ref<string>("");

// Fetch Kategori Ruangan Data from API
const fetchKategoriRuanganData = async () => {
  UseUtilsStore.setLoading(true)
  try {
    const response = await kategoriRuanganStore.getApi(
      kategoriRuanganProperties.value.page,
      kategoriRuanganProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      kategoriRuanganProperties.value.total = response.properties.total;
      kategoriRuanganPayload.value = response.payload;
    } else {
      kategoriRuanganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    kategoriRuanganPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false)
  }
};

watch([searchQuery], fetchKategoriRuanganData);

onMounted(() => {
  fetchKategoriRuanganData();
});

// Handle Pagination
const handlePage = (event: any) => {
  kategoriRuanganProperties.value.page = event.page + 1;
  kategoriRuanganProperties.value.page_size = event.rows;
  fetchKategoriRuanganData();
};

// Check if Data Exists
const hasData = computed(
  () => kategoriRuanganPayload.value && kategoriRuanganPayload.value.length > 0
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
      await kategoriRuanganStore.deleteApi(item.uuid);
      fetchKategoriRuanganData();
    } catch (error) {
      console.error("Failed to delete data", error);
    } finally {
      UseUtilsStore.setLoading(false)
      isDeleteDialogVisible.value = false;
    }
  }
};

const downloadExportExcel = async () => {
  try {
    const response = await kategoriRuanganStore.exportApi();
    const rows = response.payload;
    if (!rows || rows.length === 0) {
      console.error("No data available for export");
      return;
    }

    const title = ["DATAMASTER KATEGORI RUANGAN"];
    const data = [];
    data.push({});
    data.push({
      No: "No",
      Kode: "Kode Kategori Ruangan",
      Nama: "Nama Kategori Ruangan",
      Status: "Status",
    });
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
    worksheet["!cols"] = [{ wch: 5 }, { wch: 30 }, { wch: 30 }, { wch: 10 }];

    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:D1");
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Datamaster Kategori Ruangan");

    XLSX.writeFile(workbook, `Datamaster Kategori Ruangan.xlsx`);
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
        page-type="kategori-ruangan"
        :value-search="searchQuery"
        @update:valueSearch="searchQuery = $event"
        @tambah-data="openDialog('add', 'Tambah Data')"
      />
    </template>

    <template #content>
      <NoData v-if="!hasData" />
      <DataTable
        v-else
        :value="kategoriRuanganPayload"
        v-model:selection="selectedData"
        :metaKeySelection="metaKey"
        @rowClick="onRowSelect"
        selectionMode="single"
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
          field="code"
          header="Kode Kategori Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama Kategori Ruangan"
          headerClass="bg-adameds-50"
          class="w-1/2"
        >
        </Column>
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
          <template #header="slotProps">
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
                @click="openDialog('edit', 'Edit Data', slotProps.data)"
                class="h-6 w-[26px] p-0"
              >
                <img src="@/assets/icons/edit.svg" alt="" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="deleteDialog('delete', 'Kategori Ruangan', slotProps.data)"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <FormKategoriRuangan
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :payload="dialogConfig.data"
        @data-updated="fetchKategoriRuanganData"
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
        :rows="kategoriRuanganProperties.page_size"
        :totalRecords="kategoriRuanganProperties.total"
        @page="handlePage"
        @export="downloadExportExcel"
      />
    </template>
  </Card>
</template>
