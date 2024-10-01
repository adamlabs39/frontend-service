<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import OdontogramInput from "./OdontogramInput.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriOdontogram from "@/components/RekamMedis/PemeriksaanGigi/HistoriOdontogram.vue";

const props = defineProps({
  header: {
    type: String,
    default: "Pemeriksaan Gigi",
  },
  method: {
    type: String,
    default: "form",
  },
  initialState: {
    type: String,
    default: "null",
  },
});

const listTorusPalatinus = ref([
  { code: "OV000074", tampilan: "Tidak Ada" },
  { code: "OV000075", tampilan: "Kecil" },
  { code: "OV000076", tampilan: "Sedang" },
  { code: "OV000077", tampilan: "Besar" },
  { code: "OV000078", tampilan: "Multiple" },
]);
const listTorusMandibularis = ref([
  { code: "OV000079", tampilan: "Tidak Ada" },
  { code: "OV000080", tampilan: "Sisi Kiri" },
  { code: "OV000081", tampilan: "Sisi Kanan" },
  { code: "OV000082", tampilan: "Kedua Sisi" },
]);
const listPalatum = ref([
  { code: "OV000083", tampilan: "Dalam" },
  { code: "OV000084", tampilan: "Sedang" },
  { code: "OV000085", tampilan: "Rendah" },
]);
const listDiastema = ref([
  { code: "OV000086", tampilan: "Tidak Ada Diastema" },
  { code: "OV000087", tampilan: "Ada Diastema" },
]);
const listGigiAnomali = ref([
  { code: "OV000088", tampilan: "Tidak Ada Gigi Anomali" },
  { code: "OV000089", tampilan: "Ada Gigi Anomali" },
]);
const listFrenulumLabialisLingualis = ref(["normal", "tinggi", "rendah"]);

const oklusiGigiUuid = ref();
const torusPalatinus = ref();
const torusMandibularis = ref();
const palatum = ref();
const diastema = ref(false);
const diastemaKeterangan = ref();
const gigiAnomali = ref();
const gigiAnomaliKet = ref();
const frenulumLabialis = ref();
const frenulumLingualis = ref();
const gigiDecayed = ref();
const gigiMissing = ref();
const gigiFilled = ref();
const temuanLain = ref();
const ketTindakanGigi = ref();
const detailDialog = ref(false);

const historyDialog = ref(false);
const showDialogHistory = () => {
  historyDialog.value = true;
};
</script>

<template>
  <div>
    <CustomAccordion headerClass="bg-adameds-50" :initialState="initialState">
      <template #header>{{ header }}</template>
      <template #content>
        <div class="pt-5">
          <div v-if="method == 'form'" class="flex flex-col">
            <CustomButton
              @click="showDialogHistory"
              class="!rounded-md my-[10px] ml-auto"
              label="Riwayat Pemeriksaan"
              size="small"
              icon="PhClockCounterClockwise"
            />
            <hr class="mb-[30px]" />
          </div>
          <OdontogramInput :method="method" />
          <div v-if="method == 'form'">
            <div class="grid grid-cols-3 gap-x-[30px] gap-y-5 mt-[30px]">
              <CustomSelect
                v-model="oklusiGigiUuid"
                label="Oklusi"
                placeHolder="Pilih Oklusi"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['KTP', 'Passport', 'SIM', 'Lainya']"
              />
              <CustomSelect
                v-model="torusPalatinus"
                label="Torus Palatinus"
                placeHolder="Pilih Torus Palatinus"
                class=""
                optionLabel="tampilan"
                optionValue="code"
                :showFilter="false"
                :options="listTorusPalatinus"
              />
              <CustomSelect
                v-model="torusMandibularis"
                label="Torus Mandibularis"
                placeHolder="Pilih Torus Mandibularis"
                class=""
                optionLabel="tampilan"
                optionValue="code"
                :showFilter="false"
                :options="listTorusMandibularis"
              />
              <CustomSelect
                v-model="palatum"
                label="Palatum"
                placeHolder="Pilih Palatum"
                class=""
                optionLabel="tampilan"
                optionValue="code"
                :showFilter="false"
                :options="listPalatum"
              />
              <CustomSelect
                v-model="frenulumLabialis"
                label="Frenulum Labalis"
                placeHolder="Pilih Frenulum Labalis"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="listFrenulumLabialisLingualis"
              />
              <CustomSelect
                v-model="frenulumLingualis"
                label="Frenulum Lingualis"
                placeHolder="Pilih Frenulum Lingualis"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="listFrenulumLabialisLingualis"
              />
              <CustomSwitch v-model="diastema" label="Diastema" />
              <CustomTextArea
                v-if="diastema"
                v-model="diastemaKeterangan"
                label="Keterangan Diasterma"
                class=""
                placeholder="Masukkan Keterangan Diasterma"
                height="h-10"
              />
              <CustomSwitch v-model="gigiAnomali" label="Gigi Anomali" />
              <CustomTextArea
                v-if="gigiAnomali"
                v-model="gigiAnomaliKet"
                label="Keterangan Gigi Anomali"
                class=""
                placeholder="Masukkan Keterangan Gigi Anomali"
                height="h-10"
              />
              <div class="grid grid-cols-3 gap-4">
                <CustomInputNumber
                  v-model="gigiDecayed"
                  label="Jml. Gigi Decayed"
                  :min="0"
                  showButtons
                />
                <CustomInputNumber
                  v-model="gigiMissing"
                  label="Jml. Gigi Missing"
                  :min="0"
                  showButtons
                />
                <CustomInputNumber
                  v-model="gigiFilled"
                  label="Jml. Gigi Filled"
                  :min="0"
                  showButtons
                />
              </div>
              <CustomTextArea
                v-model="temuanLain"
                label="Temuan Lainnya"
                placeholder="Masukkan Temuan Lainnya"
                class="col-span-3"
              />
              <CustomTextArea
                v-model="ketTindakanGigi"
                label="Keterangan Tindakan Gigi"
                placeholder="Masukkan Keterangan Tindakan Gigi"
                class="col-span-3"
              />
            </div>
          </div>
          <div v-else class="py-5 flex flex-col gap-[19px]">
            <CustomInfoRow label="Oklusi" value="Oklusi" />
            <CustomInfoRow label="Torus Palatinus" value="Torus Palatinus" />
            <CustomInfoRow
              label="Torus Mandibularis"
              value="Torus Mandibularis"
            />
            <CustomInfoRow label="Palatum" value="Palatum" />
            <CustomInfoRow
              label="Frenulum Labialis"
              value="Frenulum Labialis"
            />
            <CustomInfoRow
              label="Frenulum Lingualis"
              value="Frenulum Lingualis"
            />
            <CustomInfoRow label="Diastema" value="Tidak" />
            <CustomInfoRow label="Gigi Anomali" value="Tidak" />
            <CustomInfoRow label="Jml. Gigi Decayed" value="0" />
            <CustomInfoRow label="Jml. Gigi Missing" value="0" />
            <CustomInfoRow label="Jml. Gigi Filled" value="0" />
            <CustomInfoRow label="Temuan Lainnya" value="0" />
            <CustomInfoRow label="Keterangan Tindakan Gigi" value="-" />
            <hr class="border-grey-200" />
            <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
          </div>
        </div>
      </template>
      <template #footer>
        <div v-if="method == 'form'" class="flex items-end justify-end gap-3">
          <CustomButton
            label="Reset"
            textColor="text-grey-300"
            borderColor="border-2 border-grey-200"
            outlined
          />
          <CustomButton label="Simpan" />
        </div>
        <div v-else class="flex justify-between">
          <CustomButton
            @click="detailDialog = true"
            label="Detail"
            icon="DetailIcon"
          />
          <CustomButton label="Edit" />
        </div>
      </template>
    </CustomAccordion>
    <CustomDialog class="" v-model:visible="detailDialog" width="840px">
      <template #header>Detail Pemeriksaan Gigi - Odontogram</template>
      <template #body>
        <div class="pt-5">
          <OdontogramInput method="detail-gigi" />
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton label="Edit" />
        </div>
      </template>
    </CustomDialog>
    <!-- Dialog History -->
    <CustomDialog class="" v-model:visible="historyDialog" width="80%">
      <template #header>Pemeriksaan Gigi</template>
      <template #body>
        <div class="pt-5 grid grid-cols-[1fr_min-content_1fr_min-content_1fr]">
          <div class="mb-[18px] flex justify-between col-span-5">
            <div class="font-semibold text-grey-400">Riwayat Sebelumnya</div>
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
          <HistoriOdontogram @showDetail="detailDialog = true" />
          <div class="border border-adameds-300 mx-[15px]"></div>
          <HistoriOdontogram @showDetail="detailDialog = true" />
          <div class="border border-adameds-300 mx-[15px]"></div>
          <HistoriOdontogram @showDetail="detailDialog = true" />
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
