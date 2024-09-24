<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

const props = defineProps({
    method: {
        type: String,
        default: "form",
    }
})

const emit = defineEmits(['edit']);
const currentMethod = ref(props.method)

const criterias = ref([
    { id: 1, value: "PEWS" },
    { id: 2, value: "SWEP" },
    { id: 3, value: "WEPS" },
    { id: 4, value: "WSEP" },
]);

const respirasis = ref([
    { id: 1, value: "Normal" },
    { id: 2, value: "Tidak Normal" },
])

const kardiovaskulers = ref([
    { id: 1, value: "Sianosis" },
    { id: 2, value: "Tidak Sianosis" },
])
const keadaanUmums = ref([
    { id: 1, value: "Interaksi Biasa" },
    { id: 2, value: "Interaksi Non Biasa" },
])

const schemaTandaVital = computed(() =>
    toTypedSchema(
        yup.object({
            kriteriaPemantauan: yup.string(),
            respirasiAnak: yup.string(),
            kardiovaskulerAnak: yup.string(),
            keadaanUmum: yup.string(),
            waktuAsesmen: yup.date(),
            frekuensiNafas: yup.number(),
            frekuensiNadi: yup.number(),
            suhu: yup.number().positive("Suhu must be positive"),
            bloodOxygen: yup.number().positive("Blood Oxygen must be positive"),
            gulaDarah: yup.number().positive("Gula Darah must be positive"),
            CRT: yup.boolean().default(false),
            oksigenTambahan: yup.boolean().default(false),
            tekananDarah: yup.number().required("Tekanan Darah is required").positive("Tekanan Darah must be positive"),
            petugas: yup.string().required('Petugas alergi is required')
        })
    )
);

// respirasi,kardiovaskuler, keadaanumum

const {
    handleSubmit: handleSubmitTandaVital,
    defineField: defineFieldTandaVital, setValues
} = useForm({
    validationSchema: schemaTandaVital,
});


const [kriteriaPemantauan] = defineFieldTandaVital("kriteriaPemantauan");
const [respirasiAnak] = defineFieldTandaVital("respirasiAnak");
const [kardiovaskulerAnak] = defineFieldTandaVital("kardiovaskulerAnak");
const [keadaanUmum] = defineFieldTandaVital("keadaanUmum");

const [waktuAsesmen] = defineFieldTandaVital("waktuAsesmen");
const [frekuensiNafas] = defineFieldTandaVital("frekuensiNafas");
const [frekuensiNadi] = defineFieldTandaVital("frekuensiNadi");
const [suhu] = defineFieldTandaVital("suhu");
const [bloodOxygen] = defineFieldTandaVital("bloodOxygen");
const [gulaDarah] = defineFieldTandaVital("gulaDarah");
const [CRT] = defineFieldTandaVital("CRT");
const [oksigenTambahan] = defineFieldTandaVital("oksigenTambahan");
const [tekananDarah] = defineFieldTandaVital("tekananDarah");
const [petugas] = defineFieldTandaVital("petugas");



// Do the same for other numeric fields as needed



const onSubmitTandaVital = handleSubmitTandaVital((values: any) => {
    console.log("Adding new data", values);
    values.kardiovaskulerAnak = Number(values.kardiovaskulerAnak);
    values.keadaanUmum = Number(values.keadaanUmum);
    values.respirasiAnak = Number(values.respirasiAnak);
    currentMethod.value = 'detail'
    emit("edit");
})

onBeforeMount(async () => {
    setValues({petugas:"NamaKu"})
})

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});


</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
        <template #header> Tanda Vital</template>
        <template #content>
            <div v-if="currentMethod == 'form'">
                <div class="grid grid-cols-4 gap-[30px] py-3">
                    <CustomSelect label="Kriteria Pemantauan" v-model="kriteriaPemantauan" :options="criterias"
                        optionValue="value" optionLabel="value" :isLoading="false" :invalid="false"
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
                        <CustomSelect label="Respirasi Anak" v-model="respirasiAnak" :options="respirasis"
                            optionValue="id" optionLabel="value" :isLoading="false" :invalid="false"
                            invalidMessage="Wajib diisi" :disabled="false" placeHolder="Tidak ada retraksi / RR Normal"
                            customSelectClass="border-[#C7CBD2]" />
                    </div>
                </div>
                <!-- Baris Keempat -->
                <div class="grid grid-cols-2 gap-[30px] py-3">
                    <CustomSelect label="Kardiovaskuler Anak" v-model="kardiovaskulerAnak"
                        :options="kardiovaskulers" optionValue="id" optionLabel="value" :isLoading="false"
                        :invalid="false" invalidMessage="Wajib diisi" :disabled="false" placeHolder="Mungkin Sianosis"
                        customSelectClass="border-[#C7CBD2]" />
                    <CustomSelect label="Keadaan Umum" v-model="keadaanUmum" :options="keadaanUmums"
                        optionValue="id" optionLabel="value" :isLoading="false" :invalid="false"
                        invalidMessage="Wajib diisi" :disabled="false" placeHolder="Interaksi Mungkin Biasa"
                        customSelectClass="border-[#C7CBD2]" />
                </div>
            </div>

            <div v-if="currentMethod == 'detail'" class="py-5 flex flex-col gap-[19px]">
                <CustomInfoRow label="Kriteria Pemantauan" :value="kriteriaPemantauan" />
                <CustomInfoRow label="Waktu Asesmen" :value="`${waktuAsesmen}`" />
                <CustomInfoRow label="Frekuensi Napas" :value="`${frekuensiNafas}`" />
                <CustomInfoRow label="Frekuensi Nadi" :value="`${frekuensiNadi}`" />
                <CustomInfoRow label="Suhu" :value="`${suhu}`" />
                <CustomInfoRow label="Capillary Refill Time (CRT > 2 Detik)" :value="`${CRT}`" />
                <CustomInfoRow label="Blood Oxygen" :value="`${bloodOxygen}`"/>
                <CustomInfoRow label="Gula Darah" :value="`${gulaDarah}`" />
                <CustomInfoRow label="Oksigen Tambahan" :value="`${oksigenTambahan}`" />
                <CustomInfoRow label="Tekanan Darah" :value="`${tekananDarah}`" />
                <CustomInfoRow label="Respirasi Anak" :value="`${respirasiAnak}`" />
                <CustomInfoRow label="Kardiovaskuler Anak" :value="`${kardiovaskulerAnak}`" />
                <CustomInfoRow label="Keadaan Umum" :value="`${keadaanUmum}`" />
                <hr class="border-grey-200">
                <CustomInfoRow label="Petugas Input" :value="petugas" />
            </div>
        </template>
        <template #footer>
            <div class="flex items-end justify-end gap-3">
                <CustomButton v-if="currentMethod == 'form'" label="Reset" textColor="text-[#9DA4B1]"
                    backgroundColor="bg-transparent" borderColor="border-2 border-[#9DA4B1]" />
                <CustomButton  v-if="currentMethod=='form'"  label="Simpan" @click="onSubmitTandaVital"/>
                <CustomButton v-if="currentMethod == 'detail'" label="Edit" />
            </div>
        </template>
    </CustomAccordion>


</template>
