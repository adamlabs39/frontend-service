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
import DeleteDialog from "./DeleteDialog.vue";

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
  <div class="h-full flex flex-col">
    <Card
      pt:body:class="flex-1 pt-0 overflow-hidden flex flex-col"
      pt:content:class="flex-1 overflow-hidden flex flex-col"
      class="h-full overflow-hidden flex flex-col"
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
                  <div class="font-bold text-sm underline">Tgl. Permintaan</div>
                  <div>{{ props.data.tanggal }}</div>
                </div>
                <div class="flex gap-2 w-full">
                  <div class="flex flex-col w-full">
                    <div class="font-bold text-sm underline">Kategori Item</div>
                    <div>{{ props.data.kategoriItem }}</div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="font-bold text-sm underline">Jenis Stok</div>
                    <div>{{ props.data.jenisStok }}</div>
                  </div>
                  <div class="flex flex-col w-full">
                    <div class="font-bold text-sm underline">Jenis Item</div>
                    <div>{{ props.data.jenisItem }}</div>
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex flex-col w-full">
                  <div class="font-bold text-sm underline">
                    Tujuan Permintaan
                  </div>
                  <div>{{ props.data.kategoriItem }}</div>
                </div>
                <div class="flex flex-col w-full">
                  <div class="font-bold text-sm underline">Catatan</div>
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
        <div class="flex-1 flex flex-col overflow-auto min-h-0">
          <div class="flex-none">
            <DataTable
              :value="props.data.items"
              stripedRows
              scrollable
              class="text-xs h-full"
            >
              <Column header="No" field="no" />
              <Column header="Nama Item" field="namaItem"> </Column>
              <Column header="Min. Stok" field="minStok" />
              <Column header="Max. Stok" field="maxStok" />
              <Column
                header="Stok Ketika Permintaan"
                field="stokKetikaPermintaan"
              />
              <Column header="Satuan/Isi" field="satuanIsi"> </Column>
              <Column header="Harga Dasar" field="hargaDasar" />
              <Column header="Jumlah Permintaan" field="jumlahPermintaan">
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="border-t border-grey-200 py-2 flex justify-between">
          <div class="flex gap-10">
            <div>
              <div class="underline">Total Item</div>
              <div>{{ tableRows.length }}</div>
            </div>
            <div>
              <div class="underline">Petugas Permintaan</div>
              <div>Nama Petugas</div>
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
