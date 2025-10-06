<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref, onMounted, computed, watch } from "vue";
import { useSupplierReturnsStore } from "@/stores/inventory/supplierReturns";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  method: {
    type: String,
  },
});

function formatDate(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

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

// State Management
const SupplierReturnsStore = useSupplierReturnsStore();
const UseUtilsStore = utilsStore();
const InvoicePayload = ref<any[]>([]);
const InvoiceProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => InvoicePayload.value && InvoicePayload.value.length > 0
);

// Fetch Supplier Returns
const fetchAvailable = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await SupplierReturnsStore.getApiAvailable(
      formatDate(date.value),
      InvoiceProperties.value.page,
      InvoiceProperties.value.page_size
    );

    if (response && response.payload) {
      InvoiceProperties.value.total = response.properties.total;
      InvoicePayload.value = response.payload;
    } else {
      InvoicePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    InvoicePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Handle Pagination
const handlePage = (event: any) => {
  InvoiceProperties.value.page = event.page + 1;
  InvoiceProperties.value.page_size = event.rows;
  fetchAvailable();
};

// Selected Row
const metaKey = ref(true);
const selectedData = ref();

const onRowSelect = (event: any) => {
  selectedData.value = event.data;
  changeSection("Retur & Penggantian Barang Supplier");
};

const date = ref<Date>(new Date());
const noInvoice = ref("");

const emit = defineEmits(["update:isDialogVisible", "close"]);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
};

onMounted(() => {
  fetchAvailable();
});
</script>

<template>
  <CustomDialog :visible="isDialogVisible" @update:visible="updateVisibility" width="1000px">
    <template #header>Faktur Penerimaan</template>
    <template #body>
      <div class="flex items-center py-4">
        <div class="flex flex-col justify-center">
          <div class="font-semibold underline text-SM">Lokasi Gudang</div>
          <div class="font-normal text-normal">Gudang Farmasi</div>
        </div>
        <hr class="mx-10 min-h-16 border-[1px] border-adameds-300" />
        <div class="flex items-end gap-5">
          <CustomTextfield
            label="Cari No. Faktur"
            v-model="noInvoice"
            prepend-icon="PhMagnifyingGlass"
            placeholder="Cari Berdasarkan No. Faktur"
            class="w-[360px]"
          />
          <CustomDatePicker label="Tgl. Faktur" v-model="date" />
          <div class="flex gap-2.5">
            <CustomButton
              class="my-auto"
              label="Cari"
              icon="PhMagnifyingGlass"
            />
            <CustomButton
              label="Reset"
              class="my-auto bg-transparent"
              border-color="border-adameds-300 border-2"
              text-color="text-adameds-300"
            />
          </div>
        </div>
      </div>
      <NoData v-if="!hasData" />
      <DataTable
        v-else
        :value="InvoicePayload"
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
        <Column headerClass="bg-adameds-50" class="w-[40px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">No.</div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center text-SM">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column field="Nomor" headerClass="bg-adameds-50" class="w-[200px]">
          <template #header>
            <div class="font-semibold">Nomor</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold underline text-SM">No Penerimaan</div>
            <div class="text-SM">{{ slotProps.data.noPenerimaan }}</div>
            <div class="font-semibold underline text-SM">No Faktur</div>
            <div class="text-SM">{{ slotProps.data.noFaktur }}</div>
          </template>
        </Column>
        <Column field="Tanggal" headerClass="bg-adameds-50" class="w-[200px]">
          <template #header>
            <div class="font-semibold">Tanggal</div>
          </template>
          <template #body="slotProps">
            <div class="font-semibold underline text-SM">Tgl Penerimaan</div>
            <div class="text-SM">{{ slotProps.data.tglPenerimaan }}</div>
            <div class="font-semibold underline text-SM">Tgl Faktur</div>
            <div class="text-SM">{{ slotProps.data.tglFaktur }}</div>
          </template>
        </Column>
        <Column field="Supplier" headerClass="bg-adameds-50" class="w-[200px]">
          <template #header>
            <div class="font-semibold">Supplier</div>
          </template>
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.supplier }}</div>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <CustomPaginator
          :rows="InvoiceProperties.page_size"
          :totalRecords="InvoiceProperties.total"
          :rowsPerPageOptions="[10, 20, 30]"
          @page="handlePage"
        />
      </div>
    </template>
  </CustomDialog>
</template>
