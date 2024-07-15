<script setup lang="ts">
import Header from "@/components/section/Header.vue";
</script>

<template>
  <div>
    <Header />
    <div class="p-3">
      <slot />
    </div>
  </div>
</template>
