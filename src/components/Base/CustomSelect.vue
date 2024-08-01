<script lang="ts" setup>
import { ref, computed } from "vue";


const props = defineProps({
    showLabel: {
        type: Boolean,
        default: true,
    },
    label: {
        type: String,
        default: "Label",
    },
    placeHolder:{
        type:String,
        default:"PlaceHolder"
    },
    modelValue: {
        default: "",
    },
    options: {
        type: Array,
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
    console.log(event);
    
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
            :placeholder="placeHolder"
            :disabled="disabled"
            @change="onChange"
            variant="filled"
            class="h-10 rounded-lg border-neutral-normal"
            :invalid=" invalid"
            fluid
            filter
            filterPlaceholder="Search"
            pt:pcFilterIconContainer:class="flex items-center"
            pt:pcFilter:root:class="border-neutral-normal"
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


