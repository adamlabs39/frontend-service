<script setup lang="ts">
import { ref } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import MedicalRecord from "@/views/MedicalRecord/MedicalRecord.vue";

const medicalRecord = ref<typeof MedicalRecord>();
const openDialogRM = () => {
  medicalRecord.value?.showDialogRM();
};

const submitForm = () => {
  console.log("Submited Patient Identity Form");
};

defineExpose({
  submitForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" initial-state="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <p class="leading-10 text-bold text-heading">Asesmen Medis</p>
        </div>
        <div class="mr-4">
          <CustomButton
            @click="openDialogRM"
            label="Detail Rekam Medis"
          ></CustomButton>
        </div>
      </div>
    </template>
    <template #content>
       <div class="grid grid-cols-3 gap-4">
                    <div class="basis-1/4">
                      <p class="text-xs font-bold underline underline-offset-2">
                        Unit Asal
                      </p>
                      <p>Laboratorium</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Maternitas
                        <span> </span>
                      </p>
                      <p>Tidak</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Catatan
                        <span> </span>
                      </p>
                      <p>-</p>
                    </div>

                    <div>
                      <div class="flex">
                        <p
                          class="mr-2 text-xs font-bold underline underline-offset-2"
                        >
                          Dokter Pengirim
                        </p>
                        <CustomChip
                          :showCheckedIcon="false"
                          label="poli"
                          customClass="h-5 pr-[5px] mr-[5px]"
                        />
                      </div>
                      <p class="">dr. Ibab</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Keluhan Utama
                      </p>
                      <p class="">Sakit</p>
                      <p
                        class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                      >
                        Alergi
                      </p>
                      <p class="">Tidak Ada</p>
                    </div>
                    <div class="flex mr-[80px]">
                      <div
                        class="bg-mediumGrey-300 w-[1px] h-[135px] mr-[20px]"
                      ></div>
                      <div class="">
                        <p
                          class="text-xs font-bold underline underline-offset-2"
                        >
                          Diagnosa Sekunder
                        </p>
                        <p class="">H10.9 Conjuctivitis</p>
                        <p
                          class="text-xs font-bold underline underline-offset-2 mt-[10px]"
                        >
                          Diagnosa Sekunder
                        </p>
                        <p class="">-</p>
                      </div>
                    </div>
                  </div>
    </template>
    <template #collapseIcon>
      <CustomButton
        icon="PhCaretUp"
        backgroundColor="bg-transparent"
        textColor="text-adameds-300"
      />
    </template>
    <template #expandIcon>
      <CustomButton
        icon="PhCaretDown"
        backgroundColor="bg-transparent"
        textColor="text-adameds-300"
      />
    </template>
  </CustomAccordion>
  <MedicalRecord ref="medicalRecord" :patientData="{}" />
</template>
