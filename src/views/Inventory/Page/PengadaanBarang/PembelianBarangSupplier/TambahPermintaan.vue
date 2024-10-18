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
import DialogPermintaanMultiple from "./DialogPermintaanMultiple.vue";

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
          <div class="flex flex-col gap-2.5">
            <div class="flex gap-5 pt-2.5">
              <CustomTextfield
                label="No Pembelian"
                v-model:modelValue="noPembelian"
                placeholder=""
                class="w-[200px]"
                disabled
              />
              <CustomSelect
                label="Lokasi Penerima"
                class="w-[270px]"
                v-model:modelValue="lokasiPenerima"
                :options="listLokasiPenerimas"
                optionLabel="value"
                optionValue="value"
              />
              <CustomSelect
                label="Kategori Item"
                class="w-[200px]"
                v-model:modelValue="kategoriItem"
                :options="listKategoriItems"
                optionLabel="value"
                optionValue="value"
              />
              <CustomSelect
                label="Jenis Item"
                class="w-[200px]"
                v-model:modelValue="jenisItem"
                :options="listJenisItems"
                optionLabel="value"
                optionValue="value"
              />
              <CustomSelect
                label="Jenis Stok"
                class="grow"
                v-model:modelValue="jenisStok"
                :options="listJenisStoks"
                optionLabel="value"
                optionValue="value"
              />
            </div>
            <div class="flex gap-5">
              <CustomSelect
                label="Supplier"
                class="w-[270px]"
                placeHolder="Pilih Supplier"
                v-model:modelValue="supplier"
                :options="listSuppliers"
                optionLabel="value"
                optionValue="value"
              />
              <CustomDatePicker
                v-model="tanggalPembelian"
                label="Tgl. PO"
                class="w-[150px]"
              />
              <CustomSelect
                label="Cara Bayar"
                class="w-[150px]"
                v-model:modelValue="metodePembelian"
                :options="listCaraBayars"
                optionLabel="value"
                optionValue="value"
              />
              <CustomTextfield
                label="Catatan"
                placeholder="Catatan"
                class="grow"
                v-model:modelValue="catatan"
              />
              <CustomSwitch label="Cito" v-model="isCito" />
            </div>
            <hr class="border-grey-200" />
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
    <template #content>
      <DataTable
        :pt="{ headerRow: 'text-SM' }"
        :value="dataPembelians"
        scrollable
        scrollHeight="160px"
        tableStyle="min-width: 50rem"
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
        <Column headerClass="bg-adameds-50 " class="w-[150px]">
          <template #header>
            <div class="w-full font-semibold text-center">Jumlah Beli</div>
          </template>
          <template #body="slotProps">
            <CustomInputNumber
              :show-label="false"
              v-model="slotProps.data.jumlahBeli"
              :show-buttons="true"
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

        <Column headerClass="bg-adameds-50" class="max-w-[160px]">
          <template #header>
            <div class="w-full font-semibold text-center">Satuan Beli</div>
          </template>
          <template #body="slotProps">
            <CustomSelect
              v-model="slotProps.data.satuanBeli"
              :options="satuansBeli"
              optionValue="value"
              optionLabel="value"
              label=""
              place-holder="Cari & Pilih Item"
            />
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
                @click="deletePermintaan(slotProps.index)"
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
          label="Tambah Alkes"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="myPushFunction"
        />
        <CustomButton
          icon="PhPlus"
          label="Tambah Alkes Multiple"
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          backgroundColor="bg-white"
          @click="handleAddMultiple"
        />

        <DialogPermintaanMultiple
          v-model:isDialogVisible="dialogTambahMultiplePermintaan.isVisible"
          :title="dialogTambahMultiplePermintaan.title"
          @add-permintaan="addToArray"
        />
      </div>
    </template>
    <template #footer>
      <hr class="pt-2 border-grey-200" />
      <div class="flex justify-between">
        <div class="flex gap-6">
          <CustomInputNumber v-model="diskon" class="" label="Diskon">
            <template #prependText>
              <div
                class="flex items-center justify-center px-3 overflow-hidden font-semibold leading-7 text-white border-r text-MD bg-adameds-300 rounded-l-md"
              >
                Rp.
              </div>
            </template>
          </CustomInputNumber>
          <CustomInputNumber v-model="materai" class="" label="Materai">
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
            v-model="ppn"
            sideLabel="Rp. 2,200"
            sideLabelTrue="Rp. 2,200"
          />
        </div>

        <div class="flex items-center gap-5 pr-16">
          <hr class="h-3/4 border-x-[1px] border-adameds-300" />
          <div class="">
            <div class="font-semibold underline text-SM">Grand Total</div>
            <div class="font-normal text-MD">Rp. 22,200</div>
          </div>
        </div>
      </div>
      <hr class="mt-4 border-grey-200" />
      <div class="flex items-center justify-between pt-5">
        <div class="flex gap-6">
          <div>
            <div class="font-semibold underline text-SM">Total Item</div>
            <div class="font-normal text-normal">
              {{ dataPembelians.length }}
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Petugas Pembelian</div>
            <div class="font-normal text-normal">{{ petugasPembuatPO }}</div>
          </div>
        </div>
        <div class="flex gap-3">
          <CustomButton
            label="Reset"
            textColor="text-[#9DA4B1]"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-[#9DA4B1]"
            @click="resetFormFields"
          />
          <CustomButton label="Simpan Pembelian" @click="onSubmit" />
        </div>
      </div>
    </template>
  </Card>
</template>
