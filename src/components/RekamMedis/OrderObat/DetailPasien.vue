<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col gap-5 min-w-[280px]">
        <div class="flex justify-between">
            <div class="flex flex-col gap-1">
                <div class="font-semibold underline text-XS">Jenis Kelamin</div>
                <div class="text-center px-2.5 font-semibold text-male-300 bg-male-75 rounded-[50px] text-XS">
                    Laki-laki
                </div>
            </div>
            <div class="flex flex-col items-start gap-1">
                <div class="w-full font-semibold underline text-XS">Tanggal Lahir</div>
                <div class="flex items-center">
                    <div class="font-normal text-SM">01-01-2000</div>
                    <div class="mx-2 font-normal text-black text-SM">|</div>
                    <div class="font-bold text-adameds-300 text-SM">24Th 0Bl 1Hr</div>
                </div>
            </div>
        </div>
        
        <!-- Kotak Kedua -->
        <div class="rounded-md bg-adameds-50">
            <!-- Padding dalem -->
            <div class="px-2.5 py-2">
                <div class="flex gap-4 border-b border-grey-100 py-2.5">
                    <!-- T.Darah -->
                    <div class="flex w-1/2 gap-2">
                        <div class="font-semibold text-XS">T.Darah</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">110/70 mmHg</div>
                    </div>
                    <!-- Frek nadi -->
                    <div class="flex gap-2">
                        <div class="font-semibold text-XS">Frek.Nadi</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">80 x/mnt</div>
                    </div>
                </div>

                <div class="flex gap-4 border-b border-grey-100 py-2.5">
                    <!-- T.Darah -->
                    <div class="flex w-1/2 gap-2">
                        <div class="font-semibold text-XS">Frek. Nafas</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">20 x/mnt</div>
                    </div>
                    <!-- Frek nadi -->
                    <div class="flex gap-2">
                        <div class="font-semibold text-XS">Suhu</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">37C</div>
                    </div>
                </div>

                <div class="flex gap-4 border-b border-grey-100 py-2.5">
                    <!-- T.Darah -->
                    <div class="flex w-1/2 gap-2">
                        <div class="font-semibold text-XS">Berat</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">60 Kg</div>
                    </div>
                    <!-- Frek nadi -->
                    <div class="flex gap-2 ">
                        <div class="font-semibold text-XS">Tinggi</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">160 cm</div>
                    </div>
                </div>

                <div class="flex gap-4 border-b border-grey-100 py-2.5">
                    <!-- T.Darah -->
                    <div class="flex w-1/2 gap-2">
                        <div class="font-semibold text-XS">Skor CGS</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">0</div>
                    </div>
                    <!-- Frek nadi -->
                    <div class="flex gap-2">
                        <div class="font-semibold text-XS">Skala Nyeri</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">-</div>
                    </div>
                </div>
                <div class="flex gap-4 pt-2.5 pb-2">
                    <!-- T.Darah -->
                    <div class="flex w-1/2 gap-2">
                        <div class="font-semibold text-XS">Alergi</div>
                        <div class="font-normal text-XS rounded-[4px] bg-white px-[5px]">Tidak ada</div>
                    </div>

                </div>
            </div>

        </div>
        <!-- Kotak Ketiga -->
        <div class="rounded-md bg-adameds-50 px-2.5 py-2 flex flex-col gap-2">
            <div class="flex flex-col gap-1">
                <div class="font-semibold text-XS">Keluhan</div>
                <div class="font-normal bg-white text-SM rounded-[4px] px-1">Sakit</div>
            </div>
            <div class="flex flex-col gap-1">
                <div class="font-semibold text-XS">Diagnosa Primer</div>
                <div class="font-normal bg-white text-SM rounded-[4px] px-1">G12.1 - OTHER INHERITED SPINAL
                    MUSCULAR ATROPHY</div>
            </div>
        </div>
    </div>
</template>