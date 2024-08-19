<script setup lang="ts">
import CustomUpload from '@/components/Base/CustomUpload.vue';
import MainHeaderSetting from '../MainHeaderSetting.vue';
import CustomButton from '@/components/Base/CustomButton.vue';


</script>



<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="Print Out" />
            <div class="ml-5 mr-7 mt-2.5">
                <div class="text-sm font-semibold font-poppins">Pengaturan Cetak Print</div>
                <div class="py-2.5">
                    <div class="text-SM text-[#858D9D]">
                        Gambar ini akan ditampilkan saat cetak Print Out PDF
                    </div>
                    <ul class="list-disc list-inside text-SM ml-[6px] text-[#858D9D]">
                        <li>Ukuran gambar Header dan Footer yang disarankan adalah 793x1192.</li>
                    </ul>
                </div>
            </div>


        </template>
        <template #content>

            <div class="">
                <div class="text-sm font-semibold font-poppins text-adameds-300 py-2.5">
                    Preview Header
                </div>
                <div class="bg-adameds-50 border-dashed border-[1px] rounded-lg mb-2.5">
                    <CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
                        :show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
                        name="demo[]" url="/api/upload" />
                </div>
                <div class="">
                    <CustomButton label="Hapus" class="px-5 py-[10px] font-poppins font-semibold text-sm w-full"
                        text-color="text-adameds-300" border-color="border-adameds-300" outlined />
                </div>
            </div>

            <div class="basis-1/2">
                <div class="text-sm font-semibold font-poppins text-adameds-300 py-2.5">
                    Preview Gambar
                </div>
                <div class="bg-adameds-50 border-dashed border-[1px] rounded-lg mb-2.5">
                    <CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
                        :show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
                        name="demo[]" url="/api/upload" />
                </div>
                <div class="">
                    <CustomButton label="Hapus" class="px-5 py-[10px] font-poppins font-semibold text-sm w-full"
                        text-color="text-adameds-300" border-color="border-adameds-300" outlined />
                </div>
            </div>

            <div class="basis-1/4">
                <div class="text-sm font-semibold font-poppins text-adameds-300 py-2.5">
                    Preview Footer
                </div>
                <div class="bg-adameds-50 border-dashed border-[1px] rounded-lg mb-2.5">
                    <CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
                        :show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
                        name="demo[]" url="/api/upload" />
                </div>
                <!-- <div class="mb-4">
                    <CustomButton label="Hapus" class="px-5 py-[10px] font-poppins font-semibold text-sm w-full"
                        text-color="text-adameds-300" border-color="border-adameds-300" outlined />
                </div>
                <hr class="border-[#D9DCE1] border-1 -mx-5 mb-5 bg-slate-400" />
                <div class="flex items-end justify-end gap-2.5  mb-5">
                    <CustomButton label="Setel Ulang" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                        borderColor="border-2 border-[#9DA4B1]" />
                    <CustomButton label="Simpan" />
                </div> -->
            </div>

        </template>
    </Card>




</template>


<style scoped></style>