<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import NoData from "@/components/section/NoData.vue";
import type { MenuItem } from "primevue/menuitem";
import { ref, type PropType } from "vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(["kembali"]);

const jenisStok = ref([
  { id: 1, name: "Umum" },
  { id: 2, name: "BPJS" },
]);

const jenisStokSelected = ref([]);
const jenisItem = ref([
  { id: 1, name: "Obat" },
  { id: 2, name: "Alkes" },
]);

const jenisItemSelected = ref([]);
</script>

<template>
  <Card pt:body:class="h-full pt-0" pt:content:class="h-full">
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder initialState="0">
        <template #header>
          <div class="flex items-center justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <CustomBreadCrumb
                :home="{
                  label: 'Stok Opname', // Selalu tampilkan 'Pengadaan Barang'
                  home: true,
                }"
                :model="[
                  ...dataBreadCrumb, // Model lainnya tetap dari dataBreadCrumb
                ]"
                class=""
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
          <div class="flex gap-7 py-2.5">
            <CustomTextfield
              label="Judul Stok Opname"
              class="w-[350px]"
              placeholder="Masukkan judul Stok Opname"
            />
            <CustomMultiSelect
              class="w-[350px]"
              label="Jenis Stok"
              :options="jenisStok"
              placeholder="Pilih Kategori Item"
              v-model:modelValue="jenisStokSelected"
              optionValue="id"
              optionLabel="name"
            />
            <CustomSelect
              label="Kategori Item"
              placeHolder="Pilih Kategori Item"
              optionValue="code"
              optionLabel="name"
              :isLoading="false"
              class="grow"
            />
            <CustomMultiSelect
              class="w-[350px]"
              label="Jenis Item"
              :options="jenisItem"
              placeholder="Pilih Jenis Item"
              v-model:modelValue="jenisItemSelected"
              optionValue="id"
              optionLabel="name"
            />
          </div>
          <hr class="border-grey-200" />
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
      <div class="flex flex-col h-full ">
        <div class="flex items-center justify-between pb-2.5">
          <div class="font-semibold text-MD text-adameds-300">
            Daftar Item Stok Opname
          </div>
          <div>
            <CustomButton label="Rekonsil Dari Master Item" class="mr-[10px]" />
            <CustomButton label="Rekonsil Dari Stok Item" />
          </div>
        </div>
        <NoData />
      </div>
    </template>
    <template #footer>
      <hr class="pt-2 border-grey-200" />
      lemofmoem
    </template>
  </Card>
</template>
