<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <CustomInfoRow
          label="Kriteria Pemantauan"
          :value="`kriteriaPemantauan`"
          type="vertical"
        />
        <CustomInfoRow
          label="Waktu Asesmen"
          :value="`${`waktuAsesmen`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Tgl. Asesmen"
          :value="`${`tanggalAsesmen`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Frekuensi Napas"
          :value="`${`frekuensiNafas`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Frekuensi Nadi"
          :value="`${`frekuensiNadi`}`"
          type="vertical"
        />
        <CustomInfoRow label="Suhu" :value="`${`suhu`}`" type="vertical" />
        <CustomInfoRow
          label="Capillary Refill Time (CRT > 2 Detik)"
          :value="`${`CRT`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Blood Oxygen"
          :value="`${`bloodOxygen`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Gula Darah"
          :value="`${`gulaDarah`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Oksigen Tambahan"
          :value="`${`oksigenTambahan`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Tekanan Darah"
          :value="`${`numerator`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Respirasi Anak"
          :value="`${`respirasiAnak`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Kardiovaskuler Anak"
          :value="`${`kardiovaskulerAnak`}`"
          type="vertical"
        />
        <CustomInfoRow
          label="Keadaan Umum"
          :value="`${`keadaanUmum`}`"
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
</template>
