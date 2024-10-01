<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <CustomInfoRow label="Kasus" value="Kasus" type="vertical" />
        <CustomInfoRow
          label="Cara Datang"
          value="Cara Datang"
          type="vertical"
        />
        <CustomInfoRow label="Kendaraan" value="Kendaraan" type="vertical" />
        <CustomInfoRow
          label="Keadaan Umum"
          value="Keadaan Umum"
          type="vertical"
        />
        <CustomInfoRow label="Asal Rujukan" value="-" type="vertical" />
        <hr class="border-grey-200" type="vertical" />
        <CustomInfoRow label="Mata" value="Respon" type="vertical" />
        <CustomInfoRow label="Motorik" value="Respon" type="vertical" />
        <CustomInfoRow label="Verbal" value="Respon" type="vertical" />
        <CustomInfoRow
          label="Glasglow Coma Scale (GCS) Score"
          value="score"
          type="vertical"
        />
        <CustomInfoRow label="Tekanan Darah" value="0/0 mmHg" type="vertical" />
        <CustomInfoRow
          label="Frekuensi Nafas"
          value="0 x/mnt"
          type="vertical"
        />
        <CustomInfoRow label="Frekuensi Nadi" value="0 x/mnt" type="vertical" />
        <CustomInfoRow
          label="Capillary Refill Time (CRT > 2 detik)"
          value="Tidak"
          type="vertical"
        />
        <CustomInfoRow label="Suhu" value="0 °C" type="vertical" />
        <CustomInfoRow label="Blood Oxygen" value="0 %" type="vertical" />
        <hr class="border-grey-200" type="vertical" />
        <CustomInfoRow label="Kesimpulan Triase" value="-" type="vertical" />
        <div
          class="h-10 w-[60px] border border-grey-200 cursor-pointer bg-info-300 rounded-md mt-auto flex"
        >
          <PhCheckCircle :size="25" weight="fill" class="m-auto text-white" />
        </div>
        <hr class="border-grey-200" type="vertical" />
        <div class="flex justify-between">
          <CustomInfoRow
            label="Petugas Input"
            value="Nama Petugas"
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
