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

const emit = defineEmits(["tambahPengeluaran"]);

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
              label: 'Penerimaan  Barang',
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
      <div
        class="mb-2.5"
        :class="{
          flex: dataBreadCrumb[0].label === 'Penerimaan Retur Unit',
          'gap-6': dataBreadCrumb[0].label === 'Penerimaan Retur Unit',
        }"
      >
        <CustomTextfield
          v-model="noPermintaan"
          prependIcon="PhMagnifyingGlass"
          label="Pencarian"
          placeholder="Cari Nama Pasien"
          :class="
            dataBreadCrumb[0].label === 'Penerimaan Retur Unit'
              ? 'w-[600px]'
              : 'grow'
          "
        />
        <CustomSelect
          v-if="dataBreadCrumb[0].label === 'Penerimaan Retur Unit'"
          label="Alasan Retur"
          class="grow"
        />
        <div class="flex items-end gap-2.5" v-if="dataBreadCrumb[0].label === 'Penerimaan Retur Unit'">
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="w-[95px]"
          />
          <CustomButton
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            class=" w-[70px]"
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
