<script lang="ts" setup>
import { ref, watch } from "vue";

// Define the component props
const props = defineProps({
  categories: {
    type: Array as () => { name: string; key: string }[],
    default: () => []
  },
  modelValue: {
    type: Array as () => string[],
    default: () => []
  },
  customClass:{
    default:'flex flex gap-4'
  }
});

const emit = defineEmits(["update:modelValue", "change"]);

const selectedCategories = ref([...props.modelValue]);

watch(selectedCategories, (newVal) => {
  emit("update:modelValue", newVal);
  emit("change", newVal);
});

</script>

<template>
    <div :class="customClass">
        <div v-for="category in props.categories" :key="category.key" class="flex items-center gap-2.5 border py-2.5 px-1.5 rounded-md bg-adameds-50">
        <Checkbox
          v-model="selectedCategories"
          :inputId="category.key"
          name="category"
          :value="category.name"
        />
        <label :for="category.key">{{ category.name }}</label>
      </div>
    </div>
</template>
