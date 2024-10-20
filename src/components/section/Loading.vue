<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import LoadingJSON from "@/assets/images/Loading.json";
</script>

<template>
  <div class="fixed flex justify-center w-full h-full align-middle z-[99999]">
    <div class="absolute w-full h-full backdrop-blur-md"></div>
    <div class="flex my-auto">
      <Vue3Lottie
        class=""
        :animationData="LoadingJSON"
        :height="300"
        :width="300"
      />
    </div>
  </div>
</template>
