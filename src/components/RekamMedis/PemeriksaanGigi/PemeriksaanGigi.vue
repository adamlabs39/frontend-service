<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import OdontogramInput from "./OdontogramInput.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>Pemeriksaan Gigi</template>
    <template #content>
      <div class="pt-5">
        <OdontogramInput />
      </div>
    </template>
  </CustomAccordion>
</template>
