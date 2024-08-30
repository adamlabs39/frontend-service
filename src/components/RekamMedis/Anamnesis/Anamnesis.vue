<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { ref } from "vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const categories = ref([
  { name: "Hipertensi", key: "H" },
  { name: "Penyakit Jantung", key: "PJ" },
  { name: "Stroke", key: "S" },
  { name: "TB Paru", key: "TBP" },
  { name: "Diabetes Melitus", key: "DM" },
  { name: "Asma", key: "A" },
  { name: "Lain-lain", key: "dll" },
  { name: "Tidak Ada", key: "null" },
]);
const anamnesis = ref();
const keluhanUtama = ref();
const riwayatPenyakit = ref();
const riwayatPengobatan = ref();
const catatan = ref();
const riwayatKeluarga = ref([""]);
const pernahDirawat = ref();
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Anamnesis</template>
    <template #content>
      <div v-if="props.method=='form'" class="grid grid-cols-2 gap-x-8 gap-y-5 py-5">
        <CustomSelect
          v-model="anamnesis"
          label="Anamnesis"
          placeHolder="Pilih Anamnesis"
        />
        <CustomTextfield
          v-model="keluhanUtama"
          label="Keluhan Utama"
          placeholder="Keluhan Utama"
        />
        <CustomTextfield
          v-model="riwayatPenyakit"
          label="Riwayat Penyakit"
          placeholder="Riwayat Penyakit"
        />
        <CustomTextfield
          v-model="riwayatPengobatan"
          label="Riwayat Pengobatan (Termasuk Obat Yang Sedang Dikonsumsi)"
          placeholder="Riwayat Pengobatan"
        />
        <div class="flex">
          <div class="basis-2/3">
            <div class="block font-semibold mb-[11px]">
              Riwayat Penyakit Keluarga
            </div>
            <div class="grid grid-rows-4 grid-flow-col gap-4">
              <div
                v-for="category of categories"
                :key="category.key"
                class="flex items-center gap-2.5"
              >
                <Checkbox
                  v-model="riwayatKeluarga"
                  :inputId="category.key"
                  name="category"
                  :value="category.name"
                  :dt="{
                    checkedBackground: { class: 'bg-[#14B8A6]' },
                    checkedHoverBackground: { class: 'bg-[#14B8A6]' },
                  }"
                />
                <label :for="category.key">{{ category.name }}</label>
              </div>
            </div>
          </div>
          <div class="basis-1/3">
            <CustomSwitch v-model="pernahDirawat"
            label="Pernah Dirawat" />
          </div>
        </div>
        <CustomTextArea
          v-model="catatan"
          label="Catatan"
          placeholder="Catatan"
        />
      </div>
      <div v-if="props.method=='detail'" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Anamnesis" value="Auto Anamnesis"/>
        <CustomInfoRow label="Keluhan Utama" value="Sakit Mata" />
        <CustomInfoRow label="Riwayat Penyakit" value="Asma" />
        <CustomInfoRow label="Tingkat Keparahan" value="Tidak terlalu parah" />
        <CustomInfoRow label="Pernah Dirawat" value="Tidak" />
        <CustomInfoRow label="Riwayat Pengobatan" value="Tidak ada" />
        <CustomInfoRow label="Riwayat Penyakit Keluarga" value="Tidak ada" />
        <CustomInfoRow label="Pengetahuan Tentang Penyakit Saat Ini" value="Tidak ada" />
        <hr class="border-grey-200">
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
        v-if="props.method=='form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="props.method=='form'" label="Simpan" />
        <CustomButton v-if="props.method=='detail'" label="Edit" />

      </div>
    </template>
  </CustomAccordion>
</template>
