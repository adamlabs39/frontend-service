<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, type PropType } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import DialogPermintaanMultiple from "@/views/Inventory/Page/PengadaanBarang/PembelianBarangSupplier/DialogPermintaanMultiple.vue";
import DialogCariFaktur from "./DialogCariFaktur.vue";


function generateRandomNoPembelian() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Angka acak 4 digit
  return `PO${randomNumber}`; // Gabungkan dengan "PO"
}
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

// onMounted(() => {
//   console.log(props.pageType);
// });


const emit = defineEmits(["kembali", "onSimpanPembelian"]);

const dataPembelians = ref<any[]>([]);

const tambahPermintaanSchema = toTypedSchema(
  yup.object({
    noPembelian: yup.string(),
    lokasiPenerima: yup.string(),
    kategoriItem: yup.string().required("Harus diisi"),
    jenisItem: yup.string().required("Harus Diisi"),
    jenisStok: yup.string().required("Harus Diisi"),
    supplier: yup.string().required("Harus Diisi"),
    tanggalPembelian: yup
      .date()
      .default(() => new Date())
      .required("Harus Diisi"),
    metodePembelian: yup.string().required("Harus Diisi"),
    catatan: yup.string(),
    diskon: yup.number(),
    materai: yup.number(),
    ppn: yup.bool().default(false),
    isCito: yup.bool().default(false),
    status: yup.string(),
    petugasPembuatPO:yup.string()
  })
);

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: tambahPermintaanSchema,
  initialValues: {
    noPembelian: generateRandomNoPembelian(),
    lokasiPenerima: "",
    kategoriItem: "",
    jenisItem: "",
    jenisStok: "",
    supplier: "",
    tanggalPembelian: undefined,
    metodePembelian: "",
    catatan: "",
    diskon: 0,
    materai: 0,
    status: "PENGAJUAN",
  petugasPembuatPO: "Nama Petugas"
  },
});

const [noPembelian] = defineField("noPembelian");
const [lokasiPenerima] = defineField("lokasiPenerima");
const [kategoriItem] = defineField("kategoriItem");
const [jenisItem] = defineField("jenisItem");
const [jenisStok] = defineField("jenisStok");
const [supplier] = defineField("supplier");
const [tanggalPembelian] = defineField("tanggalPembelian");
const [metodePembelian] = defineField("metodePembelian");
const [catatan] = defineField("catatan");
const [diskon] = defineField("diskon");
const [materai] = defineField("materai");
const [ppn] = defineField("ppn");
const [isCito] = defineField("isCito");
const [status] = defineField("status");
const [petugasPembuatPO] = defineField("petugasPembuatPO");

const listLokasiPenerimas = ref([
  { id: 1, value: "Gudang Farmasi" },
  { id: 2, value: "Gudang Rawat Jalan" },
]);

const listKategoriItems = ref([
  { id: 1, value: "Medis" },
  { id: 2, value: "Non Medis" },
]);

const listJenisItems = ref([
  { id: 1, value: "Obat" },
  { id: 2, value: "Alkes" },
]);
const listJenisStoks = ref([
  { id: 1, value: "Umum" },
  { id: 2, value: "Khusus" },
]);

const listSuppliers = ref([
  { id: 1, value: "PT. Sanbe" },
  { id: 2, value: "PT. Kimia Farma" },
]);

const listCaraBayars = ref([
  { id: 1, value: "Tunai" },
  { id: 2, value: "Kredit" },
]);
const namaItems = ref([
  { id: "1", value: "Paracetamol" },
  { id: "2", value: "Panadol" },
  { id: "2", value: "Bodrex" },
]);
const satuansBeli = ref([
  { id: "1", value: "Box/100" },
  { id: "2", value: "Karton" },
  { id: "2", value: "Kardus" },
]);

onMounted(() => {
  dataPembelians.value = [];
});

const deletePermintaan = (index: number) => {
  dataPembelians.value.splice(index, 1);
};

const myPushFunction = () => {
  dataPembelians.value.push({
    namaItems: "",
    jumlahBeli: 0,
    hargaSatuan: 0,
    satuanBeli: "",
    jumlahPermintaan: 0,
  });
};

const dialogTambahMultiplePermintaan = ref({
  isVisible: false,
  title: "Tambah Item Multiple",
});

function handleAddMultiple() {
  dialogTambahMultiplePermintaan.value.isVisible = true;
}

function addToArray(newPermintaan: any) {
  dataPembelians.value.push(...newPermintaan);
  console.log(dataPembelians.value);
}

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...values,
    datas: JSON.parse(JSON.stringify(dataPembelians.value)), // Tambahkan data dari tabel
    totalItem: dataPembelians.value.length,
  };
    console.log("Submitted with", payload);
  emit('onSimpanPembelian', payload)
});

const resetFormFields = () => {
  resetForm();
  dataPembelians.value = [];
};

const isDialogVisible = ref(false);

const dialogCariFakturConfig = () => {
    isDialogVisible.value = true
}
</script>

<template>
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Pengadaan Barang', // Selalu tampilkan 'Pengadaan Barang'
                  home: true,
                }"
                :model="[
                  {
                    label: 'Pembelian Barang Supplier',
                  },
                  ...dataBreadCrumb, // Model lainnya tetap dari dataBreadCrumb
                ]"
                class=""
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
            <div class="flex gap-5 pt-2.5">
                <CustomDatePicker
                v-model="tanggalPembelian"
                label="Tgl. Retur"
                class="w-[150px]"
              />
              <CustomSelect
                label="Alasan Retur"
                class="w-[200px]"
                v-model:modelValue="lokasiPenerima"
                :options="listLokasiPenerimas"
                optionLabel="value"
                optionValue="value"
              />
              <CustomSelect
                label="Asal Lokasi Gudang"
                class="w-[300px]"
                v-model:modelValue="kategoriItem"
                :options="listKategoriItems"
                optionLabel="value"
                optionValue="value"
              />
              <CustomTextfield
                label="Catatan"
                placeholder="Catatan"
                class="grow"
                v-model:modelValue="catatan"
              />
            </div>
            <hr class="mt-2 border-grey-200" />
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
      <div
        class="flex items-center justify-center m-5 p-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
      >
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari & Pilih Faktur"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="dialogCariFakturConfig"
        />
      </div>
      <DialogCariFaktur v-model:isDialogVisible="isDialogVisible"/>
    </template>
    <template #footer>
      <hr class="pt-2 border-grey-200" />
      
    </template>
  </Card>
</template>
