<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriDiagnosaDokter from "@/components/RekamMedis/DiagnosaDokter/HistoriDiagnosaDokter.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { useDiagnosisStore } from "@/stores/datamaster/diagnosis";
import { epochToDate } from "@/utils/Helpers";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();
const diagnosisStore = useDiagnosisStore();

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

const emit = defineEmits(["edit", "editAsesmen"]);
const currentMethod = ref(props.method);

const schema = toTypedSchema(
  yup.object({
    diagnosisUuid: yup.string(),
    diagnosis: yup.mixed<any>().required("Diagnosis harus diisi"),
    diferensial: yup.mixed<any>(),
    diferensialUuid: yup.string(),
    petugas: yup.string().default("Super Admin"),
    datas: yup.array().of(
      yup.object({
        diagnosisUuid: yup.string(),
        diagnosis: yup.mixed<any>().required("Sekunder is required"),
        diferensial: yup.mixed<any>(),
        diferensialUuid: yup.string(),
        petugas: yup.string().default("Super Admin"),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, defineField, setValues } = useForm({
  validationSchema: schema,
});

const setFormData = () => {
  if (rekamMedisStore.openedRekamMedis.data.diagnosisDokter) {
    const tempDiagnosaDokter =
      rekamMedisStore.openedRekamMedis.data.diagnosisDokter;
    const primerData: any[] = [];
    const sekunderData: any[] = [];
    tempDiagnosaDokter.forEach((diagnosa: any, index: number) => {
      const tempData = {
        diagnosisUuid: diagnosa.diagnosisUuid,
        diagnosis: {
          name: diagnosa.diagnosis,
          uuid: diagnosa.diagnosisUuid,
        },
        diferensial: diagnosa.diferensial
          ? {
              name: diagnosa.diferensial,
              uuid: diagnosa.diferensialUuid,
            }
          : "",
        diferensialUuid: diagnosa.diferensialUuid,
        tipe: diagnosa.tipe,
        petugas: diagnosa.petugas,
      };
      if (diagnosa.tipe == "primer") {
        primerData.push(tempData);
        createdAt.value = diagnosa.createdAt;
      } else if (diagnosa.tipe == "sekunder") {
        sekunderData.push(tempData);
        if (index == tempDiagnosaDokter.length) {
          createdAt.value = diagnosa.createdAt;
        }
      }
    });

    setValues({
      diagnosis: primerData[0].diagnosis,
      diagnosisUuid: primerData[0].diagnosisUuid,
      diferensial: primerData[0].diferensial,
      diferensialUuid: primerData[0].diferensialUuid,
      petugas: primerData[0].petugas,
      datas: sekunderData,
    });
    // const tempArrRiwayatKeluarga = tempAnamnesis.riwayatKeluarga
    //   .trim()
    //   .split(",");
    // setValues({
    //   anamnesis: tempAnamnesis.anamnesis,
    //   keluhanUtama: tempAnamnesis.keluhanUtama,
    //   riwayatPenyakit: tempAnamnesis.riwayatPenyakit,
    //   riwayatPengobatan: tempAnamnesis.riwayatPengobatan,
    //   catatan: tempAnamnesis.catatan,
    //   riwayatKeluarga: tempArrRiwayatKeluarga,
    //   pernahDirawat: tempAnamnesis.pernahDirawat,
    //   petugas: tempAnamnesis.petugas,
    // });
  } else resetForm();
};

const [diagnosisUuid] = defineField("diagnosisUuid");
const [diagnosis] = defineField("diagnosis");
const [petugas] = defineField("petugas");
const [diferensialUuid] = defineField("diferensialUuid");
const [diferensial] = defineField("diferensial");
const createdAt = ref<any>();

const listIcd9Data = ref<any[]>([]);
onBeforeMount(async () => {
  storeUtils.setLoading(true);
  try {
    const response = await diagnosisStore.exportApi();
    if (response && response.payload) {
      listIcd9Data.value = response.payload;
    } else {
      listIcd9Data.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    listIcd9Data.value = [];
  } finally {
    storeUtils.setLoading(false);
  }
  setFormData();
});

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

const onSubmit = handleSubmit(async (values: any) => {
  const tempData = [];
  const tempDiagnosisPrimer: any = {
    diagnosisUuid: values.diagnosis.uuid,
    diagnosis: values.diagnosis.name,
    diferensialUuid: values.diferensial ? values.diferensial.uuid : "",
    diferensial: values.diferensial ? values.diferensial.name : "",
    tipe: "primer",
  };
  if (values.pegawai) {
    tempDiagnosisPrimer.petugas = values.petugas;
  }
  tempData.push(tempDiagnosisPrimer);
  values.datas.forEach((sekunderData: any) => {
    const tempDiagnosisSekunder: any = {
      diagnosisUuid: sekunderData.diagnosis.uuid,
      diagnosis: sekunderData.diagnosis.name,
      diferensialUuid: sekunderData.diferensial
        ? sekunderData.diferensial.uuid
        : "",
      diferensial: sekunderData.diferensial
        ? sekunderData.diferensial.name
        : "",
      tipe: "sekunder",
    };
    if (sekunderData.pegawai) {
      tempDiagnosisSekunder.petugas = sekunderData.petugas;
    }
    tempData.push(tempDiagnosisSekunder);
  });
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "diagnosis_dokter",
      data: tempData,
    });
    if (response && response.payload) {
      rekamMedisStore.setAsesmentSummaryRekamMedisData(response.payload);
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const { remove, push, fields } = useFieldArray<{
  diagnosisUuid: string;
  diagnosis: any;
  diferensialUuid: string | null;
  diferensial: any;
  petugas: any;
}>("datas");

const addDiagnosis = () => {
  push({
    diagnosisUuid: "",
    diagnosis: null,
    diferensialUuid: "",
    diferensial: "",
    petugas: "",
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
              v-model="diagnosis"
              :options="listIcd9Data"
              optionLabel="name"
              optionValue=""
              dataKey="uuid"
              :isLoading="false"
              :invalid="!!errors.diagnosis"
              :invalidMessage="errors.diagnosis"
              :disabled="false"
              :placeHolder="'Pilih Diagnosis'"
              customSelectClass="border-[#C7CBD2]"
              prependIcon="PhMagnifyingGlass"
              customValue
            >
              <template #customOptions="{ option }">
                {{ option.name }} ({{ option.code }})
              </template>
              <template #customValue="{ value, placeholder, selectedData }">
                {{
                  value && selectedData
                    ? `${selectedData?.name} ${
                        selectedData?.code ? "(" + selectedData?.code + ")" : ""
                      }`
                    : placeholder
                }}
              </template>
            </CustomSelect>

            <CustomSelect
              label="Diagnosis Diferensial"
              v-model="diferensial"
              :options="listIcd9Data"
              optionLabel="name"
              optionValue=""
              dataKey="uuid"
              :isLoading="false"
              :invalid="false"
              invalidMessage="Wajib diisi"
              :disabled="false"
              :placeHolder="'Pilih Diagnosis'"
              customSelectClass="border-[#C7CBD2]"
              prependIcon="PhMagnifyingGlass"
              customValue
            >
              <template #customOptions="{ option }">
                {{ option.name }} ({{ option.code }})
              </template>
              <template #customValue="{ value, placeholder, selectedData }">
                {{
                  value && selectedData
                    ? `${selectedData?.name} ${
                        selectedData?.code ? "(" + selectedData?.code + ")" : ""
                      }`
                    : placeholder
                }}
              </template>
            </CustomSelect>
          </div>

          <div
            class="flex gap-[30px] w-full"
            v-for="(field, index) in fields"
            :key="index"
          >
            <div class="basis-2/5">
              <CustomSelect
                label="Sekunder"
                v-model="field.value.diagnosis"
                :options="listIcd9Data"
                optionLabel="name"
                optionValue=""
                dataKey="uuid"
                :isLoading="false"
                :invalid="!!errors[`datas[${index}].diagnosis` as keyof typeof errors]"
                :invalidMessage="errors[`datas[${index}].diagnosis` as keyof typeof errors]"
                :disabled="false"
                :placeHolder="'Pilih Diagnosis'"
                customSelectClass="border-[#C7CBD2]"
                prependIcon="PhMagnifyingGlass"
                customValue
              >
                <template #customOptions="{ option }">
                  {{ option.name }} ({{ option.code }})
                </template>
                <template #customValue="{ value, placeholder, selectedData }">
                  {{
                    value && selectedData
                      ? `${selectedData?.name} ${
                          selectedData?.code
                            ? "(" + selectedData?.code + ")"
                            : ""
                        }`
                      : placeholder
                  }}
                </template>
              </CustomSelect>
            </div>
            <div class="grow">
              <CustomSelect
                label="Diagnosis Diferensial"
                v-model="field.value.diferensial"
                :options="listIcd9Data"
                optionLabel="name"
                optionValue=""
                dataKey="uuid"
                :isLoading="false"
                :invalid="false"
                invalidMessage="Wajib diisi"
                :disabled="false"
                :placeHolder="'Pilih Diagnosis'"
                customSelectClass="border-[#C7CBD2]"
                prependIcon="PhMagnifyingGlass"
                customValue
              >
                <template #customOptions="{ option }">
                  {{ option.name }} ({{ option.code }})
                </template>
                <template #customValue="{ value, placeholder, selectedData }">
                  {{
                    value && selectedData
                      ? `${selectedData?.name} ${
                          selectedData?.code
                            ? "(" + selectedData?.code + ")"
                            : ""
                        }`
                      : placeholder
                  }}
                </template>
              </CustomSelect>
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
          <CustomInfoRow
            label="Primer"
            :value="diagnosis && diagnosis != '' ? diagnosis.name : '-'"
          />
          <CustomInfoRow
            label="Diagnosis Diferensial"
            :value="diferensial && diferensial != '' ? diferensial.name : '-'"
          />
          <div v-for="data in fields">
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow
                label="Sekunder"
                :value="data.value.diagnosis.name"
              />
              <CustomInfoRow
                label="Diagnosis Diferensial"
                :value="data.value.diferensial.name"
              />
            </div>
          </div>
          <hr class="border-grey-200" />
          <CustomInfoRow
            label="Petugas Input"
            :value="
              fields.length ? fields[fields.length - 1]?.value.petugas : petugas
            "
          />
          <CustomInfoRow
            label="Jam Input"
            :value="`${epochToDate(createdAt, 'time')}`"
          />
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
                  v-model="diagnosis"
                  :options="listIcd9Data"
                  optionLabel="name"
                  optionValue=""
                  dataKey="uuid"
                  :isLoading="false"
                  :invalid="!!errors.diagnosis"
                  :invalidMessage="errors.diagnosis"
                  :disabled="false"
                  :placeHolder="'Pilih Diagnosis'"
                  customSelectClass="border-[#C7CBD2]"
                  prependIcon="PhMagnifyingGlass"
                  customValue
                >
                  <template #customOptions="{ option }">
                    {{ option.name }} ({{ option.code }})
                  </template>
                  <template #customValue="{ value, placeholder, selectedData }">
                    {{
                      value && selectedData
                        ? `${selectedData?.name} ${
                            selectedData?.code
                              ? "(" + selectedData?.code + ")"
                              : ""
                          }`
                        : placeholder
                    }}
                  </template>
                </CustomSelect>
                <CustomSelect
                  label="Diagnosis Diferensial"
                  v-model="diferensial"
                  :options="listIcd9Data"
                  optionLabel="name"
                  optionValue=""
                  dataKey="uuid"
                  :isLoading="false"
                  :invalid="false"
                  invalidMessage="Wajib diisi"
                  :disabled="false"
                  :placeHolder="'Pilih Diagnosis'"
                  customSelectClass="border-[#C7CBD2]"
                  prependIcon="PhMagnifyingGlass"
                  customValue
                >
                  <template #customOptions="{ option }">
                    {{ option.name }} ({{ option.code }})
                  </template>
                  <template #customValue="{ value, placeholder, selectedData }">
                    {{
                      value && selectedData
                        ? `${selectedData?.name} ${
                            selectedData?.code
                              ? "(" + selectedData?.code + ")"
                              : ""
                          }`
                        : placeholder
                    }}
                  </template>
                </CustomSelect>
                <div
                  class="w-full"
                  v-for="(field, index) in fields"
                  :key="index"
                >
                  <hr class="mb-5" />
                  <div class="flex grow">
                    <CustomSelect
                      label="Sekunder"
                      v-model="field.value.diagnosis"
                      :options="listIcd9Data"
                      class="grow"
                      optionLabel="name"
                      optionValue=""
                      dataKey="uuid"
                      :isLoading="false"
                      :invalid="!!errors[`datas[${index}].diagnosis` as keyof typeof errors]"
                      :invalidMessage="errors[`datas[${index}].diagnosis` as keyof typeof errors]"
                      :disabled="false"
                      :placeHolder="'Pilih Diagnosis'"
                      customSelectClass="border-[#C7CBD2]"
                      prependIcon="PhMagnifyingGlass"
                      customValue
                    >
                      <template #customOptions="{ option }">
                        {{ option.name }} ({{ option.code }})
                      </template>
                      <template
                        #customValue="{ value, placeholder, selectedData }"
                      >
                        {{
                          value && selectedData
                            ? `${selectedData?.name} ${
                                selectedData?.code
                                  ? "(" + selectedData?.code + ")"
                                  : ""
                              }`
                            : placeholder
                        }}
                      </template>
                    </CustomSelect>
                    <CustomButton
                      label=""
                      icon="PhTrash"
                      textColor="text-white"
                      backgroundColor="bg-danger-300"
                      class="ml-5"
                      :class="[field.value.diagnosis ? 'mt-auto' : 'my-auto']"
                      @click="remove(index)"
                    />
                  </div>
                  <CustomSelect
                    label="Diagnosis Diferensial"
                    v-model="field.value.diferensial"
                    :options="listIcd9Data"
                    class="mt-[10px]"
                    optionLabel="name"
                    optionValue=""
                    dataKey="uuid"
                    :isLoading="false"
                    :invalid="false"
                    invalidMessage="Wajib diisi"
                    :disabled="false"
                    :placeHolder="'Pilih Diagnosis'"
                    customSelectClass="border-[#C7CBD2]"
                    prependIcon="PhMagnifyingGlass"
                    customValue
                  >
                    <template #customOptions="{ option }">
                      {{ option.name }} ({{ option.code }})
                    </template>
                    <template
                      #customValue="{ value, placeholder, selectedData }"
                    >
                      {{
                        value && selectedData
                          ? `${selectedData?.name} ${
                              selectedData?.code
                                ? "(" + selectedData?.code + ")"
                                : ""
                            }`
                          : placeholder
                      }}
                    </template>
                  </CustomSelect>
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
              @click="emit('editAsesmen')"
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
          @click="resetForm"
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
          @click="emit('editAsesmen')"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
