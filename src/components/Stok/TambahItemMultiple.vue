<script setup lang="ts">
import { computed, ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const isDialogVisible = ref(true);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  showHeaderInfo: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:visible"]);
const visible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit("update:visible", val),
});

// Data dummy untuk CustomSelect (format sesuai gambar)
const drugOptions = ref([
  { code: "OBT001", name: "Paracetamol", sisaStok: 0 },
  { code: "OBT002", name: "Sanmol", sisaStok: 0 },
  { code: "OBT003", name: "Amoxicillin", sisaStok: 12 },
  { code: "OBT004", name: "Ibuprofen", sisaStok: 5 },
]);

// State pilihan & input
const selectedDrugCode = ref<string | null>(null);
const stokTujuan = ref<number>(3000);

// Tabel hasil pilihan
const rows = ref<
  Array<{ no: number; name: string; sisaStok: number; stokTujuan: number }>
>([]);

const addToTable = () => {
  const drug = drugOptions.value.find((d) => d.code === selectedDrugCode.value);
  if (!drug) return;
  rows.value.push({
    no: rows.value.length + 1,
    name: drug.name,
    sisaStok: drug.sisaStok,
    stokTujuan: stokTujuan.value,
  });
  // reset form kecil
  selectedDrugCode.value = null;
  stokTujuan.value = 3000;
};

const removeRow = (index: number) => {
  rows.value.splice(index, 1);
  // normalisasi nomor
  rows.value.forEach((r, i) => (r.no = i + 1));
};

const clearAllRows = () => {
  rows.value = [];
};
</script>

<template>
  <CustomDialog
    v-model:visible="visible"
    width="920px"
    headerBg="bg-adameds-300"
    headerHeight="h-[54px]"
    :noScroll="true"
    @close-dialog="emit('update:visible', false)"
  >
    <template #header>
      <div class="flex justify-between items-center w-full">
        <p class="text-lg font-semibold">Tambah Item Multiple</p>
      </div>
    </template>
    <template #body>
      <div class="py-4 space-y-5">
        <div
          v-if="showHeaderInfo"
          class="flex justify-between items-center px-4 py-2 border-b border-gray-300"
        >
          <div>
            <div class="underline">Kategori Item</div>
            <div>Medis</div>
          </div>
          <div>
            <div class="underline">Jenis Stok</div>
            <div>Umum</div>
          </div>
          <div>
            <div class="underline">jenis Item</div>
            <div>Obat</div>
          </div>
        </div>
        <div class="flex gap-4 items-end">
          <CustomSelect
            label="Cari Item"
            v-model="selectedDrugCode"
            class="flex-1"
            :options="drugOptions"
            optionLabel="name"
            optionValue="code"
            placeHolder="Pilih Obat"
          />
          <CustomButton icon="PhPlus" @click="addToTable" />
        </div>
        <DataTable :value="rows" stripedRows class="text-xs">
          <Column header="No" headerClass="bg-adameds-50" field="no" />
          <Column header="Nama Obat" headerClass="bg-adameds-50" field="name" />
          <Column
            header="Sisa Stok"
            headerClass="bg-adameds-50"
            field="sisaStok"
          />
          <Column
            header="Stok Tujuan"
            headerClass="bg-adameds-50"
            field="stokTujuan"
          />
          <Column header="Action" headerClass="bg-adameds-50">
            <template #body="slotProps">
              <CustomButton
                label=""
                backgroundColor="bg-danger-300 rounded-lg"
                class="h-6 w-[26px] p-0"
                @click="removeRow(slotProps.index)"
              >
                <img src="@/assets/icons/delete.svg" alt="delete" />
              </CustomButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between items-center">
        <div class="font-bold">Total Item Terpilih: {{ rows.length }}</div>
        <div class="flex gap-2">
          <CustomButton
            label="Hapus Semua"
            backgroundColor="bg-transparent"
            borderColor="border-danger-300"
            textColor="text-danger-300"
            @click="clearAllRows"
          />
          <CustomButton label="Ambil Item" backgroundColor="bg-adameds-300" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>

<style lang="scss" scoped></style>
