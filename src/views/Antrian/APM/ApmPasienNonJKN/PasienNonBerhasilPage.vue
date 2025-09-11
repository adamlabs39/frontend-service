<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { useRouter } from "vue-router";
import TiketAntrian from "@/components/Antrian/TiketAntrian.vue";
import { ref } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
const handleBack = () => {
  router.push("/antrian/apm/aktif/pasien/jkn");
};

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
});

const tiketAntrian = ref({
  noRM: "00-00-00",
  noBooking: "63DJ83",
  noRegistrasi: "REG2407010049",
  noBPJS: "523214315123123",
  nik: "327012371204102",
  nama: "Nama Lengkap Pasien Jika Panjang",
  tanggalLahir: "01 Januari 2000",
  gender: "Laki-laki",
  namaPoli: "Poli Anak",
  dokter: "dr. Nama Dokter",
  jadwal: "07:00 - 10:00",
  tanggal: "10 Jan 2024",
  noAntri: "PD-02-01",
});
</script>

<template #body>
  <div class="py-5 w-full min-h-screen flex flex-col">
    <div
      class="flex relative z-10 gap-5 justify-between py-0 pr-5 mx-3 rounded-xl shadow-md bg-adameds-300 max-md:flex-wrap"
    >
      <NavbarAntrian />
    </div>
    <div class="relative mx-36 flex-1 flex items-center justify-center">
      <div
        class="flex flex-col justify-center w-full overflow-hidden rounded-3xl"
      >
        <div
          class="bg-white bg-opacity-30 w-full h-[540px] items-center justify-center"
        >
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between w-48 h-10 bg-white shadow-md rounded-xl"
            >
              <div
                class="flex items-center gap-2 text-sm leading-5 text-adameds-300 whitespace-nowrap"
              >
                <!-- Logo Container -->
                <div
                  class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
                >
                  <PlusIcon class="text-white" :size="30" />
                </div>

                <!-- Text Container with Background -->
                <div class="px-2 py-1 font-bold rounded-xl text-adameds-300">
                  Pasien Non-JKN
                </div>
              </div>
            </div>

            <!-- Title Container (Center) -->
            <div
              class="flex items-center justify-center col-span-1 text-2xl font-extrabold text-adameds-300"
            >
              Pendaftaran Berhasil
            </div>

            <!-- Button Container (Right) -->
            <div class="flex items-center justify-end col-span-1 mr-6">
              <CustomButton
                label="< &nbsp Halaman Utama"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="w-fit"
                @click="handleHome"
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <TiketAntrian :tiketAntrian="tiketAntrian" class="w-10/12 mt-14" />
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
