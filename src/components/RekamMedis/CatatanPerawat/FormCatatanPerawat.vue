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

const props = defineProps({
    method: {
        type: String,
        default: "detail",
    }
})


const messages = ref([
    {
        role: "Perawat 01",
        text: "Lorem ipsum dolor sit amet consectetur.",
        date: "01 Januari 2024",
        time: "10:01",
        isSender: false,
        avatar: catatanPerawat01,
        actions: [
            { text: "Balas", icon: PhArrowUUpLeft },
        ],
    },
    {
        role: "Anda",
        text: "Lorem ipsum dolor sit amet consectetur.",
        date: "01 Januari 2024",
        time: "10:10",
        isSender: true,
        avatar: catatanPerawatAnda,
        actions: [
            { text: "Edit", icon: PhPencil },
            { text: "Balas", icon: PhArrowUUpLeft },
        ],
    },
]);


const catatanPerawat = ref("");
</script>

<template>
    <CustomAccordion headerClass="bg-adameds-50">
        <template #header>Catatan Perawat</template>
        <template #content>
            <div class="pt-5 space-y-2.5">
                <div v-for="(message, index) in messages" :key="index" class="flex items-start gap-2.5"
                    :class="{ 'flex-row-reverse': message.isSender }">
                    <img :src="message.avatar" alt="Avatar" />
                    <div class="space-y-2.5">
                        <div class="flex items-center w-full gap-5">
                            <div class="font-semibold text-adameds-300 text-SM">
                                {{ message.role }}
                            </div>
                            <div class="flex gap-2.5 font-medium text-SM text-grey-400">
                                <div class="flex items-center gap-[2px]">
                                    <PhCalendarDots :size="12" weight="fill" />
                                    {{ message.date }}
                                </div>
                                <div class="flex items-center gap-[2px]">
                                    <PhClock :size="12" weight="fill" />
                                    {{ message.time }}
                                </div>
                            </div>
                        </div>
                        <div :class="message.isSender ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]' : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]'"
                            class="min-h-[45px] bg-adameds-50 px-4 text-SM font-normal flex items-center">
                            {{ message.text }}
                        </div>
                        <div :class="message.isSender ? 'justify-start' : 'justify-end'" class="flex gap-4">
                            <button v-for="action in message.actions" :key="action.text" v-if="props.method == 'form'"
                                class="flex items-center gap-2 font-medium text-SM"
                                :style="{ color: action.text === 'Edit' ? '#3D84E5' : '#14B8A6' }">
                                <!-- Dynamically render the icon component -->
                                <component :is="action.icon" :size="16" />
                                {{ action.text }}
                            </button>
                        </div>
                    </div>
                </div>

                <hr class="border-grey-200 my-2.5" />
                <div v-if="props.method == 'form'" class="space-y-2.5">
                    <CustomChip label="Membalas Perawat01" selected-color="border-0 bg-[#14B8A6]"
                        :showCheckedIcon="false" bgColor="bg-adameds-300" textColor="text-white"
                        borderColor="border-transparent" customClass="h-5 pr-[6px]" />
                    <div class="space-y-2.5">
                        <CustomTextArea v-model="catatanPerawat" label="Catatan Antar Perawat"
                            placeholder="Ketik Catatan..." />
                        <CustomButton :full="true" icon="PhPaperPlaneTilt" label="Kirim Catatan" />
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </template>
    </CustomAccordion>
</template>