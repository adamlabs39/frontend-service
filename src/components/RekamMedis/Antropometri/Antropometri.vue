<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";

const beratBadan=ref()
const tinggiBadan=ref()
const IMT=ref()
const catatan=ref()

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Antropometri</template>
    <template #content>
      <div class="flex gap-[30px] pt-5">
        <CustomInputNumber v-model="beratBadan" label="Berat Badan">
            <template #appendText>
                <div class="flex items-center justify-center mr-2.5">
                    Kg
                </div>
            </template>
        </CustomInputNumber>
        <CustomInputNumber v-model="tinggiBadan" label="Tinggi Badan">
            <template #appendText>
                <div class="flex items-center justify-center mr-2.5">
                    Cm
                </div>
            </template>
        </CustomInputNumber>
        <CustomInputNumber v-model="IMT" label="IMT">
            <template #appendText>
                <div class="flex items-center justify-center mr-2.5">
                    Kg/m²
                </div>
            </template>
        </CustomInputNumber>
        <CustomTextArea v-model="catatan" class="grow" label="Catatan" placeholder="Catatan" height="h-10" />

      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomAccordion>
</template>
