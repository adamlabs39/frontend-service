<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});
const catatan = ref();
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Instruksi Medis</template>
    <template #content>
      <CustomTextArea
        v-if="props.method == 'form'"
        v-model="catatan"
        class="grow pt-5"
        label="Catatan"
        placeholder="Ketik Catatan ..."
      />
      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Catatan" value="Sehat sehat orang baik" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton v-if="props.method == 'detail'" label="Edit" />
      </div>
    </template>
  </CustomAccordion>
</template>
