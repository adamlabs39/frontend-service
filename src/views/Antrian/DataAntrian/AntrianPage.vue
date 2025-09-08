<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import AntrianHeader from "../Layout/AntrianHeader.vue";
import SectionAntrianAdmisi from "./SectionAntrianAdmisi.vue";
import SectionAntrianRawatJalan from "./SectionAntrianRawatJalan.vue";
import SectionAntrianFarmasi from "./SectionAntrianFarmasi.vue";
import AntrianFooter from "../Layout/AntrianFooter.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const value = ref("0");

const dataAntrianRjProperties = ref({
  page: 1,
  limit: 10,
  totalData: 0,
  q: "",
  start_date: undefined as number | undefined,
  end_date: undefined as number | undefined,
  status_antrian: [] as string[],
});

const dataAntrianAdmisiProperties = ref({
  page: 1,
  limit: 10,
  totalData: 0,
  q: "",
  start_date: undefined as number | undefined,
  end_date: undefined as number | undefined,
  status_antrian: [] as string[],
});

const dataAntrianFarmasiProperties = ref({
  page: 1,
  limit: 10,
  totalData: 0,
  q: "",
  start_date: undefined as number | undefined,
  end_date: undefined as number | undefined,
  status_antrian: [] as string[],
});

const currentPaginationProperties = computed(() => {
  switch (value.value) {
    case "0":
      return dataAntrianAdmisiProperties.value;
    case "1":
      return dataAntrianRjProperties.value;
    case "2":
      return dataAntrianFarmasiProperties.value;
    default:
      return dataAntrianAdmisiProperties.value;
  }
});

const currentStartDateEpoch = computed(() => {
  switch (value.value) {
    case "0":
      return dataAntrianAdmisiProperties.value.start_date;
    case "1":
      return dataAntrianRjProperties.value.start_date;
    case "2":
      return dataAntrianFarmasiProperties.value.start_date;
    default:
      return undefined;
  }
});

const currentEndDateEpoch = computed(() => {
  switch (value.value) {
    case "0":
      return dataAntrianAdmisiProperties.value.end_date;
    case "1":
      return dataAntrianRjProperties.value.end_date;
    case "2":
      return dataAntrianFarmasiProperties.value.end_date;
    default:
      return undefined;
  }
});

// Handler untuk pagination rawat jalan
const handlePage = (event: any) => {
  const newPage = event.page + 1;
  const newLimit = event.rows;

  switch (value.value) {
    case "0":
      // Admisi
      dataAntrianAdmisiProperties.value.page = newPage;
      dataAntrianAdmisiProperties.value.limit = newLimit;
      break;
    case "1":
      // Rawat Jalan
      dataAntrianRjProperties.value.page = newPage;
      dataAntrianRjProperties.value.limit = newLimit;
      break;
    case "2":
      // Farmasi
      dataAntrianFarmasiProperties.value.page = newPage;
      dataAntrianFarmasiProperties.value.limit = newLimit;
      break;
  }
};

// const handleUpdateTotalData = (totalData: number) => {
//   if (value.value === "0") {
//     dataAntrianAdmisiProperties.value.totalData = totalData;
//   } else if (value.value === "1") {
//     dataAntrianRjProperties.value.totalData = totalData;
//   } else if (value.value === "2") {
//     dataAntrianFarmasiProperties.value.totalData = totalData;
//   }
// };

// Handler terpisah untuk setiap tab
const handleUpdateTotalDataAdmisi = (totalData: number) => {
  dataAntrianAdmisiProperties.value.totalData = totalData;
};

const handleUpdateTotalDataRawatJalan = (totalData: number) => {
  dataAntrianRjProperties.value.totalData = totalData;
};

const handleUpdateTotalDataFarmasi = (totalData: number) => {
  dataAntrianFarmasiProperties.value.totalData = totalData;
};

// Tangkap event search dari header: hanya berlaku saat tab Rawat Jalan aktif
const handleHeaderSearch = (q: string, statuses?: string[]) => {
  switch (value.value) {
    case "0":
      dataAntrianAdmisiProperties.value.q = q;
      dataAntrianAdmisiProperties.value.status_antrian = statuses ?? [];
      dataAntrianAdmisiProperties.value.page = 1;
      break;
    case "1":
      dataAntrianRjProperties.value.q = q;
      dataAntrianRjProperties.value.status_antrian = statuses ?? [];
      dataAntrianRjProperties.value.page = 1;
      break;
    case "2":
      dataAntrianFarmasiProperties.value.q = q;
      dataAntrianFarmasiProperties.value.status_antrian = statuses ?? [];
      dataAntrianFarmasiProperties.value.page = 1;
      break;
  }
};

// Event dari header untuk rentang tanggal (epoch seconds)
const handleHeaderDateRange = (start?: number | null, end?: number | null) => {
  switch (value.value) {
    case "0":
      dataAntrianAdmisiProperties.value.start_date = start ?? undefined;
      dataAntrianAdmisiProperties.value.end_date = end ?? undefined;
      dataAntrianAdmisiProperties.value.page = 1;
      break;
    case "1":
      dataAntrianRjProperties.value.start_date = start ?? undefined;
      dataAntrianRjProperties.value.end_date = end ?? undefined;
      dataAntrianRjProperties.value.page = 1;
      break;
    case "2":
      dataAntrianFarmasiProperties.value.start_date = start ?? undefined;
      dataAntrianFarmasiProperties.value.end_date = end ?? undefined;
      dataAntrianFarmasiProperties.value.page = 1;
      break;
  }
};

// Reset q ketika berpindah tab ke selain Rawat Jalan
watch(
  () => value.value,
  (newVal) => {
    // Reset page ke 1 untuk semua tab saat berpindah
    switch (newVal) {
      case "0":
        dataAntrianAdmisiProperties.value.page = 1;
        break;
      case "1":
        dataAntrianRjProperties.value.page = 1;
        break;
      case "2":
        dataAntrianFarmasiProperties.value.page = 1;
        break;
    }

    if (newVal === "1") {
      // start_date/end_date undefined saat pertama kali
    } else {
      // Selain Rawat Jalan: dikosongkan agar tidak ditampilkan di header
      dataAntrianRjProperties.value.start_date = undefined;
      dataAntrianRjProperties.value.end_date = undefined;
      dataAntrianRjProperties.value.q = "";
      dataAntrianRjProperties.value.status_antrian = [];
    }
  },
  { immediate: true }
);
</script>

<template>
  <Card
    pt:body:class="overflow-auto pt-0 h-full"
    pt:content:class="overflow-auto h-full"
  >
    <template #header>
      <AntrianHeader
        :activeTab="value"
        title="Data Antrian"
        :filter="false"
        :search="false"
        :startDateEpoch="currentStartDateEpoch"
        :endDateEpoch="currentEndDateEpoch"
        @search="handleHeaderSearch"
        @dateRange="handleHeaderDateRange"
      >
        <template #header>
          <div class="flex flex-row gap-2 justify-end items-center">
            <CustomButton
              label="ADMISI"
              class="w-[200px]"
              :text-color="value === '0' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '0' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '0' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '0'"
              :outlined="value !== '0'"
            />
            <CustomButton
              label="RAWAT JALAN"
              class="w-[200px]"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="FARMASI"
              class="w-[200px]"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '2' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
          </div>
        </template>
      </AntrianHeader>
    </template>
    <template #content>
      <Tabs v-model:value="value">
        <TabPanels>
          <TabPanel value="0">
            <SectionAntrianAdmisi
              :paginationProperties="dataAntrianAdmisiProperties"
              @updateTotalData="handleUpdateTotalDataAdmisi"
            />
          </TabPanel>
          <TabPanel value="1">
            <SectionAntrianRawatJalan
              :paginationProperties="dataAntrianRjProperties"
              @updateTotalData="handleUpdateTotalDataRawatJalan"
            />
          </TabPanel>
          <TabPanel value="2">
            <SectionAntrianFarmasi />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <div class="flex justify-between px-5 py-2.5">
        <CustomPaginator
          class="ml-auto"
          :key="`paginator-${value}`"
          :rows="currentPaginationProperties.limit"
          :totalRecords="currentPaginationProperties.totalData"
          :rowsPerPageOptions="[10, 20, 30]"
          @page="handlePage"
        />
      </div>
    </template>
  </Card>
</template>
