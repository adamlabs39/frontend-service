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
    default: "large",
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
  full: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Button
    :label="label"
    :icon="icon"
    :disabled="disabled"
    :outlined="outlined"
    class="rounded-[10px] font-semibold"
    :class="[
      backgroundColor ? backgroundColor : 'bg-adameds-A300',
      textColor ? textColor : 'text-white',
      borderColor ? borderColor : 'border-none',
      outlined ? `bg-transparent` : '',
      size == 'small' ? 'h-[21px] text-XS' : 'h-10',
      disabled && outlined
        ? 'border-neutral-lightActive text-neutral-lightActive'
        : '',
      disabled && !outlined ? 'bg-neutral-lightActive text-neutral-normalActive border-none' : '',
    ]"
    :fluid="full"
  />
</template>
