<script setup lang="ts">
import { computed, ref } from "vue";
type FormatType = "decimal" | "currency" | undefined;

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
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
    default: "IDR",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  alignNumber: {
    type: String,
    default: "text-start",
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
      class="block font-semibold mb-[5px] text-normal"
      :class="{ 'text-grey-300': disabled }"
    >
      {{ label }}<span v-if="required" class="text-danger-300">*</span>
    </label>
    <div class="flex">
      <div
        v-if="$slots.prependText"
        @click="emit('clickPrepend')"
        class="flex border border-r-0 border-solid rounded-l-lg cursor-pointer text-SM text-grey-300"
        :class="{
          'text-danger-300 border-danger-300': invalid,
          'border-grey-200': !disabled && !invalid,
          'border-grey-200 bg-grey-100': disabled,
        }"
      >
        <slot name="prependText" />
      </div>
      <!-- <InputIcon v-if="prependIcon" class="-mt-[11px] -ml-[2px]">
          <component
            @click="emit('clickPrepend')"
            :is="prependIcon"
            weight="bold"
            :size="22"
            class="cursor-pointer"
            :class="{
              'text-danger-300': invalid,
              'text-black': !disabled && !invalid,
              'text-grey-300': disabled,
            }"
          ></component>
        </InputIcon> -->
      <InputNumber
        buttonLayout="horizontal"
        v-model="value"
        :pt:pcInput:root:class="{
          'border-danger-300 text-danger-300': invalid,
          'border-grey-200 bg-grey-100 text-grey-300': disabled,
          'border-grey-200': !disabled && !invalid,
          'rounded-r-none border-r-0': $slots.appendText,
          'rounded-l-none border-l-0': $slots.prependText,
          'h-10 pt-1 text-black text-SM ': true,
          'text-center px-0': showButtons,
          'text-start ': !showButtons,
          [alignNumber]: true,
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
        :pt="{
          incrementButton: {
            class: 'bg-adameds-300 text-white border border-adameds-300',
          },
          decrementButton: {
            class: 'bg-adameds-300 text-white border-adameds-300',
          }
        }"
        :dt="{
          placeholderColor: invalid ? '#e9594c' : '#90969E',
          color:'#000000'
        }"
      >
        <template #incrementbuttonicon>
          <PhPlus :size="20" />
        </template>
        <template #decrementbuttonicon> <PhMinus :size="20" /> </template
      ></InputNumber>
      <!-- <InputIcon v-if="appendIcon" class="-mt-[11px] -ml-[2px]">
          <component
            @click="emit('clickAppend')"
            :is="appendIcon"
            weight="bold"
            :size="22"
            class="ml-auto cursor-pointer"
            :class="{
              'text-danger-300': invalid,
              'text-black': !disabled && !invalid,
              'text-grey-300': disabled,
            }"
          ></component>
        </InputIcon> -->

      <div
        v-if="$slots.appendText"
        @click="emit('clickAppend')"
        class="flex font-bold border border-l-0 border-solid rounded-r-lg cursor-pointer text-SM"
        :class="{
          'text-danger-300 border-danger-300': invalid,
          'border-grey-200 text-adameds-300': !disabled && !invalid,
          'border-grey-200 bg-grey-100 text-grey-300': disabled,
        }"
      >
        <slot name="appendText" />
      </div>
    </div>
    <small v-if="invalid" class="text-red-500 text-XS">{{
      invalidMessage
    }}</small>
  </div>
</template>
