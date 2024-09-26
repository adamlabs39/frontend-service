<script setup lang="ts">
import { useRoute } from 'vue-router';
import DataRawatJalanHeader from './Layout/DataRawatJalanHeader.vue';
import { onMounted, ref } from 'vue';


const route = useRoute();
const currentRouteName = ref("");

// Untuk mengetahui sekarang ada di rute mana
onMounted(() => {
  currentRouteName.value = route.name ? String(route.name) : ""; 
});
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
  <template #header>
    <DataRawatJalanHeader :current-route-name="currentRouteName" >
    </DataRawatJalanHeader>
  </template>
  <template #content>
    <!-- Current Route Name: {{ currentRouteName }} -->
     odnodnpdn
  </template>
  <template #footer>
    fokpfofkp
  </template>
  </Card>
</template>