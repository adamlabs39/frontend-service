<script setup lang="ts">
import InfoRow from "../../../components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
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
    :visible="isDialogVisible" @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>Detail Praktisioner</template>
    <template #body>
      <div class="flex flex-col mt-5 gap-5">
        <!-- Data Dokter -->
        <div class="flex flex-col gap-5">
          <div class="my-2.5 font-bold text-heading leading-8">Data Praktisioner</div>
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
        <div class="flex flex-col gap-5">
          <div class="my-2.5 font-bold text-heading leading-8">Poli Anak</div>
          <hr class="border-grey-200" />
          <div class="flex">
            <div class="w-1/2 flex flex-col gap-5">
              <InfoRow label="Kuota JKN" value="20 Pasien" />
              <InfoRow label="Waktu Pelayanan" value="09:00-13:00" />
            </div>
            <div class="w-1/2 flex flex-col gap-5">
              <InfoRow label="kuota Non-JKN" value="10 Pasien" />
              <InfoRow label="Durasi Pelayanan" value="20 Menit" />
            </div>
          </div>
        </div>
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
