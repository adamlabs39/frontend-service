<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CardAktivitas from "@/components/Antrian/CardAktivitas.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
const handleBerhasil = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn/berhasil");
};
const handlePoli = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn/poli-umum");
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
  dataPasien: {
    default: Object,
  },
});

const dataPasien = ref({
  noRM: "001827",
  nik: "327012371204102",
  nama: "Nama Lengkap Pasien Jika",
  tanggalLahir: "01 Januari 2000",
  gender: "Laki-laki",
});

const cardAktivitasUmum = ref({
  keterangan: "Umum",
});
const cardAktivitasAnak = ref({
  keterangan: "Anak",
});
const cardAktivitasMata = ref({
  keterangan: "Mata",
});
const cardAktivitasKandungan = ref({
  keterangan: "Kandungan",
});
</script>

<template #body>
  <div class="flex flex-col py-5 w-full min-h-screen">
    <div
      class="flex relative z-10 gap-5 justify-between py-0 pr-5 mx-3 rounded-xl shadow-md bg-adameds-300 max-md:flex-wrap"
    >
      <NavbarAntrian />
    </div>
    <div class="flex relative flex-1 justify-center items-center mx-36">
      <div
        class="flex overflow-hidden flex-col justify-center w-full rounded-3xl"
      >
        <div class="bg-white bg-opacity-30 w-full h-[640px] space-y-14">
          <!-- Header -->
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between w-40 h-10 bg-white rounded-xl shadow-md"
            >
              <div
                class="flex gap-2 items-center text-sm leading-5 whitespace-nowrap text-adameds-300"
              >
                <!-- Logo Container -->
                <div
                  class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
                >
                  <BPJSIcon class="text-white" :size="30" />
                </div>

                <!-- Text Container with Background -->
                <div class="px-2 py-1 font-bold rounded-xl text-adameds-300">
                  Pasien JKN
                </div>
              </div>
            </div>

            <!-- Title Container (Center) -->
            <div
              class="flex col-span-1 justify-center items-center text-2xl font-extrabold text-adameds-300"
            >
              Data Pasien
            </div>

            <!-- Button Container (Right) -->
            <div class="flex col-span-1 justify-end items-center mr-6">
              <CustomButton
                label="< &nbsp Kembali"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="w-[120px]"
                @click="handleHome"
              />
            </div>
          </div>

          <!-- Data Pasien -->
          <div class="flex justify-around">
            <div
              class="grid grid-cols-[max-content_1ch_minmax(0,1fr)] gap-x-3 gap-y-1"
            >
              <div class="font-bold whitespace-nowrap">NIK</div>
              <div class="text-center">:</div>
              <div>{{ dataPasien.nik }}</div>

              <div class="font-bold whitespace-nowrap">Nama</div>
              <div class="text-center">:</div>
              <div>{{ dataPasien.nama }}</div>
            </div>

            <div
              class="grid grid-cols-[max-content_1ch_minmax(0,1fr)] gap-x-3 gap-y-1"
            >
              <div class="font-bold whitespace-nowrap">Tanggal Lahir</div>
              <div class="text-center">:</div>
              <div>{{ dataPasien.tanggalLahir }}</div>

              <div class="font-bold whitespace-nowrap">Gender</div>
              <div class="text-center">:</div>
              <div>{{ dataPasien.gender }}</div>
            </div>

            <div
              class="grid grid-cols-[max-content_1ch_minmax(0,1fr)] gap-x-3 gap-y-1"
            >
              <div class="font-bold whitespace-nowrap">No RM</div>
              <div class="text-center">:</div>
              <div>{{ dataPasien.noRM }}</div>

              <div class="font-bold whitespace-nowrap">No BPJS</div>
              <div class="text-center">:</div>
              <div>{{ dataPasien.noBPJS }}</div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex gap-6 justify-center">
            <div class="col-span-5 px-32 space-y-7 w-full">
              <div class="">
                <div class="justify-start pl-1 text-lg font-bold">
                  Daftar Poli
                </div>
                <hr class="bg-black h-[2px] my-2 ml-1" />
                <div class="justify-start pl-1 mb-8 text-sm text-adameds-300">
                  Silahkan Pilih Poli
                </div>
              </div>

              <div class="flex flex-col items-center h-[220px] justify-center">
                <div>
                  <div class="grid grid-cols-4 gap-x-6 gap-y-6 w-full">
                    <div class="w-[220px] h-[120px]">
                      <CardAktivitas
                        :cardAktivitas="cardAktivitasUmum"
                        class="transition-transform duration-300 hover:scale-95"
                        @click="handlePoli"
                      />
                    </div>
                    <div class="w-[220px]">
                      <CardAktivitas
                        :cardAktivitas="cardAktivitasAnak"
                        class="transition-transform duration-300 hover:scale-95"
                      />
                    </div>
                    <div class="w-[220px]">
                      <CardAktivitas
                        :cardAktivitas="cardAktivitasMata"
                        class="transition-transform duration-300 hover:scale-95"
                      />
                    </div>
                    <div class="w-[220px]">
                      <CardAktivitas
                        :cardAktivitas="cardAktivitasKandungan"
                        class="transition-transform duration-300 hover:scale-95"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
