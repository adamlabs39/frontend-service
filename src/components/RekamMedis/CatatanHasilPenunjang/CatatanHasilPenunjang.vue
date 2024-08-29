<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";

const catatan=ref()

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Catatan Hasil Penunjang</template>
    <template #content>
        <CustomTextArea v-model="catatan" class="grow pt-5" label="Catatan" placeholder="Ketik Catatan ..." />

    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomAccordion>
</template>
