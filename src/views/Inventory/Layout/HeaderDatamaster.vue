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
        <CustomButton
          @click="emit('tambahSupplier')"
          icon="PhPlus"
          label="Data"
          class="mr-[10px]"
        />
      </div>
    </template>
    <template #content>
      <div class="mb-2.5">
        <CustomTextfield
          v-model="noSupplier"
          prependIcon="PhMagnifyingGlass"
          label="Cari Supplier"
          placeholder="Cari Nama Supplier"
          class="grow"
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
