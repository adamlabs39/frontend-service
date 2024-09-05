<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Order Lab</template>
    <template #content>
        <div class="flex flex-col mt-5 gap-5">
            <CustomDatePicker label="Tgl. Pemeriksaan Lab"/>
            <div class="font-semibold text-MD mt-5">Kategori</div>
            <hr class="border-grey-200 ">
            <CustomAccordion headerClass="bg-adameds-50">
                <template #header>HEMATOLOGI</template>
                <template #content>Test</template>
            </CustomAccordion>
        </div>
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
