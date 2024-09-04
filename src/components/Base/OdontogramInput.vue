<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from "vue";
import { ref } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
const teethPositions = ref<
  {
    x: number;
    y: number;
    width: number;
    height: number;
    label: number;
    diagnosis?: string;
  }[]
>([]);
let originalWidth = 700;
let originalHeight = 300;

const drawTooth = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: number,
  scale: number
) => {
  const tooth1 = [
    16, 17, 18, 26, 27, 28, 36, 37, 38, 46, 47, 48, 55, 65, 75, 85,
  ];
  const tooth2 = [14, 15, 24, 25, 34, 35, 44, 45, 54, 64, 84, 74];
  const tooth3 = [
    11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53, 61, 62, 63, 71,
    72, 73, 81, 82, 83,
  ];
  const toothWidth = 30 * scale;
  const toothHeight = 30 * scale;

  ctx.fillStyle = "#FFF";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  // ctx.fillRect(x, y, toothWidth, toothHeight);
  // ctx.strokeRect(x, y, toothWidth, toothHeight);
  let img = new Image();
  if (tooth1.includes(label)) {
    img.src = new URL(
      "@/assets/images/Odontogram/teeth1.svg",
      import.meta.url
    ).href;
  } else if (tooth2.includes(label)) {
    img.src = new URL(
      "@/assets/images/Odontogram/teeth2.svg",
      import.meta.url
    ).href;
  } else if (tooth3.includes(label)) {
    img.src = new URL(
      "@/assets/images/Odontogram/teeth3.svg",
      import.meta.url
    ).href;
  }
  img.onload = () => {
    ctx.drawImage(img, x, y, toothWidth, toothHeight);
  };

  // Simpan posisi gigi dan labelnya
  teethPositions.value.push({
    x,
    y,
    width: toothWidth,
    height: toothHeight,
    label,
  });

  // Label the tooth
  ctx.font = `${10 * scale}px Arial`;
  ctx.fillStyle = "#000";
  ctx.fillText(
    label.toString(),
    x + toothWidth / 2 - 6 * scale,
    y + toothHeight / 2 - 25 * scale
  );
};

const drawOdontogram = (ctx: CanvasRenderingContext2D, scale: number) => {
  const startX = 10 * scale;
  const startY = 20 * scale;

  const upperTeeth = [
    { x: startX * scale, y: startY * scale, label: 18 },
    { x: (startX + 40) * scale, y: startY * scale, label: 17 },
    { x: (startX + 80) * scale, y: startY * scale, label: 16 },
    { x: (startX + 120) * scale, y: startY * scale, label: 15 },
    { x: (startX + 160) * scale, y: startY * scale, label: 14 },
    { x: (startX + 200) * scale, y: startY * scale, label: 13 },
    { x: (startX + 240) * scale, y: startY * scale, label: 12 },
    { x: (startX + 280) * scale, y: startY * scale, label: 11 },
    { x: (startX + 320) * scale, y: startY * scale, label: 21 },
    { x: (startX + 360) * scale, y: startY * scale, label: 22 },
    { x: (startX + 400) * scale, y: startY * scale, label: 23 },
    { x: (startX + 440) * scale, y: startY * scale, label: 24 },
    { x: (startX + 480) * scale, y: startY * scale, label: 25 },
    { x: (startX + 520) * scale, y: startY * scale, label: 26 },
    { x: (startX + 560) * scale, y: startY * scale, label: 27 },
    { x: (startX + 600) * scale, y: startY * scale, label: 28 },
  ];

  const middleUpperTeeth = [
    { x: (startX + 120) * scale, y: (startY + 60) * scale, label: 55 },
    { x: (startX + 160) * scale, y: (startY + 60) * scale, label: 54 },
    { x: (startX + 200) * scale, y: (startY + 60) * scale, label: 53 },
    { x: (startX + 240) * scale, y: (startY + 60) * scale, label: 52 },
    { x: (startX + 280) * scale, y: (startY + 60) * scale, label: 51 },
    { x: (startX + 320) * scale, y: (startY + 60) * scale, label: 61 },
    { x: (startX + 360) * scale, y: (startY + 60) * scale, label: 62 },
    { x: (startX + 400) * scale, y: (startY + 60) * scale, label: 63 },
    { x: (startX + 440) * scale, y: (startY + 60) * scale, label: 64 },
    { x: (startX + 480) * scale, y: (startY + 60) * scale, label: 65 },
  ];

  const middleLowerTeeth = [
    { x: (startX + 120) * scale, y: (startY + 120) * scale, label: 85 },
    { x: (startX + 160) * scale, y: (startY + 120) * scale, label: 84 },
    { x: (startX + 200) * scale, y: (startY + 120) * scale, label: 83 },
    { x: (startX + 240) * scale, y: (startY + 120) * scale, label: 82 },
    { x: (startX + 280) * scale, y: (startY + 120) * scale, label: 81 },
    { x: (startX + 320) * scale, y: (startY + 120) * scale, label: 71 },
    { x: (startX + 360) * scale, y: (startY + 120) * scale, label: 72 },
    { x: (startX + 400) * scale, y: (startY + 120) * scale, label: 73 },
    { x: (startX + 440) * scale, y: (startY + 120) * scale, label: 74 },
    { x: (startX + 480) * scale, y: (startY + 120) * scale, label: 75 },
  ];

  const lowerTeeth = [
    { x: startX * scale, y: (startY + 180) * scale, label: 48 },
    { x: (startX + 40) * scale, y: (startY + 180) * scale, label: 47 },
    { x: (startX + 80) * scale, y: (startY + 180) * scale, label: 46 },
    { x: (startX + 120) * scale, y: (startY + 180) * scale, label: 45 },
    { x: (startX + 160) * scale, y: (startY + 180) * scale, label: 44 },
    { x: (startX + 200) * scale, y: (startY + 180) * scale, label: 43 },
    { x: (startX + 240) * scale, y: (startY + 180) * scale, label: 42 },
    { x: (startX + 280) * scale, y: (startY + 180) * scale, label: 41 },
    { x: (startX + 320) * scale, y: (startY + 180) * scale, label: 31 },
    { x: (startX + 360) * scale, y: (startY + 180) * scale, label: 32 },
    { x: (startX + 400) * scale, y: (startY + 180) * scale, label: 33 },
    { x: (startX + 440) * scale, y: (startY + 180) * scale, label: 34 },
    { x: (startX + 480) * scale, y: (startY + 180) * scale, label: 35 },
    { x: (startX + 520) * scale, y: (startY + 180) * scale, label: 36 },
    { x: (startX + 560) * scale, y: (startY + 180) * scale, label: 37 },
    { x: (startX + 600) * scale, y: (startY + 180) * scale, label: 38 },
  ];

  teethPositions.value = [];

  [
    ...upperTeeth,
    ...middleUpperTeeth,
    ...middleLowerTeeth,
    ...lowerTeeth,
  ].forEach((tooth) => {
    drawTooth(ctx, tooth.x, tooth.y, tooth.label, scale);
  });
};

// Function to handle canvas resize
const resizeCanvas = () => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  // Resize the canvas to match the parent width
  const parentWidth = canvas.value.parentElement?.clientWidth || originalWidth;
  const scale = parentWidth / originalWidth;

  canvas.value.width = parentWidth;
  canvas.value.height = originalHeight * scale;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  drawOdontogram(ctx, scale);
};

// Function to handle click on canvas
const handleClick = (event: MouseEvent) => {
  if (!canvas.value) return;

  const rect = canvas.value.getBoundingClientRect();
  const scaleX = canvas.value.width / rect.width;
  const scaleY = canvas.value.height / rect.height;

  const clickX = (event.clientX - rect.left) * scaleX;
  const clickY = (event.clientY - rect.top) * scaleY;

  const clickedTooth = teethPositions.value.find(
    (tooth) =>
      clickX >= tooth.x &&
      clickX <= tooth.x + tooth.width &&
      clickY >= tooth.y &&
      clickY <= tooth.y + tooth.height
  );

  if (clickedTooth) {
    alert(`Tooth ${clickedTooth.label} clicked!`);
    // Di sini kamu bisa melakukan sesuatu dengan data tooth yang di-klik
  }
};

onMounted(() => {
  nextTick(() => {
    if (canvas.value) {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
});
</script>

<template>
  <canvas ref="canvas" @click="handleClick"></canvas>
</template>
