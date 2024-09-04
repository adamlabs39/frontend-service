<script lang="ts" setup>
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
const status = ref();
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
    <template #header>{{ title }} Organisasi</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5">
          <CustomTextfield label="Kode Organisasi" placeholder="Kode Organisasi" />
          <CustomTextfield
            label="Nama Organisasi"
            placeholder="Nama Organisasi"
            class="basis-3/4"
          />
        </div>
        <div class="flex gap-2.5">
          <CustomTextfield label="No. Telepon" placeholder="0" />
          <CustomTextfield
            label="Email"
            placeholder="Email"
            class="basis-3/4"
          />
        </div>
        <CustomTextfield label="URL" placeholder="URL" />
        <div class="flex gap-2.5">
          <CustomSelect label="Provinsi" place-holder="Pilih Provinsi" class="w-full" />
          <CustomSelect
            label="Kab/Kota"
            place-holder="Pilih Kab/Kota"
            class="w-full"
          />
        </div>
        <div class="flex gap-2.5">
          <CustomSelect label="Kecamatan" place-holder="Pilih Kecamatan" class="w-full" />
          <CustomSelect
            label="Kelurahan/Desa"
            place-holder="Pilih Kelurahan/Desa"
            class="w-full"
          />
        </div>
        <div class="flex gap-2.5">
          <CustomSelect label="Kode Pos" place-holder="Pilih Kode Pos" class="w-1/4" />
          <CustomSelect
            label="Alamat"
            place-holder="Alamat"
            class="w-3/4"
          />
        </div>
        <CustomSelect label="Part Of" place-holder="Pilih Part Of" />
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
