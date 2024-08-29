<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import { ref } from 'vue';

const props = defineProps({
    method: {
        type: String,
        default: "Edit",
    }
})

const pemicuAlergi = ref<string>('');
const namaAlergi = ref<string>('');
const reaksiAlergi = ref<string>('');
const tingkatKeparahanAlergi = ref<string>('');
const efekSampingAlergi = ref<string>('');


const tanggalKejadianAlergi = ref<Date>(new Date())
</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header> Alergi</template>
        <template #content>

            <div class="grid grid-cols-2 gap-[30px] py-3">
                <CustomTextfield label="Pemicu Alergi" placeholder="Masukkan Pemicu Alergi"
                    v-model:modelValue="pemicuAlergi" />
                <CustomTextfield label="Nama/Jenis Alergi" placeholder="Masukkan Nama Alergi"
                    v-model:modelValue="namaAlergi" />
                <CustomTextfield label="Reaksi" placeholder="Masukkan Reaksi" v-model:modelValue="reaksiAlergi" />
                <CustomTextfield label="Tingkat Keparahan" placeholder="Masukkan Tingkat Keparahan"
                    v-model:modelValue="tingkatKeparahanAlergi" />
                <CustomTextfield label="Efek Samping" placeholder="Masukkan Efek Samping"
                    v-model:modelValue="efekSampingAlergi" />
                <CustomDatePicker v-model="tanggalKejadianAlergi" label="Tanggal Kejadian" />

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