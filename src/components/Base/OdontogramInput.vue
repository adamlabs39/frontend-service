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
  const toothWidth = 40 * scale;
  const toothHeight = 40 * scale;

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

const drawSymbol = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  symbol: string,
  scale: number
) => {
  const symbolWidth = 40 * scale;
  const symbolHeight = 40 * scale;

  // ctx.fillStyle = "#FFF";
  // ctx.strokeStyle = "#000";
  // ctx.lineWidth = 2;
  // ctx.fillRect(x, y, toothWidth, toothHeight);
  // ctx.strokeRect(x, y, toothWidth, toothHeight);
  let img = new Image();
  img.src = "data:image/svg+xml;base64," + symbol;
  console.log(img.src);
  img.onload = () => {
    ctx.drawImage(img, x, y, symbolWidth, symbolHeight);
  };
};

const drawOdontogram = (ctx: CanvasRenderingContext2D, scale: number) => {
  const startX = 10 * scale;
  const startY = 20 * scale;

  const upperTeeth = [
    {
      x: 0,
      y: 0,
      label: 18,
      symbol: [
        "PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik02MS42NDAyIDI3LjczMThDNjIuMDY0NSAyOC4wODUzIDYyLjEyMTggMjguNzE1OSA2MS43NjgyIDI5LjE0MDJDNjEuNDE0NyAyOS41NjQ1IDYwLjc4NDEgMjkuNjIxOCA2MC4zNTk4IDI5LjI2ODJMNjEuNjQwMiAyNy43MzE4Wk0xNy45NzMgMzIuNDk5NkMxNy40MjA5IDMyLjQ4NDcgMTYuOTg1NCAzMi4wMjUxIDE3LjAwMDQgMzEuNDczTDE3LjI0MzUgMjIuNDc2M0MxNy4yNTg0IDIxLjkyNDIgMTcuNzE4MSAyMS40ODg3IDE4LjI3MDIgMjEuNTAzN0MxOC44MjIzIDIxLjUxODYgMTkuMjU3NyAyMS45NzgyIDE5LjI0MjggMjIuNTMwM0wxOS4wMjY3IDMwLjUyNzRMMjcuMDIzNyAzMC43NDM1QzI3LjU3NTggMzAuNzU4NCAyOC4wMTEzIDMxLjIxODEgMjcuOTk2MyAzMS43NzAyQzI3Ljk4MTQgMzIuMzIyMyAyNy41MjE4IDMyLjc1NzcgMjYuOTY5NyAzMi43NDI4TDE3Ljk3MyAzMi40OTk2Wk01Ni42Mzc5IDI0Ljg2NDlMNTcuMjc4MSAyNC4wOTY3TDU2LjYzNzkgMjQuODY0OVpNMjQuMjcyNCAyNS41NTc3TDI0Ljk2MDIgMjYuMjgzNkwyNC4yNzI0IDI1LjU1NzdaTTI0Ljk2MDIgMjYuMjgzNkwxOC42ODc3IDMyLjIyNkwxNy4zMTIzIDMwLjc3NEwyMy41ODQ3IDI0LjgzMTdMMjQuOTYwMiAyNi4yODM2Wk02MC4zNTk4IDI5LjI2ODJMNTUuOTk3NyAyNS42MzMxTDU3LjI3ODEgMjQuMDk2N0w2MS42NDAyIDI3LjczMThMNjAuMzU5OCAyOS4yNjgyWk00NS44ODk3IDIwLjY2NjVMNDUuNTQ0OCAyMC41ODk5TDQ1Ljk3ODcgMTguNjM3NUw0Ni4zMjM1IDE4LjcxNDJMNDUuODg5NyAyMC42NjY1Wk01NS45OTc3IDI1LjYzMzFDNTMuMDcyNSAyMy4xOTU0IDQ5LjYwNjggMjEuNDkyNiA0NS44ODk3IDIwLjY2NjVMNDYuMzIzNSAxOC43MTQyQzUwLjM1MTkgMTkuNjA5NCA1NC4xMDc5IDIxLjQ1NDkgNTcuMjc4MSAyNC4wOTY3TDU1Ljk5NzcgMjUuNjMzMVpNMzEuOTkzNiAyMS43NDIyQzI5LjM4ODQgMjIuODA3OSAyNy4wMDM2IDI0LjM0NzggMjQuOTYwMiAyNi4yODM2TDIzLjU4NDcgMjQuODMxN0MyNS44MDc3IDIyLjcyNTcgMjguNDAyMSAyMS4wNTA1IDMxLjIzNjMgMTkuODkxMUwzMS45OTM2IDIxLjc0MjJaTTMxLjIzNjMgMTkuODkxMUMzNS45MDc3IDE3Ljk4IDQxLjA1MTcgMTcuNTQyNiA0NS45Nzg3IDE4LjYzNzVMNDUuNTQ0OCAyMC41ODk5QzQxLjAxNTkgMTkuNTgzNSAzNi4yODc2IDE5Ljk4NTUgMzEuOTkzNiAyMS43NDIyTDMxLjIzNjMgMTkuODkxMVoiIGZpbGw9IiMzRDg0RTUiLz4KPC9zdmc+Cg==",
        "PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjc1Ii8+CjxwYXRoIGQ9Ik0xNyAyNC4zNDc0VjE3SDI2LjM2MzZIMzMuMTgxOEgzOC44NjM2SDQ1LjY4MThINTIuNUg1OS4zMTgySDYzVjI0LjM0NzRWMzEuOTU2MVYzOS41NjQ4VjQ4LjI2MDRWNTYuNjMwMlY2M0g1Ni4xOTMySDQ3LjM4NjRIMjkuNzcyN0gyMC42ODE4SDE3VjYyLjM5MDlWNTUuODY5MVY0OS4zNDc0VjQxLjczODdWMzUuMjE3VjI5Ljc4MjJWMjQuMzQ3NFoiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNCIvPgo8cGF0aCBkPSJNMzIuMzI1NSAzLjE3MlYxM0gyOS45MzE1VjMuMTcySDMyLjMyNTVaTTQxLjU1MDQgNi4zMzZDNDEuNTUwNCA2LjkwNTMzIDQxLjQxOTcgNy40MjggNDEuMTU4NCA3LjkwNEM0MC44OTcgOC4zNzA2NyA0MC40OTU3IDguNzQ4NjcgMzkuOTU0NCA5LjAzOEMzOS40MTMgOS4zMjczMyAzOC43NDEgOS40NzIgMzcuOTM4NCA5LjQ3MkgzNi40NTQ0VjEzSDM0LjA2MDRWMy4xNzJIMzcuOTM4NEMzOC43MjI0IDMuMTcyIDM5LjM4NSAzLjMwNzMzIDM5LjkyNjQgMy41NzhDNDAuNDY3NyAzLjg0ODY3IDQwLjg3MzcgNC4yMjIgNDEuMTQ0NCA0LjY5OEM0MS40MTUgNS4xNzQgNDEuNTUwNCA1LjcyIDQxLjU1MDQgNi4zMzZaTTM3Ljc1NjQgNy41NjhDMzguMjEzNyA3LjU2OCAzOC41NTQ0IDcuNDYwNjcgMzguNzc4NCA3LjI0NkMzOS4wMDI0IDcuMDMxMzMgMzkuMTE0NCA2LjcyOCAzOS4xMTQ0IDYuMzM2QzM5LjExNDQgNS45NDQgMzkuMDAyNCA1LjY0MDY3IDM4Ljc3ODQgNS40MjZDMzguNTU0NCA1LjIxMTMzIDM4LjIxMzcgNS4xMDQgMzcuNzU2NCA1LjEwNEgzNi40NTQ0VjcuNTY4SDM3Ljc1NjRaTTQ4LjgxNjcgMTNMNDYuODE0NyA5Ljk5TDQ1LjA1MDcgMTNINDIuMzM0N0w0NS40ODQ3IDguMDAyTDQyLjI2NDcgMy4xNzJINDUuMDUwN0w0Ny4wMjQ3IDYuMTRMNDguNzYwNyAzLjE3Mkg1MS40NzY3TDQ4LjM1NDcgOC4xMjhMNTEuNjAyNyAxM0g0OC44MTY3WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==",
      ],
    },
    { x: 40, y: 0, label: 17, symbol: [] },
    { x: 80, y: 0, label: 16, symbol: [] },
    { x: 120, y: 0, label: 15, symbol: [] },
    { x: 160, y: 0, label: 14, symbol: [] },
    { x: 200, y: 0, label: 13, symbol: [] },
    { x: 240, y: 0, label: 12, symbol: [] },
    { x: 280, y: 0, label: 11, symbol: [] },
    { x: 320, y: 0, label: 21, symbol: [] },
    { x: 360, y: 0, label: 22, symbol: [] },
    { x: 400, y: 0, label: 23, symbol: [] },
    { x: 440, y: 0, label: 24, symbol: [] },
    { x: 480, y: 0, label: 25, symbol: [] },
    { x: 520, y: 0, label: 26, symbol: [] },
    { x: 560, y: 0, label: 27, symbol: [] },
    { x: 600, y: 0, label: 28, symbol: [] },
  ];

  const middleUpperTeeth = [
    { x: 120, y: 60, label: 55, symbol: [] },
    { x: 160, y: 60, label: 54, symbol: [] },
    { x: 200, y: 60, label: 53, symbol: [] },
    { x: 240, y: 60, label: 52, symbol: [] },
    { x: 280, y: 60, label: 51, symbol: [] },
    { x: 320, y: 60, label: 61, symbol: [] },
    { x: 360, y: 60, label: 62, symbol: [] },
    { x: 400, y: 60, label: 63, symbol: [] },
    { x: 440, y: 60, label: 64, symbol: [] },
    { x: 480, y: 60, label: 65, symbol: [] },
  ];

  const middleLowerTeeth = [
    { x: 120, y: 120, label: 85, symbol: [] },
    { x: 160, y: 120, label: 84, symbol: [] },
    { x: 200, y: 120, label: 83, symbol: [] },
    { x: 240, y: 120, label: 82, symbol: [] },
    { x: 280, y: 120, label: 81, symbol: [] },
    { x: 320, y: 120, label: 71, symbol: [] },
    { x: 360, y: 120, label: 72, symbol: [] },
    { x: 400, y: 120, label: 73, symbol: [] },
    { x: 440, y: 120, label: 74, symbol: [] },
    { x: 480, y: 120, label: 75, symbol: [] },
  ];

  const lowerTeeth = [
    { x: 0, y: 180, label: 48, symbol: [] },
    { x: 40, y: 180, label: 47, symbol: [] },
    { x: 80, y: 180, label: 46, symbol: [] },
    { x: 120, y: 180, label: 45, symbol: [] },
    { x: 160, y: 180, label: 44, symbol: [] },
    { x: 200, y: 180, label: 43, symbol: [] },
    { x: 240, y: 180, label: 42, symbol: [] },
    { x: 280, y: 180, label: 41, symbol: [] },
    { x: 320, y: 180, label: 31, symbol: [] },
    { x: 360, y: 180, label: 32, symbol: [] },
    { x: 400, y: 180, label: 33, symbol: [] },
    { x: 440, y: 180, label: 34, symbol: [] },
    { x: 480, y: 180, label: 35, symbol: [] },
    { x: 520, y: 180, label: 36, symbol: [] },
    { x: 560, y: 180, label: 37, symbol: [] },
    { x: 600, y: 180, label: 38, symbol: [] },
  ];

  teethPositions.value = [];

  [
    ...upperTeeth,
    ...middleUpperTeeth,
    ...middleLowerTeeth,
    ...lowerTeeth,
  ].forEach((tooth) => {
    drawTooth(
      ctx,
      (startX + tooth.x) * scale,
      (startY + tooth.y) * scale,
      tooth.label,
      scale
    );
    tooth.symbol.forEach((symbol) => {
      drawSymbol(
        ctx,
        (startX + tooth.x) * scale,
        (startY + tooth.y) * scale,
        symbol,
        scale
      );
    });
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
