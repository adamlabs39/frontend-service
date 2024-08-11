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
  <div class="mt-5 flex flex-col gap-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode HFIS (BPJS)" placeholder="0000" type="number" />
      <CustomTextfield
        label="Kode SIP"
        placeholder="0000"
        type="number"
      />
      <CustomTextfield label="Kode Dokter" placeholder="Kode Dokter" />
    </div>
    <div class="flex flex-col">
        <div>Nama Lengkap Dokter</div>
        <div class="flex gap-2.5">
            <CustomTextfield label="" placeholder="Gelar Awal"/>
            <CustomTextfield label="" placeholder="Nama Lengkap" />
            <CustomTextfield label="" placeholder="Gelar Akhir"/>
        </div>
    </div>
    <CustomSelect label="Jenis Kelamin" place-holder="Pilih Jenis Kelamin" class="w-1/2"/>
    <hr />
    <CustomAutoComplete label="Poli"/>
    <CustomAccordion headerClass="">
      <template #header> <div class="font-bold text-heading -ml-4">Poli Anak</div> </template>
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
    <div class="flex gap-2.5">
      <CustomSwitch v-model="status" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
