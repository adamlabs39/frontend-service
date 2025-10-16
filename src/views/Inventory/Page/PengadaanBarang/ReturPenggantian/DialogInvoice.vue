<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref, computed, watch } from "vue";
import { useSupplierReturnsStore } from "@/stores/inventory/supplierReturns";
import { utilsStore } from "@/stores/utils";
import { epochToDate } from "@/utils/Helpers";
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

const emit = defineEmits(["update:isDialogVisible", "faktur-selected"]);

function formatDate(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

const SupplierReturnsStore = useSupplierReturnsStore();
const UseUtilsStore = utilsStore();
const InvoicePayload = ref<any[]>([]);
const InvoiceProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const date = ref<Date>(new Date());
const noInvoice = ref("");
const selectedData = ref();

const hasData = computed(() => InvoicePayload.value && InvoicePayload.value.length > 0);

// Fungsi fetch  mengambil nilai dari noInvoice
// const fetchAvailable = async () => {
//   UseUtilsStore.setLoading(true);
//   try {
//     const response = await SupplierReturnsStore.getApiAvailable(
//       noInvoice.value,                   // Parameter 1: search
//       InvoiceProperties.value.page,      // Parameter 2: page
//       InvoiceProperties.value.page_size  // Parameter 3: limit
//     );
//     InvoicePayload.value = response?.payload || [];
//     InvoiceProperties.value.total = response?.properties?.total || 0;
//   } catch (error) {
//     console.error("Failed to fetch data", error);
//     InvoicePayload.value = [];
//   } finally {
//     UseUtilsStore.setLoading(false);
//   }
// };

// KODE BARU
const fetchAvailable = async () => {
  UseUtilsStore.setLoading(true);
  try {
    // Format tanggal ke DD-MM-YYYY sebelum dikirim
    const formattedDate = date.value ? formatDate(date.value) : "";

    const response = await SupplierReturnsStore.getApiAvailable(
      noInvoice.value,
      formattedDate, // Kirim tanggal yang sudah diformat
      InvoiceProperties.value.page,
      InvoiceProperties.value.page_size
    );
    InvoicePayload.value = response?.payload || [];
    InvoiceProperties.value.total = response?.properties?.total || 0;
  } catch (error) {
    console.error("Failed to fetch data", error);
    InvoicePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const handlePage = (event: any) => {
  InvoiceProperties.value.page = event.page + 1;
  InvoiceProperties.value.page_size = event.rows;
  fetchAvailable();
};

// reset form pencarian
const handleReset = () => {
  noInvoice.value = "";
  date.value = new Date();
  InvoicePayload.value = [];
  InvoiceProperties.value.page = 1;
  InvoiceProperties.value.total = 0;
};

// Mounted dihapus dari sini untuk mencegah fetch otomatis

const updateVisibility = (value: any) => {

  emit("update:isDialogVisible", value);
};

// Reset state setiap kali dialog dibuka
watch(() => props.isDialogVisible, (newValue) => {
  if (newValue) {
    handleReset();
  }
});

// Handle row selection
const onRowSelect = (event: any) => {
  emit("faktur-selected", event.data); // Kirim data faktur yang dipilih
  updateVisibility(false); // Langsung tutup dialog
};

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
          <CustomTextfield label="Cari No. Faktur" v-model="noInvoice" prepend-icon="PhMagnifyingGlass"
            placeholder="Cari Berdasarkan No. Faktur" class="w-[360px]" />
          <CustomDatePicker label="Tgl. Faktur" v-model="date" />
          <div class="flex gap-2.5">
            <CustomButton class="my-auto" label="Cari" icon="PhMagnifyingGlass" @click="fetchAvailable" />
            <CustomButton label="Reset" class="my-auto bg-transparent" border-color="border-adameds-300 border-2"
              text-color="text-adameds-300" @click="handleReset" />
          </div>
        </div>
      </div>
      <NoData v-if="!hasData" />
      <DataTable v-else :value="InvoicePayload" v-model:selection="selectedData" selectionMode="single"
        @row-select="onRowSelect" stripedRows class="text-xs" scrollable scrollHeight="300px">
        <Column header="No." headerClass="bg-adameds-50" class="w-16">
          <template #body="slotProps">
            <div class="w-full text-center">{{ slotProps.index + 1 }}</div>
          </template>
        </Column>

        <Column header="Nomor" headerClass="bg-adameds-50" class="w-[250px]">
          <template #body="slotProps">
            <div>
              <p class="font-semibold underline">No. Penerimaan</p>
              <p>{{ slotProps.data.noPenerimaan }}</p>
            </div>
            <div class="mt-2">
              <p class="font-semibold underline">No. Faktur</p>
              <p>{{ slotProps.data.noFaktur || '-' }}</p>
            </div>
          </template>
        </Column>

        <Column header="Tanggal" headerClass="bg-adameds-50" class="w-[250px]">
          <template #body="slotProps">
            <div>
              <p class="font-semibold underline">Tgl. Penerimaan</p>
              <p>{{ epochToDate(slotProps.data.tanggalPenerimaan, "date") || '-' }}</p>
            </div>
            <div class="mt-2">
              <p class="font-semibold underline">Tgl. Faktur</p>
              <p>{{ epochToDate(slotProps.data.tanggalFaktur, "date") || '-' }}</p>
            </div>
          </template>
        </Column>

        <Column header="Supplier" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <p>{{ slotProps.data.supplier || '-'}}</p>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <CustomPaginator :rows="InvoiceProperties.page_size" :totalRecords="InvoiceProperties.total"
          :rowsPerPageOptions="[10, 20, 30]" @page="handlePage" />
      </div>
    </template>
  </CustomDialog>
</template>