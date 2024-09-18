<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
</script>
<template>
  <CustomAccordion
    headerClass="bg-adameds-50"
  >
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Keterangan Sehat
        <PhX :size="20" @click="removeFromSelectedItems(index)" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <CustomInputNumber label="No. Surat" class="col-span-5" />
        <CustomDatePicker label="Tanggal Pemeriksaan" class="col-span-7" />
        <CustomInputNumber label="Berat Badan" class="col-span-3">
          <template #appendText>
            <div class="flex items-center mr-2.5">Kg</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber label="Tinggi Badan" class="col-span-3">
          <template #appendText>
            <div class="flex items-center mr-2.5">Cm</div>
          </template>
        </CustomInputNumber>
        <CustomTextfield
          label="Visus OD/OS"
          placeholder="Visus OD/OS"
          class="col-span-6"
        />
        <CustomTextfield
          label="Golongan Darah"
          placeholder="Golongan Darah"
          class="col-span-3"
        />
        <CustomSwitch label="Buta Warna" class="col-span-3" />
        <div class="grid grid-cols-2 gap-x-2.5 col-span-6">
          <div class="col-span-2 font-semibold text-normal">
            Setelah Diperiksa Dinyatakan
          </div>
          <CustomRadio
            v-for="data in ['Sehat', 'Tidak Sehat']"
            v-model="tipePeriksa"
            :sideLabel="data"
            :value="data"
          />
        </div>
        <CustomTextArea
          label="Untuk Keperluan"
          placeholder="Untuk Keperluan ..."
          class="col-span-12"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
