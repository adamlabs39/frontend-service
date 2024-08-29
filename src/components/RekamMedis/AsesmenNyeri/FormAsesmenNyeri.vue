<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const catatan = ref<string>('');
</script>
<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header> Asesmen Nyeri</template>
        <template #content>
            <div class="grid grid-cols-2 py-5 gap-[30px] gap-y-5">
                <div class="flex flex-col">
                    <div>Pilih Pengkajian Nyeri </div>
                    <div>Gambar Disini</div>
                    <div>Garis Puanjang Rentang 1-10</div>
                    <hr class="border-[#D9DCE1] border-1 mt-12 mb-5" />
                    <div>1-3 = Ringan 4-6 = Sedang 7-10 = Berat</div>
                    <hr class="border-[#D9DCE1] border-1 mb-5" />
                    
                </div>
                <div class="">
                    <CustomTextfield label="Catatan" placeholder="Masukkan Catatan"
                        v-model:modelValue="catatan" />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                    borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton label="Simpan" />
            </div>
        </template>
    </CustomAccordion>


</template>