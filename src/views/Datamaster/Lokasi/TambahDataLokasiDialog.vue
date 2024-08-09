<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
const status = ref();
</script>
<template>
  <div class="mt-5 flex flex-col gap-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode" placeholder="Kode" />
      <CustomTextfield label="Kode BPJS" placeholder="Kode BPJS" />
      <CustomTextfield label="Kode SATUSEHAT" placeholder="Kode SATUSEHAT" />
    </div>
    <div class="flex gap-2.5 justify-between">
      <CustomTextfield label="Kode" placeholder="Kode" class="w-full" />
      <CustomTextfield label="No. Telepon" placeholder="0" class="w-full" />
    </div>
    <CustomTextfield label="Deskripsi" placeholder="Deskripsi" />
    <hr />
    <div class="flex gap-2.5">
      <CustomSwitch v-model="status" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
