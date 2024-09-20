<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const isEditing = ref(props.method === "form");
const emit = defineEmits(['edit', 'submit']);

const anamnesisOption = ref([
  { name: "Hipertensi" },
  { name: "Penyakit Jantung" },
  { name: "Stroke" },
  { name: "TB Paru" },
  { name: "Diabetes Melitus" },
  { name: "Asma" },
  { name: "Lain-lain" },
  { name: "Tidak Ada" },
]);

const riwayatPenyakitOption = ref([
  { name: "Hipertensi" },
  { name: "Penyakit Jantung" },
  { name: "Stroke" },
  { name: "TB Paru" },
  { name: "Diabetes Melitus" },
  { name: "Asma" },
  { name: "Lain-lain" },
  { name: "Tidak Ada" },
]);

const schema = toTypedSchema(
  yup.object({
    anamnesis: yup.string(),
    keluhanUtama: yup.string(),
    riwayatPenyakit: yup.string(),
    riwayatPengobatan: yup.string(),
    catatan: yup.string(),
    riwayatKeluarga: yup.array().of(yup.string()),
    pernahDirawat: yup.bool(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [anamnesis] = defineField("anamnesis");
const [keluhanUtama] = defineField("keluhanUtama");
const [riwayatPenyakit] = defineField("riwayatPenyakit");
const [riwayatPengobatan] = defineField("riwayatPengobatan");
const [catatan] = defineField("catatan");
const [riwayatKeluarga] = defineField("riwayatKeluarga");
const [pernahDirawat] = defineField("pernahDirawat");
const [petugas] = defineField("petugas");

onBeforeMount(async () => {
  setValues({
    anamnesis: "Penyakit Jantung",
    keluhanUtama: "Sakit Dada",
    riwayatPenyakit: "Asma",
    riwayatPengobatan: "tidak ada",
    catatan: "tidak ada",
    riwayatKeluarga: ["Hipertensi", "Stroke"],
    pernahDirawat: true,
    petugas: "Adam",
  });
});

const onSubmit = handleSubmit((values: any) => {
  console.log("Adding new data:", values);
  emit('submit', values); 
  isEditing.value = false;
});

const toggleEdit = () => {
  isEditing.value = true;
  emit('edit');
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
    <template #header>Anamnesis</template>
    <template #content>
      <div v-if="isEditing" class="grid grid-cols-2 py-5 gap-x-8 gap-y-5">
        <CustomSelect
          v-model="anamnesis"
          label="Anamnesis"
          placeHolder="Pilih Anamnesis"
          :options="anamnesisOption"
          option-label="name"
          option-value="name"
        />
        <CustomTextfield
          v-model="keluhanUtama"
          label="Keluhan Utama"
          placeholder="Keluhan Utama"
        />
        <CustomTextfield
          v-model="riwayatPenyakit"
          label="Riwayat Penyakit"
          placeholder="Riwayat Penyakit"
        />
        <CustomTextfield
          v-model="riwayatPengobatan"
          label="Riwayat Pengobatan (Termasuk Obat Yang Sedang Dikonsumsi)"
          placeholder="Riwayat Pengobatan"
        />
        <div class="flex">
          <div class="basis-2/3">
            <div class="block font-semibold mb-[11px]">
              Riwayat Penyakit Keluarga
            </div>
            <div class="grid grid-flow-col grid-rows-4 gap-4">
              <div
                v-for="category of riwayatPenyakitOption"
                :key="category.name"
                class="flex items-center gap-2.5"
              >
                <Checkbox
                  v-model="riwayatKeluarga"
                  :inputId="category.name"
                  name="category"
                  :value="category.name"
                  :dt="{
                    checkedBackground: '#14B8A6',
                    checkedHoverBackground: '#14B8A6',
                    borderColor: '#98A2B3',
                  }"
                />
                <label
                  :for="category.name"
                  class="text-SM font-normal text-grey-400"
                  >{{ category.name }}</label
                >
              </div>
            </div>
          </div>
          <div class="basis-1/3">
            <CustomSwitch v-model="pernahDirawat" label="Pernah Dirawat" />
          </div>
        </div>
        <CustomTextArea
          v-model="catatan"
          label="Catatan"
          placeholder="Catatan"
        />
      </div>
      <div v-else class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Anamnesis" :value="anamnesis" />
        <CustomInfoRow label="Keluhan Utama" :value="keluhanUtama" />
        <CustomInfoRow label="Riwayat Penyakit" :value="riwayatPenyakit" />
        <CustomInfoRow label="Tingkat Keparahan" value="Tidak terlalu parah" />
        <CustomInfoRow label="Pernah Dirawat" value="Tidak" />
        <CustomInfoRow label="Riwayat Pengobatan" :value="riwayatPengobatan" />
        <CustomInfoRow label="Riwayat Penyakit Keluarga">
          <template #value>
            <span v-if="riwayatKeluarga?.length">
              <span v-for="(penyakit, index) in riwayatKeluarga" :key="index">
                {{ penyakit
                }}<span v-if="index < riwayatKeluarga.length - 1">, </span>
              </span>
            </span>
            <span v-else>Tidak ada riwayat penyakit keluarga</span>
          </template>
        </CustomInfoRow>

        <CustomInfoRow
          label="Pengetahuan Tentang Penyakit Saat Ini"
          value="Tidak ada"
        />
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
