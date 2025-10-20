<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";

const props = defineProps({
  history: {
    type: Object,
    default: null,
  },
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
            label="Berat Badan"
            :value="`${history.beratBadan || 0} Kg`"
            type="vertical"
          />
          <CustomInfoRow
            label="Tinggi Badan"
            :value="`${history.tinggiBadan || 0} Cm`"
            type="vertical"
          />
          <CustomInfoRow
            label="IMT"
            :value="`${history.imt || 0} Kg/m²`"
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