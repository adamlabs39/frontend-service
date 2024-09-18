<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Keterangan Sakit
        <PhX :size="20" @click="removeFromSelectedItems(index)" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-5 pt-5">
        <CustomTextfield label="No. Surat" class="col-span-6" />
        <CustomInputNumber label="Istirahat Selama" class="col-span-6">
          <template #appendText>
            <div class="flex items-center mr-2.5">Hari</div>
          </template>
        </CustomInputNumber>
        <CustomDatePicker label="Mulai dari Tanggal" class="col-span-7" />
        <CustomTextfield
          label="Larangan"
          placeholder="Larangan"
          class="col-span-5"
        />
        <CustomTextArea
          label="Keterangan Sakit"
          placeholder="Keterangan Sakit ..."
          class="col-span-12"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
