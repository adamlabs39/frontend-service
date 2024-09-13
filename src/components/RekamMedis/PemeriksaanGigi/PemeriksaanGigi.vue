<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import OdontogramInput from "./OdontogramInput.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps({
  header: {
    type: String,
    default: 'Pemeriksaan Gigi'
  },
  method: {
    type: String,
    default: "form",
  },
});

const diastema = ref(false);
const toothAnomaly = ref(false);
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>{{ header }}</template>
    <template #content>
      <div class="pt-5">
        <OdontogramInput />
        <div class="grid grid-cols-3 gap-x-[30px] gap-y-5 mt-[30px]">
          <CustomSelect
            label="Oklusi"
            placeHolder="Pilih Oklusi"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['KTP', 'Passport', 'SIM', 'Lainya']"
          />
          <CustomSelect
            label="Torus Palatinus"
            placeHolder="Pilih Torus Palatinus"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['KTP', 'Passport', 'SIM', 'Lainya']"
          />
          <CustomSelect
            label="Torus Mandibularis"
            placeHolder="Pilih Torus Mandibularis"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['KTP', 'Passport', 'SIM', 'Lainya']"
          />
          <CustomSelect
            label="Palatum"
            placeHolder="Pilih Palatum"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['KTP', 'Passport', 'SIM', 'Lainya']"
          />
          <CustomSelect
            label="Frenulum Labalis"
            placeHolder="Pilih Frenulum Labalis"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['KTP', 'Passport', 'SIM', 'Lainya']"
          />
          <CustomSelect
            label="Frenulum Lingualis"
            placeHolder="Pilih Frenulum Lingualis"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['KTP', 'Passport', 'SIM', 'Lainya']"
          />
          <CustomSwitch v-model="diastema" label="Diastema" />
          <CustomTextArea
            v-if="diastema"
            label="Keterangan Diasterma"
            class=""
            placeholder="Masukkan Keterangan Diasterma"
            height="h-10"
          />
          <CustomSwitch v-model="toothAnomaly" label="Gigi Anomali" />
          <CustomTextArea
            v-if="toothAnomaly"
            label="Keterangan Gigi Anomali"
            class=""
            placeholder="Masukkan Keterangan Gigi Anomali"
            height="h-10"
          />
          <div class="grid grid-cols-3 gap-4">
            <CustomInputNumber label="Jml. Gigi Decayed" showButtons />
            <CustomInputNumber label="Jml. Gigi Missing" showButtons />
            <CustomInputNumber label="Jml. Gigi Filled" showButtons />
          </div>
          <CustomTextArea
            label="Temuan Lainnya"
            placeholder="Masukkan Temuan Lainnya"
            class="col-span-3"
          />
          <CustomTextArea
            label="Keterangan Tindakan Gigi"
            placeholder="Masukkan Keterangan Tindakan Gigi"
            class="col-span-3"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-grey-300"
          borderColor="border-2 border-grey-200"
          outlined
        />
        <CustomButton label="Simpan" />
        <!-- <CustomButton v-if="props.method=='detail'" label="Edit" /> -->
      </div>
    </template>
  </CustomAccordion>
</template>
