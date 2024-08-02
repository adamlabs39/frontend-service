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
  backgroundColor: {
    type: String,
    default: "",
  },
  borderColor: {
    type: String,
    default: "",
  },
  textColor: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="flex justify-center card">
    <Button
      :label="label"
      :icon="icon"
      :disabled="disabled"
      :size="size"
      :outlined="outlined"
      :class="[
        backgroundColor ? backgroundColor : 'bg-adameds-A300',
        textColor ? textColor : 'text-white',
        borderColor ? borderColor : 'border-transparent',
        outlined ? `bg-transparent` : '',
      ]"
      fluid
    />
  </div>
</template>
