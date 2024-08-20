<script setup lang="ts">
import CustomChip from "@/components/Base/CustomChip.vue";
</script>

<template>
  <div class="bg-adameds-50 rounded-[5px] h-[84px] px-[10px] py-[5px]">
    <div class="flex text-XS text-adameds-300">
      <img
        src="../../../assets/icons/admisi/people-bed.svg"
        alt=""
        class="h-6 mr-[5px]"
      />
      <span class="leading-6">Bed 1 </span>
      <span class="font-bold leading-6">- RM.123456</span>
    </div>
    <div class="mb-1 font-semibold text-SM">Adam Bin Adam</div>
    <div class="flex">
      <CustomChip
        :showCheckedIcon="false"
        label="Laki-laki"
        bgColor="bg-male-75"
        textColor="text-male-300"
        customClass="h-5 border-none"
        class="mr-[5px]"
      />
      <CustomChip
        :showCheckedIcon="false"
        label="Perempuan"
        bgColor="bg-female-75"
        textColor="text-female-300"
        customClass="h-5 border-none"
        class="mr-[5px]"
      />
      <CustomChip
        :showCheckedIcon="false"
        outlined
        label="TUNAI"
        borderColor="border-adameds-300"
        textColor="text-adameds-300"
        customClass="h-5"
        class="mr-[5px]"
      />
      <CustomChip
        :showCheckedIcon="false"
        outlined
        label="BPJS"
        borderColor="border-warning-300"
        textColor="text-warning-300"
        customClass="h-5 bg-warning-50"
        class="mr-[5px]"
      />
      <CustomChip
        :showCheckedIcon="false"
        outlined
        label="SEP.1999999999999999999"
        borderColor="border-warning-300"
        textColor="text-warning-300"
        customClass="h-5 bg-warning-50"
        class="mr-[5px]"
      />
    </div>
  </div>
</template>
