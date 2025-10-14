<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

// Terima data dari list
const props = defineProps<{ data: any }>();

const isDeleteDialogVisible = ref(false);

// Function to show cancel dialog
const showCancelDialog = () => {
  isDeleteDialogVisible.value = true;
};

// Function to handle cancellation
const handleCancellation = (alasan: string) => {
  console.log("Permintaan dibatalkan dengan alasan:", alasan);
  // Add your cancellation logic here
  // For example: call API to cancel the request
  // Then navigate back or update the status
  emit("back");
};

const emit = defineEmits(["back"]);

// Kontainer konten untuk mendeteksi overflow
const contentRef = ref<HTMLElement | null>(null);
const isSticky = ref(false);
let resizeObserver: ResizeObserver | null = null;

const updateSticky = () => {
  const el = contentRef.value;
  if (!el) {
    isSticky.value = false;
    return;
  }
  // Sticky aktif jika konten overflow (tinggi konten > tinggi tampilan)
  isSticky.value = el.scrollHeight - el.clientHeight > 2;
};

const tableRows = ref([
  {
    no: 1,
    namaItem: "",
    minStok: 0,
    maxStok: 0,
    stokPermintaan: 0,
    satuanIsi: "",
    hargaDasar: 0,
    jumlahPermintaan: 0,
  },
]);

onMounted(() => {
  nextTick(updateSticky);
  resizeObserver = new ResizeObserver(() => updateSticky());
  if (contentRef.value) resizeObserver.observe(contentRef.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect?.();
});

// Re-evaluasi saat jumlah baris berubah
watch(tableRows, () => nextTick(updateSticky), { deep: true });

onMounted(() => {
  console.log("DetailPermintaanBarang menerima data:", props.data);
});
</script>

<template>
  <div class="flex flex-col h-full">
    <Card
      pt:body:class="flex overflow-hidden flex-col flex-1 pt-0"
      pt:content:class="flex overflow-hidden flex-col flex-1"
      class="flex overflow-hidden flex-col h-full"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Permintaan Barang',
                    home: true,
                  }"
                />
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Permintaan Unit
                  </p>
                </div>
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="px-2">
                  <CustomButton :label="props.data.permintaan" />
                </div>
              </div>
              <CustomButton
                @click="emit('back')"
                icon="PhCaretLeft"
                label="Kembali"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="py-3 space-y-3">
              <div class="flex">
                <div class="flex flex-col w-full">
                  <div class="text-sm font-bold underline">
                    Jenis Pengeluaran
                  </div>
                  <div>{{ props.data.tanggal }}</div>
                </div>
                <div class="flex gap-2 w-full">
                  <div class="flex flex-col w-full">
                    <div class="text-sm font-bold underline">
                      Tgl. permintaan
                    </div>
                    <div>{{ props.data.kategoriItem }}</div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="text-sm font-bold underline">Kategori Item</div>
                    <div>{{ props.data.jenisStok }}</div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="text-sm font-bold underline">Jenis Stok</div>
                    <div>{{ props.data.jenisItem }}</div>
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex flex-col w-full">
                  <div class="text-sm font-bold underline">Jenis Item</div>
                  <div>{{ props.data.kategoriItem }}</div>
                </div>
                <div class="flex flex-col w-full">
                  <div class="text-sm font-bold underline">
                    Tujuan Pengeluaran
                  </div>
                  <div>{{ props.data.catatan }}</div>
                </div>
                <div class="flex flex-col w-full">
                  <div class="text-sm font-bold underline">
                    Petugas Pengeluaran
                  </div>
                  <div>{{ props.data.catatan }}</div>
                </div>
                <div class="flex flex-col w-full">
                  <div class="text-sm font-bold underline">Catatan</div>
                  <div>{{ props.data.catatan }}</div>
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
        <div class="flex overflow-auto flex-col flex-1 min-h-0">
          <div class="flex-none">
            <DataTable
              :value="props.data.items"
              stripedRows
              scrollable
              class="h-full text-xs"
            >
              <Column header="No" field="no" />
              <Column header="Nama Item" field="namaItem"> </Column>
              <Column header="EXP. Date" field="expDate" />
              <Column header="Min. Stok" field="minStok" />
              <Column header="Stok" field="stokKetikaPermintaan" />
              <Column header="Pengeluaran" field="satuanIsi"> </Column>
              <Column header="Satuan/Isi" field="hargaDasar" />
              <Column header="HNA" field="jumlahPermintaan" />
              <Column header="HPP" field="jumlahPermintaan" />
              <Column header="Total" field="jumlahPermintaan" />
            </DataTable>
          </div>
        </div>
      </template>
      <template #footer>
        <div
          class="flex justify-between items-center py-2 border-t border-grey-200"
        >
          <div class="flex gap-8">
            <CustomButton icon="PhPrinter" label="Cetak"></CustomButton>
            <div>
              <div class="underline">Total Item</div>
              <div>{{ tableRows.length }}</div>
            </div>
            <div>
              <div class="underline">Grand Total</div>
              <div>Rp. 350.000</div>
            </div>
          </div>
          <div class="flex gap-3">
            <CustomButton
              label="Batal"
              backgroundColor="bg-danger-300"
              textColor="text-white"
              @click="showCancelDialog"
            />
          </div>
        </div>
      </template>
    </Card>
    <DeleteDialog
      v-model:isDialogVisible="isDeleteDialogVisible"
      @cancel="handleCancellation"
    />
  </div>
</template>

<style lang="scss" scoped></style>
