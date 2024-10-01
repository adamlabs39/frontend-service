<script setup lang="ts">
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomInfoRow from "../../../components/Base/CustomInfoRow.vue";
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
    <template #header>Detail Data Praktisi</template>
    <template #body>
      <div class="flex flex-col mt-5 gap-5">
        <!-- Data Dokter -->
        <div class="flex flex-col gap-5">
          <div class="font-bold text-heading">Data Praktisi</div>
          <hr class="border-grey-200" />
          <div class="flex flex-col gap-5">
            <CustomInfoRow label="Nama Lengkap" value="dr. Spesialis Sp. A" />
            <CustomInfoRow label="NIK" value="0000000000000000000000000" />
            <CustomInfoRow label="Tanggal Lahir" value="01-01-2000" />
            <CustomInfoRow label="Jenis Kelamin" value="Laki-laki" />
            <CustomInfoRow label="Kode HFIS (BPJS)" value="123" />
            <CustomInfoRow label="SIP" value="1234" />
            <CustomInfoRow label="STR" value="1234" />
            <CustomInfoRow label="Poli">
              <template #value>
                <CustomChip
                  label="Anak"
                  bg-color="bg-adameds-300"
                  text-color="text-white"
                  :showCheckedIcon="false"
                  border-color="border-adameds-300"
                />
              </template>
            </CustomInfoRow>
            <CustomInfoRow label="Kode Antrian Dokter" value="01" />
            <hr class="col-span-2 border-gray-200" />
            <CustomInfoRow label="Status">
              <template #value>
                <CustomChip
                  label="AKTIF"
                  bg-color="bg-adameds-300"
                  text-color="text-white"
                  icon-color=""
                  border-color="border-adameds-300"
                />
              </template>
            </CustomInfoRow>
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
