<script lang="ts" setup>
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};

const handleData = () => {
  router.push("/antrian/apm/aktif/pasien/jkn/data-pasien");
};
const handleBerhasil = () => {
  router.push("/antrian/apm/aktif/pasien/jkn/berhasil");
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
        <div class="bg-white bg-opacity-30 w-full h-[540px] space-y-16">
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
              Pendaftaran Pasien
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

          <div class="flex flex-col items-center">
            <div class="">
              <div class="text-center">Silahkan Pilih Tipe Nomor</div>
              <div class="py-6 space-y-4">
                <div class="flex gap-7 justify-around items-center w-full">
                  <div
                    class="text-adameds-300 py-3 w-[160px] bg-white text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                  >
                    RM
                  </div>
                  <div
                    class="text-adameds-300 py-3 w-[160px] bg-white text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                  >
                    BPJS
                  </div>
                  <div
                    class="text-adameds-300 py-3 w-[160px] bg-white text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                  >
                    KTP
                  </div>
                  <div
                    class="text-adameds-300 py-3 w-[160px] bg-white text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                  >
                    Passport
                  </div>
                  <div
                    class="text-adameds-300 py-3 w-[160px] bg-white text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                  >
                    Lainnya
                  </div>
                </div>
                <div
                  class="w-[calc(100%+30px)] mx-[-15px] h-2 bg-adameds-300 rounded-xl"
                ></div>
              </div>
            </div>
            <CustomTextfield
              :label="`No. KTP`"
              :placeholder="`Masukkan No. KTP`"
              class="w-2/5 mb-4"
            ></CustomTextfield>
            <CustomButton label="Lanjutkan" class="w-2/5" @click="handleData" />
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
