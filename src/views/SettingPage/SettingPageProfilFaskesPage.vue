<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import HeaderSetting from "./HeaderSetting.vue";
import CardSettingTemplate from "./Template/CardSettingTemplate.vue";
import FaskesDetailTemplate from './Template/FaskesDetailTemplate.vue'
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <HeaderSetting heading="Profil Faskes" showButton labelButton="Edit" />
        <CardSettingTemplate class="">
            <!-- Untuk isinya profil di Profil Faskes -->
            <FaskesDetailTemplate />
        </CardSettingTemplate>
        <CardSettingTemplate class="mb-4">

            <div>
                <!-- Sebelum tulisan Warna Tema  -->
                <div class="flex w-full">
                    <!-- Bagian Konten Kiri -->
                    <div class="w-full">
                        <div class="mb-8">
                            <div class="text-sm font-semibold font-poppins">Logo</div>
                            <div class="text-SM text-[#858D9D]">
                                Logo ini akan ditampilkan di bagian
                                <span class="font-bold">Halaman Login, Header Menu sebelah kiri, Loading Screen,</span>
                                dan <span class="font-bold">Print Out</span>.
                            </div>
                            <ul class="list-disc list-inside text-SM ml-[6px] text-[#858D9D]">
                                <li>Ukuran minimum yang disarankan adalah <span class="font-bold">960x540</span></li>
                                <li>Rasio aspek yang disarankan adalah <span class="font-bold">16:9</span></li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Gambar -->
                    <div class="flex flex-col items-end justify-end w-1/3">
                        <div class="flex flex-col items-center justify-center">
                            <div class="mb-1 text-lg font-bold text-adameds-A300">Preview Logo</div>
                            <div class="px-5 py-3 bg-white rounded-lg">
                                <img src="../../../src/assets/images/adamedsPicture.svg" alt="Logo Preview"
                                    class="h-auto max-w-full">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Setelah Gambar -->
                <div class="flex items-center justify-between mt-8">
                    <div>
                        <div class="text-sm font-semibold font-poppins">Warna Tema</div>
                        <div class="text-SM text-[#858D9D]">
                            Warna yang dipilih akan mengubah seluruh tema warna LIS.
                        </div>
                        <ul class="list-disc list-inside text-SM ml-[6px] text-[#858D9D]">
                            <li>Pilihlah warna yang akan ditampilkan.</li>
                        </ul>
                    </div>
                    <div>
                        <CustomButton icon="PhCheck" />
                    </div>

                </div>
            </div>

        </CardSettingTemplate>
    </div>
</template>
