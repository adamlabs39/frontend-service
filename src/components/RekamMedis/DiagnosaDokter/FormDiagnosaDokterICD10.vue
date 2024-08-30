<script lang="ts" setup>
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomTextArea from '@/components/Base/CustomTextArea.vue';
import catatanPerawat01 from '@/assets/icons/Avatar/catatanPerawat01.svg';
import catatanPerawatAnda from '@/assets/icons/Avatar/catatanPerawatAnda.svg';
import { PhArrowUUpLeft, PhCalendarDots, PhClock, PhPencil } from '@phosphor-icons/vue';
import { ref } from 'vue';
import CustomChip from '@/components/Base/CustomChip.vue';

const selectedDiagnosaPrimer = ref("");
const selectedDiagnosaDiferensial = ref("");
const selectedDiagnosaSekunder = ref("");
const selectedDiagnosaDd = ref("");

const diagnosaPrimers = ref([
    { id: "1", diagnosaPrimer: "Sakit Kepala" },
    { id: "2", diagnosaPrimer: "Sakit Perut" },
    { id: "3", diagnosaPrimer: "Sakit Jantung" },
    { id: "4", diagnosaPrimer: "Tekanan Darah Tinggi" },
]);

const diagnosaDiferensials = ref([
    { id: "1", diagnosaDiferensial: "Sakit Kepala 2" },
    { id: "2", diagnosaDiferensial: "Sakit Perut 2" },
    { id: "3", diagnosaDiferensial: "Sakit Jantung 2" },
    { id: "4", diagnosaDiferensial: "Tekanan Darah Tinggi 2" },
]);

const diagnosaSekunders = ref([
     { id: "1",diagnosaSekunder: "Sakit Perut 3" },
    { id: "2",diagnosaSekunder: "Jantung Berdebar" },
    { id: "3",diagnosaSekunder: "Hepatitis" },
    { id: "4",diagnosaSekunder: "Sakit Demam" },
])

const diagnosaDds = ref([
     { id: "1",diagnosaDd: "Tangan Berdarah" },
    { id: "2",diagnosaDd: "Luka Hati" },
    { id: "3",diagnosaDd: "Masuk Angin" },
    { id: "4",diagnosaDd: "Gabisa Ngapa-ngapain" },
])
const catatanPerawat = ref("");
</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Diagnosa Dokter (ICD 10)</template>
        <template #content>
            <div class="grid grid-cols-2 gap-5 py-3">
                <CustomSelect label="Primer" v-model="selectedDiagnosaPrimer" :options="diagnosaPrimers"
                    optionValue="id" optionLabel="diagnosaPrimer" :isLoading="false" :invalid="false"
                    invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                    customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                <CustomSelect label="Diagnosis Diferensial" v-model="selectedDiagnosaDiferensial"
                    :options="diagnosaDiferensials" optionValue="id" optionLabel="diagnosaDiferensial"
                    :isLoading="false" :invalid="false" invalidMessage="Wajib diisi" :disabled="false"
                    placeHolder="Pilih Diagnosis" customSelectClass="border-[#C7CBD2]"
                    prependIcon="PhMagnifyingGlass" />
            </div>

            <div class="flex gap-[30px] w-full">
                <div class="basis-2/5">
                    <CustomSelect label="Sekunder" v-model="selectedDiagnosaSekunder" :options="diagnosaSekunders"
                        optionValue="id" optionLabel="diagnosaSekunder" :isLoading="false" :invalid="false"
                        invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                        customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                </div>
                <div class="grow">
                    <CustomSelect label="Diagnosis Diferensial" v-model="selectedDiagnosaDd" :options="diagnosaDds"
                        optionValue="id" optionLabel="diagnosaDd" :isLoading="false" :invalid="false"
                        invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Diagnosis"
                        customSelectClass="border-[#C7CBD2]" prependIcon="PhMagnifyingGlass" />
                </div>
                <div class="flex items-end justify-start">
                    <CustomButton label="Hapus Diagnosa" textColor="text-white" backgroundColor="bg-danger-300" />
                </div>
            </div>

            <div
                class="flex items-center justify-center p-5 my-7 border border-dashed rounded-lg border-adameds-300 gap-2.5">
                <CustomButton icon="PhPlus" label="Diagnosa" borderColor="border-adameds-300"
                    textColor="text-adameds-300" backgroundColor="bg-white" />
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