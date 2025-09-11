<script lang="ts" setup>
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedType = ref<string | null>(null);
const isDisabled = computed(() => !selectedType.value);
const selectType = (type: string) => {
  selectedType.value = type;
};

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
const handleData = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn/data-pasien");
};
// const handleBerhasil = () => {
//   router.push("/antrian/apm/aktif/pasien/non-jkn/berhasil");
// };

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
        <div class="bg-white bg-opacity-30 w-full h-[540px] space-y-16">
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="inline-flex items-center h-10 bg-white rounded-xl shadow-md w-fit"
            >
              <div
                class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
              >
                <PlusIcon class="text-white" :size="30" />
              </div>
              <div
                class="px-2 py-1 font-bold whitespace-nowrap text-adameds-300"
              >
                Pasien Non-JKN
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
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'RM' ? 'bg-adameds-100' : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'RM' ? 'text-white' : 'text-adameds-300'
                    "
                    @click="selectType('RM')"
                    :icon="selectedType === 'RM' ? 'CheckCircleIcon' : ''"
                    label="RM"
                    iconPos="right"
                  />
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'KTP' ? 'bg-adameds-100' : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'KTP' ? 'text-white' : 'text-adameds-300'
                    "
                    @click="selectType('KTP')"
                    :icon="selectedType === 'KTP' ? 'CheckCircleIcon' : ''"
                    label="KTP"
                    iconPos="right"
                  />
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'Passport'
                        ? 'bg-adameds-100'
                        : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'Passport'
                        ? 'text-white'
                        : 'text-adameds-300'
                    "
                    @click="selectType('Passport')"
                    :icon="selectedType === 'Passport' ? 'CheckCircleIcon' : ''"
                    label="Passport"
                    iconPos="right"
                  />
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'Lainnya' ? 'bg-adameds-100' : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'Lainnya'
                        ? 'text-white'
                        : 'text-adameds-300'
                    "
                    @click="selectType('Lainnya')"
                    :icon="selectedType === 'Lainnya' ? 'CheckCircleIcon' : ''"
                    label="Lainnya"
                    iconPos="right"
                  />
                </div>
                <div
                  class="w-[calc(100%+30px)] mx-[-15px] h-2 bg-adameds-300 rounded-xl"
                ></div>
              </div>
            </div>
            <CustomTextfield
              :disabled="isDisabled"
              :label="`No. ${selectedType || ''}`"
              :placeholder="`Masukkan No. KTP`"
              class="mb-4 w-2/5"
            ></CustomTextfield>
            <CustomButton
              :disabled="isDisabled"
              label="Lanjutkan"
              class="w-2/5"
              @click="handleData"
            />
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
