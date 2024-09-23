<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
const status = ref();
</script>
<template>
  <div class="mt-5 grid grid-cols-12 gap-5">
    <CustomTextfield
      label="Kode Penjamin"
      placeholder="Kode Penjamin"
      class="col-span-4"
    />
    <CustomTextfield
      label="Nama Penjamin"
      placeholder="Nama Penjamin"
      class="col-span-8"
    />
    <CustomTextfield
      label="No. Telepon"
      placeholder="0"
      type="number"
      class="col-span-4"
    />
    <CustomTextfield label="Alamat" placeholder="Alamat" class="col-span-8" />
    <hr class="border-grey-200 col-span-12"/>
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
