<script setup lang="ts">
import { ref } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
  rmType: {
    type: String,
    default: "rawat-jalan",
  },
});

const showPatientData = ref(true);
</script>

<template>
  <div class="text-XS">
    <Transition name="slide-fade">
      <div v-if="showPatientData">
        <div class="grid grid-cols-3 mb-[10px]">
          <div class="flex">
            <div class="grid grid-cols-3 grow">
              <div class="mr-5">
                <div class="font-semibold underline mb-[5px] leading-5">
                  No. Registrasi
                </div>
                <div class="text-normal">REG2407010049</div>
              </div>
              <div class="mr-5">
                <div class="font-semibold underline mb-[5px] leading-5">
                  Jenis Kelamin
                </div>
                <CustomChip
                  :showCheckedIcon="false"
                  :label="true ? 'Perempuan' : 'Laki-laki'"
                  :bgColor="true ? 'bg-female-75' : 'bg-male-75'"
                  :textColor="true ? 'text-female-300' : 'text-male-300'"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
              <div>
                <div class="font-semibold underline mb-[5px] leading-5">
                  Tanggal Lahir
                </div>
                <div class="text-normal">
                  01-01-2000 |
                  <span class="font-semibold text-adameds-300"
                    >24Th 0Bl 1Hr</span
                  >
                </div>
              </div>
            </div>
            <div class="mx-[45px] border-[1px] border-adameds-300"></div>
          </div>
          <div class="grid grid-cols-4 col-span-2">
            <div class="mr-5">
              <div class="font-semibold underline mb-[5px] leading-5">
                Tanggal Pelayanan
              </div>
              <div class="text-normal">
                25 Okt 2023 <span class="text-grey-400">09:00</span>
              </div>
            </div>
            <div class="mr-5">
              <div class="font-semibold underline mb-[5px] leading-5">
                Dokter
                <CustomChip
                  :showCheckedIcon="false"
                  label="POLI MATA"
                  customClass="h-5 ml-[5px]"
                />
              </div>
              <div class="text-normal">REG2407010049</div>
            </div>
            <div class="mr-5">
              <div class="font-semibold underline mb-[5px] leading-5">
                Asesmen Terakhir
              </div>
              <div class="text-normal">
                25 Okt 2023 <span class="text-grey-400">09:00</span>
              </div>
            </div>
            <div class="mr-5">
              <div class="font-semibold underline mb-[5px] leading-5">
                Tagihan
                <CustomChip
                  :showCheckedIcon="false"
                  label="TUNAI"
                  :bgColor="true ? 'bg-adameds-50' : 'bg-warning-50'"
                  :textColor="true ? 'text-adameds-300' : 'text-warning-300'"
                  :borderColor="
                    true ? 'border-adameds-300' : 'border-warning-300'
                  "
                  customClass="h-5 ml-[5px]"
                />
              </div>
              <div class="text-normal">Rp. 0</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-[5px]">
          <div class="bg-adameds-50 px-[15px] py-[10px] rounded-md">
            <div class="flex">
              <div class="grow">
                <div class="flex justify-between mb-[10px]">
                  <span class="font-semibold leading-5">T.Darah</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    110/70 mmHg
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold leading-5">Frek. Nadi</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    80 x/mnt
                  </span>
                </div>
              </div>
              <div class="mx-5 border-[1px] border-grey-100"></div>
              <div class="grow">
                <div class="flex justify-between mb-[10px]">
                  <span class="font-semibold leading-5">Frek. Nafas</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    20 x/mnt
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold leading-5">Suhu</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    37 °C
                  </span>
                </div>
              </div>
              <div class="mx-5 border-[1px] border-grey-100"></div>
              <div class="grow">
                <div class="flex justify-between mb-[10px]">
                  <span class="font-semibold leading-5">Berat</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    60 Kg
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold leading-5">Tinggi</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    160 Cm
                  </span>
                </div>
              </div>
              <div class="mx-5 border-[1px] border-grey-100"></div>
              <div class="grow">
                <div class="flex justify-between mb-[10px]">
                  <span class="font-semibold leading-5">Skor GCS</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    0
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold leading-5">Skala Nyeri</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    -
                  </span>
                </div>
              </div>
              <div class="mx-5 border-[1px] border-grey-100"></div>
              <div class="grow">
                <div class="flex justify-between mb-[10px]">
                  <span class="font-semibold leading-5">Alergi</span>
                  <span class="h-5 bg-white rounded-[4px] px-[5px] leading-5">
                    Tidak ada
                  </span>
                </div>
                <div
                  v-if="rmType == 'igd'"
                  :class="`font-semibold text-center h-5 leading-5 rounded-[50px] bg-[#14AC5B] text-white shadow-lg`"
                >
                  TRIASE
                </div>
              </div>
            </div>
          </div>
          <div class="bg-adameds-50 text-XS px-[15px] py-[10px] rounded-md">
            <div class="flex">
              <div class="mr-[10px]">
                <div class="flex mb-[10px]">
                  <span class="font-semibold leading-5">Keluhan</span>
                </div>
                <div class="flex">
                  <span class="font-semibold leading-5">Diagnosis Primer</span>
                </div>
              </div>
              <div class="grow">
                <div
                  class="mb-[10px] h-5 bg-white rounded-[4px] px-[5px] leading-5 w-full"
                >
                  Sakit
                </div>
                <div class="flex">
                  <div
                    class="h-5 bg-white rounded-[4px] px-[5px] leading-5 w-full mr-[10px]"
                  >
                    G12.1 - OTHER INHERITED SPINAL MUSCULAR ATROPHY
                  </div>
                  <div
                    class="h-5 text-white bg-adameds-300 rounded-[4px] px-[5px] leading-5 min-w-max"
                  >
                    ICD 10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <div
      class="flex justify-between"
      :class="[showPatientData ? 'mt-[10px]' : '']"
    >
      <div class="h-[1px] border border-grey-200 grow my-auto"></div>
      <div
        v-if="showPatientData"
        @click="showPatientData = false"
        class="flex text-white bg-adameds-300 py-[5px] px-[10px] rounded-[50px] cursor-pointer mx-[10px]"
      >
        <PhCaretDoubleUp :size="14" weight="bold" />
        <span class="mx-2"> Sembunyikan </span>
        <PhCaretDoubleUp :size="14" weight="bold" />
      </div>
      <div
        v-else
        @click="showPatientData = true"
        class="flex text-white bg-adameds-300 py-[5px] px-[10px] rounded-[50px] cursor-pointer mx-[10px]"
      >
        <PhCaretDoubleDown :size="14" weight="bold" />
        <span class="mx-2"> Tampilkan </span>
        <PhCaretDoubleDown :size="14" weight="bold" />
      </div>
      <div class="h-[1px] border border-grey-200 grow my-auto"></div>
    </div>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
