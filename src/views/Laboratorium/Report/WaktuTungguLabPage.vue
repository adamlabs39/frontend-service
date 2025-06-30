<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import { useLaporanTat } from "@/stores/laporanLaboratorium/laporanTAT";
import { utilsStore } from "@/stores/utils";
import {
  epochToDate,
  dateToEpoch,
  formatPrice,
  setTimeForDate,
} from "@/utils/Helpers";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchQuery = ref<string>("");
const tatPayload = ref<any[]>([]);
const UseUtilsStore = utilsStore();
const laporanTatStore = useLaporanTat();
const tatProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});
const expandedRows = ref<any[]>([]);

const jenisPelayanan = ref<string>("");
const optionJenisPelayanan = ref([
  { label: "Semua", value: "" },
  { label: "Rawat Jalan", value: "rajal" },
  { label: "Rawat Inap", value: "ranap" },
  { label: "IGD", value: "igd" },
  { label: "APS", value: "aps" },
]);

const fetchLaporanTat = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const params: any = {
      startDate: dateToEpoch(setTimeForDate(startDateFilter.value, 0, 0, 0)),
      endDate: dateToEpoch(setTimeForDate(endDateFilter.value, 23, 59, 59)),
      jenisPelayanan: jenisPelayanan.value,
      search: searchQuery.value,
      page: tatProperties.value.page,
      pageSize: tatProperties.value.page_size,
    };
    const response = await laporanTatStore.getApi(params);

    if (response && response.payload) {
      tatProperties.value.total = response.payload.pagination.total;
      tatPayload.value = response.payload.data;
      console.log("Kunjungan data fetched successfully", tatPayload.value);
    } else {
      tatPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    tatPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const hasData = computed(() => tatPayload.value && tatPayload.value.length > 0);

const cloneData = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    return {};
  }
};

const formatDurationFromEpochMs = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = "";
  if (hours > 0) result += `${hours} jam `;
  if (minutes > 0) result += `${minutes} menit `;
  if (seconds > 0 || (!hours && !minutes)) result += `${seconds} detik`;

  return result.trim();
};

const searchData = () => {
  searchQuery.value;
  dateToEpoch(startDateFilter.value);
  dateToEpoch(endDateFilter.value);
  jenisPelayanan.value;
  fetchLaporanTat();
};

const handlePage = (event: any) => {
  tatProperties.value.page = event.page + 1;
  tatProperties.value.page_size = event.rows;
  fetchLaporanTat();
};

const resetFilters = () => {
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchQuery.value = "";
  jenisPelayanan.value = "";
  tatProperties.value.page = 1;
  tatProperties.value.page_size = 10;
  fetchLaporanTat();
};

onMounted(() => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  startDateFilter.value = new Date(y, m, 1);
  endDateFilter.value = new Date(y, m + 1, 0);
  fetchLaporanTat();
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
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div>
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Waktu Tunggu (TAT)
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
                placeholder="Cari Nama / No. RM / No. Reg"
                class="mr-5 grow"
              />
              <CustomSelect
                v-model="jenisPelayanan"
                label="Jenis Pelayanan"
                class="mr-5 w-[250px]"
                optionLabel="label"
                optionValue="value"
                :options="optionJenisPelayanan"
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
                borderColor="border-adameds-300"
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
          :value="tatPayload"
          :key="tatPayload.length"
          responsiveLayout="scroll"
          dataKey="id"
          :expandedRows="expandedRows"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          class="text-SM"
        >
          <Column
            expander
            style="width: 40px"
            header-class="text-black bg-adameds-50"
          />
          <!-- No -->
          <Column
            field="id"
            header="No."
            header-class="text-black bg-adameds-50"
            style="width: 40px"
          >
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-right text-SM">{{ slotProps.index + 1 }}</div>
              </div>
            </template>
          </Column>
          <!-- Tanggal -->
          <Column
            field="tanggal_daftar"
            header="Tangal"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-center">
                <div>
                  {{
                    epochToDate(
                      parseInt(slotProps.data.tglOrder) / 1000,
                      "date"
                    )
                  }}
                </div>
              </div>
            </template>
          </Column>
          <Column
            field="noReg"
            header="No. Registrasi"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.noreg }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="noRM"
            header="No. RM"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                <div>{{ slotProps.data.noRm }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="name"
            header="Nama Pasien"
            header-class="text-black bg-adameds-50"
            ><template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.patient.name }}
              </div>
            </template>
          </Column>
          <Column
            field="pelayanan"
            header="Jenis Pelayanan"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.pelayanan || "-" }}
              </div>
            </template>
          </Column>
          <Column
            field="unitAsal"
            header="Unit Asal"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.lokasi.name || "-" }}
              </div>
            </template>
          </Column>
          <Column
            field="waktuPelayanan"
            header="Waktu Pelayanan"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{
                  slotProps.data.tat
                    ? formatDurationFromEpochMs(slotProps.data.tat)
                    : "-"
                }}
              </div>
            </template>
          </Column>

          <template #expansion="slotProps">
            <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
              <DataTable
                :value="[slotProps.data]"
                class="overflow-hidden rounded-lg"
                :pt="{ headerRow: 'text-SM' }"
              >
                <Column
                  field="metodePembayaran"
                  header="Metode Pembayaran"
                  header-class=" bg-adameds-50"
                >
                  <template #body="slotProps">
                    <div class="text-SM">
                      {{
                        slotProps.data.paymentMethod === 1
                          ? "Tunai"
                          : "Asuransi"
                      }}
                    </div>
                  </template>
                </Column>
                <Column
                  field="jamValidasi"
                  header="Jam Validasi"
                  header-class=" bg-adameds-50"
                >
                  <template #body="slotProps">
                    <div>
                      {{
                        slotProps.data.waktuValidasi
                          ? epochToDate(
                              parseInt(slotProps.data.waktuValidasi) / 1000,
                              "time"
                            )
                          : "-"
                      }}
                    </div>
                  </template>
                </Column>
                <Column
                  field="jamSelesai"
                  header="Jam Selesai"
                  header-class="bg-adameds-50"
                >
                  <template #body="slotProps">
                    <div>
                      {{
                        slotProps.data.waktuSelsai
                          ? epochToDate(
                              parseInt(slotProps.data.waktuSelsai) / 1000,
                              "time"
                            )
                          : "-"
                      }}
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
        <NoData v-if="!hasData" />
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
            :rows="tatProperties.page_size"
            :totalRecords="tatProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
