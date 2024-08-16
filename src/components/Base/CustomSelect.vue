<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
  showLabel: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "Label",
  },
  placeHolder: {
    type: String,
    default: "",
  },
  prependIcon: {
    type: String,
    default: "",
  },
  modelValue: {
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: "label",
  },
  optionValue: {
    type: String,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
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
  showFilter: {
    type: Boolean,
    default: true,
  },
  invalidMessage: {
    type: String,
    default: "",
  },
});

// const value = ref(props.modelValue);
const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const emit = defineEmits(["update:modelValue", "change", "clickPrepend"]);

const showClear = computed(() => {
  return value.value !== "";
});

// const onChange = (event: any) => {
//   console.log(event);

//   if (!event) return;
//   emit("update:modelValue", event.value);
//   emit("change", event.value);
// };
</script>

<template>
  <div class="">
    <label
      v-if="showLabel"
      class="block font-semibold mb-[5px]"
      :class="{ 'text-grey-300': disabled }"
    >
      {{ label }}<span v-if="required" class="text-danger-300">*</span>
    </label>
    <InputGroup>
      <InputGroupAddon
        v-if="prependIcon"
        class="rounded-l-lg border-grey-400"
        :class="{ 'bg-grey-100': disabled }"
      >
        <component
          @click="emit('clickPrepend')"
          :is="prependIcon"
          weight="bold"
          :size="22"
          class="cursor-pointer"
          :class="{
            'text-danger-300': invalid,
            'text-grey-300': disabled,
            'text-black': !disabled && !invalid,
          }"
        ></component>
      </InputGroupAddon>
      <Select
        v-model="value"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :loading="isLoading"
        :showClear="showClear"
        :placeholder="placeHolder"
        :disabled="disabled"
        class="h-10 rounded-lg"
        :class="[
          prependIcon ? 'border-l-0 rounded-l-none' : '',
          invalid ? 'border-danger-300 text-danger-300' : '',
          disabled ? 'border-grey-200 bg-grey-100' : 'border-grey-400',
        ]"
        :invalid="invalid"
        fluid
        :filter="showFilter"
        filterPlaceholder="Search"
        pt:pcFilterIconContainer:class="flex items-center"
        pt:pcFilter:root:class="border-grey-400"
      >
        <template #dropdownicon>
          <PhCaretDown
            weight="fill"
            :class="{
              'text-red-500': invalid,
              'text-black': modelValue,
              'text-grey-300': disabled,
            }"
          />
        </template>
      </Select>
    </InputGroup>
    <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
  </div>
</template>
