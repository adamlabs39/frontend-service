<script setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const emit = defineEmits(["back"]);

const searchQuery = ref("");
const buttonSelect = ref("permintaan-barang");
const jenisItemSwitch = ref(false);

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

const addMultiple = () => {
  for (let i = 0; i < 2; i++) addRow();
};
</script>

<template>
  <div>
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
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
                <div class="flex items-end">
                  <CustomDatePicker class="w-36" label="Tgl. Permintaan" />
                  <div class="flex items-center">
                    <PhMinus :size="32" />
                    <CustomDatePicker class="w-36" :showLabel="false" />
                  </div>
                </div>
                <div class="flex gap-2 w-full">
                  <CustomSelect
                    class="w-full"
                    label="Kategori Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Kategori Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                  <CustomSelect
                    class="w-full"
                    label="Jenis Item"
                    :options="[{ label: 'Unit 1', value: '1' }]"
                  />
                </div>
              </div>
              <div class="flex gap-2">
                <CustomSelect
                  class="w-full"
                  label="Tujuan Permintaan"
                  :options="[{ label: 'Unit 1', value: '1' }]"
                />
                <CustomSelect
                  class="w-full"
                  label="Catatan"
                  :options="[{ label: 'Unit 1', value: '1' }]"
                />
                <CustomSwitch
                  v-model="jenisItemSwitch"
                  class="w-full"
                  label="Jenis Item"
                />
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
          :value="tableRows"
          stripedRows
          scrollable
          scrollHeight="flex"
          class="text-xs"
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
          <Column header="Min. Stok" field="minStok" />
          <Column header="Max. Stok" field="maxStok" />
          <Column header="Stok Ketika Permintaan" field="stokPermintaan" />
          <Column header="Satuan/Isi" field="satuanIsi">
            <template #body>
              <CustomSelect
                :showLabel="false"
                class="w-full"
                :options="[{ label: 'Unit 1', value: '1' }]"
              />
            </template>
          </Column>
          <Column header="Harga Dasar" field="hargaDasar" />
          <Column header="Jumlah Permintaan" field="jumlahPermintaan">
            <template #body>
              <CustomInputNumber :showLabel="false" class="w-full">
                <template #appendText>
                  <div class="flex items-center mr-2">Box</div>
                </template>
              </CustomInputNumber>
            </template>
          </Column>
        </DataTable>
        <div
          class="flex justify-center items-center p-5 rounded-lg border border-dashed border-adameds-300"
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
      </template>
      <template #footer>
        <div class="flex justify-end border-t border-grey-200">
          <CustomButton
            @click="emit('back')"
            icon="PhCaretLeft"
            label="Kembali"
            class="mr-[10px]"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
