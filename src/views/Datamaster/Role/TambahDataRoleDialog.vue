<script lang="ts" setup>
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

const menuAksesAutoComplete = ref();
const itemsMenuAkses = ref([
  "Admisi",
  "Antrian",
  "Pembayaran",
  "Formasi",
]);
const status = ref();
</script>
<template>
  <form class="flex flex-col gap-5 mt-5">
    <div class="flex gap-2.5">
      <CustomTextfield label="Kode" placeholder="Kode" />
      <CustomTextfield
        label="Nama Role"
        placeholder="Nama Role"
        class="basis-3/4"
      />
    </div>
    <hr class="border-grey-200" />
    <CustomAutoComplete
      v-model="menuAksesAutoComplete"
      :options="itemsMenuAkses"
      label="Menu Akses"
      multiple
      
    />
    <hr class="border-grey-200" />
    <div class="flex items-end gap-2.5">
      <CustomSwitch v-model="status" label="Status" />
      <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
    </div>
  </form>
</template>
