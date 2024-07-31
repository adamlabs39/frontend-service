<template>
  <div class="p-3">
    <Chip
      class="h-8 font-bold border-2 rounded-full cursor-pointer"
      :class="[
        isSelected ? selectedTextColor : textColor,
        isSelected ? selectedBorderColor: borderColor
      ]"
      @click="onSelectedValue"
    >
      <PhCheckCircle
        :size="18"
        :color="isSelected ? selectedIconColor : iconColor"
        weight="fill"
      />
      <p :label="label">{{ props.label }}</p>
    </Chip>
  </div>
</template>

<script setup lang="ts">
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
    default: "border-slate-400",
  },
  textColor: {
    type: String,
    default: "text-[#90969E]",
  },
  selectedBorderColor: {
    type: String,
    default: "border-0 bg-slate-500",
  },
  selectedTextColor: {
    type: String,
    default: "text-[#FFFFFF]",
  },
  iconColor: {
    type: String,
    default: "#90969E",
  },
  selectedIconColor: {
    type: String,
    default: "#FFFFFF",
  },
});

const emit = defineEmits(["selected"]);

const onSelectedValue = () => {
  emit("selected", props.label);
};
</script>
