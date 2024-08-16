<script lang="ts" setup>
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import TableTindakan from "@/components/Datamaster/TableTindakan.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import TableJenisPembayaranBed from "@/components/Datamaster/TableJenisPembayaranBed.vue";
const testDialog = ref(false);
</script>
<template>
  <div class="flex flex-col h-full gap-2.5">
    <div class="flex items-center justify-between w-full gap-2.5 my-2.5">
      <CustomSelect class="w-1/4" label="Jenis Tarif" place-holder="Jenis Tarif" />
      <CustomSelect class="grow" place-holder="Pelayanan" />
    </div>
    <div class="flex justify-between w-full gap-2.5">
      <CustomSelect class="w-1/3" label="Ruangan" place-holder="Ruangan" />
      <CustomAutoComplete class="grow" label="Metode Pembayaran"/>
    </div>
    <div class="overflow-auto grow">
      <TableJenisPembayaranBed />
    </div>
  </div>
</template>
