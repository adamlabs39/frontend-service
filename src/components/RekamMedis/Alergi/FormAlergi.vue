<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';
import CustomInfoRow from '@/components/Base/CustomInfoRow.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import { ref } from 'vue';

const props = defineProps({
    method: {
        type: String,
        default: "form",
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

            <div v-if="props.method == 'form'" class="grid grid-cols-2 gap-[30px] py-3">
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

            <div v-if="props.method == 'detail'" class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Pemicu Alergi" value="Makanan" />
                <CustomInfoRow label="Nama / Jenis Alergi" value="Makanan sejenis ikan-ikanan" />
                <CustomInfoRow label="Reaksi" value="Gatal-gatal" />
                <CustomInfoRow label="Tingkat Keparahan" value="Tidak terlalu parah" />
                <CustomInfoRow label="Efek Samping" value="Kulit Memerah" />
                <CustomInfoRow label="Tanggal Kejadian" value="01-01-2020" />
                <hr class="border-grey-200">
                <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="props.method == 'form'" label="Tidak Ada Alergi" textColor="text-adameds-300"
                    backgroundColor="bg-transparent" borderColor="border-2 border-adameds-300" />
                <CustomButton  v-if="props.method=='form'"  label="Simpan" />
                <CustomButton v-if="props.method == 'detail'" label="Edit" />
            </div>
        </template>
    </CustomAccordion>


</template>