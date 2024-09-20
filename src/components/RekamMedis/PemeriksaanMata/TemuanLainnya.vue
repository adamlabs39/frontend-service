<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Temuan Lainnya</template>
    <template #content>
      <div class="pt-5">
        <CustomTextArea
          label="Temuan Lainnya"
          placeholder="Masukkan Temuan Lainnya..."
        />
      </div>
    </template>
  </CustomAccordion>
</template>
