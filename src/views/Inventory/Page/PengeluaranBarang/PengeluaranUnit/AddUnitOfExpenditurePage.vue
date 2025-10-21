<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useUnitOfExpenditureStore } from "@/stores/inventory/unitOfExpenditure";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
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

const optionKategori = ref([
  { name: "Medis", value: "medis" },
  { name: "Non-Medis", value: "non-medis" },
]);

const optionJenis = ref([
  { name: "Obat", value: "obat" },
  { name: "Alkes", value: "alkes" },
]);

const optionJenisPengeluaran = ref([
  { name: "Pemakaian Unit", value: "pemakaian unit" },
  { name: "Pengeluaran Tanpa Permintaan", value: "pengeluaran tanpa permintaan" },
  { name: "Pemusnahan Barang", value: "pemusnahan barang" },
]);

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

const schema = toTypedSchema(
  yup
    .object({
      jenisPengeluaran: yup.string().required("Jenis Pengeluaran harus diisi"),
      tanggalPengeluaran: yup.date().default(new Date()).required("Tanggal Pengeluaran harus diisi"),
      kategoriItem: yup.string().required("Kategori Item harus diisi"),
      jenisStokUuid: yup.string().required("Jenis Stok harus diisi"),
      jenisItem: yup.string().required("Jenis Item harus diisi"),
      lokasiStokTujuanUuid: yup.string().required("Tujuan Pengeluaran harus diisi"),
      catatan: yup.string().required("Catatan harus diisi"),
      items: yup.array().of(
        yup.object({
          stockUuid: yup.string().required("Nama Item harus dipilih"),
          expDate: yup.string(),
          hargaSatuan: yup.number().required("Harga Satuan harus diisi"),
          konversiUuid: yup.string().required("Satuan/Isi harus diisi"),
          qty: yup.number(),
          stokAwalLokasiPengirim: yup.number().required("Harga Satuan harus diisi"),
        })
      ),
    }).noUnknown()
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    items: [
      {
        stockUuid: "",
        expDate: "",
        hargaSatuan: 0,
        konversiUuid: "",
        qty: 0,
        stokAwalLokasiPengirim: 0,
      },
    ],
  },
});

const [jenisPengeluaran] = defineField("jenisPengeluaran");
const [tanggalPengeluaran] = defineField("tanggalPengeluaran");
const [kategoriItem] = defineField("kategoriItem");
const [jenisStokUuid] = defineField("jenisStokUuid");
const [jenisItem] = defineField("jenisItem");
const [lokasiStokTujuanUuid] = defineField("lokasiStokTujuanUuid");
const [catatan] = defineField("catatan");

interface itemPengeluaran {
  stockUuid: string;
  expDate: string;
  hargaSatuan: number;
  konversiUuid: string;
  qty: number;
  stokAwalLokasiPengirim: number;
}

const { remove, push, fields: fieldPengeluaran } = useFieldArray<itemPengeluaran>("items");

const addRow = () => {
  push({
    stockUuid: "",
    expDate: "",
    hargaSatuan: 0,
    konversiUuid: "",
    qty: 0,
    stokAwalLokasiPengirim: 0,
  });
};

const onSubmit = handleSubmit(async (values: any) => {
  values.tanggalPengeluaran = dateToEpoch(values.tanggalPengeluaran);

  // try {
  //   const response = await DrugSalesStore.createApi(values);
  // } catch (error) {
  //   console.error("Failed to process the data:", error);
  // } finally {
  //   UseUtilsStore.setLoading(false);
  //   emit("back");
  // }
});

const handleDelete = (index: number) => {
  grandTotal.value = 0;
  remove(index);
  totalItem.value = fieldPengeluaran.value.length;
  fieldPengeluaran.value.forEach((item) => {
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
watch(jenisPengeluaran, (newJenisStok) => {
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
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Pengeluaran Unit</p>
                </div>
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-grey-300"/>
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Tambah Pengeluaran</p>
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
            <div class="grid grid-cols-4 gap-4 mt-[10px]">
              <!-- Jenis Pengeluaran -->
              <div>
                <CustomSelect
                  label="Jenis Pengeluaran"
                  placeHolder="Pilih Lokasi Penerima"
                  v-model="jenisPengeluaran"
                  :options="optionJenisPengeluaran"
                  optionLabel="name"
                  optionValue="value"
                  :invalid="!!errors.jenisPengeluaran"
                  :invalidMessage="errors.jenisPengeluaran"
                  :required="errors.jenisPengeluaran ? true : false"
                />
              </div>
              <!-- Tanggal Pengeluaran -->
              <div>
                <CustomDatePicker
                  v-model="tanggalPengeluaran"
                  label="Tanggal Pengeluaran"
                  :invalid="!!errors.tanggalPengeluaran"
                  :invalidMessage="errors.tanggalPengeluaran"
                  :required="errors.tanggalPengeluaran ? true : false"
                />
              </div>
              <!-- Kategori Item -->
              <div>
                <CustomSelect
                  label="Kategori Item"
                  placeHolder="Pilih Kategori Item"
                  v-model="kategoriItem"
                  :options="optionKategori"
                  optionLabel="name"
                  optionValue="value"
                  :invalid="!!errors.kategoriItem"
                  :invalidMessage="errors.kategoriItem"
                  :required="errors.kategoriItem ? true : false"
                />
              </div>
              <!-- Jenis Stok -->
              <div>
                <CustomSelect
                  label="Jenis Stok"
                  placeHolder="Pilih Jenis Stok"
                  v-model="jenisStokUuid"
                  :options="StockTypePayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.jenisStokUuid"
                  :invalidMessage="errors.jenisStokUuid"
                  :required="errors.jenisStokUuid ? true : false"
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
                  placeHolder="Pilih Tujuan Pengeluaran"
                  v-model="lokasiStokTujuanUuid"
                  :options="StockLocationPayload"
                  optionLabel="name"
                  optionValue="uuid"
                  :invalid="!!errors.lokasiStokTujuanUuid"
                  :invalidMessage="errors.lokasiStokTujuanUuid"
                  :required="errors.lokasiStokTujuanUuid ? true : false"
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
                  :value="fieldPengeluaran"
                  class="text-black"
                  stripedRows
                  scrollable
                  :scrollHeight="'flex'"
                  :pt="{ headerRow: 'text-SM' }"
                >
                  <!-- No -->
                  <Column field="No." headerClass="bg-adameds-50">
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
                        v-model="slotProps.data.value.stockUuid"
                        class="w-[250px]"
                        :showLabel="false"
                        prependIcon="PhMagnifyingGlass"
                        place-holder="Cari Item"
                        optionLabel="code"
                        optionValue="uuid"
                        :options="WithoutPaginationPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].stockUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].stockUuid`]"
                      />
                    </template>
                  </Column>
                  <!-- EXP. Date -->
                  <Column header="EXP. Date" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-sm">
                        {{ "10-10-2025" }}
                      </div>
                    </template>
                  </Column>
                  <!-- Min. Stok -->
                  <Column header="Min. Stok" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-sm">{{ 0 }}</div>
                    </template>
                  </Column>
                  <!-- Stok -->
                  <Column header="Stok" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-sm">{{ 0 }}</div>
                    </template>
                  </Column>
                  <!-- Pengeluaran -->
                  <Column header="Pengeluaran" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomInputNumber
                        v-model="slotProps.data.value.hargaSatuan"
                        :showLabel="false"
                        placeholder="0"
                        class="w-[60px]"
                        :invalid="(errors as any)[`items[${slotProps.index}].hargaSatuan`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].hargaSatuan`]"
                      >
                      </CustomInputNumber>
                    </template>
                  </Column>
                  <!-- Satuan/Isi -->
                  <Column header="Satuan/Isi" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.konversiUuid"
                        :showLabel="false"
                        class="w-[150px]"
                        place-holder="Pilih Satuan"
                        optionLabel="satuanPembelian"
                        optionValue="uuid"
                        :options="[]"
                        :invalid="(errors as any)[`items[${slotProps.index}].konversiUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].konversiUuid`]"
                      />
                    </template>
                  </Column>
                  <!-- Harga Dasar -->
                  <Column header="Harga Dasar" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-sm">
                        {{ formatPrice(slotProps.data.value.qty * slotProps.data.value.hargaSatuan) }}
                      </div>
                    </template>
                  </Column>
                  <!-- Total -->
                  <Column header="Total" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-sm">
                        {{ formatPrice(slotProps.data.value.qty * slotProps.data.value.hargaSatuan) }}
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
                    Grand Total
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
                  label="Simpan"
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
