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
    tanggalMeninggal: yup.date().required("Tanggal Meninggal harus dipilih"),
    lokasiMeniggal: yup.string().required("Lokasi Meninggal harus dipilih"),
    dokter: yup
      .string()
      .required("Dokter Yang Menyatakan Meninggal harus dipilih"),
    penyebabKematian: yup.string().required("Penyebab Kematian harus dipilih"),

    keterangan: yup.string().required("Keterangan harus diisi"),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const [tanggalMeninggal] = defineField("tanggalMeninggal");
const [lokasiMeniggal] = defineField("lokasiMeniggal");
const [dokter] = defineField("dokter");
const [penyebabKematian] = defineField("penyebabKematian");
const [keterangan] = defineField("keterangan");

const itemsLokasiMeninggal = ref([
  "Rumah Sakit",
  "PUSKESMAS",
  "Rumah Bersalin",
  "Rumah Tempat Tinggal",
  "DOA",
  "Lainnya",
]);
const itemsPenyebabKematian = ref([
  "Penyakit Khusus",
  "Penyakit Menular",
  "Gangguan Maternal",
  "Gangguan Perinatal(0-6 Hari)",
  "Gejala, Tanda dan Kondisi Lainnya",
  "Cedera Kecelakaan Lalu Lintas",
  "Cedera Kecelakaan Kerja",
  "Cedera Kecelakaan Lainnya",
  "Lain-Lain",
]);
const itemsDokter = ref(["Dokter Aminah", "Dokter Siti", "Dokter Adam"]);

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
        Surat Keterangan Meninggal
        <PhX :size="20" @click="emit('onDelete')" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <CustomTextfield label="No. Surat" class="col-span-4" />
        <CustomDatePicker
          v-model="tanggalMeninggal"
          label="Tanggal & Waktu Meninggal"
          class="col-span-4"
          :invalid="!!errors.tanggalMeninggal"
          :invalidMessage="errors.tanggalMeninggal"
        />
        <CustomSelect
          label="Lokasi Meninggal"
          v-model="lokasiMeniggal"
          place-holder="Pilih Lokasi Meninggal"
          class="col-span-4"
          :options="itemsLokasiMeninggal"
          option-label=""
          option-value=""
          :invalid="!!errors.lokasiMeniggal"
          :invalidMessage="errors.lokasiMeniggal"
        />
        <CustomSelect
          label="Dokter Yang Menyatakan Meninggal"
          v-model="dokter"
          place-holder="Pilih Dokter Yang Menyatakan Meninggal"
          class="col-span-6"
          :options="itemsDokter"
          option-label=""
          option-value=""
          :invalid="!!errors.dokter"
          :invalidMessage="errors.dokter"
        />
        <CustomSelect
          label="Penyebab Kematian"
          v-model="penyebabKematian"
          place-holder="Pilih Penyebab Kematian"
          class="col-span-6"
          :options="itemsPenyebabKematian"
          option-label=""
          option-value=""
          :invalid="!!errors.penyebabKematian"
          :invalidMessage="errors.penyebabKematian"
        />
        <CustomTextArea
          label="Keterangan/Catatan"
          v-model="keterangan"
          placeholder="Keterangan/Catatan..."
          class="col-span-12"
          :invalid="!!errors.keterangan"
          :invalidMessage="errors.keterangan"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
