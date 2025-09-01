<script setup></script>

<template>
  <div
    class="flex gap-5 justify-between w-full text-sm leading-5 text-white whitespace-nowrap max-md:flex-wrap"
  >
    <!-- Logo and Divider -->
    <div
      class="flex gap-1 justify-center items-center px-2.5 bg-white rounded-lg shadow-sm"
    >
      <img
        loading="lazy"
        src="@/assets/images/adameds-logo.png"
        class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[70px] h-[70px]"
      />
      <div class="bg-adameds-300 w-[2px] h-[50px] my-auto rounded-md"></div>
      <img
        loading="lazy"
        src="@/assets/images/adameds.png"
        class="self-stretch object-cover w-[120px] my-auto shrink-0 mx-1"
      />
    </div>

    <!-- Main Title and Subtitle -->
    <div class="flex flex-col mx-1 my-auto">
      <!-- Added mx-4 for spacing -->
      <div class="mb-1 font-bold text-MD">
        Anjungan Pendaftaran Pribadi (APM)
      </div>
      <div class="text-sm">Klinik Adameds</div>
    </div>

    <!-- Clock and Date -->
    <div class="flex flex-col my-auto ml-auto text-right">
      <!-- Align text to the right -->
      <div class="text-lg font-bold">09:00 AM</div>
      <div class="text-sm">Senin, 01 Jan 2024</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
