<script lang="ts" setup>
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import TableTindakan from "@/components/Datamaster/TableKomponenTarifTindakan.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import TableJenisPembayaranBed from "@/components/Datamaster/TableJenisPembayaranBedV1.vue";
const testDialog = ref(false);
</script>
<template>
  <div class="grid grid-cols-12 gap-5 mt-5">
    <CustomSelect class="col-span-6" label="Jenis Tarif" place-holder="Jenis Tarif" />
    <CustomTextfield class="col-span-6" label="Kode Tarif" placeholder="Kode Tarif" />
    <CustomSelect class="col-span-6" label="Pelayanan" place-holder="Pelayanan" />
    <CustomSelect class="col-span-6" label="Ruangan" place-holder="Ruangan" />
    <TableJenisPembayaranBed class="col-span-12" />
  </div>
</template>
