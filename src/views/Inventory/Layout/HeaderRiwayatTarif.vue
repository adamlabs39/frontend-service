<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
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

const emit = defineEmits(["tambahSupplier"]);

const noSupplier = ref<string>("");

// onMounted(() => {
//   console.log(props.dataBreadCrumb)
//   console.log("`page", props.pageType);
// })
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <CustomBreadCrumb
            :home="{
              label: 'Datamaster',
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
      <div class="grid grid-cols-3 py-2 gap-7">
        <CustomSelect label="Kategori" place-holder="Pilih Kategori" />
        <CustomSelect label="Jenis Stok" place-holder="Pilih Jenis Stok" />
        <CustomSelect label="Jenis Item" place-holder="Pilih Jenis Item" />
      </div>
      <div class="flex justify-between gap-7">
        <CustomTextfield label="Pencarian (Nama Item / Kode Item)" class="grow" />
        <div class="flex items-end gap-2">
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Tampilkan"
            
          />
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
