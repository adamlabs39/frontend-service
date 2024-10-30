<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CardAktivitas from "@/components/Antrian/CardAktivitas.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
const handleBerhasil = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn/berhasil");
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
  noBPJS: "523214315123123",
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
  <div class="bg-adameds-75">
    <div
      class="flex justify-between gap-5 pr-5 mt-[15px] bg-adameds-300 rounded-xl max-md:flex-wrap shadow-md py-0 mx-3"
    >
      <div
        class="flex justify-between w-full gap-5 text-sm leading-5 text-white whitespace-nowrap max-md:flex-wrap"
      >
        <!-- Logo and Divider -->
        <div
          class="flex gap-1 justify-center items-center px-2.5 rounded-lg shadow-sm bg-white"
        >
          <img
            loading="lazy"
            src="@/assets/images/adameds-logo.png"
            class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[70px] h-[70px]"
          />
          <div class="bg-adameds-300 w-[2px] h-[50px] my-auto rounded-md"></div>
          <img
            loading="lazy"
            src="@/assets/images/adameds.png"
            class="self-stretch object-cover w-[120px] my-auto shrink-0 mx-1"
          />
        </div>

        <!-- Main Title and Subtitle -->
        <div class="flex flex-col mx-1 my-auto">
          <!-- Added mx-4 for spacing -->
          <div class="mb-1 font-bold text-MD">
            Anjungan Pendaftaran Pribadi (APM)
          </div>
          <div class="text-sm">Klinik Adameds</div>
        </div>

        <!-- Clock and Date -->
        <div class="flex flex-col my-auto ml-auto text-right">
          <!-- Align text to the right -->
          <div class="text-lg font-bold">09:00 AM</div>
          <div class="text-sm">Senin, 01 Jan 2024</div>
        </div>
      </div>
    </div>
    <div class="relative items-center justify-center mb-4 mt-14 mx-36">
      <div class="overflow-hidden rounded-3xl">
        <div
          class="bg-white bg-opacity-30 w-full h-[540px] items-center justify-center"
        >
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between w-40 h-10 bg-white shadow-md rounded-xl"
            >
              <div
                class="flex items-center gap-2 text-sm leading-5 text-adameds-300 whitespace-nowrap"
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
              class="flex items-center justify-center col-span-1 text-2xl font-extrabold text-adameds-300"
            >
              Data Pasien
            </div>

            <!-- Button Container (Right) -->
            <div class="flex items-center justify-end col-span-1 mr-6">
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

          <div class="flex flex-col items-center px-20">
            <div class="grid grid-cols-9 text-sm pt-14 gap-x-4 gap-y-2">
              <div class="font-bold">NIK</div>
              <div class="col-span-2">: &nbsp {{ dataPasien.nik }}</div>
              <div class="font-bold">Nama</div>
              <div class="col-span-2">: &nbsp {{ dataPasien.nama }}</div>
              <div class="pr-2 font-bold">Jenis Kelamin</div>
              <div class="col-span-2">: &nbsp {{ dataPasien.gender }}</div>

              <div class="font-bold">No.RM</div>
              <div class="col-span-2">: &nbsp {{ dataPasien.noRM }}</div>
              <div class="font-bold">Tgl. Lahir</div>
              <div class="col-span-2">
                : &nbsp {{ dataPasien.tanggalLahir }}
              </div>
            </div>
          </div>

          <div class="px-20 pt-8">
            <div class="justify-start pl-1 text-lg font-bold">Daftar Poli</div>
            <hr class="bg-black h-[2px] my-2 ml-1" />
            <div class="justify-start pl-1 text-sm text-adameds-300">
              Silahkan Pilih Poli
            </div>
          </div>

          <div class="flex flex-col items-center h-[220px] justify-center">
            <div class="grid grid-cols-4 gap-x-12">
              <div class="w-[180px] h-[140px]">
                <CardAktivitas
                  :cardAktivitas="cardAktivitasUmum"
                  class="transition-transform duration-300 hover:scale-95"
                />
              </div>
              <div class="w-[180px]">
                <CardAktivitas
                  :cardAktivitas="cardAktivitasAnak"
                  class="transition-transform duration-300 hover:scale-95"
                />
              </div>
              <div class="w-[180px]">
                <CardAktivitas
                  :cardAktivitas="cardAktivitasMata"
                  class="transition-transform duration-300 hover:scale-95"
                />
              </div>
              <div class="w-[180px]">
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
</template>
