<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { useDrugSalesStore } from "@/stores/farmasi/DrugSales";
import { useMedicalItemStore } from "@/stores/datamasterFarmasi/MedicalItem";
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

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

const schema = toTypedSchema(
  yup.object({
    lokasiStokUuid: yup.string().required("Lokasi farmasi harus diisi"),
    tanggalPembelian: yup.date().default(new Date()).required("Tanggal harus diisi"),
    dokterPemberiResep: yup.string().required("Dokter yang meresepkan harus diisi"),
    namaPembeli: yup.string().required("Nama pembeli harus diisi"),
    noHp: yup.string().required("No handphone harus diisi"),
    catatan: yup.string().required("Catatan harus diisi"),
    items: yup.array().of(
      yup.object({
        itemMedisUuid: yup.string().required("Nama Item harus dipilih"),
        jenisStokUuid: yup.string().required("Jenis Stok harus dipilih"),
        qty: yup.number().required("Pembelian harus diisi"),
        satuan: yup.string(),
        hargaSatuan: yup.number(),
        diskon: yup.number().required("Diskon harus diisi"),
      })
    ),
  }).noUnknown()
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    items: [
      {
        itemMedisUuid: "",
        jenisStokUuid: "",
        qty: 0,
        satuan: "",
        hargaSatuan: 0,
        diskon: 0,
      },
    ],
  },
});

const [lokasiStokUuid] = defineField("lokasiStokUuid");
const [tanggalPembelian] = defineField("tanggalPembelian");
const [dokterPemberiResep] = defineField("dokterPemberiResep");
const [namaPembeli] = defineField("namaPembeli");
const [noHp] = defineField("noHp");
const [catatan] = defineField("catatan");

interface penjualanObat {
  itemMedisUuid: string;
  jenisStokUuid: string;
  qty: number;
  satuan: string;
  hargaSatuan: number;
  diskon: number;
}

const { remove, push, fields: filedsPenjualan } = useFieldArray<penjualanObat>("items");

const addRow = () => {
  push({
    itemMedisUuid: "",
    jenisStokUuid: "",
    qty: 0,
    satuan: "",
    hargaSatuan: 0,
    diskon: 0,
  });
};

const onSubmit = handleSubmit(async (values: any) => {  
  values.noTransaksi = DrugSalesCodePayload.value.code
  values.tanggalPembelian = dateToEpoch(values.tanggalPembelian)
  
  try {
    const response = await DrugSalesStore.createApi(values);
  } catch (error) {
    console.error("Failed to process the data:", error);
  } finally {
    UseUtilsStore.setLoading(false);
    emit("back");
  }
});

const updateJenisStok = (index: number) => {
  const newHarga = AvailableJenisStokPayload.value.find(
    (item) => filedsPenjualan.value[index].value.jenisStokUuid == item.detailStok.uuid 
  );  
  filedsPenjualan.value[index].value.hargaSatuan = newHarga.harga;
};

const updateNameItem = (index: number) => {
  const newSatuan = WithoutPaginationPayload.value.find(
    (item) => filedsPenjualan.value[index].value.itemMedisUuid == item.uuid 
  );  
  filedsPenjualan.value[index].value.satuan = newSatuan.satuanPenggunaan.name;
};

const updateQty = (index: number) => {
  grandTotal.value = 0
  totalItem.value = 0
  filedsPenjualan.value.forEach(item => {
    grandTotal.value += item.value.qty * item.value.hargaSatuan
  })
  totalItem.value = filedsPenjualan.value.length  
};

const updateDiskon = (index: number) => {
  grandTotal.value = 0
  filedsPenjualan.value.forEach(item => {
    grandTotal.value += item.value.qty * item.value.hargaSatuan - item.value.diskon
  })
};

const handleDelete = (index: number) => {
  grandTotal.value = 0
  remove(index);
  totalItem.value = filedsPenjualan.value.length
  filedsPenjualan.value.forEach(item => {
    grandTotal.value = item.value.qty * item.value.hargaSatuan - item.value.diskon    
  })
};

// State Management
const grandTotal = ref(0);
const totalItem = ref(0)
const StockLocationStore = useStockLocationStore();
const StockLocationPayload = ref<any[]>([]);
const UseUtilsStore = utilsStore();

// Fetch Stock Location
const fetchStockLocation = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await StockLocationStore.getApi();

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

// Watcher
watch(lokasiStokUuid, (newJenisStok) => {
  if (newJenisStok) {
    fetchAvailableJenisStok(newJenisStok);
  }
});

onMounted(() => {
  fetchWithoutPagination();
  fetchStockLocation();
  fetchCode();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 pb-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden overflow-y-auto"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
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
                  v-model="DrugSalesCodePayload.code"
                  label="No. Transaksi"
                  placeholder="OTC1234"
                  class="mr-[20px]"
                />
              </div>
              <div>
                <CustomDatePicker
                  v-model="tanggalPembelian"
                  label="Tanggal"
                  class="mr-[20px]"
                  :invalid="!!errors.tanggalPembelian"
                  :invalidMessage="errors.tanggalPembelian"
                  :required="errors.tanggalPembelian ? true : false"
                />
              </div>
              <div>
                <CustomSelect
                  v-model="lokasiStokUuid"
                  label="Lokasi Farmasi"
                  place-holder="Pilih Lokasi Farmasi"
                  class="mr-[20px]"
                  optionLabel="name"
                  optionValue="uuid"
                  :options="StockLocationPayload"
                  :invalid="!!errors.lokasiStokUuid"
                  :invalidMessage="errors.lokasiStokUuid"
                  :required="errors.lokasiStokUuid ? true : false"
                />
              </div>
              <div>
                <CustomTextfield
                  v-model="dokterPemberiResep"
                  label="Dokter Yang Meresepkan"
                  placeholder="Dokter Yang Meresepkan"
                  :invalid="!!errors.dokterPemberiResep"
                  :invalidMessage="errors.dokterPemberiResep"
                  :required="errors.dokterPemberiResep ? true : false"
                />
              </div>
            </div>
            <div class="grid grid-cols-[40%_20%_40%] mt-[10px]">
              <div>
                <CustomTextfield
                  v-model="namaPembeli"
                  label="Nama Pembeli"
                  placeholder="Nama Pembeli"
                  class="mr-[20px]"
                  :invalid="!!errors.namaPembeli"
                  :invalidMessage="errors.namaPembeli"
                  :required="errors.namaPembeli ? true : false"
                />
              </div>
              <div>
                <CustomTextfield
                  v-model="noHp"
                  label="No. Handphone"
                  placeholder="08XX-XXXX-XXXX"
                  class="mr-[20px]"
                  :invalid="!!errors.noHp"
                  :invalidMessage="errors.noHp"
                  :required="errors.noHp ? true : false"
                />
              </div>
              <div>
                <CustomTextfield
                  v-model="catatan"
                  label="Catatan"
                  placeholder="Catatan"
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
                  <Column header="Nama Item" headerClass="bg-adameds-50" style="width: 20%">
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.itemMedisUuid"
                        @update:model-value="updateNameItem(slotProps.index)"
                        :showLabel="false"
                        prependIcon="PhMagnifyingGlass"
                        place-holder="Cari Item"
                        optionLabel="code"
                        optionValue="uuid"
                        :options="WithoutPaginationPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].itemMedisUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].itemMedisUuid`]"
                      />
                    </template>
                  </Column>

                  <!-- Jenis Stok -->
                  <Column header="Jenis Stok" headerClass="bg-adameds-50" style="width: 15%">
                    <template #body="slotProps">
                      <CustomSelect
                        v-model="slotProps.data.value.jenisStokUuid"
                        @update:model-value="updateJenisStok(slotProps.index)"
                        :showLabel="false"
                        place-holder="Jenis"
                        optionLabel="detailStok.name"
                        optionValue="uuid"
                        :options="AvailableJenisStokPayload"
                        :invalid="(errors as any)[`items[${slotProps.index}].jenisStokUuid`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].jenisStokUuid`]"
                      />
                    </template>
                  </Column>

                  <!-- Pembelian -->
                  <Column header="Pembelian" headerClass="bg-adameds-50" style="width: 5%">
                    <template #body="slotProps">
                      <CustomInputNumber
                        :showLabel="false"
                        v-model="slotProps.data.value.qty"
                        @update:model-value="updateQty"
                        :invalid="Boolean((errors as any)[`items[${slotProps.index}].qty`])"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].qty`] || ''"
                      />
                    </template>
                  </Column>

                  <!-- Satuan -->
                  <Column header="Satuan" headerClass="bg-adameds-50" style="width: 5%">
                    <template #body="slotProps">
                      <div class="text-center">
                        <div class="text-sm">{{ slotProps.data.value.satuan }}</div>
                      </div>
                    </template>
                  </Column>

                  <!-- Harga Satuan -->
                  <Column header="Harga Satuan" headerClass="bg-adameds-50" style="width: 10%">
                    <template #body="slotProps">
                      <div class="text-center">
                        <div class="text-sm">
                          {{ formatPrice(slotProps.data.value.hargaSatuan) }}
                        </div>
                      </div>
                    </template>
                  </Column>

                  <!-- Jumlah -->
                  <Column header="Jumlah" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-center">
                        <div class="text-sm">{{ formatPrice(slotProps.data.value.qty * slotProps.data.value.hargaSatuan) }}</div>
                      </div>
                    </template>
                  </Column>

                  <!-- Diskon -->
                  <Column header="Diskon" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <CustomInputNumber
                        v-model="slotProps.data.value.diskon"
                        @update:model-value="updateDiskon"
                        :showLabel="false"
                        placeholder="0"
                        class="w-[130px]"
                        :invalid="(errors as any)[`items[${slotProps.index}].diskon`] ? true : false"
                        :invalidMessage="(errors as any)[`items[${slotProps.index}].diskon`]"
                      >
                        <template #prependText>
                          <div class="font-semibold text-sm text-white rounded-l-lg bg-adameds-300 w-[50px] flex items-center justify-center border-r">
                            Rp.
                          </div>
                        </template>
                      </CustomInputNumber>
                    </template>
                  </Column>

                  <!-- Total -->
                  <Column header="Total" headerClass="bg-adameds-50">
                    <template #body="slotProps">
                      <div class="text-center">
                        <div class="text-sm">{{ formatPrice(slotProps.data.value.qty * slotProps.data.value.hargaSatuan - slotProps.data.value.diskon) }}</div>
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
            <hr class="mt-[35px] border-1 border-grey-200" />
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
                  <p>{{ formatPrice(grandTotal) }}</p>
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
                <CustomButton label="Simpan" class="mt-auto ml-[10px]" @click="onSubmit" />
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
