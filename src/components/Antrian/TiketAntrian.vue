<script setup lang="ts">
const props = defineProps({
  tiketAntrian: {
    default: Object,
  },
});
</script>
<template>
  <Card class="overflow-hidden w-full h-[350px]">
    <template #content>
      <div class="flex gap-7 justify-between">
        <div class="space-y-3 w-full">
          <div class="font-bold leading-8 text-heading">
            Data Pasien
            <hr class="border-black border-1" />
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">No. RM</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noRM }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">No. Booking</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noBooking }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">
              No. Registrasi
            </div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noRegistrasi }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">No. BPJS</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noBPJS }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">NIK</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.nik }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">Nama</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.nama }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">Tgl. Lahir</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.tanggalLahir }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">Jenis Kelamin</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.gender }}
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="mb-4 font-bold leading-8 text-heading">
            Pelayanan
            <hr class="border-black border-1" />
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-normal underline-offset-4"
              >
                Poliklinik
              </div>
              <div class="font-bold leading-8 text-subheading text-adameds-300">
                {{ tiketAntrian.namaPoli }}
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-normal underline-offset-4"
              >
                Dokter
              </div>
              <div class="font-bold leading-8 text-subheading text-adameds-300">
                {{ tiketAntrian.dokter }}
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-normal underline-offset-4"
              >
                Jadwal
              </div>
              <div class="font-bold leading-8 text-subheading text-adameds-300">
                {{ tiketAntrian.jadwal }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex relative justify-center items-center w-3/4 h-[420px]">
          <div class="absolute right-0 -top-16">
            <img src="../../assets/icons/Rectangle 1023.svg" alt="" />
            <div
              class="flex absolute top-10 flex-col gap-10 justify-center items-center w-full"
            >
              <div
                class="flex justify-center items-center w-48 border-b-2 border-dashed"
              >
                <div class="mx-5 my-4 text-center">
                  <div class="font-bold leading-8 text-white text-subheading">
                    No. Antrian
                  </div>
                  <hr />
                  <div
                    class="mt-1 text-sm font-normal leading-7 text-white opacity-85"
                  >
                    {{ tiketAntrian.tanggal }}
                  </div>
                </div>
              </div>
              <div class="text-[34px] font-bold leading-10 text-white mt-6">
                {{ tiketAntrian.noAntri }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
