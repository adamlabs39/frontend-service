<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Keterangan Meninggal
        <PhX :size="20" @click="removeFromSelectedItems(index)" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <CustomTextfield label="No. Surat" class="col-span-4" />
        <CustomDatePicker
          label="Tanggal & Waktu Meninggal"
          class="col-span-4"
        />
        <CustomSelect
          label="Lokasi Meninggal"
          place-holder="Pilih Lokasi Meninggal"
          class="col-span-4"
        />
        <CustomSelect
          label="Dokter Yang Menyatakan Meninggal"
          place-holder="Pilih Dokter Yang Menyatakan Meninggal"
          class="col-span-6"
        />
        <CustomSelect
          label="Penyebab Kematian"
          place-holder="Pilih Penyebab Kematian"
          class="col-span-6"
        />
        <CustomTextArea
          label="Keterangan/Catatan"
          placeholder="Keterangan/Catatan..."
          class="col-span-12"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
