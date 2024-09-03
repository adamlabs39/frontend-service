<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const props = defineProps({
    method: {
        type: String,
        default: "form",
    }
})


const criterias = ref([
    { id: "1", kriteriaPemantauan: "PEWS" },
    { id: "2", kriteriaPemantauan: "SWEP" },
    { id: "3", kriteriaPemantauan: "WEPS" },
    { id: "4", kriteriaPemantauan: "WSEP" },
]);

const respirasis = ref([
    { id: "1", respirasiAnak: "Normal" },
    { id: "2", respirasiAnak: "Tidak Normal" },
])

const kardiovaskulers = ref([
    { id: "1", kardiovaskulerAnak: "Sianosis" },
    { id: "2", kardiovaskulerAnak: "Tidak Sianosis" },
])
const keadaanUmums = ref([
    { id: "1", keadaanUmum: "Interaksi Biasa" },
    { id: "2", keadaanUmum: "Interaksi Non Biasa" },
])


const selectedCriteria = ref("");
const selectedRespirasi = ref("");
const selectedKardiovaskuler = ref("");
const selectedKeadaanUmum = ref("");

const waktuAsesmen = ref<Date>(new Date());
const frekuensiNafas = ref<number | undefined>(undefined);
const frekuensiNadi = ref<number | undefined>(undefined);


const suhu = ref<number | undefined>(undefined);
const bloodOxygen = ref<number | undefined>(undefined);
const gulaDarah = ref<number | undefined>(undefined);
const CRT = ref(false);
const oksigenTambahan = ref(false);
const tekananDarah = ref<number | undefined>(undefined);


</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header> Tanda Vital</template>
        <template #content>
            <div v-if="props.method == 'form'">
                <div class="grid grid-cols-4 gap-[30px] py-3">
                    <CustomSelect label="Kriteria Pemantauan" v-model="selectedCriteria" :options="criterias"
                        optionValue="id" optionLabel="kriteriaPemantauan" :isLoading="false" :invalid="false"
                        invalidMessage="Wajib diisi" :disabled="false" placeHolder="PEWS"
                        customSelectClass="border-[#C7CBD2]" />
                    <CustomDatePicker v-model="waktuAsesmen" label="Waktu Asesmen" />
                    <CustomInputNumber label="Frekuensi Nafas" placeholder="46" v-model:modelValue="frekuensiNafas"
                        type="number">
                        <template #appendText>
                            <div class="flex items-center mr-2">x/mnt</div>
                        </template>
                    </CustomInputNumber>
                    <CustomInputNumber label="Frekuensi Nadi" placeholder="158" v-model:modelValue="frekuensiNadi"
                        type="number">
                        <template #appendText>
                            <div class="flex items-center mr-2">x/mnt</div>
                        </template>
                    </CustomInputNumber>
                </div>

                <div class="flex gap-[30px] py-3">
                    <div class="w-1/4">
                        <CustomInputNumber label="Suhu" placeholder="37" v-model:modelValue="suhu" type="number">
                            <template #appendText>
                                <div class="flex items-center mr-2">°C</div>
                            </template>
                        </CustomInputNumber>
                    </div>

                    <div class="flex items-center gap-2 w-1/7">
                        <CustomSwitch v-model="CRT" label=" Capillary Refill Time (CRT > 2 Detik)" />
                    </div>
                    <div class="w-1/4">

                        <CustomInputNumber label="Blood Oxygen" placeholder="98" v-model:modelValue="bloodOxygen"
                            type="number">
                            <template #appendText>
                                <div class="flex items-center mr-2">%</div>
                            </template>
                        </CustomInputNumber>
                    </div>
                    <div class="grow">
                        <CustomInputNumber label="Gula Darah" placeholder="98" v-model:modelValue="gulaDarah"
                            type="number">
                            <template #appendText>
                                <div class="flex items-center mr-2">mg/dL</div>
                            </template>
                        </CustomInputNumber>
                    </div>
                </div>
                <!-- Baris Tiga -->
                <div class="flex gap-[30px] py-3">
                    <div class="flex flex-col w-1/5">
                        <CustomSwitch v-model="oksigenTambahan" label="Oxygen Tambahan" />
                    </div>
                    <div class="w-1/3">
                        <CustomInputNumber label="Tekanan Darah" placeholder="98" v-model:modelValue="tekananDarah"
                            type="number">
                            <template #appendText>
                                <div class="flex items-center mr-2">mmHg</div>
                            </template>
                        </CustomInputNumber>
                    </div>
                    <div class="grow">
                        <CustomSelect label="Respirasi Anak" v-model="selectedRespirasi" :options="respirasis"
                            optionValue="id" optionLabel="respirasiAnak" :isLoading="false" :invalid="false"
                            invalidMessage="Wajib diisi" :disabled="false" placeHolder="Tidak ada retraksi / RR Normal"
                            customSelectClass="border-[#C7CBD2]" />
                    </div>
                </div>
                <!-- Baris Keempat -->
                <div class="grid grid-cols-2 gap-[30px] py-3">
                    <CustomSelect label="Kardiovaskuler Anak" v-model="selectedKardiovaskuler"
                        :options="kardiovaskulers" optionValue="id" optionLabel="kardiovaskulerAnak" :isLoading="false"
                        :invalid="false" invalidMessage="Wajib diisi" :disabled="false" placeHolder="Mungkin Sianosis"
                        customSelectClass="border-[#C7CBD2]" />
                    <CustomSelect label="Keadaan Umum" v-model="selectedKeadaanUmum" :options="keadaanUmums"
                        optionValue="id" optionLabel="keadaanUmum" :isLoading="false" :invalid="false"
                        invalidMessage="Wajib diisi" :disabled="false" placeHolder="Interaksi Mungkin Biasa"
                        customSelectClass="border-[#C7CBD2]" />
                </div>
            </div>

            <div v-if="props.method == 'detail'" class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Kriteria Pemantauan" value="PEWS" />
                <CustomInfoRow label="Waktu Asesmen" value="01-01-2024" />
                <CustomInfoRow label="Frekuensi Napas" value="48 x/mnt" />
                <CustomInfoRow label="Frekuensi Nadi" value="158 x/mnt" />
                <CustomInfoRow label="Suhu" value="37 C" />
                <CustomInfoRow label="Capillary Refill Time (CRT > 2 Detik)" value="Tidak" />
                <CustomInfoRow label="Blood Oxygen" value="98%" />
                <CustomInfoRow label="Gula Darah" value="98%" />
                <CustomInfoRow label="Oksigen Tambahan" value="Tidak" />
                <CustomInfoRow label="Tekanan Darah" value="100 mmHg" />
                <CustomInfoRow label="Respirasi Anak" value="Tidak Ada retraksi" />
                <CustomInfoRow label="Kardiovaskuler Anak" value="Tidak Sianosis" />
                <CustomInfoRow label="Keadaan Umum" value="Interaksi Biasa" />
                <hr class="border-grey-200">
                <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="props.method == 'form'" label="Reset" textColor="text-[#9DA4B1]"
                    backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton  v-if="props.method=='form'"  label="Simpan" />
                <CustomButton v-if="props.method == 'detail'" label="Edit" />
            </div>
        </template>
    </CustomAccordion>


</template>
