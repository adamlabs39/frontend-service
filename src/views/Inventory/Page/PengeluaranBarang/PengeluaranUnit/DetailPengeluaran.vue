<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Card from "primevue/card";
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, type PropType } from "vue";

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

onMounted(() => {
  console.log("Page Type:", props.pageType);
  console.log("Detail Data:", props.detailData); // Log detailData here
});

const emit = defineEmits(["kembali"]);
</script>

<template>
  <!-- {{ props.detailData }} -->
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Pengeluaran Barang',
                  home: true,
                }"
                :model="[
                  {
                    label: 'Pengeluaran Unit',
                  },
                  {
                    noPengeluaran: detailData?.noPengeluaran,
                  },
                ]"
              >
                <template #customItem="{ item }">
                  <div class="flex">
                    <div
                      v-if="item.noPengeluaran"
                      class="rounded-lg bg-adameds-300 px-[10px] text-white mr-[10px]"
                    >
                      {{ item.noPengeluaran }}
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
          <div class="grid grid-rows-2 gap-2.5 pt-2.5">
            <div class="grid grid-cols-4 gap-2.5">
              <div>
                <div class="font-semibold underline text-SM">Jenis Pengeluaran</div>
                <div class="font-normal text-normal">
                  {{ detailData?.jenisPengeluaran }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">
                  Tgl. Permintaan
                </div>
                <div class="font-normal text-normal">
                  {{ detailData?.tanggalPengeluaran }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Kategori Item</div>
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
            </div>
            <div class="grid grid-cols-4 gap-2.5">
              <div>
                <div class="font-semibold underline text-SM">Jenis Item</div>
                <div class="font-normal text-normal">
                  {{ detailData?.jenisItem }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Tujuan Pengeluaran</div>
                <div class="font-normal text-normal">
                  {{ detailData?.tujuanPengeluaran }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Petugas Pengeluaran</div>
                <div class="font-normal text-normal">
                  {{ detailData?.petugasPengeluaran}}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Catatan</div>
                <div class="font-normal text-normal">
                  {{ detailData?.catatan}}
                </div>
              </div>
             
            </div>
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
      <DataTable
        :value="detailData?.datas"
        scrollable
        scrollHeight="300px"
        :pt="{ headerRow: 'text-SM' }"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold text-SM">No.</div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center text-SM">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          header="Nama Item"
          headerClass="bg-adameds-50 text-SM"
          class="w-1/2"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.namaItems }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Exp Date</div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.expDate }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Min Stok</div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.minStok }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Stok</div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.stok }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Pengeluaran
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.pengeluaran }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Satuan/Isi
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.satuan }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">HNA</div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">Rp. {{ slotProps.data.HNA }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">HPP</div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">Rp. {{ slotProps.data.HPP }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" >
          <template #header>
            <div class="w-full font-semibold text-end text-SM">Total</div>
          </template>
          <template #body="slotProps">
            <div class="text-SM text-end">Rp. 200000</div>
          </template>
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <hr class="my-4 border-grey-200" />
      <div class="flex items-center gap-6">
        <CustomButton
          label="Cetak"
          class="my-auto bg-adameds-300"
          icon="PhPrinter"
        />
        <div>
          <div class="font-semibold underline text-SM">Total Item</div>
          <div class="font-normal text-normal">
            {{ detailData?.datas.length }} item
          </div>
        </div>
        <div>
         <div class="font-semibold underline text-SM">Grand Total</div>
          <div class="font-normal text-normal">
            Rp. 100.000
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
