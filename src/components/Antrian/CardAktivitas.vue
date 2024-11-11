<script lang="ts" setup>
import AddPrint from "../icons/AddPrint.vue";
import SolarUserCheckIcon from "../icons/SolarUserCheckIcon.vue";
import Stethoscop from "../icons/Stethoscop.vue";

const props = defineProps({
  cardAktivitas: {
    type: Object as () => { keterangan: string },
    default: () => ({ keterangan: "" }),
  },
});
</script>

<template>
  <Card
    style="width: full; overflow: hidden; height: full"
    pt:body:class="p-0 bg-white"
    pt:root:class="h-full"
  >
    <template #header
      ><div
        class="rounded-r-xl rounded-l-xl w-full h-[80px] flex items-center justify-center bg-adameds-50"
      >
        <SolarUserCheckIcon
          class="text-adameds-300"
          :size="50"
          v-if="cardAktivitas.keterangan === 'Checkin'"
        />
        <AddPrint
          class="text-adameds-300"
          :size="50"
          v-if="cardAktivitas.keterangan === 'Print'"
        />
        <!-- <img
          v-if="cardAktivitas.keterangan === 'Umum'"
          src="@/assets/icons/solar_user-check-bold.svg"
          alt=""
          class="w-[40px] h-[40px]"
        /> -->
        <Stethoscop
          class="text-adameds-300"
          :size="40"
          v-if="
            ['Umum', 'Anak', 'Mata', 'Kandungan', 'Gigi', 'THT', 'Tulang', 'Kulit'].includes(
              cardAktivitas.keterangan
            )
          "
        />
      </div>
    </template>
    <template #content>
      <div class="flex items-center justify-center h-full mt-2">
        <div class="font-extrabold text-[22px] text-adameds-300">
          {{ cardAktivitas.keterangan }}
        </div>
      </div>
    </template>
  </Card>
</template>
