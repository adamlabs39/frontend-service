<script lang="ts" setup>
import { ref, type PropType, computed, watch } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  valueSearch: {
    type: String,
  },
});

const emit = defineEmits([
  "tambah-data",
  "update:valueSearch",
  "update:selectedRole",
  "selectedTab"
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
    : props.pageType === "dokter"
    ? "Dokter"
    : props.pageType === "nakes"
    ? "Nakes"
    : props.pageType === "penjamin"
    ? "Penjamin"
    : props.pageType === "faskes"
    ? "Faskes"
    : props.pageType === "lokasi"
    ? "Lokasi"
    : props.pageType === "organisasi"
    ? "Organisasi"
    : "General Consent";
});

const valueSearch = ref(props.valueSearch);
watch(valueSearch, (newValue) => {
  emit("update:valueSearch", newValue);
});

const filterAktif = ref(["AKTIF", "NON-AKTIF"]);
const selectedFilterAktif = ref<string[]>([]);
const onAktifSelect = (label: string) => {
  if (selectedFilterAktif.value.includes(label)) {
    selectedFilterAktif.value = selectedFilterAktif.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterAktif.value.push(label);
  }
};

const tabs = ref([
  { title: "TINDAKAN", content: "Tindakan", value: "0" },
  { title: "RUANGAN", content: "Ruangan", value: "1" },
]);
const selectedTab = ref("0");
</script>
<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <span class="leading-10 text-adameds-300 text-heading">
            {{ pageLabel }}
          </span>
        </div>
        <div class="flex flex-row items-center justify-end gap-2">
          <CustomButton
            v-if="['tarif'].includes(pageType)"
            v-for="tab in tabs"
            :key="tab.title"
            :label="tab.title"
            class="w-[320px]"
            :text-color="
              selectedTab === tab.value ? 'text-white' : 'text-adameds-300'
            "
            :border-color="
              selectedTab === tab.value ? 'border-none' : 'border-adameds-300'
            "
            :class="selectedTab === tab.value ? 'bg-adameds-300' : 'bg-white'"
            @click="$emit('selectedTab', selectedTab = tab.value)"
            :outlined="selectedTab !== tab.value"
          />
          <CustomButton
            @click="emit('tambah-data')"
            icon="PhPlus"
            label="Data"
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
            :label="`Cari ${pageLabel}`"
            :placeholder="`Cari ${pageLabel}`"
            class="grow"
            prependIcon="PhMagnifyingGlass"

          />
          <CustomSelect
            v-if="['user', 'ruangan', 'tarif', 'tindakan'].includes(pageType)"
            class="grow"
            :label="
              props.pageType === 'user'
                ? 'Role'
                : props.pageType === 'ruangan'
                ? 'Kategori'
                : props.pageType === 'ruangan'
                ? 'Unit Pelayanan'
                : 'Kategori'
            "
            :placeHolder="
              props.pageType === 'user'
                ? 'Pilih Role'
                : props.pageType === 'ruangan'
                ? 'Pilih Kategori'
                : props.pageType === 'ruangan'
                ? 'Pilih Unit Pelayanan'
                : 'Pilih Kategori'
            "
            optionValue="code"
            optionLabel="name"
          />
          <CustomSelect
            v-if="['ruangan', 'tarif', 'tindakan'].includes(pageType)"
            class="grow"
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
            optionValue="code"
            optionLabel="name"
          />
          <div
            class="flex gap-2.5"
            v-if="['user', 'ruangan', 'tarif', 'tindakan'].includes(pageType)"
          >
            <CustomButton label="Cari" icon="PhMagnifyingGlass" @click="" />
            <CustomButton
              label="Reset"
              background-color="bg-white"
              border-color="border-adameds-300"
              text-color="text-adameds-300"
            />
          </div>
        </div>
        <!-- <div
          v-if="['snomed-ct'].includes(pageType)"
          class="flex items-center gap-2.5"
        >
          <div
            class="min-w-32 border-r-[0.71px] font-semibold text-xs text-grey-300"
          >
            Filter Status
          </div>
          <CustomChip
            v-for="(method, index) in filterAktif"
            :key="method + index"
            :label="method"
            :showCheckedIcon="true"
            borderColor="border-adameds-300"
            icon-color="text-adameds-300"
            textColor="text-adameds-300"
            :iconSize="16"
            selectedColor="bg-adameds-300 border-adameds-300"
            customClass="h-5"
            :isSelected="selectedFilterAktif.includes(method)"
            @selected="onAktifSelect"
          />
        </div> -->
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
