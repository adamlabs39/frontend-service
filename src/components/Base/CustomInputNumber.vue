<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: -100,
  },
  max: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  buttonLayout: {
    type: String,
    default: "Horizontal",
  },
  step: {
    type: Number,
    default: 2,
  },
  label: {
    type: String,
    default: "Label",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
});

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue", "change"]);

const onInput = (event: any) => {
  console.log(`Event: `, event);
  if (!event) return;
  emit("update:modelValue", event.target?.value);
  emit("change", event.value);
};
</script>


<template>
  <div>
    <div class="p-3">
      <label
        for="horizontal-buttons"
        class="block mb-2 font-bold"
        v-if="showLabel"
        >{{ props.label }}</label
      >
      <div class="flex card">
        <InputNumber
          v-model="value"
          inputId="horizontal-buttons"
          showButtons
          :buttonLayout="buttonLayout"
          fluid
          :min="min"
          :max="max"
          @input="onInput"
          :step="step"
        >
        
        </InputNumber>
      </div>
    </div>
  </div>
</template>

