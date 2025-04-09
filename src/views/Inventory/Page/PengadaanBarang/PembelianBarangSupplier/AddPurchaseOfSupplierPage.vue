<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import { usePurchasingOfSupplierStore } from "@/stores/inventory/purchasingOfSupplier";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { useSupplierStore } from "@/stores/inventory/supplier";
import { useStockTypeStore } from "@/stores/datamasterFarmasi/StockType";
import { utilsStore } from "@/stores/utils";
import { dateToEpoch, formatPrice } from "@/utils/Helpers";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
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

function generateRandomNoPembelian() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Angka acak 4 digit
  return `PO${randomNumber}`; // Gabungkan dengan "PO"
}

const optionKategori = ref([
  { name: "Medis", value: "medis" },
  { name: "Non-Medis", value: "non-medis" },
]);

const optionJenis = ref([
  { name: "Obat", value: "obat" },
  { name: "Alkes", value: "alkes" },
]);

const optionPay = ref([
  { name: "Tunai", value: "tunai" },
  { name: "Kredit", value: "kredit" },
]);

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

const schema = toTypedSchema(
  yup
    .object({
      lokasi: yup.string().required("Lokasi Penerima harus diisi"),
      kategoriItem: yup.string().required("Kategori Item harus diisi"),
      jenisItem: yup.string().required("Jenis Item harus diisi"),
      jenisStokUuid: yup.string().required("Jenis Stok harus diisi"),
      supplierUuid: yup.string().required("Supplier harus diisi"),
      tanggalPembelian: yup.date().default(new Date()).required("Tanggal Pembelian harus diisi"),
      metodePembelian: yup.string().required("Cara Bayar harus diisi"),
      catatan: yup.string().required("Catatan harus diisi"),
      isCito: yup.bool().default(false),
      items: yup.array().of(
        yup.object({
          itemUuid: yup.string().required("Nama Item harus dipilih"),
          qtyOrder: yup.number().required("Jumlah Beli harus diisi"),
          hargaSatuan: yup.number().required("Harga Satuan harus diisi"),
          konversiUuid: yup.string().required("Satuan Beli harus diisi"),
        })
      ),
    }).noUnknown()
);

const { errors, handleSubmit, defineField } = useForm({
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

const [lokasi] = defineField("lokasi");
const [kategoriItem] = defineField("kategoriItem");
const [jenisItem] = defineField("jenisItem");
const [jenisStokUuid] = defineField("jenisStokUuid");
const [supplierUuid] = defineField("supplierUuid");
const [tanggalPembelian] = defineField("tanggalPembelian");
const [metodePembelian] = defineField("metodePembelian");
const [catatan] = defineField("catatan");
const [isCito] = defineField("isCito");

interface penjualanObat {
  itemUuid: string;
  qtyOrder: number;
  hargaSatuan: number;
  konversiUuid: string;
}

const { remove, push, fields: filedsPenjualan } = useFieldArray<penjualanObat>("items");

const addRow = () => {
  push({
    itemUuid: "",
    qtyOrder: 0,
    hargaSatuan: 0,
    konversiUuid: "",
  });
};

// State Management
const diskon = ref(0);
const grandTotal = ref(0);
const totalItem = ref(0);
const noPembelian = ref("");
const StockLocationStore = useStockLocationStore();
const StockLocationPayload = ref<any[]>([]);
const UseUtilsStore = utilsStore();

// Fetch Stock Location
const fetchStockLocation = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockLocationStore.getApi(1, 9999);

    if (response && response.payload) {
      StockLocationPayload.value = response.payload;
    } else {
      StockLocationPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockLocationPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// State Management
const SupplierStore = useSupplierStore();
const SupplierPayload = ref<any[]>([]);

// Fetch RulesOfUse
const fetchSupplier = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await SupplierStore.getApi(1, 9999);

    if (response && response.payload) {
      SupplierPayload.value = response.payload;
    } else {
      SupplierPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    SupplierPayload.value = [];
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

// State Management
const StockTypeStore = useStockTypeStore();
const StockTypePayload = ref<any[]>([]);

// Fetch Stock Type
const fetchStockType = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockTypeStore.getApi(1, 9999);

    if (response && response.payload) {
      StockTypePayload.value = response.payload;
    } else {
      StockTypePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    StockTypePayload.value = [];
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

// Fetch Item Medis
const fetchSatuanItem = async (uuid: string) => { 
  try {
    const response = await MedicalItemStore.getItemUnitApi(uuid);

    if (response && response.payload) {
      SatuanItemPayload.value = Array.isArray(response.payload) 
        ? response.payload 
        : [response.payload];
    } else {
      SatuanItemPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    SatuanItemPayload.value = [];
  }
};

const PurchasingOfSupplierStore = usePurchasingOfSupplierStore();

const onSubmit = handleSubmit(async (values: any) => {
  values.tanggalPembelian = dateToEpoch(values.tanggalPembelian);
  values.totalItem = totalItem.value;
  values.grandTotal = grandTotal.value;
  try {
    const response = await PurchasingOfSupplierStore.postApi(values);
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    UseUtilsStore.setLoading(false);
    emit("back");
  }
});

const updateNameItem = (index: number) => {
  const selectedItem = MedicalItemPayload.value.find(
    (item) => filedsPenjualan.value[index].value.itemUuid === item.uuid
  );
  fetchSatuanItem(selectedItem.uuid);
};

const updatedTotal = (index: number) => {
  grandTotal.value = 0;
  totalItem.value = filedsPenjualan.value.length;
  filedsPenjualan.value.forEach((item) => {
    grandTotal.value += item.value.qtyOrder * item.value.hargaSatuan;
  });
};

const updateDiskon = () => {
  grandTotal.value = Math.max(0, grandTotal.value - diskon.value);
};

const handleDelete = (index: number) => {
  grandTotal.value = 0;
  remove(index);
  totalItem.value = filedsPenjualan.value.length;
  filedsPenjualan.value.forEach((item) => {
    grandTotal.value += item.value.qtyOrder * item.value.hargaSatuan;
  });
};

onMounted(() => {
  fetchStockLocation();
  fetchSupplier();
  fetchStockType();
  fetchItemMedis();
  noPembelian.value = generateRandomNoPembelian();
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
                  :model="dataBreadCrumb"
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
            <div class="flex flex-col gap-2.5">
              <div class="flex gap-5 pt-2.5">
                <!-- No Pembelian -->
                <CustomTextfield
                  label="No Pembelian"
                  v-model="noPembelian"
                  class="w-[200px]"
                  disabled
                />
                <!-- Lokasi Penerima -->
                <CustomSelect
                  label="Lokasi Penerima"
                  placeHolder="Pilih Lokasi Penerima"
                  v-model="lokasi"
                  :options="StockLocationPayload"
                  class="w-[270px]"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.lokasi"
                  :invalidMessage="errors.lokasi"
                  :required="errors.lokasi ? true : false"
                />
                <!-- Kategori Item -->
                <CustomSelect
                  label="Kategori Item"
                  placeHolder="Pilih Kategori Item"
                  v-model="kategoriItem"
                  :options="optionKategori"
                  class="w-[200px]"
                  optionLabel="name"
                  optionValue="value"
                  :invalid="!!errors.kategoriItem"
                  :invalidMessage="errors.kategoriItem"
                  :required="errors.kategoriItem ? true : false"
                />
                <!-- Jenis Item -->
                <CustomSelect
                  label="Jenis Item"
                  placeHolder="Pilih Jenis Item"
                  v-model="jenisItem"
                  :options="optionJenis"
                  class="w-[200px]"
                  optionLabel="name"
                  optionValue="value"
                  :invalid="!!errors.jenisItem"
                  :invalidMessage="errors.jenisItem"
                  :required="errors.jenisItem ? true : false"
                />
                <!-- Jenis Stok -->
                <CustomSelect
                  label="Jenis Stok"
                  placeHolder="Pilih Jenis Stok"
                  class="grow"
                  v-model="jenisStokUuid"
                  :options="StockTypePayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.jenisStokUuid"
                  :invalidMessage="errors.jenisStokUuid"
                  :required="errors.jenisStokUuid ? true : false"
                />
              </div>
              <div class="flex gap-5">
                <!-- Supplier -->
                <CustomSelect
                  label="Supplier"
                  v-model="supplierUuid"
                  class="w-[270px]"
                  placeHolder="Pilih Supplier"
                  :options="SupplierPayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.supplierUuid"
                  :invalidMessage="errors.supplierUuid"
                  :required="errors.supplierUuid ? true : false"
                />
                <!-- Tanggal Pembelian -->
                <CustomDatePicker
                  v-model="tanggalPembelian"
                  label="Tgl. PO"
                  class="w-[150px]"
                  :invalid="!!errors.tanggalPembelian"
                  :invalidMessage="errors.tanggalPembelian"
                  :required="errors.tanggalPembelian ? true : false"
                />
                <!-- Cara Bayar -->
                <CustomSelect
                  label="Cara Bayar"
                  placeHolder="Cara Bayar"
                  v-model="metodePembelian"
                  class="w-[150px]"
                  optionLabel="name"
                  optionValue="value"
                  :options="optionPay"
                  :invalid="!!errors.metodePembelian"
                  :invalidMessage="errors.metodePembelian"
                  :required="errors.metodePembelian ? true : false"
                />
                <!-- Catatan -->
                <CustomTextfield
                  label="Catatan"
                  placeholder="Catatan"
                  class="grow"
                  v-model="catatan"
                  :invalid="!!errors.catatan"
                  :invalidMessage="errors.catatan"
                  :required="errors.catatan ? true : false"
                />
                <!-- Cito -->
                <CustomSwitch label="Cito" v-model="isCito" />
              </div>
            </div>
            <hr class="mt-5 border-1 border-grey-200" />
            <div class="mt-[20px]">
              <div class="relative overflow-y-auto" style="max-height: 200px">
                <DataTable
                  :value="filedsPenjualan"
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
                        <div class="text-sm">{{ slotProps.index + 1 }}</div>
                      </div>
                    </template>
                  </Column>

                  <!-- Nama Item -->
                  <Column header="Nama Item" headerClass="bg-adameds-50" style="width: 30%">
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.itemUuid"
                        @update:model-value="updateNameItem(slotProps.index)"
                        :showLabel="false"
                        prependIcon="PhMagnifyingGlass"
                        place-holder="Cari Item"
                        optionLabel="name"
                        optionValue="uuid"
                        :options="MedicalItemPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].itemUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].itemUuid`]"
                      />
                    </template>
                  </Column>

                  <!-- Jumlah Beli -->
                  <Column header="Jumlah Beli" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomInputNumber
                        class="w-[130px]"
                        :showLabel="false"
                        :show-buttons="true"
                        v-model="slotProps.data.value.qtyOrder"
                        :invalid="Boolean((errors as any)[`items[${slotProps.index}].qtyOrder`])"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].qtyOrder`] || ''"
                      />
                    </template>
                  </Column>

                  <!-- Harga Satuan -->
                  <Column header="Harga Satuan" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomInputNumber
                        v-model="slotProps.data.value.hargaSatuan"
                        @update:model-value="updatedTotal"
                        :showLabel="false"
                        placeholder="0"
                        class="w-[150px]"
                        :invalid="(errors as any)[`items[${slotProps.index}].hargaSatuan`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].hargaSatuan`]"
                      >
                        <template #prependText>
                          <div
                            class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r"
                          >
                            Rp.
                          </div>
                        </template>
                      </CustomInputNumber>
                    </template>
                  </Column>

                  <!-- Satuan Beli -->
                  <Column header="Satuan Beli" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.konversiUuid"
                        :showLabel="false"
                        place-holder="Pilih Satuan Beli"
                        optionLabel="satuanPembelian"
                        optionValue="uuid"
                        :options="SatuanItemPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].konversiUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].konversiUuid`]"
                      />
                    </template>
                  </Column>

                  <!-- Total -->
                  <Column header="Total" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-center">
                        <div class="text-sm">
                          {{ formatPrice( slotProps.data.value.qtyOrder * slotProps.data.value.hargaSatuan )}}
                        </div>
                      </div>
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
                          @click="handleDelete(slotProps.index)"
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
              </div>
            </div>
            <hr class="mt-[20px] border-1 border-grey-200" />
            <!-- Diskon Materai PPN -->
            <div class="flex justify-between w-full mt-[10px]">
              <div class="flex">
                <div>
                  <p class="font-bold">Diskon</p>
                  <CustomInputNumber
                    v-model="diskon"
                    @update:model-value="updateDiskon"
                    :showLabel="false"
                    placeholder="0"
                    class="mt-[10px]"
                  >
                    <template #prependText>
                      <div
                        class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r"
                      >
                        Rp.
                      </div>
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
                      <div
                        class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r"
                      >
                        Rp.
                      </div>
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
                  <p>{{ formatPrice(grandTotal) }}</p>
                </div>
              </div>
            </div>
            <hr class="mt-[20px] border-1 border-grey-200" />
            <!-- Total Item -->
            <div class="flex justify-between w-full mt-[10px]">
              <div class="flex">
                <div>
                  <p class="font-bold underline underline-offset-2">Total Item</p>
                  <p>{{ totalItem }}</p>
                </div>
                <!-- <div class="ml-[70px]">
                  <p class="font-bold underline underline-offset-2">Nama Petugas Pembelian</p>
                  <p>{{  }}</p>
                </div> -->
              </div>
              <div class="flex">
                <CustomButton
                  @click="emit('back')"
                  label="Batal"
                  outlined
                  borderColor="border-mediumGrey-300"
                  textColor="text-mediumGrey-400"
                  class="mt-auto"
                />
                <CustomButton
                  label="Simpan Pembelian"
                  class="mt-auto ml-[10px]"
                  @click="onSubmit"
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
