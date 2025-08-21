<script lang="ts" setup>
import { ref, watch } from "vue";
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
});

// Handler untuk pagination rawat jalan
const handlePage = (event: any) => {
  dataAntrianRjProperties.value.page = event.page + 1;
  dataAntrianRjProperties.value.limit = event.rows;
  // Panggil fungsi fetch data sesuai tab yang aktif
  if (value.value === "1") {
    // Fetch data rawat jalan
    // fetchDataAntrianRj();
  }
};

const handleUpdateTotalData = (totalData: number) => {
  dataAntrianRjProperties.value.totalData = totalData;
};
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
        :rows="dataAntrianRjProperties.limit"
        :totalRecords="dataAntrianRjProperties.totalData"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="handlePage"
      />
    </template>
  </Card>
</template>
