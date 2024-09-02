<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
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
    <template #header>{{ title }} Pegawai</template>
    <template #body>
      <div class="grid grid-cols-12 gap-5 mt-5">
        <CustomSelect
          label="Tipe Pegawai"
          place-holder="Tipe Pegawai"
          class="col-span-12"
        />
        <div class="font-semibold text-MD col-span-12 -mb-5">
          Nama Lengkap Pegawai
        </div>
        <CustomSelect label="" place-holder="Gelar Awal" class="col-span-4" />
        <CustomTextfield label="" placeholder="Nama Lengkap" class="col-span-4" />
        <CustomSelect label="" place-holder="Gelar Akhir" class="col-span-4"/>
        <CustomTextfield label="NIK" placeholder="0" class="col-span-6" />
        <CustomTextfield label="STR" placeholder="0" class="col-span-6" />
        <CustomDatePicker class="col-span-6" label="Tanggal Lahir" />
        <CustomSelect
          label="Jenis Kelamin"
          place-holder="Pilih Jenis Kelamin"
          class="col-span-6"
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
            @click="closeDialog"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
          >
          </CustomButton>
          <CustomButton label="Simpan"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
