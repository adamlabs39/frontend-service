<script setup lang="ts">
import { computed, ref, type PropType } from "vue";
import type { MenuItem } from "primevue/menuitem";
import { useForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  formType: {
    type: String,
    default: "",
  },
  isDetail: {
    type: Boolean,
    required: false,
  },
  openedPatientData: {
    type: Object as PropType<any>,
    required: true,
  },
});

const schema = yup.object({
  catatanExpertise: yup
    .string()
    .transform((value) => {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = value ?? "";
      return tempElement.textContent || "";
    })
    .optional(),
});

const { errors, handleSubmit, defineField, setFieldValue } = useForm({
  validationSchema: schema,
});

const [catatanExpertise, catatanExpertiseAttrs] =
  defineField("catatanExpertise");

const onSubmit = handleSubmit((values) => {
  console.log("Submitted Values:", values);
  return values;
});

defineExpose({
  onSubmit,
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
          <CustomCkEditor
            :model-value="openedPatientData.catatanExpertise"
            v-bind="catatanExpertiseAttrs"
            :show-label="false"
            @update:model-value="setFieldValue('catatanExpertise', $event)"
          />
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
