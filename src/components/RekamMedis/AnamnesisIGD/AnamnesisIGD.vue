<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const caraDatang = ref([
  { id: "1", caraDatang: "Cara Datang 1" },
  { id: "2", caraDatang: "Cara Datang 2" },
  { id: "3", caraDatang: "Cara Datang 3" },
  { id: "4", caraDatang: "Cara Datang 4" },
]);
const keadaanUmum = ref([
  { id: "1", keadaanUmum: "Keadaan Umum 1" },
  { id: "2", keadaanUmum: "Keadaan Umum 2" },
  { id: "3", keadaanUmum: "Keadaan Umum 3" },
  { id: "4", keadaanUmum: "Keadaan Umum 4" },
]);
const jenisKasus = ref([
  { id: "1", jenisKasus: "Jenis Kasus 1" },
  { id: "2", jenisKasus: "Jenis Kasus 2" },
  { id: "3", jenisKasus: "Jenis Kasus 3" },
  { id: "4", jenisKasus: "Jenis Kasus 4" },
]);
const kendaraan = ref([
  { id: "1", kendaraan: "Kendaraan 1" },
  { id: "2", kendaraan: "Kendaraan 2" },
  { id: "3", kendaraan: "Kendaraan 3" },
  { id: "4", kendaraan: "Kendaraan 4" },
]);

const keluhanUtama = ref<string>("");
const selectedCaraDatang = ref("");
const selectedKeadaanUmum = ref("");
const selectedJenisKasus = ref("");
const selectedKendaraan = ref("");
const asalRujukan = ref<string>("");

</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header> Anamnesis IGD</template>
    <template #content>
      <div
        v-if="props.method == 'form'"
        class="grid grid-cols-2 gap-[30px] py-3"
      >
        <CustomTextfield
          label="Keluhan Utama"
          placeholder="Keluhan Utama"
          v-model:modelValue="keluhanUtama"
        />
        <CustomSelect
          label="Jenis Kasus"
          v-model="selectedJenisKasus"
          :options="jenisKasus"
          optionValue="id"
          optionLabel="jenisKasus"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Jenis Kasus"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomSelect
          label="Cara Datang"
          v-model="selectedCaraDatang"
          :options="caraDatang"
          optionValue="id"
          optionLabel="caraDatang"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Cara Datang"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomSelect
          label="Kendaraan"
          v-model="selectedKendaraan"
          :options="kendaraan"
          optionValue="id"
          optionLabel="kendaraan"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Kendaraan"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomSelect
          label="Keadaan Umum"
          v-model="selectedKeadaanUmum"
          :options="keadaanUmum"
          optionValue="id"
          optionLabel="keadaanUmum"
          :isLoading="false"
          :invalid="false"
          invalidMessage="Wajib diisi"
          :disabled="false"
          placeHolder="Pilih Keadaan Umum"
          customSelectClass="border-[#C7CBD2]"
        />
        <CustomTextfield
          label="Asal Rujukan"
          placeholder="Asal Rujukan"
          v-model:modelValue="asalRujukan"
        />
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Keluhan Utama" value="" />
        <CustomInfoRow label="Jenis Kasus" value="" />
        <CustomInfoRow label="Cara Datang" value="" />
        <CustomInfoRow label="Kendaraan" value="" />
        <CustomInfoRow label="Keadaan Umum" value="" />
        <CustomInfoRow label="Asal Rujukan" value="" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-adameds-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-adameds-300"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton v-if="props.method == 'detail'" label="Edit" />
      </div>
    </template>
  </CustomAccordion>
</template>