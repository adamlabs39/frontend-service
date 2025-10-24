<script setup lang="ts">
import { ref, onMounted, type PropType } from "vue";
import { useUnitOfExpenditureStore } from "@/stores/inventory/unitOfExpenditure";
import { utilsStore } from "@/stores/utils";
import { epochToDate, formatPrice } from "@/utils/Helpers";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
  selectedData: {
    type: Object,
    default: () => ({}),
  },
});

function formatDate(date: any) {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

// State Management
const UnitOfExpenditureStore = useUnitOfExpenditureStore();
const UseUtilsStore = utilsStore();
const DetailPayload = ref<any>({});

const emit = defineEmits(["back"]);

// Fetch Detail
const fetchDetail = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await UnitOfExpenditureStore.getApiDetail(
      props.selectedData.uuid
    );
    if (response && response.payload) {
      DetailPayload.value = response.payload;
    } else {
      DetailPayload.value = {};
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
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
    <Card pt:body:class="h-full pt-0 pb-0 overflow-auto" pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden overflow-y-auto">
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb :home="{
                  label: 'Pengeluaran Barang',
                  home: true,
                }" />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">
                    Pengeluaran Unit
                  </p>
                </div>
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-grey-300" />
                <div class="ml-[10px] mt-[5px]">
                  <CustomChip :label="props.selectedData.noPengeluaran" :showCheckedIcon="false"
                    borderColor="border-adameds-300" bgColor="bg-adameds-300" textColor="text-white" />
                </div>
                <div v-if="props.selectedData.status == 'cancel'" class="ml-[10px] mt-[5px]">
                  <CustomChip label="DIBATALKAN" :showCheckedIcon="false" borderColor="border-danger-300"
                    bgColor="bg-danger-300" textColor="text-white" />
                </div>
                <div v-if="props.selectedData.status == 'verifikasi'" class="ml-[10px] mt-[5px]">
                  <CustomChip label="DIVERIFIKASI" :showCheckedIcon="false" borderColor="border-info-300"
                    bgColor="bg-info-300" textColor="text-white" />
                </div>
              </div>
              <div class="flex">
                <CustomButton @click="emit('back')" icon="PhCaretLeft" label="Kembali" class="mr-[10px]" outlined
                  borderColor="border-adameds-300" textColor="text-adameds-300" />
              </div>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-4 gap-4 mt-[20px]">
              <!-- Jenis Pengeluaran -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Jenis Pengeluaran</p>
                <p>{{ DetailPayload.jenisPengeluaran }}</p>
              </div>
              <!-- Tgl. Permintaan -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">Tgl. Permintaan</p>
                <p>{{ epochToDate(DetailPayload.tanggalPengeluaran, "date") }}</p>
              </div>
              <!-- Kategori Item -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Kategori Item
                </p>
                <p>{{ DetailPayload.kategoriItem }}</p>
              </div>
              <!-- Jenis Stok -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Jenis Stok
                </p>
                <p>{{ DetailPayload.jenisStok }}</p>
              </div>
              <!-- Jenis Item -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Jenis Item
                </p>
                <p>{{ DetailPayload.jenisItem }}</p>
              </div>
              <!-- Tujuan Pengeluaran -->
              <div v-if="DetailPayload.jenisPengeluaran == 'pengeluaran tanpa permintaan'">
                <p class="text-xs font-bold underline underline-offset-2">
                  Tujuan Pengeluaran
                </p>
                <p>{{ DetailPayload.lokasiStokAkhir || '-' }}</p>
              </div>
              <!-- Jenis Pemusnahan -->
              <div v-if="DetailPayload.jenisPengeluaran == 'pemusnahan barang'">
                <p class="text-xs font-bold underline underline-offset-2">
                  Jenis Pemusnahan
                </p>
                <p>{{ DetailPayload.jenisPemusnahan || '-' }}</p>
              </div>
              <!-- Petugas Pengeluaran -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Petugas Pengeluaran
                </p>
                <p>{{ DetailPayload.petugasPengeluaran }}</p>
              </div>
              <!-- Catatan -->
              <div>
                <p class="text-xs font-bold underline underline-offset-2">
                  Catatan
                </p>
                <p>{{ DetailPayload.catatan || '-' }}</p>
              </div>
            </div>
            <hr class="mt-5 border-1 border-grey-200" />
            <div class="mt-[20px] h-[260px]">
              <DataTable :value="DetailPayload.items" scrollable scrollHeight="flex" :pt="{ headerRow: 'text-SM' }">
                <Column headerClass="bg-adameds-50 w-[50px]" class="w-[50px]">
                  <template #header>
                    <div class="font-semibold">No.</div>
                  </template>
                  <template #body="slotProps">
                    <div class="text-sm text-center">{{ slotProps.index + 1 }}</div>
                  </template>
                </Column>
                <Column header="Nama Item" headerClass="bg-adameds-50 font-semibold">
                  <template #body="slotProps">
                    <div class="text-sm">{{ slotProps.data.name || '-' }}</div>
                  </template>
                </Column>
                <Column header="Exp. Date" headerClass="bg-adameds-50 font-semibold w-[120px]" class="w-[120px]">
                  <template #body="slotProps">
                    <div class="text-sm ">
                      {{ formatDate(slotProps.data.expDate) }}
                    </div>
                  </template>
                </Column>
                <Column header="Min. Stok" headerClass="bg-adameds-50 font-semibold w-[100px]" class="w-[100px]">
                  <template #body="slotProps">
                    <div class="text-sm text-center">{{ slotProps.data.qty ?? '-' }}</div>
                  </template>
                </Column>
                <Column header="Stok" headerClass="bg-adameds-50 font-semibold w-[100px]" class="w-[100px]">
                  <template #body="slotProps">
                    <div class="text-sm ">{{ slotProps.data.stok ?? '-' }}</div>
                  </template>
                </Column>
                <Column header="Pengeluaran" headerClass="bg-adameds-50 font-semibold w-[100px]" class="w-[100px]">
                  <template #body="slotProps">
                    <div class="text-sm text-center">{{ slotProps.data.pengeluaran ?? '-' }}</div>
                  </template>
                </Column>
                <Column header="Satuan/Isi" headerClass="bg-adameds-50 font-semibold w-[120px]" class="w-[120px]">
                  <template #body="slotProps">
                    <div class="text-sm">{{ slotProps.data.satuan || '-' }}</div>
                  </template>
                </Column>
                <Column header="Harga Dasar" headerClass="bg-adameds-50 font-semibold w-[150px]" class="w-[150px]">
                  <template #body="slotProps">
                    <div class="text-sm ">
                      {{ formatPrice(slotProps.data.hargaSatuan || 0) }}
                    </div>
                  </template>
                </Column>
                <Column header="Total" headerClass="bg-adameds-50 font-semibold w-[150px]" class="w-[150px]">
                  <template #body="slotProps">
                    <div class="text-sm ">
                      {{ formatPrice(slotProps.data.total || 0) }}
                    </div>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
          <template #footer>
            <div class="flex">
              <div>
                <CustomButton background-color="bg-adameds-300 rounded-lg">
                  <div class="flex items-center gap-2">
                    <PhPrinter :size="18" colorc="#ffffff" weight="fill" />
                    <div class="text-sm">Cetak</div>
                  </div>
                </CustomButton>
              </div>
              <div class="ml-[30px]">
                <p class="font-bold underline underline-offset-2">
                  Total Item
                </p>
                <p>{{ DetailPayload.totalItem }}</p>
              </div>
              <div class="ml-[30px]">
                <p class="font-bold underline underline-offset-2">
                  Grand Total
                </p>
                <p>{{ DetailPayload.totalHarga }}</p>
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
    </Card>
  </div>
</template>
