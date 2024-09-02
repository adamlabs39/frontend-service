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
      <div class="grid grid-cols-12 gap-5 mt-5">
        <CustomTextfield
          label="Kode Organisasi"
          placeholder="Kode Organisasi"
          class="col-span-4"
        />
        <CustomTextfield
          label="Nama Organisasi"
          placeholder="Nama Organisasi"
          class="col-span-8"
        />
        <CustomTextfield
          label="No. Telepon"
          placeholder="0"
          class="col-span-4"
        />
        <CustomTextfield label="Email" placeholder="Email" class="col-span-8" />
        <CustomTextfield label="URL" placeholder="URL" class="col-span-12" />
        <CustomSelect
          label="Provinsi"
          place-holder="Pilih Provinsi"
          class="col-span-6"
        />
        <CustomSelect
          label="Kab/Kota"
          place-holder="Pilih Kab/Kota"
          class="col-span-6"
        />
        <CustomSelect
          label="Kecamatan"
          place-holder="Pilih Kecamatan"
          class="col-span-6"
        />
        <CustomSelect
          label="Kelurahan/Desa"
          place-holder="Pilih Kelurahan/Desa"
          class="col-span-6"
        />
        <CustomSelect
          label="Kode Pos"
          place-holder="Pilih Kode Pos"
          class="col-span-4"
        />
        <CustomSelect label="Alamat" place-holder="Alamat" class="col-span-8" />
        <CustomSelect
          label="Part Of"
          place-holder="Pilih Part Of"
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
