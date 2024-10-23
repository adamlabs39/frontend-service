<script lang="ts" setup>
import type { SelectFilterEvent } from "primevue/select";
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
    type: [String, Number, Boolean],
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
  get: () => props.modelValue as string,
  set: (value: string) => emit("update:modelValue", value),
});

const emit = defineEmits([
  "update:modelValue",
  "change",
  "clickPrepend",
  "filter",
  "blur",
]);

const showClear = computed(() => {
  return value.value !== "";
});

const filterData = (event: SelectFilterEvent) => {
  emit("filter", event.value);
};

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
      class="block font-semibold mb-[5px] text-normal"
      :class="{ 'text-grey-300': disabled }"
    >
      {{ label }}<span v-if="required" class="text-danger-300">*</span>
    </label>
    <InputGroup>
      <InputGroupAddon
        v-if="prependIcon"
        class="rounded-l-lg"
        :class="{
          'text-danger-300 border-danger-300': invalid,
          'border-grey-200': !disabled && !invalid,
          'border-grey-200 bg-grey-100': disabled,
        }"
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
        class="h-10 rounded-lg text-SM"
        :class="[
          prependIcon ? 'border-l-0 rounded-l-none' : '',
          invalid ? 'border-danger-300 text-danger-300' : '',
          disabled ? ' bg-grey-100 text-grey-300' : '',
          !invalid && !disabled ? 'text-white' : '',
        ]"
        :invalid="invalid"
        fluid
        :filter="showFilter"
        filterPlaceholder="Search"
        pt:pcFilterIconContainer:class="flex items-center"
        pt:pcFilter:root:class="text-black border-grey-200 text-SM"
        :dt="{
          placeholderColor: invalid ? '#e9594c' : '#90969E',
          color: invalid ? '#e9594c' : '#000000',
          borderColor: invalid ? '#000000' : '#D0D5DD',
          focusBorderColor: '#D0D5DD',
          hoverBorderColor: '#D0D5DD',
        }"
        @filter="filterData"
        @blur="emit('blur')"
      >
        <template v-if="$slots.customValue" #value="{ value, placeholder }">
          <slot name="customValue" :value="value" :placeholder="placeholder" />
        </template>
        <template
          v-if="$slots.customOptions"
          #option="{ index, option, selected }"
        >
          <slot
            name="customOptions"
            :index="index"
            :option="option"
            :selected="selected"
          />
        </template>
        <template #dropdownicon>
          <PhCaretDown
            weight="fill"
            class="text-grey-300"
            :class="{
              'text-red-500': invalid,
              'text-black': modelValue,
              'text-grey-300': disabled,
            }"
          />
        </template>
      </Select>
    </InputGroup>
    <small v-if="invalid" class="text-red-500 text-XS">{{
      invalidMessage
    }}</small>
  </div>
</template>
