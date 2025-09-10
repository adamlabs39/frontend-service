<script lang="ts" setup>
import AddPrint from "../icons/AddPrint.vue";
import SolarUserCheckIcon from "../icons/SolarUserCheckIcon.vue";
import Stethoscop from "../icons/Stethoscop.vue";
// ... existing code ...
import Card from "primevue/card"; // pastikan Card terdaftar agar slot #header & #content berfungsi
// ... existing code ...
const props = defineProps({
  cardAktivitas: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <Card
    style="width: 100%; overflow: hidden; height: 100%"
    pt:body:class="p-0 bg-white"
    pt:root:class="h-full"
  >
    <template #header
      ><div
        class="rounded-b-3xl w-full h-[80px] flex items-center justify-center bg-adameds-50"
      >
        <!-- <img
          v-if="cardAktivitas.keterangan === 'Umum'"
          src="@/assets/icons/solar_user-check-bold.svg"
          alt=""
          class="w-[40px] h-[40px]"
        /> -->
        <Stethoscop class="text-adameds-300" :size="40" />
      </div>
    </template>
    <template #content>
      <div class="flex justify-center items-center h-full">
        <div class="font-extrabold text-[22px] text-adameds-300">
          {{ cardAktivitas }}
        </div>
      </div>
    </template>
  </Card>
</template>
