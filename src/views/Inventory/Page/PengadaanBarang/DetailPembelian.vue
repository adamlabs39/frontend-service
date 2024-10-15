<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Card from "primevue/card";
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, type PropType } from "vue";
import LayoutDialog from "../../Layout/LayoutDialog.vue";

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

// onMounted(() => {
//   console.log("Page Type:", props.pageType);
//   console.log("Detail Data:", props.detailData); // Log detailData here
// });


const isDialogVisible = ref(false);
const dialogConfig = ref({
  title: "",
  labelTextField: "",
  buttonFooterLeft: "",
  buttonFooterRight: "",
  message: "",
  spanMessage: "",
});

const handleDialog = (
  title: string,
  labelTextField: string,
  buttonFooterLeft: string,
  buttonFooterRight: string,
  message: string,
  spanMessage: string
) => {
  dialogConfig.value = {
    title,
    labelTextField,
    buttonFooterLeft,
    buttonFooterRight,
    message,
    spanMessage,
  };
  console.log(dialogConfig.value);
  isDialogVisible.value = true;
};

const emit = defineEmits(["kembali", "pembatalan"]);

const handleReject = (reason:string) => {
  // Update the status to DIBATALKAN and set the reason
  if (props.detailData) {
    props.detailData.status = 'DIBATALKAN';
    props.detailData.alasan = reason;

    emit('pembatalan', props.detailData);
  }
};
</script>

<template>
  {{ props.detailData }}
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Pengadaan Barang',
                  home: true,
                }"
                :model="[
                  {
                    label: 'Pembelian Barang Supplier',
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
          <div class="grid grid-rows-2 gap-2.5 pt-2.5">
            <div class="grid grid-cols-5 gap-2.5">
              <div>
                <div class="font-semibold underline text-SM">No. Pembelian</div>
                <div class="font-normal text-normal">
                  {{ detailData?.noPembelian }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">
                  Lokasi Penerima
                </div>
                <div class="font-normal text-normal">
                  {{ detailData?.lokasiPenerima }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Kategori Item</div>
                <div class="font-normal text-normal">
                  {{ detailData?.kategoriItem }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Jenis Stok</div>
                <div class="font-normal text-normal">
                  {{ detailData?.jenisStok }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Jenis Item</div>
                <div class="font-normal text-normal">
                  {{ detailData?.jenisItem }}
                </div>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-2.5">
              <div>
                <div class="font-semibold underline text-SM">Supplier</div>
                <div class="font-normal text-normal">
                  {{ detailData?.supplier }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Tgl Pembelian</div>
                <div class="font-normal text-normal">
                  {{ detailData?.tanggalPembelian }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Cara Bayar</div>
                <div class="font-normal text-normal">
                  {{ detailData?.metodePembelian }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Cito</div>
                <div class="font-normal text-normal">
                  {{ detailData?.isCito }}
                </div>
              </div>
              <div>
                <div class="font-semibold underline text-SM">Catatan</div>
                <div class="font-normal text-normal">
                  {{ detailData?.catatan }}
                </div>
              </div>
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
      <DataTable :value="detailData?.datas">
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
          class="w-1/2"
        >
          <template #body="slotProps">
            <div class="text-SM">{{ slotProps.data.namaItems }}</div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50 text-SM" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Jumlah Beli
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.jumlahBeli }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-center text-SM">
              Satuan Beli
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-center text-SM">
              {{ slotProps.data.satuanBeli }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header>
            <div class="w-full font-semibold text-end text-SM">
              Harga Satuan
            </div>
          </template>
          <template #body="slotProps">
            <div class="text-end text-SM">
              Rp. {{ slotProps.data.hargaSatuan }}
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[140px]">
          <template #header>
            <div class="w-full font-semibold text-end text-SM">Total</div>
          </template>
          <template #body="slotProps">
            <div class="text-SM text-end">Rp. 200000</div>
          </template>
        </Column>
      </DataTable>
      <LayoutDialog
        v-model:isDialogVisible="isDialogVisible"
        :buttonFooterLeft="dialogConfig.buttonFooterLeft"
        :buttonFooterRight="dialogConfig.buttonFooterRight"
        :labelTextField="dialogConfig.labelTextField"
        :message="dialogConfig.message"
        :spanMessage="dialogConfig.spanMessage"
        :title="dialogConfig.title"
        @reject="handleReject"
      />
    </template>
    <template #footer>
      <hr class="border-grey-200 mb-2.5" />
      <div class="flex justify-between">
        <div class="flex gap-6">
          <div>
            <div class="font-semibold underline text-SM">Diskon</div>
            <div class="font-normal text-MD">
              {{ detailData?.diskon }}
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Materai</div>
            <div class="font-normal text-MD">
              {{ detailData?.materai }}
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">PPN 11%</div>
            <div class="font-normal text-MD">
              {{ detailData?.ppn }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-5 pr-16">
          <hr class="h-3/4 border-x-[1px] border-adameds-300" />
          <div>
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
              {{ detailData?.totalItem }}
            </div>
          </div>
          <div>
            <div class="font-semibold underline text-SM">Petugas Pembelian</div>
            <div class="font-normal text-normal">
              {{ detailData?.petugasPembuatPO }}
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <CustomButton
            class="my-auto bg-danger-300"
            label="Batal Pembelian"
            @click="
              handleDialog(
                'Batal Pembelian',
                'Alasan Pembatalan',
                'Tidak',
                'Iya, Batalkan',
                '*Setelah membatalkan, riwayat permintaan akan masuk ke tab menu ',
                'DIBATALKAN'
              )
            "
          />
          <CustomButton label="Ubah Pembelian" class="my-auto bg-adameds-300" />
        </div>
      </div>
    </template>
  </Card>
</template>
