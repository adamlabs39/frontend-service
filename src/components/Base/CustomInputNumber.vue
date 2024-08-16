<script setup lang="ts">
import { computed, ref } from "vue";
type FormatType = "decimal" | "currency" | undefined;

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
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
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  prependIcon: {
    type: String,
    default: "",
  },
  appendIcon: {
    type: String,
    default: "",
  },
  showButtons: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 1,
  },
  mode: {
    type: String as () => FormatType,
    default: "decimal",
  },
  currency: {
    type: String,
    default: 'IDR',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// const value = ref(props.modelValue);
const value = computed({
  get: () => props.modelValue,
  set: (value: number) => emit("update:modelValue", value),
});

const emit = defineEmits(["update:modelValue", "clickPrepend", "clickAppend"]);
// const onInput = (event: any) => {
//   if (!event) return;
//   emit("update:modelValue", event.target?.value);
// };

const alerTest = () => {
  alert("masuk gan");
};
defineExpose({
  alerTest,
});
</script>
<template>
  <div>
    <label
      v-if="showLabel"
      class="block font-semibold mb-[5px]"
      :class="{ 'text-grey-300': disabled }"
    >
      {{ label }}
    </label>
    <div class="flex">
      <div
        v-if="$slots.prependText"
        @click="emit('clickPrepend')"
        class="flex border border-r-0 border-solid rounded-l-lg cursor-pointer border-grey-400 text-SM text-neutral-300"
      >
        <slot name="prependText" />
      </div>
      <IconField class="grow">
        <InputIcon v-if="prependIcon" class="-mt-[11px] -ml-[2px]">
          <component
            @click="emit('clickPrepend')"
            :is="prependIcon"
            weight="bold"
            :size="22"
            :color="invalid ? 'red' : 'black'"
            class="cursor-pointer"
          ></component>
        </InputIcon>
        <InputNumber
          v-model="value"
          class=""
          :pt:pcInput:root:class="{
            'border-red-500 text-red-500': invalid,
            'rounded-r-none border-r-0': $slots.appendText,
            'rounded-l-none border-l-0': $slots.prependText,
            'h-10 pt-1 rounded-lg border-grey-400': true,
          }"
          :min="min"
          :max="max"
          fluid
          :placeholder="placeholder"
          :showButtons="showButtons"
          :step="step"
          :mode="mode"
          :currency="currency"
          :locale="'id-ID'"
          :disabled="disabled"
        />
        <InputIcon v-if="appendIcon" class="-mt-[11px] -ml-[2px]">
          <component
            @click="emit('clickAppend')"
            :is="appendIcon"
            weight="bold"
            :size="22"
            :color="invalid ? 'red' : 'black'"
            class="ml-auto cursor-pointer"
          ></component>
        </InputIcon>
      </IconField>
      <div
        v-if="$slots.appendText"
        @click="emit('clickAppend')"
        class="flex font-bold border border-l-0 border-solid rounded-r-lg cursor-pointer border-grey-400 text-SM text-adameds-300"
      >
        <slot name="appendText" />
      </div>
    </div>
    <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
  </div>
</template>
