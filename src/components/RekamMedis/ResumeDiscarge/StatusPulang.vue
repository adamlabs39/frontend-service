<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";

const statusPulang = ref([
  { status: "Pulang Atas Persetujuan Dokter" },
  { status: "Pulang Atas Permintaan Sendiri" },
  { status: "Dirujuk" },
  { status: "Meninggal < 48 Jam" },
  { status: "Meninggal > 48 Jam" },
  { status: "Lainnya" },
]);
const selectedStatus = ref();
const rujukan = ref();
</script>

<template>
  <CustomAccordion initial-state="0" header-class="bg-adameds-50">
    <template #header> Status Pulang </template>
    <template #content>
      <div class="flex flex-col gap-5 pt-5">
        <div class="flex gap-[30px]">
          <CustomSelect
            v-model="selectedStatus"
            label="Status Pulang"
            place-holder="Pilih Status Pulang"
            :options="statusPulang"
            optionValue="status"
            optionLabel="status"
            class="grow"
          />
          <CustomTextfield
            v-if="selectedStatus === 'Lainnya'"
            label="Lainnya"
            placeholder="Lainnya"
          />
          <CustomDatePicker label="Tanggal Discharge" class="col-span-1" />
        </div>
        <div v-if="selectedStatus === 'Dirujuk'" class="flex flex-col gap-5">
          <hr class="border-grey-200 my-2.5" />

          <div class="flex gap-[30px]">
            <div
              class="grid grid-cols-2 gap-x-5 pr-[30px] border-r border-grey-200"
            >
              <div class="col-span-2 font-semibold text-MD">Rujukan</div>
              <CustomRadio
                v-for="data in ['Internal', 'Eksternal']"
                v-model="rujukan"
                :sideLabel="data"
                :value="data"
              />
            </div>
            <CustomSelect
              label="Rujukan Internal"
              place-holder="Pilih Rujukan Internal"
              class="grow"
            />
            <CustomTextfield
              label="Keterangan Rujukan Internal"
              placeholder="Keterangan Rujukan Internal"
              class="grow"
            />
          </div>
          <div class="flex gap-[30px]">
            <CustomSelect
              label="Instruksi Kontrol Ke"
              place-holder="Pilih Instruksi Kontrol Ke"
              class="grow"
            />
            <CustomTextfield
              label="Instruksi Kontrol Ke Lainnya"
              placeholder="Instruksi Kontrol Ke Lainnya"
              class="grow"
            />
            <CustomDatePicker label="Tanggal Instruksi" />
          </div>
          <div class="flex gap-[30px]">
            <CustomTextfield label="No. Darurat" class="grow" />
            <CustomSelect
              label="Transportasi"
              place-holder="Pilih Transportasi"
              class="grow"
            />
            <CustomTextfield
              label="Transportasi Lainnya"
              placeholder="Transportasi Lainnya"
              class="grow"
            />
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
