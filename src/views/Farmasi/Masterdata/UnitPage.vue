<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

const emits = defineEmits(['update:rows', 'update:current-page']);
const handleRowsUpdate = (rows: number) => {
  console.log('Rows updated:', handleRowsUpdate);
};
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Kasir',
                    home: true,
                  }"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex mt-[10px]">
              <CustomTextfield
                label="Pencarian Transaksi"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Nama / address / No. RM"
                class="w-[48%] mr-5"
              />
              <div class="bg-adameds-300 w-[2px] h-[35px] mt-[30px] mr-[20px]"></div>
              <CustomTextfield pr label="Saldo Awal" placeholder="0" class="mr-5">
                <template #prependText>
                  <div
                    class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r"
                  >
                    Rp.
                  </div>
                </template>
              </CustomTextfield>
              <CustomSelect
                label="Pilih Shift"
                class="grow"
                optionLabel=""
                optionValue=""
                :options="['Pagi', 'Siang', 'Sore', 'Malem']"
              />
              <CustomButton
                label="Open Kasir"
                class="ml-5 mr-[10px] mt-auto"
              />
            </div>
            <div class="flex mt-[10px]">
              
            </div>
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
          <div class="grid grid-cols-[50%_50%] gap-5 h-full mr-5">
            <div class="flex flex-col text-center border-[3px] border-dashed border-grey-300 rounded-lg">
              <div class="m-auto text-SM">
                <img
                  src="../../../assets/icons/no-data-icon.svg"
                  alt="no data"
                  class="mx-auto"
                />
                <div class="text-grey-300">Silahkan Cari Tagihan Pasien</div>
              </div>
            </div>
            
            <!-- Kolom Pembayaran -->
            <div class="relative p-5 rounded-lg bg-adameds-50">
              <!-- Total Pembayaran -->
              <div class="flex items-center justify-between">
                <div class="text-base font-bold font-poppins">
                  Total Pembayaran
                </div>
              </div>
              <hr class="mt-2 mb-2 border border-slate-300"/>
              <!-- Biaya Administrasi -->
              <div class="flex justify-between mt-6">
                <div class="text-sm text-black font-poppins">
                  Biaya Administrasi
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- Biaya Tindakan -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  Biaya Tindakan
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- Biaya Obat -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  Biaya Obat
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- Biaya Kamar -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  Biaya Kamar
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <!-- PPN -->
              <div class="flex justify-between mt-4">
                <div class="text-sm font-poppins">
                  PPN
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <hr class="mt-4 border-dashed border-[1px] border-slate-300"/>
              <!-- Diskon -->
              <div class="flex justify-between mt-6">
                <div class="text-sm font-poppins">
                  Diskon
                </div>
                <div class="text-sm font-poppins">
                  Rp, 0
                </div>
              </div>
              <hr class="mt-6 mb-2 border-black border-1"/>
              <!-- Grand Total -->
              <div class="flex justify-between mt-6">
                <div class="text-sm font-bold font-poppins">
                  Grand Total
                </div>
                <div class="text-sm font-bold font-poppins">
                  Rp, 0
                </div>
              </div>
              <div class="absolute inset-x-0 bottom-0 mb-4">
                <div class="flex">
                  <!-- <CustomButton
                    label="Bayar"
                    class="w-full mr-4"
                  /> -->
                  <CustomButton
                    label="Bayar"
                    class="w-full ml-4 mr-4"
                    textColor = "text-slate-400"
                    backgroundColor="bg-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
      </template>
    </Card>
  </div>
</template>
