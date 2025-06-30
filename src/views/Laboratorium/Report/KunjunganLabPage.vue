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
import { useKunjungan } from "@/stores/laporanLaboratorium/laporanKunjungan";
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
const kunjunganPayload = ref<any[]>([]);
const UseUtilsStore = utilsStore();
const kunjunganStore = useKunjungan();
const kunjunganProperties = ref({
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

const fetchKunjungan = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const params: any = {
      startDate: dateToEpoch(setTimeForDate(startDateFilter.value, 0, 0, 0)),
      endDate: dateToEpoch(setTimeForDate(endDateFilter.value, 23, 59, 59)),
      jenisPelayanan: jenisPelayanan.value,
      search: searchQuery.value,
      page: kunjunganProperties.value.page,
      pageSize: kunjunganProperties.value.page_size,
    };
    const response = await kunjunganStore.getApi(params);

    if (response && response.payload) {
      kunjunganProperties.value.total = response.payload.pagination.total;
      kunjunganPayload.value = response.payload.data;
      console.log(
        "Kunjungan data fetched successfully",
        kunjunganPayload.value
      );
    } else {
      kunjunganPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    kunjunganPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const hasData = computed(
  () => kunjunganPayload.value && kunjunganPayload.value.length > 0
);

const cloneData = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch {
    return {};
  }
};

const searchData = () => {
  searchQuery.value;
  dateToEpoch(startDateFilter.value);
  dateToEpoch(endDateFilter.value);
  jenisPelayanan.value;
  fetchKunjungan();
};

const handlePage = (event: any) => {
  kunjunganProperties.value.page = event.page + 1;
  kunjunganProperties.value.page_size = event.rows;
  fetchKunjungan();
};

const resetFilters = () => {
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchQuery.value = "";
  jenisPelayanan.value = "";
  kunjunganProperties.value.page = 1;
  kunjunganProperties.value.page_size = 10;
  fetchKunjungan();
};

onMounted(() => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();

  startDateFilter.value = new Date(y, m, 1);
  endDateFilter.value = new Date(y, m + 1, 0);
  fetchKunjungan();
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
                <CustomButton
                  icon="PhArrowClockwise"
                  class="mr-5"
                  @click="fetchKunjungan"
                />
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
                    Kunjungan
                  </p>
                </div>
              </div>
            </div>
          </template>

          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                v-model="searchQuery"
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
                label="Tanggal"
                class="w-[150px]"
                v-model="startDateFilter"
              />
              <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
              <CustomDatePicker
                :showLabel="false"
                class="mt-auto w-[150px]"
                v-model="endDateFilter"
              />
              <CustomButton
                @click="searchData"
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
        <NoData v-if="!hasData" />
        <DataTable
          :value="kunjunganPayload"
          :key="kunjunganPayload.length"
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
              <div class=" text-SM">
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
              <div class=" text-SM">
                <div>{{ slotProps.data.noRm }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="name"
            header="Nama Pasien"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
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
            field="lokasi.name"
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
            field="paymentMethod"
            header="Cara Bayar"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-SM">
                {{ slotProps.data.paymentMethod === 1 ? "Tunai" : "Asuransi" }}
              </div>
            </template>
          </Column>
          <Column
            field="total"
            header="Total"
            header-class="text-black bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="text-right text-SM">
                {{ formatPrice(slotProps.data.grandTotalLab) }}
              </div>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3 -mx-3 -my-1.5 bg-adameds-75">
              <DataTable
                :value="[cloneData(slotProps.data)]"
                class="overflow-hidden rounded-lg"
                :pt="{ headerRow: 'text-SM' }"
              >
                <Column
                  field="dokter"
                  header="Dokter"
                  header-class=" bg-adameds-50"
                >
                  <template #body="{ data }">
                    <div>
                      {{ data.dokterPengirim?.pegawai?.name ?? "-" }}
                    </div>
                  </template>
                </Column>
                <Column
                  field="petugas"
                  header="Petugas"
                  header-class=" bg-adameds-50"
                >
                  <template #body="{ data }">
                    <div>{{ data.petugasOrder ?? "-" }}</div>
                  </template>
                </Column>
                <Column
                  field="tarifPemeriksaan"
                  header="Tarif Pemeriksaan"
                  header-class="bg-adameds-50"
                >
                  <template #body="{ data }">
                    <div
                      v-if="
                        data.orderLabPemeriksaan &&
                        data.orderLabPemeriksaan.length > 0
                      "
                    >
                      <div
                        v-for="(item, index) in data.orderLabPemeriksaan"
                        :key="index"
                        class="text-SM"
                      >
                       <span class="mt-2">{{ item.tarifLab?.name || "-" }}</span>
                      </div>
                    </div>
                    <div v-else>-</div>
                  </template>
                </Column>
                <Column
                  field="hargaPemeriksaan"
                  header="Harga Pemeriksaan"
                  header-class=" bg-adameds-50"
                >
                  <template #body="{ data }">
                    <div
                      v-if="
                        data.orderLabPemeriksaan &&
                        data.orderLabPemeriksaan.length > 0
                      "
                    >
                      <div
                        v-for="(item, index) in data.orderLabPemeriksaan"
                        :key="index"
                        class="text-SM"
                      >
                        {{ formatPrice(item.tarifLab?.grandTotal) || "-" }}
                      </div>
                    </div>
                    <div v-else>-</div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
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
          <CustomPaginator
            :rows="kunjunganProperties.page_size"
            :totalRecords="kunjunganProperties.total"
            :rowsPerPageOptions="[10, 20, 30]"
            @page="handlePage"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
