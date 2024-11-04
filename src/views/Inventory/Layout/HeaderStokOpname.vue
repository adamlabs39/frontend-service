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

const emit = defineEmits(["tambahStokOpname"]);
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <CustomBreadCrumb
            :home="{
              label: 'Stok Opname',
              home: true,
            }"
          >
          </CustomBreadCrumb>
        </div>
        <CustomButton icon="PhPlus" label="Stok Opname" class="mr-[10px]" @click="emit('tambahStokOpname')"/>
      </div>
    </template>
    <template #content>
      <CustomTextfield
        label="Pencarian  "
        class="grow"
        placeholder="Cari No. Stok Opname / Nama Judul Stok Opname"
        prepend-icon="PhMagnifyingGlass"
      />
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
