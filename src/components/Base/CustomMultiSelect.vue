<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  autoResize: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "Outlined",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "Label",
  },
  placeholder: {
    type: String,
    default: "Text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionValue: {
    type: String,
    default:"value"
  },
  optionLabel: {
    type: String,
    default:"Label"
  },
  maxSelectedLabels: {
    type: Number,
    default: 2,
  },
});
const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue","change"]);

const onSelect = (event: any) => {
  console.log(`Event: `,event)
  if (!event) return;
  emit("update:modelValue", event.target?.value);
  emit("change", event.value);
};

const alerTest = () => {
  alert("masuk gan");
};
defineExpose({
  alerTest,
});
</script>



<template>
  <div class="">
    <label class="font-bold" v-if="showLabel">{{ props.label }}</label>
    <MultiSelect
      v-model="value"
      :options="options"
      @change="onSelect"
      :optionValue="optionValue"
      :optionLabel="optionLabel"
      fluid
      filter
      display="chip"
      :placeholder="placeholder"
      :maxSelectedLabels="maxSelectedLabels"
      class="h-20 pt-1 pl-1 border-2 rounded-lg border-neutral-normal"
      :class="{
        'border-red-500 text-red-500': invalid,
      }"
    />
  </div>
</template>

