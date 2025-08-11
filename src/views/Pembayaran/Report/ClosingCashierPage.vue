<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import { useReportCloseCashierStore } from "@/stores/pembayaran/reportClosingCashier";
import { utilsStore } from "@/stores/utils";
import { dateToEpoch, epochToDate } from "@/utils/Helpers";
import { downloadExportExcelClosingCashier } from '@/utils/exportexcelpayment';

// Tentukan tanggal hari ini
const today = new Date();
// Buat tanggal baru, lalu set mundur 7 hari dari hari ini
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);
const startDateFilter = ref<Date>(sevenDaysAgo);
const endDateFilter = ref<Date>(today);
const type = ref("ALL");
const optionType = ref([
  { label: "Semua", value: "ALL" },
  { label: "Closing Shift", value: "SHIFT" },
  { label: "Closing Harian", value: "DAYS" },
]);

const emits = defineEmits(["update:rows", "update:current-page"]);

const shiftTypeMap: { [key: string]: string } = {
  "1": "Pagi",
  "2": "Siang",
  "3": "Malam",
};

// State Management
const reportCloseCashier = useReportCloseCashierStore();
const UseUtilsStore = utilsStore();
const closeCashierPayload = ref<any[]>([]);
const closeCashierProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => closeCashierPayload.value && closeCashierPayload.value.length > 0
);

// Fetch data
const fetchCloseCashier = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await reportCloseCashier.getApi(
      closeCashierProperties.value.page,
      closeCashierProperties.value.page_size,
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      type.value 
    );

    // Konversi ke plain object untuk keamanan
    const plainResponse = JSON.parse(JSON.stringify(response));
    
    if (plainResponse && plainResponse.payload && plainResponse.properties) {
      closeCashierPayload.value = plainResponse.payload;
      
      const apiProperties = plainResponse.properties;

      closeCashierProperties.value.page = apiProperties.page;
      closeCashierProperties.value.page_size = apiProperties.pageSize; 
      closeCashierProperties.value.total = parseInt(apiProperties.totalData, 10) || 0; 

    } else {
      closeCashierPayload.value = [];
      closeCashierProperties.value.page = 1;
      closeCashierProperties.value.total = 0;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    closeCashierPayload.value = [];
    closeCashierProperties.value.page = 1;
    closeCashierProperties.value.total = 0;
  } finally {
    UseUtilsStore.setLoading(false);
  }
};


watch(startDateFilter, (newDate) => {
  if (newDate) {
    newDate.setHours(0, 0, 0, 0);
  }
}, { immediate: true });

// Watcher ini khusus untuk memastikan waktu pada tanggal akhir
// selalu diatur ke 23:59:59 agar semua data di hari itu terhitung.
watch(endDateFilter, (newDate) => {
  if (newDate) {
    newDate.setHours(23, 59, 59, 999);
  }
}, { immediate: true });




// Handle Pagination
const handlePage = (event: any) => {
  console.log("--- [A] PAGINATOR EVENT TERPANGGIL ---");
  console.log("[A.1] Event dari Paginator:", event);
  
  closeCashierProperties.value.page = event.page + 1; 
  closeCashierProperties.value.page_size = event.rows;

  console.log("[A.2] State akan diubah untuk memanggil API:", JSON.parse(JSON.stringify(closeCashierProperties.value)));
  fetchCloseCashier();
};

// Filter Search Data
const searchData = () => {
  dateToEpoch(startDateFilter.value),
    dateToEpoch(endDateFilter.value),
    type.value;
  fetchCloseCashier();
};

// Filter Reset Data
const resetData = () => {
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  type.value = "ALL";
  fetchCloseCashier();
};

const handleExport = async () => {
  // Jika tidak ada data sama sekali, hentikan proses
  if (closeCashierProperties.value.total === 0) {
    console.warn("Tidak ada data untuk diekspor.");
    return;
  }

  UseUtilsStore.setLoading(true);

  try {
    const response = await reportCloseCashier.getApi(
      1,
      closeCashierProperties.value.total, 
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      type.value 
    );

    const plainResponse = JSON.parse(JSON.stringify(response));

    if (plainResponse && plainResponse.payload) {
      const allData = plainResponse.payload; 

      downloadExportExcelClosingCashier(
        allData,
        startDateFilter.value,
        endDateFilter.value,
        epochToDate
      );
    } else {
      console.error("Gagal mengambil data lengkap untuk ekspor.");
    }
  } catch (error) {
    console.error("Terjadi error saat menyiapkan data untuk ekspor:", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

onMounted(() => {
  fetchCloseCashier();
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
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Laporan',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Closing Kasir
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomSelect
                v-model="type"
                label="Jenis Kasir"
                class="mr-5 grow"
                optionLabel="label"
                optionValue="value"
                :options="optionType"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                label="Tanggal"
                class="w-[150px]"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                v-model="endDateFilter"
                :showLabel="false"
                class="mt-auto w-[150px]"
              />
              <CustomButton
                @click="searchData"
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                @click="resetData"
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
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
        <DataTable
          v-if="hasData"
          :value="closeCashierPayload"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
        >
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold">No.</div>
            </template>
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.index + 1 }}</div>
            </template>
          </Column>
          <Column header="Jenis Kasir" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.type }}</div>
            </template>
          </Column>
          <Column header="Tgl. Buka Kasir" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>
                  {{ epochToDate(slotProps.data.shiftTimeOpen, "date") }}
                </div>
              </div>
            </template>
          </Column>
          <Column header="Tgl. Tutup Kasir" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>
                  {{ epochToDate(slotProps.data.shiftTimeClosed, "date") }}
                </div>
              </div>
            </template>
          </Column>
          <!-- Shift belum fix, antara ambil shiftType atau shiftList -->
          <Column header="Shift" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM"> {{ slotProps.data.type === 'SHIFT' ? shiftTypeMap[slotProps.data.shiftType] : slotProps.data.shiftList }}</div>
            </template>
          </Column>
          <Column header="Tgl. Closing Harian" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>
                  {{ epochToDate(slotProps.data.daysTimeClosed, "date") }}
                </div>
              </div>
            </template>
          </Column>
          <Column header="Petugas" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.cashierName || slotProps.data.petugasList }}</div>
            </template>
          </Column>
        </DataTable>
        <NoData v-else />
      </template>
      <template #footer>
        <div class="flex justify-between">
          <CustomButton
            @click="handleExport"
            icon="PhPrinter"
            label="Cetak"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
          <Paginator
            :first="(closeCashierProperties.page - 1) * closeCashierProperties.page_size"
            :rows="closeCashierProperties.page_size"
            :totalRecords="closeCashierProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{currentPage}"
          >
            <template #start>
              <span class="font-semibold mr-4">Total Data: {{ closeCashierProperties.total }}</span>
            </template>
          </Paginator>
        </div>
      </template>
    </Card>
  </div>
</template>
