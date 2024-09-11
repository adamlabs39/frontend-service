<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps({
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
  required: {
    type: Boolean,
    default: false,
  },
});

const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const emit = defineEmits(["update:modelValue", "change", "clickPrepend"]);
</script>

<template>
  <div class="">
    <InputGroup>
      <InputGroupAddon
        class="h-6 border-2 border-r-0 rounded-l-lg border-adameds-300"
      >
        <PhCalendarDots
          @click="emit('clickPrepend')"
          weight="fill"
          :size="22"
          class="cursor-pointer text-adameds-300"
        ></PhCalendarDots>
      </InputGroupAddon>
      <Select
        v-model="value"
        :options="options"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :loading="isLoading"
        class="h-6 border-2 border-l-0 rounded-lg rounded-l-none text-SM border-adameds-300"
        fluid
        :filter="false"
        filterPlaceholder="Search"
        pt:label:class="p-[2px] text-adameds-300 font-semibold"
        pt:pcFilterIconContainer:class="flex items-center"
        pt:pcFilter:root:class="text-black border-grey-200 text-SM"
      >
        <template #dropdownicon>
          <PhCaretDown
            weight="bold"
            :size="20"
            class="text-adameds-300"
          />
        </template>
      </Select>
    </InputGroup>
  </div>
</template>
