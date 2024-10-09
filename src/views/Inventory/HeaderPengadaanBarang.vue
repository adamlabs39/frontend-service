<script setup lang="ts">
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import type { MenuItem } from "primevue/menuitem";
import type { PropType } from "vue";

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

const emit = defineEmits(["tambahPermintaan"]);
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <span class="leading-10 text-adameds-300 text-heading">
            {{
              pageType == "rawat-jalan"
                ? "Rawat Jalan "
                : pageType == "rawat-inap"
                ? "Rawat Inap"
                : "IGD"
            }}
          </span>
          <CustomBreadCrumb
            :home="{
              label: 'SEP',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          />
        </div>
        <CustomButton
          @click="
            pageType == 'pembelian-barang-supplier' ? emit('tambahPermintaan') : ''"
          icon="PhPlus"
          :label="pageType == 'pembelian-barang-supplier' ? 'Permintaan' : ''"
          class="mr-[10px]"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
