<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
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


const noPermintaan = ref<string>("");

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
              label: 'Pengeluaran  Barang',
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
      <div class="mb-2.5">
        <CustomTextfield
          v-model="noPermintaan"
          prependIcon="PhMagnifyingGlass"
          label="Pencarian"
          placeholder="Cari Nama Pasien"
          class=" grow"
        />
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
