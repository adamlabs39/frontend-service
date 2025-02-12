<script setup lang="ts">
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

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
          <p class="leading-10 text-bold text-heading">Data Pasien</p>
          <CustomButton class="ml-4">INV1234</CustomButton>
          <CustomChip
            class="mt-2 ml-4"
            :showCheckedIcon="false"
            label="TUNAI"
            bgColor="bg-adameds-50"
            textColor="text-adameds-300"
            borderColor="border-adameds-300"
          />
         
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
         <div class="grid grid-cols-3 gap-4 ">
              <div class="basis-1/4">
                <p class="font-bold text-MD">Nama lengkap pasien</p>
                <p>REG1231235</p>
                <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                <CustomChip
                  :showCheckedIcon="false"
                  label="Laki-laki"
                  bgColor="bg-male-75"
                  textColor="text-male-300"
                  customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                />
              </div>
              <div class="flex">
                <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                <div class="mt-[20px] mr-[40px]">
                  <p class="text-xs font-bold underline underline-offset-2">
                    Tgl. Lahir
                  </p>
                  <p class="">10 Januari 2090</p>
                </div>
              </div>
              <div class="mt-[20px] mr-[40px]">
                <p class="text-xs font-bold underline underline-offset-2">
                  Umur
                </p>
                <p class="">
                  20 Th 11 Bln 5 Hr
                </p>
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
</template>
