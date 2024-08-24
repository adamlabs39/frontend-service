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
    <template #header>{{ title }} Nakes</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex flex-col gap-2.5">
          <div class="font-semibold text-MD">Nama Lengkap Nakes</div>
          <div class="flex gap-2.5">
            <CustomSelect label="" place-holder="Gelar Awal" />
            <CustomTextfield label="" placeholder="Nama Lengkap" class="grow" />
            <CustomSelect label="" place-holder="Gelar Akhir" />
          </div>
        </div>
        <div class="flex gap-2.5">
          <CustomTextfield label="NIK" placeholder="0" class="basis-1/2" />
          <CustomTextfield label="STR" placeholder="0" class="basis-1/2" />
        </div>
        <div class="flex gap-2.5">
          <CustomDatePicker class="basis-1/2" label="Tanggal Lahir" />
          <CustomSelect
            label="Jenis Kelamin"
            place-holder="Pilih Jenis Kelamin"
            class="basis-1/2"
          />
        </div>
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
