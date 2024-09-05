<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';
import CustomSwitch from '@/components/Base/CustomSwitch.vue';

import CustomTextfield from '@/components/Base/CustomTextfield.vue';

import { ref } from "vue";

const props = defineProps({
    buttonClickHandler: {
        type: Function as () => any,
        default: () => { }
    },
})

const status = ref();
</script>


<template>
    <div>
        <div class="grid grid-cols-2 gap-7 text-normal">
            <CustomTextfield label="Organization ID" class="border-[#C7CBD2]" placeholder="Organization ID" />
            <CustomTextfield label="Client Secret" class="border-[#C7CBD2]" placeholder="Client Secret" />

            <div class="grid">
                <CustomTextfield label="Client ID" class="border-[#C7CBD2]" placeholder="Client ID" />
            </div>
        </div>

        <hr class="border-[#D9DCE1] border-1 mt-7 mb-2" />

        <div class="flex flex-col">
            <div class="font-semibold mb-[5px]">Status</div>
            <div class="flex items-center gap-2">
                <CustomSwitch v-model="status" label="" />
                <!-- <div class="mt-2.5">{{ status === true ? "Aktif" : "Non-Aktif" }}</div> -->
            </div>
        </div>

        <hr class="border-[#D9DCE1] border-1 mt-12 mb-5" />
        <div class="flex items-end justify-end gap-3">
            <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                borderColor="border-2 border-[#9DA4B1]" @click="buttonClickHandler" />
            <CustomButton label="Simpan" />
        </div>
    </div>


</template>


<style lang="scss" scoped></style>