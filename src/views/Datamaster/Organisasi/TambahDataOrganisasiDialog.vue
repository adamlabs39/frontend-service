<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
const status = ref();
</script>
<template>
  <div class="mt-5 flex flex-col gap-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode" placeholder="Kode" />
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
    <CustomTextfield label="Alamat" placeholder="Alamat" />
    <div class="flex gap-2.5">
      <CustomSelect label="Kota" place-holder="Pilih Kota" class=" w-full"/>
      <CustomSelect label="Kode Pos" place-holder="Pilih Kode Pos" class=" w-full"/>
    </div>
    <hr />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status"/>
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
