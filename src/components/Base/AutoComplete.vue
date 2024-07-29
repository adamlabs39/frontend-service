<template>
  <div class="card flex justify-center">
    <AutoComplete
      v-model="value"
      dropdown
      :suggestions="items"
      @complete="search"
    >
      <template #dropdownicon>
        <PhAirplaneTilt :size="32" />
      </template>
    </AutoComplete>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const items = ref([]);

const search = (event) => {
  let items = [...Array(10).keys()];

  items.value = event.query
    ? [...Array(10).keys()].map((item) => event.query + "-" + item)
    : _items;
};


</script>
