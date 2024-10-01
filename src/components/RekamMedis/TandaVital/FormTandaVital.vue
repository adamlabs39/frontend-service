<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriTandaVital from "@/components/RekamMedis/TandaVital/HistoriTandaVital.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const emit = defineEmits(["edit"]);
const currentMethod = ref(props.method);

const criterias = ref([
  { name: "Checkup" },
  { name: "Pra Operasi" },
  { name: "Pasca Anestesi" },
]);

const respirasis = ref([
  { name: "Tidak ada retraksi / RR normal" },
  {
    name: "Takipnea, RR > 10, di atas nilai normal usianya atau menggunakan otot bantu pernapasan",
  },
  { name: "Takipnea, RR > 20  diatas nilai normal usianya ATAU ada Retraksi" },
  {
    name: "RR < 5 dibawah normal usianya ATAU ada retraksi berat  ATAU merintih",
  },
]);

const kardiovaskulers = ref([
  { name: "Tidak sianosis atau cRT 1 - 2 detik" },
  { name: "Tampak pucat atau cRT 3 detik" },
  {
    name: "Tampak sianotik / CRT > 4 detik atau takikardi, HR >= 20 di atas nilai normal sesuai usia",
  },
  {
    name: "Sianotik & motlet atau CRT > 5 detik atau tachicardi, HR > 30, di atas Nilai normal usianya",
  },
]);
const keadaanUmums = ref([
  { name: "Interaksi Biasa" },
  { name: "Somnolen dan dapat diterangkan" },
  { name: "Irritable" },
  { name: "Letargi, gelisah penurunan terhadap nyeri" },
]);

const schemaTandaVital = computed(() =>
  toTypedSchema(
    yup.object({
      kriteriaPemantauan: yup.string(),
      respirasiAnak: yup.string(),
      kardiovaskulerAnak: yup.string(),
      keadaanUmum: yup.string(),
      waktuAsesmen: yup.date(),
      jamAsesmen: yup.date(),
      frekuensiNafas: yup.number(),
      frekuensiNadi: yup.number(),
      suhu: yup.number().positive("Suhu must be positive"),
      bloodOxygen: yup.number().positive("Blood Oxygen must be positive"),
      gulaDarah: yup.number().positive("Gula Darah must be positive"),
      CRT: yup.boolean().default(false),
      oksigenTambahan: yup.boolean().default(false),
      numerator: yup
        .number()
        .required("Tekanan Darah is required")
        .positive("Tekanan Darah must be positive"),
      denominator: yup
        .number()
        .required("Tekanan Darah is required")
        .positive("Tekanan Darah must be positive"),
      petugas: yup.string().required("Petugas alergi is required"),
    })
  )
);

// respirasi,kardiovaskuler, keadaanumum

const {
  handleSubmit: handleSubmitTandaVital,
  defineField: defineFieldTandaVital,
  setValues,
} = useForm({
  validationSchema: schemaTandaVital,
});

const [kriteriaPemantauan] = defineFieldTandaVital("kriteriaPemantauan");
const [respirasiAnak] = defineFieldTandaVital("respirasiAnak");
const [kardiovaskulerAnak] = defineFieldTandaVital("kardiovaskulerAnak");
const [keadaanUmum] = defineFieldTandaVital("keadaanUmum");

const [waktuAsesmen] = defineFieldTandaVital("waktuAsesmen");
const [jamAsesmen] = defineFieldTandaVital("jamAsesmen");
const [frekuensiNafas] = defineFieldTandaVital("frekuensiNafas");
const [frekuensiNadi] = defineFieldTandaVital("frekuensiNadi");
const [suhu] = defineFieldTandaVital("suhu");
const [bloodOxygen] = defineFieldTandaVital("bloodOxygen");
const [gulaDarah] = defineFieldTandaVital("gulaDarah");
const [CRT] = defineFieldTandaVital("CRT");
const [oksigenTambahan] = defineFieldTandaVital("oksigenTambahan");
const [numerator] = defineFieldTandaVital("numerator");
const [denominator] = defineFieldTandaVital("denominator");
const [petugas] = defineFieldTandaVital("petugas");

// Do the same for other numeric fields as needed

const onSubmitTandaVital = handleSubmitTandaVital((values: any) => {
  console.log("Adding new data", values);
  values.kardiovaskulerAnak = Number(values.kardiovaskulerAnak);
  values.keadaanUmum = Number(values.keadaanUmum);
  values.respirasiAnak = Number(values.respirasiAnak);
  currentMethod.value = "detail";
  emit("edit");
});

onBeforeMount(async () => {
  setValues({ petugas: "NamaKu" });
});

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
    <template #header> Tanda Vital</template>
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
        <div class="grid grid-cols-4 gap-[30px] py-3">
          <!-- Baris Pertama -->
          <CustomSelect
            label="Kriteria Pemantauan"
            v-model="kriteriaPemantauan"
            :options="criterias"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="PEWS"
            customSelectClass="border-[#C7CBD2]"
          />
          <div class="flex gap-[30px]">
            <CustomDatePicker v-model="waktuAsesmen" label="Waktu Asesmen" />
            <CustomDatePicker
              v-model="jamAsesmen"
              label="Jam Asesmen"
              timeOnly
            />
          </div>
          <CustomInputNumber
            label="Frekuensi Nafas"
            placeholder="46"
            v-model:modelValue="frekuensiNafas"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">x/mnt</div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber
            label="Frekuensi Nadi"
            placeholder="158"
            v-model:modelValue="frekuensiNadi"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">x/mnt</div>
            </template>
          </CustomInputNumber>
          <!-- Baris Kedua -->
          <CustomInputNumber
            label="Suhu"
            placeholder="37"
            v-model:modelValue="suhu"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">°C</div>
            </template>
          </CustomInputNumber>
          <CustomSwitch
            v-model="CRT"
            label=" Capillary Refill Time (CRT > 2 Detik)"
          />
          <CustomInputNumber
            label="Blood Oxygen"
            placeholder="98"
            v-model:modelValue="bloodOxygen"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">%</div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber
            label="Gula Darah"
            placeholder="98"
            v-model:modelValue="gulaDarah"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">mg/dL</div>
            </template>
          </CustomInputNumber>
          <!-- Baris Tiga -->
          <CustomSwitch v-model="oksigenTambahan" label="Oxygen Tambahan" />
          <div class="grid grid-cols-[1fr_min-content_1fr]">
            <CustomInputNumber
              label="Tekanan Darah"
              placeholder="98"
              v-model:modelValue="numerator"
              type="number"
            />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
            <CustomInputNumber
              :showLabel="false"
              placeholder="98"
              v-model:modelValue="denominator"
              type="number"
              class="mt-auto"
            >
              <template #appendText>
                <div class="flex items-center mr-2">mmHg</div>
              </template>
            </CustomInputNumber>
          </div>
          <CustomSelect
            label="Respirasi Anak"
            v-model="respirasiAnak"
            :options="respirasis"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Tidak ada retraksi / RR Normal"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-2"
          />
          <!-- Baris Keempat -->
          <CustomSelect
            label="Kardiovaskuler Anak"
            v-model="kardiovaskulerAnak"
            :options="kardiovaskulers"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Mungkin Sianosis"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-2"
          />
          <CustomSelect
            label="Keadaan Umum"
            v-model="keadaanUmum"
            :options="keadaanUmums"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Interaksi Mungkin Biasa"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-2"
          />
        </div>
      </div>

      <div
        v-if="currentMethod == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow
          label="Kriteria Pemantauan"
          :value="kriteriaPemantauan"
        />
        <CustomInfoRow label="Waktu Asesmen" :value="`${waktuAsesmen}`" />
        <CustomInfoRow label="Frekuensi Napas" :value="`${frekuensiNafas}`" />
        <CustomInfoRow label="Frekuensi Nadi" :value="`${frekuensiNadi}`" />
        <CustomInfoRow label="Suhu" :value="`${suhu}`" />
        <CustomInfoRow
          label="Capillary Refill Time (CRT > 2 Detik)"
          :value="`${CRT}`"
        />
        <CustomInfoRow label="Blood Oxygen" :value="`${bloodOxygen}`" />
        <CustomInfoRow label="Gula Darah" :value="`${gulaDarah}`" />
        <CustomInfoRow label="Oksigen Tambahan" :value="`${oksigenTambahan}`" />
        <CustomInfoRow label="Tekanan Darah" :value="`${numerator}`" />
        <CustomInfoRow label="Respirasi Anak" :value="`${respirasiAnak}`" />
        <CustomInfoRow
          label="Kardiovaskuler Anak"
          :value="`${kardiovaskulerAnak}`"
        />
        <CustomInfoRow label="Keadaan Umum" :value="`${keadaanUmum}`" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
      </div>

      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Tanda Vital</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr]">
            <div>
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
              <div class="grid grid-cols-[1fr_min-content_1fr]">
                <HistoriTandaVital />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriTandaVital />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <CustomSelect
                label="Kriteria Pemantauan"
                v-model="kriteriaPemantauan"
                :options="criterias"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="PEWS"
                customSelectClass="border-[#C7CBD2]"
              />
              <div class="grid grid-cols-2 gap-[30px]">
                <CustomDatePicker
                  v-model="waktuAsesmen"
                  label="Waktu Asesmen"
                />
                <CustomDatePicker
                  v-model="jamAsesmen"
                  label="Jam Asesmen"
                  timeOnly
                />
              </div>
              <div class="grid grid-cols-2 gap-[30px]">
                <CustomInputNumber
                  label="Frekuensi Nafas"
                  placeholder="46"
                  v-model:modelValue="frekuensiNafas"
                  type="number"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">x/mnt</div>
                  </template>
                </CustomInputNumber>
                <CustomInputNumber
                  label="Frekuensi Nadi"
                  placeholder="158"
                  v-model:modelValue="frekuensiNadi"
                  type="number"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">x/mnt</div>
                  </template>
                </CustomInputNumber>
              </div>
              <!-- Baris Kedua -->
              <div class="grid grid-cols-2 gap-[30px]">
                <CustomInputNumber
                  label="Suhu"
                  placeholder="37"
                  v-model:modelValue="suhu"
                  type="number"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">°C</div>
                  </template>
                </CustomInputNumber>
                <CustomSwitch
                  v-model="CRT"
                  label=" Capillary Refill Time (CRT > 2 Detik)"
                />
              </div>
              <div class="grid grid-cols-2 gap-[30px]">
                <CustomInputNumber
                  label="Blood Oxygen"
                  placeholder="98"
                  v-model:modelValue="bloodOxygen"
                  type="number"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">%</div>
                  </template>
                </CustomInputNumber>
                <CustomInputNumber
                  label="Gula Darah"
                  placeholder="98"
                  v-model:modelValue="gulaDarah"
                  type="number"
                >
                  <template #appendText>
                    <div class="flex items-center mr-2">mg/dL</div>
                  </template>
                </CustomInputNumber>
              </div>
              <!-- Baris Tiga -->
              <div class="grid grid-cols-2 gap-[30px]">
                <CustomSwitch v-model="oksigenTambahan" label="Oxygen Tambahan" />
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber
                    label="Tekanan Darah"
                    placeholder="98"
                    v-model:modelValue="numerator"
                    type="number"
                  />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber
                    :showLabel="false"
                    placeholder="98"
                    v-model:modelValue="denominator"
                    type="number"
                    class="mt-auto"
                  >
                    <template #appendText>
                      <div class="flex items-center mr-2">mmHg</div>
                    </template>
                  </CustomInputNumber>
                </div>
              </div>
              <CustomSelect
                label="Respirasi Anak"
                v-model="respirasiAnak"
                :options="respirasis"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Tidak ada retraksi / RR Normal"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-2"
              />
              <!-- Baris Keempat -->
              <CustomSelect
                label="Kardiovaskuler Anak"
                v-model="kardiovaskulerAnak"
                :options="kardiovaskulers"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Mungkin Sianosis"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-2"
              />
              <CustomSelect
                label="Keadaan Umum"
                v-model="keadaanUmum"
                :options="keadaanUmums"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Interaksi Mungkin Biasa"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-2"
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="currentMethod == 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="currentMethod == 'form'"
              label="Simpan"
              @click="onSubmitTandaVital"
            />
            <CustomButton
              v-if="currentMethod == 'detail'"
              label="Edit"
              @click="() => {}"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="currentMethod == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton
          v-if="currentMethod == 'form'"
          label="Simpan"
          @click="onSubmitTandaVital"
        />
        <CustomButton v-if="currentMethod == 'detail'" label="Edit" />
      </div>
    </template>
  </CustomAccordion>
</template>
