<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";

const pemeriksaan = ref([
  { name: "Hipertensi", key: "H" },
  { name: "Penyakit Jantung", key: "PJ" },
  { name: "Stroke", key: "S" },

]);
const pemeriksaanPaket=ref([
  {

  }
])
const checkPemeriksaan = ref();
const testCheckboxMulti = ref([]);
const testCheckbox = ref(false);
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Order Lab</template>
    <template #content>
      <div class="flex flex-col gap-5 pt-5">
        <CustomDatePicker label="Tgl. Pemeriksaan Lab" />
        <div class="mt-5 font-semibold text-MD">Tarif Pemeriksaan</div>
        <hr class="border-grey-200" />
        <CustomAccordion headerClass="bg-adameds-50" initial-state="0">
          <template #header>HEMATOLOGI</template>
          <template #content>
            <div class="flex flex-wrap gap-2.5 pt-5">
              <div v-for="pemeriksaan of pemeriksaan" :key="pemeriksaan.key">
                <CustomCheckbox
                  v-model="testCheckboxMulti"
                  :binary="false"
                  endText=""
                  :value="pemeriksaan.name"
                  :title="pemeriksaan.name"
                  title-class="text-normal font-normal"
                  sub-title=""
                />
              </div>
            </div>
          </template>
        </CustomAccordion>
        <div class="font-semibold text-MD">Tarif Pemeriksaan - Paket</div>
        <hr class="border-grey-200" />

        <div class="flex flex-wrap gap-2.5">
          <div v-for="pemeriksaan of pemeriksaan" :key="pemeriksaan.key">
            <CustomCheckbox
              v-model="testCheckboxMulti"
              :binary="false"
              endText=""
              value="pemeriksaan.name"
              title="MCU PT. Wahana"
              title-class="text-normal font-semibold"
              sub-title="Darah Lengkap, Urine Lengkap, Golongan Darah, SGOT, SGPT"
              sub-title-class="text-SM font-normal text-grey-400"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomAccordion>
</template>
