<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";
import type { PropType } from 'vue';

interface AsuhanData {
  diagnosaPerawat: string;
  petugas: string;
  createdAt: number;
}

interface HistoryObject {
  date: number;
  data: AsuhanData;
}

const props = defineProps({
  history: {
    type: Object as PropType<HistoryObject | null>,
    default: null,
  },
});
</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
      <template #header>
        {{ epochToDate(history.date, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div v-if="history.data" class="py-5 flex flex-col gap-[19px]">
          <div class="flex flex-col gap-1">
            <label class="font-semibold text-sm text-grey-400">Diagnosis Perawat</label>
            <div
              class="prose max-w-none text-sm text-grey-500"
              v-html="history.data.diagnosaPerawat"
            ></div>
          </div>
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow
              label="Petugas Input"
              :value="history.data.petugas"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="String(epochToDate(history.data.createdAt, 'time'))"
              type="vertical"
              alignment="right"
            />
          </div>
        </div>
        <div v-else class="text-center py-5 text-grey-400">
          Tidak ada data riwayat.
        </div>
      </template>
    </CustomAccordion>
  </div>
  <div v-else class="text-center p-4 text-grey-400">
    Tidak ada data riwayat.
  </div>
</template>