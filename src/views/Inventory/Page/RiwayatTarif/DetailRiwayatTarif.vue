<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

import Card from "primevue/card";
import type { MenuItem } from "primevue/menuitem";
import { computed, onMounted, ref, type PropType } from "vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  detailData: {
    type: Object,
  },
});

const emit = defineEmits(["kembali", "diterima"]);

const konversiSatuanData = ref<any | null>(null);
const riwayatPenerimaanPembelianData = ref<any | null>(null);
onMounted(() => {
  konversiSatuanData.value = [
    {
      jenisSatuan: "Satuan Penggunaan (Terkecil)",
      satuan: "Pcs",
      konversiIsi: 1,
    },
    {
      jenisSatuan: "Satuan Pembelian (Terkecil)",
      satuan: "Pcs",
      konversiIsi: 1,
    },
  ];
  riwayatPenerimaanPembelianData.value = [
    {
      tanggal: "01-01-2024",
      expDate: "01-01-2025",
      hargaDasar: 10000,
      HNA: 10000,
      HPP: 10000,
    },
    {
      tanggal: "01-01-2024",
      expDate: "01-01-2025",
      hargaDasar: 10000,
      HNA: 10000,
      HPP: 10000,
    },
  ];
});
</script>

<template>
  <!-- {{ detailData }} -->
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex items-center">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Riwayat Tarif',
                  home: true,
                }"
                :model="[
                  {
                    label: detailData?.namaItem,
                  },
                ]"
              >
              </CustomBreadCrumb>
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
          <div class="flex flex-col gap-2.5 pt-2.5">
            <div class="flex gap-5">
              <div class="grid grid-rows-2">
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">Kode Item</div>
                    <div class="font-normal text-normal">
                      {{ detailData?.kodeItem }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">Pabrik</div>
                    <div class="font-normal text-normal">
                      {{ detailData?.pabrik }}
                    </div>
                  </div>
                </div>
              </div>
              <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
              <div class="grid grid-cols-2 grow">
                <div>
                  <div class="font-semibold underline text-SM">Kategori</div>
                  <div class="font-normal text-normal">
                    {{ detailData?.kategoriItem }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Jenis Stok</div>
                  <div class="font-normal text-normal">
                    {{ detailData?.jenisStok }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Jenis Item</div>
                  <div class="font-normal text-normal">
                    {{ detailData?.jenisItem }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">
                    Satuan Penggunaan
                  </div>
                  <div class="font-normal text-normal">
                    {{ detailData?.satuanPenggunaan }}
                  </div>
                </div>
              </div>
              <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
              <div class="grid grid-rows-2 min-w-[400px]">
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">
                      Harga Dasar
                    </div>
                    <div class="font-normal text-normal">
                      Rp. {{ detailData?.hargaDasar }}
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">HNA</div>
                    <div class="font-normal text-normal">
                      Rp. {{ detailData?.HNA }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">HPP</div>
                    <div class="font-normal text-normal">
                      Rp. {{ detailData?.HPP }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="border-grey-200" />
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
      <CustomAccordion
        :openWithHeader="false"
        noBorder
        initialState="0"
        header-class="-mt-4"
      >
        <template #header>
          <div class="-mx-4">Konversi Satuan</div>
        </template>
        <template #content>
          <DataTable
            :value="konversiSatuanData"
            tableStyle="min-width: 50rem"
            scrollable
            class="-mx-[18px]"
            scrollHeight="240px"
            :pt="{ headerRow: 'text-SM' }"
          >
            <Column field="jenisSatuan" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">Jenis Satuan</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">
                    {{ slotProps.data.jenisSatuan }}
                  </div>
                </div>
              </template>
            </Column>
            <Column field="satuan" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">Satuan</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">
                    {{ slotProps.data.satuan }}
                  </div>
                </div>
              </template>
            </Column>
            <Column field="konversiIsi" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">Konversi Isi</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">
                    {{ slotProps.data.konversiIsi }} Pcs
                  </div>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-white"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-white"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion
        :openWithHeader="false"
        noBorder
        initialState="0"
        header-class="-mt-4"
      >
        <template #header>
          <div class="-mx-4">Riwayat Penerimaan Pembelian</div>
        </template>
        <template #content>
          <DataTable
            :value="riwayatPenerimaanPembelianData"
            tableStyle="min-width: 50rem"
            scrollable
            class="-mx-[18px]"
            scrollHeight="240px"
            :pt="{ headerRow: 'text-SM' }"
          >
            <Column field="tanggal" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">Tanggal</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">
                    {{ slotProps.data.tanggal }}
                  </div>
                </div>
              </template>
            </Column>
            <Column field="expDate" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">Exp Date</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">
                    {{ slotProps.data.expDate }}
                  </div>
                </div>
              </template>
            </Column>
            <Column field="hargaDasar" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">Harga Dasar</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">Rp. {{ slotProps.data.hargaDasar }}</div>
                </div>
              </template>
            </Column>
            <Column field="HNA" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">HNA</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">Rp. {{ slotProps.data.HNA }}</div>
                </div>
              </template>
            </Column>
            <Column field="HPP" headerClass="bg-adameds-50">
              <template #header>
                <div class="font-semibold">HPP</div>
              </template>
              <template #body="slotProps">
                <div>
                  <div class="text-SM">Rp. {{ slotProps.data.HPP }}</div>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-white"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-white"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
    </template>
  </Card>
</template>
