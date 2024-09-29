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

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});
const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit"]);

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
  setValues({
    beratBadan: 43,
    tinggiBadan: 155,
    IMT: 0,
    catatan: "Normal",
    petugas: "Adam",
  });
  calculateIMT()
});

const calculateIMT = () => {  
  if (beratBadan.value && tinggiBadan.value) {
    IMT.value = Number(
      (beratBadan.value / (tinggiBadan.value / 100) ** 2).toFixed(2)
    );
  } else {
    IMT.value = 0;
  }
};

const onSubmit = handleSubmit((values: any) => {
  emit("submit", values);
  isEditing.value = false;
});

const toggleEdit = () => {
  isEditing.value = true;
  emit("edit");
};

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header>Antropometri</template>
    <template #content>
      <div v-if="isEditing" class="flex gap-[30px] pt-5">
        <CustomInputNumber
          v-model="beratBadan"
          label="Berat Badan"
          @update:model-value="calculateIMT"
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Kg</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber
          v-model="tinggiBadan"
          label="Tinggi Badan"
          @update:model-value="calculateIMT"
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Cm</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber
          v-model="IMT"
          label="IMT"
          placeholder="0"
          class=""
          readOnly
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Kg/m²</div>
          </template>
        </CustomInputNumber>
        <CustomTextArea
          v-model="catatan"
          class="grow"
          label="Catatan"
          placeholder="Catatan"
          height="h-10"
        />
      </div>
      <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Berat Badan">
          <template #value>
            <div>{{ beratBadan }} Kg</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Tinggi Badan">
          <template #value>
            <div>{{ tinggiBadan }} Cm</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="IMT">
          <template #value>
            <div>{{ IMT }} Kg/m²</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Catatan" :value="catatan" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
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
        <CustomButton v-else label="Edit" @click="toggleEdit" />
      </div>
    </template>
  </CustomAccordion>
</template>
