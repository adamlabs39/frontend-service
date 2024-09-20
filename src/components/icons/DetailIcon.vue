<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: "text-black",
  },
  size: {
    type: Number,
    default: 20,
  },
});
</script>

<template>
  <svg
    :height="size"
    :viewBox="`0 0 20 20`"
    fill="none"
    :class="class"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1670_1958)">
      <mask
        id="mask0_1670_1958"
        style="mask-type: luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <path
          d="M17 2H3C2.73478 2 2.48043 2.08429 2.29289 2.23431C2.10536 2.38434 2 2.58783 2 2.8V17.2C2 17.4122 2.10536 17.6157 2.29289 17.7657C2.48043 17.9157 2.73478 18 3 18H17C17.2652 18 17.5196 17.9157 17.7071 17.7657C17.8946 17.6157 18 17.4122 18 17.2V2.8C18 2.58783 17.8946 2.38434 17.7071 2.23431C17.5196 2.08429 17.2652 2 17 2Z"
          class="fill-current"
          stroke="white"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.13333 13H15.8667M4.13333 16H10"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 4H16V9H4V4Z"
          class="fill-current"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </mask>
      <g mask="url(#mask0_1670_1958)">
        <path d="M-1.20001 0H20.1333V20H-1.20001V0Z" class="fill-current" />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_1670_1958">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>
