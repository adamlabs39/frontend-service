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
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import {
  dateToEpoch,
  epochToDate,
  formatDate,
  formatTime,
  setTimeForDate,
} from "@/utils/Helpers";

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

const emit = defineEmits(["edit", "editAsesmen"]);
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
      suhu: yup.number().positive("Suhu tidak boleh negatif"),
      bloodOxygen: yup.number().positive("Blood Oxygen tidak boleh negatif"),
      gulaDarah: yup.number().positive("Gula Darah tidak boleh negatif"),
      crt: yup.boolean().default(false),
      oksigenTambahan: yup.boolean().default(false),
      tekananDarahSistole: yup
        .number()
        .positive("Tekanan Darah tidak boleh negatif"),
      tekananDarahDiastole: yup
        .number()
        .positive("Tekanan Darah tidak boleh negatif"),
      petugas: yup.string().default("Super Admin"),
    })
  )
);

// respirasi,kardiovaskuler, keadaanumum

const {
  resetForm,
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
const [crt] = defineFieldTandaVital("crt");
const [oksigenTambahan] = defineFieldTandaVital("oksigenTambahan");
const [tekananDarahSistole] = defineFieldTandaVital("tekananDarahSistole");
const [tekananDarahDiastole] = defineFieldTandaVital("tekananDarahDiastole");
const [petugas] = defineFieldTandaVital("petugas");

// Do the same for other numeric fields as needed

const onSubmitTandaVital = handleSubmitTandaVital(async (values: any) => {
  values.waktuAsesmen = dateToEpoch(
    setTimeForDate(
      values.waktuAsesmen,
      values.jamAsesmen.getHours(),
      values.jamAsesmen.getMinutes(),
      values.jamAsesmen.getSeconds()
    )
  );
  delete values.jamAsesmen;
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      isLatest: rekamMedisStore.openedRekamMedis.isLatest,
      key: "tanda_vital",
      data: values,
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

onBeforeMount(async () => {
  if (rekamMedisStore.openedRekamMedis.data.tandaVital) {
    const tempTandaVital = rekamMedisStore.openedRekamMedis.data.tandaVital;
    setValues({
      kriteriaPemantauan: tempTandaVital.kriteriaPemantauan,
      respirasiAnak: tempTandaVital.respirasiAnak,
      kardiovaskulerAnak: tempTandaVital.kardiovaskulerAnak,
      keadaanUmum: tempTandaVital.keadaanUmum,
      waktuAsesmen: epochToDate(tempTandaVital.waktuAsesmen as number) as Date,
      jamAsesmen: epochToDate(tempTandaVital.waktuAsesmen as number) as Date,
      frekuensiNafas: tempTandaVital.frekuensiNafas,
      frekuensiNadi: tempTandaVital.frekuensiNadi,
      suhu: tempTandaVital.suhu,
      bloodOxygen: tempTandaVital.bloodOxygen,
      gulaDarah: tempTandaVital.gulaDarah,
      crt: tempTandaVital.crt,
      oksigenTambahan: tempTandaVital.oksigenTambahan,
      tekananDarahSistole: tempTandaVital.tekananDarahSistole,
      tekananDarahDiastole: tempTandaVital.tekananDarahDiastole,
      petugas: tempTandaVital.petugas,
    });
  }
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
            v-model="crt"
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
              v-model:modelValue="tekananDarahSistole"
              type="number"
            />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
            <CustomInputNumber
              :showLabel="false"
              placeholder="98"
              v-model:modelValue="tekananDarahDiastole"
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
        v-if="currentMethod == 'detail' || currentMethod == 'detailPerpindahan'"
        class="py-5"
        :class="[
          currentMethod == 'detail'
            ? 'flex flex-col gap-[19px]'
            : 'grid grid-cols-4 gap-y-[30px]',
        ]"
      >
        <CustomInfoRow
          label="Kriteria Pemantauan"
          :value="kriteriaPemantauan"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Waktu Asesmen"
          :value="`${formatDate(waktuAsesmen as Date)}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Frekuensi Napas"
          :value="`${frekuensiNafas}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Frekuensi Nadi"
          :value="`${frekuensiNadi}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Suhu"
          :value="`${suhu}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Capillary Refill Time (CRT > 2 Detik)"
          :value="`${crt}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Blood Oxygen"
          :value="`${bloodOxygen}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <CustomInfoRow
          label="Gula Darah"
          :value="`${gulaDarah}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
        />
        <div
          class="py-5"
          :class="[
            currentMethod == 'detail'
              ? 'flex flex-col gap-[19px]'
              : 'grid grid-cols-6 col-span-4',
          ]"
        >
          <CustomInfoRow
            label="Oksigen Tambahan"
            :value="`${oksigenTambahan}`"
            :type="
              currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
            "
            :class="{ 'col-span-2': currentMethod == 'detailPerpindahan' }"
          />
          <CustomInfoRow
            label="Tekanan Darah"
            :value="`${tekananDarahSistole}`"
            :type="
              currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
            "
            :class="{ 'col-span-2': currentMethod == 'detailPerpindahan' }"
          />
          <CustomInfoRow
            label="Respirasi Anak"
            :value="`${respirasiAnak}`"
            :type="
              currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
            "
            :class="{ 'col-span-2': currentMethod == 'detailPerpindahan' }"
          />
        </div>
        <CustomInfoRow
          label="Kardiovaskuler Anak"
          :value="`${kardiovaskulerAnak}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
          :class="{ 'col-span-2': currentMethod == 'detailPerpindahan' }"
        />
        <CustomInfoRow
          label="Keadaan Umum"
          :value="`${keadaanUmum}`"
          :type="
            currentMethod == 'detailPerpindahan' ? 'vertical' : 'horizontal'
          "
          :class="{ 'col-span-2': currentMethod == 'detailPerpindahan' }"
        />
        <hr v-if="currentMethod == 'detail'" class="border-grey-200" />
        <CustomInfoRow
          v-if="currentMethod == 'detail'"
          label="Petugas Input"
          :value="petugas"
        />
        <CustomInfoRow
          v-if="currentMethod == 'detail'"
          label="Jam Input"
          :value="formatTime(waktuAsesmen as Date)"
        />
      </div>

      <!-- Dialog compare -->
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Tanda Vital</template>
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
                <HistoriTandaVital />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriTandaVital />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
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
                    v-model="crt"
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
                  <CustomSwitch
                    v-model="oksigenTambahan"
                    label="Oxygen Tambahan"
                  />
                  <div class="grid grid-cols-[1fr_min-content_1fr]">
                    <CustomInputNumber
                      label="Tekanan Darah"
                      placeholder="98"
                      v-model:modelValue="tekananDarahSistole"
                      type="number"
                    />
                    <span class="text-adameds-300 mx-[30px] mt-auto mb-2"
                      >/</span
                    >
                    <CustomInputNumber
                      :showLabel="false"
                      placeholder="98"
                      v-model:modelValue="tekananDarahDiastole"
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
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="currentMethod == 'form'"
              @click="resetForm"
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
              @click="emit('editAsesmen')"
              label="Edit"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="currentMethod == 'form'"
          @click="resetForm"
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
        <CustomButton
          v-if="currentMethod == 'detail'"
          @click="emit('editAsesmen')"
          label="Edit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
