<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";

const props = defineProps ({
  history: {
    type : Object,
    default : null,
  },
});
</script>

<!-- <template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <CustomInfoRow
          label="Pemicu Alergi"
          :value="`pemicuAlergi`"
          type="vertical"
        />
        <CustomInfoRow
          label="Nama / Jenis Alergi"
          :value="`namaAlergi`"
          type="vertical"
        />
        <CustomInfoRow label="Reaksi" :value="`reaksiAlergi`" type="vertical" />
        <CustomInfoRow
          label="Tingkat Keparahan"
          :value="`tingkatKeparahanAlergi`"
          type="vertical"
        />
        <CustomInfoRow
          label="Efek Samping"
          :value="`efekSampingAlergi`"
          type="vertical"
        />
        <CustomInfoRow
          label="Tanggal Kejadian"
          :value="`${`tanggalKejadianAlergi`}`"
          type="vertical"
        />
        <hr class="border-grey-200" />
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
 <div v-if="history">
 <CustomAccordion
 headerClass="bg-adameds-50"
 :initialState="'0'"
 >
<template #header>
      {{ epochToDate(history.createdAt, 'date') || "Data Riwayat" }}
    </template>
 <template #content>
 <div class="py-5 flex flex-col gap-[10px]">
 <CustomInfoRow
 label="Pemicu Alergi"
 :value="history.pemicuAlergi"
 type="vertical"
 />
 <CustomInfoRow
 label="Nama / Jenis Alergi"
 :value="history.namaAlergi"
 type="vertical"
 />
 <CustomInfoRow
 label="Reaksi"
 :value="history.reaksiAlergi"
 type="vertical"
 />
 <CustomInfoRow
 label="Tingkat Keparahan"
 :value="history.tingkatKeparahanAlergi"
 type="vertical"
 />
 <CustomInfoRow
 label="Efek Samping"
 :value="history.efekSampingAlergi"
 type="vertical"
 />
 <CustomInfoRow
 label="Tanggal Kejadian"
 :value="String(epochToDate(history.tanggalKejadianAlergi, 'date'))"
 type="vertical"
 />
 <hr class="border-grey-200" />
 <div class="flex justify-between">
 <CustomInfoRow
 label="Petugas Input"
 :value="history.petugas"
 type="vertical"
 />
 <CustomInfoRow
 label="Jam Input"
:value="String(epochToDate(history.createdAt, 'time'))"
 type="vertical"
 alignment="right"
 />
 </div>
 </div>
 </template>
 </CustomAccordion>
 </div>
 <div v-else class="text-center text-grey-400">Tidak ada riwayat.</div>
</template>