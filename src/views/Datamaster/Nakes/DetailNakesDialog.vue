<script lang="ts" setup>
import InfoRow from '../Layout/InfoRow.vue';
</script>
<template>
    <div class="flex flex-col gap-5">
      <div class="mt-2.5 font-bold text-heading leading-8">Data Nakes</div>
      <hr class="border-grey-200" />
      <div class="flex">
        <div class="flex flex-col w-1/2 gap-5">
          <InfoRow label="NIK" value="00000000"/>
          <InfoRow label="Nama Lengkap" value="dr. Spesialis Sp. A"/>
          <InfoRow label="Tanggal Lahir" value="01-01-2000"/>
        </div>
        <div class="flex flex-col justify-end w-1/2 gap-5">
          <InfoRow label="Jenis Kelamin" value="Laki-laki"/>
        </div>
      </div>
    </div>
</template>