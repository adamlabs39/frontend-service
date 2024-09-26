<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import * as XLSX from "xlsx-js-style";
import Footer from "../Layout/FooterPaginator.vue";
import HeaderFilter from "../Layout/HeaderFilter.vue";
import TambahDataVoucherDialog from "./TambahDataVoucherDialog.vue";
import { useVoucherStore } from "@/stores/datamaster/voucher";
import NoData from "@/components/section/NoData.vue";
const voucherStore = useVoucherStore();
const voucherPayload = ref<any[]>([]);
const voucherProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");
const loading = ref(true);

const fetchVoucherData = async () => {
  loading.value = true;
  try {
    const response = await voucherStore.getApi(
      voucherProperties.value.page,
      voucherProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      voucherProperties.value.total = response.properties.total;
      voucherPayload.value = response.payload;
    } else {
      voucherPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    voucherPayload.value = [];
  } finally {
    loading.value = false;
  }
};

watch([searchQuery], fetchVoucherData);

onMounted(() => {
  fetchVoucherData();
});

const handlePage = (event: any) => {
  voucherProperties.value.page = event.page + 1;
  voucherProperties.value.page_size = event.rows;
  fetchVoucherData();
};

const hasData = computed(
  () => voucherPayload.value && voucherPayload.value.length > 0
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
  fetchVoucherData();
};

const handleDelete = (dataItem: any) => {
  const confirmed = confirm(
    `Are you sure you want to delete ${dataItem.name}?`
  );

  if (confirmed) {
    loading.value = true;
    voucherStore
      .deleteApi(dataItem.uuid)
      .then(() => {
        fetchVoucherData();
      })
      .catch((error) => {
        console.error("Failed to delete data", error);
        loading.value = false;
      });
  }
};

const downloadExportExcel = async () => {
  try {
    const response = await voucherStore.exportApi();
    const rows = response.payload;
    if (!rows || rows.length === 0) {
      console.error("No data available for export");
      return;
    }

    const title = ["REKAP DATA VOUCHER"];
    const data = [];
    data.push({});
    data.push({
      No: "No",
      Kode: "Kode Voucher",
      Nama: "Nama Voucher",
      Jumlah: "Jumlah",
      Start: "Start Date",
      End: "End Date",
      Type: "Type",
      Tarif: "Tarif Voucher",
      Using: "Using",
      Status: "Status",
    });
    for (let i = 0; i < rows.length; i++) {
      data.push({
        No: i + 1,
        Kode: rows[i].code,
        Nama: rows[i].name,
        Jumlah: rows[i].qty,
        Start: rows[i].startDate,
        End: rows[i].endDate,
        Type: rows[i].type,
        Tarif: rows[i].value,
        Using: rows[i].using,
        Status: rows[i].status ? "AKTIF" : "NON-AKTIF",
      });
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });

    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });

    worksheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } }];

    worksheet["A1"].s = {
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
      font: { bold: true, sz: 14 },
    };
    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 20 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
    ];

    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:J1");
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Data Voucher");

    XLSX.writeFile(workbook, `Rekap Data Voucher.xlsx`);
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
        page-type="voucher"
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
        :value="voucherPayload"
        tableStyle="min-width: 50rem"
        stripedRows
        class="text-xs"
        scrollable
        scrollHeight="flex"
      >
        <Column header="No." headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="code"
          header="Kode Voucher"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama Voucher"
          class="w-4/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="qty"
          headerClass="bg-adameds-50 text-center"
          body-class="text-center"
        >
          <template #header="slotProps">
            <div class="w-full font-semibold text-center text-SM">Jumlah</div>
          </template>
        </Column>
        <Column field="value" headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Tarif Voucher
            </div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center text-SM">
              Rp. {{ slotProps.data.value }}
            </div>
          </template>
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
                @click="handleDelete(slotProps.data)"
              >
                <img src="@/assets/icons/delete.svg" alt="" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
      <TambahDataVoucherDialog
        v-model:isDialogVisible="isTambahDataDialogVisible"
        :title="dialogConfig.title"
        :method="dialogConfig.method"
        :editData="dialogConfig.data"
        @close="closeDialog"
        @data-updated="fetchVoucherData"
      />
    </template>
    <template #footer>
      <Footer
        :rows="voucherProperties.page_size"
        :totalRecords="voucherProperties.total"
        @page="handlePage"
        @export="downloadExportExcel"
      />
    </template>
  </Card>
</template>
