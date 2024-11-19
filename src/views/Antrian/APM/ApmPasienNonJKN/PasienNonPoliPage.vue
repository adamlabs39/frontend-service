<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CardAktivitas from "@/components/Antrian/CardAktivitas.vue";
import CardDokter from "@/components/Antrian/CardDokter.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Stethoscop from "@/components/icons/Stethoscop.vue";
import CardJam from "@/components/Antrian/CardJam.vue";

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

const cardDokterNamaPanjang = ref({
  namaDokter: "dr. Nama Dokter Nama Panjang",
});
const cardDokterNamaPanjangSekali = ref({
  namaDokter: "dr. Nama Dokter Nama Panjang Sekali",
});
const cardDokterNama = ref({
  namaDokter: "dr. Nama Dokter",
});

const cardJamPagi = ref({
  jam: "07:00 - 10:00",
});
const cardJamSiang = ref({
  jam: "12:00 - 15:00",
});
const cardJamMalam = ref({
  jam: "18:00 - 20:00",
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
              <Stethoscop class="text-adameds-300" :size="28" />
              &nbsp Poli Umum
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

          <div
            class="grid grid-cols-[1fr_1fr_1fr_1fr_min-content_1fr] my-5 mx-16"
          >
            <div class="pl-6 w-[800px] col-span-4">
              <div class="justify-start pl-1 text-lg font-bold">
                List Dokter
              </div>
              <hr class="bg-black h-[2px] my-2 ml-1" />
              <div class="justify-start pb-4 pl-1 text-sm text-adameds-300">
                Silahkan Pilih Dokter
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjang"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjang"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjangSekali"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjangSekali"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-[380px] transition-transform duration-300 hover:scale-95"
                  />
                </div>
              </div>
            </div>

            <div
              class="mr-12 border-2 border-adameds-300 h-[330px] mt-16"
            ></div>

            <div class="pr-6">
              <div>
                <div class="justify-start pl-1 text-lg font-bold">
                  Jam Praktek
                </div>
                <hr class="bg-black h-[2px] my-2" />
                <div class="justify-start pb-4 pl-1 text-sm text-adameds-300">
                  Silahkan Pilih Jam Praktek
                </div>
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <CardJam
                      :cardJam="cardJamPagi"
                      class="w-[200px] transition-transform duration-300 hover:scale-95"
                    />
                  </div>
                  <div>
                    <CardJam
                      :cardJam="cardJamSiang"
                      class="w-[200px] transition-transform duration-300 hover:scale-95"
                    />
                  </div>
                  <div>
                    <CardJam
                      :cardJam="cardJamMalam"
                      class="w-[200px] transition-transform duration-300 hover:scale-95"
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
</template>
