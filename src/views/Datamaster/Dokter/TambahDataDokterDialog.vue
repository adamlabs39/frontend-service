<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
});
const status = ref();
const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}
const tipePraktisi = ref([
  { name: "Dokter", value: true },
  { name: "Non-Dokter", value: false },
]);

const isDokter = ref();
</script>
<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Praktisi</template>
    <template #body>
      <div class="grid grid-cols-12 gap-5 mt-5">
        <CustomSelect
          v-model="isDokter"
          label="Tipe Praktisi"
          :options="tipePraktisi"
          option-label="name"
          option-value="value"
          place-holder="Cari & Pilih Praktisi"
          class="col-span-12 w-1/2"
        />
        <hr class="border-grey-200 col-span-12" />
        <CustomSelect
          label="Nama Pegawai"
          place-holder="Cari & Pilih Pegawai"
          class="col-span-8"
        />
        <div class="flex justify-between col-span-4 items-end">
          <CustomButton label="Cara" icon="PhMagnifyingGlass" />
          <CustomButton
            label="Reset"
            background-color="bg-transparent"
            border-color="border-adameds-300"
            text-color="text-adameds-300"
          />
        </div>
        <CustomInputNumber
          v-if="isDokter"
          label="Kode HFIS (BPJS)"
          placeholder="000"
          class="col-span-4"
        />
        <CustomInputNumber
          v-if="isDokter"
          label="SIP"
          placeholder="000"
          class="col-span-4"
        />
        <CustomInputNumber
          v-if="isDokter"
          label="STR"
          placeholder="0"
          class="col-span-4"
        />
        <CustomMultiSelect
          v-if="isDokter"
          label="Poli"
          placeholder="Pilih Poli"
          class="col-span-12"
        />
        <CustomInputNumber
          v-if="!isDokter"
          label="STR"
          placeholder="0"
          class="col-span-12"
        />
        <hr class="border-grey-200 col-span-12" />
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-12"
        />
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Batal"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          >
          </CustomButton>

          <CustomButton label="Simpan"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
