<script lang="ts" setup>
import UserDoctorIcon from "../icons/UserDoctorIcon.vue";

const props = defineProps({
  cardDokter: {
    type: Object as () => { namaDokter: string },
    default: () => ({ namaDokter: "" }),
  },
});
</script>

<template>
  <Card
    style="width: full; overflow: hidden; height: full"
    pt:body:class="p-0 bg-white"
    pt:root:class="h-full"
  >
    <template #header> </template>
    <template #content>
      <div class="flex h-full my-auto align-center">
        <div
          class="my-[12.5px] rounded-r-xl w-[40px] h-[40px] flex items-center justify-center bg-adameds-300"
        >
          <UserDoctorIcon class="mt-2 ml-2 text-center text-white" :size="34" />
        </div>
        <div class="items-center justify-center my-auto ml-5">
          <div class="text-[14px] text-adameds-300">
            {{ cardDokter.namaDokter }}
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
