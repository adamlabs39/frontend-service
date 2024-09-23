<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

const optionsStatusPulang = ref([
  { label: "Pulang Atas Persetujuan Dokter", value: "home" },
  { label: "Pulang Atas Permintaan Sendiri", value: "aadvice" },
  { label: "Dirujuk", value: "other-hfc" },
  { label: "Meninggal < 48 Jam", value: "exp-lt48h" },
  { label: "Meninggal > 48 Jam", value: "exp-gt48h" },
  { label: "Lainnya", value: "oth" },
]);
const optionsRujukInternal = ref(["Rawat Inap", "Kontrol Ulang", "Konsultasi"]);
const optionsRujukEksternal = ref(["Rawat Inap", "Rawat Jalan"]);
const optionsTujuanRujuk = ref([
  { label: "Poli", value: "OF" },
  { label: "Fasyankes (Rumah Sakit)", value: "HOSP" },
  { label: "Fasyankes (Klinik)", value: "PC" },
  { label: "Lain-lain", value: "oth" },
]);
const optionsTransportRujuk = ref([
  { label: "Ambulans", value: "AMB" },
  { label: "oth", value: "Lain-lain" },
]);
const optionsIsInternal = ref([
  { label: "Internal", value: true },
  { label: "Eksternal", value: false },
]);
const statusPulang = ref();
const pengantarRujukan = ref();
const dischargeDate = ref<Date>(new Date());
const statusPulangKeterangan = ref();
const isInternal = ref();
const instruksiTindakLanjut = ref();
const rujukInternal = ref();
const rujukEksternal = ref();
const tujuanRujuk=ref()
const tujuanRujukLainnya=ref()
const instruksiNoDarurat=ref()
const transportRujuk=ref()
const transportRujukLainnya=ref()
const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>
<template>
  <CustomAccordion initial-state="0" header-class="bg-adameds-50" ref="accordion">
    <template #header> Status Pulang </template>
    <template #content>
      <div class="flex flex-col gap-5 pt-5">
        <div class="flex gap-[30px]">
          <CustomSelect
            v-model="statusPulang"
            label="Status Pulang"
            place-holder="Pilih Status Pulang"
            :options="optionsStatusPulang"
            optionValue="value"
            optionLabel="label"
            class="grow"
          />
          <CustomTextfield
            v-if="statusPulang === 'oth'"
            v-model="statusPulangKeterangan"
            label="Keterangan"
            placeholder="Keterangan"
          />
          <CustomDatePicker
            v-model="dischargeDate"
            label="Tanggal Discharge"
            class="col-span-1"
          />
        </div>
        <div v-if="statusPulang === 'other-hfc'" class="flex flex-col gap-5">
          <hr class="border-grey-200 my-2.5" />

          <div class="flex gap-[30px]">
            <div
              class="grid grid-cols-2 gap-x-5 pr-[30px] border-r border-grey-200"
            >
              <div class="col-span-2 font-semibold text-normal">Rujukan</div>
              <CustomRadio
                v-for="data in optionsIsInternal"
                v-model="isInternal"
                :sideLabel="data.label"
                :value="`${data.value}`"
              />
            </div>
            <CustomSelect
              v-if="isInternal"
              v-model="rujukInternal"
              :options="optionsRujukInternal"
              option-label=""
              option-value=""
              label="Rujukan Internal"
              place-holder="Pilih Rujukan Internal"
              class="grow"
            />
            <CustomSelect
              v-if="!isInternal"
              v-model="rujukEksternal"
              :options="optionsRujukEksternal"
              option-label=""
              option-value=""
              label="Rujukan Eksternal"
              place-holder="Pilih Rujukan Eksternal"
              class="grow"
            />
            <CustomTextfield
              label="Instruksi Tindak Lanjut"
              v-model="instruksiTindakLanjut"
              placeholder="Instruksi Tindak Lanjut"
              class="grow"
            />
          </div>
          <div class="flex gap-[30px]">
            <CustomSelect
              label="Tujuan Rujukan"
              v-model="tujuanRujuk"
              :options="optionsTujuanRujuk"
              option-label="label"
              option-value="value"
              place-holder="Pilih Tujuan Rujuk"
              class="grow"
            />
            <CustomTextfield
              label="Keterangan"
              v-model="statusPulangKeterangan"
              placeholder="Keterangan"
              class="grow"
            />
          </div>
          <div class="flex gap-[30px]">
            <CustomInputNumber
              label="No. Darurat"
              v-model="instruksiNoDarurat"
              placeholder="08xxx-xxxx-xxxx"
              class="grow"
            />
            <CustomSelect
              label="Transportasi"
              v-model="transportRujuk"
              :options="optionsTransportRujuk"
              option-label="label"
              option-value="value"
              place-holder="Pilih Transportasi"
              class="grow"
            />
            <CustomTextfield
              label="Transportasi Lainnya"
              v-model="transportRujukLainnya"
              placeholder="Transportasi Lainnya"
              class="grow"
            />
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
