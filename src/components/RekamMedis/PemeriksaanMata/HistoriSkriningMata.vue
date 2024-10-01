<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
          Tajam Penglihatan menggunakan Tes Uncorrected Snelled Chart
        </div>
        <CustomInfoRow
          label="Pemeriksaan Visus Kanan"
          value="-"
          type="vertical"
        />
        <hr class="border-adameds-300" />
        <CustomInfoRow
          label="Pemeriksaan Visus Kiri"
          value="-"
          type="vertical"
        />
        <hr class="-mx-4 border-grey-200 mt-[10px]" />

        <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
          Katarak
        </div>
        <CustomInfoRow
          label="Pemeriksaan Pinhole Kanan"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Pemeriksaan Segment Anterior (Pupil) Kanan*"
          value="-"
          type="vertical"
        />
        <hr class="border-adameds-300" />
        <CustomInfoRow
          label="Pemeriksaan Pinhole Kiri"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Pemeriksaan Segment Anterior (Pupil) Kiri*"
          value="-"
          type="vertical"
        />
        <hr class="-mx-4 border-grey-200 mt-[10px]" />

        <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
          Jika Pemeriksaan Pupil hasilnya Positif, maka dilanjutkan pemeriksaan
          dengan Oftalmoskop/Shadow test
        </div>
        <CustomInfoRow
          label="Pemeriksaan Reflek Fundus Kanan"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Pemeriksaan Shadow Test Kanan"
          value="-"
          type="vertical"
        />
        <hr class="border-adameds-300" />
        <CustomInfoRow
          label="Pemeriksaan Reflek Fundus Kiri"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Pemeriksaan Shadow Test Kiri"
          value="-"
          type="vertical"
        />
        <hr class="-mx-4 border-grey-200 mt-[10px]" />

        <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
          Kelainan Refraksi Mata Jauh
        </div>
        <div class="font-semibold underline text-normal">
          Pemeriksaan Refraksi Subjektif Jauh Mata Kanan
        </div>
        <div class="grid grid-cols-3 gap-y-[19px]">
          <CustomInfoRow label="Sph" value="-" type="vertical" />
          <CustomInfoRow label="Cyl" value="-" type="vertical" />
          <CustomInfoRow label="Axis" value="-" type="vertical" />
        </div>
        <div class="font-semibold underline text-normal">
          Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kanan
        </div>
        <div class="grid grid-cols-2">
          <CustomInfoRow label="Nilai" value="-" type="vertical" />
          <CustomInfoRow label="Hasil" value="-" type="vertical" />
        </div>
        <div class="font-semibold underline text-normal">
          Pemeriksaan Refraksi Subjektif Jauh Mata Kiri
        </div>
        <div class="grid grid-cols-3 gap-y-[19px]">
          <CustomInfoRow label="Sph" value="-" type="vertical" />
          <CustomInfoRow label="Cyl" value="-" type="vertical" />
          <CustomInfoRow label="Axis" value="-" type="vertical" />
        </div>
        <div class="font-semibold underline text-normal">
          Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kiri
        </div>
        <div class="grid grid-cols-2">
          <CustomInfoRow label="Nilai" value="-" type="vertical" />
          <CustomInfoRow label="Hasil" value="-" type="vertical" />
        </div>
        <hr class="-mx-4 border-grey-200 mt-[10px]" />

        <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
          Jika hasil pemeriksaan adalah buta, maka dilakukan pemeriksaan
          lanjutan
        </div>
        <CustomInfoRow
          label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Warna Kanan"
          value="-"
          type="vertical"
        />
        <hr class="border-adameds-300" />
        <CustomInfoRow
          label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Warna Kiri"
          value="-"
          type="vertical"
        />
        <hr class="-mx-4 border-grey-200 mt-[10px]" />

        <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
          Kelainan Refraksi Mata Dekat
        </div>
        <div class="font-semibold underline text-normal">
          Pemeriksaan Refraksi Dekat Mata Kanan
        </div>
        <CustomInfoRow
          label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +) Kanan"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Dicurigai Glaukoma pada mata Kanan"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Dicurigai Retinopati pada Mata Kanan"
          value="-"
          type="vertical"
        />
        <div class="font-semibold underline text-normal">
          Pemeriksaan Refraksi Dekat Mata Kiri
        </div>
        <CustomInfoRow
          label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +) Kiri"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Dicurigai Glaukoma pada mata Kiri"
          value="-"
          type="vertical"
        />
        <CustomInfoRow
          label="Dicurigai Retinopati pada Mata Kiri"
          value="-"
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
