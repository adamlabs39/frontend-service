<script setup lang="ts">
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';
import CustomRadio from '@/components/Base/CustomRadio.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import { ref } from 'vue';

const props = defineProps({
    method: {
        type: String,
        default: "form",
    },
});

const selectedRadioValue = ref('');
const phone = ref("");
const fullAddress = ref("");
const dateFilter = ref<Date>(new Date())
</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">

        <template #header>Persetujuan Pasien</template>
        <template #content>
            <div class="flex flex-col gap-5 p-5">
                <div class="grid grid-cols-2 gap-[30px]">
                    <div>
                        <CustomSelect label="Dokter Pelaksana Tindakan" placeHolder="Pilih Dokter Pelaksana Tindakan" />
                    </div>
                    <div>
                        <CustomSelect label="Pemberi Informasi" placeHolder="Pilih Pemberi Informasi" />
                    </div>
                </div>
                <!-- <hr class="my-6 border-gray-200 border-1" /> -->
                <div class="flex gap-[30px] items-center">
                    <div class="min-w-[300px]">
                        <label class="font-semibold text-normal">Penerima Informasi</label>
                        <div class="flex gap-5">
                            <CustomRadio v-model="selectedRadioValue" value="pasien" sideLabel="Pasien" label="" />
                            <CustomRadio v-model="selectedRadioValue" value="keluarga" sideLabel="Keluarga / Wali"
                                label="" />
                        </div>
                    </div>
                    <div class="grow"><CustomSelect label="Nama keluarga / Wali" placeHolder="Nama Keluarga / Wali"/></div>
                    <div class="w-[200px]"><CustomSelect label="Jenis Kelamin" placeHolder="Pilih Jenis Kelamin"/></div>
                    <div class="grow"><CustomSelect label="Hubungan dengan Keluarga" placeHolder="Pilih Hubungan dengan Keluarga"/></div>
                </div>
                <div class="flex gap-[30px]">
                    <div class="w-[300px]"> <CustomTextfield label="No. Handphone" class="w-full" placeholder="08xx-xxxx-xxxx" v-model="phone"
                            type="number" /></div>
                    <div class="grow"><CustomTextArea label="Alamat" placeholder="Alamat" v-model:model-value="fullAddress" :isLoading="false" 
						:disabled="false"/></div>
                </div>
                <div class="grid grid-cols-2 gap-[30px]">
                    <div><CustomTextArea label="Diagnosis (WD & DD)" placeholder="Diagnosis (WD & DD)"/></div>
                    <div><CustomTextArea label="Dasar Diagnosis" placeholder="Dasar Diagnosis"/></div>
                </div>
                <div class="grid grid-cols-2 gap-[30px]">
                    <div><CustomTextArea label="Tindakan Kedokteran" placeholder="Tatacara Tindakan"/></div>
                    <div><CustomTextArea label="Tujuan Tindakan" placeholder="Tujuan Tindakan"/></div>
                </div>
                <div class="grid grid-cols-2 gap-[30px]">
                    <div><CustomTextArea label="Risiko Tindakan" placeholder="Risiko Tindakan"/></div>
                    <div><CustomTextArea label="Komplikasi" placeholder="Komplikasi"/></div>
                </div>
                <div class="grid grid-cols-2 gap-[30px]">
                    <div><CustomTextArea label="Prognosis" placeholder="Prognosis"/></div>
                    <div><CustomTextArea label="Alternatif & Risiko" placeholder="Alternatif & Risiko"/></div>
                </div>
                <div class="grid grid-cols-2 gap-[30px]">
                    <div><CustomTextArea label="Lain-lain" placeholder="Lain-lain"/></div>
                </div>
                <div class="flex gap-[30px] items-center">
                    <div class="min-w-[300px]">
                        <label class="font-semibold text-normal">Persetujuan Tindakan Kedokteran</label>
                        <div class="flex gap-5">
                            <CustomRadio v-model="selectedRadioValue" value="pasien" sideLabel="Setuju" label="" />
                            <CustomRadio v-model="selectedRadioValue" value="keluarga" sideLabel="Tidak Setuju"
                                label="" />
                        </div>
                    </div>
                    <div class="grow"><CustomDatePicker label="Tgl. Pemeriksaan Fisio" v-model="dateFilter"/></div>
                    <div class="w-[200px]"><CustomTextfield label="Nama Saksi 1"  placeholder="Nama Saksi 1"/></div>
                    <div class="grow"><CustomTextfield label="Nama Saksi 2"  placeholder="Nama Saksi 2"/></div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="props.method == 'form'" label="Reset" textColor="text-[#9DA4B1]"
                    backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton v-if="props.method == 'form'" label="Simpan" />
                <CustomButton v-if="props.method == 'detail'" label="Edit" />
            </div>
        </template>
    </CustomAccordion>
</template>