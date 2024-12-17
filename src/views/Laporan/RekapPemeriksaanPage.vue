<script setup lang="ts">
import { ref, computed } from "vue";
import HeaderFilter from "./Layout/HeaderFilter.vue";
import FooterPaginator from "./Layout/FooterPaginator.vue";
import NoData from "@/components/section/NoData.vue";
const tindakanPayload = ref([
  {
    tindakan: "Pemeriksaan TTV",
    jenisKunjungan: "Rawat Jalan",
    metode: "Tunai",
    total: 5,
  },
  {
    tindakan: "Pemeriksaan TTV",
    jenisKunjungan: "Rawat Jalan",
    metode: "Tunai",
    total: 5,
  },
  {
    tindakan: "Pemeriksaan TTV",
    jenisKunjungan: "Rawat Jalan",
    metode: "Tunai",
    total: 5,
  },
]);

const optionKunjungan = ref([
  {
    uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
    name: "Rawat Jalan",
  },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6089", name: "Rawat Inap" },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6067", name: "IGD" },
]);

const optionBayar = ref([
  {
    uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
    name: "Tunai",
  },
  { uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a6089", name: "BPJS" },
]);

const selectedKunjungan = ref("");
const selectedMetodeBayar = ref("");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchQuery = ref("");

const handleSelectedKunjungan = (value: any) => {
  selectedKunjungan.value = value;
};
const handleSelectedMetode = (value: string) => {
  selectedMetodeBayar.value = value;
};
const handleSearchQuery = (value: string) => {
  searchQuery.value = value;
};
const handleStartDate = (value: any) => {
  startDateFilter.value = value;
};
const handleEndDate = (value: any) => {
  endDateFilter.value = value;
};
const resetFormRef = ref();
const resetFilter = () => {
  searchQuery.value = "";
  selectedKunjungan.value = "";
  selectedMetodeBayar.value = "";
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  resetFormRef.value.resetForm();
};
</script>
<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
  >
    <template #header>
      <HeaderFilter
        pageType="rekapitulasi-pemeriksaan"
        @update:selected-filter="handleSelectedKunjungan"
        @update:selected-filter-second="handleSelectedMetode"
        @update:valueSearch="handleSearchQuery"
        @update:startDateFilter="handleStartDate"
        @update:endDateFilter="handleEndDate"
        :selectOption="optionKunjungan"
        :selectOptionSecond="optionBayar"
        @reset="resetFilter"
        ref="resetFormRef"
      />
    </template>
    <template #content>
      <DataTable
        v-if="tindakanPayload.length"
        :value="tindakanPayload"
        tableStyle="min-width: 50rem"
        stripedRows
        scrollable
        scrollHeight="flex"
        class="text-xs"
        :dt="{
          rowSelectedColor: '#000000',
          rowSelectedBackground: 'transparent',
          bodyCellSelectedBorderColor: 'transparent',
          bodyCellBorderColor: 'transparent',
          rowStripedBackground: '#F8F8F8',
        }"
      >
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="tindakan"
          header="Tindakan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="jenisKunjungan"
          header="Jenis Kunjungan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="metode"
          header="Metode Pembayaran"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          class="w-1/4"
          field="total"
          header="Total Pasien"
          headerClass="bg-adameds-50"
        ></Column>
      </DataTable>
      <NoData v-else />
    </template>
    <template #footer>
      <FooterPaginator :rows="2" :totalRecords="20" />
    </template>
  </Card>
</template>
