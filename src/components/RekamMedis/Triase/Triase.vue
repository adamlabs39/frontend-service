<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import HistoriTriase from "@/components/RekamMedis/Triase/HistoriTriase.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const kasus = ref([
  { name: "Trauma" },
  { name: "Non Trauma" },
  { name: "Obstetri" },
]);
const caraDatang = ref([
  { name: "Sendiri" },
  { name: "Diantar Polisi" },
  { name: "Diantar Keluarga" },
  { name: "Lain - Lain" },
]);
const kendaraan = ref([{ name: "Ambulans" }, { name: "Lain - Lain" }]);
const keadaanUmum = ref([
  { name: "Baik" },
  { name: "Ringan" },
  { name: "Sedang" },
  { name: "Buruk" },
]);
const mata = ref([
  { name: "Spontan Merespon" },
  { name: "Ada Respon Dengan Rangsang Suara" },
  { name: "Ada Respon Dengan Rangsang Nyeri" },
  { name: "Tidak Ada Respon" },
]);
const motorik = ref([
  { name: "Mengikuti Perintah" },
  { name: "Melokalisir Nyeri" },
  { name: "Flexi Normal" },
  { name: "Flexi Abnormal" },
  { name: "Ekstensi Abnormal" },
  { name: "Tadak Ada Respon" },
]);
const verbal = ref([
  { name: "Orientasi Balik" },
  { name: "Binging Berbicara" },
  { name: "Kata - Kata Tidak Jelas" },
  { name: "Suara Tanpa Arti (Mengerang)" },
  { name: "Tidak Ada Respon" },
]);

const glasglow = ref([
  { name: "Glasglow 1" },
  { name: "Glasglow 2" },
  { name: "Glasglow 3" },
  { name: "Glasglow 4" },
]);

const doa = ref([
  { name: "Tidak Ada Tanda Kehidupan", key: "TK" },
  { name: "Tidak Ada Denyut Nadi", key: "DN" },
  { name: "EKG Flat", key: "EF" },
]);

const selectedKasus = ref("");
const selectedCaraDatang = ref("");
const selectedKendaraan = ref("");
const selectedKeadaanUmum = ref("");
const asalRujukan = ref<string>("");

const selectedMata = ref("");
const selectedMotorik = ref("");
const selectedVerbal = ref("");
const selectedGlasglow = ref("");

const kesimpulanTriase = ref();
const warnaTriase = ref("#3D84E5");

const tekananDarahSistole = ref<number | undefined>(undefined);
const tekananDarahDiastole = ref<number | undefined>(undefined);
const frekuensiNafas = ref<number | undefined>(undefined);
const frekuensiNadi = ref<number | undefined>(undefined);

const suhu = ref<number | undefined>(undefined);
const bloodOxygen = ref<number | undefined>(undefined);
const CRT = ref(false);

const emit = defineEmits(["edit"]);

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
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header> Triase</template>
    <template #content>
      <div v-if="props.method == 'form'">
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
          <CustomSelect
            label="Kasus"
            v-model="selectedKasus"
            :options="kasus"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Kasus"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-4"
          />
          <CustomSelect
            label="Cara Datang"
            v-model="selectedCaraDatang"
            :options="caraDatang"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Cara Datang"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-2"
          />
          <CustomSelect
            label="Kendaraan"
            v-model="selectedKendaraan"
            :options="kendaraan"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Kendaraan"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-2"
          />
          <CustomSelect
            label="Keadaan Umum"
            v-model="selectedKeadaanUmum"
            :options="keadaanUmum"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Keadaan Umum"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-2"
          />
          <CustomTextfield
            label="Asal Rujukan"
            placeholder="Asal Rujukan"
            v-model:modelValue="asalRujukan"
            class="col-span-2"
          />
          <hr class="col-span-4" />
          <CustomSelect
            label="Mata (Respon Membuka Mata)"
            v-model="selectedMata"
            :options="mata"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Respon"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Motorik (Respon Gerakan)"
            v-model="selectedMotorik"
            :options="motorik"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Respon"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Verbal (Respon Verbal)"
            v-model="selectedVerbal"
            :options="verbal"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Respon"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Glasglow Coma Scale (GCS) Score"
            v-model="selectedGlasglow"
            :options="glasglow"
            option-label="name"
            option-value="name"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Glasglow Coma Scale (GCS) Score"
            customSelectClass="border-[#C7CBD2]"
          />
          <div
            class="grid items-center grid-cols-[2fr_min-content_2fr] col-span-2"
          >
            <CustomInputNumber
              label="Tekanan Darah (Sistole / Diastole)"
              placeholder="0"
              v-model:modelValue="tekananDarahSistole"
              type="number"
            />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
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
          <hr class="col-span-3" />
        </div>
        <div class="flex gap-[24px] py-3">
          <CustomTextfield
            v-model="kesimpulanTriase"
            label="Kesimpulan Triase"
            placeholder="Kesimpulan Triase"
            class="grow"
          />
          <div
            @click="warnaTriase = '#3D84E5'"
            class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-info-300 rounded-md mt-auto flex"
          >
            <PhCheckCircle
              v-if="warnaTriase == '#3D84E5'"
              :size="25"
              weight="fill"
              class="m-auto text-white"
            />
          </div>
          <div
            @click="warnaTriase = '#E9594C'"
            class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-danger-300 rounded-md mt-auto flex"
          >
            <PhCheckCircle
              v-if="warnaTriase == '#E9594C'"
              :size="25"
              weight="fill"
              class="m-auto text-white"
            />
          </div>
          <div
            @click="warnaTriase = '#E89F29'"
            class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-warning-300 rounded-md mt-auto flex"
          >
            <PhCheckCircle
              v-if="warnaTriase == '#E89F29'"
              :size="25"
              weight="fill"
              class="m-auto text-white"
            />
          </div>
          <div
            @click="warnaTriase = '#14AC5B'"
            class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-success-300 rounded-md mt-auto flex"
          >
            <PhCheckCircle
              v-if="warnaTriase == '#14AC5B'"
              :size="25"
              weight="fill"
              class="m-auto text-white"
            />
          </div>
          <div
            @click="warnaTriase = '#FFFFFF'"
            class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-white rounded-md mt-auto flex"
          >
            <PhCheckCircle
              v-if="warnaTriase == '#FFFFFF'"
              :size="25"
              weight="fill"
              class="m-auto text-black"
            />
          </div>
          <div
            @click="warnaTriase = '#000000'"
            class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-black rounded-md mt-auto flex"
          >
            <PhCheckCircle
              v-if="warnaTriase == '#000000'"
              :size="25"
              weight="fill"
              class="m-auto text-white"
            />
          </div>
        </div>
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Kasus" value="Kasus" />
        <CustomInfoRow label="Cara Datang" value="Cara Datang" />
        <CustomInfoRow label="Kendaraan" value="Kendaraan" />
        <CustomInfoRow label="Keadaan Umum" value="Keadaan Umum" />
        <CustomInfoRow label="Asal Rujukan" value="-" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Mata" value="Respon" />
        <CustomInfoRow label="Motorik" value="Respon" />
        <CustomInfoRow label="Verbal" value="Respon" />
        <CustomInfoRow label="Glasglow Coma Scale (GCS) Score" value="score" />
        <CustomInfoRow label="Tekanan Darah" value="0/0 mmHg" />
        <CustomInfoRow label="Frekuensi Nafas" value="0 x/mnt" />
        <CustomInfoRow label="Frekuensi Nadi" value="0 x/mnt" />
        <CustomInfoRow
          label="Capillary Refill Time (CRT > 2 detik)"
          value="Tidak"
        />
        <CustomInfoRow label="Suhu" value="0 °C" />
        <CustomInfoRow label="Blood Oxygen" value="0 %" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Kesimpulan Triase" value="-" />
        <div
          class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-info-300 rounded-md mt-auto flex"
        >
          <PhCheckCircle :size="25" weight="fill" class="m-auto text-white" />
        </div>
        <hr class="border-grey-200" />
        <div class="flex justify-between">
          <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
          <CustomInfoRow
            label="Jam Input"
            :value="`petugas`"
            alignment="right"
          />
        </div>
      </div>

      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Triase</template>
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
                <HistoriTriase />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriTriase />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <CustomSelect
                label="Kasus"
                v-model="selectedKasus"
                :options="kasus"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Kasus"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-4"
              />
              <CustomSelect
                label="Cara Datang"
                v-model="selectedCaraDatang"
                :options="caraDatang"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Cara Datang"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-2"
              />
              <CustomSelect
                label="Kendaraan"
                v-model="selectedKendaraan"
                :options="kendaraan"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Kendaraan"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-2"
              />
              <CustomSelect
                label="Keadaan Umum"
                v-model="selectedKeadaanUmum"
                :options="keadaanUmum"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Keadaan Umum"
                customSelectClass="border-[#C7CBD2]"
                class="col-span-2"
              />
              <CustomTextfield
                label="Asal Rujukan"
                placeholder="Asal Rujukan"
                v-model:modelValue="asalRujukan"
                class="col-span-2"
              />
              <hr class="col-span-4" />
              <CustomSelect
                label="Mata (Respon Membuka Mata)"
                v-model="selectedMata"
                :options="mata"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Respon"
                customSelectClass="border-[#C7CBD2]"
              />
              <CustomSelect
                label="Motorik (Respon Gerakan)"
                v-model="selectedMotorik"
                :options="motorik"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Respon"
                customSelectClass="border-[#C7CBD2]"
              />
              <CustomSelect
                label="Verbal (Respon Verbal)"
                v-model="selectedVerbal"
                :options="verbal"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Respon"
                customSelectClass="border-[#C7CBD2]"
              />
              <CustomSelect
                label="Glasglow Coma Scale (GCS) Score"
                v-model="selectedGlasglow"
                :options="glasglow"
                option-label="name"
                option-value="name"
                invalidMessage="Wajib diisi"
                :disabled="false"
                placeHolder="Pilih Glasglow Coma Scale (GCS) Score"
                customSelectClass="border-[#C7CBD2]"
              />
              <div class="grid grid-cols-2 gap-x-[30px]">
                <div class="grid items-center grid-cols-[2fr_min-content_2fr]">
                  <label
                    class="block font-semibold mb-[5px] text-normal col-span-3"
                  >
                    Tekanan Darah (Sistole / Diastole)
                  </label>
                  <CustomInputNumber
                    :showLabel="false"
                    placeholder="0"
                    v-model:modelValue="tekananDarahSistole"
                    type="number"
                  />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber
                    :showLabel="false"
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
              </div>
              <div class="grid grid-cols-2 gap-x-[30px] gap-y-5">
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
                <hr class="col-span-2" />
                <CustomTextfield
                  v-model="kesimpulanTriase"
                  label="Kesimpulan Triase"
                  placeholder="Kesimpulan Triase"
                  class="col-span-2 grow"
                />
              </div>
              <div class="flex gap-[24px] py-3">
                <div
                  @click="warnaTriase = '#3D84E5'"
                  class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-info-300 rounded-md mt-auto flex"
                >
                  <PhCheckCircle
                    v-if="warnaTriase == '#3D84E5'"
                    :size="25"
                    weight="fill"
                    class="m-auto text-white"
                  />
                </div>
                <div
                  @click="warnaTriase = '#E9594C'"
                  class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-danger-300 rounded-md mt-auto flex"
                >
                  <PhCheckCircle
                    v-if="warnaTriase == '#E9594C'"
                    :size="25"
                    weight="fill"
                    class="m-auto text-white"
                  />
                </div>
                <div
                  @click="warnaTriase = '#E89F29'"
                  class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-warning-300 rounded-md mt-auto flex"
                >
                  <PhCheckCircle
                    v-if="warnaTriase == '#E89F29'"
                    :size="25"
                    weight="fill"
                    class="m-auto text-white"
                  />
                </div>
                <div
                  @click="warnaTriase = '#14AC5B'"
                  class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-success-300 rounded-md mt-auto flex"
                >
                  <PhCheckCircle
                    v-if="warnaTriase == '#14AC5B'"
                    :size="25"
                    weight="fill"
                    class="m-auto text-white"
                  />
                </div>
                <div
                  @click="warnaTriase = '#FFFFFF'"
                  class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-white rounded-md mt-auto flex"
                >
                  <PhCheckCircle
                    v-if="warnaTriase == '#FFFFFF'"
                    :size="25"
                    weight="fill"
                    class="m-auto text-black"
                  />
                </div>
                <div
                  @click="warnaTriase = '#000000'"
                  class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-black rounded-md mt-auto flex"
                >
                  <PhCheckCircle
                    v-if="warnaTriase == '#000000'"
                    :size="25"
                    weight="fill"
                    class="m-auto text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="props.method == 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="method === 'form'"
              label="Simpan"
              @click="() => {}"
            />
            <CustomButton
              v-if="method === 'detail'"
              label="Edit"
              @click="emit('edit')"
            />
          </div>
        </template>
      </CustomDialog>
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
        <CustomButton
          v-if="props.method == 'detail'"
          @click="emit('edit')"
          label="Edit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
