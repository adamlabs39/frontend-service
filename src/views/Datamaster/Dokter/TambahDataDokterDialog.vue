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
</script>
<template>
  <CustomDialog
    width="600px"
     :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Dokter</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5">
          <CustomTextfield
            label="Kode HFIS (BPJS)"
            placeholder="0000"
            type="number"
          />
          <CustomTextfield label="Kode SIP" placeholder="0000" type="number" />
          <CustomTextfield label="Kode Dokter" placeholder="Kode Dokter" />
        </div>
        <div class="flex flex-col">
          <div class="font-semibold text-MD">Nama Lengkap Dokter</div>
          <div class="flex gap-2.5 w-full">
            <CustomSelect
              label=""
              place-holder="Gelar Awal"
              class="basis-1/4"
            />
            <CustomTextfield
              label=""
              placeholder="Nama Lengkap"
              class="basis-1/2"
            />
            <CustomSelect
              label=""
              place-holder="Gelar Akhir"
              class="basis-1/4"
            />
          </div>
        </div>
        <div class="flex gap-2.5">
          <CustomTextfield label="NIK" placeholder="0" class="basis-1/2" />
          <CustomTextfield label="STR" placeholder="0" class="basis-1/2" />
        </div>
        <div class="flex gap-2.5">
          <CustomDatePicker label="Tanggal Lahir" />
          <CustomSelect
            label="Jenis Kelamin"
            place-holder="Pilih Jenis Kelamin"
            class="w-full"
          />
        </div>
        <hr />
        <CustomMultiSelect label="Poli" placeholder="Pilih Poli" />
        <hr />
        <div class="flex items-end gap-2.5">
          <CustomSwitch v-model="status" label="Status" />
          <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
        </div>
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
