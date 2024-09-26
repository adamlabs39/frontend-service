<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Temuan Lainnya</template>
    <template #content>
      <div class="pt-5">
        <CustomTextArea
          v-if="method == 'form'"
          label="Temuan Lainnya"
          placeholder="Masukkan Temuan Lainnya..."
        />
        <CustomInfoRow v-else label="Temuan Lainnya" value="-" />
      </div>
    </template>
  </CustomAccordion>
</template>
