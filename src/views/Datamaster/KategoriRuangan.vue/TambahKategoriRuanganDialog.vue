<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
const status = ref();
</script>
<template>
  <div class="flex flex-col gap-5 mt-5">
    <div class="flex gap-2.5">
      <CustomTextfield
        label="Kode"
        placeholder="Kode"
        class="basis-1/6"
      />
      <CustomTextfield
        label="Nama Kategori Ruangan"
        placeholder="Nama Kategori Ruangan"
        class="grow"
      />
    </div>
    <hr class="border-grey-200" />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status"/>
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
