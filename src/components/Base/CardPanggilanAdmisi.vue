<script setup>
import Card from "primevue/card";
import CustomChip from "./CustomChip.vue";
import {
  PhCheckCircle,
  PhMegaphone,
  PhSkipForward,
  PhAddressBook
} from '@phosphor-icons/vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // Kiri
  nomorAntrian: {
    type: Number,
    default: 1,
  },
  // Tengah
  namaPasien: {
    type: String,
    default: "Nama Pasien",
  },
  nomorIdentitas: {
    type: String,
    default: "123",
  },
  // kodeBooking: {
  //   type: String,
  //   default: "BOOK.123",
  // },
  // Kanan
  showIconSelesai: {
    type: Boolean,
    default: false,
  },
  showIconPanggil: {
    type: Boolean,
    default: true,
  },
  showIconLewati: {
    type: Boolean,
    default: true,
  },
  showIconProcess: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: 'aktif',
  },
});
const emit = defineEmits(['update:visible']);
</script>

<template>
  <Card class="bg-adameds-50 w-full rounded-lg">
    <template #content>
      <div class="grid grid-cols-[auto_1fr_auto] items-center h-[60px] gap-3">

        <div
          class="flex bg-adameds-75 rounded-md w-[60px] h-[60px] items-center justify-center text-adameds-300 font-semibold text-base font-poppins shrink-0"
        >
          {{ nomorAntrian }}
        </div>

        <div class="flex flex-col justify-start gap-2 text-black min-w-0">
          <div class="flex flex-col justify-center font-poppins">
            <div class="font-bold text-md truncate" :title="namaPasien">{{ namaPasien }}</div>
            <div class="font-normal text-sm text-gray-500">{{ nomorIdentitas }}</div>
          </div>
          <hr class="border-[1px] border-adameds-300 -mt-1" />
          <div class="flex items-center gap-1 -mt-1">
            <CustomChip
              label="TUNAI"
              border-color="border-teal-500"
              text-color="text-teal-500"
              :showCheckedIcon="false"
              customClass="font-semibold h-4 border rounded-full text-[9px] bg-transparent font-poppins px-2"
            />
            <div class="mt-1 font-normal text-sm font-poppins text-gray-500">
              {{ kodeBooking }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">

          <div
            v-if="status === 'selesai'"
            class="bg-success-300 w-[44px] h-[44px] rounded-xl flex justify-center items-center"
            v-tooltip.bottom="'Selesai'"
          >
            <PhCheckCircle :size="28" color="#ffffff" weight="fill" />
          </div>

          <div v-else class="flex items-center gap-2">
            <button
              v-if="showIconPanggil"
              class="w-[40px] h-[40px] rounded-lg flex items-center justify-center bg-[#3D84E5] hover:opacity-90"
              title="Panggil"
            >
              <PhMegaphone :size="22" color="white" weight="fill" />
            </button>
            <button
              v-if="showIconLewati"
              class="w-[40px] h-[40px] rounded-lg flex items-center justify-center bg-[#E89F29] hover:opacity-90"
              title="Lewati"
            >
              <PhSkipForward :size="22" color="white" weight="fill" />
            </button>
            <button
              v-if="showIconProcess"
              class="w-[40px] h-[40px] rounded-lg flex items-center justify-center bg-[#14B8A6] hover:opacity-90"
              title="Proses"
            >
              <PhAddressBook :size="22" color="white" weight="fill" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<!-- <template>
  <Card class="bg-adameds-50 h-[92px]">
    <template #content>
      <div
        class="flex items-center justify-between h-[45px] gap-3"
      >
        <div
          class="flex bg-adameds-75 rounded-md w-[60px] items-center justify-center text-adameds-300 font-semibold text-base font-poppins h-[60px]"
        >
          {{ nomorAntrian }}
        </div>
        <div class="flex flex-col justify-start flex-1 gap-2 text-black">
          <div class="flex flex-col justify-center font-poppins">
            <div class="font-bold text-MD">{{ namaPasien }}</div>
            <div class="font-normal text-SM">{{ nomorIdentitas }}</div>
          </div>
          <hr class="border-[1px] border-adameds-300 -mt-1" />
          <div class="flex items-center gap-1 -mt-1">
            <CustomChip
              label="TUNAI"
              border-color="border-[#14B8A6]"
              text-color="text-[#14B8A6]"
              :showCheckedIcon="false"
              customClass="font-semibold h-4 border-2 rounded-full text-[8px] bg-transparent font-poppins"
            />
            <div class="mt-1 font-normal text-SM font-poppins">
              {{ kodeBooking }}
            </div>
          </div>
        </div>
        <div
          class="bg-success-300 w-[40px] h-[40px] cursor-pointer rounded-xl flex justify-center items-center"
          v-tooltip.bottom="{
            value: 'Selesai',
            pt: {
              arrow: {
                style: {
                  borderBottomColor: 'border-black',
                },
              },
              style: {
                background: 'bg-white',
              },
              text: 'text-white',
            },
          }"
        >
          <PhCheckCircle :size="18" color="#ffffff" weight="fill" />
        </div>
      </div>
    </template>
  </Card>
</template> -->