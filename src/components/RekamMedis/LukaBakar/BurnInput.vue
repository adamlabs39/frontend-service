<script setup lang="ts">
import Adult from "./BurnSVG/Adult.vue";
import AdultWomen from "./BurnSVG/AdultWomen.vue";
import Child from "./BurnSVG/Child.vue";
import ChildWomen from "./BurnSVG/ChildWomen.vue";
import Baby from "./BurnSVG/Baby.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

const props = defineProps({
  header: {
    type: String,
    default: 'Derajat Luka Bakar',
  },
  method: {
    type: String,
    default: "form",
  },
});
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>{{ header }}</template>
    <template #content>
      <div class="flex justify-between pt-5">
        <div v-if="method == 'form'" class="grow mr-[30px]">
          <CustomInputNumber
            label="Presentase Luka Bakar"
            placeholder="46"
            type="number"
          >
            <template #appendText>
              <div class="flex items-center mr-2">x/mnt</div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber
            label="LPT"
            placeholder="46"
            type="number"
            class="mt-5"
          >
            <template #appendText>
              <div class="flex items-center mr-2">M²</div>
            </template>
          </CustomInputNumber>
        </div>
        <Adult class="w-[800px]" />
        <!-- <AdultWomen class="w-[800px]" /> -->
        <!-- <Child class="w-[800px]" /> -->
        <!-- <ChildWomen class="w-[800px]" /> -->
        <!-- <Baby class="w-[800px]" /> -->
        <div class="font-semibold text-normal grow ml-[30px]">
          <div class="flex bg-adameds-50 rounded-[10px] h-10 w-full px-5">
            <span class="my-auto text-adameds-300"> Derajat Luka Bakar </span>
          </div>
          <div class="flex px-5 mt-4 text-sunFlower-300">
            <PhFire :size="20" weight="fill" class="mr-[5px]" />
            Grade 1
          </div>
          <div class="flex px-5 mt-6 text-warning-300">
            <PhFire :size="20" weight="fill" class="mr-[5px]" />
            Grade 2
          </div>
          <div class="flex px-5 mt-6 text-danger-300">
            <PhFire :size="20" weight="fill" class="mr-[5px]" />
            Grade 3
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-grey-200"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomAccordion>
</template>
