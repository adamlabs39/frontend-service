<script lang="ts" setup>
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import AddPrint from "@/components/icons/AddPrint.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
const handleData = () => {
  router.push("/antrian/apm/aktif/print/data");
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
        <div
          class="bg-white bg-opacity-30 w-full h-[540px] items-center justify-center"
        >
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between h-10 bg-white shadow-md w-28 rounded-xl"
            >
              <div
                class="flex items-center gap-2 text-sm leading-5 text-adameds-300 whitespace-nowrap"
              >
                <!-- Logo Container -->
                <div
                  class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
                >
                  <!-- <img
                    loading="lazy"
                    src="@/assets/icons/icon-park-solid_add-print.svg"
                    class="shrink-0 w-[30px] h-[30px] p-[2px] filter invert"
                  /> -->
                  <AddPrint class="text-white" :size="30" />
                </div>

                <!-- Text Container with Background -->
                <div class="px-2 py-1 font-bold rounded-xl text-adameds-300">
                  Print
                </div>
              </div>
            </div>

            <!-- Title Container (Center) -->
            <div
              class="flex items-center justify-center col-span-1 text-2xl font-extrabold text-adameds-300"
            >
              Print Antrian
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

          <div class="flex flex-col items-center gap-2 mt-28">
            <CustomTextfield
              :label="`No. Kode Booking`"
              :placeholder="`Masukkan No. Kode Booking`"
              class="w-2/5"
            ></CustomTextfield>
            <CustomButton label="Print" class="w-2/5" @click="handleData" />
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
