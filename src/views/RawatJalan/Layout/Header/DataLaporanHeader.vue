<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import { ref, type PropType } from "vue";

const props = defineProps({
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  currentRouteName: {
    type: String,
  },
});

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchRMFilter = ref<string>("");
const searchDokterDPJPFilter = ref<string>("");
const searchBulanFilter = ref<string>("");
</script>

<template>
  <CustomAccordion :open-with-header="false" initial-state="0" noBorder>
    <template #header>
      <!-- {{ currentRouteName }} -->
      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise" />
        <CustomBreadCrumb
          :home="{
            label: 'Laporan',
            home: true,
          }"
          :model="dataBreadCrumb"
          class=""
        />
      </div>
    </template>
    <template #content>
        <slot name="before-content"></slot>
      <div class="flex mt-[12px] mb-2.5">
        <CustomTextfield
          v-model="searchRMFilter"
          prependIcon="PhMagnifyingGlass"
          label="Pencarian"
          placeholder="Cari Nama / Alamat / No. RM"
          class="mr-5 grow"
        />
        <CustomSelect
          v-if="currentRouteName === 'kunjungan-rawat-jalan'"
          v-model="searchDokterDPJPFilter"
          label="Dokter DPJP"
          class="mr-5"
          optionLabel=""
          optionValue=""
          place-holder="Cari Dokter"
          :options="['Semua', 'Beberapa', 'Banyak']"
        />
        <div
          class="flex"
          v-if="
            currentRouteName === 'kunjungan-rawat-jalan' ||
            currentRouteName === 'pembatalan-poli'
          "
        >
          <CustomDatePicker
            v-model="startDateFilter"
            label="Tanggal"
            class="w-[130px]"
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="endDateFilter"
            :showLabel="false"
            class="mt-auto w-[130px]"
          />
        </div>

        <CustomSelect
          v-if="currentRouteName === 'rekap-tindakan-pasien'"
          v-model="searchBulanFilter"
          label="Bulan"
          class="w-1/4"
          optionLabel=""
          optionValue=""
          place-holder="Pilih Bulan"
          :options="['Januari', 'Februari', 'Maret']"
        />
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto w-[95px]"
        />
        <CustomButton
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto w-[70px]"
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
