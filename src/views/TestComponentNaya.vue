<script setup lang="ts">
import Select from "@/components/Base/Select.vue";
import type { OptionList } from "@/components/Base/Select.vue";
import { ref } from "vue";

const selectedItems = ref();
const items = ref<OptionList[]>([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

const testLog = (data: any) => {
  console.log("city data: ", data);
  console.log("city: ", selectedItems.value);
};
</script>

<template>
  <div class="m-10 justify-center">
    <Select 
      :showLabel="true"
      label="Choose a City" 
      v-model="selectedItems" 
      :options="items" 
      optionValue="code" 
      optionLabel="name" 
      :isLoading="false" 
      :invalid="false"
      invalidMessage="Wajib diisi" 
      :disabled="false" 
      @change="testLog" 
    />
    <p>Kota: {{ selectedItems }}</p>
  </div>
</template>
