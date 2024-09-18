<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
const emit = defineEmits(["onDelete"]);

const schema = toTypedSchema(
  yup.object({
    // tanggal: yup.string().required("Tanggal harus dippilih"),
    poli: yup.string(),
    dokter: yup.string(),
    keterangan: yup.string().required("Keterangan harus diisi"),
  })
);
const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});
const [poli] = defineField("poli");
const [dokter] = defineField("dokter");
const [keterangan] = defineField("keterangan");
const submitForm = handleSubmit((values) => {
  console.log("Form submitted successfully with values:", values);
});
defineExpose({
  submitForm,
});
</script>
<template>
  <CustomAccordion
    headerClass="bg-adameds-50"
  >
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Permohonan Rawat Inap (SPRI)
        <PhX :size="20" @click="emit('onDelete')" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <CustomTextfield label="No. Surat" class="col-span-6" />
        <CustomDatePicker
          label="Tanggal rencana Rawat Inap"
          class="col-span-6"
        />
        <CustomSelect
          label="Dokter"
          place-holder="Pilih Poli"
          class="col-span-7"
        />
        <CustomSelect
          label="Tujuan Ruangan Rawat Inap"
          place-holder="Pilih Dokter"
          class="col-span-5"
        />
        <CustomTextArea
          label="Keterangan / Catatan"
          v-model="keterangan"
          placeholder="Keterangan / Catatan ..."
          class="col-span-12"
            :invalid="!!errors.keterangan"
        :invalidMessage="errors.keterangan"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
