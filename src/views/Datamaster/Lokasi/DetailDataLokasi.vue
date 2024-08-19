<script lang="ts" setup>
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import InfoRow from "../../../components/Base/CustomInfoRow.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

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
  <CustomDialog width="600px" :visible="isDialogVisible" @update:visible="updateVisibility" headerBg="bg-adameds-300">
    <template #header>Detail Data Lokasi</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex flex-col">
          <div class="my-2.5 font-bold text-heading leading-8">Data Dokter</div>
          <hr class="border-grey-200" />
          <div class="flex flex-col gap-5 mt-5">
            <InfoRow label="Kode Lokasi" value="DL" />
            <InfoRow label="Nama Lokasi" value="Departemen Laporat" />
            <InfoRow label="Deskripsi" value="deskripsi" />
            <InfoRow label="No. Telephone" value="08628292" />
            <InfoRow label="E-mail" value="Dep-Lab@gmail.com" />
            <InfoRow label="Url" value="www.Dep0Laborat.com" />
            <InfoRow label="Tipe" value="Level" />
            <InfoRow label="Kelas" value="-" />
            <InfoRow label="Part Of Id" value="a0fddeae-20b6-472d-99c1-bcf956c92de0" />
            <InfoRow label="Part Of Name" value="Laboratorium" />
            <InfoRow label="Organization ID" value="498cdfc1-78fa-462c-ad5f-6936258aa25f" />
            <InfoRow label="ID SATUSEHAT" value="a0fddeae-20b6-472d-99c1-bcf956c92de0" />
            <hr class="border-grey-200" />
            <InfoRow label="Status">
              <template #value>
                <CustomChip label="NON-AKTIF" />
              </template>
            </InfoRow>
            <InfoRow label="Status Operasional">
              <template #value>
                <CustomChip label="NON-AKTIF" />
              </template>
            </InfoRow>
            <InfoRow label="Status SATUSEHAT">
              <template #value>
                <CustomChip label="NON-AKTIF" />
              </template>
            </InfoRow>
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
