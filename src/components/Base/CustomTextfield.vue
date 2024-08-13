<script setup lang="ts">
import { computed, ref } from "vue";

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
        <InputText
          :type="type"
          v-model="value"
          class="h-10 pt-1 rounded-lg border-grey-400"
          :class="{
            'border-red-500 text-red-500': invalid,
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
