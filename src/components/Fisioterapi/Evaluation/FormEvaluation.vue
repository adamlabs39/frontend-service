<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import { ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const evaluation = ref();
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Evaluation</template>
    <template #content>
      <div v-if="props.method == 'form'" class="gap-[30px] py-3">
        <CustomTextArea
          v-model="evaluation"
          label="Evaluasi"
          placeholder="Ketik Evaluasi ..."
        />
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Evaluasi" value="Nama Evaluasi" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-adameds-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-adameds-300"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton v-if="props.method == 'detail'" label="Edit" />
      </div>
    </template>
  </CustomAccordion>
</template>
