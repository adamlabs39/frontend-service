<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
const status = ref();
const operasional=ref();
</script>
<template>
  <div class="mt-5 flex flex-col gap-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode" placeholder="Kode" />
      <CustomTextfield
        label="Nama Lokasi"
        placeholder="Nama Lokasi"
        class="grow"
      />
    </div>
    <CustomTextfield label="Deskripsi" placeholder="Deskripsi" />
    <div class="flex gap-2.5 justify-between">
      <CustomTextfield
        label="No. Telepon"
        placeholder="08xx-xxxx-xxxx"
        class="w-full"
      />
      <CustomTextfield label="Email" placeholder="Email" class="w-full" />
    </div>
    <div class="flex gap-2.5 justify-between">
      <CustomTextfield
        label="URL Website"
        placeholder="URL Website"
        class="w-full"
      />
      <CustomSelect label="Tipe" place-holder="Pilih Tipe" class="w-full" />
    </div>
    <div class="flex gap-2.5 justify-between">
      <CustomTextfield label="Kelas" placeholder="Pilih Kelas" class="w-full" />
      <CustomSelect
        label="Part Of"
        place-holder="Pilih Part Of"
        class="w-full"
      />
    </div>
    <hr />
    <div class="flex gap-2.5">
      <div class="flex items-end gap-2.5 w-1/2">
        <CustomSwitch v-model="operasional" label="Status Operasional" />
        <div class="-ml-24">{{ operasional === true ? "Occupied" : "Non-Occupied" }}</div>
      </div>
      <div class="flex items-end gap-2.5 w-1/2">
        <CustomSwitch v-model="status" label="Status" />
        <div >{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
      </div>
    </div>
  </div>
</template>
