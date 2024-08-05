<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const startDateFilter = ref<Date>(new Date());
const endDateFilter = ref<Date>(new Date());

const poliList = ref(["POLI UMUM", "POLI ANAK", "POLI GIGI POLI MATA", "APS"]);
const selectedPoli = ref<string[]>([]);
const onPoliSelect = (label: string) => {
  if (selectedPoli.value.includes(label)) {
    selectedPoli.value = selectedPoli.value.filter((item) => item != label);
  } else {
    selectedPoli.value.push(label);
  }
};

const registerMethod = ref(["ADMISI", "APM", "MOBILE APP"]);
const selectedRegisterMethod = ref<string[]>([]);
const onRegisterMethodSelect = (label: string) => {
  if (selectedRegisterMethod.value.includes(label)) {
    selectedRegisterMethod.value = selectedRegisterMethod.value.filter(
      (item) => item != label
    );
  } else {
    selectedRegisterMethod.value.push(label);
  }
};

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
</script>

<template>
  <Card>
    <template #header>
      <CustomAccordion :openWithHeader="false" noBorder>
        <template #header>
          <div class="flex justify-between w-full align-middle">
            <div class="flex">
              <CustomButton icon="PhArrowClockwise" class="mr-5" />
              <span class="leading-10 text-adameds-300 text-heading">
                Rawat Jalan
              </span>
            </div>
            <CustomButton icon="PhPlus" label="Daftar" class="mr-[10px]" />
          </div>
        </template>
        <template #content>
          <div class="flex mt-[10px]">
            <CustomTextfield
              label="Cari Pasien"
              placeholder="Cari Nama / Alamat / No. RM"
              class="mr-5 grow"
            />
            <CustomSelect label="DPJP" class="mr-5 grow" :options="[]" />
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
              label="Reset"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
              class="mt-auto"
            />
          </div>
          <div class="flex mb-[10px] mt-5">
            <div class="w-[15%]">Filter Poli</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(poli, index) in poliList"
                :key="poli + index"
                :label="poli"
                class="ml-[10px]"
                :isSelected="selectedPoli.includes(poli)"
                @selected="onPoliSelect"
              />
            </div>
          </div>
          <div class="flex my-[10px]">
            <div class="w-[15%]">Filter Cara Daftar</div>
            <div class="flex">
              |
              <CustomChip
                v-for="(method, index) in registerMethod"
                :key="method + index"
                :label="method"
                borderColor="border-adameds-300"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                :iconSize="16"
                class="ml-[10px]"
                selectedColor="bg-adameds-300 border-adameds-300"
                :isSelected="selectedRegisterMethod.includes(method)"
                @selected="onRegisterMethodSelect"
              />
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
        </template>
        <template #collapseIcon>
          <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" />
        </template>
        <template #expandIcon>
          <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" />
        </template>
      </CustomAccordion>
    </template>
  </Card>
</template>
