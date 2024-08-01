<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/section/Footer.vue";
</script>

<template>
  <body class="flex flex-col min-h-screen bg-[#f2f8ff]">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
    <Footer />
  </body>
</template>

<style scoped></style>
