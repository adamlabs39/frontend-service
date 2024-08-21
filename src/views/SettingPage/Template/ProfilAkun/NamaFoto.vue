<script setup lang="ts">
import { ref } from 'vue';
import GreenCard from '../GreenCard.vue';

const props = defineProps({
    editHandler: {
        type: Function,
        required: true
        
    }
})
const profileResponse = ref({
    name: '',
    email: '',
    phone: '',
    photo: '',
    role: {
        name: ''
    },
    username: '',
    password: '',
    inventoryMedis: '',
    inventoryNonMedis: ''
});
</script>

<template>
     <GreenCard cardHeading="Foto Profile dan Nama Lengkap" hrEnableCustomClass showButton labelButton="Edit"
                    :buttonClickHandler="props.editHandler">
                    <div class="flex gap-10 ">
                        <!-- Image -->
                        <div class="w-[200px] h-[200px] flex justify-center items-center relative">
                            <img :src="profileResponse.photo ? profileResponse.photo : `tes`" alt="">
                        </div>
                        <div class="flex flex-col justify-evenly ">
                            <div>
                                <div class="col-span-2 text-sm underline">Nama Lengkap</div>
                                <div class="font-bold text-heading"> {{ profileResponse.name }}</div>
                            </div>

                            <div class="grid grid-cols-3">
                                <div class="w-80">
                                    <div class="text-sm underline">Role</div>
                                    <div class="font-bold text-heading">{{ profileResponse.role.name }}</div>
                                </div>
                                <div class="grow">
                                    <div class="text-sm underline">Email</div>
                                    <div class="font-bold text-heading">{{ profileResponse.email }}</div>
                                </div>
                                <div class="w-[180px]">
                                    <div class="text-sm underline">No. Handphone</div>
                                    <div class="font-bold text-heading">{{ profileResponse.phone }}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </GreenCard>
</template>