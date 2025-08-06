<script setup lang="ts"></script>

<template>
  <!-- Header Panggilan -->
  <div
    class="flex gap-2 justify-center items-center py-1 w-full text-white rounded-lg bg-adameds-300 my-1"
  >
    <div>
      <PhMegaphone :size="18" class="scale-x-[-1]" weight="fill" />
    </div>
    <div>Panggilan</div>
  </div>

  <!-- Grid Panggilan dengan CSS Grid yang responsif -->
  <div class="grid-container">
    <div v-for="item in 9" :key="item" class="grid-item">A - {{ item }}</div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;
  height: calc(100% - 40px); /* Kurangi tinggi header */
  min-height: 400px;
}

.grid-item {
  background-color: #ef4444;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  min-height: 80px;
}
</style>
