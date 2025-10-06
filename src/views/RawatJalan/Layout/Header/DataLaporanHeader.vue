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
// const valueBulanFilter = ref<string>("");

const valueBulanFilter = ref<Date | null>(null); 
const optionBulan = ref([
  { label: "Januari", value: 1 },
  { label: "Februari", value: 2 },
  { label: "Maret", value: 3 },
  { label: "April", value: 4 },
  { label: "Mei", value: 5 },
  { label: "Juni", value: 6 },
  { label: "Juli", value: 7 },
  { label: "Agustus", value: 8 },
  { label: "September", value: 9 },
  { label: "Oktober", value: 10 },
  { label: "November", value: 11 },
  { label: "Desember", value: 12 },
]);

const resetForm = () => {
  valueStartDateFilter.value = new Date();
  valueEndDateFilter.value = new Date(); // Make sure to assign null to both
  valueRMFilter.value = "";
  valueDokterDPJPFilter.value = "";
  valueBulanFilter.value = null;
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
             optionLabel="pegawai.name"
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
            :max-date="valueEndDateFilter"
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="valueEndDateFilter"
            :showLabel="false"
            class="mt-auto w-[130px]"
            @update:model-value="
              $emit('update:endedDateFilter', valueEndDateFilter)
            "
            :min-date="valueStartDateFilter"
          />
        </div>
        <CustomDatePicker
              v-if="currentRouteName === 'rekap-tindakan-pasien'"
              v-model="valueBulanFilter"
              dateFormat="mm-yy"
              view="month"
              label="Tanggal"
              place-holder="Pilih Bulan"
              class=""
              @update:model-value="
              $emit('update:valueBulanFilter', valueBulanFilter)
            "
              :max-date="new Date()"
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
