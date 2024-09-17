<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import { ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const kasus = ref([
  { id: "1", kasus: "Kasus 1" },
  { id: "2", kasus: "kasus 2" },
  { id: "3", kasus: "Kasus 3" },
  { id: "4", kasus: "Kasus 4" },
]);
const mata = ref([
  { id: "1", mata: "Mata 1" },
  { id: "2", mata: "Mata 2" },
  { id: "3", mata: "Mata 3" },
  { id: "4", mata: "Mata 4" },
]);
const motorik = ref([
  { id: "1", motorik: "Motorik 1" },
  { id: "2", motorik: "Motorik 2" },
  { id: "3", motorik: "Motorik 3" },
  { id: "4", motorik: "Motorik 4" },
]);
const verbal = ref([
  { id: "1", verbal: "Verbal 1" },
  { id: "2", verbal: "Verbal 2" },
  { id: "3", verbal: "Verbal 3" },
  { id: "4", verbal: "Verbal 4" },
]);

const glasglow = ref([
  { id: "1", glasglow: "Glasglow 1" },
  { id: "2", glasglow: "Glasglow 2" },
  { id: "3", glasglow: "Glasglow 3" },
  { id: "4", glasglow: "Glasglow 4" },
]);

const doa = ref([
  { name: "Tidak Ada Tanda Kehidupan", key: "TK" },
  { name: "Tidak Ada Denyut Nadi", key: "DN" },
  { name: "EKG Flat", key: "EF" },
]);

const selectedKasus = ref("");
const selectedMata = ref("");
const selectedMotorik = ref("");
const selectedVerbal = ref("");

const selectedGlasglow = ref("");
const kesimpulanTriase = ref();

const tekananDarahSistole = ref<number | undefined>(undefined);
const tekananDarahDiastole = ref<number | undefined>(undefined);
const frekuensiNafas = ref<number | undefined>(undefined);
const frekuensiNadi = ref<number | undefined>(undefined);

const waktuDOA = ref<Date>(new Date());
const waktuMeninggal = ref<Date>(new Date());

const deathOnArrival = ref();

const suhu = ref<number | undefined>(undefined);
const bloodOxygen = ref<number | undefined>(undefined);
const CRT = ref(false);
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header> Triase</template>
    <template #content>
      <div v-if="props.method == 'form'">
        <div class="grid grid-cols-4 gap-[30px] py-3">
          <CustomSelect
            label="Kasus"
            v-model="selectedKasus"
            :options="kasus"
            optionValue="id"
            optionLabel="kasus"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Kasus"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Mata (Respon Membuka Mata)"
            v-model="selectedMata"
            :options="mata"
            optionValue="id"
            optionLabel="mata"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Respon"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Motorik (Respon Gerakan)"
            v-model="selectedMotorik"
            :options="motorik"
            optionValue="id"
            optionLabel="motorik"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Respon"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Verbal (Respon Verbal)"
            v-model="selectedVerbal"
            :options="verbal"
            optionValue="id"
            optionLabel="verbal"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Respon"
            customSelectClass="border-[#C7CBD2]"
          />

          <!-- Merge Sistole / Diastole into a 2-column layout with adjusted column widths -->
          <div
            class="grid items-center grid-cols-[2fr_auto_2fr] col-span-2 gap-10"
          >
            <CustomInputNumber
              label="Tekanan Darah (Sistole)"
              placeholder="0"
              v-model:modelValue="tekananDarahSistole"
              type="number"
            >
              <template #appendText>
                <div class="flex items-center mr-2">x/mnt</div>
              </template>
            </CustomInputNumber>

            <div class="flex w-full h-full pt-9 text-adameds-200">/</div>

            <CustomInputNumber
              label="Diastole"
              placeholder="0"
              v-model:modelValue="tekananDarahDiastole"
              type="number"
            >
              <template #appendText>
                <div class="flex items-center mr-2">mmHg</div>
              </template>
            </CustomInputNumber>
          </div>

          <CustomInputNumber
            label="Frekuensi Nafas"
            placeholder="0"
            v-model:modelValue="frekuensiNafas"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">x/mnt</div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber
            label="Frekuensi Nadi"
            placeholder="0"
            v-model:modelValue="frekuensiNadi"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">x/mnt</div>
            </template>
          </CustomInputNumber>
        </div>
        <div class="grid grid-cols-3 gap-[30px] py-3">
          <CustomSwitch
            v-model="CRT"
            label=" Capillary Refill Time (CRT > 2 Detik)"
          />
          <CustomInputNumber
            label="Suhu"
            placeholder="0"
            v-model:modelValue="suhu"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">°C</div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber
            label="Blood Oxygen"
            placeholder="0"
            v-model:modelValue="bloodOxygen"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">%</div>
            </template>
          </CustomInputNumber>
        </div>

        <div class="grid grid-cols-4 gap-[30px] py-3">
          <div class="flex col-span-2">
            <div>
              <div class="block font-semibold mb-[11px]">
                Death On Arrival (DOA)
              </div>
              <div class="grid grid-flow-col gap-4">
                <div
                  v-for="items of doa"
                  :key="items.key"
                  class="flex items-center gap-2.5"
                >
                  <Checkbox
                    v-model="deathOnArrival"
                    :inputId="items.key"
                    name="items"
                    :value="items.name"
                    :dt="{
                      checkedBackground: { class: 'bg-[#14B8A6]' },
                      checkedHoverBackground: { class: 'bg-[#14B8A6]' },
                    }"
                  />
                  <label :for="items.key" class="text-sm">{{ items.name }}</label>
                </div>
              </div>
            </div>
            <div class="flex items-center ml-auto">
              <div class="w-0.5 h-14 bg-grey-200"></div>
            </div>
          </div>

          <CustomDatePicker v-model="waktuDOA" label="Waktu DOA" disabled />
          <CustomDatePicker
            v-model="waktuMeninggal"
            label="Waktu Meninggal"
            disabled
          />
        </div>
        <div class="grid grid-cols-2 gap-[30px] py-3">
          <CustomSelect
            label="Glasglow Coma Scale (GCS) Score"
            v-model="selectedGlasglow"
            :options="glasglow"
            optionValue="id"
            optionLabel="glasglow"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Glasglow Coma Scale (GCS) Score"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomTextArea
            v-model="kesimpulanTriase"
            label="Kesimpulan Triase"
            placeholder="Kesimpulan Triase"
          />
        </div>
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Kriteria Pemantauan" value="PEWS" />
        <CustomInfoRow label="Waktu Asesmen" value="01-01-2024" />
        <CustomInfoRow label="Frekuensi Napas" value="48 x/mnt" />
        <CustomInfoRow label="Frekuensi Nadi" value="158 x/mnt" />
        <CustomInfoRow label="Suhu" value="37 C" />
        <CustomInfoRow
          label="Capillary Refill Time (CRT > 2 Detik)"
          value="Tidak"
        />
        <CustomInfoRow label="Blood Oxygen" value="98%" />
        <CustomInfoRow label="Gula Darah" value="98%" />
        <CustomInfoRow label="Oksigen Tambahan" value="Tidak" />
        <CustomInfoRow label="Tekanan Darah" value="100 mmHg" />
        <CustomInfoRow label="Respirasi Anak" value="Tidak Ada retraksi" />
        <CustomInfoRow label="Kardiovaskuler Anak" value="Tidak Sianosis" />
        <CustomInfoRow label="Keadaan Umum" value="Interaksi Biasa" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton v-if="props.method == 'detail'" label="Edit" />
      </div>
    </template>
  </CustomAccordion>
</template>
