<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CardAktivitas from "@/components/Antrian/CardAktivitas.vue";
import CardDokter from "@/components/Antrian/CardDokter.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import Stethoscop from "@/components/icons/Stethoscop.vue";
import CardJam from "@/components/Antrian/CardJam.vue";
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
const handleBerhasil = () => {
  router.push("/antrian/apm/aktif/pasien/jkn/berhasil");
};

const selectedType = ref<string | null>(null);
const isDisabled = computed(() => !selectedType.value);
const selectType = (type: string) => {
  selectedType.value = type;
};

const selectedTime = ref<string | null>(null);
const selectTime = (time: string) => {
  selectedTime.value = time;
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
        <div
          class="bg-white bg-opacity-30 w-full h-[540px] items-center justify-center"
        >
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between w-48 h-10 bg-white rounded-xl shadow-md"
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
              <Stethoscop class="text-adameds-300" :size="28" />
              &nbsp Poli Umum
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

          <div
            class="grid grid-cols-[1fr_min-content_340px] w-full my-5 mx-16 items-start"
          >
            <div class="pr-6 pl-6 w-full">
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
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('1')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjang"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('2')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjangSekali"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('3')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNamaPanjangSekali"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('4')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('5')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('6')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('7')"
                  />
                </div>
                <div>
                  <cardDokter
                    :cardDokter="cardDokterNama"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectType('8')"
                  />
                </div>
              </div>
            </div>

            <!-- Divider vertikal sesuai Figma -->
            <div
              class="mx-8 w-[4px] bg-adameds-300 rounded self-stretch mt-16"
            ></div>

            <!-- Panel Jam Praktek (selalu tampil) -->
            <div class="pr-6">
              <div>
                <div class="justify-start pl-1 text-lg font-bold">
                  Jam Praktek
                </div>
                <hr class="bg-black h-[2px] my-2" />
                <div class="justify-start pb-4 pl-1 text-sm text-adameds-300">
                  Silahkan Pilih Jam Praktek
                </div>

                <!-- Daftar Jam sesuai Figma -->
                <div class="grid grid-cols-1 gap-4 w-[280px]">
                  <!-- Pagi -->
                  <button
                    type="button"
                    @click="selectTime('pagi')"
                    :class="[
                      'relative flex items-center justify-center h-[60px] w-[280px] rounded-2xl shadow-md transition-transform duration-300 hover:scale-95',
                      selectedTime === 'pagi'
                        ? 'bg-adameds-100 text-white'
                        : 'bg-white text-adameds-300',
                    ]"
                  >
                    <span class="font-extrabold text-[16px]">{{
                      cardJamPagi.jam
                    }}</span>
                    <CheckCircleIcon
                      v-if="selectedTime === 'pagi'"
                      :size="20"
                      class="absolute right-4 text-white"
                    />
                  </button>

                  <!-- Siang -->
                  <button
                    type="button"
                    @click="selectTime('siang')"
                    :class="[
                      'relative flex items-center justify-center h-[60px] w-[280px] rounded-2xl shadow-md transition-transform duration-300 hover:scale-95',
                      selectedTime === 'siang'
                        ? 'bg-adameds-100 text-white'
                        : 'bg-white text-adameds-300',
                    ]"
                  >
                    <span class="font-extrabold text-[16px]">{{
                      cardJamSiang.jam
                    }}</span>
                    <CheckCircleIcon
                      v-if="selectedTime === 'siang'"
                      :size="20"
                      class="absolute right-4 text-white"
                    />
                  </button>

                  <!-- Malam -->
                  <button
                    type="button"
                    @click="selectTime('malam')"
                    :class="[
                      'relative flex items-center justify-center h-[60px] w-[280px] rounded-2xl shadow-md transition-transform duration-300 hover:scale-95',
                      selectedTime === 'malam'
                        ? 'bg-adameds-100 text-white'
                        : 'bg-white text-adameds-300',
                    ]"
                  >
                    <span class="font-extrabold text-[16px]">{{
                      cardJamMalam.jam
                    }}</span>
                    <CheckCircleIcon
                      v-if="selectedTime === 'malam'"
                      :size="20"
                      class="absolute right-4 text-white"
                    />
                  </button>

                  <!-- Tombol Lanjutkan -->
                  <CustomButton
                    v-show="selectedTime"
                    label="Lanjutkan"
                    class="w-[280px] mt-2"
                    backgroundColor="bg-adameds-100"
                    textColor="text-white"
                    @click="handleBerhasil"
                  />
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
