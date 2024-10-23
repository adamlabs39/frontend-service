<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import type { MenuItem } from "primevue/menuitem";
import { ref, type PropType } from "vue";
import DialogMultiple from "../PembelianBarangSupplier/DialogPermintaanMultiple.vue";

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
const tanggalPenggantian = ref<Date>(new Date());

const jenisPenggantian = ref("Barang");
const listJenisPenggantian = ref([
  { id: 1, value: "Barang" },
  { id: 2, value: "Uang" },
]);
const namaItems = ref([
  { id: "1", value: "Paracetamol" },
  { id: "2", value: "Panadol" },
  { id: "3", value: "Bodrex" },
  { id: "4", value: "Decolgen" },
]);

const satuansIsi = ref([
  { id: "1", value: "Box/100" },
  { id: "2", value: "Karton" },
  { id: "2", value: "Kardus" },
]);

const myPushFunction = () => {
  const newData = {
    id: props.detailReturData?.datas.length + 1, 
    expDate: "01-01-2025",
    namaItems: "",
    jumlahBeli: 0,
    hargaSatuan: 0,
    satuanBeli: "",
    jumlahPermintaan: 0,
  };
  props.detailReturData?.datas.push(newData);
};

const deleteReturItem = (index: number) => {
  props.detailReturData?.datas.splice(index, 1);
};

const dialogTambahItemMultiple = ref({
  isVisible: false,
  title: "Tambah Item Multiple",
});

function handleAddMultiple() {
  dialogTambahItemMultiple.value.isVisible = true;
}


// Setelah tambah data multiple di dialog
function addToArray(newItems: any[]) {
//   console.log(newItems); 


  newItems.forEach(item => {
    const newData = {
      id: (props.detailReturData?.datas.length || 0) + 1,
      expDate: "01-01-2025",
      namaItems: item?.namaItems || "",
      jumlahBeli: item?.jumlahBeli || 0,
      hargaSatuan: item?.hargaSatuan || 0,
      satuanBeli: item?.satuanBeli || "",
        jumlahPermintaan: item?.jumlahPermintaan || 0,
       sisaStok: item?.sisaStok || 0, 
      stokTujuan: item?.stokTujuan || 0, 
    };

    props.detailReturData?.datas.push(newData);
  });
}
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
              <CustomSelect
                label="Jenis Penggantian"
                class="w-[200px]"
                v-model="jenisPenggantian"
                :options="listJenisPenggantian"
                optionLabel="value"
                optionValue="value"
              />
              <CustomDatePicker
                label="Tgl. Penggantian"
                v-model:modelValue="tanggalPenggantian"
              />
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
    <template #content>
      <div v-if="jenisPenggantian === 'Barang'">
        <DataTable
          :pt="{ headerRow: 'text-SM' }"
          :value="detailReturData?.datas"
          scrollable
          scrollHeight="160px"
          class="overflow-hidden text-xs rounded-lg bg-adameds-50"
        >
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="w-[20px]"
          >
            <template #header>
              <div class="flex items-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>

          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="font-semibold">Nama Item</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.namaItems"
                :options="namaItems"
                optionValue="value"
                optionLabel="value"
                label=""
                place-holder="Cari & Pilih Item"
              />
            </template>
          </Column>
          <Column
            headerClass="bg-adameds-50 font-semibold text-SM"
            class="w-[100px]"
          >
            <template #header>
              <div class="w-full text-center">Exp. Date</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.data.expDate }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50 " class="w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Terima Retur</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                :show-label="false"
                v-model="slotProps.data.jumlahBeli"
                :show-buttons="true"
              />
            </template>
          </Column>

          <Column headerClass="bg-adameds-50" class="max-w-[160px]">
            <template #header>
              <div class="w-full font-semibold text-center">Satuan/Isi</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                v-model="slotProps.data.satuanBeli"
                :options="satuansIsi"
                optionValue="value"
                optionLabel="value"
                label=""
                place-holder="Cari & Pilih Item"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50 " class="min-w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Harga Satuan</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                v-model="slotProps.data.hargaSatuan"
                class=""
                label=""
              >
                <template #prependText>
                  <div
                    class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                  >
                    Rp.
                  </div>
                </template>
              </CustomInputNumber>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50 " class="min-w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">
                Jumlah Permintaan
              </div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                v-model="slotProps.data.jumlahPermintaan"
                class=""
                label=""
              >
                <template #prependText>
                  <div
                    class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
                  >
                    Rp.
                  </div>
                </template>
              </CustomInputNumber>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  @click="deleteReturItem(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="14px" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <div
          class="flex items-center justify-center m-5 p-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
        >
          <CustomButton
            icon="PhPlus"
            label="Tambah Item"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="myPushFunction"
          />
          <CustomButton
            icon="PhPlus"
            label="Tambah Item Multiple"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="handleAddMultiple"
          />
        </div>
        <DialogMultiple
          v-model:isDialogVisible="dialogTambahItemMultiple.isVisible"
          :title="dialogTambahItemMultiple.title"
          @add-permintaan="addToArray"
        />
      </div>
      <div v-else class="flex items-center justify-between ">
        <div class="font-bold text-subHeading">Nominal Penggantian</div>
         <CustomInputNumber class="" label="">
            <template #prependText>
              <div
                class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
              >
                Rp.
              </div>
            </template>
          </CustomInputNumber>
      </div>
    </template>
    <template #footer>
      <hr class="pt-2 border-grey-200" />
      <div class="flex justify-between">
        <div class="flex gap-6">
          <CustomInputNumber class="" label="Diskon">
            <template #prependText>
              <div
                class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
              >
                Rp.
              </div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber class="" label="Materai">
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
              {{ detailReturData?.datas.length }} item
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Petugas Retur</div>
            <div class="font-normal text-normal">{{ detailReturData?.petugasRetur }}</div>
          </div>
        </div>
        <div class="flex gap-3">
          <CustomButton
            label="Reset"
            textColor="text-[#9DA4B1]"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-[#9DA4B1]"
          />
          <CustomButton label="Simpan & Terima Penggantian" />
        </div>
      </div>
    </template>
  </Card>
</template>
