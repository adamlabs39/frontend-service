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
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
const data = ref([{ komponenTarif: "", rupiah: "", action: "" }]);
const addRow = () => {
  data.value.push({
    komponenTarif: "",
    rupiah: "",
    action: "",
  });
};
const metodeTarif = ref();
const mcuLab = ref();
</script>

<template>
  <div class="flex flex-col h-full h-full min-h-screen  gap-5">
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
    <div class="h-1/2 overflow-y-auto">
      <CustomAccordion
        class="col-span-12"
        initial-state="0"
        :open-with-header="false"
        no-border
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
        no-border
      >
        <!-- <template #header>
          List Tindakan Laboratorium
        </template> -->
        <template #header>
          <div class="flex justify-between w-full">
            <div class="font-semibold text-heading">
              List Tarif Laboratorium
            </div>

            <CustomButton icon="PhPlus" label="Tarif" />
          </div>
        </template>

        <template #content>
          <DataTable
            :value="data"
            tableStyle="min-width: 50rem"
            class="overflow-hidden text-xs rounded-lg bg-adameds-50 mt-5"
          >
            <Column headerClass="bg-adameds-300 text-white" class="w-4/6">
              <template #header>
                <div>Komponen Tarif</div>
              </template>
              <template #body>
                <CustomSelect label="" place-holder="Pilih Komponen Tarif" />
              </template>
            </Column>
            <Column headerClass="bg-adameds-300 ">
              <template #header>
                <div class="w-full text-xs font-semibold text-white text-end">
                  Rupiah (Rp)
                </div>
              </template>
              <template #body>
                <CustomInputNumber label="" align-number="text-end">
                  <template #prependText>
                    <div
                      class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD text-adameds-300 bg-adameds-300 rounded-l-md"
                    >
                      Rp.
                    </div>
                  </template>
                </CustomInputNumber>
              </template>
            </Column>
            <Column header="Action" headerClass="bg-adameds-300 text-white">
              <template #body="slotProps">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                </CustomButton>
              </template>
            </Column>
          </DataTable>
          <div class="flex items-center justify-end gap-5 mt-5">
            <div class="py-2.5 pr-5 border-r border-grey-200 font-bold text-MD">
              Grand Total
            </div>
            <div
              class="min-w-[280px] p-2.5 flex justify-end rounded-lg text-MD font-bold"
            >
              Rp. 30,000
            </div>
          </div>
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
