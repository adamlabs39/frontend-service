<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";
import { computed } from 'vue';
import type { PropType } from 'vue'; 
import { PhArrowElbowDownRight } from "@phosphor-icons/vue";

// Interface untuk item di dalam array 'data'
interface DiagnosisItem {
  tipe: string;
  diagnosis: string;
  diferensial?: string;
  petugas: string;
  createdAt: number; // Menggunakan snake_case sesuai respons API
}

// Interface untuk prop 'history' yang diterima
interface HistoryObject {
  date: number;
  data: DiagnosisItem[];
}

const props = defineProps({
  history: {
    type: Object as PropType<HistoryObject | null>,
    default: null,
  },
});

const diagnosisData = computed(() => props.history?.data || []);

const primerDiagnosis = computed(() => {
  return diagnosisData.value.find(item => item.tipe === 'primer');
});

const sekunderDiagnosis = computed(() => {
  return diagnosisData.value.filter(item => item.tipe === 'sekunder');
});

const lastEntry = computed(() => {
    if (diagnosisData.value.length === 0) return null;
    return diagnosisData.value[diagnosisData.value.length - 1];
});

</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>
      {{ epochToDate(history.date, 'date') || "Data Riwayat" }}
    </template>
    <template #content>
      <div v-if="diagnosisData.length > 0" class="py-5 flex flex-col gap-[10px]">
        
        <div v-if="primerDiagnosis">
          <CustomInfoRow 
            label="Primer" 
            :value="primerDiagnosis.diagnosis" 
            type="vertical" 
          />
          <div class="flex mt-2" v-if="primerDiagnosis.diferensial">
            <PhArrowElbowDownRight
              :size="20"
              weight="bold"
              class="my-auto mr-[5px] text-adameds-300"
            />
            <CustomInfoRow
              label="Diagnosis Diferensial"
              :value="primerDiagnosis.diferensial"
              type="vertical"
            />
          </div>
        </div>
        
        <div v-for="(sekunder, index) in sekunderDiagnosis" :key="index" class="mt-2">
           <CustomInfoRow 
            label="Sekunder" 
            :value="sekunder.diagnosis" 
            type="vertical" 
          />
          <div class="flex mt-2" v-if="sekunder.diferensial">
            <PhArrowElbowDownRight
              :size="20"
              weight="bold"
              class="my-auto mr-[5px] text-adameds-300"
            />
            <CustomInfoRow
              label="Diagnosis Diferensial"
              :value="sekunder.diferensial"
              type="vertical"
            />
          </div>
        </div>

        <hr class="border-grey-200 mt-4" />
          <div class="flex justify-between">
            <CustomInfoRow label="Petugas Input" :value="lastEntry?.petugas" type="vertical" />
            <CustomInfoRow
              label="Jam Input"
              :value="String(epochToDate(lastEntry?.createdAt ?? 0, 'time'))"
              type="vertical"
              alignment="right"
            />
          </div>
      </div>
       <div v-else class="text-center py-5 text-grey-400">
        Tidak ada riwayat.
      </div>
    </template>
    </CustomAccordion>
  </div>
  <div v-else class="text-center p-4 text-grey-400">
    Tidak ada data riwayat.
  </div>
</template>