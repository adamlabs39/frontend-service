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

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const type = ref("");
const optionType = ref([
  { label: "Semua", value: "" },
  { label: "Closing Harian", value: "DAYS" },
  { label: "Closing Shift", value: "SHIFT" },
]);

const emits = defineEmits(["update:rows", "update:current-page"]);

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

    if (response && response.payload) {
      closeCashierProperties.value.total = response.properties.total;
      closeCashierPayload.value = response.payload;
    } else {
      closeCashierPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    closeCashierPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// Handle Pagination
const handlePage = (event: any) => {
  closeCashierProperties.value.page = event.page + 1;
  closeCashierProperties.value.page_size = event.rows;
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
  type.value = "";
  fetchCloseCashier();
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
              <div class="text-SM">{{ slotProps.data.shiftType }}</div>
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
              <div class="text-SM">{{ slotProps.data.cashierName }}</div>
            </template>
          </Column>
        </DataTable>
        <NoData />
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
          <CustomPaginator
            :rows="closeCashierProperties.page_size"
            :totalRecords="closeCashierProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
