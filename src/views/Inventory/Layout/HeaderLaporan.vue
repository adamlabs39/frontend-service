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
              label: 'Laporan',
              home: true,
            }"
             :model="dataBreadCrumb"
            class=""
          >
          </CustomBreadCrumb>
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex gap-4 py-2">
        <CustomTextfield label="Pencarian " class="grow" placeholder="Cari Nama Item" prepend-icon="PhMagnifyingGlass"/>
        <CustomSelect label="Lokasi" place-holder="Pilih Jenis Stok" />
        <div>
          <div class="font-semibold text-normal">Tanggal</div>
          <div class="flex items-end">
            <CustomDatePicker label="" class="w-[140px]" />
            <PhMinus class="mx-2.5 mt-auto mb-3 text-black" />
            <CustomDatePicker :showLabel="false" class="w-[140px]"/>
          </div>
        </div>
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
