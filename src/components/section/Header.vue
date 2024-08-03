<script setup lang="ts">
import { PhCaretDown, PhHouse } from "@phosphor-icons/vue";
</script>

<template>
  <div
    class="flex justify-between gap-5 pr-5 mt-[10px] bg-adameds-300 rounded-xl max-md:flex-wrap shadow-md mx-3"
  >
    <div
      class="flex justify-between gap-5 text-sm leading-5 text-white whitespace-nowrap max-md:flex-wrap h-[60px]"
    >
      <div
        class="flex gap-1 justify-center items-center px-2.5 rounded-xl shadow-sm bg-white"
      >
        <img
          loading="lazy"
          src="../../assets/images/adameds-logo.png"
          class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[50px] h-[50px]"
        />
        <div class="bg-adameds-300 w-[3px] h-[50px] my-auto rounded-md"></div>
        <img
          loading="lazy"
          src="../../assets/images/adameds.png"
          class="self-stretch object-cover w-[106px] my-auto shrink-0"
        />
      </div>
      <div class="flex gap-2.5 my-auto">
        <div
          class="cursor-pointer flex gap-2.5 justify-center text-adameds-300 bg-white rounded-xl h-8 px-3"
        >
          <PhHouse weight="fill" class="my-auto" />
          <div class="self-center">Menu</div>
        </div>
        <div
          class="cursor-pointer flex gap-2.5 justify-center rounded-xl bg-white bg-opacity-30 h-8 px-3"
        >
          <PhHouse weight="fill" class="my-auto" />
          <div class="self-center">Menu</div>
        </div>
        <div
          class="cursor-pointer flex gap-2.5 justify-center items-center rounded-xl bg-white bg-opacity-30 h-8 px-3"
        >
          <PhHouse weight="fill" class="my-auto" />
          <div class="self-center">Menu</div>
          <PhCaretDown weight="bold" class="my-auto" />
        </div>
      </div>
    </div>
    <div class="flex gap-5 my-auto">
      <img
        loading="lazy"
        src="../../assets/icons/Bell Notification.svg"
        class="w-8 aspect-square"
      />
      <div class="flex items-center justify-center">
        <img
          loading="lazy"
          src="../../assets/icons/User Account.svg"
          class="w-10 aspect-square"
        />
      </div>
    </div>
  </div>
</template>
