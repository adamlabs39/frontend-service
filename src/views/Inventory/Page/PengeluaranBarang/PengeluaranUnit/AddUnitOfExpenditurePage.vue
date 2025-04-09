<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { useDrugSalesStore } from "@/stores/farmasi/DrugSales";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
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
      noPembelian: yup.string(),
      lokasi: yup.string().required("Lokasi Penerima harus diisi"),
      kategori: yup.string().required("Kategori Item harus diisi"),
      jenisItem: yup.string().required("Jenis Item harus diisi"),
      jenisStok: yup.string().required("Jenis Stok harus diisi"),
      supplier: yup.string().required("Supplier harus diisi"),
      tanggalPembelian: yup
        .date()
        .default(new Date())
        .required("Tanggal Pembelian harus diisi"),
      cara: yup.string().required("Cara Bayar harus diisi"),
      catatan: yup.string().required("Catatan harus diisi"),
      cito: yup.bool(),
      items: yup.array().of(
        yup.object({
          itemMedis: yup.string().required("Nama Item harus dipilih"),
          qty: yup.number().required("Jumlah Beli harus diisi"),
          hargaSatuan: yup.number().required("Harga Satuan harus diisi"),
          satuan: yup.string().required("Satuan Beli harus diisi"),
        })
      ),
    })
    .noUnknown()
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    items: [
      {
        itemMedis: "",
        qty: 0,
        hargaSatuan: 0,
        satuan: "",
      },
    ],
  },
});

const [noPembelian] = defineField("noPembelian");
const [lokasi] = defineField("lokasi");
const [kategori] = defineField("kategori");
const [jenisItem] = defineField("jenisItem");
const [jenisStok] = defineField("jenisStok");
const [supplier] = defineField("supplier");
const [tanggalPembelian] = defineField("tanggalPembelian");
const [cara] = defineField("cara");
const [catatan] = defineField("catatan");
const [cito] = defineField("cito");

interface penjualanObat {
  itemMedis: string;
  qty: number;
  hargaSatuan: number;
  satuan: string;
}

const {
  remove,
  push,
  fields: filedsPenjualan,
} = useFieldArray<penjualanObat>("items");

const addRow = () => {
  push({
    itemMedis: "",
    qty: 0,
    hargaSatuan: 0,
    satuan: "",
  });
};

const onSubmit = handleSubmit(async (values: any) => {
  values.noTransaksi = DrugSalesCodePayload.value.code;
  values.tanggalPembelian = dateToEpoch(values.tanggalPembelian);

  try {
    const response = await DrugSalesStore.createApi(values);
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    UseUtilsStore.setLoading(false);
    emit("back");
  }
});

const updateNameItem = (index: number) => {
  const newSatuan = WithoutPaginationPayload.value.find(
    (item) => filedsPenjualan.value[index].value.itemMedis == item.uuid
  );
  filedsPenjualan.value[index].value.satuan = newSatuan.satuanPenggunaan.name;
};

const updateQty = (index: number) => {
  grandTotal.value = 0;
  totalItem.value = 0;
  filedsPenjualan.value.forEach((item) => {
    grandTotal.value += item.value.qty * item.value.hargaSatuan;
  });
  totalItem.value = filedsPenjualan.value.length;
};

const updateDiskon = (index: number) => {
  grandTotal.value = 0;
  filedsPenjualan.value.forEach((item) => {
    grandTotal.value += item.value.qty * item.value.hargaSatuan;
  });
};

const handleDelete = (index: number) => {
  grandTotal.value = 0;
  remove(index);
  totalItem.value = filedsPenjualan.value.length;
  filedsPenjualan.value.forEach((item) => {
    grandTotal.value = item.value.qty * item.value.hargaSatuan;
  });
};

// State Management
const grandTotal = ref(0);
const totalItem = ref(0);
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
const DrugSalesStore = useDrugSalesStore();
const DrugSalesCodePayload = ref<any>({});

// Fetch Code Transaksi
const fetchCode = async () => {
  try {
    const response = await DrugSalesStore.getCode();

    if (response && response.payload) {
      DrugSalesCodePayload.value = response.payload;
    } else {
      DrugSalesCodePayload.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    DrugSalesCodePayload.value = {};
  }
};

// State Management
const MedicalItemStore = useMedicalItemStore();
const WithoutPaginationPayload = ref<any[]>([]);
const AvailableJenisStokPayload = ref<any[]>([]);

// Fetch Without Pagination
const fetchWithoutPagination = async () => {
  try {
    const response = await MedicalItemStore.getWithoutPaginationApi2();

    if (response && response.payload) {
      WithoutPaginationPayload.value = response.payload;
    } else {
      WithoutPaginationPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    WithoutPaginationPayload.value = [];
  }
};

// Fetch Available Jenis Stok
const fetchAvailableJenisStok = async (uuid: string) => {
  try {
    const response = await MedicalItemStore.getAvailableJenisStokApi(uuid);

    if (response && response.payload) {
      AvailableJenisStokPayload.value = response.payload;
    } else {
      AvailableJenisStokPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    AvailableJenisStokPayload.value = [];
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

// Watcher
watch(lokasi, (newJenisStok) => {
  if (newJenisStok) {
    fetchAvailableJenisStok(newJenisStok);
  }
});

onMounted(() => {
  fetchStockLocation();
  fetchSupplier();
  fetchStockType();
  fetchWithoutPagination();
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
                    label: 'Pengeluaran Barang',
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
            <div class="grid grid-cols-4 gap-4 mt-[10px]">
              <!-- Jenis Pengeluaran -->
              <div>
                <CustomSelect
                  label="Jenis Pengeluaran"
                  placeHolder="Pilih Lokasi Penerima"
                  v-model="lokasi"
                  :options="StockLocationPayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.lokasi"
                  :invalidMessage="errors.lokasi"
                  :required="errors.lokasi ? true : false"
                />
              </div>
              <!-- Tanggal Pengeluaran -->
              <div>
                <CustomDatePicker
                  v-model="tanggalPembelian"
                  label="Tanggal Pengeluaran"
                  :invalid="!!errors.tanggalPembelian"
                  :invalidMessage="errors.tanggalPembelian"
                  :required="errors.tanggalPembelian ? true : false"
                />
              </div>
              <!-- Kategori Item -->
              <div>
                <CustomSelect
                  label="Kategori Item"
                  placeHolder="Pilih Kategori Item"
                  v-model="kategori"
                  :options="optionKategori"
                  optionLabel="name"
                  optionValue="value"
                  :invalid="!!errors.kategori"
                  :invalidMessage="errors.kategori"
                  :required="errors.kategori ? true : false"
                />
              </div>
              <!-- Jenis Stok -->
              <div>
                <CustomSelect
                  label="Jenis Stok"
                  placeHolder="Pilih Jenis Stok"
                  v-model="jenisStok"
                  :options="StockTypePayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.jenisStok"
                  :invalidMessage="errors.jenisStok"
                  :required="errors.jenisStok ? true : false"
                />
              </div>
              <!-- Jenis Item -->
              <div>
                <CustomSelect
                  label="Jenis Item"
                  placeHolder="Pilih Jenis Item"
                  v-model="jenisItem"
                  :options="optionJenis"
                  optionLabel="name"
                  optionValue="value"
                  :invalid="!!errors.jenisItem"
                  :invalidMessage="errors.jenisItem"
                  :required="errors.jenisItem ? true : false"
                />
              </div>
               <!-- Tujuan Pengeluaran -->
               <div>
                <CustomSelect
                  label="Tujuan Pengeluaran"
                  placeHolder="Pilih Lokasi Penerima"
                  v-model="lokasi"
                  :options="StockLocationPayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.lokasi"
                  :invalidMessage="errors.lokasi"
                  :required="errors.lokasi ? true : false"
                />
              </div>
              <!-- Catatan -->
              <div>
                <CustomTextfield
                  label="Catatan"
                  placeholder="Catatan"
                  v-model="catatan"
                  :invalid="!!errors.catatan"
                  :invalidMessage="errors.catatan"
                  :required="errors.catatan ? true : false"
                />
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
                  <Column
                    header="Nama Item"
                    headerClass="bg-adameds-50"
                    style="width: 30%"
                  >
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.itemMedis"
                        @update:model-value="updateNameItem(slotProps.index)"
                        :showLabel="false"
                        prependIcon="PhMagnifyingGlass"
                        place-holder="Cari Item"
                        optionLabel="code"
                        optionValue="uuid"
                        :options="WithoutPaginationPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].itemMedis`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].itemMedis`]"
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
                        v-model="slotProps.data.value.qty"
                        @update:model-value="updateQty"
                        :invalid="Boolean((errors as any)[`items[${slotProps.index}].qty`])"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].qty`] || ''"
                      />
                    </template>
                  </Column>

                  <!-- Harga Satuan -->
                  <Column header="Harga Satuan" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomInputNumber
                        v-model="slotProps.data.value.hargaSatuan"
                        @update:model-value="updateDiskon"
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
                        v-model="slotProps.data.value.satuan"
                        :showLabel="false"
                        place-holder="Pilih Satuan Beli"
                        optionLabel="name"
                        optionValue="uuid"
                        :options="StockLocationPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].satuan`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].satuan`]"
                      />
                    </template>
                  </Column>

                  <!-- Total -->
                  <Column header="Total" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-center">
                        <div class="text-sm">
                          {{
                            formatPrice(
                              slotProps.data.value.qty *
                                slotProps.data.value.hargaSatuan
                            )
                          }}
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
              <div
                class="flex items-center justify-center p-5 border border-dashed rounded-lg border-adameds-300"
              >
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
                      <div
                        class="font-semibold bg-white text-sm text-adameds-300 ml-[10px] mt-[10px] rounded-r-xl w-[20px]"
                      >
                        %
                      </div>
                    </template>
                  </CustomInputNumber>
                </div>
              </div>
              <div class="flex">
                <div
                  class="bg-adameds-300 w-[1.5px] h-[50px] mr-[20px] mt-[20px]"
                ></div>
                <div class="mt-[20px] mr-[60px]">
                  <p class="font-bold underline underline-offset-2">
                    Grand Total
                  </p>
                  <p>{{ totalItem }}</p>
                </div>
              </div>
            </div>
            <hr class="mt-[20px] border-1 border-grey-200" />
            <!-- Total Item -->
            <div class="flex justify-between w-full mt-[10px]">
              <div class="flex">
                <div>
                  <p class="font-bold underline underline-offset-2">
                    Total Item
                  </p>
                  <p>{{ totalItem }}</p>
                </div>
                <div class="ml-[70px]">
                  <p class="font-bold underline underline-offset-2">
                    Nama Petugas Pembelian
                  </p>
                  <p>{{}}</p>
                </div>
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
