<script setup lang="ts">
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  borderColor: {
    type: String,
    default: "border-grey-300",
  },
  textColor: {
    type: String,
    default: "text-grey-300",
  },
  bgColor: {
    type: String,
    default: "bg-transparent",
  },
  selectedColor: {
    type: String,
    default: "bg-grey-300 border-grey-300",
  },
  selectedTextColor: {
    type: String,
    default: "text-white",
  },
  iconSize: {
    type: Number,
    default: 14,
  },
  iconColor: {
    type: String,
    default: "text-grey-300",
  },
  selectedIconColor: {
    type: String,
    default: "text-white",
  },
  showCheckedIcon: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
    default: "h-6",
  },
});

const emit = defineEmits(["selected"]);

const onSelectedValue = () => {
  emit("selected", props.label);
};

const customizedClass = computed(() => props.customClass);
</script>

<template>
  <div>
    <Chip
      :class="[
        customizedClass,
        isSelected ? selectedTextColor : textColor,
        isSelected ? selectedColor : borderColor + bgColor,
      ]"
      @click="onSelectedValue"
      class="font-semibold text-XS pl-[5px] pr-3 border-2 rounded-full cursor-pointer"
    >
      <template v-if="showCheckedIcon">
        <PhCheckCircle
          :size="iconSize"
          :class="[isSelected ? selectedIconColor : iconColor]"
          weight="fill"
        />
      </template>
      <p :label="label">{{ props.label }}</p>
    </Chip>
  </div>
</template>
