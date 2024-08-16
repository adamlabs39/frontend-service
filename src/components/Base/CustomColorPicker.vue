<script setup lang="ts">
import ColorPicker from 'primevue/colorpicker';
import { ref } from 'vue';


const props = defineProps({
    modelValue: {
        type: String,
        default:""
    },
    defaultColor: {
        type: String,
        default: "ff0000"
    },
    inline: {
        type: Boolean,
        default:false
    }
})

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue", "change"]);

const onColorChange = (event:any) => {
    console.log(`Event: `, event);
    if (!event) return;
    emit("update:modelValue", event.target?.value);
    emit("change", event.value);
}

const alerTest = () => {
  alert("masuk gan");
};

</script>


<template>
    <div>
        <ColorPicker @change="onColorChange" v-model="value" :inline="inline" :default-color="defaultColor" space/>
    </div>
</template>


<style lang="scss" scoped>

</style>