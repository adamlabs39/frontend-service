<template>
  <div>
    <Chip
      :class="[
        customizedClass,
        isSelected ? selectedTextColor : textColor,
        isSelected ? selectedBorderColor : borderColor
      ]"
      @click="onSelectedValue"
    >
      <template v-if="showCheckedIcon">
        <PhCheckCircle
          :size="18"
          :color="isSelected ? selectedIconColor : iconColor"
          weight="fill"
        />
      </template>
      <p :label="label">{{ props.label }}</p>
    </Chip>
  </div>
</template>

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
  showCheckedIcon: {
    type: Boolean,
    default:true
  },
  customClass: {
    type: String,
    default:'font-bold border-2 rounded-full cursor-pointer h-8'
  }
});

const emit = defineEmits(["selected"]);

const onSelectedValue = () => {
  emit("selected", props.label);
};

const customizedClass = computed(() => props.customClass)
</script>
