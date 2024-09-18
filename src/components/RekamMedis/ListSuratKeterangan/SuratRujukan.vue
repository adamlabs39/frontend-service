<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
const emit = defineEmits(["onDelete", "update:dataSurat"]);

const schema = toTypedSchema(
  yup.object({
    tipeRujukan: yup.string().required("Tipe Rujukan harus dipilih"),
    tujuanPelayanan: yup.string().required("Tujuan Pelayanan harus dipilih"),
    tanggalRencana: yup.date().required("Tanggal Rencana harus dipilih"),
    poli: yup.string().required("Poli/Spesialis harus dipilih"),
    dirujuk: yup.string().required("Dirujuk Ke harus diisi"),
    alasanKlinikal: yup.string().required("Alasan Klinikal harus diisi"),
    alasanNonKlinikal: yup.string().required("Alasan Non Klinikal harus diisi"),
    alasanNonKlinikalLain: yup
      .string()
      .required("Alasan Non Klinikal Lainnya harus diisi"),
    catatan: yup.string().required("Catatan Rujukan harus diisi"),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const [tipeRujukan] = defineField("tipeRujukan");
const [tujuanPelayanan] = defineField("tujuanPelayanan");
const [tanggalRencana] = defineField("tanggalRencana");
const [poli] = defineField("poli");
const [dirujuk] = defineField("dirujuk");
const [alasanKlinikal] = defineField("alasanKlinikal");
const [alasanNonKlinikal] = defineField("alasanNonKlinikal");
const [alasanNonKlinikalLain] = defineField("alasanNonKlinikalLain");
const [catatan] = defineField("catatan");

const itemsPelayanan = ref(["Rawat Jalan", "Rawat Inap"]);
const itemsNonKlinikal = ref([
  "TempatPenuh",
  "Perlu Fasilitas Lebih Baik",
  "Permintaan Pasien/Keluarga",
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
        Surat Rujukan
        <PhX :size="20" @click="emit('onDelete')" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 pt-5 gap-x-[30px] gap-y-5">
        <div class="flex gap-[30px] col-span-12">
          <div
            class="grid grid-cols-2 gap-x-5 pr-[30px] border-r border-adameds-300"
          >
            <div class="col-span-2 font-semibold text-normal">
              Surat Rujukan
            </div>
            <CustomRadio
              v-for="data in ['Eksternal', 'Internal']"
              v-model="tipeRujukan"
              :sideLabel="data"
              :value="data"
              :invalid="!!errors.tipeRujukan"
              :invalidMessage="errors.tipeRujukan"
            />
          </div>
          <CustomInputNumber
            label="No. Surat"
            placeholder="No. 123456"
            class="basis-2/12"
          />
          <CustomSelect
            label="Tujuan Pelayanan"
            v-model="tujuanPelayanan"
            place-holder="Pilih Tujuan Pelayanan"
            :options="itemsPelayanan"
            option-label=""
            option-value=""
            class="grow"
            :invalid="!!errors.tujuanPelayanan"
            :invalidMessage="errors.tujuanPelayanan"
          />
        </div>
        <CustomDatePicker
          label="Tgl.Rencana"
          v-model="tanggalRencana"
          class="col-span-2"
          :invalid="!!errors.tanggalRencana"
          :invalidMessage="errors.tanggalRencana"
        />
        <CustomSelect
          label="Poli/Spesialis"
          v-model="poli"
          place-holder="Pilih Poli/Spesialis"
          class="col-span-5"
          :invalid="!!errors.poli"
          :invalidMessage="errors.poli"
        />
        <CustomTextfield
          v-model="dirujuk"
          label="Dirujuk Ke"
          placeholder="Dirujuk Ke"
          class="col-span-5"
          :invalid="!!errors.dirujuk"
          :invalidMessage="errors.dirujuk"
        />
        <CustomTextfield
          v-model="alasanKlinikal"
          label="Alasan Klinikal"
          placeholder="Alasan Klinikal"
          class="col-span-4"
          :invalid="!!errors.alasanKlinikal"
          :invalidMessage="errors.alasanKlinikal"
        />
        <CustomSelect
          v-model="alasanNonKlinikal"
          label="Alasan Non Klinikal"
          place-holder="Pilih Alasan Non Klinikal"
          :options="itemsNonKlinikal"
          option-label=""
          option-value=""
          class="col-span-4"
          :invalid="!!errors.alasanNonKlinikal"
          :invalidMessage="errors.alasanNonKlinikal"
        />
        <CustomTextfield
          v-model="alasanNonKlinikalLain"
          label="Alasan Non Klinikal Lainnya"
          placeholder="Alasan Non Klinikal Lainnya"
          class="col-span-4"
          :invalid="!!errors.alasanNonKlinikalLain"
          :invalidMessage="errors.alasanNonKlinikalLain"
        />
        <CustomTextArea
          v-model="catatan"
          label="Catatan Rujukan"
          placeholder="Catatan Rujukan ..."
          class="col-span-12"
          :invalid="!!errors.catatan"
          :invalidMessage="errors.catatan"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
