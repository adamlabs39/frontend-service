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
  <div class="flex flex-col h-full overflow-hidden">
    <Card pt:body:class="h-full pt-0" class="h-full overflow-hidden overflow-y-auto">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <CustomButton icon="PhArrowClockwise" class="mr-5" @click="fetchDetail"/>
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
            <div class="flex gap-5 text-sm pt-4">
                <div class="flex flex-col flex-1 gap-4">
                    <div><p class="font-bold underline">Kode Item</p><p>{{ DetailPayload.kodeItem || '-' }}</p></div>
                    <div><p class="font-bold underline">Pabrik</p><p>{{ DetailPayload.pabrik || 'Nama Pabrik' }}</p></div>
                </div>
                <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
                <div class="grid grid-cols-2 flex-[2] gap-4">
                    <div><p class="font-bold underline">Kategori</p><p class="capitalize">{{ DetailPayload.kategoriItem || '-' }}</p></div>
                    <div><p class="font-bold underline">Jenis Stok</p><p>{{ DetailPayload.jenisStok || '-' }}</p></div>
                    <div><p class="font-bold underline">Jenis Item</p><p class="capitalize">{{ DetailPayload.jenisItem || '-' }}</p></div>
                    <div><p class="font-bold underline">Satuan Penggunaan</p><p>{{ DetailPayload.satuanPenggunaan || '-' }}</p></div>
                </div>
                <hr class="h-auto border-[0.5px] w-px border-adameds-300" />
                <div class="grid grid-cols-2 flex-1 gap-4">
                    <div><p class="font-bold underline">Harga Dasar</p><p>{{ formatPrice(DetailPayload.hargaDasar) }}</p></div>
                    <div><p class="font-bold underline">HNA</p><p>{{ formatPrice(DetailPayload.hna) }}</p></div>
                    <div><p class="font-bold underline">HPP</p><p>{{ formatPrice(DetailPayload.hpp) }}</p></div>
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
        <div class="px-4 space-y-4">
            <CustomAccordion header-class="bg-white" content-class="bg-white -mt-4" initialState="0">
                <template #header>Konversi Satuan</template>
                <template #content>
                    <DataTable :value="DetailPayload.konversiSatuan">
                        <Column field="jenisSatuan" header="Jenis Satuan" headerClass="bg-adameds-50"></Column>
                        <Column field="satuan" header="Satuan" headerClass="bg-adameds-50"></Column>
                        <Column field="konversiIsi" header="Konversi Isi" headerClass="bg-adameds-50"></Column>
                    </DataTable>
                </template>
            </CustomAccordion>
            
            <CustomAccordion header-class="bg-white" content-class="bg-white -mt-4" initialState="0">
                <template #header>Riwayat Penerimaan Pembelian</template>
                <template #content>
                    <DataTable :value="DetailPayload.riwayatPenerimaan">
                        <Column header="Tanggal" headerClass="bg-adameds-50"><template #body="slotProps">{{ epochToDate(slotProps.data.tanggal, "date") }}</template></Column>
                        <Column field="noPo" header="No. PO" headerClass="bg-adameds-50"></Column>
                        <Column header="Exp. Date" headerClass="bg-adameds-50"><template #body="slotProps">{{ epochToDate(slotProps.data.expDate, "date") }}</template></Column>
                        <Column header="Harga Dasar" headerClass="bg-adameds-50"><template #body="slotProps">{{ formatPrice(slotProps.data.hargaDasar) }}</template></Column>
                        <Column header="HNA" headerClass="bg-adameds-50"><template #body="slotProps">{{ formatPrice(slotProps.data.hna) }}</template></Column>
                        <Column header="HPP" headerClass="bg-adameds-50"><template #body="slotProps">{{ formatPrice(slotProps.data.hpp) }}</template></Column>
                    </DataTable>
                </template>
            </CustomAccordion>
        </div>
      </template>
    </Card>
  </div>
</template>