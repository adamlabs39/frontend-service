<script setup lang="ts">
import { computed, ref, type PropType } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import TambahDataKonfigurasiJadwal from "../Konfigurasi/KonfigurasiJadwalDokter/TambahDataKonfigurasiJadwal.vue";

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
  excludedDoctorUuids: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  payload: {
    type: Object,
    default: () => ({}),
  },
  dokterOptions: {
    type: Array as PropType<Array<{ uuid: string; name: string }>>,
    default: () => [],
  },
  poliOptions: {
    type: Array as PropType<Array<{ uuid: string; name: string }>>,
    default: () => [],
  },
});

const dokterDropdown = computed(() => props.dokterOptions);
const poliDropdown = computed(() => props.poliOptions);

const selectedDokter = ref<any>();

const selectedPoli = ref<any>();

const selectedPaymentMethod = ref<string[]>([]);
const onPaymentMethodSelect = (label: string) => {
  if (selectedPaymentMethod.value.includes(label)) {
    selectedPaymentMethod.value = selectedPaymentMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedPaymentMethod.value.push(label);
  }
};

const filters = [selectedPaymentMethod];

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

function handleClose() {
  dialogData.value.isVisible = false;
}

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
    selectedDokter.value = null;
    selectedPoli.value = null;
  });
};
defineExpose({
  resetFilter,
});

const emit = defineEmits(["refresh", "search"]);

function handleRefresh() {
  emit("refresh");
}

function handleSearch() {
  emit("search", {
    dokterUuid: selectedDokter.value ?? "",
    poliUuid: selectedPoli.value ?? "",
  });
}

function handleReset() {
  resetFilter(); // bersihkan pilihan lokal
  emit("search", {
    // hilangkan filter di parent
    dokterUuid: "",
    poliUuid: "",
  });
}
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex gap-5 items-center mr-2.5 w-full">
        <CustomButton label="" icon="PhArrowClockwise" />
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
            Jadwal Dokter
          </div>
        </div>
        <CustomButton
          @click="handleAdd"
          icon="PhPlus"
          label="Jadwal"
          class="px-4 ml-auto"
        />
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5">
        <div class="flex mt-[10px]">
          <CustomSelect
            v-model="selectedDokter"
            :options="dokterDropdown"
            optionValue="uuid"
            optionLabel="name"
            class="w-1/4 mr-[10px] flex-grow"
            :is-loading="false"
            prependIcon="PhMagnifyingGlass"
            label="Cari Dokter"
            place-holder="Cari Dokter"
          />
          <CustomSelect
            v-model="selectedPoli"
            :options="poliDropdown"
            optionValue="uuid"
            optionLabel="name"
            class="w-1/4 mr-[20px] flex-grow"
            :is-loading="false"
            prependIcon="PhMagnifyingGlass"
            label="Cari Poli"
            place-holder="Cari Poli"
          />
          <CustomButton
            icon="PhMagnifyingGlass"
            label="Cari"
            class="mr-[10px] mt-auto w-[95px]"
            @click="handleSearch"
          />
          <CustomButton
            @click="handleReset"
            label="Reset"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            class="mt-auto w-[70px]"
          />
        </div>
        <div class="font-semibold text-SM text-grey-300">
          <div class="flex mb-[10px] mt-5">
            <div class="flex gap-5">
              <div class="">Filter Status</div>
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
  <TambahDataKonfigurasiJadwal
    v-model:isDialogVisible="dialogData.isVisible"
    :excludedDokterUuids="props.excludedDoctorUuids"
    :title="dialogData.title"
    :method="dialogData.method"
    @close="handleClose"
    @refresh="handleRefresh"
  />
</template>
