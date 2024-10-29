<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import LayoutDialog from "@/views/Inventory/Layout/LayoutDialog.vue";
import Card from "primevue/card";
import type { MenuItem } from "primevue/menuitem";
import { computed, onMounted, ref, type PropType } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  detailData: {
    type: Object,
  },
});

const schema = computed(() =>
  toTypedSchema(
    yup.object({
      tanggalPenerimaan: yup.date(),
      noFaktur: yup.string(),
      tanggalFaktur: yup.date(),
      noSuratJalan: yup.string(),
      catatan: yup.string(),
      diskon: yup.number(),
      materai: yup.number(),
      ppn: yup.boolean(),
      namaSupplierPengirim: yup.string(),
    })
  )
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    tanggalPenerimaan: props.detailData?.tanggalPenerimaan,
    noFaktur: props.detailData?.noFaktur,
    tanggalFaktur: props.detailData?.tanggalFaktur,
    noSuratJalan: props.detailData?.noSuratJalan,
    catatan: props.detailData?.catatan,
    diskon: 0,
    materai: 0,
    ppn: false,
    namaSupplierPengirim: "",
  },
});

const [tanggalPenerimaan] = defineField("tanggalPenerimaan");
const [noFaktur] = defineField("noFaktur");
const [tanggalFaktur] = defineField("tanggalFaktur");
const [noSuratJalan] = defineField("noSuratJalan");
const [catatan] = defineField("catatan");
const [diskon] = defineField("diskon");
const [materai] = defineField("materai");
const [ppn] = defineField("ppn");
const [namaSupplierPengirim] = defineField("namaSupplierPengirim");

// onMounted(() => {
//   console.log("Page Type:", props.pageType);
//   console.log("Detail Data:", props.detailData); // Log detailData here
// });

const emit = defineEmits(["kembali", "diterima"]);

const handleTerima = handleSubmit((values) => {
    // Update the status to DITERIMA and set the reason
    if (props.detailData) {
        props.detailData.status = "DITERIMA";
        // Pass the updated data back through the emit
        emit("diterima", { ...props.detailData, ...values });
    }
});

const satuansIsi = ref([
  { id: "1", value: "Box/100" },
  { id: "2", value: "Karton" },
  { id: "2", value: "Kardus" },
]);

const selectedPenerimaanData = ref([]);


</script>

<template>
  <!-- {{ props.detailData }} -->
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex items-center">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Penerimaan Barang',
                  home: true,
                }"
                :model="[
                  {
                    label: 'Penerimaan Pembelian',
                  },
                  {
                    noPembelian: detailData?.noPembelian,
                  },
                ]"
              >
                <template #customItem="{ item }">
                  <div class="flex">
                    <div
                      v-if="item.noPembelian"
                      class="rounded-lg bg-adameds-300 px-[10px] text-white mr-[10px]"
                    >
                      {{ item.noPembelian }}
                    </div>
                    <span
                      :class="{
                        'text-adameds-300': item.home,
                        'text-grey-400': !item.home,
                      }"
                    >
                      {{ item.label }}
                    </span>
                  </div>
                </template>
              </CustomBreadCrumb>
              <CustomChip
                :showCheckedIcon="false"
                :label="detailData?.status"
                :bgColor="
                  detailData?.status === 'DIVERIFIKASI'
                    ? 'bg-aqua-300'
                    : detailData?.status === 'DIKIRIM'
                    ? 'bg-mint-300'
                    : 'bg-grey-300'
                "
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
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
          <div class="flex flex-col gap-2.5 pt-2.5">
            <div class="flex gap-5">
              <div class="grid grid-rows-2 min-w-[400px]">
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">
                      No Pembelian
                    </div>
                    <div class="font-normal text-normal">
                      {{ detailData?.noPembelian }}
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Tgl Pembelian
                    </div>
                    <div class="font-normal text-normal">
                      {{ detailData?.tanggalPembelian }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">Supplier</div>
                    <div class="font-normal text-normal">
                      {{ detailData?.supplier }}
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Petugas Pembelian
                    </div>
                    <div class="font-normal text-normal">
                      {{ detailData?.petugasPembelian }}
                    </div>
                  </div>
                </div>
              </div>
              <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
              <div class="grid grid-rows-2 grow">
                <div>
                  <div class="font-semibold underline text-SM">
                    Tgl. Verifikasi Pembelian
                  </div>
                  <div class="font-normal text-normal">
                    {{ detailData?.tanggalVerifikasiPembelian }}
                  </div>
                </div>
                <div>
                  <div class="font-semibold underline text-SM">
                    Petugas Verifikasi Pembelian
                  </div>
                  <div class="font-normal text-normal">
                    {{ detailData?.petugasVerifikasiPembelian }}
                  </div>
                </div>
              </div>
              <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
              <div class="grid grid-rows-2 min-w-[400px]">
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">Kategori</div>
                    <div class="font-normal text-normal">
                      {{ detailData?.kategoriItem }}
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Jenis Stok
                    </div>
                    <div class="font-normal text-normal">
                      {{ detailData?.jenisStok }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline text-SM">
                      Jenis Item
                    </div>
                    <div class="font-normal text-normal">
                      {{ detailData?.jenisItem }}
                    </div>
                  </div>
                  <div>
                    <div class="font-semibold underline text-SM">
                      Cara Bayar
                    </div>
                    <div class="font-normal text-normal">
                      {{ detailData?.metodePembayaran }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="border-grey-200" />
            <div class="flex gap-5">
              <CustomDatePicker
                label="Tgl. Penerimaan"
                v-model="tanggalPenerimaan"
              />
              <CustomTextfield label="No. Faktur" v-model="noFaktur" />
              <CustomDatePicker label="Tgl. Faktur" v-model="tanggalFaktur" />
              <CustomTextfield label="No. Surat Jalan" v-model="noSuratJalan" />
              <CustomTextfield label="Catatan" class="grow" v-model="catatan" />
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
    <template #content>
      <DataTable
        :value="detailData?.datas"
        v-model:selection="selectedPenerimaanData"
        :pt="{ headerRow: 'text-SM' }"
        scrollable
        scrollHeight="160px"
        class="overflow-hidden text-xs rounded-lg bg-adameds-50"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="font-semibold text-SM">No.</div>
          </template>
          <template #body="slotProps">
            <div class="w-full text-center text-SM">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          header="Nama Item"
          headerClass="bg-adameds-50 text-SM"
          class="w-[200px]"
        >
          <template #body="slotProps">
            <div>
              <div class="text-SM">{{ slotProps.data.namaItems }}</div>
              <CustomChip
                :showCheckedIcon="false"
                :label="slotProps.data.supplierItem"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 pr-[6px] border-none mr-[5px]"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Order</div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.order }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 text-SM" class="min-w-[150px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Terima</div>
          </template>
          <template #body="slotProps">
            <CustomInputNumber
              :show-label="false"
              v-model="slotProps.data.terima"
              :show-buttons="true"
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
              :options="satuansIsi"
              optionValue="value"
              optionLabel="value"
              label=""
              place-holder="Cari & Pilih Item"
            />
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="w-[300px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">Exp Date</div>
          </template>
          <template #body="slotProps">
            <CustomDatePicker label="" v-model="slotProps.data.expDate" />
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[180px]">
          <template #header>
            <div class="w-full font-semibold text-end text-SM">
              Harga Satuan
            </div>
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
        <Column headerClass="bg-adameds-50" class="w-[100px]">
          <template #header>
            <div class="w-full font-semibold text-end text-SM">Total</div>
          </template>
          <template #body="slotProps">
            <div class="text-SM text-end">Rp. 200000</div>
          </template>
        </Column>
        <Column
          header="Action"
          body-class="text-center"
          selectionMode="multiple"
          headerStyle="width: 1rem"
          headerClass="bg-adameds-50"
          class="custom-checkbox"
        >
          <!-- <template #header>
            <div class="w-full font-semibold text-center text-SM">Action</div>
          </template> -->
        </Column>
      </DataTable>
    </template>
    <template #footer>
      <hr class="border-grey-200 mb-2.5" />
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
        <div class="flex items-center gap-6">
          <div>
            <div class="font-semibold underline text-SM">Total Item</div>
            <div class="font-normal text-normal">
              {{ detailData?.totalItem }}
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Petugas Pembelian</div>
            <div class="font-normal text-normal">
              {{ detailData?.petugasPembelian }}
            </div>
          </div>
          <CustomTextfield
            label="Nama Supplier Pengirim"
            class="w-[300px]"
            placeholder="Catatan Pengiriman"
            v-model="namaSupplierPengirim"
          />
        </div>
        <div class="flex gap-3">
          <div>
            <div class="font-semibold underline text-end text-SM">
              Penerimaan Dilakukan Oleh
            </div>
            <div class="font-normal text-normal">
              Nama Petugas - 01/01/2024 09:00
            </div>
          </div>
          <CustomButton
            label="Reset"
            textColor="text-[#9DA4B1]"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-[#9DA4B1]"
          />
          <CustomButton
            label="Terima Pembelian"
            class="my-auto bg-adameds-300"
            @click="handleTerima"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
<style>
.custom-checkbox .p-checkbox-checked .p-checkbox-box {
  @apply border-adameds-300 bg-adameds-300; /* Kelas Tailwind untuk border dan warna latar */
}

.custom-checkbox .p-checkbox-checked .p-checkbox-box .p-checkbox-icon {
  @apply text-white; /* Kelas Tailwind untuk warna tanda centang */
}
</style>
