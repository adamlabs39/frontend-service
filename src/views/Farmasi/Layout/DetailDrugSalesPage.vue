<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
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

const defaultData = [
    {
        no: 1,
        namaItem: "Masker",
        stok: "2000",
        jenisStok: "5",
        pembelian: "5",
        satuan: "PCS",
        hargaSatuan: "5",
        jumlah: "5",
        diskon: '10%',
        total: '4000'
    },
];

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
]);

const addRow = () => {
  data.value.push({
    no: data.value.length + 1,
    namaItem: "",
    stok: "",
    jenisStok: "",
    pembelian: "",
    satuan: "PCS",
    hargaSatuan: "",
    jumlah: "",
    diskon: '',
    total: ''
  });
};

const addRowMutiple = () => {
  data.value.push(
        {
        no: data.value.length + 1,
        namaItem: "",
        stok: "",
        jenisStok: "",
        pembelian: "",
        satuan: "PCS",
        hargaSatuan: "",
        jumlah: "",
        diskon: '',
        total: ''
        },
        {
        no: data.value.length + 2,
        namaItem: "",
        stok: "",
        jenisStok: "",
        pembelian: "",
        satuan: "PCS",
        hargaSatuan: "",
        jumlah: "",
        diskon: '',
        total: ''
        },
        
    );
};

const dateFilter = ref<Date>(new Date());
const selectedItem = ref([]);
const data = ref([...defaultData]);

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
            <div class="grid grid-cols-[15%_15%_25%_45%] mt-[20px]">
                <div>
                    <CustomTextfield
                        disabled
                        label="No. Transaksi"
                        placeholder="OTC1234"
                        class="mr-[20px]"
                    />
                </div>
                <div>
                    <CustomDatePicker
                        v-model="dateFilter"
                        label="Tanggal"
                        class="mr-[20px]"
                    />
                </div>
                <div>
                    <CustomSelect
                        label="Lokasi Farmasi"
                        place-holder="Pilih Lokasi Farmasi"
                        class="mr-[20px]"
                        optionLabel=""
                        optionValue=""
                        :options="['Farmasi Rawat Jalan', 'Farmasi Rawat Inap', 'Farmasi IGD']"
                    />
                </div>
                <div>
                    <CustomTextfield
                        label="Dokter Yang Meresepkan"
                        placeholder="Dokter Yang Meresepkan"
                        class=""
                    />
                </div>
            </div>
            <div class="grid grid-cols-[40%_20%_40%] mt-[10px]">
                <div>
                    <CustomTextfield
                        label="Nama Pembeli"
                        placeholder="Nama Pembeli"
                        class="mr-[20px]"
                    />
                </div>
                <div>
                    <CustomTextfield
                        label="No. Handphone"
                        placeholder="08XX-XXXX-XXXX"
                        class="mr-[20px]"
                    />
                </div>
                <div>
                    <CustomTextfield
                        label="Catatan"
                        placeholder="Catatan"
                        class=""
                    />
                </div>
            </div>
            <hr class="mt-5 border-1 border-grey-200">
            <div class="mt-[20px]">
                <div class="relative overflow-y-auto" style="max-height: 220px">
                    <DataTable
                        v-if="pembelianObat.length"
                        v-model:selection="selectedItem"
                        :value="data"
                        class="text-black"
                        stripedRows
                        scrollable
                        :scrollHeight="'flex'"
                        :pt="{ headerRow: 'text-SM' }"
                    >
                        <!-- No -->
                        <Column field="No." headerClass="bg-adameds-50">
                        <template #header>
                            <div class="w-full font-semibold text-center">No.</div>
                        </template>
                        <template #body="slotProps">
                            <div class="text-center">
                            <div class="text-sm">{{ slotProps.data.no }}</div>
                            </div>
                        </template>
                        </Column>

                        <!-- Nama Item -->
                        <Column field="namaItem" header="Nama Item" headerClass="bg-adameds-50" style="width: 20%">
                        <template #body="slotProps">
                            <CustomTextfield
                                :showLabel="false"
                                prependIcon="PhMagnifyingGlass"
                                v-model="slotProps.data.namaItem"
                                placeholder="OTC1234"
                                class="mr-[20px]"
                            />
                        </template>
                        </Column>

                        <!-- Stok -->
                        <Column field="stok" header="Stok" headerClass="bg-adameds-50" style="width: 5%">
                            <template #body="slotProps">
                                <div class="text-center">
                                <div class="text-sm">{{ slotProps.data.stok }}</div>
                            </div>
                        </template>
                        </Column>

                        <!-- Jenis Stok -->
                        <Column field="jenisStok" header="Jenis Stok" headerClass="bg-adameds-50" style="width: 15%">
                        <template #body="slotProps">
                            <CustomTextfield
                                :showLabel="false"
                                v-model="slotProps.data.jenisStok"
                                placeholder="OTC1234"
                                class="mr-[20px]"
                            />
                        </template>
                        </Column>
                        
                        <!-- Pembelian -->
                        <Column field="pembelian" header="Pembelian" headerClass="bg-adameds-50" style="width: 5%">
                        <template #body="slotProps">
                            <CustomTextfield
                                :showLabel="false"
                                v-model="slotProps.data.pembelian"
                                placeholder="OTC1234"
                            />
                        </template>
                        </Column>

                        <!-- Satuan -->
                        <Column field="satuan" header="Satuan" headerClass="bg-adameds-50" style="width: 5%">
                            <template #body="slotProps">
                                <div class="text-center">
                                <div class="text-sm">{{ slotProps.data.satuan }}</div>
                            </div>
                        </template>
                        </Column>
                        
                        <!-- Harga Satuan -->
                        <Column field="hargaSatuan" header="Harga Satuan" headerClass="bg-adameds-50" style="width: 10%">
                            <template #body="slotProps">
                                <div class="text-center">
                                <div class="text-sm">{{ slotProps.data.hargaSatuan }}</div>
                            </div>
                        </template>
                        </Column>
                        
                        <!-- Jumlah -->
                        <Column field="jumlah" header="Jumlah" headerClass="bg-adameds-50">
                            <template #body="slotProps">
                                <div class="text-center">
                                <div class="text-sm">{{ slotProps.data.jumlah }}</div>
                            </div>
                        </template>
                        </Column>

                        <!-- Diskon -->
                        <Column field="diskon" header="Diskon" headerClass="bg-adameds-50">
                        <template #body="slotProps">
                            <CustomTextfield
                                v-model="slotProps.data.diskon"  
                                :showLabel="false" 
                                placeholder="0" 
                                class="mr-5" >
                                    <template #prependText>
                                    <div
                                        class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r"
                                    >
                                        Rp.
                                    </div>
                                    </template>
                            </CustomTextfield>
                        </template>
                        </Column>

                        <!-- Total -->
                        <Column field="total" header="Total" headerClass="bg-adameds-50">
                            <template #body="slotProps">
                                <div class="text-center">
                                <div class="text-sm">{{ slotProps.data.total }}</div>
                            </div>
                        </template>
                        </Column>
                        
                        <!-- Action -->
                        <Column field="Action" header="Action" headerClass="bg-adameds-50">
                            <template #body="slotProps">
                                <div class="flex items-center justify-center">
                                    <CustomButton
                                        :showLabel="false"
                                        background-color="bg-danger-300 rounded-lg"
                                        class="h-[25px] pr-[5px] pl-[5px]"     
                                    >
                                        <PhTrash :size="15" weight="fill" />
                                    </CustomButton>
                                </div>
                        </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300">
                <CustomButton
                    icon="PhPlus"
                    label="Tambah Item"
                    outlined
                    borderColor="border-adameds-300"
                    textColor="text-adameds-300"
                    @click="addRow"
                />
                <CustomButton
                    icon="PhPlus"
                    label="Tambah Item Mutiple"
                    outlined
                    borderColor="border-adameds-300"
                    textColor="text-adameds-300"
                    class="ml-[20px]"
                    @click="addRowMutiple"
                />
            </div>
            </div>
            <hr class="mt-[55px] border-1 border-grey-200">
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
                <div class="flex">
                    <CustomButton
                        label="Batal"
                        outlined
                        borderColor="border-mediumGrey-300"
                        textColor="text-mediumGrey-400"
                        class="mt-auto"
                    />
                    <CustomButton
                        label="Simpan"
                        class="mt-auto ml-[10px]"
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
  </div>
</template>
