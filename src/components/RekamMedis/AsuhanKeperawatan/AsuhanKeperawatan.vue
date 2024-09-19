<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
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

const isEditing = ref(props.method === "form");

const schema = toTypedSchema(
  yup.object({
    diagnosaPerawat: yup.string(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [diagnosaPerawat] = defineField("diagnosaPerawat");
const [petugas] = defineField("petugas");

onBeforeMount(async () => {
  setValues({ 
    diagnosaPerawat:"DB/Tipes",
    petugas: "Adam" });
});

const onSubmit = handleSubmit((values: any) => {
  console.log("Adding new data:", values);
  isEditing.value = false;

});

const toggleEdit = () => {
  isEditing.value = true;
};
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Asuhan Keperawatan</template>
    <template #content>
      <div class="pt-5">
        <CustomCkEditor v-if="isEditing" label="Diagnosis Perawat" v-model="diagnosaPerawat" />
        <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow label="Diagnosis Perawat" :value="diagnosaPerawat" />
          <hr class="border-grey-200" />
          <CustomInfoRow label="Petugas Input" :value="petugas" />
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
        <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit" />
        <CustomButton v-if="!isEditing" label="Edit" @click="toggleEdit" />
      </div>
    </template>
  </CustomAccordion>
</template>
