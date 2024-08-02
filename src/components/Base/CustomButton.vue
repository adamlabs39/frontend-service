<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "Button",
  },
  icon: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  severity: {
    type: String,
    default: "bg-adameds-A300",
  },
  size: {
    type: String as () => "small" | "large",
    default: "small",
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex justify-center card">
    <Button
      :label="label"
      :icon="icon"
      :disabled="disabled"
      :severity="severity"
      :size="size"
      :class="class"
    />
  </div>
</template>
