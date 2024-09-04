<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
  },
  sideLabel: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
const checked = computed({
  get: () => props.modelValue,
  set: (value: any) => emit("update:modelValue", value),
});

const selectRadio = (value: string) => {
  checked.value = value;
};
</script>

<template>
  <label
    v-if="label"
    class="block font-semibold mb-[5px]"
    :class="{ 'text-grey-300': disabled }"
    @click="() => {}"
  >
    {{ props.label }}
  </label>
  <div
    @click="selectRadio(value)"
    class="flex px-3 py-2 border-2 border-gray-200 rounded-lg cursor-pointer"
    :class="{
      'bg-adameds-50': checked===value ,
    }"

  >
    <RadioButton
      v-model="checked"
      :value="value"
      class="mr-[10px]"
      :dt="{
        checkedBackground: '#ffffff',
        iconCheckedColor: '#14B8A6',
      }"
    />
    <div class="leading-5 text-normal">{{ sideLabel }}</div>
  </div>
</template>
