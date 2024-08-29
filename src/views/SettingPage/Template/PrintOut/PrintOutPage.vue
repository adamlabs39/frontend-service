<script setup lang="ts">
import CustomUpload from '@/components/Base/CustomUpload.vue';
import MainHeaderSetting from '../MainHeaderSetting.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import Card from 'primevue/card';
import { ref } from 'vue';

const isEditPrintOut = ref(false);
const editPrintOut = () => {
    isEditPrintOut.value = !isEditPrintOut.value;
    console.log(isEditPrintOut)
};
</script>



<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting v-if="!isEditPrintOut" heading="Print Out" showButton labelButton="Edit"
                :buttonClickHandler="editPrintOut" />
            <MainHeaderSetting v-else-if="isEditPrintOut" heading="Print Out" showButton labelButton="Batal Edit"
                :buttonClickHandler="editPrintOut" outlined borderColor="border-adameds-300"
                textColor="text-adameds-300" />
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

        <template #content v-if="!isEditPrintOut">
            <div class="py-5 flex flex-col gap-2.5">
                <div class="text-sm font-semibold font-poppins text-adameds-300">Preview Header</div>
                <Card class="border border-dashed border-[#d3e1e1] bg-[#eff8f6]">
                    <template #content>
                        <div class="flex items-center justify-center min-h-[200px]">
                            <img src="../../../../assets/icons/noPicture.svg" alt="">
                        </div>
                    </template>

                </Card>
            </div>

            <div class="text-sm font-semibold font-poppins text-adameds-300 py-2.5 flex flex-col gap-2.5">
                <div>Preview Gambar</div>
                <Card class="border border-dashed border-[#d3e1e1] bg-[#eff8f6]">
                    <template #content>
                        <div class="flex items-center justify-center min-h-[600px]">
                            <img src="../../../../assets/icons/noPicture.svg" alt="">
                        </div>
                    </template>
                </Card>
            </div>


            <div class="text-sm font-semibold font-poppins text-adameds-300 py-2.5 flex flex-col gap-2.5">
                <div> Preview Footer</div>
                <Card class=" border border-dashed border-[#d3e1e1] bg-[#eff8f6]">
                    <template #content>
                        <div class="flex items-center justify-center min-h-[200px]">
                            <img src="../../../../assets/icons/noPicture.svg" alt="">
                        </div>
                    </template>
                </Card>
            </div>


        </template>

        <template #content v-else-if="isEditPrintOut">
            <div class="text-sm font-semibold font-poppins text-adameds-300 py-5 flex flex-col gap-2.5">
                <div class="flex items-center justify-between ">
                    <div> Preview Header</div>
                    <CustomButton label="Hapus Gambar" backgroundColor="bg-danger-50" textColor="text-danger-300" icon="PhTrash"/>
                </div>
                <Card class=" border border-dashed border-[#d3e1e1] bg-[#eff8f6] min-h-[200px] flex justify-center">
                    <template #content>
                        <CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
                            :show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
                            name="demo[]" url="/api/upload" />
                    </template>
                </Card>

                <div class="flex items-center justify-between ">
                    <div> Preview Gambar</div>
                    <CustomButton label="Hapus Gambar" backgroundColor="bg-danger-50" textColor="text-danger-300" icon="PhTrash" />
                </div>
                <Card class=" border border-dashed border-[#d3e1e1] bg-[#eff8f6] min-h-[600px] flex justify-center">
                    <template #content>
                        <CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
                            :show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
                            name="demo[]" url="/api/upload" />
                    </template>
                </Card>

                <div class="flex items-center justify-between ">
                    <div> Preview Footer</div>
                    <CustomButton label="Hapus Gambar" backgroundColor="bg-danger-50" textColor="text-danger-300" icon="PhTrash"/>
                </div>
                <Card class=" border border-dashed border-[#d3e1e1] bg-[#eff8f6] min-h-[200px] flex justify-center">
                    <template #content>
                        <CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
                            :show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
                            name="demo[]" url="/api/upload" />
                    </template>
                </Card>

            </div>

        </template>

        <template #footer v-if="isEditPrintOut">
            <div class="w-full">
                <hr class="border-[#D9DCE1] border-1 -mx-5 mb-5  bg-slate-400" />
                <div class="flex items-end justify-end gap-2.5 ">
                    <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                        borderColor="border-2 border-[#9DA4B1]" />
                    <CustomButton label="Simpan" />
                </div>
            </div>
        </template>
    </Card>
</template>
