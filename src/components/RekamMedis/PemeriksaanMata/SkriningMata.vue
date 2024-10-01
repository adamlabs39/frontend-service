<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const listHasilPinhole = ref([
  { code: "39021009", tampilan: "Kelainan refraksi", range: "6/12 - 6/6" },
  { code: "OI000044", tampilan: "Kelainan organik", range: "3/60 - <6/12" },
]);
const hasilPihnhole = (mata: string) => {
  let tempHasil = 0;
  if (mata == "OD") {
    tempHasil = odPinholeDenominator.value / odPinholeNumerat.value;
  } else if (mata == "OS") {
    tempHasil = osPinholeDenominator.value / osPinholeNumerat.value;
  }

  let tempHasilStr = "";
  if (tempHasil >= 6 / 12 && tempHasil <= 1) {
    tempHasilStr = listHasilPinhole.value[0].tampilan;
  } else if (tempHasil >= 3 / 60 && tempHasil < 6 / 12) {
    tempHasilStr = listHasilPinhole.value[1].tampilan;
  }

  if (mata == "OD") {
    odHasilPinhole.value = tempHasilStr;
  } else if (mata == "OS") {
    osHasilPinhole.value = tempHasilStr;
  }
};

const listFundus = ref([
  { code: "1090009", tampilan: "Tingkat kekeruhan iris mata belum penuh" },
  { code: "34071009", tampilan: "Tingkat kekeruhan iris mata penuh" },
]);
const listShadowTest = ref([
  { code: "10828004", tampilan: "Tingkat kekeruhan iris mata belum penuh" },
  { code: "260385009", tampilan: "Tingkat kekeruhan iris mata penuh" },
]);
const listHasilVisusTajam = ref([
  { code: "45089002", tampilan: "Normal", range: "6/12 - 6/6" },
  {
    code: "397543001",
    tampilan: "Gangguan Penglihatan Ringan",
    range: " 6/18 - <6/12",
  },
  {
    code: "397542006",
    tampilan: "Gangguan Penglihatan Sedang",
    range: "6/60 - <6/18",
  },
  {
    code: "397541004",
    tampilan: "Gangguan Penglihatan Berat",
    range: "3/60 - <6/60",
  },
  { code: "274572000", tampilan: "Buta", range: "<3/60" },
]);
const hasilVisusTajam = (mata: string) => {
  let tempHasil = 0;
  if (mata == "OD") {
    tempHasil = odVisusTajamDenominator.value / odVisusTajamNumerator.value;
  } else if (mata == "OS") {
    tempHasil = osVisusTajamDenominator.value / osVisusTajamNumerator.value;
  }

  let tempHasilStr = "";
  if (tempHasil >= 6 / 12 && tempHasil <= 1) {
    tempHasilStr = listHasilVisusTajam.value[0].tampilan;
  } else if (tempHasil >= 6 / 18 && tempHasil < 6 / 12) {
    tempHasilStr = listHasilVisusTajam.value[1].tampilan;
  } else if (tempHasil >= 6 / 60 && tempHasil < 6 / 18) {
    tempHasilStr = listHasilVisusTajam.value[1].tampilan;
  } else if (tempHasil >= 3 / 60 && tempHasil < 6 / 60) {
    tempHasilStr = listHasilVisusTajam.value[1].tampilan;
  } else if (tempHasil < 3 / 60) {
    tempHasilStr = listHasilVisusTajam.value[1].tampilan;
  }

  if (mata == "OD") {
    odHasilVisusTajam.value = tempHasilStr;
  } else if (mata == "OS") {
    osHasilVisusTajam.value = tempHasilStr;
  }
};

const listPemeriksaanLanjutan = ref([
  { code: "422256009", tampilan: "Counts fingers - distance vision" },
  { code: "260295004", tampilan: "Sees hand movements" },
  { code: "260296003", tampilan: "Light perception" },
  { code: "63063006", tampilan: "Visual acuity, no light perception" },
]);

const listHasilGlaukoma = ref([
  { code: "N", tampilan: "Tidak Dicurigai Glaukoma", range: "10 - 21" },
  { code: "23986001", tampilan: "Dicurigai Glaukoma", range: "> 21" },
]);

const countHasilGlaukoma = (mata: string) => {
  let tempGlaukoma;
  let tempHasilStr;
  if (mata == "OD") {
    tempGlaukoma = odGlaukoma.value;
  } else if (mata == "OS") {
    tempGlaukoma = osGlaukoma.value;
  }

  if (tempGlaukoma >= 10 && tempGlaukoma <= 21) {
    tempHasilStr = listHasilGlaukoma.value[0].tampilan;
  } else if (tempGlaukoma > 21) {
    tempHasilStr = listHasilGlaukoma.value[1].tampilan;
  }

  if (mata == "OD") {
    odHasilGlaukoma.value = tempHasilStr;
  } else if (mata == "OS") {
    osHasilGlaukoma.value = tempHasilStr;
  }
};

// Kanan
const odVisusDenominator = ref();
const odVisusNumerat = ref();

const odPinholeDenominator = ref();
const odPinholeNumerat = ref();
const odHasilPinhole = ref();
const odPupilIskatarak = ref(true);
const odSnomed = ref();
const odSnomedUuid = ref();

const odFundus = ref();
const odShadowTest = ref();

const odSphJauh = ref();
const odCyl = ref();
const odAxis = ref();
const odVisusTajamDenominator = ref();
const odVisusTajamNumerator = ref();
const odHasilVisusTajam = ref();

const odPemeriksaanLanjutan = ref();

const odSphDekat = ref();
const odGlaukoma = ref();
const odHasilGlaukoma = ref();
const odIsretinopati = ref(false);
// Kiri
const osVisusDenominator = ref();
const osVisusNumerat = ref();

const osPinholeDenominator = ref();
const osPinholeNumerat = ref();
const osHasilPinhole = ref();
const osPupilIskatarak = ref(true);
const osSnomed = ref();
const osSnomedUuid = ref();

const osFundus = ref();
const osShadowTest = ref();

const osSphJauh = ref();
const osCyl = ref();
const osAxis = ref();
const osVisusTajamDenominator = ref();
const osVisusTajamNumerator = ref();
const osHasilVisusTajam = ref();

const osPemeriksaanLanjutan = ref();

const osSphDekat = ref();
const osGlaukoma = ref();
const osHasilGlaukoma = ref();
const osIsretinopati = ref(false);
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Skrining Mata</template>
    <template #content>
      <div class="pt-5">
        <!-- Tajam Penglihatan -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Tajam Penglihatan menggunakan Tes Uncorrected Snelled Chart
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr_min-content_1fr_min-content_1fr]"
          >
            <CustomInputNumber
              v-model="odVisusDenominator"
              label="Pemeriksaan Visus Kanan"
            />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
            <CustomInputNumber
              v-model="odVisusNumerat"
              :showLabel="false"
              class="mt-auto"
            />
            <div class="border border-gray-200 mx-[35px]"></div>
            <CustomInputNumber
              v-model="osVisusDenominator"
              label="Pemeriksaan Visus Kiri"
            />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
            <CustomInputNumber
              v-model="osVisusNumerat"
              :showLabel="false"
              class="mt-auto"
            />
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow label="Pemeriksaan Visus Kanan" value="-" />
              <hr class="border-adameds-300" />
              <CustomInfoRow label="Pemeriksaan Visus Kiri" value="-" />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Katarak -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Katarak
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Pinhole Kanan
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber
                    v-model="odPinholeDenominator"
                    :showLabel="false"
                    class=""
                    @update:model-value="hasilPihnhole('OD')"
                  />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber
                    v-model="odPinholeNumerat"
                    :showLabel="false"
                    class="mt-auto"
                    @update:model-value="hasilPihnhole('OD')"
                  />
                </div>
              </div>
              <CustomTextfield
                v-model="odHasilPinhole"
                :showLabel="false"
                placeholder="Hasil Pemeriksaan Pinhole Kanan"
                class="mt-auto"
                readOnly
              />
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Segment Anterior (Pupil) Kanan
                </label>
                <div class="flex">
                  <!-- OV000393 -->
                  <CustomRadio
                    v-model="odPupilIskatarak"
                    :value="true"
                    sideLabel="Curiga Katarak"
                    class="mr-5"
                  />
                  <CustomRadio
                    v-model="odPupilIskatarak"
                    :value="false"
                    sideLabel="Kelainan Mata Lainnya"
                  />
                </div>
              </div>
              <CustomSelect
                v-if="!odPupilIskatarak"
                v-model="odSnomed"
                :showLabel="false"
                placeHolder="Kelainan Mata Lain (Snomed-CT)"
                class="col-span-2"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Pinhole Kiri
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber
                    v-model="osPinholeDenominator"
                    :showLabel="false"
                    class=""
                    @update:model-value="hasilPihnhole('OS')"
                  />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber
                    v-model="osPinholeNumerat"
                    :showLabel="false"
                    class="mt-auto"
                    @update:model-value="hasilPihnhole('OS')"
                  />
                </div>
              </div>
              <CustomTextfield
                :showLabel="false"
                v-model="osHasilPinhole"
                placeholder="Hasil Pemeriksaan Pinhole Kiri"
                class="mt-auto"
                readOnly
              />
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Segment Anterior (Pupil) Kiri
                </label>
                <div class="flex">
                  <!-- OV000393 -->
                  <CustomRadio
                    v-model="osPupilIskatarak"
                    :value="true"
                    sideLabel="Curiga Katarak"
                    class="mr-5"
                  />
                  <CustomRadio
                    v-model="osPupilIskatarak"
                    :value="false"
                    sideLabel="Kelainan Mata Lainnya"
                  />
                </div>
              </div>
              <CustomSelect
                v-if="!osPupilIskatarak"
                v-model="osSnomed"
                :showLabel="false"
                placeHolder="Kelainan Mata Lain (Snomed-CT)"
                class="col-span-2"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow label="Pemeriksaan Pinhole Kanan" value="-" />
              <CustomInfoRow
                label="Pemeriksaan Segment Anterior (Pupil) Kanan*"
                value="-"
              />
              <hr class="border-adameds-300" />
              <CustomInfoRow label="Pemeriksaan Pinhole Kiri" value="-" />
              <CustomInfoRow
                label="Pemeriksaan Segment Anterior (Pupil) Kiri*"
                value="-"
              />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Jika Pemeriksaan Pupil -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Jika Pemeriksaan Pupil hasilnya Positif, maka dilanjutkan
            pemeriksaan dengan Oftalmoskop/Shadow test
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div>
              <CustomSelect
                v-model="odFundus"
                label="Pemeriksaan Refleks Fundus Kanan"
                placeHolder="Pilih Pemeriksaan Refleks Fundus Kanan"
                class="mb-5"
                optionLabel="tampilan"
                optionValue="code"
                :options="listFundus"
              />
              <CustomSelect
                v-model="odShadowTest"
                label="Pemeriksaan Shadow Test Kanan"
                placeHolder="Pilih Pemeriksaan Shadow Test Kanan"
                class=""
                optionLabel="tampilan"
                optionValue="code"
                :options="listShadowTest"
              />
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div>
              <CustomSelect
                v-model="osFundus"
                label="Pemeriksaan Refleks Fundus Kiri"
                placeHolder="Pilih Pemeriksaan Refleks Fundus Kiri"
                class="mb-5"
                optionLabel="tampilan"
                optionValue="code"
                :options="listFundus"
              />
              <CustomSelect
                v-model="osShadowTest"
                label="Pemeriksaan Shadow Test Kiri"
                placeHolder="Pilih Pemeriksaan Shadow Test Kiri"
                class=""
                optionLabel="tampilan"
                optionValue="code"
                :options="listShadowTest"
              />
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow
                label="Pemeriksaan Reflek Fundus Kanan"
                value="-"
              />
              <CustomInfoRow label="Pemeriksaan Shadow Test Kanan" value="-" />
              <hr class="border-adameds-300" />
              <CustomInfoRow label="Pemeriksaan Reflek Fundus Kiri" value="-" />
              <CustomInfoRow label="Pemeriksaan Shadow Test Kiri" value="-" />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Kelainan Refraksi Mata -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Kelainan Refraksi Mata Jauh
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kanan
              </label>
              <CustomInputNumber v-model="odSphJauh" label="Sph" class="mb-5" />
              <CustomInputNumber v-model="odCyl" label="Cyl" class="mb-5" />
              <CustomInputNumber v-model="odAxis" label="Axis" class="mb-5" />
              <div class="grid grid-cols-2">
                <label
                  class="block font-semibold mb-[5px] text-normal col-span-2"
                >
                  Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kanan
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber
                    v-model="odVisusTajamDenominator"
                    @update:model-value="hasilVisusTajam('OD')"
                    :showLabel="false"
                    class=""
                  />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber
                    v-model="odVisusTajamNumerator"
                    @update:model-value="hasilVisusTajam('OD')"
                    :showLabel="false"
                    class="mt-auto"
                  />
                </div>
                <CustomTextfield
                  v-model="odHasilVisusTajam"
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Visus Tajam"
                  class="mt-auto ml-5"
                  readOnly
                />
              </div>
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kiri
              </label>
              <CustomInputNumber v-model="osSphJauh" label="Sph" class="mb-5" />
              <CustomInputNumber v-model="osCyl" label="Cyl" class="mb-5" />
              <CustomInputNumber v-model="osAxis" label="Axis" class="mb-5" />
              <div class="grid grid-cols-2">
                <label
                  class="block font-semibold mb-[5px] text-normal col-span-2"
                >
                  Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kiri
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber
                    v-model="osVisusTajamDenominator"
                    @update:model-value="hasilVisusTajam('OS')"
                    :showLabel="false"
                    class=""
                  />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber
                    v-model="osVisusTajamNumerator"
                    @update:model-value="hasilVisusTajam('OS')"
                    :showLabel="false"
                    class="mt-auto"
                  />
                </div>
                <CustomTextfield
                  v-model="osHasilVisusTajam"
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Visus Tajam"
                  class="mt-auto ml-5"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kanan
              </div>
              <div class="grid grid-cols-2 gap-y-[19px]">
                <CustomInfoRow label="Sph" value="-" />
                <CustomInfoRow label="Cyl" value="-" />
                <CustomInfoRow label="Axis" value="-" />
              </div>
              <div class="font-semibold underline text-normal">
                Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kanan
              </div>
              <div class="grid grid-cols-2">
                <CustomInfoRow label="Nilai" value="-" />
                <CustomInfoRow label="Hasil" value="-" />
              </div>
              <hr class="border-adameds-300" />
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kiri
              </div>
              <div class="grid grid-cols-2 gap-y-[19px]">
                <CustomInfoRow label="Sph" value="-" />
                <CustomInfoRow label="Cyl" value="-" />
                <CustomInfoRow label="Axis" value="-" />
              </div>
              <div class="font-semibold underline text-normal">
                Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kiri
              </div>
              <div class="grid grid-cols-2">
                <CustomInfoRow label="Nilai" value="-" />
                <CustomInfoRow label="Hasil" value="-" />
              </div>
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Jika hasil pemeriksaan adalah buta -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Jika hasil pemeriksaan adalah buta, maka dilakukan pemeriksaan
            lanjutan
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <CustomSelect
              v-model="odPemeriksaanLanjutan"
              label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kanan"
              placeHolder="Pilih Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kanan"
              class="mb-5"
              optionLabel="tampilan"
              optionValue="code"
              :options="listPemeriksaanLanjutan"
            />
            <div class="border border-gray-200 mx-[35px]"></div>
            <CustomSelect
              v-model="osPemeriksaanLanjutan"
              label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kiri"
              placeHolder="Pilih Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kiri"
              class="mb-5"
              optionLabel="tampilan"
              optionValue="code"
              :options="listPemeriksaanLanjutan"
            />
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow
                label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Warna Kanan"
                value="-"
              />
              <hr class="border-adameds-300" />
              <CustomInfoRow
                label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Warna Kiri"
                value="-"
              />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Kelainan Refraksi Mata Dekat -->
        <div
          class="border-adameds-300 rounded-[10px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Kelainan Refraksi Mata Dekat
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Dekat Mata Kanan
              </label>
              <CustomInputNumber
                v-model="odSphDekat"
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +)"
                class="mb-5"
              />
              <div class="grid grid-cols-2 mb-5 gap-x-5">
                <label
                  class="block col-span-2 mb-[5px] font-semibold text-normal"
                >
                  Dicurigai Glaukoma pada Mata Kanan
                </label>
                <CustomInputNumber
                  v-model="odGlaukoma"
                  @update:model-value="countHasilGlaukoma('OD')"
                  :showLabel="false"
                  class=""
                />
                <CustomTextfield
                  v-model="odHasilGlaukoma"
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Glukoma"
                  class="mt-auto"
                  readOnly
                />
              </div>
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Dicurigai Retinopati pada Mata Kanan
                </label>
                <div class="flex">
                  <CustomRadio
                    v-model="odIsretinopati"
                    :value="false"
                    sideLabel="Normal"
                    class="mr-5"
                  />
                  <CustomRadio
                    v-model="odIsretinopati"
                    :value="true"
                    sideLabel="Suspek Retinopati"
                  />
                </div>
              </div>
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Dekat Mata Kiri
              </label>
              <CustomInputNumber
                v-model="osSphDekat"
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +)"
                class="mb-5"
              />
              <div class="grid grid-cols-2 mb-5 gap-x-5">
                <label
                  class="block col-span-2 mb-[5px] font-semibold text-normal"
                >
                  Dicurigai Glaukoma pada Mata Kiri
                </label>
                <CustomInputNumber
                  v-model="osGlaukoma"
                  @update:model-value="countHasilGlaukoma('OS')"
                  :showLabel="false"
                  class=""
                />
                <CustomTextfield
                  v-model="osHasilGlaukoma"
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Glukoma"
                  class="mt-auto"
                  readOnly
                />
              </div>
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Dicurigai Retinopati pada Mata Kiri
                </label>
                <div class="flex">
                  <CustomRadio
                    v-model="osIsretinopati"
                    :value="false"
                    sideLabel="Normal"
                    class="mr-5"
                  />
                  <CustomRadio
                    v-model="osIsretinopati"
                    :value="true"
                    sideLabel="Suspek Retinopati"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Dekat Mata Kanan
              </div>
              <CustomInfoRow
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +) Kanan"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Glaukoma pada mata Kanan"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Retinopati pada Mata Kanan"
                value="-"
              />
              <hr class="border-adameds-300" />
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Dekat Mata Kiri
              </div>
              <CustomInfoRow
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +) Kiri"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Glaukoma pada mata Kiri"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Retinopati pada Mata Kiri"
                value="-"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
