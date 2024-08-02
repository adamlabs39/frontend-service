<script setup>
import Card from "primevue/card";
import CustomChip from "./CustomChip.vue";

const props = defineProps({
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
  kodeBooking: {
    type: String,
    default: "BOOK.123",
  },
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
});
</script>

<template>
  <Card class="bg-adameds-A50 h-[92px]">
    <template #content>
      <div
        class="flex items-center justify-between h-[45px] gap-3"
      >
        <!-- Kiri -->
        <div
          class="flex bg-adameds-A75 rounded-md w-[60px] items-center justify-center text-adameds-A300 font-semibold text-base font-poppins h-[60px]"
        >
          {{ nomorAntrian }}
        </div>
        <!-- Tengah -->
        <div class="flex flex-col justify-start flex-1 gap-2 text-black">
          <!-- Nama Pasien dan Nomor Identitas -->
          <div class="flex flex-col justify-center font-poppins">
            <div class="font-bold text-MD">{{ namaPasien }}</div>
            <div class="font-normal text-SM">{{ nomorIdentitas }}</div>
          </div>
          <hr class="border-[1px] border-adameds-A300 -mt-1" />
          <!-- Chip dan Booking -->
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
        <!-- Kanan -->
        <div
          class="bg-success-S300 w-[40px] h-[40px] cursor-pointer rounded-xl flex justify-center items-center"
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
</template>
