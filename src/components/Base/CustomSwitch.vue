<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    showLabel:{
        type:String,
        default:"",
    },
    label:{
        type:String,
        default:"Label",
    },
    modelValue: {
        type:Boolean,
        default:false
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
})

const checked = ref(props.modelValue);
const emit = defineEmits(["update:modelValue", "change"]);

const onChange = (event: any) => {
    
    if (!event) return;
    emit("update:modelValue", event.target.checked);
    emit("change", event.target.checked);
};

</script>
<template>
    <div class="flex flex-col">
        <label v-if="showLabel" class="block font-semibold mb-[5px]" >
            {{ label }}
        </label>
        <ToggleSwitch 
            v-model="checked"  
            :disabled="disabled"
            fluid
            :invalid="invalid"
            @input="onChange" 
        />
        <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
    </div>
</template>