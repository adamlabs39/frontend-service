<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useLokasiStore } from "@/stores/datamaster/lokasi";
import { useRevenueRecapStore } from "@/stores/laporanFarmasi/revenueRecap";
import { utilsStore } from "@/stores/utils";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import NoData from "@/components/section/NoData.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const metodePembayaran = ref("")
const optionPembayaran = ref([
  { label: "Semua", value: "" },
  { label: "Tunai", value: 1 },
  { label: "Asuransi", value: 2 },
]);

// State Management Lokasi
const lokasiStore = useLokasiStore();
const lokasiPayload = ref<any[]>([]);
const lokasiProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Fetch Lokasi
const fetchLokasi = async () => {
  try {
    const response = await lokasiStore.getApi(
      lokasiProperties.value.page,
      lokasiProperties.value.page_size
    );

    if (response && response.payload) {
      lokasiProperties.value.total = response.properties.total;
      lokasiPayload.value = response.payload;
    } else {
      lokasiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    lokasiPayload.value = [];
  }
};

// State Management Revenue Recap
const revenueRecapStore = useRevenueRecapStore();
const UseUtilsStore = utilsStore();
const revenueRecapPayload = ref<any[]>([]);
const revenueRecapProperties = ref({
  page: 1,
  page_size: 10,
  total: 0,
});

// Check if Data Exists
const hasData = computed(
  () => revenueRecapPayload.value && revenueRecapPayload.value.length > 0
);

// Fetch Revenue Recap
const fetchRevenueRecap = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await revenueRecapStore.getApi(
      revenueRecapProperties.value.page,
      revenueRecapProperties.value.page_size
    );

    if (response && response.payload) {
      revenueRecapProperties.value.total = response.properties.total;
      revenueRecapPayload.value = response.payload;
    } else {
      revenueRecapPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    revenueRecapPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

onMounted(() => {
  fetchRevenueRecap()
  fetchLokasi();
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
                    Rekap Pendapatan Resep Per Apotik
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomSelect
                v-model="metodePembayaran"
                label="Metode Pembayaran"
                placeHolder="Semua"
                class="mr-5 grow"
                optionLabel="label"
                optionValue="value"
                :options="optionPembayaran"
              />
              <CustomSelect
                label="Lokasi Stok"
                class="mr-5 grow"
                optionLabel=""
                optionValue=""
                :options="lokasiPayload"
              />
              <CustomDatePicker
                v-model="startDateFilter"
                :maxDate="endDateFilter"
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
          :value="revenueRecapPayload"
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
          class="text-SM"
        >
          <Column field="nomor" headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold">No.</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{}}</div>
              </div>
            </template>
          </Column>
          <Column field="tanggal" header="Tanggal" headerClass="bg-adameds-50">
          </Column>
          <Column
            field="stock_location"
            header="Lokasi Stok"
            headerClass="bg-adameds-50"
          >
          </Column>
          <Column
            field="pembayaran"
            header="Metode Pembayaran"
            headerClass="bg-adameds-50"
          >
          </Column>
          <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50">
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="flex items-center">
            <CustomButton
              @click="() => {}"
              icon="PhPrinter"
              label="Cetak"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <CustomPaginator />
        </div>
      </template>
    </Card>
  </div>
</template>
