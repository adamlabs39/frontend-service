<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRateHistoryStore } from "@/stores/inventory/rateHistory";
import { utilsStore } from "@/stores/utils";
import { epochToDate, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  selectedDataUuid: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["kembali"]);

const RateHistoryStore = useRateHistoryStore();
const UseUtilsStore = utilsStore();
const DetailPayload = ref<any>({});

const fetchDetail = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await RateHistoryStore.getApiDetail(props.selectedDataUuid);
    DetailPayload.value = response?.payload || {};
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <Card pt:body:class="h-full pt-0" class="h-full overflow-hidden overflow-y-auto">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full p-4">
            <div class="flex items-center">
              <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchDetail" />
              <CustomBreadCrumb
                :home="{ label: 'Riwayat Tarif', home: true }"
                :model="[{ label: DetailPayload.name || '...' }]"
              />
            </div>
            <CustomButton
              @click="emit('kembali')"
              icon="PhCaretLeft"
              label="Kembali"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </template>
        <template #content>
          <div class="flex flex-col gap-2.5 pt-2.5 p-4">
            <div class="flex gap-5 text-sm">
              <div class="grid grid-rows-2">
                <div class="grid grid-cols-1">
                  <div>
                    <div class="font-semibold underline">Kode Item</div>
                    <div class="font-normal">{{ DetailPayload.kodeItem || '-' }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-1 mt-4">
                  <div>
                    <div class="font-semibold underline">Pabrik</div>
                    <div class="font-normal">{{ DetailPayload.pabrik || '-' }}</div>
                  </div>
                </div>
              </div>
              <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
              <div class="grid grid-cols-2 grow gap-y-4">
                <div>
                  <div class="font-semibold underline">Kategori</div>
                  <div class="font-normal capitalize">{{ DetailPayload.kategoriItem || '-' }}</div>
                </div>
                <div>
                  <div class="font-semibold underline">Jenis Stok</div>
                  <div class="font-normal">{{ DetailPayload.jenisStok || '-' }}</div>
                </div>
                <div>
                  <div class="font-semibold underline">Jenis Item</div>
                  <div class="font-normal capitalize">{{ DetailPayload.jenisItem || '-' }}</div>
                </div>
                <div>
                  <div class="font-semibold underline">Satuan Penggunaan</div>
                  <div class="font-normal">{{ DetailPayload.satuanPenggunaan || '-' }}</div>
                </div>
              </div>
              <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
              <div class="grid grid-rows-2 min-w-[300px] gap-y-4">
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline">Harga Dasar</div>
                    <div class="font-normal">{{ formatPrice(DetailPayload.hargaDasar) }}</div>
                  </div>
                  <div>
                    <div class="font-semibold underline">HNA</div>
                    <div class="font-normal">{{ formatPrice(DetailPayload.hna) }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-2">
                  <div>
                    <div class="font-semibold underline">HPP</div>
                    <div class="font-normal">{{ formatPrice(DetailPayload.hpp) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="border-grey-200 -mx-4" />
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
      <div class="px-4 space-y-2">
        <CustomAccordion header-class="font-bold" content-class="-mt-4" initialState="0">
            <template #header>Konversi Satuan</template>
            <template #content>
                <DataTable :value="DetailPayload.konversiSatuan" class="text-xs -mx-4">
                    <Column field="jenisSatuan" header="Jenis Satuan" headerClass="bg-adameds-50"></Column>
                    <Column field="satuan" header="Satuan" headerClass="bg-adameds-50"></Column>
                    <Column field="konversiIsi" header="Konversi Isi" headerClass="bg-adameds-50"></Column>
                </DataTable>
            </template>
        </CustomAccordion>
        
        <CustomAccordion header-class="font-bold" content-class="-mt-4" initialState="0">
            <template #header>Riwayat Penerimaan Pembelian</template>
            <template #content>
                <DataTable :value="DetailPayload.riwayatPenerimaan" class="text-xs -mx-4">
                    <Column header="Tanggal" headerClass="bg-adameds-50"><template #body="slotProps">{{ epochToDate(slotProps.data.tanggal, "date") }}</template></Column>
                    <Column field="noPo" header="No. PO" headerClass="bg-adameds-50"></Column>
                    <Column header="Exp. Date" headerClass="bg-adameds-50"><template #body="slotProps">{{ epochToDate(slotProps.data.expDate, "date") }}</template></Column>
                    <Column header="Harga Dasar" headerClass="bg-adameds-50 text-end"><template #body="slotProps">{{ formatPrice(slotProps.data.hargaDasar) }}</template></Column>
                    <Column header="HNA" headerClass="bg-adameds-50 text-end"><template #body="slotProps">{{ formatPrice(slotProps.data.hna) }}</template></Column>
                    <Column header="HPP" headerClass="bg-adameds-50 text-end"><template #body="slotProps">{{ formatPrice(slotProps.data.hpp) }}</template></Column>
                </DataTable>
            </template>
        </CustomAccordion>
      </div>
    </template>
  </Card>
</template>