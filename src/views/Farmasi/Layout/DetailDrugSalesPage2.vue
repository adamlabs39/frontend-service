<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const pembelianObat = ref([
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
  {
    no: 1,
    namaItem: "Masker",
    stok: "20",
    jenisStok: "5",
    pembelian: "5",
    satuan: "PCS",
    hargaSatuan: "5",
    jumlah: "5",
    diskon: '10%',
    total: '4000'
  },
]);

const batalDialog = ref(false);

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 pb-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden overflow-y-auto"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full">
                <div class="flex">
                    <CustomButton icon="PhArrowClockwise" class="mr-5" />
                    <CustomBreadCrumb
                        :home="{
                        label: 'Penjualan Obat',
                        home: true,
                        }"
                        :model="dataBreadCrumb"
                        class="ml-1"
                    />
                </div>
                <div class="flex">
                    <CustomButton
                        @click="emit('back')"
                        icon="PhCaretLeft"
                        label="Kembali"
                        class="mr-[10px]"
                        outlined
                        borderColor="border-adameds-300"
                        textColor="text-adameds-300"
                    />
                </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-4 gap-4 mt-[20px]">
                <div>
                    <p class="text-xs font-bold underline underline-offset-2">Tgl. Transaksi</p>
                    <p class="">1 Oktober 2024 <span></span></p>
                </div>
                <div>
                    <p class="text-xs font-bold underline underline-offset-2">Lokasi Stok</p>
                    <p>Farmasi Rawat Jalan</p>    
                </div>
                <div>
                    <p class="text-xs font-bold underline underline-offset-2">Nama Pembeli</p>
                    <p>Hartanto Setiawan</p>
                </div>
                <div>
                    <p class="text-xs font-bold underline underline-offset-2">No. Handphone</p>
                    <p>081212341234</p>
                </div>
            </div>
            <div class="grid grid-cols-1 mt-[10px]">
                <div>
                    <p class="text-xs font-bold underline underline-offset-2">Catatan</p>
                    <p>-</p>
                </div>
            </div>
            <hr class="mt-5 border-1 border-grey-200">
            <div class="mt-[20px]">
                <div class="relative overflow-y-auto" style="max-height: 270px">
                    <DataTable
                         v-if="pembelianObat.length"
                        :value="pembelianObat"
                        tableStyle="min-width: 50rem"
                        scrollable
                        scrollHeight="flex"
                        :pt="{ headerRow: 'text-SM' }"
                        >
                        <!-- No -->
                        <Column field="no" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold">No.</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.no }}</div>
                            </template>
                        </Column>

                        <!-- Nama Item -->
                        <Column field="namaItem" header="Nama Item" headerClass="bg-adameds-50">
                            <template #body="slotProps">
                                <div class="text-sm">{{ slotProps.data.namaItem }}</div>
                            </template>
                        </Column>

                        <!-- Stok -->
                        <Column field="stok" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Stok</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.stok }}</div>
                                </div>
                            </template>
                        </Column>

                        <!-- Jenis Stok -->
                        <Column field="jenisStok" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Jenis Stok</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.jenisStok }}</div>
                                </div>
                            </template>
                        </Column>
                        
                        <!-- Pembelian -->
                        <Column field="pembelian" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Pembelian</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.pembelian }}</div>
                                </div>
                            </template>
                        </Column>

                        <!-- Satuan -->
                        <Column field="satuan" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Satuan</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.satuan }}</div>
                                </div>
                            </template>
                        </Column>
                        
                        <!-- Harga Satuan -->
                        <Column field="hargaSatuan" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Harga Satuan</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.hargaSatuan }}</div>
                                </div>
                            </template>
                        </Column>
                        
                        <!-- Jumlah -->
                        <Column field="jumlah" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Jumlah</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.jumlah }}</div>
                                </div>
                            </template>
                        </Column>

                        <!-- Diskon -->
                        <Column field="diskon" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Diskon</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.diskon }}</div>
                                </div>
                            </template>
                        </Column>

                        <!-- Total -->
                        <Column field="total" headerClass="bg-adameds-50">
                            <template #header>
                                <div class="w-full font-semibold text-center">Total</div>
                            </template>
                            <template #body="slotProps">
                                <div class="text-center">
                                    <div class="text-sm">{{ slotProps.data.total }}</div>
                                </div>
                        </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <hr class="mt-[30px]  border-1 border-grey-200">
            <div class="flex justify-between w-full mt-[10px]">
                <div class="flex">
                    <div>
                        <p class="font-bold underline underline-offset-2">Total Item</p>
                        <p>2 Item</p>
                    </div>
                    <div class="ml-[70px]">
                        <p class="font-bold underline underline-offset-2">Grand Total</p>
                        <p>Rp. 4.000, 00</p>
                    </div>
                </div>
                <div class="mt-[5px]">
                  <CustomButton 
                    @click="batalDialog = true"
                    label="Batal Penjualan" 
                    class="w-full"
                    backgroundColor="bg-danger-300"
                    borderColor="border-danger-300"
                    textColor="text-white"
                  />
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
    </Card>
    
    <!-- Bill Close Notification -->
    <CustomDialog v-model:visible="batalDialog" width="700px" headerBg="bg-danger-300">
      <template #header>Batal Penjualan</template>
      <template #body>
        <div class="grid grid-cols-1">
          <div>
            <p class="mt-[20px] font-bold">Alasan Batal Penjualan <span class="text-danger-300">*</span></p>
          </div>
          <div class="mt-[15px]">
            <CustomTextfield
                :showLabel="false"
                placeholder="Alasan Batal Penjualan"
              />
          </div>
        </div>
        <hr class="mt-6 border-1 border-grey-200">
      </template>
      <template #footer>
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
        />
      </template>
    </CustomDialog>
  </div>
</template>
