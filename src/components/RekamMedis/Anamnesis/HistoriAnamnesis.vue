<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";

const props = defineProps({
  history: {
    type: Object,
    default: null,
  },
});
</script>
<!-- 
<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Anamnesis" :value="`anamnesis`" type="vertical" />
        <CustomInfoRow
          label="Keluhan Utama"
          :value="`keluhanUtama`"
          type="vertical"
        />
        <CustomInfoRow
          label="Riwayat Penyakit"
          :value="`riwayatPenyakit`"
          type="vertical"
        />
        <CustomInfoRow
          label="Tingkat Keparahan"
          value="Tidak terlalu parah"
          type="vertical"
        />
        <CustomInfoRow label="Pernah Dirawat" value="Tidak" type="vertical" />
        <CustomInfoRow
          label="Riwayat Pengobatan"
          :value="`riwayatPengobatan`"
          type="vertical"
        />
        <CustomInfoRow
          label="Riwayat Penyakit Keluarga"
          :value="`Tidak Ada`"
          type="vertical"
        >
        </CustomInfoRow>

        <CustomInfoRow
          label="Pengetahuan Tentang Penyakit Saat Ini"
          value="Tidak ada"
          type="vertical"
        />
        <hr class="border-grey-200" type="vertical" />
        <div class="flex justify-between">
          <CustomInfoRow
            label="Petugas Input"
            :value="`petugas`"
            type="vertical"
          />
          <CustomInfoRow
            label="Jam Input"
            :value="`petugas`"
            type="vertical"
            alignment="right"
          />
        </div>
      </div>
    </template>
  </CustomAccordion>
</template> -->

<template>
  <div v-if="history && history.data">
    <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
      <template #header>
      {{ epochToDate(history.data.createdAt, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow label="Anamnesis" :value="history.data.anamnesis" type="vertical" />
          <CustomInfoRow label="Keluhan Utama" :value="history.data.keluhanUtama" type="vertical" />
          <CustomInfoRow label="Riwayat Penyakit" :value="history.data.riwayatPenyakit" type="vertical" />
          <CustomInfoRow label="Pernah Dirawat" :value="history.data.pernahDirawat ? 'Ya' : 'Tidak'" type="vertical" />
          <CustomInfoRow label="Riwayat Pengobatan" :value="history.data.riwayatPengobatan" type="vertical" />
          <CustomInfoRow label="Riwayat Penyakit Keluarga" :value="history.data.riwayatKeluarga" type="vertical" />
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow label="Petugas Input" :value="history.data.petugas" type="vertical" />
            <CustomInfoRow
              label="Jam Input"
              :value="String(epochToDate(history.data.createdAt, 'time'))"
              type="vertical"
              alignment="right"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>
  </div>
  <div v-else class="text-center p-4 text-grey-400">
    Tidak ada data riwayat.
  </div>
</template>