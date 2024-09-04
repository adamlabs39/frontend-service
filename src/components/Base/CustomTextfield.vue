<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
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
  type: {
    type: String,
    default: "text",
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
  disabled: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: 8, 
  }
});

// const value = ref(props.modelValue);
const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
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
      class="block font-semibold mb-[5px] truncate"
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
          'border-grey-400': !disabled && !invalid,
          'border-grey-200 bg-grey-100': disabled,
        }"
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
            class="cursor-pointer"
            :class="{
              'text-danger-300': invalid,
              'text-black': !disabled && !invalid,
              'text-grey-300': disabled,
            }"
          ></component>
        </InputIcon>
        <InputText
          :type="type"
          v-model="value"
          class="h-10 pt-1 rounded-lg"
          :class="{
            'border-danger-300 text-danger-300': invalid,
            'border-grey-200 bg-grey-100 text-grey-300': disabled,
            'border-grey-400': !disabled && !invalid,
            'rounded-r-none border-r-0': $slots.appendText,
            'rounded-l-none border-l-0': $slots.prependText,
          }"
          :disabled="disabled"
          fluid
          :placeholder="placeholder"
        />
        <InputIcon v-if="appendIcon" class="-mt-[11px] -ml-[2px]">
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
        </InputIcon>
      </IconField>
      <div
        v-if="$slots.appendText"
        @click="emit('clickAppend')"
        class="flex font-bold border border-l-0 border-solid rounded-r-lg cursor-pointer text-SM"
        :class="{
          'text-danger-300 border-danger-300': invalid,
          'border-grey-400 text-adameds-300': !disabled && !invalid,
          'border-grey-200 bg-grey-100 text-grey-300': disabled,
        }"
      >
        <slot name="appendText" />
      </div>
    </div>
    <small v-if="invalid" class="text-danger-300">{{ invalidMessage }}</small>
  </div>
</template>
