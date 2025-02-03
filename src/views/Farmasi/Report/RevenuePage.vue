<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRevenueStore } from "@/stores/laporanFarmasi/revenue";
import { useLokasiStore } from "@/stores/datamaster/lokasi";
import { utilsStore } from "@/stores/utils";
import { epochToDate, dateToEpoch, formatPrice } from "@/utils/Helpers";
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
const revenue = ref<string>("");
const recipeOrigin = ref<string>("");
const typeOfService = ref<string>("");
const paymentMethod = ref<string>("");
const searchQuery = ref<string>("");
const optionRevenue = ref([
  { label: "Semua", value: "" },
  { label: "Resep Dokter", value: "prescription" },
  { label: "Penjualan Obat", value: "penjualan_obat"},
]);
const optionPelayanan = ref([
  { label: "Semua", value: "" },
  { label: "IGD", value: "igd" },
  { label: "Rawat Jalan", value: "rj" },
  { label: "Rawat Inap", value: "ri" },
]);
const optionPembayaran = ref([
  { label: "Semua", value: "" },
  { label: "Tunai", value: 1 },
  { label: "Asuransi", value: 2 },
]);

// State Management Lokasi
const lokasiStore = useLokasiStore();
const lokasiPayload = ref<any[]>([]);

// State Management Location
const locationStore = useLokasiStore();
const locationPayload = ref<any[]>([]);

// Fetch Location
const fetchLocation = async () => {
  try {
    const response = await locationStore.getApi(1, 9999);
    if (response && response.payload) {
      locationPayload.value = response.payload;
    } else {
      locationPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch kategori ruangan", error);
    locationPayload.value = [];
  }
};

// State Management
const revenueStore = useRevenueStore();
const UseUtilsStore = utilsStore();
const revenuePayload = ref<any[]>([]);
const revenueProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => revenuePayload.value && revenuePayload.value.length > 0
);

// Fetch Revenue
const fetchRevenue = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await revenueStore.getApi(
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      recipeOrigin.value,
      typeOfService.value,
      paymentMethod.value,
      searchQuery.value,
      revenue.value,
      revenueProperties.value.page,
      revenueProperties.value.page_size
    );

    if (response && response.payload) {
      revenueProperties.value.total = response.properties.total;
      revenuePayload.value = response.payload;
    } else {
      revenuePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    revenuePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newValue) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchRevenue();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  revenueProperties.value.page = event.page + 1;
  revenueProperties.value.page_size = event.rows;
  fetchRevenue();
};

// Filter Search Data
const searchData = () => {
  dateToEpoch(startDateFilter.value),
  dateToEpoch(endDateFilter.value),
  recipeOrigin.value,
  typeOfService.value,
  paymentMethod.value,
  searchQuery.value,
  revenue.value,
  fetchRevenue();
};

// Filter Reset Data
const resetData = () => {
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  recipeOrigin.value = "";
  typeOfService.value = "";
  paymentMethod.value = "";
  searchQuery.value = "";
  revenue.value = "";
  fetchRevenue();
};

onMounted(() => {
  fetchRevenue();
  fetchLocation();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
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
                <div>
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">
                    Pendapatan
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-4 gap-4 mt-[10px]">
              <CustomSelect
                v-model="revenue"
                label="Pendapatan"
                place-holder="Semua"
                optionLabel="label"
                optionValue="value"
                :options="optionRevenue"
              />
              <CustomSelect
                v-model="typeOfService"
                label="Jenis Pelayanan"
                place-holder="Semua"
                optionLabel="label"
                optionValue="value"
                :options="optionPelayanan"
              />
              <CustomSelect
                v-model="recipeOrigin"
                label="Asal Resep"
                optionLabel="name"
                optionValue="uuid"
                :options="locationPayload"
                place-holder="Semua"
              />
              <CustomSelect
                v-model="paymentMethod"
                label="Metode Pembayaran"
                optionLabel="label"
                optionValue="value"
                :options="optionPembayaran"
                place-holder="Semua"
              />
            </div>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
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
            <hr class="mt-5 border-[1px] border-grey-200" />
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
          v-model:expandedRows="expandedRows"
          :value="revenuePayload"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          class="text-SM"
        >
          <Column expander style="width: 40px" headerClass="bg-adameds-50" />
          <!-- No -->
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold">No.</div>
            </template>
            <template #body="slotProps">
              <div class="text-SM">{{ slotProps.index + 1 }}</div>
            </template>
          </Column>
          <!-- Tanggal -->
          <Column header="Tanggal" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ epochToDate(slotProps.data.orderDate, "date") }}</div>
              </div>
            </template>
          </Column>
          <!-- No. Resep -->
          <Column header="No. Resep / Transaksi" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.noResep }}</div>
              </div>
            </template>
          </Column>
          <!-- No. Registrasi -->
          <Column header="No. Registrasi" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.noReg }}</div>
              </div>
            </template>
          </Column>
          <!-- No. RM -->
          <Column header="No. RM" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.noRm }}</div>
              </div>
            </template>
          </Column>
          <!-- Nama Pasien -->
          <Column header="Nama Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.patient.name }}</div>
              </div>
            </template>
          </Column>
          <!-- Jenis Pelayanan -->
          <Column header="Jenis Pelayanan" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM" v-if="slotProps.data.jenisPelayanan == 'ri'">
                Rawat Inap
              </div>
              <div class="text-SM" v-if="slotProps.data.jenisPelayanan == 'igd'">
                IGD
              </div>
              <div class="text-SM" v-if="slotProps.data.jenisPelayanan == 'rj'">
                Rawat Jalan
              </div>
            </template>
          </Column>
          <!-- Metode Pembayaran -->
          <Column header="Metode Pembayaran" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.paymentMethod }}</div>
              </div>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
              <DataTable
                :value="[slotProps.data]"
                class="overflow-hidden rounded-lg bg-adameds-50"
                :pt="{ headerRow: 'text-SM' }"
              >
                <!-- No. Invoice -->
                <Column header="No. Invoice" headerClass="bg-adameds-50">
                </Column>
                <!-- Nama Dokter -->
                <Column header="Nama Dokter" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      <div>{{ slotProps.data.dokterOrder }}</div>
                    </div>
                  </template>
                </Column>
                <!-- Asal Resep -->
                <Column header="Asal Resep" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      <div>{{ slotProps.data.lokasi }}</div>
                    </div>
                  </template>
                </Column>
                <!-- Total -->
                <Column header="Total" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      <div>{{ formatPrice(slotProps.data.totalHarga) }}</div>
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-between mt-[10px]">
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Cetak"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
          <CustomPaginator
            :rows="revenueProperties.page_size"
            :totalRecords="revenueProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
