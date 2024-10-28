<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, type PropType } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import DialogPermintaanMultiple from "@/views/Inventory/Page/PengadaanBarang/PembelianBarangSupplier/DialogPermintaanMultiple.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

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

const emit = defineEmits(["kembali", "onSimpanPengeluaran"]);

const dataPengeluarans = ref<any[]>([]);

const tambahPermintaanSchema = toTypedSchema(
  yup.object({
    jenisPengeluaran: yup.string(),
    startDateFilter: yup.date(),
    endDateFilter: yup.date(),
    kategoriItem: yup.string().required("Harus diisi"),
    jenisItem: yup.string().required("Harus Diisi"),
    jenisStok: yup.string().required("Harus Diisi"),
    listTujuan: yup.string(),
    catatan: yup.string(),
    petugasPengeluaran: yup.string(),
  })
);

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: tambahPermintaanSchema,
  initialValues: {
    jenisPengeluaran: "",
    startDateFilter: new Date(),
    endDateFilter: new Date(),
    kategoriItem: "",
    jenisItem: "",
    jenisStok: "",
    listTujuan: "",
    catatan: "",
    petugasPengeluaran: "Nama Petugas",
  },
});

const [jenisPengeluaran] = defineField("jenisPengeluaran");
const [startDateFilter] = defineField("startDateFilter");
const [endDateFilter] = defineField("endDateFilter");
const [kategoriItem] = defineField("kategoriItem");
const [jenisItem] = defineField("jenisItem");
const [jenisStok] = defineField("jenisStok");
const [listTujuan] = defineField("listTujuan");
const [catatan] = defineField("catatan");
const [petugasPengeluaran] = defineField("petugasPengeluaran");

const listJenisPengeluaran = ref([
  { id: 1, value: "Pengeluaran Tanpa Permintaan" },
  { id: 2, value: "Pemakaian Unit" },
  { id: 3, value: "Pemusnahan Barang" },
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

const listTujuans = ref([
  { id: 1, value: "Poli Umum" },
  { id: 2, value: "Poli Mata" },
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
  dataPengeluarans.value = [];
});

const deletePermintaan = (index: number) => {
  dataPengeluarans.value.splice(index, 1);
};

const myPushFunction = () => {
  dataPengeluarans.value.push({
    namaItems: "",
    expDate: "10-10-2025",
    minStok: 0,
    stok: 0,
    pengeluaran: 0,
    satuanBeli: "",
    HNA: 1800,
    HPP: 1500,
    total: 150000,
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
  dataPengeluarans.value.push(...newPermintaan);
  console.log(dataPengeluarans.value);
}

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...values,
    datas: JSON.parse(JSON.stringify(dataPengeluarans.value)), // Tambahkan data dari tabel
    totalItem: dataPengeluarans.value.length,
  };
  console.log("Submitted with", payload);
  emit("onSimpanPengeluaran", payload);
});

const resetFormFields = () => {
  resetForm();
  dataPengeluarans.value = [];
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
                  label: 'Pengeluaran Barang', // Selalu tampilkan 'Pengadaan Barang'
                  home: true,
                }"
                :model="[
                  {
                    label: 'Pengeluaran Unit',
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
            <div class="grid grid-cols-4 pt-2.5 gap-5">
              <CustomSelect
                label="Jenis Pengeluaran"
                v-model:modelValue="jenisPengeluaran"
                :options="listJenisPengeluaran"
                optionLabel="value"
                placeholder=""
              />
              <div>
                <div class="font-semibold text-normal">Tanggal Pengeluaran</div>
                <div class="flex items-end">
                  <CustomDatePicker v-model="startDateFilter" label="" />
                  <PhMinus class="mx-2.5 mt-auto mb-3 text-black" />
                  <CustomDatePicker
                    v-model="endDateFilter"
                    :showLabel="false"
                  />
                </div>
              </div>

              <CustomSelect
                label="Kategori Item"
                v-model:modelValue="kategoriItem"
                :options="listKategoriItems"
                optionLabel="value"
                optionValue="value"
              />
              <CustomSelect
                label="Jenis Stok"
                v-model:modelValue="jenisStok"
                :options="listJenisStoks"
                optionLabel="value"
                optionValue="value"
              />
            </div>
            <div class="grid grid-cols-3 gap-5">
              <CustomSelect
                label="Jenis Item"
                v-model:modelValue="jenisItem"
                :options="listJenisItems"
                optionLabel="value"
                optionValue="value"
              />
              <CustomSelect
                label="Tujuan Pengeluaran"
                v-model:modelValue="listTujuan"
                :options="listTujuans"
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
        :value="dataPengeluarans"
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
        <Column headerClass="bg-adameds-50 " class="w-[200px]">
          <template #header>
            <div class="font-semibold">Exp Date</div>
          </template>
          <template #body="slotProps">
            <div>{{ slotProps.data.expDate }}</div>
          </template>
        </Column>

        <Column headerClass="bg-adameds-50 " class="w-[100px]">
          <template #header>
            <div class="w-full font-semibold text-center">Min. Stok</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">{{ slotProps.data.minStok }}</div>
          </template>
        </Column>

        <Column headerClass="bg-adameds-50 " class="w-[100px]">
          <template #header>
            <div class="w-full font-semibold text-center">Stok</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">{{ slotProps.data.minStok }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 " class="w-[100px]">
          <template #header>
            <div class="w-full font-semibold text-center">Pengeluaran</div>
          </template>
          <template #body="slotProps">
            <CustomTextfield
              label=""
              v-model="slotProps.data.pengeluaran"
              type="number"
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
              :options="satuansBeli"
              optionValue="value"
              optionLabel="value"
              label=""
              place-holder="Cari & Pilih Item"
            />
          </template>
        </Column>

        <Column headerClass="bg-adameds-50 " class="w-[140px]">
          <template #header>
            <div class="w-full font-semibold text-end">HNA</div>
          </template>
          <template #body="slotProps">
            <div class="text-end">Rp. {{ slotProps.data.HNA }}</div>
          </template>
        </Column>

        <Column headerClass="bg-adameds-50 " class="w-[140px]">
          <template #header>
            <div class="w-full font-semibold text-end">HPP</div>
          </template>
          <template #body="slotProps">
            <div class="text-end">Rp. {{ slotProps.data.HPP }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 " class="w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-end">Total</div>
          </template>
          <template #body="slotProps">
            <div class="text-end">Rp. {{ slotProps.data.total }}</div>
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

        <DialogPermintaanMultiple
          v-model:isDialogVisible="dialogTambahMultiplePermintaan.isVisible"
          :title="dialogTambahMultiplePermintaan.title"
          @add-permintaan="addToArray"
        />
      </div>
    </template>
    <template #footer>
      <hr class="py-2.5 border-grey-200" />
      <div class="flex items-center justify-between">
        <div class="flex gap-6">
          <div>
            <div class="font-semibold underline text-SM">Total Item</div>
            <div class="font-normal text-normal">
              {{ dataPengeluarans.length }}
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Grand Total</div>
            <div class="font-normal text-normal">Rp. 0</div>
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
          <CustomButton label="Simpan" @click="onSubmit" />
        </div>
      </div>
    </template>
  </Card>
</template>
