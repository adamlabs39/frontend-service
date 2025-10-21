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

const emit = defineEmits(["back"]);

const searchQuery = ref("");
const buttonSelect = ref("permintaan-barang");
const jenisItemSwitch = ref(false);

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

const addRow = () => {
  const next = tableRows.value.length + 1;
  tableRows.value.push({
    no: next,
    namaItem: "",
    minStok: 0,
    maxStok: 0,
    stokPermintaan: 0,
    satuanIsi: "",
    hargaDasar: 0,
    jumlahPermintaan: 0,
  });
};

const resetTable = () => {
  tableRows.value = [
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
  ];
};

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

const deleteRow = (index: number) => {
  tableRows.value.splice(index, 1);
  // Re-number rows after deletion
  tableRows.value.forEach((row, idx) => {
    row.no = idx + 1;
  });
};
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
                    label: 'Pengeluaran Barang',
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
                    Retur Unit
                  </p>
                </div>
                <PhCaretRight
                  :size="25"
                  weight="bold"
                  class="ml-[10px] mt-[8px] text-adameds-300"
                />
                <div class="">
                  <p
                    class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]"
                  >
                    Tambah Retur
                  </p>
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
              <div class="flex gap-2">
                <div class="flex gap-2 w-full">
                  <CustomDatePicker
                    class="w-full"
                    label="Tanggal Retur"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Kategori Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Jenis Stok"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Jenis Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-3 items-end">
                <div class="col-span-4">
                  <CustomSelect
                    class="w-full"
                    label="Tujuan Retur"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                </div>
                <div class="col-span-4">
                  <CustomSelect
                    class="w-full"
                    label="Alasan Retur"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                </div>
                <div class="col-span-3">
                  <CustomTextfield
                    class="w-full"
                    label="Catatan"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
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
        <div
          ref="contentRef"
          class="flex overflow-auto flex-col flex-1 min-h-0"
        >
          <div class="flex-none">
            <DataTable
              :value="tableRows"
              stripedRows
              scrollable
              class="h-full text-xs"
            >
              <Column header="No" field="no" />
              <Column header="Nama Item" field="namaItem">
                <template #body>
                  <CustomSelect
                    :showLabel="false"
                    class="w-full"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                </template>
              </Column>
              <Column header="EXP. Date" field="maxStok" />
              <Column header="Stok" field="minStok" />
              <Column header="pengeluaran">
                <template #body>
                  <CustomInputNumber :showLabel="false"> </CustomInputNumber>
                </template>
              </Column>
              <Column header="Satuan/Isi" field="jumlahPermintaan"> </Column>
              <Column header="Action">
                <template #body>
                  <CustomButton
                    label=""
                    background-color="bg-danger-300 rounded-lg"
                    @click="deleteRow(index)"
                  >
                    <PhTrash :size="18" color="#ffffff" weight="fill" />
                  </CustomButton>
                </template>
              </Column>
            </DataTable>
          </div>
          <div
            :class="[
              'mt-3 flex justify-center items-center p-5 rounded-lg border border-dashed border-adameds-300 flex-shrink-0',
              isSticky ? 'sticky bottom-0 bg-white' : '',
            ]"
          >
            <CustomButton
              icon="PhPlus"
              label="Tambah Item"
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              backgroundColor="bg-white"
              @click="addRow"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between py-2 border-t border-grey-200">
          <div class="flex gap-10">
            <div>
              <div class="underline">Total Item</div>
              <div>{{ tableRows.length }}</div>
            </div>
            <div>
              <div class="underline">Grand Retur</div>
              <div>Rp. 0</div>
            </div>
            <div>
              <div class="underline">Petugas Retur</div>
              <div>Nama Petugas</div>
            </div>
          </div>
          <div class="flex gap-3">
            <CustomButton
              label="Reset"
              @click="resetTable"
              backgroundColor="bg-white"
              borderColor="border-grey-500"
              textColor="text-grey-500"
            />
            <CustomButton
              label="Simpan"
              backgroundColor="bg-adameds-300"
              textColor="text-white"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
