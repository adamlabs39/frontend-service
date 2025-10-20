<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate, formatDate } from "@/utils/Helpers";
import { computed } from 'vue';
import type { PropType } from 'vue';

// Definisikan interface sesuai dengan respons API (menggunakan camelCase)
interface TandaVitalHistoryItem {
  kriteriaPemantauan?: string;
  waktuAsesmen?: number;
  frekuensiNafas?: number;
  frekuensiNadi?: number;
  suhu?: number;
  crt?: boolean;
  bloodOxygen?: number;
  gulaDarah?: number;
  oksigenTambahan?: boolean;
  tekananDarahSistole?: number;
  tekananDarahDiastole?: number;
  respirasiAnak?: string;
  kardiovaskulerAnak?: string;
  keadaanUmum?: string;
  petugas?: string;
  createdAt: number;
}

const props = defineProps({
  history: {
    type: Object as PropType<TandaVitalHistoryItem | null>,
    default: null,
  },
});

// Helper untuk menampilkan nilai atau "-" jika tidak ada
const getValue = (value: any) => value ?? "-";

// Helper khusus untuk boolean, mengubah true/false menjadi Ya/Tidak
const getBooleanValue = (value?: boolean) => {
  if (value === undefined || value === null) return "-";
  return value ? "Ya" : "Tidak";
};

// Menggabungkan tekanan darah menjadi satu string
const tekananDarah = computed(() => {
  if (props.history?.tekananDarahSistole && props.history?.tekananDarahDiastole) {
    return `${props.history.tekananDarahSistole} / ${props.history.tekananDarahDiastole} mmHg`;
  }
  return "-";
});
</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
      <template #header>
        {{ epochToDate(history.createdAt, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow 
            label="Kriteria Pemantauan" 
            :value="getValue(history.kriteriaPemantauan)" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Tgl. Asesmen" 
            :value="history.waktuAsesmen ? formatDate(epochToDate(history.waktuAsesmen) as Date) : '-'" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Jam Asesmen" 
            :value="history.waktuAsesmen ? String(epochToDate(history.waktuAsesmen, 'time')) : '-'" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Frekuensi Napas" 
            :value="`${getValue(history.frekuensiNafas)} x/mnt`" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Frekuensi Nadi" 
            :value="`${getValue(history.frekuensiNadi)} x/mnt`" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Suhu" 
            :value="`${getValue(history.suhu)} °C`" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Capilarry Refill Time ( CRT > 2 Detik )" 
            :value="getBooleanValue(history.crt)" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Blood Oxygen" 
            :value="`${getValue(history.bloodOxygen)} %`" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Gula Darah" 
            :value="`${getValue(history.gulaDarah)} mg/dL`" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Oksigen Tambahan" 
            :value="getBooleanValue(history.oksigenTambahan)" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Tekanan Darah" 
            :value="tekananDarah" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Respirasi Anak" 
            :value="getValue(history.respirasiAnak)" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Kardiovaskuler Anak" 
            :value="getValue(history.kardiovaskulerAnak)" 
            type="vertical" 
          />
          <CustomInfoRow 
            label="Keadaan Umum" 
            :value="getValue(history.keadaanUmum)" 
            type="vertical" 
          />
          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow 
              label="Petugas Input" 
              :value="getValue(history.petugas)" 
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
  <div v-else class="text-center p-4 text-grey-400">
    Tidak ada data riwayat.
  </div>
</template>