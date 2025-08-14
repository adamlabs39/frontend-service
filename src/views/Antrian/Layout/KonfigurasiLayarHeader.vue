<script setup lang="ts">
import { ref, watch, type PropType } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import TambahDataKonfigurasiLayar from "../Konfigurasi/KonfigurasiLayar/SectionTambahKonfigurasiLayar.vue";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  filter: {
    type: Boolean,
    default: true,
  },
  search: {
    type: Boolean,
    default: true,
  },
  availableTipeLayar: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["search", "reset", "daftar", "refresh"]);

function handleRefresh() {
  emit("refresh");
}

const searchQuery = ref("");
const selectedLayar = ref<any>();

// Fungsi untuk melakukan pencarian
const performSearch = () => {
  emit(
    "search",
    searchQuery.value,
    selectedLayar.value,
    selectedPaymentMethod.value
  );
};

// Debounced search function dengan delay 500ms
const debouncedSearch = useDebounceFn(performSearch, 500);

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah",
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah",
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit",
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}

const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }

  // Trigger auto-search dengan debounce ketika chip dipilih
  debouncedSearch();
};

// Handle search button click
const handleSearchClick = () => {
  // Langsung jalankan performSearch tanpa debounce untuk tombol cari
  performSearch();
};

const filters = [selectedPaymentMethod];

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
  });
  selectedLayar.value = null;
  searchQuery.value = "";

  // Emit refresh untuk memuat ulang data ke keadaan semula
  emit("refresh");

  emit("reset");
};

defineExpose({
  resetFilter,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex gap-5 items-center mr-2.5 w-full">
        <CustomButton
          label=""
          icon="PhArrowClockwise"
          @click="resetFilter"
          title="refresh"
        />
        <div class="flex justify-between items-center">
          <div
            class="grow font-semibold text-heading text-adameds-300 leading-[30px]"
          >
            Konfigurasi
          </div>
          <PhCaretRight :size="30" class="mx-2 text-cyan-500" />
          <div
            class="grow font-semibold mr-20 text-heading text-grey-400 leading-[30px]"
          >
            Layar Antrian
          </div>
        </div>
        <CustomButton
          @click="handleAdd"
          icon="PhPlus"
          label="Layar Antrian"
          class="px-4 ml-auto"
        />
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5">
        <div class="flex mt-[10px]">
          <CustomTextfield
            v-if="search"
            v-model="searchQuery"
            :label="`Cari Layar`"
            prependIcon="PhMagnifyingGlass"
            :placeholder="`Cari Nama Layar`"
            class="mr-5 w-1/2"
          >
          </CustomTextfield>
          <CustomSelect
            v-model="selectedLayar"
            :options="availableTipeLayar"
            optionValue="code"
            optionLabel="tipe_layar"
            class="w-1/2"
            :is-loading="false"
            label="Tipe Layar"
            place-holder="Semua"
          />
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="ml-5 mr-[10px] mt-auto w-[95px]"
            @click="handleSearchClick"
          />
          <CustomButton
            @click="resetFilter"
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            class="mt-auto w-[70px]"
          />
        </div>
        <div class="font-semibold text-SM text-grey-300">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Status</div>
            <div class="flex">
              |
              <CustomChip
                label="AKTIF"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                customClass="h-5"
                class="ml-[10px]"
                :isSelected="selectedPaymentMethod.includes('AKTIF')"
                @selected="onPaymentMethodSelect"
                selectedColor="bg-adameds-300 border-adameds-300"
              />
              <CustomChip
                label="NON-AKTIF"
                customClass="h-5"
                class="ml-[10px]"
                :isSelected="selectedPaymentMethod.includes('NON-AKTIF')"
                @selected="onPaymentMethodSelect"
              />
            </div>
          </div>
        </div>
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
  <TambahDataKonfigurasiLayar
    :full-screen="true"
    v-model:isDialogVisible="dialogData.isVisible"
    :title="dialogData.title"
    :method="dialogData.method"
    @close="handleClose"
    @refresh="handleRefresh"
  />
</template>
