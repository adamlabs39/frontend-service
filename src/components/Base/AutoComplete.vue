<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "Label",
  },
  suggestions: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: null,
  },
});

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);


const onChange = (event: any) => {
  if (!event) return;
  emit("update:modelValue", event.target?.value);
};
</script>

<template>
  <div class="flex flex-col justify-center w-1/2 p-8">
    <label v-if="showLabel" class="font-bold">{{ props.label }}</label>
    <AutoComplete
      v-model="value"
      dropdown
      :suggestions="suggestions"
      @complete="onChange"
    >
      <template #dropdownicon>
        <PhAirplaneTilt :size="32" />
      </template>
    </AutoComplete>
  </div>
</template>
