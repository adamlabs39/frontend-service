<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const batalDialog = ref(false);
const pindahDialog = ref(false);
const editDialog = ref(false);

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
  console.log('Rows updated:', handleRowsUpdate);
};

const itemsAlkes = ref([
  {
    stokAlkes: "",
    harga: "1500",
    total: "25000"
  },
]);

const stokObat = ref([
  { label: "Umum", value: "umum" },
]);

// Incoming Recipes 
const incomingRecipes = ref(true);
const incomingRecipesDetails = ref(false);

const incomingRecipesOpen = () => {
  readyMedicine.value = false;
  drugHandover.value = false;
  incomingRecipesDetails.value = true;
};

const incomingRecipesClose = () => {
  readyMedicine.value = true;
  drugHandover.value = true;
  incomingRecipesDetails.value = false;
};

// Ready Medicine 
const readyMedicine = ref(true);
const readyMedicineDetails = ref(false);

const readyMedicineOpen = () => {
  incomingRecipes.value = false;
  drugHandover.value = false;
  readyMedicineDetails.value = true;
};

const readyMedicineClose = () => {
  incomingRecipes.value = true;
  drugHandover.value = true;
  readyMedicineDetails.value = false;
};

// Drug Handover 
const drugHandover = ref(true);
const drugHandoverDetails = ref(false);

const drugHandoverOpen = () => {
  incomingRecipes.value = false;
  readyMedicine.value = false;
  drugHandoverDetails.value = true;
};

const drugHandoverClose = () => {
  incomingRecipes.value = true;
  readyMedicine.value = true;
  drugHandoverDetails.value = false;
};
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
          <!-- Order Masuk -->
          <div v-show="incomingRecipes">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md">
              <div class="text-lg font-bold text-white font-poppins">Order Masuk</div>
            </div>
            <div class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
              <div v-on:click="incomingRecipesOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MAWAR 1"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
              <div v-on:click="incomingRecipesOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
              <div v-on:click="incomingRecipesOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MAWAR 1"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
            </div>
          </div>
          
          <!-- Sedang Disiapkan -->
          <div v-show="readyMedicine">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md">
              <div class="text-lg font-bold text-white font-poppins">Sedang Disiapkan</div>
            </div>
            <div class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
              <div v-on:click="readyMedicineOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
              <div v-on:click="readyMedicineOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
              <div v-on:click="readyMedicineOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
              <div v-on:click="readyMedicineOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="BPJS"
                        borderColor="border-warning-300"
                        bgColor="bg-warning-50"
                        :showCheckedIcon="false"
                        textColor="text-warning-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
            </div>
          </div>
          
          <!-- Penyerahan Alkes -->
          <div v-show="drugHandover">
            <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md">
              <div class="text-lg font-bold text-white font-poppins">Penyerahan Alkes</div>
            </div>
            <div class="h-[430px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
              <div v-on:click="drugHandoverOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
              <div v-on:click="drugHandoverOpen" class="">
                <div class="grid grid-cols-2">
                  <div class="grid justify-items-start">
                    <CustomButton class="h-5 text-xs">00-00-00</CustomButton>
                    <div class="text-sm font-bold mt-[5px]">Nama Pasien</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">DPJP</div>
                    <div class="mt-[5px]">dr. Nama Dokter</div>
                    <div>
                      <CustomChip
                        label="MELATI"
                        borderColor="border-grey-300"
                        bgColor="bg-grey-50"
                        :showCheckedIcon="false"
                        textColor="text-grey-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                  <div class="grid justify-items-end">
                    <div class="text-sm font-bold">RSP123</div>
                    <div class="text-sm font-bold mt-[5px]">REGISTER123</div>
                    <div class="text-xs font-bold underline underline-offset-2 mt-[5px]">Tgl. Order</div>
                    <div class="mt-[5px]">11-10-2024</div>
                    <div>
                      <CustomChip
                        label="TUNAI"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        :showCheckedIcon="false"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="mr-[5px]"
                      />
                    </div>
                  </div>
                </div>
                <hr class="mt-[10px] mb-[10px] border-[1px] border-grey-200">
              </div>
            </div>
          </div>

          <!-- Verifikasi -->
          <div v-show="incomingRecipesDetails" class="col-span-2">
            <div class="mt-[10px] p-3 bg-adameds-75">
              <!-- Title -->
              <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]">
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex">
                      <p class="font-bold text-white font-poppins">RSP1234</p>
                      <CustomChip
                        label="TUNAI"
                        :showCheckedIcon="false"
                        borderColor="border-adameds-300"
                        bgColor="bg-adameds-50"
                        textColor="text-adameds-300"
                        customClass="h-5"
                        class="ml-[5px] mt-[2px]"
                      />
                    </div>
                    <div class="flex justify-end">
                      <div class="bg-white w-[0.5px] h-[30px] mr-[20px]"></div>
                        <p class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]">Tgl. Order : 3-10-2024</p>
                        <CustomButton
                          background-color="bg-white" 
                          size="small" 
                          class="w-[30px] h-[30px] rounded-full p-0"
                          @click= "incomingRecipesClose"
                          >
                          <img src="@/assets/icons/x-bold.svg" alt="" width="" />
                        </CustomButton>
                    </div>
                </div>
              </div>
              <!-- Body -->
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <div class="flex flex-row">
                  <div class="basis-1/2">
                    <p class="font-bold text-MD">Nama lengkap pasien</p>
                    <p>REG1231235</p>
                    <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                    <CustomChip
                      :showCheckedIcon="false"
                      label="Laki-laki"
                      bgColor="bg-male-75"
                      textColor="text-male-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                    />
                    <!-- <CustomChip
                      :showCheckedIcon="false"
                      label="Perempuan"
                      bgColor="bg-female-75"
                      textColor="text-female-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    /> -->
                  </div>
                  <div class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"></div>
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Tgl. Lahir</p>
                    <p class="">10 Januari 2090</p>
                  </div>
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Umur</p>
                    <p class="">24Thn 2Bln 1Hari</p>
                  </div>
                </div>
                <!-- Asesmen Medis -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>
                      <div class="">Asesmen Medis</div>
                    </template>
                    <template #content>
                      <div class="flex flex-row mt-[20px]">
                        <div class="basis-1/2">
                          <div class="grid grid-cols-2">
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2">Keluhan Utama</p>
                              <p>Demam</p>
                            </div>
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
                              <p>Tidak Ada</p>
                            </div>
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                                <span>  
                                  <CustomButton 
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton>
                                </span>
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                          </div>
                        </div>
                        <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                          <p class="">H10.9 Conjuctivitis</p>
                          <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                          <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                          <p class="">-</p>
                          <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                          <p class="">-</p>
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
                <!-- List Alkes -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>List Alkes</template>
                    <template #content>
                      <div>
                        <div class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md">
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7">1</CustomButton>
                              <p class="my-auto ml-2 text-sm font-bold">
                                Alcohol Swab
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">15 Pcs</p>
                            </div>
                            <div class="flex justify-end">
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click = "editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
                          <DataTable :value="itemsAlkes" :pt="{ headerRow: 'text-SM' }">
                            <!-- Stok Obat -->
                            <Column field="stokAlkes" header="Stok Obat">
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    v-model="slotProps.data.stokAlkes"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column field="harga" header="Harga Satuan">
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">{{ slotProps.data.harga }}</p>
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.total }}</div>
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Petugas Order -->
                <div class="grid grid-cols-1">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex flex-row">
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Petugas Order</p>
                          <p class="">Perawat</p>
                        </div>
                        <div class="basis-1/2">
                          <div class="flex">
                            <div class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"></div>
                            <p class="font-bold mt-[7px]">Total Tagihan Order</p>
                          </div>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-base font-bold text-right mt-[7px]">RP. 0, 00</p>
                        </div>                    
                      </div>
                    </template>
                  </card>
                </div>
                <hr class="mt-5 border-[1px] border-grey-200">
                <!-- Verifikasi -->
                <div class="grid grid-cols-[40%,20%,40%]">
                  <div class="flex">
                    <div class="mt-[20px]">
                      <CustomButton 
                        label="Batal Order"
                        backgroundColor="bg-danger-300"
                        borderColor="border-danger-300"
                        textColor="text-white"
                        @click="batalDialog = true"
                      />
                      <CustomButton 
                        label="Pindah Lokasi Order"
                        class="ml-[10px]"
                        @click="pindahDialog = true"
                      />                  
                    </div>
                  </div>
                  <div class="mt-[20px] ml-[-10px]">
                    <CustomButton>
                        <div class="flex items-center gap-2">
                          <PhPrinter :size="18" color="#ffffff" weight="fill" />
                          <div class="text-sm">Cetak</div>
                        </div>
                      </CustomButton> 
                  </div>
                  <div class="flex justify-end">
                    <div class="mt-[20px]">
                      <CustomButton
                        label="Verifikasi"
                        class="ml-[20px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

           <!-- Alkes Siap Diserahkan -->
           <div v-show="readyMedicineDetails" class="col-span-2">
            <div class="mt-[10px] p-3 bg-adameds-75">
              <!-- Title -->
              <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]">
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex">
                    <p class="font-bold text-white font-poppins">RSP1234</p>
                    <CustomChip
                      label="TUNAI"
                      :showCheckedIcon="false"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[5px] mt-[2px]"
                    />
                  </div>
                  <div class="flex justify-end">
                    <div class="bg-white w-[0.5px] h-[30px] mr-[20px]"></div>
                      <p class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]">Tgl. Order : 3-10-2024</p>
                      <CustomButton
                        background-color="bg-white" 
                        size="small" 
                        class="w-[30px] h-[30px] rounded-full p-0"
                        @click="readyMedicineClose"
                        >
                        <img src="@/assets/icons/x-bold.svg" alt="" width="" />
                      </CustomButton>
                  </div>
                </div>
              </div>
              <!-- Body -->
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <div class="flex flex-row">
                  <div class="basis-1/2">
                    <p class="font-bold text-MD">Nama lengkap pasien</p>
                    <p>REG1231235</p>
                    <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                    <CustomChip
                      :showCheckedIcon="false"
                      label="Laki-laki"
                      bgColor="bg-male-75"
                      textColor="text-male-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                    />
                    <!-- <CustomChip
                      :showCheckedIcon="false"
                      label="Perempuan"
                      bgColor="bg-female-75"
                      textColor="text-female-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    /> -->
                  </div>
                  <div class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"></div>
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Tgl. Lahir</p>
                    <p class="">10 Januari 2090</p>
                  </div>
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Umur</p>
                    <p class="">24Thn 2Bln 1Hari</p>
                  </div>
                </div>
                <!-- Asesmen Medis -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>
                      <div class="">Asesmen Medis</div>
                    </template>
                    <template #content>
                      <div class="flex flex-row mt-[20px]">
                        <div class="basis-1/2">
                          <div class="grid grid-cols-2">
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2">Keluhan Utama</p>
                              <p>Demam</p>
                            </div>
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
                              <p>Tidak Ada</p>
                            </div>
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                                <span>  
                                  <CustomButton 
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton>
                                </span>
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                          </div>
                        </div>
                        <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                          <p class="">H10.9 Conjuctivitis</p>
                          <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                          <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                          <p class="">-</p>
                          <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                          <p class="">-</p>
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
                <!-- List Alkes -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>List Alkes</template>
                    <template #content>
                      <div>
                        <div class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md">
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7">1</CustomButton>
                              <p class="my-auto ml-2 text-sm font-bold">
                                Alcohol Swab
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">15 Pcs</p>
                            </div>
                            <div class="flex justify-end">
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click = "editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
                          <DataTable :value="itemsAlkes" :pt="{ headerRow: 'text-SM' }">
                            <!-- Stok Obat -->
                            <Column field="stokAlkes" header="Stok Obat">
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    v-model="slotProps.data.stokAlkes"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column field="harga" header="Harga Satuan">
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">{{ slotProps.data.harga }}</p>
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.total }}</div>
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Petugas Order -->
                <div class="grid grid-cols-1">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex flex-row">
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Petugas Order</p>
                          <p class="">Perawat</p>
                        </div>
                        <div class="basis-1/2">
                          <div class="flex">
                            <div class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"></div>
                            <p class="font-bold mt-[7px]">Total Tagihan Order</p>
                          </div>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-base font-bold text-right mt-[7px]">RP. 0, 00</p>
                        </div>                    
                      </div>
                    </template>
                  </card>
                </div>
                <hr class="mt-5 border-[1px] border-grey-200">
                <!-- Verifikasi -->
                <div class="grid grid-cols-2">
                  <div class="mt-[20px]">
                    <CustomButton>
                      <div class="flex items-center gap-2">
                        <PhPrinter :size="18" color="#ffffff" weight="fill" />
                        <div class="text-sm">Cetak</div>
                      </div>
                    </CustomButton> 
                  </div>
                  <div class="flex justify-end">
                    <div class="mt-[20px]">
                      <CustomButton label="Alkes Siap Diserahkan"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Serahkan -->
          <div v-show="drugHandoverDetails" class="col-span-2">
            <div class="mt-[10px] p-3 bg-adameds-75">
              <!-- Title -->
              <div class="mt-[10px] p-4 rounded-t-lg bg-adameds-300 shadow-md h-[60px]">
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex">
                    <p class="font-bold text-white font-poppins">RSP1234</p>
                    <CustomChip
                      label="TUNAI"
                      :showCheckedIcon="false"
                      borderColor="border-adameds-300"
                      bgColor="bg-adameds-50"
                      textColor="text-adameds-300"
                      customClass="h-5"
                      class="ml-[5px] mt-[2px]"
                    />
                  </div>
                  <div class="flex justify-end">
                    <div class="bg-white w-[0.5px] h-[30px] mr-[20px]"></div>
                      <p class="text-sm font-bold text-white font-poppins mt-[5px] mr-[20px]">Tgl. Order : 3-10-2024</p>
                      <CustomButton
                        background-color="bg-white" 
                        size="small" 
                        class="w-[30px] h-[30px] rounded-full p-0"
                        @click="drugHandoverClose"
                      >
                        <img src="@/assets/icons/x-bold.svg" alt="" width="" />
                      </CustomButton>
                  </div>
                </div>
              </div>
              <!-- Body -->
              <div class="p-4 bg-white rounded-b-lg shadow-md">
                <div class="flex flex-row">
                  <div class="basis-1/2">
                    <p class="font-bold text-MD">Nama lengkap pasien</p>
                    <p>REG1231235</p>
                    <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
                    <CustomChip
                      :showCheckedIcon="false"
                      label="Laki-laki"
                      bgColor="bg-male-75"
                      textColor="text-male-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
                    />
                    <!-- <CustomChip
                      :showCheckedIcon="false"
                      label="Perempuan"
                      bgColor="bg-female-75"
                      textColor="text-female-300"
                      customClass="h-5 pr-[6px] border-none mr-[5px]"
                    /> -->
                  </div>
                  <div class="bg-mediumGrey-300 w-[1px] h-[70px] mr-[20px]"></div>
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Tgl. Lahir</p>
                    <p class="">10 Januari 2090</p>
                  </div>
                  <div class="basis-1/4">
                    <p class="text-xs font-bold underline underline-offset-2 mt-[15px]">Umur</p>
                    <p class="">24Thn 2Bln 1Hari</p>
                  </div>
                </div>
                <!-- Asesmen Medis -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>
                      <div class="">Asesmen Medis</div>
                    </template>
                    <template #content>
                      <div class="flex flex-row mt-[20px]">
                        <div class="basis-1/2">
                          <div class="grid grid-cols-2">
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2">Keluhan Utama</p>
                              <p>Demam</p>
                            </div>
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
                              <p>Tidak Ada</p>
                            </div>
                            <div>
                              <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Dokter Pengirim
                                <span>  
                                  <CustomButton 
                                    class="h-[20px] w-[40px] text-xs ml-[10px]"
                                    outlined
                                    borderColor="border-grey-300"
                                    textColor="text-grey-300"
                                    >IGD</CustomButton>
                                </span>
                              </p>
                              <p>dr. Anji Sp. M</p>
                            </div>
                          </div>
                        </div>
                        <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Diagnosa Primer</p>
                          <p class="">H10.9 Conjuctivitis</p>
                          <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                          <p class="">-</p>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Diagnosa Sekunder</p>
                          <p class="">-</p>
                          <p class="text-xs font-bold underline underline-offset-2 mt-[10px]">Diagnosa Sekunder</p>
                          <p class="">-</p>
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
                <!-- List Alkes -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>List Alkes</template>
                    <template #content>
                      <div>
                        <div class="mt-[20px] p-4 rounded-t-lg bg-adameds-50 shadow-md">
                          <div class="grid grid-cols-2 gap-2">
                            <div class="flex">
                              <CustomButton class="text-sm h-7">1</CustomButton>
                              <p class="my-auto ml-2 text-sm font-bold">
                                Alcohol Swab
                              </p>
                              <PhArrowRight
                                :size="20"
                                class="my-auto ml-2 text-success-300"
                                weight="bold"
                              />
                              <p class="my-auto ml-2 text-sm font-bold">15 Pcs</p>
                            </div>
                            <div class="flex justify-end">
                              <CustomButton
                                label=""
                                background-color="bg-[#3D84E5] rounded-lg"
                                class="h-6 w-[26px] p-0"
                                @click = "editDialog = true"
                              >
                                <img src="@/assets/icons/edit.svg" alt="" />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                        <div class="h-[140px] p-4 overflow-auto bg-white rounded-b-lg shadow-md">
                          <DataTable :value="itemsAlkes" :pt="{ headerRow: 'text-SM' }">
                            <!-- Stok Obat -->
                            <Column field="stokAlkes" header="Stok Obat">
                              <template #body="slotProps">
                                <div class="">
                                  <CustomSelect
                                    v-model="slotProps.data.stokAlkes"
                                    :show-label="false"
                                    place-holder="Pilih Stok"
                                    optionValue="value"
                                    optionLabel="label"
                                    :options="stokObat"
                                  />
                                </div>
                              </template>
                            </Column>
                            <!-- Aturan & Cara Pakai -->
                            <Column field="harga" header="Harga Satuan">
                              <template #body="slotProps">
                                <div>
                                  <p class="text-sm">{{ slotProps.data.harga }}</p>
                                </div>
                              </template>
                            </Column>
                            <!-- Sub. Total -->
                            <Column field="total" header="Sub. Total">
                              <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.total }}</div>
                              </template>
                            </Column>
                          </DataTable>
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
                <!-- Petugas Order -->
                <div class="grid grid-cols-1">
                  <card class="bg-adameds-50">
                    <template #content>
                      <div class="flex flex-row">
                        <div class="basis-1/4">
                          <p class="text-xs font-bold underline underline-offset-2">Petugas Order</p>
                          <p class="">Perawat</p>
                        </div>
                        <div class="basis-1/2">
                          <div class="flex">
                            <div class="bg-adameds-300 w-[1px] h-[40px] mr-[20px]"></div>
                            <p class="font-bold mt-[7px]">Total Tagihan Order</p>
                          </div>
                        </div>
                        <div class="basis-1/4">
                          <p class="text-base font-bold text-right mt-[7px]">RP. 0, 00</p>
                        </div>                    
                      </div>
                    </template>
                  </card>
                </div>
                <hr class="mt-[20px] border-[1px] border-grey-200">
                <!-- Edukasi Pemberian Obat -->
                <div class="grid grid-cols-1">
                  <CustomAccordion no-border initial-state="0">
                    <template #header>Pemberian Alkes</template>
                    <template #content>
                      <div class="grid grid-cols-2 gap-6">
                        <div class="mt-[20px]">
                          <CustomSelect
                            place-holder="Nama Petugas"
                            label="Diberikan Oleh"
                            optionLabel=""
                            optionValue=""
                            :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                          />
                        </div>
                        <div class="mt-[20px]">
                          <CustomSelect
                            place-holder="Nama Petugas"
                            label="Diterima Oleh"
                            optionLabel=""
                            optionValue=""
                            :options="['Pagi', 'Siang', 'Sore', 'Malem']"
                          />
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
                <hr class="mt-[10px] border-[1px] border-grey-200">
                <!-- Verifikasi -->
                <div class="grid grid-cols-[50%,50%]">
                  <div class="flex">
                    <div class="mt-[20px]">
                      <CustomButton 
                        label="Batal Penyerahan"
                        backgroundColor="bg-danger-300"
                        borderColor="border-danger-300"
                        textColor="text-white"
                        @click="batalDialog = true"
                      />                  
                    </div>
                    <div class="mt-[20px] ml-[10px]">
                      <CustomButton>
                        <div class="flex items-center gap-2">
                          <PhPrinter :size="18" color="#ffffff" weight="fill" />
                          <div class="text-sm">Cetak</div>
                        </div>
                      </CustomButton>                   
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <div class="mt-[20px]">
                      <CustomButton label="Serahkan"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- Batal Notification -->
    <CustomDialog v-model:visible="batalDialog" width="550px" headerBg="bg-danger-300">
      <template #header>Batal Order</template>
      <template #body>
        <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <p class="font-bold">Alasan Membatalkan Order</p>
          </div>
          <div class="mt-[10px]">
            <CustomTextfield
                :showLabel="false"
                placeholder="Alasan Membatalkan Order"
              />
          </div>
          <div class="mt-[10px]">
            <p class="text-sm italic text-danger-300">*Setelah membatalkan, <span class="font-bold">Dokter</span> harus mengorderkan ulang obatnya</p>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="batalDialog = false"
            label="Batal"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton 
            label="Iya, Batalkan"
            backgroundColor="bg-danger-300"
            borderColor="border-danger-300"
            textColor="text-white"
            class="ml-[10px]"
          />
        </div>
      </template>
    </CustomDialog>

    <!-- Pindah Lokasi Dialog -->
    <CustomDialog v-model:visible="pindahDialog" width="550px">
      <template #header>Pindah Lokasi Order</template>
      <template #body>
        <div class="grid grid-cols-[45%,10%,45%]">
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Lokasi Awal Order"
              label="Lokasi Awal Order"
              class=""
              optionLabel=""
              optionValue=""
              :options="['Pagi', 'Siang', 'Sore', 'Malem']"
            />
          </div>
          <div class="mt-[20px]">
            <ArrowRightBrokenIcon
              :size="20"
              class="text-adameds-300 mt-[23px] ml-[15px]"
              weight="bold"
            />
          </div>
          <div class="mt-[20px]">
            <CustomSelect
              place-holder="Pilih Lokasi"
              label="Pindah Lokasi Ke"
              class=""
              optionLabel=""
              optionValue=""
              :options="['Pagi', 'Siang', 'Sore', 'Malem']"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="pindahDialog = false"
            label="Batal"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton 
            label="Pindahkan"
            class="ml-[10px]"
          />
        </div>
      </template>
    </CustomDialog>

    <!-- Edit Dialog -->
    <CustomDialog v-model:visible="editDialog" width="700px">
      <template #header>Edit Alkes</template>
      <template #body>
        <div class="grid grid-cols-1">
          <div class="mt-[20px]">
            <DataTable :pt="{ headerRow: 'text-SM' }">
              <!-- No -->
              <Column field="no" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-bold">No</div>
                </template>
                <template #body="slotProps">
                  <div class="flex">
                    <p class="text-xs">{{  }}</p>
                  </div>
                </template>
              </Column>
              <!-- List Alkes -->
              <Column field="alkes" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-bold">List Alkes</div>
                </template>
                <template #body="slotProps">
                  <div class="flex">
                    <p class="text-xs">{{  }}</p>
                  </div>
                </template>
              </Column>
              <!-- Jumlah -->
              <Column field="jumlah" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-bold">Jumlah</div>
                </template>
                <template #body="slotProps">
                  <div class="flex">
                    <p class="text-xs">{{  }}</p>
                  </div>
                </template>
              </Column>
              <!-- Satuan -->
              <Column field="satuan" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-bold">Satuan</div>
                </template>
                <template #body="slotProps">
                  <div class="flex">
                    <p class="text-xs">{{  }}</p>
                  </div>
                </template>
              </Column>
              <!-- Sisa Stok -->
              <Column field="satuan" headerClass="bg-adameds-50">
                <template #header>
                  <div class="w-full font-bold">Sisa Stok</div>
                </template>
                <template #body="slotProps">
                  <div class="flex">
                    <p class="text-xs">{{  }}</p>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="editDialog = false"
            label="Resep"
            outlined
            class=""
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton 
            label="Simpan Edit"
            class="ml-[10px]"
          />
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
