<script lang="ts" setup>
import { ref, type PropType, computed, watch } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  dataBreadCrumb: {
    default: "",
  },
  filterChipList: {
    type: Array as PropType<FilterChip[]>,
    default: () => [],
  },
  filterSelect: {
    type: Array,
    default: () => [],
  },
  filterSelectSecond: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "tambah-data",
  "tarif-ruangan",
  "update:valueSearch",
  "update:selectedRole",
  "selectedTab",
  "reload-data",
  "filterChange",
  "update:selectedFilter",
  "update:selectedFilterSecond",
  "search",
  "reset",
]);

const pageLabel = computed(() => {
  return props.pageType === "user"
    ? "User"
    : props.pageType === "role"
    ? "Role"
    : props.pageType === "ruangan"
    ? "Ruangan"
    : props.pageType === "kategori-ruangan"
    ? "Kategori Ruangan"
    : props.pageType === "tarif"
    ? "Tarif"
    : props.pageType === "komponen-tarif"
    ? "Komponen Tarif"
    : props.pageType === "tindakan"
    ? "Tindakan"
    : props.pageType === "icd9-cm"
    ? "ICD 9 CM"
    : props.pageType === "snomed-ct"
    ? "Snomed CT"
    : props.pageType === "loinc"
    ? "Loinc"
    : props.pageType === "diagnosis"
    ? "Diagnosis (ICD 10)"
    : props.pageType === "praktisi"
    ? "Praktisi"
    : props.pageType === "pegawai"
    ? "Pegawai"
    : props.pageType === "penjamin"
    ? "Penjamin"
    : props.pageType === "voucher"
    ? "Voucher"
    : props.pageType === "faskes"
    ? "Faskes"
    : props.pageType === "lokasi"
    ? "Lokasi"
    : props.pageType === "organisasi"
    ? "Organisasi"
    : "General Consent";
});

const dataBreadCrumb = ref([
  {
    label:
      props.pageType === "gigi-fdi"
        ? "Gigi FDI"
        : props.pageType === "item-gigi"
        ? "Item Gigi"
        : props.pageType === "kategori-gigi"
        ? "Kategori Gigi"
        : "Oklusi",
  },
]);
const valueSearch = ref();
const valueSelectedFilter = ref();
const valueSelectedFilterSecond = ref();

const resetForm = () => {
  valueSearch.value = ""; // Mengatur ulang pencarian
  valueSelectedFilter.value = ""; // Reset filter pertama
  valueSelectedFilterSecond.value = ""; // Reset filter kedua
  // emit("reset");
};

defineExpose({
  resetForm,
});

watch(valueSearch, (newValue) => {
  emit("update:valueSearch", newValue);
});

const selectedFilterAktif = ref<string[]>([]);

const tabs = ref([
  { title: "TINDAKAN", content: "Tindakan", value: "0" },
  { title: "RUANGAN", content: "Ruangan", value: "1" },
]);
const selectedTab = ref("0");
const filterPoliList = ref([
  "POLI UMUM",
  "POLI ANAK",
  "POLI GIGI POLI MATA",
  "APS",
]);

const selectedFilter = ref<number[]>([]);

const onPoliSelect = (value: number) => {
  const index = selectedFilter.value.indexOf(value);
  if (index === -1) {
    selectedFilter.value.push(value);
  } else {
    selectedFilter.value.splice(index, 1);
  }
  emit("filterChange", selectedFilter.value);
};

interface FilterChip {
  label: string;
  value: any;
}
</script>
<template>
  <CustomAccordion :openWithHeader="false" noBorder initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton
            icon="PhArrowClockwise"
            class="mr-5"
            @click="emit('reload-data')"
          />
          <CustomBreadCrumb
            v-if="isSuperAdmin"
            :home="{
              label: 'Super Admin',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          />
          <span v-else class="leading-10 text-adameds-300 text-heading">
            {{ pageLabel }}
          </span>
        </div>
        <div class="flex flex-row items-center justify-end gap-2">
          <CustomButton
            v-if="['tarif'].includes(pageType)"
            v-for="tab in tabs"
            :key="tab.title"
            :label="tab.title"
            class="px-10"
            :text-color="
              selectedTab === tab.value ? 'text-white' : 'text-adameds-300'
            "
            :border-color="
              selectedTab === tab.value ? 'border-none' : 'border-adameds-300'
            "
            :class="selectedTab === tab.value ? 'bg-adameds-300' : 'bg-white'"
            @click="$emit('selectedTab', (selectedTab = tab.value))"
            :outlined="selectedTab !== tab.value"
          />
          <PhLineVertical
            v-if="['tarif'].includes(pageType)"
            :size="32"
            class="text-adameds-300"
          />

          <CustomButton
            @click="emit('tambah-data')"
            icon="PhPlus"
            :label="props.pageType === 'tarif' ? 'Tarif Tindakan' : 'Data'"
            class="mr-[10px]"
          />
          <CustomButton
            v-if="['tarif'].includes(pageType)"
            @click="emit('tarif-ruangan')"
            icon="PhPlus"
            label="Tarif Ruangan"
            class="mr-[10px]"
          />
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5 mt-2.5">
        <div class="flex items-end justify-between gap-5">
          <CustomTextfield
            v-model="valueSearch"
            :label="isSuperAdmin ? 'Pencarian' : `Cari ${pageLabel}`"
            :placeholder="
              isSuperAdmin ? 'Cari Display Gigi' : `Cari ${pageLabel}`
            "
            class="grow"
            prependIcon="PhMagnifyingGlass"
            @update:modelValue="$emit('update:valueSearch', valueSearch)"
          />
          <CustomSelect
            v-if="['user', 'ruangan', 'tarif'].includes(pageType)"
            class="grow"
            v-model="valueSelectedFilter"
            :label="
              props.pageType === 'user'
                ? 'Role'
                : props.pageType === 'ruangan'
                ? 'Kategori'
                : props.pageType === 'tarif'
                ? 'Unit Pelayanan'
                : 'Kategori'
            "
            :placeHolder="
              props.pageType === 'user'
                ? 'Pilih Role'
                : props.pageType === 'ruangan'
                ? 'Pilih Kategori'
                : props.pageType === 'tarif'
                ? 'Pilih Unit Pelayanan'
                : 'Pilih Kategori'
            "
            :options="props.filterSelect"
            :optionValue="
              props.pageType === 'ruangan'
                ? 'uuid'
                : props.pageType === 'tarif'
                ? 'value'
                : props.pageType === 'user'
                ? 'name'
                : ''
            "
            :optionLabel="
              props.pageType === 'ruangan'
                ? 'name'
                : props.pageType === 'tarif'
                ? 'label'
                : props.pageType === 'user'
                ? 'name'
                : ''
            "
            @update:modelValue="
              $emit('update:selectedFilter', valueSelectedFilter)
            "
          />
          <CustomSelect
            v-if="['ruangan', 'tarif'].includes(pageType)"
            class="grow"
            v-model="valueSelectedFilterSecond"
            :label="
              props.pageType === 'ruangan'
                ? 'Kelas'
                : props.pageType === 'tarif'
                ? 'Metode Pembayaran'
                : 'Kelas'
            "
            :placeHolder="
              props.pageType === 'ruangan'
                ? 'Pilih Kelas'
                : props.pageType === 'tarif'
                ? 'Pilih Metode Pembayaran'
                : 'Pilih Kelas'
            "
            :options="props.filterSelectSecond"
            :optionValue="
              props.pageType === 'ruangan'
                ? 'value'
                : props.pageType === 'tarif'
                ? 'uuid'
                : ''
            "
            :optionLabel="
              props.pageType === 'ruangan'
                ? 'label'
                : props.pageType === 'tarif'
                ? 'name'
                : ''
            "
            @update:modelValue="
              $emit('update:selectedFilterSecond', valueSelectedFilterSecond)
            "
          />
          <div
            class="flex gap-2.5"
            v-if="['user', 'ruangan', 'tarif'].includes(pageType)"
          >
            <CustomButton
              label="Cari"
              icon="PhMagnifyingGlass"
              @click="$emit('search')"
            />
            <CustomButton
              label="Reset"
              background-color="bg-white"
              border-color="border-adameds-300"
              text-color="text-adameds-300"
              @click="$emit('reset')"
            />
          </div>
        </div>

        <div
          v-if="['pegawai', 'praktisi'].includes(pageType)"
          class="flex mb-[10px] items-center"
        >
          <div class="w-[15%] text-SM font-semibold text-grey-300">
            {{
              props.pageType === "pegawai"
                ? "Filter Tipe Pegawai"
                : props.pageType === "praktisi"
                ? "Filter Tipe Praktisi"
                : ""
            }}
          </div>
          <div class="flex text-grey-300">
            |
            <CustomChip
              v-for="(filter, index) in filterChipList"
              :key="filter.value + index"
              :label="filter.label"
              borderColor="border-adameds-300"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
              bg-color="bg-adameds-50"
              class="ml-[10px]"
              :isSelected="selectedFilter.includes(filter.value)"
              selectedColor="bg-adameds-300 border-adameds-300"
              @selected="onPoliSelect(filter.value)"
            />
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
