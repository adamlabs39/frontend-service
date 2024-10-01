<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <CustomInfoRow label="Primer" value="ICD-10" type="vertical" />
        <div class="flex">
          <PhArrowElbowDownRight
            :size="20"
            weight="bold"
            class="my-auto mr-[5px] text-adameds-300"
          />
          <CustomInfoRow
            label="Diagnosis Diferensial"
            value="ICD-10"
            type="vertical"
          />
        </div>
        <CustomInfoRow label="Sekunder" value="ICD-10" type="vertical" />
        <div class="flex">
          <PhArrowElbowDownRight
            :size="20"
            weight="bold"
            class="my-auto mr-[5px] text-adameds-300"
          />
          <CustomInfoRow
            label="Diagnosis Diferensial"
            value="ICD-10"
            type="vertical"
          />
        </div>
        <CustomInfoRow label="Sekunder" value="ICD-10" type="vertical" />
        <div class="flex">
          <PhArrowElbowDownRight
            :size="20"
            weight="bold"
            class="my-auto mr-[5px] text-adameds-300"
          />
          <CustomInfoRow
            label="Diagnosis Diferensial"
            value="ICD-10"
            type="vertical"
          />
        </div>
        <hr class="border-grey-200" />
        <div class="flex justify-between">
          <CustomInfoRow
            label="Petugas Input"
            value="Nama Petugas"
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
