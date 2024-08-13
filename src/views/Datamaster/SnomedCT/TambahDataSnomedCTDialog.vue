<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
const status = ref();
</script>
<template>
  <div class="flex flex-col gap-5 mt-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode" placeholder="Kode" />
      <CustomTextfield
        label="Nama Snomed CT"
        placeholder="Nama Snomed CT"
        class="basis-3/4"
      />
    </div>
    <hr />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status"/>
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
