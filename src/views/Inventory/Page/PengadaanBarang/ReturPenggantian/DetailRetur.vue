<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import type { MenuItem } from "primevue/menuitem";
import type { PropType } from "vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  detailReturData: {
    type: Object,
  },
});

const emit = defineEmits(["kembali"]);
</script>

<template>
  <!-- {{ detailReturData }} -->
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex items-center">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Pengadaan Barang',
                  home: true,
                }"
                :model="[
                  {
                    label: 'Retur & Penggantian Barang Supplier',
                  },
                  {
                    noRetur: detailReturData?.noRetur,
                  },
                ]"
              >
                <template #customItem="{ item }">
                  <div class="flex">
                    <div
                      v-if="item.noRetur"
                      class="rounded-lg bg-adameds-300 px-[10px] text-white mr-[10px]"
                    >
                      {{ item.noRetur }}
                    </div>
                    <span
                      :class="{
                        'text-adameds-300': item.home,
                        'text-grey-400': !item.home,
                      }"
                    >
                      {{ item.label }}
                    </span>
                  </div>
                </template>
              </CustomBreadCrumb>
              <CustomChip
                :showCheckedIcon="false"
                :label="detailReturData?.status"
                bgColor="bg-lavender-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
            </div>
            <CustomButton
              @click="emit('kembali')"
              icon="PhCaretLeft"
              label="Kembali"
              class="mr-[10px]"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </template>
        <template #content>
          <div class="flex gap-6 py-2.5">
            <!-- Informasi Faktur -->
            <div class="grid w-1/3 grid-cols-2">
              <div>
                <div class="font-semibold underline text-SM">No Penerimaan</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.noPenerimaan }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">
                  Tgl. Penerimaan
                </div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.tglPenerimaan }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">No. Faktur</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.noFaktur }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Tgl. Faktur</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.tglFaktur }}
                </div>
              </div>
            </div>
            <hr class="h-auto border-[0.5px] border-adameds-300" />

            <div class="grid grid-rows-2 grow">
              <div class="grid grid-cols-3">
                <div>
                  <div class="font-semibold underline text-SM">Supplier</div>
                  <div class="font-normal text-normal">
                    {{ detailReturData?.supplier }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Kategori</div>
                  <div class="font-normal text-normal">
                    {{ detailReturData?.kategori }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Jenis Stok</div>
                  <div class="font-normal text-normal">
                    {{ detailReturData?.jenisStok }}
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3">
                <div>
                  <div class="font-semibold underline text-SM">Jenis Item</div>
                  <div class="font-normal text-normal">
                    {{ detailReturData?.jenisItem }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Cara Bayar</div>
                  <div class="font-normal text-normal">
                    {{ detailReturData?.caraBayar }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="border-1 border-grey-200 my-2.5" />
          <div class="flex gap-6 py-2.5">
            <!-- Informasi Faktur -->
            <div class="grid w-1/3 grid-cols-2">
              <div>
                <div class="font-semibold underline text-SM">Tgl. Retur</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.tglRetur }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Lokasi Gudang</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.asalLokasiGudang }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Alasan Retur</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.alasanRetur }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Catatan</div>
                <div class="font-normal text-normal">
                  {{ detailReturData?.catatan }}
                </div>
              </div>
            </div>
            <hr class="h-auto border-[0.5px] border-adameds-300" />

            <div class="flex items-center gap-5">
              <CustomSelect label="Jenis Penggantian" class="w-[200px]" />
              <CustomDatePicker label="Tgl. Penggantian" />
            </div>
          </div>
          <hr class="border-1 border-grey-200" />
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
    <template #content> </template>
    <template #footer>
      <hr class="pt-2 border-grey-200" />
        <div class="flex justify-between">
          <div class="flex gap-6">
            <CustomInputNumber v-model="diskon" class="" label="Diskon">
              <template #prependText>
                <div
                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                >
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
            <CustomInputNumber v-model="materai" class="" label="Materai">
              <template #prependText>
                <div
                  class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                >
                  Rp.
                </div>
              </template>
            </CustomInputNumber>
            <CustomSwitch
              label="PPN 11%"
              v-model="ppn"
              sideLabel="Rp. 2,200"
              sideLabelTrue="Rp. 2,200"
            />
          </div>

          <div class="flex items-center gap-5 pr-16">
            <hr class="h-3/4 border-x-[1px] border-adameds-300" />
            <div class="">
              <div class="font-semibold underline text-SM">Grand Total</div>
              <div class="font-normal text-MD">Rp. 111,0000</div>
            </div>
          </div>
        </div>
        <hr class="mt-4 border-grey-200" />
        <div class="flex items-center justify-between pt-5">
          <div class="flex gap-6">
            <div>
              <div class="font-semibold underline text-SM">Total Item</div>
              <div class="font-normal text-normal">
                {{ detailReturData?.datas.length }}
              </div>
            </div>
            <div>
              <div class="font-semibold underline text-SM">Petugas Retur</div>
              <div class="font-normal text-normal">{{ petugasRetur }}</div>
            </div>
          </div>
          <div class="flex gap-3">
            <CustomButton
              label="Reset"
              textColor="text-[#9DA4B1]"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-[#9DA4B1]"
              @click="resetFormFields"
            />
            <CustomButton label="Simpan Pembelian" @click="onSubmit" />
          </div>
        </div>
    </template>
  </Card>
</template>
