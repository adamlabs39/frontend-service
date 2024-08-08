<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import Ruangan from "./Ruangan.vue";
import Tindakan from "./Tindakan.vue";

const products = ref<any[]>([]);
const expandedRows = ref<any[]>();

const showActionComponent = ref(true);
const showRoomComponent = ref(false);
const activeButton = ref('action');

onMounted(() => {
  showActionComponent.value = true;
  showRoomComponent.value = false;
  activeButton.value = 'action';
});

const handleActionClick = () => {
  showActionComponent.value = true;
  showRoomComponent.value = false;
  activeButton.value = 'action';
};

const handleRoomClick = () => {
  showActionComponent.value = false;
  showRoomComponent.value = true;
  activeButton.value = 'room';
};

</script>

<template>
  <div class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive">
    <Header title="Tarif" :filter="false" :search="false">
      <template #header>
        <div class="flex gap-2.5">
          <CustomButton
            label="TINDAKAN"
            class="w-[320px]"
            :text-color="activeButton === 'action' ? 'text-white' : 'text-adameds-300'"
            :border-color="activeButton === 'action' ? 'border-none' : 'border-adameds-300'"
            :class="activeButton === 'action' ? 'bg-adameds-300' : 'bg-white'"
            @click="handleActionClick"
          />
          <CustomButton
            label="RUANGAN"
            class="w-[320px]"
            :text-color="activeButton === 'room' ? 'text-white' : 'text-adameds-300'"
            :border-color="activeButton === 'room' ? 'border-none' : 'border-adameds-300'"
            :class="activeButton === 'room' ? 'bg-adameds-300' : 'bg-white'"
            @click="handleRoomClick"
          />
        </div>
      </template>
      <template #content>
        <div class="flex justify-between gap-2.5 py-5">
          <CustomSelect
            :is-loading="false"
            label="Cari Tarif"
            place-holder="Cari Tarif"
            class="grow"
          />
          <CustomSelect
            :is-loading="false"
            label="Unit Pelayanan"
            place-holder="Pilih Unit Pelayanan"
          />
          <CustomSelect
            :is-loading="false"
            label="Metode Pembayaran"
            place-holder="Pilih Metode Pembayaran"
          />
          <div class="flex justify-between items-end gap-2.5">
            <CustomButton icon="PhMagnifyingGlass" label="Cari" @click="" />
            <CustomButton
              label="Reset"
              @click=""
              border-color="border-adameds-300"
              background-color="bg-white"
              text-color="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Header>
    <div class="overflow-scroll grow px-5 pt-2.5">
      <div v-if="showActionComponent">
        <Tindakan />
      </div>
      <div v-if="showRoomComponent">
        <Ruangan />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
/* Add any specific styles here */
</style>
