<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { useHowToUseStore } from "@/stores/datamasterFarmasi/HowToUse";
import { useRulesOfUseStore } from "@/stores/datamasterFarmasi/RulesOfUse";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { useDoctorPrescriptionStore } from "@/stores/farmasi/DoctorPrescription";
import { useUnitStore } from "@/stores/datamasterFarmasi/Unit";
import { usePriceConfigurationStore } from "@/stores/datamasterFarmasi/PriceConfiguration";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  method: {
    type: String,
  },
  title: {
    type: String,
  },
  payload: {
    type: Object,
    default: () => ({}),
  },
});

interface Racikan {
  itemMedisUuid: string;
  medicationQty: number;
  isUpdated: boolean;
}
const doctorPrescriptionStore = useDoctorPrescriptionStore();
const medicalItemsStore = useMedicalItemStore();
const priceConfigurationStore = usePriceConfigurationStore();
const caraPakaiStore = useHowToUseStore();
const aturanPakaiStore = useRulesOfUseStore();
const unitStore = useUnitStore();
const obatPayload = ref<any[]>([]);
const caraPakaiPayload = ref<any[]>([]);
const aturanPakaiPayload = ref<any[]>([]);
const satuanDosisPayload = ref<any[]>([]);
const bentukRacikanPayload = ref<any[]>([]);
const schema = toTypedSchema(
  yup
    .object({
      type: yup.string().notRequired(),
      prescriptionUuid: yup.string().notRequired(),
      itemMedisUuid: yup.string().when("isCompound", {
        is: (value: boolean) => value === false,
        then: (schema) => schema.required("Nama Obat harus dipilih"),
        otherwise: (schema) => schema.notRequired(),
      }),
      medicationQty: yup.number().required("Jumlah harus diisi"),
      medicationDoseQty: yup.number().required("Jumlah Konsumsi harus dipilih"),
      medicationDoseSatuanUuid: yup
        .string()
        .required("Satuan Dosis harus dipilih"),
      medicationPeriod: yup.string().required("Periode harus dipilih"),
      aturanPakaiUuid: yup.string().required("Aturan Pakai harus dipilih"),
      caraPakaiUuid: yup.string().required("Cara Pakai harus dipilih"),
      prescriptionNotes: yup.string().notRequired(),
      isChronic: yup.boolean().default(false),
      route: yup.string().notRequired(),
      namaRacikan: yup.string().notRequired(),
      jenisRacikan: yup.number().default(0).notRequired(),
      bentukRacikanUuid: yup.string().when("isCompound", {
        is: (value: boolean) => value === true,
        then: (schema) => schema.required("Bentuk Racikan harus dipilih"),
        otherwise: (schema) => schema.notRequired(),
      }),
      isCompound: yup.boolean().default(false),
      racikan: yup.array().when("isCompound", {
        is: true, 
        then: (schema) =>
          schema
            .of(
              yup.object({
                itemMedisUuid: yup.string().required("Nama Obat harus dipilih"),
                medicationQty: yup.number().required("Jumlah Obat harus diisi"),
                jenisStokUuid: yup.string().notRequired(),
                isUpdated: yup.boolean().default(false),
              })
            )
            .strict(),
        otherwise: (schema) => schema.notRequired(), 
      }),
    })
    .noUnknown()
);



const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    racikan: [
      {
        itemMedisUuid: "",
        medicationQty: 0,
        isUpdated: false,
      },
    ],
  },
});

const digerus = ref<boolean>();
const { remove, push, fields } = useFieldArray<Racikan>("racikan");

const [itemMedisUuid] = defineField("itemMedisUuid");
const [namaRacikan] = defineField("namaRacikan");
const [jenisRacikan] = defineField("jenisRacikan");
const [medicationQty] = defineField("medicationQty");
const [medicationPeriod] = defineField("medicationPeriod");
const [aturanPakaiUuid] = defineField("aturanPakaiUuid");
const [caraPakaiUuid] = defineField("caraPakaiUuid");
const [route] = defineField("route");
const [isChronic] = defineField("isChronic");
const [prescriptionNotes] = defineField("prescriptionNotes");
const [medicationDoseQty] = defineField("medicationDoseQty");
const [medicationDoseSatuanUuid] = defineField("medicationDoseSatuanUuid");
const [bentukRacikanUuid] = defineField("bentukRacikanUuid");

// Fetch obat
const fetchObat = async () => {
  try {
    const response = await medicalItemsStore.getWithoutPaginationApi("obat");
    if (response && response.payload) {
      obatPayload.value = response.payload;
    } else {
      obatPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    obatPayload.value = [];
  }
};

// Fetch cara pemakaian
const fetchCaraPemakaian = async () => {
  try {
    const response = await caraPakaiStore.getApi(1, 9999);
    if (response && response.payload) {
      caraPakaiPayload.value = response.payload;
    } else {
      caraPakaiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    caraPakaiPayload.value = [];
  }
};
// Fetch aturan pemakaian
const fetchAturanPemakaian = async () => {
  try {
    const response = await aturanPakaiStore.getApi(1, 9999);
    if (response && response.payload) {
      aturanPakaiPayload.value = response.payload;
    } else {
      aturanPakaiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data cara pakai", error);
    aturanPakaiPayload.value = [];
  }
};

// fetch satuan dosis
const fetchSatuanDosis = async () => {
  try {
    const response = await unitStore.getApi(1, 9999);
    if (response && response.payload) {
      satuanDosisPayload.value = response.payload;
    } else {
      satuanDosisPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    satuanDosisPayload.value = [];
  }
};
// Fetch cara pemakaian
const fetchBentukRacikan = async () => {
  try {
    const response = await priceConfigurationStore.getRacikanApi();
    if (response && response.payload) {
      bentukRacikanPayload.value = response.payload;
    } else {
      bentukRacikanPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    bentukRacikanPayload.value = [];
  }
};

onMounted(() => {
  fetchObat();
  fetchCaraPemakaian();
  fetchAturanPemakaian();
  fetchSatuanDosis();
  fetchBentukRacikan();
});

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);
const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};
const closeDialog = () => {
  emit("update:isDialogVisible", false);
  resetForm();
};

const tempDeletedRacikan = ref<Racikan[]>([]);

// isDelete Racikan
const handleRemoveRacikan = (index: number) => {
  const racikanToRemove = fields.value[index].value;
  const parseItem = JSON.parse(JSON.stringify(racikanToRemove));
  if (!parseItem.uuid) {
    tempDeletedRacikan.value.pop();
  } else {
    const tempKomponen = tempArrayRacikan.value.find(
      (temp: any) => temp.uuid === parseItem.uuid
    );

    if (tempKomponen) {
      const deletedItem = { ...tempKomponen, isDeleted: true };
      tempDeletedRacikan.value.push(deletedItem);
    }
  }
  remove(index);
};

// const tempEditRacikan = ref<Racikan[]>([]);

// isUpdated Racikan
const handleEditRacikan = ({
  index,
  valueItemMedis,
  valueQty,
}: {
  index: number;
  valueItemMedis?: string;
  valueQty?: number;
}) => {
  const racikanToEdit = fields.value[index].value;
  const parseItem = JSON.parse(JSON.stringify(racikanToEdit));
  const tempKomponen = tempArrayRacikan.value.find(
    (temp: any) =>
      temp.uuid === parseItem.uuid &&
      (temp.itemMedisUuid !== parseItem.valueItemMedis ||
        temp.madicationQty !== parseItem.valueQty)
  );

  if (tempKomponen) {
    const parseItemRacikan = JSON.parse(
      JSON.stringify({ ...fields.value[index].value, isUpdated: true })
    );
    fields.value[index].value = parseItemRacikan;
    console.log("fields racikan", fields.value[index].value);
  }
};

const onSubmit = handleSubmit(async (values: any) => {
  try {
    const combinedArrayRacikan = [
      ...(values.racikan || []),
      ...tempDeletedRacikan.value,
    ];
    values.racikan = JSON.parse(JSON.stringify(combinedArrayRacikan));
    if (props.payload.isCompound || digerus.value) {
      values.isCompound = true;
      values.type = "racikan";
    } else {
      values.isCompound = false;
      values.type = "satuan";
    }

    if (!props.payload || !props.payload.uuid) {
      throw new Error("UUID is missing for edit operation");
    }
    const uuid = props.payload.uuid;
    const response = await doctorPrescriptionStore.updateObatApi(uuid, values);
    console.log("Data updated successfully:", response);
    emit("data-updated");
    closeDialog();
  } catch (error) {
    console.error("Failed to process the data:", error);
  }
});

watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (newValue) {
      digerus.value = props.method === "digerus";
      if (props.method !== "add" && props.payload) {
        setValues({
          ...props.payload,
          jenisRacikan: props.payload.jenisRacikan ?? 0,
        });
        tempArrayRacikan.value = props.payload.racikan;
      }
    } else {
      resetForm();
      tempArrayRacikan.value = [];
      tempDeletedRacikan.value = [];
    }
  }
);

const tempArrayRacikan = ref<Racikan[]>([]);

const handlePushRacikan = () => {
  push({
    itemMedisUuid: "",
    medicationQty: 0,
    isUpdated: false,
  });
};
const test = ref();
</script>
<template>
  <CustomDialog
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    width="1030px"
  >
    <template #header>Edit Obat</template>
    <template #body>
      <div class="grid grid-cols-[40%,3%,57%]">
        <!-- Part 1 & Part 2 -->
        <div>
          <div class="grid grid-cols-2 gap-2">
            <div class="mt-[20px]">
              <p class="text-xs font-bold underline underline-offset-2">
                Jenis Kelamin
              </p>
              <CustomChip
                :showCheckedIcon="false"
                label="Laki-laki"
                bgColor="bg-male-75"
                textColor="text-male-300"
                customClass="h-5 border-none"
                class="mt-[10px]"
              />
            </div>
            <div class="mt-[20px]">
              <p class="text-xs font-bold underline underline-offset-2">
                Tanggal Lahir
              </p>
              <p class="text-sm mt-[10px]">
                17-10-2024 <span class="font-bold">|</span>
                <span class="font-bold text-adameds-300">24Th 0Bl 1Hr</span>
              </p>
            </div>
          </div>
          <!-- Part 1 -->
          <div class="grid grid-cols-1">
            <div
              class="mt-[20px] rounded-lg bg-adameds-50 h-[250px] grid grid-cols-2"
            >
              <!-- T.Darah -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">T.Darah</p>
                <div class="bg-white rounded-lg h-[25px] w-[120px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">110/70 mmHg</p>
                </div>
              </div>
              <!-- Frek.Nadi -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Frek.Nadi</p>
                <div class="bg-white rounded-lg h-[25px] w-[100px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">80 x/mnt</p>
                </div>
              </div>
              <!-- Frek.Nafas -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Frek.Nafas</p>
                <div class="bg-white rounded-lg h-[25px] w-[100px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">20 x/mnt</p>
                </div>
              </div>
              <!-- Suhu -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Suhu</p>
                <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">30</p>
                </div>
              </div>
              <!-- Berat -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Berat</p>
                <div class="bg-white rounded-lg h-[25px] w-[60px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">20 kg</p>
                </div>
              </div>
              <!-- Tinggi -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Tinggi</p>
                <div class="bg-white rounded-lg h-[25px] w-[80px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">160 cm</p>
                </div>
              </div>
              <!-- Scor GCS -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Scor GCS</p>
                <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">0</p>
                </div>
              </div>
              <!-- Skala Nyeri -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Skala Nyeri</p>
                <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">-</p>
                </div>
              </div>
              <!-- Alergi -->
              <div class="flex mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Alergi</p>
                <div class="bg-white rounded-lg h-[25px] w-[50px] ml-[10px]">
                  <p class="text-sm ml-[10px] mt-[3px]">0</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Part 2 -->
          <div class="grid grid-cols-1">
            <div
              class="mt-[20px] rounded-lg bg-adameds-50 h-[160px] grid grid-cols-1"
            >
              <!-- Keluhan & Diagnosa Primer -->
              <div class="mt-[10px] ml-[10px]">
                <p class="text-sm font-bold">Keluhan</p>
                <div class="bg-white rounded-lg h-[23px] w-[370px] mt-[10px]">
                  <p class="text-sm ml-[10px]">Nyeri pantat disuruduk babi</p>
                </div>
                <p class="text-sm font-bold mt-[20px]">Diagnosa Primer</p>
                <div class="bg-white rounded-lg h-[23px] w-[370px] mt-[10px]">
                  <p class="text-sm ml-[10px]">
                    G12.1 - OTHER INHERITED SPINAL MUSCULAR ATROPHY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-mediumGrey-300 w-[2px] h-[500px] mt-[20px] ml-[13px]"
        ></div>
        <!-- Form Obat -->
        <div>
          <!-- Racikan tambah obat -->
          <div
            v-if="payload.isCompound || digerus"
            class="flex justify-between items-end mt-[15px]"
          >
            <CustomTextfield
              v-model="namaRacikan"
              label="Nama Racikan"
              placeholder="Masukkan Nama Racikan"
            />
            <CustomSwitch
              v-model="jenisRacikan"
              :show-label="true"
              label="Sirup"
              sideLabel="Tidak"
              sideLabelTrue="Ya"
              :true-value="1"
              :false-value="0"
            />
            <CustomButton
              label="Tambah Obat"
              icon="PhPlus"
              @click="handlePushRacikan"
            />
          </div>
          <p v-if="!payload.isCompound && !digerus" class="mt-[15px] font-bold">
            Obat 1
          </p>
          <hr class="border border-slate-200 mt-[10px]" />
          <div
            v-if="!payload.isCompound && !digerus"
            class="grid grid-cols-[80%,20%]"
          >
            <!-- Nama Obat -->
            <div class="mt-[20px]">
              <CustomSelect
                v-model="itemMedisUuid"
                place-holder="Pilih Nama Obat"
                label="Nama Obat"
                class="mr-[20px]"
                optionLabel="name"
                optionValue="uuid"
                :options="obatPayload"
                :invalid="!!errors.itemMedisUuid"
                :invalidMessage="errors.itemMedisUuid"
                :required="errors.itemMedisUuid ? true : false"
              />
            </div>
            <!-- Jumlah Total -->
            <div class="mt-[20px]">
              <CustomInputNumber
                v-model="medicationQty"
                label="Jumlah Total"
                :show-buttons="true"
                :invalid="!!errors.medicationQty"
                :invalidMessage="errors.medicationQty"
                :required="errors.medicationQty ? true : false"
              />
            </div>
          </div>
          <div
            v-if="payload.isCompound || digerus"
            v-for="(fieldsRacikan, idx) in fields"
            class="flex justify-between w-full items-end mt-5 gap-2.5"
          >
            <!-- Nama Obat -->
            <CustomSelect
              v-model="fieldsRacikan.value.itemMedisUuid"
              place-holder="Cari Nama Obat"
              label="Nama Obat"
              class="grow"
              optionLabel="name"
              optionValue="uuid"
              :options="obatPayload"
              :invalid="(errors as any)[`racikan[${idx}].itemMedisUuid`] ? true : false"
              :invalidMessage="(errors as any)[`racikan[${idx}].itemMedisUuid`]"
              @update:modelValue="
                handleEditRacikan({
                  index: idx,
                  valueItemMedis: fieldsRacikan.value.itemMedisUuid,
                })
              "
            />
            <!-- Jumlah Total -->
            <CustomInputNumber
              v-model="fieldsRacikan.value.medicationQty"
              label="Jumlah Total"
              :show-buttons="true"
              class="w-[150px]"
              :invalid="(errors as any)[`racikan[${idx}].medicationQty`] ? true : false"
              :invalidMessage="(errors as any)[`racikan[${idx}].medicationQty`]"
              @update:modelValue="
                handleEditRacikan({
                  index: idx,
                  valueQty: fieldsRacikan.value.medicationQty,
                })
              "
            />
            <CustomButton
              label=""
              background-color="bg-danger-300 rounded-lg"
              class="h-1/2 w-[40px] p-0 mt-3"
              @click="handleRemoveRacikan(idx)"
            >
              <img src="@/assets/icons/delete.svg" alt="" />
            </CustomButton>
          </div>
          <!-- Embalase -->
          <div
            v-if="payload.isCompound || digerus"
            class="flex bg-adameds-50 items-center gap-2.5 w-full my-5 p-5 rounded-[10px] juetify-center"
          >
            <div class="font-semibold text-MD grow">
              Dibuat Sebanyak (Embalase)
            </div>
            <CustomInputNumber
              v-model="medicationQty"
              label=""
              class="w-[50px]"
              :invalid="!!errors.medicationQty"
              :invalidMessage="errors.medicationQty"
              :required="errors.medicationQty ? true : false"
            />
            <CustomSelect
              v-model="bentukRacikanUuid"
              label=""
              :options="bentukRacikanPayload"
              option-label="namaBentukRacikan"
              option-value="uuid"
              :invalid="!!errors.bentukRacikanUuid"
              :invalidMessage="errors.bentukRacikanUuid"
              :required="errors.bentukRacikanUuid ? true : false"
            />
          </div>

          <div class="grid grid-cols-4 gap-4 mt-5">
            <!-- Periode -->
            <CustomSelect
              v-model="medicationPeriod"
              place-holder=""
              label="Periode"
              class=""
              optionLabel=""
              optionValue=""
              :options="['Hari', 'Jam', 'Minggu', 'Tiap', 'Khusus']"
              :invalid="!!errors.medicationPeriod"
              :invalidMessage="errors.medicationPeriod"
              :required="errors.medicationPeriod ? true : false"
            />
            <!-- Aturan Pakai -->
            <CustomSelect
              v-model="aturanPakaiUuid"
              place-holder="Hari"
              label="Aturan Pakai"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :options="aturanPakaiPayload"
              :invalid="!!errors.aturanPakaiUuid"
              :invalidMessage="errors.aturanPakaiUuid"
              :required="errors.aturanPakaiUuid ? true : false"
            />
            <!-- Jumlah Konsumsi -->
            <CustomInputNumber
              v-model="medicationDoseQty"
              label="Jumlah Konsumsi"
              :show-buttons="true"
              class="truncate"
              :invalid="!!errors.medicationDoseQty"
              :invalidMessage="errors.medicationDoseQty"
              :required="errors.medicationDoseQty ? true : false"
            />
            <!-- Satuan Dosis -->
            <CustomSelect
              v-model="medicationDoseSatuanUuid"
              place-holder="Mg"
              label="Satuan Dosis"
              class=""
              optionLabel="name"
              optionValue="uuid"
              :options="satuanDosisPayload"
              :invalid="!!errors.medicationDoseSatuanUuid"
              :invalidMessage="errors.medicationDoseSatuanUuid"
              :required="errors.medicationDoseSatuanUuid ? true : false"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <!-- Cara Pakai -->
            <div class="mt-[20px]">
              <CustomSelect
                v-model="caraPakaiUuid"
                place-holder="Cari Cara Pakai"
                label="Cara Pakai"
                class="mr-[10px]"
                optionLabel="caraPakai"
                optionValue="uuid"
                :options="caraPakaiPayload"
                :invalid="!!errors.caraPakaiUuid"
                :invalidMessage="errors.caraPakaiUuid"
                :required="errors.caraPakaiUuid ? true : false"
              />
            </div>
            <!-- Rute Pemberian -->
            <div class="mt-[20px]">
              <CustomSelect
                v-model="route"
                place-holder="Cari Rute Pemberian"
                label="Rute Pemberian"
                class=""
                optionLabel=""
                optionValue=""
                :options="[
                  'Implant',
                  'Inhalation',
                  'Instillation',
                  'nasal',
                  'oral',
                  'parental',
                  'rectal',
                  'sublingual',
                  'transdermal',
                  'vaginal',
                ]"
              />
            </div>
            <!-- Obat Pulang -->
            <!-- <div class="mt-[10px]">
              <CustomSwitch
                v-model="isTakeaway"
                :show-label="true"
                label="Obat Pulang"
                sideLabel="Tidak"
                sideLabelTrue="Ya"
              />
            </div> -->
            <!-- Obat Kronis -->
            <div class="mt-[10px]">
              <CustomSwitch
                v-model="isChronic"
                :show-label="true"
                label="Obat Kronis"
                sideLabel="Tidak"
                sideLabelTrue="Ya"
              />
            </div>
            <!-- Catatan -->
            <div class="mt-[10px]">
              <CustomTextArea
                v-model="prescriptionNotes"
                label="Catatan"
                placeholder="-"
                class="mr-[10px]"
              />
            </div>
            <!-- Alasan Diganti -->
            <!-- <div class="mt-[10px]">
              <CustomTextArea
                :label="
                  payload.isCompound ? 'Alasan Diganti' : 'Alasan Digerus'
                "
                :placeholder="
                  payload.isCompound
                    ? 'Masukan alasan diganti'
                    : 'Masukan alasan digerus'
                "
              />
            </div> -->
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <CustomButton
          label="Reset"
          outlined
          class=""
          borderColor="border-grey-200"
          textColor="text-grey-300"
          @click="resetForm"
        />
        <CustomButton @click="onSubmit" label="Simpan Edit" class="ml-[10px]" />
      </div>
    </template>
  </CustomDialog>
</template>
