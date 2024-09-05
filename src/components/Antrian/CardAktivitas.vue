<script lang="ts" setup>
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
        <img
          v-if="cardAktivitas.keterangan === 'Checkin'"
          src="@/assets/icons/solar_user-check-bold.svg"
          alt=""
          class="w-[50px] h-[50px]"
        />
        <img
          v-if="cardAktivitas.keterangan === 'Print'"
          src="@/assets/icons/icon-park-solid_add-print.svg"
          alt=""
          class="w-[40px] h-[40px]"
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
