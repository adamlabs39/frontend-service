<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import { onMounted, ref, type PropType } from "vue";

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

const noSupplier = ref<string>("");
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <CustomBreadCrumb
            :home="{
              label: 'Stock Adjustment',
              home: true,
            }"
          >
          </CustomBreadCrumb>
        </div>
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-4 gap-4 py-2">
        <CustomSelect label="Kategori" place-holder="Pilih Kategori" />
        <CustomSelect label="Jenis Stok" place-holder="Pilih Jenis Stok" />
        <CustomSelect label="Jenis Item" place-holder="Pilih Jenis Item" />
        <CustomSelect label="Lokasi Stok" place-holder="Pilih Lokasi Stok" />
      </div>
      <div class="flex justify-between gap-7">
        <CustomTextfield
          label="Pencarian "
          class="grow"
          placeholder="Cari Nama Item"
          prepend-icon="PhMagnifyingGlass"
        />
        <div class="flex items-end gap-2">
          <CustomButton icon="PhMagnifyingGlass" label="Cari" />
          <CustomButton
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
          />
        </div>
      </div>

      <slot name="tabs"></slot>
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
