<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { usePendapatanStore } from "@/stores/laporanFarmasi/pendapatan";
import * as XLSX from "xlsx-js-style";
import { utilsStore } from "@/stores/utils";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const expandedRows = ref();
const pageType = ref("");

// State Management
const PendapatanStore = usePendapatanStore();
const UseUtilsStore = utilsStore();
const PendapatanPayload = ref<any[]>([]);
const PendapatanProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const searchQuery = ref<string>("");

// Check if Data Exists
const hasData = computed(
  () => PendapatanPayload.value && PendapatanPayload.value.length > 0
);

// Fetch Pendapatan
const fetchPendapatan = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await PendapatanStore.getApi(
      PendapatanProperties.value.page,
      PendapatanProperties.value.page_size,
      searchQuery.value
    );

    if (response && response.payload) {
      PendapatanProperties.value.total = response.properties.total;
      PendapatanPayload.value = response.payload;
    } else {
      PendapatanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    PendapatanPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchPendapatan();
  }, 500); 
});

// Handle Pagination
const handlePage = (event: any) => {
  PendapatanProperties.value.page = event.page + 1;
  PendapatanProperties.value.page_size = event.rows;
  fetchPendapatan();
};

onMounted(() => {
  fetchPendapatan();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
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
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div>
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Pendapatan</p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-3 gap-3 mt-[10px]">
              <div>
                <CustomSelect 
                  label="Jenis Pelayanan" 
                  class="" 
                  optionLabel="" 
                  optionValue="" 
                  :options="['Semua', 'IGD', 'RAJAL', 'RANAP']" 
                  place-holder="Semua" 
                />
              </div>
              <div>
                <CustomSelect 
                  label="Metode Pembayaran" 
                  class="" 
                  optionLabel="" 
                  optionValue="" 
                  :options="['Semua', 'Lunas', 'Piutang']" 
                  place-holder="Semua" 
                />
              </div>
              <div>
                <CustomSelect 
                  label="Pendapatan" 
                  class="" 
                  optionLabel="" 
                  optionValue="" 
                  :options="['Semua', 'Resep Dokter', 'Penjualan Obat']" 
                  place-holder="Semua" 
                />
              </div>
            </div>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Cari Pasien"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Asal Resep / No. RM"
                class="mr-5 grow"
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
                icon="PhMagnifyingGlass"
                label="Cari"
                class="ml-5 mr-[10px] mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto"
              />
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
          <template #expandIcon>
            <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <NoData v-if="!hasData" />
        <DataTable
          v-model:expandedRows="expandedRows" 
          :value="PendapatanPayload" 
          scrollable 
          scrollHeight="flex" 
          :pt="{ headerRow: 'text-SM' }" 
          class="text-SM"
        >
          <Column expander style="width: 40px" header-class="text-black bg-adameds-50" />
          <!-- No -->
          <Column field="no" header="No." header-class="text-black bg-adameds-50" style="width: 40px">
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-right text-SM">{{ slotProps.index + 1 }}</div>
              </div>
            </template>
          </Column>
          <!-- Tanggal -->
          <Column field="tanggal_daftar" header="Tangal" header-class="text-black bg-adameds-50">
            <template #body="slotProps">
              <div class="text-center">
                <div>{{ slotProps.data.tanggal_daftar.split(" ")[0] }}</div>
              </div>
            </template>
          </Column>
          <Column field="resepNumber" header="No. Resep" header-class="text-black bg-adameds-50"></Column>
          <Column field="noReg" header="No. Registrasi" header-class="text-black bg-adameds-50"></Column>
          <Column field="noRM" header="No. RM" header-class="text-black bg-adameds-50"></Column>
          <Column field="name" header="Nama Pasien" header-class="text-black bg-adameds-50"></Column>
          <Column field="pelayanan" header="Jenis Pelayanan" header-class="text-black bg-adameds-50">
            <template #body="slotProps">
              <div class="text-center">
                <div v-if="slotProps.data.polyclinic.includes('POLI')">RAJAL</div>
                <div v-else></div>
              </div>
            </template>
          </Column>
          <Column field="insurance_account_name" header="Metode Pembayaran" header-class="text-black bg-adameds-50"></Column>
          <template #expansion="slotProps">
            <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
              <DataTable :value="[slotProps.data]" class="overflow-hidden rounded-lg bg-adameds-50" :pt="{ headerRow: 'text-SM' }">
                <Column field="invoiceNumber" header="No. Invoice" header-class="text-black bg-adameds-50"> </Column>
                <Column field="doctorData.doctor" header="Nama Dokter" header-class="text-black bg-adameds-50"></Column>
                <Column field="polyclinic" header="Asal Resep" header-class="text-black bg-adameds-50"></Column>
                <Column field="total" header="Total" header-class="text-black bg-adameds-50"></Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <CustomButton @click="() => {}" icon="PhPrinter" label="Cetak" class="mr-[10px]" backgroundColor="bg-adameds-300" />
          <CustomPaginator
            :rows="PendapatanProperties.page_size"
            :totalRecords="PendapatanProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
