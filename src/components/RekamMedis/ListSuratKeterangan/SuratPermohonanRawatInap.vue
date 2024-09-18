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

const emit = defineEmits(["onDelete", "update:dataSurat"]);

const schema = toTypedSchema(
  yup.object({
    tanggalRawat:yup.date().required("Tanggal Rencana Rawat Inap harus dipilih"),
    dokter: yup.string().required("Dokter harus dipilih"),
    tujuan: yup.string().required("Tujuan Ruangan Rawat Inap harus dipilih"),
    keterangan: yup.string().required("Keterangan harus diisi"),
  })
);
const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});
const [tanggalRawat] = defineField("tanggalRawat");
const [dokter] = defineField("dokter");
const [tujuan] = defineField("tujuan");
const [keterangan] = defineField("keterangan");

const itemsDokter = ref([
  "Dokter Aminah",
  "Dokter Siti",
  "Dokter Adam",
]);
const itemsTujuan= ref([
  "Oprasi",
  "Rawat Inap",
]);


const submitForm = handleSubmit((values) => {
  console.log(values);
  emit("update:dataSurat", values);
});

defineExpose({
  submitForm,
});
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50" initial-state="0">
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
          v-model="tanggalRawat"
           :invalid="!!errors.tanggalRawat"
          :invalidMessage="errors.tanggalRawat"
        />
        <CustomSelect
          label="Dokter"
          v-model="dokter"
          place-holder="Pilih Poli"
          :options="itemsDokter"
          option-label=""
          option-value=""
          class="col-span-7"
           :invalid="!!errors.dokter"
          :invalidMessage="errors.dokter"
        />
        <CustomSelect
          label="Tujuan Ruangan Rawat Inap"
          v-model="tujuan"
          place-holder="Pilih Dokter"
          :options="itemsTujuan"
          option-label=""
          option-value=""
          class="col-span-5"
           :invalid="!!errors.tujuan"
          :invalidMessage="errors.tujuan"
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
