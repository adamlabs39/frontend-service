<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Asuhan Keperawatan</template>
    <template #content>
      <div class="pt-5">
        <CustomCkEditor v-if="props.method=='form'"  label="Diagnosis Perawat" />
        <div v-if="props.method=='detail'" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Diagnosis Perawat" value="DB/Tipes"/>
        <hr class="border-grey-200">
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
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
