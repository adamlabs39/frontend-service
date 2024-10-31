<script setup lang="ts">
import { ref, type PropType } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import type { MenuItem } from "primevue/menuitem";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
const props = defineProps({
  pageType: {
    type: String,
    default: "Semua Poli",
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  currentRouteName: {
    type: String,
  },
});
const emit = defineEmits([
  "reload-data",
  "tambah-data",
  "selectedTab",
  "search",
  "reset",
]);
const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const selectedTab = ref("0");
const filterStatusBayarList = ref(["Belum Lunas", "Lunas"]);
const filterPembayaranList = ref(["TUNAI", "ASURANSI"]);
const selectedFilterStatus = ref<string[]>([]);
const selectedFilterPembayaran = ref<string[]>([]);
const onStatusSelect = (label: string) => {
  if (selectedFilterStatus.value.includes(label)) {
    selectedFilterStatus.value = selectedFilterStatus.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterStatus.value.push(label);
  }
};
const onPembayaranSelect = (label: string) => {
  if (selectedFilterPembayaran.value.includes(label)) {
    selectedFilterPembayaran.value = selectedFilterPembayaran.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPembayaran.value.push(label);
  }
};
</script>
<template>
  <CustomAccordion :openWithHeader="false" noBorder initial-state="0">
    <template #header>
      <div class="flex justify-between w-full items-center">
        <div class="flex">
          <CustomButton
            icon="PhArrowClockwise"
            class="mr-5"
            @click="emit('reload-data')"
          />
          <CustomBreadCrumb
            v-if="['datamaster', 'laporan'].includes(pageType)"
            :home="{
              label:
                pageType === 'datamaster'
                  ? 'Datamaster'
                  : pageType === 'laporan'
                  ? 'Laporan'
                  : '',
              home: true,
            }"
            :model="dataBreadCrumb"
          />
          <span v-else class="leading-10 text-adameds-300 text-heading">
            {{
              pageType == "daftar"
                ? "Daftar Kelas"
                : pageType == "booking"
                ? "Booking Kelas"
                : ""
            }}
          </span>
        </div>
        <CustomButton
          v-if="!['laporan'].includes(pageType)"
          @click="emit('tambah-data')"
          icon="PhPlus"
          :label="
            props.pageType === 'daftar'
              ? 'Daftar Kelas'
              : props.pageType === 'booking'
              ? 'Book'
              : props.pageType === 'datamaster'
              ? 'Data'
              : ''
          "
          class="mr-[10px]"
        />
      </div>
    </template>
    <template #content>
      <div class="flex mt-[16px] mb-2.5 items-end">
        <CustomTextfield
        v-if="!['laporan'].includes(pageType)"
          :label="
            props.pageType === 'datamaster' ? 'Cari Kelas' : 'Cari Pasien'
          "
          :placeholder="
            props.pageType === 'datamaster'
              ? 'Cari Nama Kelas'
              : 'Cari Nama / Alamat / No. RM'
          "
          prependIcon="PhMagnifyingGlass"
          class="mr-5 w-full"
        />
        <CustomSelect
          v-if="['daftar', 'booking','laporan'].includes(pageType)"
          label="Kelas"
          placeHolder="Pilih Kelas"
          class="w-full"
        />
        <div
          class="flex mx-5"
          v-if="['daftar', 'booking', 'laporan'].includes(pageType)"
        >
          <CustomDatePicker
            v-model="startDateFilter"
            label="Tanggal"
            class="w-[200px]"
          />
          <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
          <CustomDatePicker
            v-model="endDateFilter"
            :showLabel="false"
            class="mt-auto w-[200px]"
          />
        </div>
        <div
          class="flex gap-2.5"
          v-if="['daftar', 'booking'].includes(pageType)"
        >
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            @click="$emit('search')"
          />
          <CustomButton
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            @click="$emit('reset')"
          />
        </div>
      </div>
      <div class="flex items-center gap-2" v-if="['daftar'].includes(pageType)">
        <CustomButton
          label="DAFTAR"
          class="grow"
          :text-color="selectedTab === '1' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '1' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '1' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '1'))"
          :outlined="selectedTab !== '1'"
        />
        <CustomButton
          label="BATAL"
          class="grow"
          :text-color="selectedTab === '2' ? 'text-white' : 'text-adameds-300'"
          :border-color="
            selectedTab === '2' ? 'border-none' : 'border-adameds-300'
          "
          :class="selectedTab === '2' ? 'bg-adameds-300' : 'bg-white'"
          @click="$emit('selectedTab', (selectedTab = '2'))"
          :outlined="selectedTab !== '2'"
        />
      </div>
      <div class="font-semibold text-SM text-grey-300">
        <div
          v-if="['daftar'].includes(pageType)"
          class="flex mb-[10px] mt-[10px]"
        >
          <div class="w-[15%] flex items-center">Filter Status Bayar</div>
          <div class="flex gap-2.5">
            <hr class="h-auto w-[1px] bg-grey-300" />
            <CustomChip
              v-for="(option, index) in filterStatusBayarList"
              :key="option + index"
              :label="option"
              :isSelected="selectedFilterStatus.includes(option)"
              @selected="onStatusSelect(option)"
              :borderColor="
                index === 0 ? 'border-grey-300' : 'border-success-300'
              "
              :iconColor="index === 0 ? 'text-grey-300' : 'text-success-300'"
              :textColor="index === 0 ? 'text-grey-500' : 'text-success-300'"
              :bg-color="index === 0 ? 'bg-grey-75' : 'bg-success-50'"
              :selectedColor="index === 0 ? 'bg-grey-300 border-grey-300' : 'bg-success-300 border-success-300'"
            >
            </CustomChip>
          </div>
        </div>
        <div
          v-if="['booking', 'daftar'].includes(pageType)"
          class="flex mb-[10px] mt-[10px]"
        >
          <div class="w-[15%] flex items-center">Filter Pembayaran</div>
          <div class="flex gap-2.5">
            <hr class="h-auto w-[1px] bg-grey-300" />
            <CustomChip
              v-for="(option, index) in filterPembayaranList"
              :key="option + index"
              :label="option"
              :isSelected="selectedFilterPembayaran.includes(option)"
              @selected="onPembayaranSelect(option)"
              :borderColor="
                index === 0 ? 'border-adameds-300' : 'border-warning-300'
              "
              :iconColor="index === 0 ? 'text-adameds-300' : 'text-warning-300'"
              :textColor="index === 0 ? 'text-adameds-500' : 'text-warning-300'"
              :bg-color="index === 0 ? 'bg-adameds-50' : 'bg-warning-50'"
              :selectedColor="index === 0 ? 'bg-adameds-300 border-adameds-300' : 'bg-warning-300 border-warning-300'"
            >
            </CustomChip>
          </div>
        </div>
      </div>
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
