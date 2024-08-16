<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  iconPos: {
    type: String as () => "left" | "right" | "top" | "bottom",
    default: "left",
  },
  loading: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(['click'])
</script>

<template>
  <Button
    :label="label"
    :icon="icon"
    :iconPos="iconPos"
    :loading="loading"
    :disabled="disabled"
    :outlined="outlined"
    class="rounded-[10px] font-semibold"
    :class="[
      backgroundColor ? backgroundColor : 'bg-adameds-300',
      textColor ? textColor : 'text-white',
      borderColor ? borderColor : 'border-none',
      outlined ? `bg-transparent border-2` : '',
      size == 'small' ? 'h-[21px] text-XS' : 'h-10',
      disabled && outlined
        ? 'border-grey-200 text-grey-200'
        : '',
      disabled && !outlined
        ? 'bg-grey-200 text-grey-400Active border-none'
        : '',
    ]"
    :fluid="full"
    @click = "emit('click')"
    pt:label:class="font-semibold text-normal"
  >
    <template #default>
      <slot />
    </template>
    <template #icon="slotProps" v-if="icon">
      <component
        :is="icon"
        weight="bold"
        :size="size == 'small' ? 14 : 20"
        :class="slotProps.class"
      />
    </template>
  </Button>
</template>
