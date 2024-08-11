<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  showLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "Label",
  },
  bgSwitch: {
    type: String,
    default: "#9fe2db",
  },
  bgSlider: {
    type: String,
    default: "#14B8A6",
  },
  modelValue: {
    type: Boolean,
    default: false,
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
    <label v-if="showLabel" class="block font-semibold mb-[11px]">
      {{ label }}
    </label>
    <ToggleSwitch
      v-model="checked"
      :disabled="disabled"
      fluid
      :invalid="invalid"
      @input="onChange"
      class=""
      :dt="{
        width: '48px',
        height: '28px',
        handleSize: '20px',
        checkedBackground: bgSwitch,
        handleCheckedBackground: bgSlider,
        checkedHoverBackground: bgSwitch,
        handleCheckedHoverBackground: bgSlider,
      }"
    />
    <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
  </div>
</template>
