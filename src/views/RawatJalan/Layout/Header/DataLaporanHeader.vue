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
  praktisiPayload: {
    type: Array as PropType<any[]>, // Sesuaikan tipe datanya
    default: () => [],
  },
});




const emits = defineEmits([
  'update:valueRMFilter', 'update:selectedDokterDPJP','update:startedDateFilter','update:endedDateFilter','update:valueBulanFilter','search', 'reset','refreshPage'
])

const valueStartDateFilter = ref<Date>(new Date());
const valueEndDateFilter = ref<Date>(new Date());
const valueRMFilter = ref<string>("");
const valueDokterDPJPFilter = ref<string>("");
const valueBulanFilter = ref<string>("");

const resetForm = () => {
  valueStartDateFilter.value = new Date();
  valueEndDateFilter.value = new Date(); // Make sure to assign null to both
  valueRMFilter.value = "";
  valueDokterDPJPFilter.value = "";
  valueBulanFilter.value = "";
}

defineExpose({
  resetForm,
});
</script>

<template>
  
  <CustomAccordion :open-with-header="false" initial-state="0" noBorder>
    <template #header>
      <!-- {{ currentRouteName }} -->
      <div class="flex items-center w-full gap-5 mr-2.5">
        <CustomButton icon="PhArrowClockwise"  @click ="$emit('refreshPage')"/>
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
          v-model="valueRMFilter"
          @update:model-value="$emit('update:valueRMFilter', valueRMFilter)"
          prependIcon="PhMagnifyingGlass"
          label="Pencarian"
          placeholder="Cari Nama / Alamat / No. RM"
          class="mr-5 grow"
        />
        <CustomSelect
          v-if="currentRouteName === 'kunjungan-rawat-jalan'"
          v-model="valueDokterDPJPFilter"
          label="Dokter DPJP"
             optionLabel="detailPegawai.name"
          optionValue="uuid"
          :options="praktisiPayload"
          class="mr-5"
          place-holder="Cari Dokter"
          @update:model-value="
            $emit('update:selectedDokterDPJP', valueDokterDPJPFilter)
          "
        />
        <div
          class="flex"
          v-if="
            currentRouteName === 'kunjungan-rawat-jalan' ||
            currentRouteName === 'pembatalan-poli'
          "
        >
          <CustomDatePicker
            v-model="valueStartDateFilter"
            label="Tanggal"
            class="w-[130px]"
            @update:model-value="
              $emit('update:startedDateFilter', valueStartDateFilter)
            "
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="valueEndDateFilter"
            :showLabel="false"
            class="mt-auto w-[130px]"
            @update:model-value="
              $emit('update:endedDateFilter', valueEndDateFilter)
            "
          />
        </div>

        <CustomSelect
          v-if="currentRouteName === 'rekap-tindakan-pasien'"
          v-model="valueBulanFilter"
          label="Bulan"
          class="w-1/4"
          optionLabel=""
          optionValue=""
          place-holder="Pilih Bulan"
          :options="['Januari', 'Februari', 'Maret']"
          @update:model-value="
            $emit('update:valueBulanFilter', valueBulanFilter)
          "
        />
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto w-[95px]"
          @click="$emit('search')"
        />
        <CustomButton
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto w-[70px]"
          @click="$emit('reset')"
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
