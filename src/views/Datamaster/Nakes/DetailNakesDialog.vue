<script lang="ts" setup>
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
    width="600px"
    :visible="isDialogVisible" @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>Detail Data Pegawai</template>
    <template #body>
      <div class="flex flex-col gap-5">
        <div class="mt-2.5 font-bold text-heading leading-8">Data Pegawai - Nakes</div>
        <hr class="border-grey-200" />
        <div class="flex">
          <div class="flex flex-col w-1/2 gap-5">
            <InfoRow label="NIK" value="00000000" />
            <InfoRow label="No. STR" value="00000000" />
            <InfoRow label="Nama Lengkap" value="dr. Spesialis Sp. A" />
            <InfoRow label="Tanggal Lahir" value="01-01-2000" />
            <InfoRow label="Jenis Kelamin" value="Laki-laki" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
        <div class="mt-5 flex justify-end gap-2.5">
          <!-- <CustomButton
            label="Batal"
            @click="detailNakesDialog = false"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
          >
          </CustomButton> -->
          <CustomButton label="Simpan"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
