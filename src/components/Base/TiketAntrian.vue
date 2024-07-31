<script setup lang="ts">
const props=defineProps({
    noRM:{
        type:String,
        default:"No RM"
    },
    noBPJS:{
        type:String,
        default:"no BPJS"
    },
    nik:{
        type:String,
        default:"NIK"
    },
    nama:{
        type:String,
        default:"nama lengkap"
    },
    tanggalLahir:{
        type:String,
        default:"dd/mm/yy"
    },
    gender:{
        type:String,
        default:"jenis kelamin"
    },
    namaPoli:{
        type:String,
        default:"nama poli"
    },
    dokter:{
        type:String,
        default:"dokter"
    },
    jadwal:{
        type:String,
        default:"00:00 - 00:00"
    },
    tanggal:{
        type:String,
        default:"dd/mm/yy"
    },
    noAntri:{
        type:String,
        default:"nomor antri"
    },
})
</script>
<template>
    <Card style="width: full; overflow: hidden;">
        <template #content>
            <div class="flex justify-between gap-5">
                <div class="w-full pr-6 ">
                    <h2 class="mb-4 font-bold leading-8 text-heading">Data Pasien
                        <hr class="border-black border-1">
                    </h2>
                    <tr>
                        <td class="font-semibold leading-5 text-normal">No. RM</td>
                        <td class="px-3">:</td>
                        <td class="font-normal leading-5 text-normal">{{ noRM }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold leading-5 text-normal">No. BPJS</td>
                        <td class="px-3">:</td>
                        <td class="font-normal leading-5 text-normal">{{ noBPJS }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold leading-5 text-normal">NIK</td>
                        <td class="px-3">:</td>
                        <td class="font-normal leading-5 text-normal">{{ nik }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold leading-5 text-normal">Nama</td>
                        <td class="px-3">:</td>
                        <td class="font-normal leading-5 text-normal">{{ nama }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold leading-5 text-normal">Tgl. Lahir</td>
                        <td class="px-3">:</td>
                        <td class="font-normal leading-5 text-normal">{{ tanggalLahir }}</td>
                    </tr>
                    <tr>
                        <td class="font-semibold leading-5 text-normal">Jenis Kelamin</td>
                        <td class="px-3">:</td>
                        <td class="font-normal leading-5 text-normal">{{ gender }}</td>
                    </tr>
                </div>
                <div class="w-full pr-6 ">
                    <h2 class="mb-4 font-bold leading-8 text-heading">Pelayanan
                        <hr class="border-black border-1">
                    </h2>
                    <div class="flex flex-col gap-1">
                        <div class="flex flex-col">
                            <h1 class="font-normal leading-7 underline text-MD underline-offset-4">Poliklinik</h1>
                            <p class="font-bold leading-8 text-heading text-adameds-A300">{{ namaPoli }}</p>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="font-normal leading-7 underline text-MD underline-offset-4">Dokter</h1>
                            <p class="font-bold leading-8 text-heading text-adameds-A300">{{ dokter }}</p>
                        </div>
                        <div class="flex flex-col">
                            <h1 class="font-normal leading-7 underline text-MD underline-offset-4">Jadwal</h1>
                            <p class="font-bold leading-8 text-heading text-adameds-A300">{{ jadwal }}</p>
                        </div>
                    </div>
                </div>
                <div class="relative flex items-center justify-center w-3/4 h-1/2">
                    <div class="absolute right-0 -top-10">
                        <img src="../../assets/icons/Rectangle 1023.svg" alt="">
                        <div class="absolute flex flex-col items-center justify-center w-full gap-10 top-5">
                            <div class="flex items-center justify-center border-b-2 border-dashed">
                                <div class="mx-5 my-2 text-center">
                                    <h2 class="font-bold leading-8 text-white text-heading">No. Antrian</h2>
                                    <hr>
                                    <p class="mt-1 font-normal leading-7 text-white text-md">{{ tanggal }}</p>
                                </div>
                            </div>
                            <div class="text-[34px] font-bold leading-10 text-white">
                                {{ noAntri }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </template>
    </Card>
</template>
