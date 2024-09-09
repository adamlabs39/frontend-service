<script lang="ts" setup>
import { ref } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import TableTindakan from "@/components/Datamaster/TableTindakanV1.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import TableKomponenTarifV1 from "@/components/Datamaster/TableKomponenTarifV1.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
const metodeTarif = ref();
const mcuLab = ref();
</script>

<template>
  <div class="flex flex-col h-full gap-5">
    <!-- Grid Section -->
    <div class="grid grid-cols-12 gap-x-[30px] gap-y-5 mt-5">
      <CustomSelect
        class="col-span-2"
        label="Jenis Tarif"
        place-holder="Jenis Tarif"
      />
      <CustomTextfield
        class="col-span-2"
        label="Kode Tarif"
        placeholder="Kode Tarif"
      />
      <CustomTextfield
        class="col-span-5"
        label="Nama Tarif Tindakan"
        placeholder="Nama Tarif Tindakan"
      />
      <div class="grid items-end w-full grid-cols-2 col-span-3 gap-5">
        <div class="col-span-2 -mb-4 font-semibold text-MD">
          Metode Pilihan Tarif
        </div>
        <CustomRadio
          v-for="data in ['Single', 'Multiple']"
          v-model="metodeTarif"
          :sideLabel="data"
          :value="data"
        />
      </div>
      <CustomMultiSelect
        label="Pelayanan"
        placeholder="Pelayanan"
        class="col-span-6"
      />
      <CustomMultiSelect
        label="Metode Pembayaran"
        placeholder="Metode Pembayaran"
        class="col-span-6"
      />
    </div>

    <!-- Accordion Section -->
    <div class="h-[49vh] overflow-y-auto">
      <CustomAccordion
        class="col-span-12"
        initial-state="0"
        :open-with-header="false"
      >
        <template #header>
          <div class="flex items-end w-full">
            <div class="font-semibold text-heading">List Tindakan</div>
            <div class="grow ml-2.5">
              <CustomSwitch
                v-model="mcuLab"
                label=""
                side-label="Non-MCU Tindakan Lab"
                side-label-true="Non-MCU Tindakan Lab"
              />
            </div>
            <CustomButton icon="PhPlus" label="Tindakan" />
          </div>
        </template>

        <template #content>
          <TableKomponenTarifV1 class="mt-5" />
        </template>

        <template #collapseIcon>
          <CustomButton
            v-if="mcuLab"
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>

        <template #expandIcon>
          <CustomButton
            v-if="mcuLab"
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>

      <!-- Second Accordion (conditional based on mcuLab) -->
      <CustomAccordion
        v-if="mcuLab"
        class="col-span-12"
        initial-state="0"
        :open-with-header="false"
      >
        <template #header>
          List Tindakan Laboratorium
        </template>

        <template #content>
          <div class="flex items-center mt-5">
            <div class="font-semibold text-heading grow">
              Kelompok Pemeriksaan
            </div>
            <CustomButton icon="PhPlus" label="Kelompok" />
          </div>
          <hr class="border-grey-200 mt-[12.5px]" />
          <TableKomponenTarifV1 class="mt-5" />
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
    </div>
  </div>
</template>
