<script setup lang="ts">
import InfoRow from '../Layout/InfoRow.vue';
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from '@/components/Base/CustomChip.vue';

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
        :visible="isDialogVisible"
    @update:visible="updateVisibility"
        headerBg="bg-adameds-300"
      >
        <template #header>Detail Organisasi</template>
        <template #body>
          <div class="flex flex-col gap-5 mt-5">
      <div class="flex flex-col">
        <div class="my-2.5 font-bold text-heading leading-8">Data Organisasi</div>
        <hr class="border-grey-200" />
        <div class="flex flex-col gap-5 mt-5">
          <InfoRow label="Kode Organisasi" value="DL" />
            <InfoRow label="Nama Organisasi" value="Departemen Laporat" />
            <InfoRow label="No. Telephone" value="022-14045" />
            <InfoRow label="E-mail" value="Dep-Lab@gmail.com" />
            <InfoRow label="URL" value="www.Dep0Laborat.com" />
            <InfoRow label="Provinsi" value="Jawa Timur" />
            <InfoRow label="Kab/Kota" value="Surabaya" />
            <InfoRow label="Kecamatan" value="Sukolilo" />
            <InfoRow label="Kelurahan/Desa" value="Keputih" />
            <InfoRow label="Kode Pos" value="1234" />
            <InfoRow label="Alamat" value="Jl. Alamat" />
            <InfoRow label="Part Of Id" value="fae63a26-8b73-4464-8075-b0c54eb3b300" />
            <InfoRow label="Part Of Name" value="Laboratorium" />
            <InfoRow
              label="ID SATUSEHAT"
              value="a0fddeae-20b6-472d-99c1-bcf956c92de0"
            />
            <hr class="border-grey-200" />
            <InfoRow
              label="Status"
            >
              <template #value>
                <CustomChip label="NON-AKTIF" />
              </template>
            </InfoRow>
            <InfoRow
              label="Status SATUSEHAT"
            >
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
              <CustomButton
                label="Batal"
                border-color="border-grey-200"
                background-color="bg-white"
                text-color="text-grey-300"
              >
              </CustomButton>
              <CustomButton label="Simpan"> </CustomButton>
            </div>
          </div>
        </template>
      </CustomDialog>
    
  </template>
  