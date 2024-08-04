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
  placeHolder: {
    type: String,
    default: "PlaceHolder",
  },
  timeOnly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type:Date,
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
  minDate: {
    type: Date,
  },
  maxDate: {
    type: Date,
  },
});

const emit = defineEmits(["update:modelValue", "input", "date-select"]);

const value = ref(props.modelValue);

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const onInput = (event: any) => {
  if (!event) return;

  const date = new Date(event);
  const formattedValue = props.timeOnly ? formatTime(date) : formatDate(date);

  emit("update:modelValue", formattedValue);
};
</script>

<template>
  <div class="flex flex-col">
    <label v-if="showLabel" class="block font-semibold mb-[5px]">
      {{ label }}
    </label>
    <div class="flex">
      <IconField class="flex items-center grow">
        <InputIcon class="-mt-[11px] -ml-[2px]">
          <component
            :is="timeOnly ? 'PhClock' : 'PhCalendarBlank'"
            weight="regular"
            :size="22"
            :color="invalid ? 'red' : 'grey'"
          ></component>
        </InputIcon>
        <DatePicker
          :timeOnly="timeOnly"
          v-model="value"
          :minDate="minDate"
          :maxDate="maxDate"
          :placeholder="placeHolder"
          :disabled="disabled"
          @date-select="onInput"
          selectionMode="single"
          dateFormat="dd-mm-yy"
          :manualInput="false"
          fluid
          :pt:pcInput:root:class="{
            'text-red-500 border-red-500': invalid,
            'w-full h-10 rounded-lg border-grey-400 pl-10': true,
          }"
        />
      </IconField>
    </div>
    <small v-if="invalid" class="text-red-500">{{ invalidMessage }}</small>
  </div>
</template>
