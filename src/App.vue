<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import Footer from "./components/section/Footer.vue";

const route = useRoute();
</script>

<template>
  <body :class="['flex flex-col min-h-screen', route.path.startsWith('/antrian/apm/aktif') ? 'bg-adameds-75' : 'bg-[#f2f8ff]']">
    <Toast />
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
    <!-- Conditionally show Footer based on the route path -->
    <Footer v-if="!route.path.startsWith('/antrian/apm/aktif')" />
  </body>
</template>

<style scoped></style>
