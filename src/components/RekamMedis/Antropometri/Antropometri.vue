<script lang="ts" setup>
import { ref,onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
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
const isEditing = ref(props.method === "form");
const schema = toTypedSchema(
  yup.object({
    beratBadan: yup.number(),
    tinggiBadan: yup.number(),
    IMT: yup.number(),
    catatan: yup.string(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [beratBadan] = defineField("beratBadan");
const [tinggiBadan] = defineField("tinggiBadan");
const [IMT] = defineField("IMT");
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
    <template #header>Antropometri</template>
    <template #content>
      <div v-if="isEditing" class="flex gap-[30px] pt-5">
        <CustomInputNumber v-model="beratBadan" label="Berat Badan">
            <template #appendText>
                <div class="flex items-center justify-center mr-2.5">
                    Kg
                </div>
            </template>
        </CustomInputNumber>
        <CustomInputNumber v-model="tinggiBadan" label="Tinggi Badan">
            <template #appendText>
                <div class="flex items-center justify-center mr-2.5">
                    Cm
                </div>
            </template>
        </CustomInputNumber>
        <CustomInputNumber v-model="IMT" label="IMT">
            <template #appendText>
                <div class="flex items-center justify-center mr-2.5">
                    Kg/m²
                </div>
            </template>
        </CustomInputNumber>
        <CustomTextArea v-model="catatan" class="grow" label="Catatan" placeholder="Catatan" height="h-10" />

      </div>
      <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Berat Badan" value="43 Kg"/>
        <CustomInfoRow label="Tinggi Badan" value="155 Cm" />
        <CustomInfoRow label="IMT" value="100 Kg/m²" />
        <CustomInfoRow label="Catatan" value="Normal" />
        <hr class="border-grey-200">
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
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
        <CustomButton
          v-if="isEditing"
          label="Simpan"
          @click="onSubmit"
        />
        <CustomButton
          v-else
          label="Edit"
          @click="toggleEdit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
