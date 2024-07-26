<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  invalidMessage: {
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
  type: {
    type: String,
    default: "text",
  },
  appendIcon: {
    type: String,
    default: "",
  },
  prependIcon: {
    type: String,
    default: "",
  },
  appendText: {
    type: String,
    default: "",
  },
  prependText: {
    type: String,
    default: "",
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
<template>
  <div>
    <label v-if="showLabel" class="block font-semibold mb-[5px]">{{
      label
    }}</label>
    <IconField>
      <InputIcon v-if="appendIcon || appendText" class="block -mt-[11px] -ml-[2px]">
        <div v-if="appendText" class="text-SM text-neutral-300">{{ appendText }}</div>
        <component
          v-else
          :is="appendIcon"
          weight="bold"
          :size="22"
          :color="invalid ? 'red' : 'black'"
        ></component>
      </InputIcon>
      <InputText
        :type="type"
        v-model="value"
        @input="onInput"
        class="h-10 pt-1 rounded-lg border-neutral-normal"
        :class="{ 'border-red-500 text-red-500': invalid, 'pr-16': prependText, 'pl-16': appendText }"
        :disabled="disabled"
        fluid
      />
      <InputIcon v-if="prependIcon || prependText" class="-mt-[11px] -ml-[2px]">
        <div v-if="prependText" class="w-full font-bold text-SM text-adameds-A300">
          {{ prependText }}
        </div>
        <component
          v-else
          :is="prependIcon"
          weight="bold"
          :size="22"
          :color="invalid ? 'red' : 'black'"
          class="ml-auto"
        ></component>
      </InputIcon>
    </IconField>
    <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
  </div>
</template>
