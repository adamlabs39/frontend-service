<script setup lang="ts">
import Header from "@/components/section/Header.vue";
</script>

<template>
  <div>
    <Header />
    <div class="absolute bottom-[52px] left-3 right-3 top-[82px]">
      <slot />
    </div>
  </div>
</template>
