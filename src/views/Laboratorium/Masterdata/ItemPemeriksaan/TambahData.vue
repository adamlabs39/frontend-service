<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomComboBox from "@/components/Base/CustomComboBox.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(["update:visible"]);

const jenisInput = ref();
const status = ref(false);
const nilaiRujukan = ref(false);
const itemPemeriksaan = ref();

const optionJenisInput = ref([
  { label: "Angka", value: "1" },
  { label: "Text", value: "2" },
  { label: "Long Text", value: "3" },
  { label: "Pilihan", value: "4" },
]);

const optionItemPemeriksaan = ref([
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
]);

watch(
  () => itemPemeriksaan.value,
  (newValue) => {
    console.log("Nilai chips dari CustomComboBox:", newValue.join(", "));
  },
  { deep: true }
);
</script>

<template>
  <CustomDialog
    :visible="props.visible"
    :style="{ width: '600px' }"
    @update:visible="emit('update:visible', false)"
  >
    <template #header>
      <p>Tambah Data Item Pemeriksaan</p>
    </template>
    <template #body>
      <div class="grid grid-cols-[35%,45%,15%] gap-3 mt-5">
        <CustomTextfield
          label="Kode Item Pemeriksaan"
          placeholder="Kode Item Pemeriksaan"
        />
        <CustomTextfield
          label="Nama Item Pemeriksaan"
          placeholder="Nama Item Pemeriksaan"
        />
        <CustomInputNumber
          label="No. Urut"
          :show-buttons="false"
          class="text-center"
        />
      </div>
      <div class="grid gap-6 mt-5 grid-cols-[50%,45%]">
        <CustomSelect
          label="Kategori Pemeriksaan"
          placeHolder="Pilih Kategori Pemeriksaan"
          :options="['Kategori Pemeriksaan 1']"
        />
        <CustomTextfield label="Satuan" placeholder="Satuan" />
      </div>
      <div class="grid gap-6 mt-5 grid-cols-[50%,45%]">
        <CustomTextfield label="Metode" placeholder="Metode" />
        <CustomSelect
          v-model="jenisInput"
          label="Jenis Input"
          placeHolder="Pilih Jenis Input"
          optionLabel="label"
          optionValue="value"
          :options="optionJenisInput"
        />
      </div>
      <CustomComboBox
        v-if="jenisInput == 4"
        v-model="itemPemeriksaan"
        label="Pilihan Hasil"
        placeholder="Input Hasil"
        class="mt-5 mb-5"
      />
      <CustomSelect
        label="Snomed - CT"
        placeHolder="Pilih Snomed - CT"
        class="mt-5"
        optionLabel=""
        optionValue=""
        :showFilter="false"
        :options="['Snomed - CT 1']"
      />
      <CustomSelect
        label="ICD 9-CM"
        placeHolder="Pilih ICD 9-CM"
        class="mt-5"
        optionLabel=""
        optionValue=""
        :showFilter="false"
        :options="['ICD 9-CM 1']"
      />
      <CustomSelect
        label="LOINC"
        placeHolder="Pilih LOINC"
        class="mt-5 mb-5"
        optionLabel=""
        optionValue=""
        :showFilter="false"
        :options="['LOINC 1']"
      />
      <hr class="mt-[20px] border border-slate-200" />
      <div class="grid grid-cols-2 mt-[15px]">
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
        />
        <CustomSwitch
          v-model="nilaiRujukan"
          :show-label="true"
          label="Nilai Rujukan"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 mt-5">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-grey-200"
          @click="emit('update:visible', false)"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomDialog>
</template>
