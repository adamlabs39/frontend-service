<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const emit = defineEmits(["onDelete", "update:dataSurat"]);

const schema = toTypedSchema(
  yup.object({
    tanggalPeriksa: yup.date().required("Tanggal Kontrol harus dipilih"),
    poli: yup.string().required("Poli harus dipilih"),
    dokter: yup.string().required("Dokter harus dipilih"),
    keterangan: yup.string().required("Keterangan harus diisi"),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const [tanggalPeriksa] = defineField("tanggalPeriksa");
const [poli] = defineField("poli");
const [dokter] = defineField("dokter");
const [keterangan] = defineField("keterangan");

const itemsPoli = ref(["Poli Gigi", "Poli Mata", "Poli Anak"]);
const itemsDokter = ref(["Dokter Aminah", "Dokter Siti", "Dokter Adam"]);

const submitForm = handleSubmit((values) => {
  console.log(values);
  emit("update:dataSurat", values);
});


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
  submitForm,
  open,
  close,
});

</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initial-state="0" ref="accordion">
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Kontrol Rawat Jalan
        <PhX :size="20" @click="emit('onDelete')" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <CustomTextfield label="No. Surat" class="col-span-6" />
        <CustomDatePicker
          v-model="tanggalPeriksa"
          label="Tanggal Kontrol"
          class="col-span-6"
          :invalid="!!errors.tanggalPeriksa"
          :invalidMessage="errors.tanggalPeriksa"
        />
        <CustomSelect
          v-model="poli"
          label="Poli"
          :options="itemsPoli"
          option-label=""
          option-value=""
          place-holder="Pilih Poli"
          class="col-span-7"
          :invalid="!!errors.poli"
          :invalidMessage="errors.poli"
        />
        <CustomSelect
          v-model="dokter"
          label="Dokter"
          :options="itemsDokter"
          option-label=""
          option-value=""
          place-holder="Pilih Dokter"
          class="col-span-5"
          :invalid="!!errors.dokter"
          :invalidMessage="errors.dokter"
        />
        <CustomTextArea
          v-model="keterangan"
          label="Keterangan / Catatan"
          placeholder="Keterangan / Catatan ..."
          class="col-span-12"
          :invalid="!!errors.keterangan"
          :invalidMessage="errors.keterangan"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
