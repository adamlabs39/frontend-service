<script setup lang="ts">
import InfoRow from '../Layout/InfoRow.vue';
</script>

<template>
    <div class="flex flex-col mt-5 gap-5">
      <div class="flex flex-col">
        <div class="my-2.5 font-bold text-heading leading-8">Data Dokter</div>
        <hr class="border-grey-200" />
        <div class="flex flex-col mt-5 gap-5">
          <InfoRow label="Kode" value="DL" />
          <InfoRow label="Nama" value="Departemen Laporat" />
          <InfoRow label="No. Telephone" value="022-14045" />
          <InfoRow label="Email" value="Dep-Lab@gmail.com" />
          <InfoRow label="Url" value="www.Dep0Laborat.com" />
          <InfoRow label="Alamat" value="Jl. Alamat" />
          <InfoRow label="Kota" value="Surabaya" />
          <InfoRow label="Kode Pos" value="1234" />

        </div>
      </div>
    </div>
  </template>
  