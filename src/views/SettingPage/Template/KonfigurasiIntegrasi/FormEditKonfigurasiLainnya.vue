<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomSwitch from '@/components/Base/CustomSwitch.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';
import { ref } from 'vue';

const selectedMetode = ref();
const metode = ref([
    { name: "Jawa Timur", code: "JATIM" },
    { name: "Jawa Tengah", code: "JATENG" },
    { name: "Jawa Barat", code: "JABAR" },
    { name: "Sulawesi Utara", code: "SULUT" },
    { name: "Kalimantan Selatan", code: "KALSEL" },
]);

const status = ref();

const props = defineProps({
    buttonClickHandler: {
		type: Function as () => any,
		default: () => {}
	},
})
</script>


<template>
    <div>
        <div class="grid grid-cols-2 gap-7">
            <CustomTextfield label="API Key Post" class="border-[#C7CBD2]" placeholder="API Key Post" />
            <div>
                <CustomSelect label="Metode" v-model="selectedMetode" :options="metode" optionValue="code"
                    optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
                    :disabled="false" placeHolder="Pilih Metode" customSelectClass="border-[#C7CBD2]" />
            </div>
            <CustomTextfield label="URL End Point" class="border-[#C7CBD2]" placeholder="URL End Point" />
            <CustomTextfield label="Header" class="border-[#C7CBD2]" placeholder="Header" />
            <CustomTextfield label="Request" class="border-[#C7CBD2]" placeholder="Insert Payload Here ..." />
            <CustomTextfield label="Response" class="border-[#C7CBD2]" placeholder="Insert Payload Here ..." />
        </div>

        <!-- Garis Pertama -->
        <hr class="border-[#D9DCE1] border-1 mt-7 mb-2" />


        <div class="flex flex-col">
            <div class="font-semibold mb-[5px]">
                Status
            </div>
            <div class="flex items-center gap-2 h-10 p-2 rounded-lg border-[#C7CBD2] border-[1px] bg-white text-[#6B7280]">
                <CustomSwitch v-model="status" />
                <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
            </div>
        </div>

        <hr class="border-[#D9DCE1] border-1 mt-12 mb-5" />

        <!-- Setelah garis ada Button -->
        <div class="flex items-end justify-end gap-3">
            <CustomButton label="Batal" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                borderColor="border-2 border-[#9DA4B1]" @click="buttonClickHandler"/>
            <CustomButton label="Simpan" />
        </div>
    </div>
</template>


<style lang="scss" scoped></style>