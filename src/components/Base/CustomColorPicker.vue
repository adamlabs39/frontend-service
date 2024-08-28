<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    icon: {
        type: String,
        default: "",
    },
    showIcon: {
        type: Boolean,
        default: false,
    },
});

const selectedColor = ref('#14B8A6');

const emitColorChange = defineEmits<{
    (e: 'update:color', color: string): void;
}>();

function handleColorChange(event: Event) {
    const target = event.target as HTMLInputElement;
    selectedColor.value = target.value;
    emitColorChange('update:color', selectedColor.value);
}
</script>

<template>
    <div class="flex items-center">
        <input type="color" v-model="selectedColor" @input="handleColorChange"
            class="w-24 h-16 bg-transparent border-none cursor-pointer " />
    </div>
</template>

<style>

</style>
