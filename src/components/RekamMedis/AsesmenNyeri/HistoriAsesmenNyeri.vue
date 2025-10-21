<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";
import { computed } from 'vue';

const props = defineProps({
  history: {
    type: Object,
    default: null,
  },
});

const getStringSkalaNyeri = computed(() => {
  if (!props.history || typeof props.history.skalaNyeri === 'undefined') {
    return '';
  }
  const skala = props.history.skalaNyeri;
  if (skala >= 1 && skala <= 3) {
    return `3 (Ringan)`;
  } else if (skala >= 4 && skala <= 6) {
    return `5 (Sedang)`;
  } else if (skala >= 7 && skala <= 10) {
    return `8 (Berat)`;
  }
  return `${skala}`;
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
          <CustomInfoRow
            label="Pengkajian Nyeri"
            :value="getStringSkalaNyeri"
            type="vertical"
          />
          <CustomInfoRow
            label="Catatan"
            :value="history.catatan"
            type="vertical"
          />
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow
              label="Petugas Input"
              :value="history.petugas"
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