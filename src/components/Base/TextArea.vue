<template>
  <div class="p-3">
    <label class="font-bold" v-if="showLabel">{{ props.label }}</label>
    <div class="flex flex-col card">
      <Textarea
        v-model="value"
        @input="onInput"
        :placeholder="placeholder"
        fluid
        :disabled="disabled"
        :invalid="invalid"
        class="h-20 pt-1 pl-1 border-2 rounded-lg border-neutral-normal"
        :class="{
          'border-red-500 text-red-500': invalid,
        }"
      />
    </div>
  </div>
</template>

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
});
const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const onInput = (event: any) => {
  if (!event) return;
  emit("update:modelValue", event.target?.value);
};

const alerTest = () => {
  alert("masuk gan");
};
defineExpose({
  alerTest,
});
</script>
