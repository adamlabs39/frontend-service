<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <CustomInfoRow
          label="Mata"
          :value="`getLabelFromValue(eye, opsiKesadaran[0].response)`"
          type="vertical"
        />
        <CustomInfoRow
          label="Motorik"
          :value="`getLabelFromValue(motorik, opsiKesadaran[1].response)`"
          type="vertical"
        />
        <CustomInfoRow
          label="Verbal"
          :value="`getLabelFromValue(verbal, opsiKesadaran[2].response)`"
          type="vertical"
        />
        <CustomInfoRow
          label="Kesimpulan GCS"
          :value="`GCS_kesimpulan`"
          type="vertical"
        />
        <hr class="border-grey-200" />
        <div class="flex justify-between">
          <CustomInfoRow
            label="Petugas Input"
            :value="`petugas`"
            type="vertical"
          />
          <CustomInfoRow
            label="Jam Input"
            :value="`petugas`"
            type="vertical"
            alignment="right"
          />
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
