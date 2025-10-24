<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomInfoRow from '@/components/Base/CustomInfoRow.vue';
import { epochToDate } from "@/utils/Helpers"; 
import type { PropType } from 'vue'; 

interface TemuanLainnyaHistoryItem {
  temuanLainnya: string;
  petugas: string;
  createdAt: number;
}

const props = defineProps({
  history: {
    type: Object as PropType<TemuanLainnyaHistoryItem | null>,
    default: null,
  },
});
</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" initialState="0">
      <template #header>
        {{ epochToDate(history.createdAt, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div class="py-5 flex flex-col gap-[10px]">
          <CustomInfoRow label="Temuan Lainnya" :value="history.temuanLainnya || '-'" />
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow
              label="Petugas Input"
              :value="history.petugas || '-'"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="String(epochToDate(history.createdAt, 'time'))"
              type="vertical"
              alignment="right"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>
  </div>
  <div v-else class="text-center p-4 text-grey-400">
    Tidak ada data riwayat.
  </div>
</template>
