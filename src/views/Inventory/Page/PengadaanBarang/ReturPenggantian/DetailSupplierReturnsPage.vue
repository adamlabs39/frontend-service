<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSupplierReturnsStore } from "@/stores/inventory/supplierReturns";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { utilsStore } from "@/stores/utils";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { epochToDate, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

const props = defineProps({
  selectedData: {
    type: Object,
    default: () => ({}),
  },
});

const tglPenggantian = ref<Date>(new Date());
const jenisPenggantian = ref("barang");
const options = ref([
  { name: "Barang", value: "barang" },
  { name: "Uang", value: "uang" },
]);

function formatDate(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

const schema = toTypedSchema(
  yup
    .object({
      items: yup.array().of(
        yup.object({
          itemUuid: yup.string().required("Nama Item harus dipilih"),
          qtyOrder: yup.number().required("Jumlah Beli harus diisi"),
          hargaSatuan: yup.number().required("Harga Satuan harus diisi"),
          konversiUuid: yup.string().required("Satuan Beli harus diisi"),
        })
      ),
    })
    .noUnknown()
);

const { errors, handleSubmit, defineField, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    items: [
      {
        itemUuid: "",
        qtyOrder: 0,
        hargaSatuan: 0,
        konversiUuid: "",
      },
    ],
  },
});

interface retur {
  itemUuid: string;
  qty: number;
  konversiUuid: string;
  harga: number;
}

const { remove, push, fields: filedsRetur } = useFieldArray<retur>("items");

const addRow = () => {
  push({
    itemUuid: "",
    qty: 0,
    harga: 0,
    konversiUuid: "",
  });
};

const handleDelete = (index: number) => {
  remove(index);
};

// State Management
const SupplierReturnsStore = useSupplierReturnsStore();
const UseUtilsStore = utilsStore();
const DetailPayload = ref<any>({});

const emit = defineEmits(["back"]);

// Fetch Detail
const fetchDetail = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await SupplierReturnsStore.getApiDetail(
      props.selectedData.uuid
    );
    if (response && response.payload) {
      DetailPayload.value = response.payload;
    } else {
      DetailPayload.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// State Management
const MedicalItemStore = useMedicalItemStore();
const MedicalItemPayload = ref<any[]>([]);
const SatuanItemPayload = ref<any[]>([]);

// Fetch Item Medis
const fetchItemMedis = async () => {
  try {
    const response = await MedicalItemStore.getItemMedisApi(1, 9999);

    if (response && response.payload) {
      MedicalItemPayload.value = response.payload;
    } else {
      MedicalItemPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    MedicalItemPayload.value = [];
  }
};

onMounted(() => {
  fetchDetail();
  fetchItemMedis();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0 pb-0 overflow-auto" pt:content:class="h-full overflow-hidden" class="h-full overflow-hidden overflow-y-auto">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Pengadaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Pembelian Barang Supplier</p>
                </div>
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-grey-300"/>
                <div class="ml-[10px] mt-[5px]">
                  <CustomChip
                    :label="props.selectedData.noReturSupplier"
                    :showCheckedIcon="false"
                    borderColor="border-adameds-300"
                    bgColor="bg-adameds-300"
                    textColor="text-white"
                  />
                </div>
                <div v-if="props.selectedData.status == 'retur'" class="ml-[10px] mt-[5px]">
                  <CustomChip
                    label="RETUR"
                    :showCheckedIcon="false"
                    borderColor="border-lavender-300"
                    bgColor="bg-lavender-300"
                    textColor="text-white"
                  />
                </div>
                <div v-if="props.selectedData.status == 'verifikasi'" class="ml-[10px] mt-[5px]">
                  <CustomChip
                    label="DIVERIFIKASI"
                    :showCheckedIcon="false"
                    borderColor="border-info-300"
                    bgColor="bg-info-300"
                    textColor="text-white"
                  />
                </div>
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
            <div class="grid grid-cols-5 gap-5 mt-[20px]">
              <!-- Tgl Retur & Alasan Retur -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Tgl. Retur</p>
                <p>{{ epochToDate(DetailPayload.tanggalRetur, "date") }}</p>
                <div class="mt-[5px]">
                  <p class="text-xs font-bold underline underline-offset-2">Alasan Retur</p>
                  <p>{{ DetailPayload.alasanRetur }}</p>
                </div>
              </div>
              <!-- Lokasi Gudang & Catatan -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Lokasi Gudang</p>
                <p>{{ DetailPayload.lokasiGudang }}</p>
                <div class="mt-[5px]">
                  <p class="text-xs font-bold underline underline-offset-2">Catatan</p>
                  <p>{{ DetailPayload.catatan }}</p>
                </div>
              </div>
              <!-- Jenis Penggantian -->
              <div>
                <CustomSelect
                  label="Jenis Penggantian"
                  placeHolder="Pilih Jenis Penggantian"
                  v-model="jenisPenggantian"
                  :options="options"
                  optionLabel="name"
                  optionValue="value"
                />
              </div>
              <!-- Tgl. Penggantian -->
              <div>
                <CustomDatePicker v-model="tglPenggantian" label="Tgl. Penggantian" />
              </div>
            </div>
            <hr class="mt-[20px] border-1 border-grey-200" />
            <div class="grid grid-cols-5 gap-5 mt-[20px]">
              <!-- No. Penerimaan & No. Faktur -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">No. Penerimaan</p>
                <p>{{ DetailPayload.noPenerimaan }}</p>
                <div class="mt-[5px]">
                  <p class="text-xs font-bold underline underline-offset-2">No. Faktur</p>
                  <p>{{ DetailPayload.noFaktur }}</p>
                </div>
              </div>
              <!-- Tgl. Penerimaan & Tgl. Faktur -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Tgl. Penerimaan</p>
                <p>{{ epochToDate(DetailPayload.tanggalPenerimaan, "date") }}</p>
                <div class="mt-[5px]">
                  <p class="text-xs font-bold underline underline-offset-2">Tgl. Faktur</p>
                  <p>{{ epochToDate(DetailPayload.tanggalFaktur, "date") }}</p>
                </div>
              </div>
              <!-- Supplier & Jenis Item -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Supplier</p>
                <p>{{ DetailPayload.supplier }}</p>
                <div class="mt-[5px]">
                  <p class="text-xs font-bold underline underline-offset-2">Jenis Item</p>
                  <p>{{ DetailPayload.jenisItem }}</p>
                </div>
              </div>
              <!-- Kategori & Cara Bayar -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Kategori</p>
                <p>{{ DetailPayload.kategoriItem }}</p>
                <div class="mt-[5px]">
                  <p class="text-xs font-bold underline underline-offset-2">Cara Bayar</p>
                  <p>{{ DetailPayload.jenisPembayaran }}</p>
                </div>
              </div>
              <!-- Jenis Stok -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Jenis Stok</p>
                <p>{{ DetailPayload.jenisStok }}</p>
              </div>
            </div>
            <hr class="mt-5 border-1 border-grey-200" />
            <div v-if="jenisPenggantian == 'barang'" class="mt-[20px] relative overflow-y-auto" style="max-height: 200px" >
              <DataTable
                :value="filedsRetur"
                scrollable
                scrollHeight="flex"
                :pt="{ headerRow: 'text-SM' }"
              >
                <!-- No -->
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div class="w-full font-semibold">No.</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-sm">{{ slotProps.index + 1 }}</div>
                  </template>
                </Column>
                <!-- Nama Item -->
                <Column header="Nama Item" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <CustomSelect
                      v-model="slotProps.data.value.itemUuid"
                      :showLabel="false"
                      prependIcon="PhMagnifyingGlass"
                      place-holder="Cari Item"
                      optionLabel="name"
                      optionValue="uuid"
                      :options="MedicalItemPayload"
                    />
                  </template>
                </Column>
                <!-- Exp. Date -->
                <Column header="Exp. Date" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-sm">{{ formatDate(slotProps.data.expDate) }}</div>
                  </template>
                </Column>
                <!-- Terima Retur -->
                <Column header="Terima Retur" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <CustomInputNumber
                      class="w-[130px]"
                      :showLabel="false"
                      :show-buttons="true"
                    />
                  </template>
                </Column>
                <!-- Satuan Isi -->
                <Column header="Satuan Isi" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <CustomSelect
                      :showLabel="false"
                      place-holder="Satuan Isi"
                      optionLabel="satuanPembelian"
                      optionValue="uuid"
                      :options="[]"
                    />
                  </template>
                </Column>
                <!-- Harga Satuan -->
                <Column header="Harga Satuan" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <CustomInputNumber
                      :showLabel="false"
                      placeholder="0"
                      class="w-[150px]"
                    >
                      <template #prependText>
                        <div class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r">Rp.</div>
                      </template>
                    </CustomInputNumber>
                  </template>
                </Column>
                <!-- Total -->
                <Column header="Total" headerClass="bg-adameds-50">
                  <template #body="slotProps">
                    <div class="text-sm">{{ formatPrice(slotProps.data.totalHarga) }}</div>
                  </template>
                </Column>
                <!-- Action -->
                <Column header="Action" headerClass="bg-adameds-50">
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
            <div v-if="jenisPenggantian == 'barang'" class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300">
              <CustomButton
                icon="PhPlus"
                label="Tambah Item"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                @click="addRow"
              />
            </div>
            <hr class="mt-[20px] border-1 border-grey-200" />
            <!-- Diskon Materai PPN -->
            <div class="flex justify-between w-full mt-[10px]">
              <div class="flex">
                <div>
                  <p class="font-bold">Diskon</p>
                  <CustomInputNumber
                    :showLabel="false"
                    placeholder="0"
                    class="mt-[10px]"
                  >
                    <template #prependText>
                      <div class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r">Rp.</div>
                    </template>
                  </CustomInputNumber>
                </div>
                <div class="ml-[20px]">
                  <p class="font-bold">Materai</p>
                  <CustomInputNumber
                    :showLabel="false"
                    placeholder="0"
                    class="mt-[10px]"
                  >
                    <template #prependText>
                      <div class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r">Rp.</div>
                    </template>
                  </CustomInputNumber>
                </div>
                <div class="ml-[20px]">
                  <p class="font-bold">PPN</p>
                  <CustomInputNumber
                    placeholder="12"
                    :show-label="false"
                    class="w-[80px] bg-white rounded-xl mt-[10px]"
                  >
                    <template #appendText>
                      <div class="font-semibold bg-white text-sm text-adameds-300 ml-[10px] mt-[10px] rounded-r-xl w-[20px]">%</div>
                    </template>
                  </CustomInputNumber>
                </div>
              </div>
              <div class="flex">
                <div class="bg-adameds-300 w-[1.5px] h-[50px] mr-[20px] mt-[20px]"></div>
                <div class="mt-[20px] mr-[60px]">
                  <p class="font-bold underline underline-offset-2">Grand Total</p>
                  <p>{{}}</p>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-between w-full mt-[20px]">
              <div class="flex">
                <div>
                  <p class="font-bold underline underline-offset-2">Total Item</p>
                  <p>{{ DetailPayload.totalItem }}</p>
                </div>
                <div class="ml-[70px]">
                  <p class="font-bold underline underline-offset-2">Petugas Retur</p>
                  <p>{{ DetailPayload.petugasRetur }}</p>
                </div>
              </div>
              <div class="flex">
                <CustomButton
                  label="Reset"
                  outlined
                  borderColor="border-grey-300"
                  textColor="text-grey-300"
                />
                <CustomButton
                  label="Simpan & Terima Penggantian"
                  class="ml-[10px]"
                  backgroundColor="bg-adameds-300"
                  borderColor="border-adameds-300"
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
  </div>
</template>
