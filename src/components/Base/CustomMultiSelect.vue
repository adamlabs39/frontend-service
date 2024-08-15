<script setup lang="ts">
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  autoResize: {
    type: Boolean,
    default: false,
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "Outlined",
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
  options: {
    type: Array,
    default: () => [],
  },
  optionLabel: {
    type: String,
    default: "Label",
  },
  optionValue: {
    type: String,
    default: null,
  },
  showFilter: {
    type: Boolean,
    default: true,
  },
  maxSelectedLabels: {
    type: Number,
    default: undefined,
  },
});
// const value = ref(props.modelValue);
const value2 = computed({
  get: () => props.modelValue,
  set: (value2: Array<any>) => emit("update:modelValue", value2),
});

const emit = defineEmits(["update:modelValue", "change"]);

const onSelect = (event: any) => {
  if (!event) return;
  emit("update:modelValue", event.target?.value);
  emit("change", event.value);
};

const removeSelect = (data: any) => {
  if (props.optionLabel) {
    value2.value = value2.value.filter(
      (selected: any) => selected[props.optionLabel] != data[props.optionLabel]
    );
  } else {
    value2.value = value2.value.filter((selected: any) => selected != data);
  }
  // emit("update:modelValue", value.value);
};
</script>

<template>
  <div class="">
    <label
      v-if="showLabel"
      class="block font-semibold mb-[5px]"
      :class="{ 'text-grey-300': disabled }"
    >
      {{ props.label }}
    </label>
    <MultiSelect
      v-model="value2"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      fluid
      :filter="showFilter"
      display="chip"
      :placeholder="placeholder"
      :maxSelectedLabels="maxSelectedLabels"
      class="h-10 border-2 rounded-lg border-grey-400"
      :class="{
        'border-red-500 text-red-500': invalid,
      }"
    >
      <template
        v-if="
          props.maxSelectedLabels
            ? value2.length > props.maxSelectedLabels
            : false
        "
        #value
      >
        {{ value2.length }} item dipilih
      </template>
      <template #chip="{ value }">
        <Chip
          class="h-6 rounded-[50px] bg-adameds-300 px-[10px] text-SM font-bold text-white py-2"
          removable
        >
          {{ optionValue ? value : value[optionLabel] }}
          <template #removeicon>
            <PhX
              class="cursor-pointer"
              :size="16"
              weight="bold"
              @click="removeSelect(value)"
            />
          </template>
        </Chip>
      </template>
    </MultiSelect>
  </div>
</template>
