<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";
import { computed } from 'vue';
import type { PropType } from 'vue';

interface KesadaranHistoryItem {
  eye: number;
  motorik: number;
  verbal: number;
  gcsScore: number;
  gcsKesimpulan: string;
  petugas: string;
  createdAt: number;
}

const props = defineProps({
  history: {
    type: Object as PropType<KesadaranHistoryItem | null>,
    default: null,
  },
});

const kesadaranLabels = {
  eye: [
    "Spontan merespon",
    "Ada respon dengan rangsang suara",
    "Ada respon dengan rangsang nyeri",
    "Tidak ada respon",
  ],
  motorik: [
    "Mengikuti perintah",
    "Melokalisir nyeri",
    "Fleksi normal",
    "Fleksi abnormal",
    "Ekstensi abnormal",
    "Tidak ada respon",
  ],
  verbal: [
    "Orientasi baik",
    "Bingung berbicara",
    "Kata-kata tidak jelas",
    "Suara tanpa arti (mengarang)",
    "Tidak ada respon",
  ],
};

const eyeLabel = computed(() => {
  if (!props.history || !props.history.eye) return "-";
  return kesadaranLabels.eye[props.history.eye - 1] || "-";
});

const motorikLabel = computed(() => {
  if (!props.history || !props.history.motorik) return "-";
  return kesadaranLabels.motorik[props.history.motorik - 1] || "-";
});

const verbalLabel = computed(() => {
  if (!props.history || !props.history.verbal) return "-";
  return kesadaranLabels.verbal[props.history.verbal - 1] || "-";
});

</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
      <template #header>
        {{ epochToDate(history.createdAt, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow label="Mata" :value="eyeLabel" type="vertical" />
          <CustomInfoRow label="Motorik" :value="motorikLabel" type="vertical" />
          <CustomInfoRow label="Verbal" :value="verbalLabel" type="vertical" />
          <CustomInfoRow label="Kesimpulan GCS" :value="history.gcsKesimpulan" type="vertical" />
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow label="Petugas Input" :value="history.petugas" type="vertical" />
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