<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import { useFieldArray, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import DetailPasien from "./DetailPasien.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import RiwayatSebelumnya from "./RiwayatSebelumnya.vue";
import { utilsStore } from "@/stores/utils";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { useHowToUseStore } from "@/stores/datamasterFarmasi/HowToUse";
import { useUnitStore } from "@/stores/datamasterFarmasi/Unit";
import { useRulesOfUseStore } from "@/stores/datamasterFarmasi/RulesOfUse";

// NOTE Store
const storeUtils = utilsStore();
const medicalItemStore = useMedicalItemStore();
const rulesOfUseStore = useRulesOfUseStore();
const unitStore = useUnitStore();
const howToUseStore = useHowToUseStore();

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Tambah",
  },
  method: {
    type: String,
    default: "add",
  },
  patientData: {
    type: Object,
  },
});

type Obat = {
  itemMedis: any;
  medicationQty: number;
  medicationPeriod: any;
  medicationDoseQty: number;
  medicationDoseSatuan: any;
  aturanPakai: any;
  caraPakai: any;
  route: any;
  isChronic: boolean;
  prescriptionNotes: string;
};

const emit = defineEmits(["update:isDialogVisible", "add-obat"]);

const namaObats = ref<any[]>([]);

const periodes = ref([
  { id: 1, periode: "Hari" },
  { id: 2, periode: "Minggu" },
  { id: 3, periode: "Jam" },
  { id: 4, periode: "Tiap" },
  { id: 5, periode: "Khusus" },
]);

const aturanPakais = ref<any[]>([]);

const satuanDosiss = ref<any[]>([]);

const caraPakais = ref<any[]>([]);

const rutePemberians = ref([
  { kode: "Implant", rutePemberian: "Implant" },
  { kode: "Inhal", rutePemberian: "Inhalation" },
  { kode: "Instill", rutePemberian: "Instillation" },
  { kode: "N", rutePemberian: "nasal" },
  { kode: "O", rutePemberian: "oral" },
  { kode: "P", rutePemberian: "parenteral" },
  { kode: "R", rutePemberian: "rectal" },
  { kode: "SL", rutePemberian: "sublingual/buccal/oromucosal" },
  { kode: "TD", rutePemberian: "transdermal" },
  { kode: "V", rutePemberian: "vaginal" },
]);
// Definisikan skema validasi
const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        itemMedis: yup.mixed<any>().required("Nama Obat harus dipilih"),
        medicationQty: yup.number().required("Jumlah Total harus diisi").min(0),
        medicationPeriod: yup.mixed<any>().required("Periode harus dipilih"),
        medicationDoseQty: yup
          .number()
          .required("Jumlah Konsumsi harus diisi")
          .min(0),
        medicationDoseSatuan: yup
          .mixed<any>()
          .required("Satuan Dosis harus dipilih"),
        aturanPakai: yup.mixed<any>().required("Aturan Pakai harus dipilih"),
        caraPakai: yup.mixed<any>().required("Cara Pakai harus dipilih"),
        route: yup.mixed<any>(),
        isChronic: yup.bool().default(false),
        prescriptionNotes: yup.string(),
      })
    ),
  })
);

// Inisialisasi form dengan Vee-Validate
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    datas: [],
  },
});

const { remove, push, fields } = useFieldArray<Obat>("datas");

// Handler submit form
const onSubmit = handleSubmit((values) => {
  emit("add-obat", values.datas); // Emit event dengan data obat baru
  console.log(values.datas);
  resetForm(); // Reset form setelah submit
  emit("update:isDialogVisible", false); // Tutup dialog
});

const addObat = () => {
  push({
    medicationQty: 0,
    itemMedis: null,
    medicationDoseQty: 0,
    medicationDoseSatuan: null,
    medicationPeriod: null,
    aturanPakai: null,
    caraPakai: null,
    prescriptionNotes: "",
    isChronic: false,
    route: "",
  });
};

// Handler untuk menutup dialog tanpa menyimpan
// function closeDialog() {
//     emit('close');
//     resetForm();
// }

// Mengupdate visibilitas dialog
function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
  resetForm();
}

const getListObat = async () => {
  const response = await medicalItemStore.getWithoutPaginationApi2();
  if (response && response.payload) {
    namaObats.value = response.payload;
  }
};

const getListAturanPakai = async () => {
  const response = await rulesOfUseStore.exportApi();
  if (response && response.payload) {
    aturanPakais.value = response.payload;
  }
};

const getListSatuanDosis = async () => {
  const response = await unitStore.exportApi();
  if (response && response.payload) {
    satuanDosiss.value = response.payload.filter(
      (unit: any) => unit.satuanDosis
    );
  }
};

const getListCaraPakai = async () => {
  const response = await howToUseStore.exportApi();
  if (response && response.payload) {
    caraPakais.value = response.payload;
  }
};

onMounted(async () => {
  storeUtils.setLoading(true);
  await getListObat();
  await getListAturanPakai();
  await getListSatuanDosis();
  await getListCaraPakai();
  storeUtils.setLoading(false);
});
</script>

<template>
  <CustomDialog
    :full-screen="true"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header>{{ title }}</template>
    <template #body>
      <!--  -->
      <div class="flex gap-5 my-5">
        <div class="min-w-[500px]">
          <DetailPasien :patientData="patientData" />
          <RiwayatSebelumnya />
        </div>

        <hr class="h-auto border border-adameds-300" />

        <!--  Mulai Diisi -->
        <div class="grow">
          <div class="flex items-center justify-between">
            <div class="font-semibold text-MD">
              Total Obat : {{ fields.length }}
            </div>
            <CustomButton
              label="Tambah Obat"
              showIcon
              icon-pos="left"
              icon="PhPlus"
              @click="addObat"
            />
          </div>
          <hr class="my-4 bg-grey-200 border-1" />
          <div class="flex flex-col gap-3 overflow-y-auto max-h-[600px]">
            <div v-for="(field, index) in fields" :key="index">
              <CustomAccordion headerClass="bg-adameds-50">
                <template #header>Obat {{ index + 1 }}</template>
                <template #content>
                  <div class="py-5">
                    <div class="flex flex-col gap-5">
                      <div class="flex gap-7">
                        <div class="grow">
                          <CustomSelect
                            label="Nama Obat"
                            placeHolder="Pilih obat"
                            v-model="field.value.itemMedis"
                            :options="namaObats"
                            optionLabel="name"
                            optionValue=""
                            dataKey="uuid"
                            :invalid="!!(errors as any)[`datas[${index}].itemMedis`]"
                            :invalidMessage="(errors as any)[`datas[${index}].itemMedis`]"
                          >
                            <template #customOptions="{ option }">
                              {{ option.name }} -
                              {{ option.satuanDosis?.name }} -
                              {{ option.bentukSediaan?.name }}
                              {{
                                option.manufacture
                                  ? `- ${option.manufacture.name}`
                                  : ""
                              }}
                            </template>
                          </CustomSelect>
                        </div>
                        <div class="w-[12.5%]">
                          <CustomInputNumber
                            label="Jumlah Total"
                            :show-buttons="true"
                            v-model="field.value.medicationQty"
                            :invalid="!!(errors as any)[`datas[${index}].medicationQty`]"
                            :invalidMessage="(errors as any)[`datas[${index}].medicationQty`]"
                          />
                        </div>
                      </div>

                      <div class="grid grid-cols-4 gap-5">
                        <div class="flex col-span-2 gap-5">
                          <CustomSelect
                            label="Periode"
                            placeHolder="Pilih periode"
                            v-model="field.value.medicationPeriod"
                            :options="periodes"
                            class="w-1/4"
                            optionValue="periode"
                            optionLabel="periode"
                            :invalid="!!(errors as any)[`datas[${index}].medicationPeriod`]"
                            :invalidMessage="(errors as any)[`datas[${index}].medicationPeriod`]"
                          />
                          <CustomSelect
                            label="Aturan Pakai"
                            placeHolder="Pilih aturan pakai"
                            v-model="field.value.aturanPakai"
                            :options="aturanPakais"
                            class="grow"
                            optionLabel="name"
                            optionValue=""
                            dataKey="uuid"
                            :invalid="!!(errors as any)[`datas[${index}].aturanPakai`]"
                            :invalidMessage="(errors as any)[`datas[${index}].aturanPakai`]"
                          />
                        </div>
                        <div class="flex col-span-2 gap-5">
                          <CustomInputNumber
                            label="Jumlah Konsumsi"
                            :show-buttons="true"
                            v-model="field.value.medicationDoseQty"
                            class="w-1/4"
                            :invalid="!!(errors as any)[`datas[${index}].medicationDoseQty`]"
                            :invalidMessage="(errors as any)[`datas[${index}].medicationDoseQty`]"
                          />
                          <CustomSelect
                            label="Satuan Dosis"
                            placeHolder="Pilih satuan dosis"
                            v-model="field.value.medicationDoseSatuan"
                            :options="satuanDosiss"
                            class="grow"
                            optionLabel="name"
                            optionValue=""
                            dataKey="uuid"
                            :invalid="!!(errors as any)[`datas[${index}].medicationDoseSatuan`]"
                            :invalidMessage="(errors as any)[`datas[${index}].medicationDoseSatuan`]"
                          />
                        </div>
                      </div>
                      <div class="flex gap-7">
                        <div class="w-1/2">
                          <CustomSelect
                            label="Cara Pakai"
                            placeHolder="Pilih cara pakai"
                            v-model="field.value.caraPakai"
                            :options="caraPakais"
                            optionLabel="caraPakai"
                            optionValue=""
                            dataKey="uuid"
                            :invalid="!!(errors as any)[`datas[${index}].caraPakai`]"
                            :invalidMessage="(errors as any)[`datas[${index}].caraPakai`]"
                          />
                        </div>
                        <div class="w-1/2">
                          <CustomSelect
                            label="Rute Pemberian"
                            placeHolder="Pilih rute pemberian"
                            v-model="field.value.route"
                            :options="rutePemberians"
                            optionLabel="rutePemberian"
                            optionValue=""
                            dataKey="kode"
                          />
                        </div>
                      </div>
                      <div class="flex gap-7">
                        <CustomSwitch
                          label="Obat Kronis "
                          v-model="field.value.isChronic"
                        />
                        <div class="grow">
                          <CustomTextArea
                            label="Catatan"
                            placeholder="Masukkan catatan"
                            v-model="field.value.prescriptionNotes"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </CustomAccordion>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Reset"
            borderColor="border-2 border-[#9DA4B1]"
            background-color="bg-transparent"
            text-color="text-grey-300"
            @click="resetForm"
          />
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
