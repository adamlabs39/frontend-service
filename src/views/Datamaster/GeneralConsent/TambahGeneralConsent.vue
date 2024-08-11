<script lang="ts" setup>
import { ref } from "vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomQuil from "@/components/Base/CustomQuil.vue";
const status = ref();
const lokasiPelayanan = ref();
const itemsLokasiPelayanan = ref([
  "Rawat Jalan",
  "Rawat Inap",
  "IGD",
]);
</script>
<template>
  <div class="mt-5 flex flex-col gap-5">
    <div class="flex w-full gap-2.5 items-end" >
      <CustomTextfield label="Kode" placeholder="Kode" />
      <CustomTextfield
        label="Kategori General Consent"
        placeholder="Kategori General Consent"
        class="w-1/3"
      />
      <CustomAutoComplete label="Lokasi Pelayanan" v-model="lokasiPelayanan" :options="itemsLokasiPelayanan" class="grow" />
    </div>
    <CustomTextfield label="Nama General Consent" placeholder="Nama General Consent"/>
    <div>
      <div class="font-semibold text-MD">Isi General Consent</div>
      <CustomQuil/>
    </div>
    <hr />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </div>
</template>
