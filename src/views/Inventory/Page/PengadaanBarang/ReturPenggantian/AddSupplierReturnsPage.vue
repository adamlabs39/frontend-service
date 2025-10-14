<script lang="ts" setup>
import { onMounted, ref, watchEffect, computed } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useSupplierReturnsStore } from "@/stores/inventory/supplierReturns";
import { useStockLocationStore } from "@/stores/datamasterFarmasi/StockLocation";
import { utilsStore } from "@/stores/utils";
import { epochToDate, formatPrice, dateToEpoch } from "@/utils/Helpers";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import DialogInvoice from "./DialogInvoice.vue";
import { useToast } from "primevue/usetoast";

const emit = defineEmits(["back"]);
const props = defineProps({
  fakturPayload: {
    type: Object,
    required: true,
  },
});

// --- State Management ---
const isDialogVisible = ref(false);
const FakturPayload = ref<any>(null);
const SupplierReturnsStore = useSupplierReturnsStore();
const UseUtilsStore = utilsStore();
const StockLocationStore = useStockLocationStore(); // [BARU] Inisialisasi store
const StockLocationPayload = ref<any[]>([]);
const listAsalLokasiGudangs = ref([]);

const listAlasanReturs = ref([
  { id: 1, value: "Rusak" },
  { id: 2, value: "Kadaluarsa" },
  { id: 3, value: "Salah/Ingin diganti" },
  { id: 4, value: "Sisa Pemakaian Ruangan" },
]);

//fetch lokasi gudang dari store
const fetchStockLocations = async () => {
  try {
    const response = await StockLocationStore.getApi(1, 9999);
    StockLocationPayload.value = response?.payload || [];
  } catch (error) {
    console.error("Gagal mengambil data lokasi stok:", error);
  }
}

//  Form Validation (YUP) 
const schema = toTypedSchema(
  yup.object({
    tglRetur: yup.date().required("Tanggal Retur harus diisi"),
    alasanRetur: yup.number().nullable().required("Alasan Retur harus diisi"),
    asalLokasiGudang: yup.string().nullable().required("Asal Gudang harus diisi"),
    catatan: yup.string().nullable(),
    items: yup.array().of(
      yup.object({
        qtyRetur: yup.number()
          .min(0, "Tidak boleh negatif")
          .test(
            'max',
            'Retur tidak boleh melebihi jumlah diterima',
            function (value) {
              // 'this.parent' merujuk ke objek item saat ini
              return value! <= this.parent.qty;
            }
          )
          .required("Jumlah retur harus diisi"),
      })
    ),
  })
);
const { handleSubmit, defineField, setValues, resetForm, errors } = useForm({
  validationSchema: schema,
});

//form fields
const [tglRetur] = defineField("tglRetur");
const [alasanRetur] = defineField("alasanRetur");
const [asalLokasiGudang] = defineField("asalLokasiGudang");
const [catatan] = defineField("catatan");
const { fields: itemFields, remove } = useFieldArray<any>("items");

//  State & Kalkulasi untuk Footer 
const diskon = ref(0);
const materai = ref(0);
const ppn = ref(0);
const grandTotal = ref(0);

//kalkukasi grand total
const ppnAmount = computed(() => {
  const subTotal = (itemFields.value || []).reduce((total, item) => {
    const qty = item.value.qtyRetur || 0;
    const harga = item.value.harga || 0;
    return total + (qty * harga);
  }, 0);
  const totalSetelahDiskon = subTotal - diskon.value;
  const nilaiPpn = totalSetelahDiskon * (11 / 100);
  // Kembalikan hasilnya, pastikan tidak negatif
  return Math.max(0, nilaiPpn);
});

// Watcher untuk mengupdate grandTotal saat itemFields, diskon, materai, atau ppn berubah
watchEffect(() => {
  const subTotal = (itemFields.value || []).reduce((total, item) => {
    const qty = item.value.qtyRetur || 0;
    const harga = item.value.harga || 0;
    return total + (qty * harga);
  }, 0);
  const totalSetelahDiskon = subTotal - diskon.value;
  // Tambahkan ppnAmount HANYA JIKA switch ppn aktif (bernilai > 0)
  const ppnYangDitambahkan = ppn.value > 0 ? ppnAmount.value : 0;
  const finalTotal = totalSetelahDiskon + materai.value + ppnYangDitambahkan;
  grandTotal.value = Math.max(0, finalTotal);
});

//  Logika Fetch & Submit 
const handleFakturSelected = async (faktur: any) => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await SupplierReturnsStore.getApiAvailableDetail(faktur.uuid);
    FakturPayload.value = response?.payload || null;
    if (FakturPayload.value?.availableItems) {
      setValues({
        tglRetur: new Date(),
        alasanRetur: FakturPayload.value.alasanRetur,
        asalLokasiGudang: FakturPayload.value.lokasiStokUuid,
        catatan: FakturPayload.value.catatan,
        items: FakturPayload.value.availableItems.map((item: any) => ({ ...item, qtyRetur: 0 })),
      });

      diskon.value = FakturPayload.value.diskon || 0;
      materai.value = FakturPayload.value.materai || 0;
      ppn.value = (FakturPayload.value.ppn > 0) ? 11 : 0;
    }
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

//handle submit
const onSubmit = handleSubmit(async (values) => {
  UseUtilsStore.setLoading(true);
  try {
    const payload = {
      alasan_retur: values.alasanRetur,
      pembelian_supplier_uuid: FakturPayload.value?.uuid,
      diskon: diskon.value,
      materai: materai.value,
      ppn: ppn.value === 11,
      catatan: values.catatan,
      tanggal_retur: dateToEpoch(values.tglRetur as Date),
      items: (values.items || [])
        .filter(item => item.qtyRetur > 0)
        .map((item: any) => ({
          item_uuid: item.itemUuid,
          qty_retur: item.qtyRetur,
          konversi_uuid: item.konversiUuid,
          harga_satuan: item.hargaSatuan,
          exp_date: epochToDate(item.expDate, "date"), // Menggunakan epochToDate untuk format
        })),
    };

    if (payload.items.length === 0) {
      alert("Peringatan: Harap isi jumlah retur minimal 1 pada salah satu item.");
      UseUtilsStore.setLoading(false);
      return;
    }

    console.log("Payload yang akan dikirim:", JSON.stringify(payload, null, 2));
    await SupplierReturnsStore.postApi(payload);
    alert("Sukses: Data retur berhasil disimpan.");
    emit("back");
  } catch (error: any) {
    console.error("GAGAL MENYIMPAN RETUR:", error.response?.data || error.message || error);
    alert(`Error: ${error.response?.data?.message || 'Gagal menyimpan data retur.'}`);
  } finally {
    UseUtilsStore.setLoading(false);
  }
}, (validationErrors) => {
  console.log('VALIDASI GAGAL:', validationErrors);
  alert('Validasi Gagal: Harap periksa kembali semua isian yang wajib diisi (ditandai merah).');
});

const resetAll = () => {
  resetForm();
  FakturPayload.value = null;
  diskon.value = 0;
  materai.value = 0;
  ppn.value = 0;
  setValues({ tglRetur: new Date() });
};

onMounted(() => {
  fetchStockLocations();
  if (props.fakturPayload) {
    handleFakturSelected(props.fakturPayload);
  }
  setValues({ tglRetur: new Date() });
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0" class="h-full overflow-hidden overflow-y-auto">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb :home="{ label: 'Pengadaan Barang', home: true }"
                  :model="[{ label: 'Retur & Penggantian Barang Supplier' }, { label: 'Tambah Retur' }]" />
              </div>
              <div class="flex">
                <CustomButton @click="emit('back')" icon="PhCaretLeft" label="Kembali" class="mr-[10px]" outlined
                  borderColor="border-adameds-300" textColor="text-adameds-300" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-4 px-4">
              <div class="grid grid-cols-4 gap-5">
                <CustomDatePicker v-model="tglRetur" label="Tgl. Retur" :invalid="!!errors.tglRetur"
                  :invalid-message="errors.tglRetur" />
                <CustomSelect label="Alasan Retur" v-model="alasanRetur" :options="listAlasanReturs" optionLabel="value"
                  optionValue="id" :invalid="!!errors.alasanRetur" :invalid-message="errors.alasanRetur" />
                <CustomSelect label="Asal Lokasi Gudang" v-model="asalLokasiGudang" :options="StockLocationPayload"
                  optionLabel="name" optionValue="uuid" :invalid="!!errors.asalLokasiGudang"
                  :invalid-message="errors.asalLokasiGudang" />
                <CustomTextfield label="Catatan" placeholder="Catatan" v-model="catatan" />
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
          <template #expandIcon>
            <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" textColor="text-adameds-300" />
          </template>
        </CustomAccordion>
      </template>

      <template #content>
        <div class="p-4">
          <hr class="border-grey-200" />
          <div v-if="FakturPayload" class="flex gap-5 text-sm mb-4">
            <div class="flex flex-col flex-1 gap-4">
              <div>
                <p class="font-bold underline">No. Penerimaan</p>
                <p>{{ FakturPayload.noPenerimaan }}</p>
              </div>
              <div>
                <p class="font-bold underline">No. Faktur</p>
                <p>{{ FakturPayload.noFaktur }}</p>
              </div>
            </div>
            <div class="flex flex-col flex-1 gap-4">
              <div>
                <p class="font-bold underline">Tgl. Penerimaan</p>
                <p>{{ epochToDate(FakturPayload.tanggalPenerimaan, "date") }}</p>
              </div>
              <div>
                <p class="font-bold underline">Tgl. Faktur</p>
                <p>{{ epochToDate(FakturPayload.tanggalFaktur, "date") }}</p>
              </div>
            </div>
            <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
            <div class="flex flex-col flex-1 gap-4">
              <div>
                <p class="font-bold underline">Supplier</p>
                <p>{{ FakturPayload.supplier }}</p>
              </div>
              <div>
                <p class="font-bold underline">Jenis Item</p>
                <p class="capitalize">{{ FakturPayload.jenisItem }}</p>
              </div>
            </div>
            <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
            <div class="grid grid-cols-2 flex-1 gap-4">
              <div>
                <p class="font-bold underline">Kategori</p>
                <p class="capitalize">{{ FakturPayload.kategoriItem }}</p>
              </div>
              <div>
                <p class="font-bold underline">Jenis Stok</p>
                <p>{{ FakturPayload.jenisStok }}</p>
              </div>
              <div>
                <p class="font-bold underline">Cara Bayar</p>
                <p class="capitalize">{{ FakturPayload.metodePembelian }}</p>
              </div>
            </div>
          </div>

          <hr v-if="FakturPayload" class="mb-4 border-grey-200" />

          <div class="overflow-hidden grow">
            <DataTable v-if="FakturPayload" :value="itemFields" class="text-xs" scrollable scrollHeight="flex"
              stripedRows>
              <Column header="No." headerClass="bg-adameds-50 font-bold"><template #body="slotProps">{{
                slotProps.index + 1 }}</template>
              </Column>
              <Column field="value.name" header="Nama Item" headerClass="bg-adameds-50 font-bold"></Column>
              <Column header="Exp. Date" headerClass="bg-adameds-50 font-bold">
                <template #body="slotProps">{{ slotProps.data.value.expDate }}</template>
              </Column>
              <Column field="value.qty" header="Diterima" headerClass="bg-adameds-50 font-bold"></Column>
              <Column header="Retur" headerClass="bg-adameds-50 font-bold">
                <template #body="slotProps">
                  <CustomInputNumber class="w-[130px]" :show-buttons="true" :show-label="false"
                    v-model="slotProps.data.value.qtyRetur" :invalid="!!errors[`items[${slotProps.index}].qtyRetur`]" />
                </template>
              </Column>
              <Column field="value.konversi" header="Satuan/Isi" headerClass="bg-adameds-50 font-bold"></Column>
              <Column field="value.satuanPenggunaan" header="Satuan Penggunaan" headerClass="bg-adameds-50 font-bold">
              </Column>
              <Column header="Harga Satuan" headerClass="bg-adameds-50 font-bold text-end">
                <template #body="slotProps">{{ formatPrice(slotProps.data.value.hargaSatuan) }}</template>
              </Column>
              <Column header="Total" headerClass="bg-adameds-50 font-bold text-end">
                <template #body="slotProps">{{ formatPrice(slotProps.data.value.qtyRetur * slotProps.data.value.harga)
                }}</template>
              </Column>
              <Column header="Action" headerClass="bg-adameds-50 font-bold">
                <template #body="slotProps">
                  <div class="flex justify-center">
                    <CustomButton background-color="bg-danger-300 rounded-lg" class="h-6 w-6 p-0"
                      @click="remove(slotProps.index)">
                      <PhTrash :size="15" weight="fill" class="text-white" />
                    </custombutton>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <DialogInvoice v-model:isDialogVisible="isDialogVisible" @faktur-selected="handleFakturSelected" />
      </template>

      <template #footer>
        <div class="p-4" v-if="FakturPayload">
          <hr class="mb-4" />
          <div class="flex justify-between">
            <div class="flex gap-6">
              <CustomInputNumber v-model="diskon" label="Diskon" mode="currency" currency="IDR" locale="id-ID" />
              <CustomInputNumber v-model="materai" label="Materai" mode="currency" currency="IDR" locale="id-ID" />
              <div>
                <label class="block font-semibold mb-[11px] text-normal">PPN 11%</label>
                <div class="flex items-center">
                  <CustomSwitch v-model="ppn" :show-label="false" :binary="true" :trueValue="11" :falseValue="0"
                    sideLabel="" sideLabelTrue="" />
                  <p class="ml-3 text-sm">{{ formatPrice(ppnAmount) }}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-5">
              <hr class="h-3/4 border-x-[1px] border-adameds-300" />
              <div>
                <div class="font-bold underline">Grand Total</div>
                <div class="font-bold text-lg">{{ formatPrice(grandTotal) }}</div>
              </div>
            </div>
          </div>
          <hr class="mt-4" />
          <div class="flex items-center justify-between pt-5">
            <div class="flex gap-6">
              <div>
                <p class="font-bold underline">Total Item</p>
                <p>{{ itemFields.length }}</p>
              </div>
              <div>
                <p class="font-bold underline">Petugas Retur</p>
                <p>Nama Petugas</p>
              </div>
            </div>
            <div class="flex gap-3">
              <CustomButton label="Reset" outlined @click="resetAll" />
              <CustomButton label="Simpan & Proses Retur" @click="onSubmit" />
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
