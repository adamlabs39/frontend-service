<script setup lang="ts">
import { computed, ref, type PropType, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import TambahDataKonfigurasiJadwal from "../Konfigurasi/KonfigurasiJadwalDokter/SectionTambahKonfigurasiJadwal.vue";

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
  excludedDoctorUuidsByPoli: {
    type: Object as PropType<Record<string, string[]>>,
    default: () => ({}),
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
  jadwalDokterData: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

// Computed untuk dropdown poli
const poliDropdown = computed(() => props.poliOptions);

// Computed untuk dropdown dokter yang difilter berdasarkan poli yang dipilih
const dokterDropdown = computed(() => {
  if (!selectedPoli.value) {
    return [];
  }

  // Gunakan data dokterOptions (tidak terpengaruh filter status) dan
  // filter berdasarkan poli yang dipilih melalui atribut poliUuids
  const dokterInPoli = (
    props.dokterOptions as Array<{
      uuid: string;
      name: string;
      poliUuids?: string[];
    }>
  ).filter((dokter) => dokter.poliUuids?.includes(selectedPoli.value));

  // Remove duplicates berdasarkan uuid
  const uniqueDokter = dokterInPoli.filter(
    (dokter, index, self) =>
      index === self.findIndex((d) => d.uuid === dokter.uuid)
  );

  return uniqueDokter;
});

// Computed untuk menentukan apakah dropdown dokter disabled
const isDokterDisabled = computed(() => !selectedPoli.value);

const selectedDokter = ref<any>();
const selectedPoli = ref<any>();
const resetKey = ref(0);

const poliFilterText = ref("");

const handlePoliFilter = (value?: string) => {
  poliFilterText.value = (value ?? "").toString();
};

watch(selectedPoli, (newPoliUuid) => {
  // Reset pilihan dokter ketika poli berubah
  selectedDokter.value = null;
  poliFilterText.value = "";
});

const selectedPaymentMethod = ref<string[]>([]);

// Fungsi untuk melakukan pencarian
const performSearch = () => {
  // Validasi: jika ada teks filter poli tapi tidak ada opsi yang cocok,
  const q = poliFilterText.value?.trim().toLowerCase() ?? "";
  const hasPoliQuery = q.length > 0;
  const poliQueryMatches = props.poliOptions.some((p: any) =>
    p?.name?.toLowerCase().includes(q)
  );
  const isValidSearch = !(hasPoliQuery && !poliQueryMatches);

  console.log("Debug performSearch:", {
    q,
    hasPoliQuery,
    poliQueryMatches,
    isValidSearch,
    selectedDokter: selectedDokter.value,
    selectedPoli: selectedPoli.value,
  });

  emit("search", {
    // Mengirim parameter yang akan digunakan langsung oleh backend API
    dokterUuid: isValidSearch ? selectedDokter.value ?? "" : "",
    poliUuid: isValidSearch ? selectedPoli.value ?? "" : "",
    aktif:
      selectedPaymentMethod.value.length === 1
        ? selectedPaymentMethod.value[0] === "AKTIF"
        : undefined,
    // kirim flag validasi untuk dipakai di halaman
    isValidSearch,
  });
};

// Debounced search function dengan delay 500ms
const debouncedSearch = useDebounceFn(performSearch, 500);

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
  poliFilterText.value = "";
  resetKey.value++;
};
defineExpose({
  resetFilter,
});

const emit = defineEmits(["refresh", "search"]);

function handleRefresh() {
  emit("refresh");
}

function handleSearch() {
  // Langsung jalankan performSearch tanpa debounce untuk tombol cari
  performSearch();
}

function handleReset() {
  resetFilter(); // bersihkan pilihan lokal

  emit("search", {
    dokterUuid: "",
    poliUuid: "",
    aktif: undefined,
    isValidSearch: true,
  });

  // emit refresh untuk memuat ulang data dari server
  emit("refresh");
}
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex gap-5 items-center mr-2.5 w-full">
        <CustomButton
          label=""
          icon="PhArrowClockwise"
          @click="handleReset"
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
            :key="`poli-${resetKey}`"
            v-model="selectedPoli"
            :options="poliDropdown"
            optionValue="uuid"
            optionLabel="name"
            class="w-1/4 mr-[20px] flex-grow"
            :is-loading="false"
            prependIcon="PhMagnifyingGlass"
            label="Cari Poli"
            place-holder="Cari Poli"
            @filter="handlePoliFilter"
          />
          <CustomSelect
            :key="`dokter-${resetKey}`"
            v-model="selectedDokter"
            :options="dokterDropdown"
            optionValue="uuid"
            optionLabel="name"
            class="w-1/4 mr-[10px] flex-grow"
            :is-loading="false"
            :disabled="isDokterDisabled"
            prependIcon="PhMagnifyingGlass"
            label="Cari Dokter"
            :place-holder="
              isDokterDisabled ? 'Pilih poli terlebih dahulu' : 'Cari Dokter'
            "
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
    :excludedDoctorUuidsByPoli="props.excludedDoctorUuidsByPoli"
    :title="dialogData.title"
    :method="dialogData.method"
    @close="handleClose"
    @refresh="handleRefresh"
  />
</template>
