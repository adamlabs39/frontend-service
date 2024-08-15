<script setup lang="ts">
import { ref } from "vue";
import Textarea from "primevue/textarea";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  autoResize: {
    type: Boolean,
    default: false,
  },
  required: {
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
  height: {
    type: String,
    default: "h-20",
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
</script>

<template>
  <div class="">
    <label
      v-if="showLabel"
      class="block font-semibold mb-[5px]"
      :class="{ 'text-grey-300': disabled }"
    >
      {{ props.label }}<span v-if="required" class="text-danger-300">*</span>
    </label>
    <Textarea
      v-model="value"
      @input="onInput"
      :placeholder="placeholder"
      fluid
      :disabled="disabled"
      :invalid="invalid"
      class="pt-2 pl-3 pb-0 rounded-lg border-[1px] w-full"
      :class="{
        'border-danger-300 text-danger-300': invalid,
        'border-grey-200 bg-grey-100': disabled,
        'border-grey-400': !disabled && !invalid,
        [props.height]: true,
      }"
    />
    <small v-if="invalid" class="text-danger-300">{{ invalidMessage }}</small>
  </div>
</template>
