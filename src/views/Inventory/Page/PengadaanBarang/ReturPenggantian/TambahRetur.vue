<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, type PropType } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import DialogCariFaktur from "./DialogCariFaktur.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

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

const isFakturDiterima = ref(false);

const emit = defineEmits(["kembali", "onSimpanRetur"]);

const dataReturs = ref();

const tambahReturSchema = toTypedSchema(
  yup.object({
    noRetur: yup.string(),
    alasanRetur: yup.string(),
    asalLokasiGudang: yup.string().required("Harus diisi"),
    tglRetur: yup
      .date()
      .default(() => new Date())
      .required("Harus Diisi"),
    catatan: yup.string(),
    diskon: yup.number(),
    materai: yup.number(),
    ppn: yup.bool().default(false),
    status: yup.string(),
    petugasRetur: yup.string(),
  })
);

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: tambahReturSchema,
  initialValues: {
    noRetur:"RTR1234",
    alasanRetur: "",
    asalLokasiGudang: "",
    tglRetur: undefined,
    catatan: "",
    diskon: 0,
    materai: 0,
    status: "DIRETUR",
    petugasRetur: "Nama Petugas",
  },
});

const [noRetur] = defineField("noRetur");
const [alasanRetur] = defineField("alasanRetur");
const [asalLokasiGudang] = defineField("asalLokasiGudang");
const [tglRetur] = defineField("tglRetur");
const [catatan] = defineField("catatan");
const [diskon] = defineField("diskon");
const [materai] = defineField("materai");
const [ppn] = defineField("ppn");
const [petugasRetur] = defineField("petugasRetur");

const listAlasanReturs = ref([
  { id: 1, value: "Rusak" },
  { id: 2, value: "Kadaluarsa" },
  { id: 3, value: "Salah/Ingin diganti" },
  { id: 4, value: "Sisa Pemakaian Ruangan" },
]);

const listAsalLokasiGudangs = ref([
  { id: 1, value: "Gudang Farmasi" },
  { id: 2, value: "Gudang Rawat Jalan" },
]);

onMounted(() => {
  dataReturs.value = {};
});


// Data dari Dialog Cari Faktur
const handleFakturData = (data: any) => {
  console.log("Data Faktur Diterima", data);
  dataReturs.value = data;
  isFakturDiterima.value = true;
  // console.log(`Data retur`, dataReturs.value);
};

const isDialogVisible = ref(false);

const dialogCariFakturConfig = () => {
  isDialogVisible.value = true;
};

const deleteRetur = (index: number) => {
  dataReturs.value.datas.splice(index, 1);
};

const resetFormFields = () => {
  resetForm();
  dataReturs.value = {};
};

// Update onSubmit to use handleSubmit
const onSubmit = handleSubmit((values) => {
  // console.log(values)
  emit("onSimpanRetur", {
    ...values,
   ...dataReturs.value,// Include data from dataReturs
  });
  
});
</script>

<template>
  <!-- {{ dataReturs }} -->
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
          <div v-if="isFakturDiterima" class="flex gap-6 py-2.5">
            <!-- Informasi Faktur -->
            <div class="grid w-1/3 grid-cols-2">
              <div>
                <div class="font-semibold underline text-SM">No Penerimaan</div>
                <div class="font-normal text-normal">
                  {{ dataReturs.noPenerimaan }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">
                  Tgl. Penerimaan
                </div>
                <div class="font-normal text-normal">
                  {{ dataReturs.tglPenerimaan }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">No. Faktur</div>
                <div class="font-normal text-normal">
                  {{ dataReturs.noFaktur }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Tgl. Faktur</div>
                <div class="font-normal text-normal">
                  {{ dataReturs.tglFaktur }}
                </div>
              </div>
            </div>
            <hr class="h-auto border-[1px] border-adameds-300" />

            <div class="grid grid-rows-2 grow">
              <div class="grid grid-cols-3">
                <div>
                  <div class="font-semibold underline text-SM">Supplier</div>
                  <div class="font-normal text-normal">
                    {{ dataReturs.supplier }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Kategori</div>
                  <div class="font-normal text-normal">
                    {{ dataReturs.kategori }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Jenis Stok</div>
                  <div class="font-normal text-normal">
                    {{ dataReturs.jenisStok }}
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-3">
                <div>
                  <div class="font-semibold underline text-SM">Jenis Item</div>
                  <div class="font-normal text-normal">
                    {{ dataReturs.jenisItem }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">Cara Bayar</div>
                  <div class="font-normal text-normal">
                    {{ dataReturs.caraBayar }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-5">
            <CustomDatePicker
              v-model="tglRetur"
              label="Tgl. Retur"
              class="w-[150px]"
            />
            <CustomSelect
              label="Alasan Retur"
              class="w-[200px]"
              v-model:modelValue="alasanRetur"
              :options="listAlasanReturs"
              optionLabel="value"
              optionValue="value"
              place-holder="Pilih Alasan Retur"
            />
            <CustomSelect
              label="Asal Lokasi Gudang"
              class="w-[300px]"
              v-model:modelValue="asalLokasiGudang"
              :options="listAsalLokasiGudangs"
              optionLabel="value"
              optionValue="value"
              place-holder="Pilih Asal Lokasi Gudang "
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
      <DataTable
        :pt="{ headerRow: 'text-SM' }"
        v-if="isFakturDiterima"
        :value="dataReturs.datas"
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
            {{ slotProps.data.namaItems }}
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 " class="w-[300px]">
          <template #header>
            <div class="w-full font-semibold text-center">Exp Date</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">{{ slotProps.data.expDate }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 " class="w-[150px]">
          <template #header>
            <div class="w-full font-semibold text-center">Diterima</div>
          </template>
          <template #body="slotProps">
            <div class="text-center">{{ slotProps.data.diterima }}</div>
          </template>
        </Column>

        <Column headerClass="bg-adameds-50 " class="min-w-[150px]">
          <template #header>
            <div class="w-full font-semibold text-center">Retur</div>
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
            <div class="text-center">{{ slotProps.data.satuanBeli }}</div>
          </template>
        </Column>

        <Column headerClass="bg-adameds-50 " class="min-w-[180px]">
          <template #header>
            <div class="w-full font-semibold text-center">
              Satuan Penggunaan
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-center">
              {{ slotProps.data.satuanPenggunaan }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 " class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-end">Harga Satuan</div>
          </template>
          <template #body="slotProps">
            <div class="text-end">Rp. {{ slotProps.data.hargaSatuan }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 " class="min-w-[100px]">
          <template #header>
            <div class="w-full font-semibold text-end">Total</div>
          </template>
          <template #body="slotProps">
            <div class="text-end">
              Rp. {{ slotProps.data.jumlahPermintaan }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[100px]">
          <template #header>
            <div class="w-full font-semibold text-center">Action</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
                @click="deleteRetur(slotProps.index)"
              >
                <img src="@/assets/icons/delete.svg" alt="" width="14px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>

      <div
        class="flex items-center justify-center m-5 p-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
        v-if="!isFakturDiterima"
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
      <DialogCariFaktur
        v-model:isDialogVisible="isDialogVisible"
        @send-to-tambah-retur="handleFakturData"
      />
    </template>
    <template #footer>
      <hr class="pt-2 border-grey-200" />
      <div v-if="isFakturDiterima">
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
                {{ dataReturs.datas.length }}
              </div>
            </div>
            <div>
              <div class="font-semibold underline text-SM">Petugas Retur</div>
              <div class="font-normal text-normal">{{ petugasRetur }}</div>
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
      </div>
    </template>
  </Card>
</template>
