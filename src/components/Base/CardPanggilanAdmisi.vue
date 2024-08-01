<template>
  <Card class=" bg-adameds-A50 h-[100px]">
    <template #content>
      <div class="flex items-center justify-between h-[60px]">
        <!-- Kiri -->
        <div
          class="flex bg-adameds-A75 rounded-md w-[60px] items-center justify-center text-adameds-A300 font-semibold text-base font-poppins h-[60px]"
        >
          {{ nomorAntrian }}
        </div>
        <!-- Tengah --> 
        <div class="flex flex-col justify-start flex-1 gap-2 mx-3 my-3">
          <!-- Nama Pasien dan Nomor Identitas -->
          <div class="flex flex-col justify-center mt-2">
            <div class="font-bold text-black text-MD">{{ namaPasien }}</div>
            <div class="font-normal text-SM">{{ nomorIdentitas }}</div>
          </div>    
          <hr class="border-2 border-adameds-A300" />
          <!-- Chip dan Booking -->
          <div class="flex items-center gap-2 ">
            <CustomChip
              label="TUNAI"
              border-color="border-[#14B8A6]"
              text-color="text-[#14B8A6]"
              :showCheckedIcon=false
              customizedClass="font-semibold h-3 border-2 rounded-full"
            />
            <div class="font-normal text-SM">{{ kodeBooking }}</div>
          </div>
        </div>
        <!-- Kanan -->
        <div>OMOMOMo</div>
      </div>
    </template>
  </Card>
</template>

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
