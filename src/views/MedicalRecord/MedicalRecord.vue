<script setup lang="ts">
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import DataPatient from "./DataPatient.vue";

const dialogRM = ref(false);

const showDialogRM = () => {
  dialogRM.value = true;
};

defineExpose({ showDialogRM });
</script>

<template>
  <CustomDialog v-model:visible="dialogRM" class="" fullScreen>
    <template #header>
      <div class="flex justify-between">
        <div class="flex my-auto">
          <span> Detail Pasien </span>
          <span class="mx-[10px]"> | </span>
          <span> Rawat Jalan </span>
          <PhArrowRight :size="18" class="my-auto mx-[10px]" weight="bold" />
          <div class="bg-white rounded-lg text-adameds-300 px-[10px] mr-[10px]">
            00-00-00
          </div>
          Nama Lengkap Pasien
        </div>
        <CustomButton
          @click="() => {}"
          icon="PhPrinter"
          label="Cetak Label"
          class="mr-5"
          backgroundColor="bg-white"
          textColor="text-adameds-300"
        />
      </div>
    </template>
    <template #body>
      <div class="pt-[10px]">
        <DataPatient />
      </div>
    </template>
    <template #footer>3</template>
  </CustomDialog>
</template>
