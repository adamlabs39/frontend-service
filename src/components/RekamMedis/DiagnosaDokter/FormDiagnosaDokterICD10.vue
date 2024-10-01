<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { ref } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriDiagnosaDokter from "@/components/RekamMedis/DiagnosaDokter/HistoriDiagnosaDokter.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const emit = defineEmits(["edit"]);
const currentMethod = ref(props.method);

const schema = toTypedSchema(
  yup.object({
    primer: yup.string().required("Primer is required"),
    petugas: yup.string().required("Petugas is required"),
    diagnosisDiferensial: yup.string(),
    datas: yup.array().of(
      yup.object({
        sekunder: yup.string().required("Sekunder is required"),
        diagnosisDiferensialDinamis: yup.string(),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    primer: "",
    petugas: "MBOH",
    diagnosisDiferensial: "",
    datas: [], // Inisialisasi array kosong
  },
});

const [primer] = defineField("primer");
const [petugas] = defineField("petugas");
const [diagnosisDiferensial] = defineField("diagnosisDiferensial");

const { remove, push, fields } = useFieldArray<{
  sekunder: string;
  diagnosisDiferensialDinamis: string;
}>("datas");

const addDiagnosis = () => {
  push({ sekunder: "", diagnosisDiferensialDinamis: "" });
};

const diagnosaPrimers = ref([
  { id: "1", diagnosaPrimer: "Sakit Kepala" },
  { id: "2", diagnosaPrimer: "Sakit Perut" },
  { id: "3", diagnosaPrimer: "Sakit Jantung" },
  { id: "4", diagnosaPrimer: "Tekanan Darah Tinggi" },
]);

const diagnosaSekunders = ref([
  { id: "1", diagnosaSekunder: "Sakit Perut 3" },
  { id: "2", diagnosaSekunder: "Jantung Berdebar" },
  { id: "3", diagnosaSekunder: "Hepatitis" },
  { id: "4", diagnosaSekunder: "Sakit Demam" },
]);

const diagnosaDds = ref([
  { id: "1", diagnosaDd: "Tangan Berdarah" },
  { id: "2", diagnosaDd: "Luka Hati" },
  { id: "3", diagnosaDd: "Masuk Angin" },
  { id: "4", diagnosaDd: "Gabisa Ngapa-ngapain" },
]);

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
  currentMethod.value = "detail";
  emit("edit");
});

// Fungsi reset yang juga mengosongkan array
const onReset = () => {
  resetForm({
    values: {
      primer: "",
      petugas: "MBOH",
      diagnosisDiferensial: "",
    },
  });
};

const onEditClick = () => {
  currentMethod.value = "form"; // Mengubah method menjadi 'form'
};

const compareDialog = ref(false);
const showDialogCompare = () => {
  compareDialog.value = true;
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
    <template #header>Diagnosa Dokter (ICD 10)</template>
    <template #content>
      <div v-if="currentMethod == 'form'">
        <div class="flex flex-col">
          <CustomButton
            @click="showDialogCompare"
            class="!rounded-md my-[10px] ml-auto"
            label="Mode Compare"
            size="small"
            icon="LayoutIcon"
          />
          <hr class="mb-[30px]" />
        </div>
        <div class="flex flex-col gap-5 py-3">
          <div class="grid grid-cols-2 gap-5">
            <CustomSelect
              label="Primer"
              v-model:model-value="primer"
              :options="diagnosaPrimers"
              optionValue="diagnosaPrimer"
              optionLabel="diagnosaPrimer"
              :isLoading="false"
              :invalid="!!errors.primer"
              :invalidMessage="errors.primer"
              :disabled="false"
              placeHolder="Pilih Diagnosis"
              customSelectClass="border-[#C7CBD2]"
              prependIcon="PhMagnifyingGlass"
            >
            </CustomSelect>

            <CustomSelect
              label="Diagnosis Diferensial"
              v-model="diagnosisDiferensial"
              :options="diagnosaSekunders"
              optionValue="diagnosaSekunder"
              optionLabel="diagnosaSekunder"
              :isLoading="false"
              :invalid="false"
              invalidMessage="Wajib diisi"
              :disabled="false"
              placeHolder="Pilih Diagnosis"
              customSelectClass="border-[#C7CBD2]"
              prependIcon="PhMagnifyingGlass"
            />
          </div>

          <div
            class="flex gap-[30px] w-full"
            v-for="(field, index) in fields"
            :key="index"
          >
            <div class="basis-2/5">
              <CustomSelect
                label="Sekunder"
                v-model="field.value.sekunder"
                :options="diagnosaSekunders"
                optionValue="diagnosaSekunder"
                optionLabel="diagnosaSekunder"
                :isLoading="false"
                :invalid="!!errors[`datas[${index}].sekunder` as keyof typeof errors]"
                :invalidMessage="errors[`datas[${index}].sekunder` as keyof typeof errors]"
                :disabled="false"
                placeHolder="Pilih Diagnosis"
                customSelectClass="border-[#C7CBD2]"
                prependIcon="PhMagnifyingGlass"
              />
            </div>
            <div class="grow">
              <CustomSelect
                label="Diagnosis Diferensial"
                v-model="field.value.diagnosisDiferensialDinamis"
                :options="diagnosaDds"
                optionValue="diagnosaDd"
                optionLabel="diagnosaDd"
                :isLoading="false"
                :invalid="false"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Diagnosis"
                customSelectClass="border-[#C7CBD2]"
                prependIcon="PhMagnifyingGlass"
              />
            </div>
            <div class="flex items-center justify-start">
              <CustomButton
                label="Hapus Diagnosa"
                textColor="text-white"
                backgroundColor="bg-danger-300"
                @click="remove(index)"
              />
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center p-5 my-7 border border-dashed rounded-lg border-adameds-300 gap-2.5"
        >
          <CustomButton
            icon="PhPlus"
            label="Diagnosis"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="addDiagnosis"
          />
        </div>
      </div>
      <div v-else>
        <div class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow label="Primer" value="ICD-10" />
          <CustomInfoRow label="Diagnosis Diferensial" value="ICD-10" />
          <CustomInfoRow label="Sekunder" value="ICD-10" />
          <CustomInfoRow label="Diagnosis Diferensial" value="ICD-10" />
          <CustomInfoRow label="Sekunder" value="ICD-10" />
          <CustomInfoRow label="Diagnosis Diferensial" value="ICD-10" />
          <hr class="border-grey-200" />
          <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
        </div>
      </div>
      <!-- Dialog compare -->
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Diagnosis Dokter (ICD-10)</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr] overflow-auto">
            <div class="flex flex-col overflow-auto">
              <div class="mb-[18px] flex justify-between">
                <div class="font-semibold text-grey-400">
                  Riwayat Sebelumnya
                </div>
                <div class="flex">
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md mr-[10px]"
                    size="small"
                    icon="PhCaretLeft"
                  />
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md"
                    size="small"
                    icon="PhCaretRight"
                  />
                </div>
              </div>
              <div
                class="grid grid-cols-[1fr_min-content_1fr] grow overflow-auto"
              >
                <HistoriDiagnosaDokter />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriDiagnosaDokter />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <CustomSelect
                  label="Primer"
                  v-model:model-value="primer"
                  :options="diagnosaPrimers"
                  optionValue="diagnosaPrimer"
                  optionLabel="diagnosaPrimer"
                  :isLoading="false"
                  :invalid="!!errors.primer"
                  :invalidMessage="errors.primer"
                  :disabled="false"
                  placeHolder="Pilih Diagnosis"
                  customSelectClass="border-[#C7CBD2]"
                  prependIcon="PhMagnifyingGlass"
                />
                <CustomSelect
                  label="Diagnosis Diferensial"
                  v-model="diagnosisDiferensial"
                  :options="diagnosaSekunders"
                  optionValue="diagnosaSekunder"
                  optionLabel="diagnosaSekunder"
                  :isLoading="false"
                  :invalid="false"
                  invalidMessage="Wajib diisi"
                  :disabled="false"
                  placeHolder="Pilih Diagnosis"
                  customSelectClass="border-[#C7CBD2]"
                  prependIcon="PhMagnifyingGlass"
                />
                <div
                  class="w-full"
                  v-for="(field, index) in fields"
                  :key="index"
                >
                  <hr class="mb-5" />
                  <div class="flex grow">
                    <CustomSelect
                      label="Sekunder"
                      v-model="field.value.sekunder"
                      :options="diagnosaSekunders"
                      class="grow"
                      optionValue="diagnosaSekunder"
                      optionLabel="diagnosaSekunder"
                      :isLoading="false"
                      :invalid="!!errors[`datas[${index}].sekunder` as keyof typeof errors]"
                      :invalidMessage="errors[`datas[${index}].sekunder` as keyof typeof errors]"
                      :disabled="false"
                      placeHolder="Pilih Diagnosis"
                      customSelectClass="border-[#C7CBD2]"
                      prependIcon="PhMagnifyingGlass"
                    />
                    <CustomButton
                      label=""
                      icon="PhTrash"
                      textColor="text-white"
                      backgroundColor="bg-danger-300"
                      class="ml-5"
                      :class="[field.value.sekunder ? 'mt-auto' : 'my-auto']"
                      @click="remove(index)"
                    />
                  </div>
                  <CustomSelect
                    label="Diagnosis Diferensial"
                    v-model="field.value.diagnosisDiferensialDinamis"
                    :options="diagnosaDds"
                    class="mt-[10px]"
                    optionValue="diagnosaDd"
                    optionLabel="diagnosaDd"
                    :isLoading="false"
                    :invalid="false"
                    invalidMessage="Wajib diisi"
                    :disabled="false"
                    placeHolder="Pilih Diagnosis"
                    customSelectClass="border-[#C7CBD2]"
                    prependIcon="PhMagnifyingGlass"
                  />
                </div>
                <div
                  class="flex items-center justify-center p-5 my-7 border border-dashed rounded-lg border-adameds-300 gap-2.5"
                >
                  <CustomButton
                    icon="PhPlus"
                    label="Diagnosis"
                    borderColor="border-adameds-300"
                    textColor="text-adameds-300"
                    backgroundColor="bg-white"
                    @click="addDiagnosis"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="currentMethod === 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="currentMethod === 'form'"
              label="Simpan"
              @click="onSubmit"
            />
            <CustomButton
              v-if="currentMethod === 'detail'"
              label="Edit"
              @click="onEditClick"
            />
          </div>
        </template>
      </CustomDialog>
    </template>

    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
          @click="onReset"
          v-if="currentMethod === 'form'"
        />
        <CustomButton
          label="Simpan"
          @click="onSubmit"
          v-if="currentMethod === 'form'"
        />
        <CustomButton
          v-if="currentMethod === 'detail'"
          label="Edit"
          @click="onEditClick"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
