<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

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
            label="Keterangan"
            placeholder="Keterangan"
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
            v-if="rujukan==='Internal'"
              label="Rujukan Internal"
              place-holder="Pilih Rujukan Internal"
              class="grow"
            />
            <CustomSelect
            v-if="rujukan==='Eksternal'"
              label="Rujukan Eksternal"
              place-holder="Pilih Rujukan Eksternal"
              class="grow"
            />
            <CustomTextfield
              label="Instruksi Tindak Lanjut"
              placeholder="Instruksi Tindak Lanjut"
              class="grow"
            />
          </div>
          <div class="flex gap-[30px]">
            <CustomSelect
              label="Tujuan Rujukan"
              place-holder="Pilih Tujuan Rujuk"
              class="grow"
            />
            <CustomTextfield
              label="Keterangan"
              placeholder="Keterangan"
              class="grow"
            />
          </div>
          <div class="flex gap-[30px]">
            <CustomInputNumber label="No. Darurat" placeholder="08xxx-xxxx-xxxx"  class="grow" />
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
