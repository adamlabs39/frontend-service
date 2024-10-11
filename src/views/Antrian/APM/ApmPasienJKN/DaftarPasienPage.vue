<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
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
                  <img
                    loading="lazy"
                    src="@/assets/icons/sidebar-icon/BPJS.svg"
                    class="shrink-0 w-[30px] h-[30px]"
                  />
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
              Pendaftaran Pasien
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

          <div class="flex flex-col items-center">
            <CustomTextfield
              :label="`No. BPJS`"
              :placeholder="`Masukkan No. BPJS`"
              class="w-2/5 mt-16 mr-5"
            ></CustomTextfield>
            <CustomTextfield
              :label="`No. KTP`"
              :placeholder="`Masukkan No. KTP`"
              class="w-2/5 mt-5 mr-5"
            ></CustomTextfield>
            <CustomButton
              label="Lanjutkan"
              class="w-2/5 mt-10 mr-5"
              @click="handleBerhasil"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
