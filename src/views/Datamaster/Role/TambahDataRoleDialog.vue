<script lang="ts" setup>
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const dialog=ref(props.modelValue)
const status = ref();
</script>
<template>
  <CustomDialog class="" v-model:visible="dialog" headerBg="bg-adameds-300">
    <template #header>Tambah Data Role</template>
    <template #body>
      <div class="my-5 flex flex-col gap-2.5">
        <div class="flex gap-2.5">
          <CustomTextfield label="Kode" placeholder="Kode" />
          <CustomTextfield
            label="Nama Role"
            placeholder="Nama Role"
            class="basis-3/4"
          />
        </div>
        <hr />
        <CustomSelect
          label="Menu"
          place-holder="Cari dan Pilih Permision"
          :is-loading="false"
        />
        <CustomAutoComplete label="Menu Terpilih" />
        <hr />
        <div class="flex gap-2.5">
          <CustomSwitch v-model="status" />
          <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <CustomButton label="Batal"> </CustomButton>
      <CustomButton label="Simpan"> </CustomButton>
    </template>
  </CustomDialog>
</template>
