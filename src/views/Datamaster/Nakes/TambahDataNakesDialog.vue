<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
const status = ref();
</script>
<template>
  <div class="flex flex-col gap-5 mt-5">
    <div class="flex flex-col gap-2.5">
      <div class="font-semibold text-MD">Nama Lengkap Nakes</div>
    <div class="flex gap-2.5">
      <CustomSelect label="" place-holder="Gelar Awal" />
      <CustomTextfield
        label=""
        placeholder="Nama Lengkap"
        class="grow"
      />
      <CustomSelect label="" place-holder="Gelar Akhir" />
    </div>
    </div>
    <div class="flex gap-2.5">
      <CustomTextfield label="NIK" placeholder="0" />
      <CustomDatePicker class="w-full"/>
    </div>
    <hr />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" :show-label="false" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
