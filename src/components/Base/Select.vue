<script lang="ts" setup>
import { ref, computed } from "vue";

export interface OptionList {
  name: string;
  code: string;
}

const props = defineProps({
    showLabel: {
        type: Boolean,
        default: true,
    },
    label: {
        type: String,
        default: "Label",
    },
    modelValue: {
        default: "",
    },
    options: {
        type: Array<OptionList>,
        default: () => []
    },
    optionValue: {
        type: String,
        default: "value"
    },
    optionLabel: {
        type: String,
        default: "label"
    },
    isLoading: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    invalid: {
        type: Boolean,
        default: false,
    },
    invalidMessage: {
        type: String,
        default: "",
  },
    
});

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue", "change"]);

const showClear = computed(() => {
    return value.value !== "";
});

const onChange = (event: any) => {
    if (!event) return;
    emit("update:modelValue", event.value);
    emit("change", event.value);
};
</script>

<template>
    <div class="flex flex-col">
        <label v-if="showLabel" class="block font-semibold mb-[5px]">
            {{ label }}
        </label>
        <Select
            v-model="value"
            :options="options"
            :optionValue="optionValue"
            :optionLabel="optionLabel"
            :loading="isLoading"
            :showClear="showClear"
            placeholder="Select"
            :disabled="disabled"
            @change="onChange"
            variant="filled"
            :class="{
                'border-red-500 text-red-500': invalid,
                'w-full md:w-56 h-10 rounded-lg border-neutral-normal': true
            }"
        >
            <template #dropdownicon>
                <PhCaretDown
                    weight="fill"
                    :class="{ 'text-red-500': invalid, 'text-black': modelValue }"
                />
            </template>
        </Select>
        <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
    </div>
</template>

