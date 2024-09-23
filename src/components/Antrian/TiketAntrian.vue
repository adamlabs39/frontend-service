<script setup lang="ts">
const props = defineProps({
  tiketAntrian: {
    default: Object,
  },
});
</script>
<template>
  <Card style="width: full; overflow: hidden">
    <template #content>
      <div class="flex justify-between gap-7">
        <div class="w-full">
          <div class="mb-4 font-bold leading-8 text-subHeading">
            Data Pasien
            <hr class="border-black border-1" />
          </div>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">No. RM</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noRM }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">No. Booking</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noBooking }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">No. Registrasi</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noRegistrasi }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">No. BPJS</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noBPJS }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">NIK</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.nik }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">Nama</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.nama }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">Tgl. Lahir</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.tanggalLahir }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal w-[100px]">Jenis Kelamin</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.gender }}
            </td>
          </tr>
        </div>
        
        <div class="w-full">
          <div class="mb-4 font-bold leading-8 text-subheading">
            Pelayanan
            <hr class="border-black border-1" />
          </div>
          <div class="flex flex-col gap-1">
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
        <div class="relative flex items-center justify-center w-3/4 h-1/2">
          <div class="absolute right-0 -top-16">
            <img src="../../assets/icons/Rectangle 1023.svg" alt="" />
            <div
              class="absolute flex flex-col items-center justify-center w-full gap-10 top-10"
            >
              <div
                class="flex items-center justify-center w-48 border-b-2 border-dashed"
              >
                <div class="mx-5 my-4 text-center">
                  <div class="font-bold leading-8 text-white text-subheading">
                    No. Antrian
                  </div>
                  <hr />
                  <div class="mt-1 text-sm font-normal leading-7 text-white opacity-85">
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
