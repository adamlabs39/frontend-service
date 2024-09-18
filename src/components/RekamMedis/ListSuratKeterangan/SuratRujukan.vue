<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>
      <div class="flex items-center justify-between w-full pr-2.5">
        Surat Rujukan
        <PhX :size="20" @click="removeFromSelectedItems(index)" />
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-12 pt-5 gap-x-[30px] gap-y-5">
        <div class="flex gap-[30px] col-span-12">
          <div
            class="grid grid-cols-2 gap-x-5 pr-[30px] border-r border-adameds-300"
          >
            <div class="col-span-2 font-semibold text-normal">
              Surat Rujukan
            </div>
            <CustomRadio
              v-for="data in ['Eksternal', 'Internal']"
              :sideLabel="data"
              :value="data"
            />
          </div>
          <CustomInputNumber
            label="No. Surat"
            placeholder="No. 123456"
            class="basis-2/12"
          />
          <CustomSelect
            label="Tujuan Pelayanan"
            place-holder="Pilih Tujuan Pelayanan"
            class="grow"
          />
        </div>
        <CustomDatePicker label="Tgl.Rencana" class="col-span-2" />
        <CustomSelect
          label="Poli/Spesialis"
          place-holder="Pilih Poli/Spesialis"
          class="col-span-5"
        />
        <CustomTextfield
          label="Dirujuk Ke"
          placeholder="Dirujuk Ke"
          class="col-span-5"
        />
        <CustomTextfield
          label="Alasan Klinikal"
          placeholder="Alasan Klinikal"
          class="col-span-4"
        />
        <CustomSelect
          label="Alasan Non Klinikal"
          place-holder="Pilih Alasan Non Klinikal"
          class="col-span-4"
        />
        <CustomTextfield
          label="Alasan Non Klinikal Lainnya"
          placeholder="Alasan Non Klinikal Lainnya"
          class="col-span-4"
        />
        <CustomTextArea
          label="Catatan Rujukan"
          placeholder="Catatan Rujukan ..."
          class="col-span-12"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
