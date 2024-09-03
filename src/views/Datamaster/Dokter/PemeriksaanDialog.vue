<script setup lang="ts">
import InfoRow from "../../../components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
const props = defineProps({
  isDialogVisible: {
    default: false,
  },
});
const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}
</script>

<template>
  <CustomDialog
    width="800px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>Kuota & Waktu Pemeriksaan</template>
    <template #body>
      <div class="flex flex-col mt-5 gap-5">
        <!-- Data Dokter -->
        <div class="flex flex-col gap-5">
          <div class="my-2.5 font-bold text-heading leading-8">
            Data Praktisi
          </div>
          <hr class="border-grey-200" />
          <div class="flex">
            <div class="w-1/2 flex flex-col gap-5">
              <InfoRow label="Kode HFIS (BPJS)" value="123" />
              <InfoRow label="Kode Dokter" value="DTR" />
              <InfoRow label="Nama Lengkap" value="dr. Spesialis Sp. A" />
              <InfoRow label="Tanggal Lahir" value="01-01-2000" />
            </div>
            <div class="w-1/2 flex flex-col gap-5">
              <InfoRow label="Kode SIP" value="827394" />
              <InfoRow label="NIK" value="0000000000000000" />
              <InfoRow label="STR" value="1000000000000000" />
              <InfoRow label="Jenis Kelamin" value="Laki-laki" />
            </div>
          </div>
        </div>
        <!-- Data Poli -->
        <CustomAccordion headerClass="" initialState="0">
          <template #header>
            <div class="-ml-4 font-bold text-heading">Poli Anak</div>
          </template>
          <template #content>
            <div class="grid grid-cols-12 gap-5 pt-5 -mx-4">
              <CustomInputNumber
                label="Kuota JKN"
                placeholder="0"
                class="col-span-6"
              >
                <template #appendText>
                  <div class="flex justfy-center items-center m-2.5">
                    Pasien
                  </div>
                </template>
              </CustomInputNumber>
              <CustomInputNumber
                label="Kuota Non-JKN"
                placeholder="0"
                class="col-span-6"
              >
                <template #appendText>
                  <div class="flex justfy-center items-center m-2.5">
                    Pasien
                  </div>
                </template>
              </CustomInputNumber>
              <CustomDatePicker :time-only="true" class="col-span-6" />
              <CustomTextfield
                label="Durasi Pelayanan"
                placeholder="00:00"
                type="number"
                class="col-span-6"
              >
                <template #appendText>
                  <div class="flex justfy-center items-center m-2.5">Menit</div>
                </template>
              </CustomTextfield>
            </div>
          </template>
        </CustomAccordion>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton label="EDIT"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
