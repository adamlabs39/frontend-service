<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomSelect from '@/components/Base/CustomSelect.vue';

import CustomTextfield from '@/components/Base/CustomTextfield.vue';

import { ref } from "vue";

const props = defineProps({
    buttonClickHandler: {
		type: Function as () => any,
		default: () => {}
	},
})
</script>


<template>
    <div>
        <div class="grid grid-cols-2 gap-7 text-normal">
            <CustomTextfield label="Base URL" class="border-[#C7CBD2]" placeholder="Base URL" />
            <CustomTextfield label="User Key" class="border-[#C7CBD2]" placeholder="User Key" />
            <CustomTextfield label="Cons ID (BPJS)" class="border-[#C7CBD2]" placeholder="Port" />
            <CustomTextfield label="Secret Key" class="border-[#C7CBD2]" placeholder="Secret Key" />
            <div class="grid">
                <CustomTextfield label="PPK" class="border-[#C7CBD2]" placeholder="PPK" />
            </div>
        </div>
        <hr class="border-[#D9DCE1] border-1 mt-12 mb-5 w-full" />
        <div class="flex items-end justify-end gap-3">
            <CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
                borderColor="border-2 border-[#9DA4B1]"  @click="buttonClickHandler"/>
            <CustomButton label="Simpan" />
        </div>
    </div>


</template>


<style lang="scss" scoped></style>