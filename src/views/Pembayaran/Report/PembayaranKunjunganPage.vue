<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import { dateToEpoch, epochToDate, formatPrice } from "@/utils/Helpers";
import { useReportPembayaranKunjunganStore } from "@/stores/pembayaran/pembayaranKunjungan";
import { utilsStore } from "@/stores/utils";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const reportType = ref("");
const reportData = ref([1]);
const expandedRows = ref();
const searchQuery = ref<string>("");
const shiftType = ref("0");

const optionShiftItem = ref([
  { label: "Semua", value: "0" },
  { label: "Pagi", value: "1" },
  { label: "Siang", value: "2" },
  { label: "Malam", value: "3" },
]);

// State Management
const reportPembayaranKunjunganStore = useReportPembayaranKunjunganStore();
const UseUtilsStore = utilsStore();
const pembayaranKunjunganPayload = ref<any[]>([]);
const pembayaranKunjunganProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () =>
    pembayaranKunjunganPayload.value &&
    pembayaranKunjunganPayload.value.length > 0
);

// Fetch Revenue
const fetchPembayaranKunjungan = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await reportPembayaranKunjunganStore.getApi(
      pembayaranKunjunganProperties.value.page,
      pembayaranKunjunganProperties.value.page_size,
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      shiftType.value
    );

    if (response && response.payload) {
      pembayaranKunjunganProperties.value.total = response.properties.total;
      pembayaranKunjunganPayload.value = response.payload;
    } else {
      pembayaranKunjunganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    pembayaranKunjunganPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchPembayaranKunjungan();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  pembayaranKunjunganProperties.value.page = event.page + 1;
  pembayaranKunjunganProperties.value.page_size = event.rows;
  fetchPembayaranKunjungan();
};

// Filter Search Data
const searchData = () => {
  dateToEpoch(startDateFilter.value),
    dateToEpoch(endDateFilter.value),
    shiftType.value;
  fetchPembayaranKunjungan();
};

// Filter Reset Data
const resetData = () => {
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  shiftType.value = "0";
  fetchPembayaranKunjungan();
};

onMounted(() => {
  fetchPembayaranKunjungan();
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
                    Pembayaran Kunjungan
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / address / No. RM"
                class="mr-5 grow"
              />
              <CustomSelect
                v-model="shiftType"
                label="Shift"
                class="mr-5 w-[250px]"
                optionLabel="label"
                optionValue="value"
                :options="optionShiftItem"
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
                v-model="resetData"
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
        <NoData v-if="!hasData" />
        <DataTable
          v-else
          :value="pembayaranKunjunganPayload"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          class="text-SM"
        >
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold">No.</div>
            </template>
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.index + 1 }}</div>
            </template>
          </Column>
          <Column header="Nomor" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.noRm }}</div>
              <div class="text-SM">{{ slotProps.data.billCode }}</div>
              <div class="text-SM">{{ slotProps.data.invoiceCode }}</div>
            </template>
          </Column>
          <Column header="Nama Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.patientName }}
              </div>
            </template>
          </Column>
          <Column header="Waktu Bayar" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>
                  {{ epochToDate(slotProps.data.paymenDate, "dateTime") }}
                </div>
              </div>
            </template>
          </Column>
          <Column header="Cara Bayar" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.paymentType }}</div>
            </template>
          </Column>
          <Column header="Total Bayar" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.amount }}</div>
            </template>
          </Column>
          <Column header="Kasir" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.cashierName }}</div>
            </template>
          </Column>
          <Column header="Keterangan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.data.note }}</div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Cetak"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
          <Paginator
            :rows="10"
            :totalRecords="120"
            :rowsPerPageOptions="[10, 20, 30]"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{currentPage}"
          >
            <template #start="slotProps">Total Data: 0</template>
          </Paginator>
        </div>
      </template>
    </Card>
  </div>
</template>
