<script setup lang="ts">
import { ref } from "vue";

import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["daftar"]);

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());
const searchPatientFilter = ref<string>("");
const searchDPJPFilter = ref<string>("");

// SECTION Rawat Jalan
const filterPoliList = ref([
  "POLI UMUM",
  "POLI ANAK",
  "POLI GIGI POLI MATA",
  "APS",
]);
const selectedFilterPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedFilterPoli.value.includes(label)) {
    selectedFilterPoli.value = selectedFilterPoli.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPoli.value.push(label);
  }
};

const filterRegisterMethod = ref(["ADMISI", "APM", "MOBILE APP"]);
const selectedFilterRegisterMethod = ref<string[]>([]);
const onRegisterMethodSelect = (label: string) => {
  if (selectedFilterRegisterMethod.value.includes(label)) {
    selectedFilterRegisterMethod.value =
      selectedFilterRegisterMethod.value.filter((item) => item != label);
  } else {
    selectedFilterRegisterMethod.value.push(label);
  }
};
// !SECTION

// SECTION Rawat Inap
const filterRoomList = ref(["MAWAR", "MELATI", "ANGGREK"]);
const selectedFilterRoom = ref<string[]>([]);
const onFilterRoomSelect = (label: string) => {
  if (selectedFilterRoom.value.includes(label)) {
    selectedFilterRoom.value = selectedFilterRoom.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterRoom.value.push(label);
  }
};

const filterBedRoomList = ref(["MAWAR I", "MAWAR II"]);
const selectedFilterBedRoom = ref<string[]>([]);
const onFilterBedRoomSelect = (label: string) => {
  if (selectedFilterBedRoom.value.includes(label)) {
    selectedFilterBedRoom.value = selectedFilterBedRoom.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterBedRoom.value.push(label);
  }
};
// !SECTION

// SECTION IGD
const filterPatientList = ref(["DATA LENGKAP", "DATA TIDAK LENGKAP"]);
const selectedFilterPatient = ref<string[]>([]);
const onFilterPatientSelect = (label: string) => {
  if (selectedFilterPatient.value.includes(label)) {
    selectedFilterPatient.value = selectedFilterPatient.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterPatient.value.push(label);
  }
};
// !SECTION

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

const filters = [
  selectedFilterPoli,
  selectedFilterRegisterMethod,
  selectedFilterRoom,
  selectedFilterBedRoom,
  selectedFilterPatient,
  selectedPaymentMethod,
];

const resetFilter = () => {
  filters.forEach((filter) => {
    filter.value = [];
  });
  startDateFilter.value = new Date();
  endDateFilter.value = new Date();
  searchPatientFilter.value = "";
  searchDPJPFilter.value = "";
};
defineExpose({
  resetFilter,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" noBorder>
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <CustomButton icon="PhArrowClockwise" class="mr-5" />
          <span class="leading-10 text-adameds-300 text-heading">
            {{
              pageType == "rawat-jalan"
                ? "Rawat Jalan"
                : pageType == "rawat-inap"
                ? "Rawat Inap"
                : "IGD"
            }}
          </span>
        </div>
        <CustomButton
          @click="emit('daftar')"
          icon="PhPlus"
          label="Daftar"
          class="mr-[10px]"
        />
      </div>
    </template>
    <template #content>
      <div class="flex mt-[10px]">
        <CustomTextfield
          v-model="searchPatientFilter"
          label="Cari Pasien"
          placeholder="Cari Nama / address / No. RM"
          class="mr-5 grow"
        />
        <CustomSelect
          v-model="searchDPJPFilter"
          label="DPJP"
          class="mr-5 grow"
          optionLabel=""
          optionValue=""
          :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
          prependIcon="PhMagnifyingGlass"
        />
        <CustomDatePicker
          v-model="startDateFilter"
          label="Tanggal"
          class="w-[150px]"
        />
        <PhMinus class="mt-auto mb-3 mx-[10px] text-black" />
        <CustomDatePicker
          v-model="endDateFilter"
          :showLabel="false"
          class="mt-auto w-[150px]"
        />
        <CustomButton
          icon="PhMagnifyingGlass"
          label="Cari"
          class="ml-5 mr-[10px] mt-auto"
        />
        <CustomButton
          @click="resetFilter"
          label="Reset"
          outlined
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
          class="mt-auto"
        />
      </div>
      <div class="font-semibold text-SM text-grey-300">
        <div v-if="pageType == 'rawat-jalan'">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Poli</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(poli, index) in filterPoliList"
                :key="poli + index"
                :label="poli"
                class="ml-[10px]"
                :isSelected="selectedFilterPoli.includes(poli)"
                @selected="onPoliSelect"
              />
            </div>
          </div>
          <div class="flex my-[10px]">
            <div class="w-[15%]">Filter Cara Daftar</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(method, index) in filterRegisterMethod"
                :key="method + index"
                :label="method"
                borderColor="border-adameds-300"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                :iconSize="16"
                class="ml-[10px]"
                selectedColor="bg-adameds-300 border-adameds-300"
                :isSelected="selectedFilterRegisterMethod.includes(method)"
                @selected="onRegisterMethodSelect"
              />
            </div>
          </div>
        </div>
        <div v-else-if="pageType == 'rawat-inap'">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Ruangan</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(room, index) in filterRoomList"
                :key="room + index"
                :label="room"
                class="ml-[10px]"
                :isSelected="selectedFilterRoom.includes(room)"
                @selected="onFilterRoomSelect"
              />
            </div>
          </div>
          <div class="flex my-[10px]">
            <div class="w-[15%]">Filter Kamar</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(bedRoom, index) in filterBedRoomList"
                :key="bedRoom + index"
                :label="bedRoom"
                class="ml-[10px]"
                :isSelected="selectedFilterBedRoom.includes(bedRoom)"
                @selected="onFilterBedRoomSelect"
              />
            </div>
          </div>
        </div>
        <div v-else-if="pageType == 'igd'">
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Pasien</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(patientType, index) in filterPatientList"
                :key="patientType + index"
                :label="patientType"
                class="ml-[10px]"
                :isSelected="selectedFilterPatient.includes(patientType)"
                @selected="onFilterPatientSelect"
              />
            </div>
          </div>
        </div>
        <div class="flex my-[10px]">
          <div class="w-[15%]">Filter Pembayaran</div>
          <div class="flex">
            |
            <CustomChip
              label="TUNAI"
              borderColor="border-adameds-300"
              bgColor="bg-adameds-50"
              iconColor="text-adameds-300"
              textColor="text-adameds-300"
              customClass="h-5"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('TUNAI')"
              @selected="onPaymentMethodSelect"
              selectedColor="bg-adameds-300 border-adameds-300"
            />
            <CustomChip
              label="ASURANSI"
              borderColor="border-warning-300"
              bgColor="bg-warning-50"
              iconColor="text-warning-300"
              textColor="text-warning-300"
              customClass="h-5"
              class="ml-[10px]"
              :isSelected="selectedPaymentMethod.includes('ASURANSI')"
              @selected="onPaymentMethodSelect"
              selectedColor="bg-warning-300 border-warning-300"
            />
          </div>
        </div>
      </div>
      <hr class="border-grey-200" />
    </template>
    <template #collapseIcon>
      <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" />
    </template>
    <template #expandIcon>
      <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" />
    </template>
  </CustomAccordion>
</template>
