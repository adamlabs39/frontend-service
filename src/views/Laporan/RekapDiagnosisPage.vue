<script setup lang="ts">
import { ref, computed } from "vue";
import HeaderFilter from "./Layout/HeaderFilter.vue";
import FooterPaginator from "./Layout/FooterPaginator.vue";
import NoData from "@/components/section/NoData.vue";
const tindakanPayload = ref([
  {
    kode: "Pemeriksaan TTV",
    diagnosis: "Rawat Jalan",
    kurang1Thn: { laki: 10, perempuan: 5 },
    kurang4Thn: { laki: 10, perempuan: 5 },
    kurang14Thn: { laki: 10, perempuan: 5 },
    kurang24Thn: { laki: 10, perempuan: 5 },
    kurang44Thn: { laki: 10, perempuan: 5 },
    kurang64Thn: { laki: 10, perempuan: 5 },
    lebih65Thn: { laki: 10, perempuan: 5 },
  },
  {
    kode: "Pemeriksaan TTV",
    diagnosis: "Rawat Jalan",
    kurang1Thn: { laki: 10, perempuan: 5 },
    kurang4Thn: { laki: 10, perempuan: 5 },
    kurang14Thn: { laki: 10, perempuan: 5 },
    kurang24Thn: { laki: 10, perempuan: 5 },
    kurang44Thn: { laki: 10, perempuan: 5 },
    kurang64Thn: { laki: 10, perempuan: 5 },
    lebih65Thn: { laki: 10, perempuan: 5 },
  },
  {
    kode: "Pemeriksaan TTV",
    diagnosis: "Rawat Jalan",
    kurang1Thn: { laki: 10, perempuan: 5 },
    kurang4Thn: { laki: 10, perempuan: 5 },
    kurang14Thn: { laki: 10, perempuan: 5 },
    kurang24Thn: { laki: 10, perempuan: 5 },
    kurang44Thn: { laki: 10, perempuan: 5 },
    kurang64Thn: { laki: 10, perempuan: 5 },
    lebih65Thn: { laki: 10, perempuan: 5 },
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

const optionGender = ref([
  {
    value: "laki",
    label: "Laki-Laki",
  },
  { value: "perempuan", label: "Perempuan" },
]);

const selectedKunjungan = ref("");
const selectedGender = ref("");
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const handleSelectedKunjungan = (value: any) => {
  selectedKunjungan.value = value;
};
const handleSelectedGender = (value: string) => {
  selectedGender.value = value;
};

const handleStartDate = (value: any) => {
  startDateFilter.value = value;
};
const handleEndDate = (value: any) => {
  endDateFilter.value = value;
};
const resetFormRef = ref();
const resetFilter = () => {
  selectedKunjungan.value = "";
  selectedGender.value = "";
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
        pageType="rekapitulasi-diagnosis"
        @update:selected-filter="handleSelectedKunjungan"
        @update:selected-filter-second="handleSelectedGender"
        @update:startDateFilter="handleStartDate"
        @update:endDateFilter="handleEndDate"
        :selectOption="optionKunjungan"
        :selectOptionSecond="optionGender"
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
        <Column field="kode" header="Kode" headerClass="bg-adameds-50"></Column>
        <Column
          class="w-1/3"
          field="diagnosis"
          header="Diagnosis"
          headerClass="bg-adameds-50"
        ></Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">&lt;1 Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.kurang1Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.kurang1Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">1-4 Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.kurang4Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.kurang4Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">5-14 Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.kurang14Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.kurang14Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">15-24 Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.kurang24Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.kurang24Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">25-44 Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.kurang44Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.kurang44Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">45-64 Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.kurang64Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.kurang64Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 font-semibold text-SM">
          <template #header>
            <div class="flex items-center justify-center w-full">65+ Thn</div>
          </template>
          <template #body="slotProps">
            <div class="flex flex-col items-center w-full">
              <div class="flex">
                LK <ArrowRightBrokenIcon class="text-blue-300" />
                {{ slotProps.data.lebih65Thn.laki }}
              </div>
              <div class="flex">
                PR <ArrowRightBrokenIcon class="text-female-300" />
                {{ slotProps.data.lebih65Thn.perempuan }}
              </div>
            </div>
          </template>
        </Column>
      </DataTable>
      <NoData v-else />
    </template>
    <template #footer>
      <FooterPaginator :rows="2" :totalRecords="20" />
    </template>
  </Card>
</template>
