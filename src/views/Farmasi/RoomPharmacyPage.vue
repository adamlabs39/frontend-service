<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
  console.log('Rows updated:', handleRowsUpdate);
};

const itemsPasien = ref([
  {
    layanan: "00-00-00",
    name: "Abdi",
    doctor: "dr. Spesialis Sp. A",
    tglJadwal: "10-10-2010",
    noResep: "RSP1234",
    noRegis: 'REG123456789',
    kamar: 'Mawar',
    insurance_account_name: 'TUNAI'
  },
  {
    layanan: "22-22-22",
    name: "Anggi",
    doctor: "dr. Spesialis Sp. A",
    tglJadwal: "10-10-2010",
    noResep: "RSP1234",
    noRegis: 'REG123456789',
    kamar: 'Mawar',
    insurance_account_name: 'BPJS'
  },
  {
    layanan: "33-33-33",
    name: "Aldo",
    doctor: "dr. Spesialis Sp. A",
    tglJadwal: "10-10-2010",
    noResep: "RSP1234",
    noRegis: 'REG123456789',
    kamar: 'Mawar',
    insurance_account_name: 'BPJS'
  },
  {
    layanan: "33-33-33",
    name: "Aldo",
    doctor: "dr. Spesialis Sp. A",
    tglJadwal: "10-10-2010",
    noResep: "RSP1234",
    noRegis: 'REG123456789',
    kamar: 'Mawar',
    insurance_account_name: 'TUNAI'
  },
  {
    layanan: "33-33-33",
    name: "Aldo",
    doctor: "dr. Spesialis Sp. A",
    tglJadwal: "10-10-2010",
    noResep: "RSP1234",
    noRegis: 'REG123456789',
    kamar: 'Mawar',
    insurance_account_name: 'BPJS'
  },
  {
    layanan: "33-33-33",
    name: "Aldo",
    doctor: "dr. Spesialis Sp. A",
    tglJadwal: "10-10-2010",
    noResep: "RSP1234",
    noRegis: 'REG123456789',
    kamar: 'Mawar',
    insurance_account_name: 'BPJS'
  },
]);
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0"
      pt:content:class="h-full"
      class="h-full overflow-hidden overflow-y-auto"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Farmasi Ruangan',
                    home: true,
                  }"
                />
              </div>
              <div class="flex mr-[20px]">
                <CustomDatePicker
                  v-model="startDateFilter"
                  :showLabel="false"
                  class="w-[150px]"
                />
                <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
                <CustomDatePicker
                  v-model="endDateFilter"
                  :showLabel="false"
                  class="w-[150px]"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari No. Resep / No. RM / Nama Pasien"
                class="w-[70%] mr-5"
              />
              <CustomSelect
                place-holder="Pilih Lokasi"
                label="Lokasi"
                class="mr-5 w-[30%]"
                optionLabel=""
                optionValue=""
                :options="['Pagi', 'Siang', 'Sore', 'Malem']"
              />
              <CustomButton
                icon="PhMagnifyingGlass"
                label="Cari"
                class="mt-auto"
              />
              <CustomButton
                label="Reset"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="mt-auto ml-[10px]"
              />
            </div>
            <hr class="mt-5 border-[1px] border-grey-200">
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
      <template #content>
        <div class="grid grid-cols-3 gap-3">
          <!-- Order masuk -->
          <div>
            <DataTable
              :value="itemsPasien"
              scrollable 
              scrollHeight="500px"
              class="overflow-hidden rounded-[10px]"
              
            >
              <Column headerClass="bg-adameds-300 text-white">
                <template #header>
                  <div class="w-full font-bold">Order Masuk</div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-between">
                    <div>
                      <CustomButton class="h-5 text-xs">{{ slotProps.data.layanan }}</CustomButton>
                      <p class="font-bold text-sm mt-[5px]">{{ slotProps.data.name }}</p>
                      <p class="font-bold text-xs mt-[5px] underline underline-offset-2">DPJP</p>
                      <p class="mt-[5px]">{{ slotProps.data.doctor }}</p>
                      <CustomButton 
                        class="h-[20px] w-[60px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-grey-300"
                        textColor="text-grey-300"
                        >{{ slotProps.data.kamar }}</CustomButton>
                    </div>
                    <div>
                      <p class="text-sm font-bold">{{ slotProps.data.noResep }}</p>
                      <p class="font-bold text-sm mt-[5px]">{{ slotProps.data.noRegis }}</p>
                      <p class="font-bold text-xs mt-[5px] underline underline-offset-2">Tgl. Order</p>
                      <p class="mt-[5px]">{{ slotProps.data.tglJadwal }}</p>
                      <CustomButton v-if="slotProps.data.insurance_account_name == 'TUNAI'" 
                        class="h-[20px] w-[50px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-adameds-300"
                        textColor="text-adameds-300"
                        >TUNAI</CustomButton>
                      <CustomButton v-if="slotProps.data.insurance_account_name == 'BPJS'" 
                        class="h-[20px] w-[50px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-warning-300"
                        textColor="text-warning-300"
                        >BPJS</CustomButton>
                    </div>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>

           <!-- Sedang Disiapkan -->
           <div>
            <DataTable
              :value="itemsPasien"
              scrollable 
              scrollHeight="500px"
              class="overflow-hidden rounded-[10px]"
            >
              <Column headerClass="bg-adameds-300 text-white">
                <template #header>
                  <div class="w-full font-bold">Sedang Disiapkan</div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-between">
                    <div>
                      <CustomButton class="h-5 text-xs">{{ slotProps.data.layanan }}</CustomButton>
                      <p class="font-bold text-sm mt-[5px]">{{ slotProps.data.name }}</p>
                      <p class="font-bold text-xs mt-[5px] underline underline-offset-2">DPJP</p>
                      <p class="mt-[5px]">{{ slotProps.data.doctor }}</p>
                      <CustomButton 
                        class="h-[20px] w-[60px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-grey-300"
                        textColor="text-grey-300"
                        >{{ slotProps.data.kamar }}</CustomButton>
                    </div>
                    <div>
                      <p class="text-sm font-bold">{{ slotProps.data.noResep }}</p>
                      <p class="font-bold text-sm mt-[5px]">{{ slotProps.data.noRegis }}</p>
                      <p class="font-bold text-xs mt-[5px] underline underline-offset-2">Tgl. Order</p>
                      <p class="mt-[5px]">{{ slotProps.data.tglJadwal }}</p>
                      <CustomButton v-if="slotProps.data.insurance_account_name == 'TUNAI'" 
                        class="h-[20px] w-[50px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-adameds-300"
                        textColor="text-adameds-300"
                        >TUNAI</CustomButton>
                      <CustomButton v-if="slotProps.data.insurance_account_name == 'BPJS'" 
                        class="h-[20px] w-[50px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-warning-300"
                        textColor="text-warning-300"
                        >BPJS</CustomButton>
                    </div>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>

          <!-- Penyerahan Alkes/Obat -->
          <div>
            <DataTable
              :value="itemsPasien"
              scrollable 
              scrollHeight="500px"
              class="overflow-hidden rounded-[10px]"
            >
              <Column headerClass="bg-adameds-300 text-white">
                <template #header>
                  <div class="w-full font-bold">Penyerahan Alkes/Obat</div>
                </template>
                <template #body="slotProps">
                  <div class="flex justify-between">
                    <div>
                      <CustomButton class="h-5 text-xs">{{ slotProps.data.layanan }}</CustomButton>
                      <p class="font-bold text-sm mt-[5px]">{{ slotProps.data.name }}</p>
                      <p class="font-bold text-xs mt-[5px] underline underline-offset-2">DPJP</p>
                      <p class="mt-[5px]">{{ slotProps.data.doctor }}</p>
                      <CustomButton 
                        class="h-[20px] w-[60px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-grey-300"
                        textColor="text-grey-300"
                        >{{ slotProps.data.kamar }}</CustomButton>
                    </div>
                    <div>
                      <p class="text-sm font-bold">{{ slotProps.data.noResep }}</p>
                      <p class="font-bold text-sm mt-[5px]">{{ slotProps.data.noRegis }}</p>
                      <p class="font-bold text-xs mt-[5px] underline underline-offset-2">Tgl. Order</p>
                      <p class="mt-[5px]">{{ slotProps.data.tglJadwal }}</p>
                      <CustomButton v-if="slotProps.data.insurance_account_name == 'TUNAI'" 
                        class="h-[20px] w-[50px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-adameds-300"
                        textColor="text-adameds-300"
                        >TUNAI</CustomButton>
                      <CustomButton v-if="slotProps.data.insurance_account_name == 'BPJS'" 
                        class="h-[20px] w-[50px] text-xs mt-[5px]"
                        outlined
                        borderColor="border-warning-300"
                        textColor="text-warning-300"
                        >BPJS</CustomButton>
                    </div>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
