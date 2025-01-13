<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useLokasiStore } from "@/stores/datamaster/lokasi";
import { useWaitingTimeStore } from "@/stores/laporanFarmasi/waitingTime";
import { utilsStore } from "@/stores/utils";
import { dateToEpoch, epochToDate } from "@/utils/Helpers";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const expandedRows = ref();
const typeOfService = ref<string>("");
const recipe = ref<string>("");
const recipeOrigin = ref<string>("");
const paymentMethod = ref<string>("");
const searchQuery = ref<string>("");
const optionPelayanan = ref([
  { label: "Semua", value: "" },
  { label: "IGD", value: "igd" },
  { label: "Rawat Jalan", value: "rj" },
  { label: "Rawat Inap", value: "ri" },
]);
const optionResep = ref([
  { label: "Semua", value: "" },
  { label: "Racikan", value: "racikan" },
  { label: "Non-Racikan", value: "non-racikan" },
]);
const optionPembayaran = ref([
  { label: "Semua", value: "" },
  { label: "Tunai", value: 1 },
  { label: "Asuransi", value: 2 },
]);

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

// State Management Revenue Recap
const waitingTimeStore = useWaitingTimeStore();
const UseUtilsStore = utilsStore();
const waitingTimePayload = ref<any[]>([]);
const waitingTimeProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => waitingTimePayload.value && waitingTimePayload.value.length > 0
);

// Fetch Waiting Time
const fetchWaitingTime = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await waitingTimeStore.getApi(
      searchQuery.value,
      paymentMethod.value,
      recipeOrigin.value,
      recipe.value,
      typeOfService.value,
      dateToEpoch(startDateFilter.value),
      dateToEpoch(endDateFilter.value),
      waitingTimeProperties.value.page,
      waitingTimeProperties.value.page_size
    );

    if (response && response.payload) {
      waitingTimeProperties.value.total = response.properties.total;
      waitingTimePayload.value = response.payload;
    } else {
      waitingTimePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    waitingTimePayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchWaitingTime();
  }, 500);
});

// Handle Pagination
const handlePage = (event: any) => {
  waitingTimeProperties.value.page = event.page + 1;
  waitingTimeProperties.value.page_size = event.rows;
  fetchWaitingTime();
};

// Filter Search Data
const searchData = () => {
  typeOfService.value;
  searchQuery.value;
  recipe.value;
  recipeOrigin.value;
  paymentMethod.value;
  dateToEpoch(startDateFilter.value);
  dateToEpoch(endDateFilter.value);
  fetchWaitingTime();
};

// Filter Reset Data
const resetData = () => {
  paymentMethod.value = "";
  searchQuery.value = "";
  typeOfService.value = "";
  recipe.value = "";
  recipeOrigin.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  fetchWaitingTime();
};

onMounted(() => {
  fetchWaitingTime();
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
                    Waktu Tunggu
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-4 gap-4 mt-[10px]">
              <CustomSelect
                v-model="typeOfService"
                label="Jenis Pelayanan"
                optionLabel="label"
                optionValue="value"
                :options="optionPelayanan"
                place-holder="Semua"
              />
              <CustomSelect
                v-model="recipe"
                label="Resep"
                optionLabel="label"
                optionValue="value"
                :options="optionResep"
                place-holder="Semua"
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
          v-model:expandedRows="expandedRows"
          :value="waitingTimePayload"
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
          <Column header="Tangal" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ epochToDate(slotProps.data.orderDate, "date") }}
              </div>
            </template>
          </Column>
          <!-- No. Resep -->
          <Column header="No. Resep" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.noResep }}
              </div>
            </template>
          </Column>
          <!-- No. Registrasi -->
          <Column header="No. Registrasi" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.noReg }}
              </div>
            </template>
          </Column>
          <!-- No. RM -->
          <Column header="No. RM" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.noRm }}
              </div>
            </template>
          </Column>
          <!-- Nama Pasien -->
          <Column header="Nama Pasien" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.patient }}
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
                {{ slotProps.data.paymentMethod }}
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
                <!-- Waktu Verifikasi -->
                <Column header="Waktu Verifikasi" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ epochToDate(slotProps.data.waktuVerifikasi, "dateTime") }}
                    </div>
                  </template>
                </Column>
                <!-- Waktu Penyerahan -->
                <Column header="Waktu Penyerahan" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ epochToDate(slotProps.data.waktuPemberian, "dateTime") }}
                    </div>
                  </template>
                </Column>
                <!-- Asal Resep -->
                <Column header="Asal Resep" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ slotProps.data.asalResep }}
                    </div>
                  </template>
                </Column>
                <!-- Waktu Pelayanan -->
                <Column header="Waktu Pelayanan" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ slotProps.data.waktuPelayanan }}
                    </div>
                  </template>
                </Column>
                <!-- Resep -->
                <Column header="Resep" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ slotProps.data.jenisResep }}
                    </div>
                  </template>
                </Column>
                <!-- Jumlah Racikan -->
                <Column header="Jumlah Racikan" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{ slotProps.data.jumlahRacikan }}
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
          <div class="flex items-center">
            <CustomButton
              @click="() => {}"
              icon="PhPrinter"
              label="Cetak"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <CustomPaginator
            :rows="waitingTimeProperties.page_size"
            :totalRecords="waitingTimeProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
