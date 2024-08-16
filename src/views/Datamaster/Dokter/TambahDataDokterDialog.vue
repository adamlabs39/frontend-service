<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const status = ref();
</script>
<template>
  <div class="flex flex-col gap-5 mt-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode HFIS (BPJS)" placeholder="0000" type="number" />
      <CustomTextfield
        label="Kode SIP"
        placeholder="0000"
        type="number"
      />
      <CustomTextfield label="Kode Dokter" placeholder="Kode Dokter" />
    </div>
    <div class="flex flex-col ">
        <div class="font-semibold text-MD">Nama Lengkap Dokter</div>
        <div class="flex gap-2.5 w-full">
          <CustomSelect label="" place-holder="Gelar Awal" class="basis-1/4" />
            <CustomTextfield label="" placeholder="Nama Lengkap" class="basis-1/2" />
            <CustomSelect label="" place-holder="Gelar Akhir" class="basis-1/4" />
        </div>
    </div>
    <CustomSelect label="Jenis Kelamin" place-holder="Pilih Jenis Kelamin" class="w-full"/>
    <hr />
    <CustomAutoComplete label="Poli"/>
    <CustomAccordion headerClass="">
      <template #header> <div class="-ml-4 font-bold text-heading">Poli Anak</div> </template>
      <template #content>
        <div class="flex flex-col gap-5 pt-5 -mx-4">
            <div class="flex gap-2.5">
        <CustomTextfield label="Kuota JKN" placeholder="0" type="number">
            <template #appendText>
                <div class="flex justfy-center items-center m-2.5">
                    Pasien
                </div>
            </template>
        </CustomTextfield>
        <CustomTextfield label="Kuota Non-JKN" placeholder="0" type="number">
            <template #appendText>
                <div class="flex justfy-center items-center m-2.5">
                    Pasien
                </div>
            </template>
        </CustomTextfield>
    </div>
    <div class="flex gap-2.5 justify-between">
        <CustomDatePicker :time-only="true" class="w-full" />
        <CustomTextfield label="Durasi Pelayanan" placeholder="00:00" type="number">
            <template #appendText>
                <div class="flex justfy-center items-center m-2.5">
                    Menit
                </div>
            </template>
        </CustomTextfield>
    </div>
        </div>
      </template>
    </CustomAccordion>
    <hr />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status"/>
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
