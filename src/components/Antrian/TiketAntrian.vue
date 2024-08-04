<script setup lang="ts">
const props = defineProps({
  tiketAntrian : {
    default: Object
  },

});
</script>
<template>
  <Card style="width: full; overflow: hidden">
    <template #content>
      <div class="flex justify-between gap-5">
        <div class="w-full pr-6">
          <div class="mb-4 font-bold leading-8 text-heading">
            Data Pasien
            <hr class="border-black border-1" />
          </div>
          <tr>
            <td class="font-semibold leading-5 text-normal">No. RM</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">{{ tiketAntrian.noRM }}</td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal">No. BPJS</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">{{ tiketAntrian.noBPJS }}</td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal">NIK</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">{{ tiketAntrian.nik }}</td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal">Nama</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">{{ tiketAntrian.nama }}</td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal">Tgl. Lahir</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">
              {{ tiketAntrian.tanggalLahir }}
            </td>
          </tr>
          <tr>
            <td class="font-semibold leading-5 text-normal">Jenis Kelamin</td>
            <td class="px-3">:</td>
            <td class="font-normal leading-5 text-normal">{{ tiketAntrian.gender }}</td>
          </tr>
        </div>
        <div class="w-full pr-6">
          <div class="mb-4 font-bold leading-8 text-heading">
            Pelayanan
            <hr class="border-black border-1" />
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-MD underline-offset-4"
              >
                Poliklinik
              </div>
              <div class="font-bold leading-8 text-heading text-adameds-300">
                {{ tiketAntrian.namaPoli }}
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-MD underline-offset-4"
              >
                Dokter
              </div>
              <div class="font-bold leading-8 text-heading text-adameds-300">
                {{ tiketAntrian.dokter }}
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-MD underline-offset-4"
              >
                Jadwal
              </div>
              <div class="font-bold leading-8 text-heading text-adameds-300">
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
                class="flex items-center justify-center border-b-2 border-dashed"
              >
                <div class="mx-5 my-2 text-center">
                  <div class="font-bold leading-8 text-white text-heading">
                    No. Antrian
                  </div>
                  <hr />
                  <div class="mt-1 font-normal leading-7 text-white text-md">
                    {{ tiketAntrian.tanggal }}
                  </div>
                </div>
              </div>
              <div class="text-[34px] font-bold leading-10 text-white">
                {{ tiketAntrian.noAntri }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
