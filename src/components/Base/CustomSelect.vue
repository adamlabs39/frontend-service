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
  optionValue: {
    type: String,
    default: "value",
  },
  optionLabel: {
    type: String,
    default: "label",
  },
  isLoading: {
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
    <label v-if="showLabel" class="block font-semibold mb-[5px]">
      {{ label }}
    </label>
    <InputGroup>
      <InputGroupAddon v-if="prependIcon" class="rounded-l-lg border-grey-400">
        <component
          @click="emit('clickPrepend')"
          :is="prependIcon"
          weight="bold"
          :size="22"
          :color="invalid ? 'red' : 'black'"
          class="cursor-pointer"
        ></component>
      </InputGroupAddon>
      <Select
        v-model="value"
        :options="options"
        :optionValue="optionValue"
        :optionLabel="optionLabel"
        :loading="isLoading"
        :showClear="showClear"
        :placeholder="placeHolder"
        :disabled="disabled"
        class="h-10 rounded-lg border-grey-400"
        :class="[prependIcon? 'border-l-0 rounded-l-none': '']"
        :invalid="invalid"
        fluid
        filter
        filterPlaceholder="Search"
        pt:pcFilterIconContainer:class="flex items-center"
        pt:pcFilter:root:class="border-grey-400"
      >
        <template #dropdownicon>
          <PhCaretDown
            weight="fill"
            :class="{ 'text-red-500': invalid, 'text-black': modelValue }"
          />
        </template>
      </Select>
    </InputGroup>
    <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
  </div>
</template>
