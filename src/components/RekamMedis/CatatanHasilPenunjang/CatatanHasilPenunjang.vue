<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const isEditing = ref(props.method === "form");

const schema = toTypedSchema(
  yup.object({
    catatan: yup.string(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [catatan] = defineField("catatan");
const [petugas] = defineField("petugas");

onBeforeMount(async () => {
  setValues({ petugas: "Adam" });
});

const onSubmit = handleSubmit((values: any) => {
  console.log("Adding new data:", values);
});

const toggleEdit = () => {
  isEditing.value = true;
};

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Catatan Hasil Penunjang</template>
    <template #content>
      <div class="pt-5">
        <CustomCkEditor
          v-if="isEditing"
          label="Catatan Hasil Penunjang"
          v-model="catatan"
        />
        <div
          v-if="!isEditing"
          class="py-5 flex flex-col gap-[19px]"
        >
          <CustomInfoRow label="Catatan Hasil Penunjang" value="Sehat sehat orang baik" />
          <hr class="border-grey-200" />
          <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="isEditing"
          @click="resetForm"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit"/>
        <CustomButton v-if="!isEditing" label="Edit" @click="toggleEdit"/>
      </div>
    </template>
  </CustomAccordion>
</template>
