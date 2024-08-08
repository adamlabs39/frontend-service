<script lang="ts" setup>
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import VarianTarif from "@/components/Datamaster/VarianTarif.vue";
import KomponenTarif from "@/components/Datamaster/KomponenTarif.vue";
import { ref } from "vue";
const testDialog = ref(false);
</script>
<template>
  <div @click="testDialog = true">Show Detail Tarif Tindakan</div>
  <CustomDialog
    fullScreen
    v-model:visible="testDialog"
    headerBg="bg-adameds-300"
  >
    <template #header>Detail Tarif Tindakan</template>
    <template #body>
      <div class="flex flex-col h-full gap-2.5">
        <div class="flex items-center gap-2.5 my-2.5">
          <div class="min-w-[40px] min-h-[30px]">
            <CustomButton label="1" full />
          </div>
          <div class="grow font-bold text-MD">Pemeriksaan Dokter Umum</div>
          <CustomChip label="AKTIF" />
        </div>
        <div class="flex justify-between">
          <div>
            <div class="underline">Jumlah Varian Tarif</div>
            <div>4 Varian Tarif</div>
          </div>
          <div>
            <div class="underline">Kode Tindakan</div>
            <div>TDKU</div>
          </div>
          <div>
            <div class="underline">Snomed-CT</div>
            <div>Nama Tindakan Snomed-CT</div>
          </div>
          <div>
            <div class="underline">IDC 9-CM</div>
            <div>Nama Tindakan IDC 9</div>
          </div>
        </div>
        <div class="overflow-auto grow">
          <VarianTarif>
            <template #tarif>
              <KomponenTarif/>
            </template>
          </VarianTarif>
          <div class="border border-dashed border-adameds-300 rounded-lg flex items-center justify-center p-5 m-5">
          <CustomButton icon="PhPlus" label="Komponen Tarif" borderColor="border-adameds-300" textColor="text-adameds-300" backgroundColor="bg-white" />
        </div>
        </div>
      </div>

     
    </template>
    <template #footer>
      <CustomButton label="Batal"> </CustomButton>
      <CustomButton label="Simpan"> </CustomButton>
    </template>
  </CustomDialog>
</template>
