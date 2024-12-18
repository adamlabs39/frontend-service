<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { ref } from "vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  rmUuid: {
    type: String,
    default: "",
  },
  sessionUuid: {
    type: String,
    default: "",
  },
});

const listCaraDatang = ref([
  { id: "1", caraDatang: "Cara Datang 1" },
  { id: "2", caraDatang: "Cara Datang 2" },
  { id: "3", caraDatang: "Cara Datang 3" },
  { id: "4", caraDatang: "Cara Datang 4" },
]);
const listKeadaanUmum = ref([
  { id: "1", keadaanUmum: "Keadaan Umum 1" },
  { id: "2", keadaanUmum: "Keadaan Umum 2" },
  { id: "3", keadaanUmum: "Keadaan Umum 3" },
  { id: "4", keadaanUmum: "Keadaan Umum 4" },
]);
const listJenisKasus = ref([
  { id: "1", jenisKasus: "Jenis Kasus 1" },
  { id: "2", jenisKasus: "Jenis Kasus 2" },
  { id: "3", jenisKasus: "Jenis Kasus 3" },
  { id: "4", jenisKasus: "Jenis Kasus 4" },
]);
const listKendaraan = ref([
  { id: "1", kendaraan: "Kendaraan 1" },
  { id: "2", kendaraan: "Kendaraan 2" },
  { id: "3", kendaraan: "Kendaraan 3" },
  { id: "4", kendaraan: "Kendaraan 4" },
]);

const emit = defineEmits(["edit"]);

const schema = toTypedSchema(
  yup.object({
    keluhanUtama: yup.string(),
    jenisKasus: yup.string(),
    caraDatang: yup.string(),
    kendaraan: yup.string(),
    keadaanUmum: yup.string(),
    asalRujukan: yup.string(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [keluhanUtama] = defineField("keluhanUtama");
const [jenisKasus] = defineField("jenisKasus");
const [caraDatang] = defineField("caraDatang");
const [kendaraan] = defineField("kendaraan");
const [keadaanUmum] = defineField("keadaanUmum");
const [asalRujukan] = defineField("asalRujukan");

const onSubmit = handleSubmit(async (values: any) => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      // NOTE Apa ini
      isLatest: true,
      key: "anamnesis_igd",
      data: values,
    });
    if (response && response.payload) {
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
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
  open,
  close,
});
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header> Anamnesis IGD</template>
    <template #content>
      <div
        v-if="props.method == 'form'"
        class="grid grid-cols-2 gap-[30px] py-3"
      >
        <CustomTextfield
          label="Keluhan Utama"
          placeholder="Keluhan Utama"
          v-model:modelValue="keluhanUtama"
        />
        <CustomSelect
          label="Jenis Kasus"
          v-model="jenisKasus"
          :options="listJenisKasus"
          optionValue="id"
          optionLabel="jenisKasus"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Jenis Kasus"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomSelect
          label="Cara Datang"
          v-model="caraDatang"
          :options="listCaraDatang"
          optionValue="id"
          optionLabel="caraDatang"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Cara Datang"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomSelect
          label="Kendaraan"
          v-model="kendaraan"
          :options="listKendaraan"
          optionValue="id"
          optionLabel="kendaraan"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Kendaraan"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomSelect
          label="Keadaan Umum"
          v-model="keadaanUmum"
          :options="listKeadaanUmum"
          optionValue="id"
          optionLabel="keadaanUmum"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Keadaan Umum"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomTextfield
          label="Asal Rujukan"
          placeholder="Asal Rujukan"
          v-model:modelValue="asalRujukan"
        />
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Keluhan Utama" value="" />
        <CustomInfoRow label="Jenis Kasus" value="" />
        <CustomInfoRow label="Cara Datang" value="" />
        <CustomInfoRow label="Kendaraan" value="" />
        <CustomInfoRow label="Keadaan Umum" value="" />
        <CustomInfoRow label="Asal Rujukan" value="" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-adameds-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-adameds-300"
        />
        <CustomButton v-if="props.method == 'form'" @click="onSubmit" label="Simpan" />
        <CustomButton
          v-if="props.method == 'detail'"
          @click="emit('edit')"
          label="Edit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
