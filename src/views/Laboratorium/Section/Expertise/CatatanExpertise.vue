<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";

const testEditor = ref<string>("");
const submitForm = () => {
  console.log("Submited Catatan");
};
defineExpose({
  submitForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" initial-state="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <p class="leading-10 text-bold text-heading">Catatan Expertise</p>
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
        <div>
          <CustomCkEditor v-model="testEditor" :show-label="false" />
        </div>
      </div>
    </template>
    <template #collapseIcon>
      <CustomButton
        icon="PhCaretUp"
        backgroundColor="bg-transparent"
        textColor="text-adameds-300"
      />
    </template>
    <template #expandIcon>
      <CustomButton
        icon="PhCaretDown"
        backgroundColor="bg-transparent"
        textColor="text-adameds-300"
      />
    </template>
  </CustomAccordion>
</template>
