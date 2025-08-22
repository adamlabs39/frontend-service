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
});

const dataAntrianFarmasiProperties = ref({
  page: 1,
  limit: 10,
  totalData: 0,
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

const handleUpdateTotalData = (totalData: number) => {
  dataAntrianRjProperties.value.totalData = totalData;
};

// Tangkap event search dari header: hanya berlaku saat tab Rawat Jalan aktif
const handleHeaderSearch = (q: string, statuses?: string[]) => {
  if (value.value === "1") {
    dataAntrianRjProperties.value.q = q;
    dataAntrianRjProperties.value.status_antrian = statuses ?? [];
    dataAntrianRjProperties.value.page = 1; // reset ke page 1 saat pencarian
  }
};

// Event dari header untuk rentang tanggal (epoch seconds)
const handleHeaderDateRange = (start?: number | null, end?: number | null) => {
  if (value.value === "1") {
    dataAntrianRjProperties.value.start_date = start ?? undefined;
    dataAntrianRjProperties.value.end_date = end ?? undefined;
    dataAntrianRjProperties.value.page = 1;
  }
};

// Default epoch untuk rawat jalan
const DEFAULT_START = 1128557830;
const DEFAULT_END = 1999999999;

// Reset q ketika berpindah tab ke selain Rawat Jalan
watch(
  () => value.value,
  (newVal) => {
    if (newVal === "1") {
      // Saat masuk tab Rawat Jalan: set default jika belum ada
      dataAntrianRjProperties.value.start_date =
        dataAntrianRjProperties.value.start_date ?? DEFAULT_START;
      dataAntrianRjProperties.value.end_date =
        dataAntrianRjProperties.value.end_date ?? DEFAULT_END;
    } else {
      // Selain Rawat Jalan: kosongkan agar tidak ditampilkan di header
      dataAntrianRjProperties.value.start_date = undefined;
      dataAntrianRjProperties.value.end_date = undefined;
      dataAntrianRjProperties.value.q = "";
      // Kosongkan status saat pindah tab
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
        :startDateEpoch="dataAntrianRjProperties.start_date"
        :endDateEpoch="dataAntrianRjProperties.end_date"
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
            <SectionAntrianAdmisi />
          </TabPanel>
          <TabPanel value="1">
            <SectionAntrianRawatJalan
              :paginationProperties="dataAntrianRjProperties"
              @updateTotalData="handleUpdateTotalData"
            />
          </TabPanel>
          <TabPanel value="2">
            <SectionAntrianFarmasi />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <CustomPaginator
        class="ml-auto"
        :rows="currentPaginationProperties.limit"
        :totalRecords="currentPaginationProperties.totalData"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="handlePage"
      />
    </template>
  </Card>
</template>
