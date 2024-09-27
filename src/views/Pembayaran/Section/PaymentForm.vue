<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

</script>

<template>
  <CustomAccordion :openWithHeader="false">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <p class="leading-10 text-adameds-300 text-heading">
            Pembayaran
          </p>
          <CustomChip
            class="mt-2 ml-3"
            :showCheckedIcon="false"
            label="Lunas"
            bgColor="bg-success-75"
            textColor="text-success-300"
            customClass="h-5 border-none"
          />
          <CustomChip
            class="mt-2 ml-3"
            :showCheckedIcon="false"
            label="Piutang"
            bgColor="bg-danger-75"
            textColor="text-danger-300"
            customClass="h-5 border-none"
          />          
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
        <!-- Grand Total -->
        <div class="flex justify-between">
          <p class="text-base font-bold">
            Grand Total
          </p>
          <p class="text-base font-bold">
            RP. 57.000, 00
          </p>
        </div>
        <!-- Diskon -->
        <div class="flex justify-between mt-4">
          <p class="text-base font-bold">
            Diskon
          </p>
          <p class="text-base font-bold">
            RP. 0, 00
          </p>
        </div>
        <!-- Jumlah Terbayar -->
        <div class="flex justify-between mt-4">
          <p class="text-base font-bold">
            Jumlah Terbayar
          </p>
          <p class="text-base font-bold">
            RP. 57.000, 00
          </p>
        </div>
        <!-- Hutang -->
        <div class="flex justify-between mt-4">
          <p class="text-base font-bold text-danger-300">
            Hutang
          </p>
          <p class="text-base font-bold text-danger-300">
            RP. 57.000, 00
          </p>
        </div>
        <hr class="mt-6 mb-3 border-2 border-grey-200">
        <div class="grid grid-cols-2 mt-6">
          <!-- Metode Pembayaran -->
          <div>
            <p class="text-xs font-bold underline underline-offset-2">Metode Pembayaran</p>
            <p class="">Tunai</p>
          </div>
          <!-- No. Referensi -->
          <div>
            <p class="text-xs font-bold underline underline-offset-2">No. Referensi</p>
            <p class="">-</p>
          </div>
          
        </div>
      </div>
    </template>
    <template #collapseIcon>
      <CustomButton
        icon="PhCaretUp"
        backgroundColor="bg-adameds-75"
        textColor="text-adameds-300"
      />
    </template>
    <template #expandIcon>
      <CustomButton
        icon="PhCaretDown"
        backgroundColor="bg-adameds-75"
        textColor="text-adameds-300"
      />
    </template>
  </CustomAccordion>
</template>
