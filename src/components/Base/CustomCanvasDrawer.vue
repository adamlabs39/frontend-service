<script setup lang="ts">
import { onMounted, ref } from "vue";

const message = ref<string>("Drawing App");
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const painting = ref<boolean>(false);
const textMode = ref(false);

const colors = ref<string[]>([
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
]);

const changeColor = (color: string) => {
  ctx.value!.strokeStyle = color;
};

const clearCanvas = () => {
  ctx.value!.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
};

const startPainting = (e: MouseEvent) => {
  if (textMode.value) return; // Tidak menggambar jika dalam mode teks
  painting.value = true;
  // addText(e);
  draw(e);
  // insertArrow(e);
};

const finishedPainting = () => {
  painting.value = false;
  ctx.value!.beginPath();
};

const draw = (e: MouseEvent) => {
  if (!painting.value) return;

  const rect = canvas.value!.getBoundingClientRect();

  ctx.value!.lineWidth = 10;
  ctx.value!.lineCap = "round";

  ctx.value!.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.value!.stroke();

  ctx.value!.beginPath();
  ctx.value!.moveTo(e.clientX - rect.left, e.clientY - rect.top);

  ctx.value!.stroke();
};

const setPen = () => {
  ctx.value!.globalCompositeOperation = "source-over"; // Mode menggambar biasa
  ctx.value!.strokeStyle = "#000000"; // Warna garis
  ctx.value!.lineWidth = 5; // Ukuran kuas
};

const addText = (e: MouseEvent) => {
  if (!textMode) return;

  const rect = canvas.value!.getBoundingClientRect();

  const text = prompt("Enter the text:");
  if (text) {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.value!.font = `20px Arial`;
    ctx.value!.fillText(text, x, y);
  }
  finishedPainting();
};

const setEraser = () => {
  ctx.value!.globalCompositeOperation = "destination-out"; // Mode penghapus
  ctx.value!.lineWidth = 20; // Ukuran kuas penghapus
};

const insertArrow = (e: MouseEvent) => {
  if (!painting.value) return;

  const rect = canvas.value!.getBoundingClientRect();

  ctx.value!.beginPath();
  drawArrow(ctx.value, e.clientX - rect.left, e.clientY - rect.top, "N");
  ctx.value!.stroke();
};

const drawArrow = (ctx: any, startX: any, startY: any, direction: any) => {
  ctx.beginPath();
  const arrowSize = 20; // Ukuran kepala panah
  const arrowLength = 40; // Panjang panah

  switch (direction) {
    case "N": // Utara
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX, startY - arrowLength); // Garis utama
      ctx.lineTo(startX - arrowSize, startY - arrowLength + arrowSize); // Kepala panah kiri
      ctx.moveTo(startX, startY - arrowLength);
      ctx.lineTo(startX + arrowSize, startY - arrowLength + arrowSize); // Kepala panah kanan
      ctx.moveTo(startX - 20, startY - arrowLength);
      ctx.lineTo(startX + 20, startY - arrowLength);
      break;

    case "NE": // Timur Laut
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX + arrowLength, startY - arrowLength); // Garis utama
      ctx.lineTo(
        startX + arrowLength - arrowSize,
        startY - arrowLength + arrowSize
      ); // Kepala panah kanan
      ctx.moveTo(startX + arrowLength, startY - arrowLength);
      ctx.lineTo(
        startX + arrowLength - arrowSize,
        startY - arrowLength - arrowSize
      ); // Kepala panah kiri
      break;

    case "E": // Timur
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX + arrowLength, startY); // Garis utama
      ctx.lineTo(startX + arrowLength - arrowSize, startY - arrowSize); // Kepala panah atas
      ctx.moveTo(startX + arrowLength, startY);
      ctx.lineTo(startX + arrowLength - arrowSize, startY + arrowSize); // Kepala panah bawah
      break;

    case "SE": // Tenggara
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX + arrowLength, startY + arrowLength); // Garis utama
      ctx.lineTo(
        startX + arrowLength - arrowSize,
        startY + arrowLength - arrowSize
      ); // Kepala panah kanan
      ctx.moveTo(startX + arrowLength, startY + arrowLength);
      ctx.lineTo(
        startX + arrowLength - arrowSize,
        startY + arrowLength + arrowSize
      ); // Kepala panah kiri
      break;

    case "S": // Selatan
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX, startY + arrowLength); // Garis utama
      ctx.lineTo(startX - arrowSize, startY + arrowLength - arrowSize); // Kepala panah kiri
      ctx.moveTo(startX, startY + arrowLength);
      ctx.lineTo(startX + arrowSize, startY + arrowLength - arrowSize); // Kepala panah kanan
      break;

    case "SW": // Barat Daya
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX - arrowLength, startY + arrowLength); // Garis utama
      ctx.lineTo(
        startX - arrowLength + arrowSize,
        startY + arrowLength - arrowSize
      ); // Kepala panah kiri
      ctx.moveTo(startX - arrowLength, startY + arrowLength);
      ctx.lineTo(
        startX - arrowLength + arrowSize,
        startY + arrowLength + arrowSize
      ); // Kepala panah kanan
      break;

    case "W": // Barat
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX - arrowLength, startY); // Garis utama
      ctx.lineTo(startX - arrowLength + arrowSize, startY - arrowSize); // Kepala panah atas
      ctx.moveTo(startX - arrowLength, startY);
      ctx.lineTo(startX - arrowLength + arrowSize, startY + arrowSize); // Kepala panah bawah
      break;

    case "NW": // Barat Laut
      ctx.moveTo(startX, startY); // Titik tengah
      ctx.lineTo(startX - arrowLength, startY - arrowLength); // Garis utama
      ctx.lineTo(
        startX - arrowLength + arrowSize,
        startY - arrowLength + arrowSize
      ); // Kepala panah kiri
      ctx.moveTo(startX - arrowLength, startY - arrowLength);
      ctx.lineTo(
        startX - arrowLength + arrowSize,
        startY - arrowLength - arrowSize
      ); // Kepala panah kanan
      break;
  }

  ctx.stroke();

  // ctx.beginPath();
  // const detailSize = 20; // Ukuran detail di ujung panah

  // switch (direction) {
  //   case "N":
  //     ctx.moveTo(startX - detailSize, startY - arrowLength);
  //     ctx.lineTo(startX + detailSize, startY - arrowLength);
  //     break;
  //   case "NE":
  //     ctx.moveTo(
  //       startX + arrowLength - arrowSize,
  //       startY - arrowLength + arrowSize
  //     );
  //     ctx.lineTo(
  //       startX + arrowLength - arrowSize,
  //       startY - arrowLength - detailSize
  //     );
  //     break;
  //   case "E":
  //     ctx.moveTo(startX + arrowLength - arrowSize, startY - detailSize);
  //     ctx.lineTo(startX + arrowLength - arrowSize, startY + detailSize);
  //     break;
  //   case "SE":
  //     ctx.moveTo(
  //       startX + arrowLength - arrowSize,
  //       startY + arrowLength - arrowSize
  //     );
  //     ctx.lineTo(
  //       startX + arrowLength - detailSize,
  //       startY + arrowLength - arrowSize
  //     );
  //     break;
  //   case "S":
  //     ctx.moveTo(startX - detailSize, startY + arrowLength - arrowSize);
  //     ctx.lineTo(startX + detailSize, startY + arrowLength - arrowSize);
  //     break;
  //   case "SW":
  //     ctx.moveTo(
  //       startX - arrowLength + arrowSize,
  //       startY + arrowLength - arrowSize
  //     );
  //     ctx.lineTo(
  //       startX - arrowLength + detailSize,
  //       startY + arrowLength - arrowSize
  //     );
  //     break;
  //   case "W":
  //     ctx.moveTo(startX - arrowLength + arrowSize, startY - detailSize);
  //     ctx.lineTo(startX - arrowLength + arrowSize, startY + detailSize);
  //     break;
  //   case "NW":
  //     ctx.moveTo(
  //       startX - arrowLength + arrowSize,
  //       startY - arrowLength + arrowSize
  //     );
  //     ctx.lineTo(
  //       startX - arrowLength + arrowSize,
  //       startY - arrowLength + detailSize
  //     );
  //     break;
  // }

  // ctx.stroke();
};

const saveCanvas = () => {
  const dataURL = canvas.value!.toDataURL("image/png");
  console.log(dataURL);
};

const loadImage = () => {
  const img = new Image();
  img.src =
    "data:image/png;base64,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";
  img.onload = () => {
    ctx.value!.drawImage(img, 0, 0);
  };
};

onMounted(() => {
  const canvasElement = document.getElementById("canvas");
  canvas.value = canvasElement as HTMLCanvasElement;
  ctx.value = canvas.value!.getContext("2d");

  // Set default stroke color
  ctx.value!.strokeStyle = colors.value[0];
});
</script>

<template>
  <div>
    <h2>{{ message }}</h2>
    <div class="color-picker">
      <div
        v-for="color in colors"
        class="color-box"
        :style="{ backgroundColor: color }"
        @click="changeColor(color)"
      ></div>
    </div>

    <div class="flex">
      <div class="relative h-[400px] w-[800px]">
        <svg
          width="800"
          height="400"
          viewBox="0 0 800 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute top-0 left-0"
        >
          <rect width="800" height="400" fill="white" />
          <path
            d="M272.343 152.234L274.936 153.855C277.088 155.2 279.576 155.913 282.114 155.913H283.924C286.3 155.913 288.635 155.288 290.693 154.101L293.929 152.234"
            stroke="black"
          />
          <path
            d="M277.234 150.517H266.715C266.712 150.517 266.711 150.512 266.714 150.511L276.839 146.236C277.433 145.985 278.071 145.856 278.716 145.856C279.524 145.856 280.318 146.059 281.027 146.445L281.369 146.632C282.16 147.063 283.119 147.043 283.892 146.58C284.681 146.106 285.59 145.856 286.511 145.856C287.195 145.856 287.876 145.993 288.505 146.259L298.576 150.511C298.579 150.512 298.578 150.517 298.575 150.517H287.476C286.712 150.517 285.952 150.623 285.217 150.833C284.811 150.949 284.397 151.034 283.978 151.086L283.89 151.097C283.064 151.2 282.227 151.193 281.403 151.075L280.928 151.007L280.172 150.839C279.207 150.625 278.222 150.517 277.234 150.517Z"
            stroke="black"
          />
          <path
            d="M275.286 135.308L276.404 135.215C277.562 135.119 278.704 135.537 279.526 136.359V136.359C280.266 137.1 281.271 137.516 282.319 137.516H282.722C283.787 137.516 284.823 137.171 285.675 136.532L285.834 136.412C286.789 135.696 287.951 135.308 289.146 135.308H290.495"
            stroke="black"
          />
          <path
            d="M275.286 126.968L272.818 129.107C270.445 131.164 270.844 134.955 273.594 136.472L275.041 137.271"
            stroke="black"
          />
          <path
            d="M290.249 126.968L292.718 129.107C295.091 131.164 294.691 134.955 291.942 136.472L290.495 137.271"
            stroke="black"
          />
          <path
            d="M290.985 102.438L288.822 107.074C287.985 108.868 287.551 110.823 287.551 112.802V121.817"
            stroke="black"
          />
          <path
            d="M274.55 102.438L276.714 107.074C277.551 108.868 277.984 110.823 277.984 112.802V121.817"
            stroke="black"
          />
          <path
            d="M295.646 105.382L300.25 103.142C303.137 101.738 306.429 101.405 309.539 102.202L314.289 103.42"
            stroke="black"
          />
          <path
            d="M270.135 105.382L265.531 103.142C262.644 101.738 259.352 101.405 256.241 102.202L251.492 103.42"
            stroke="black"
          />
          <path
            d="M245.85 99.0045L250.224 96.6496C251.539 95.9412 253.01 95.5703 254.505 95.5703H258.31C261.605 95.5703 264.889 95.9308 268.105 96.6454L274.305 98.0233"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M319.195 98.5138L314.821 96.1589C313.506 95.4504 312.035 95.0796 310.54 95.0796H306.735C303.44 95.0796 300.156 95.4401 296.94 96.1547L290.74 97.5326"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M336.174 101.209C336.308 101.451 336.612 101.538 336.854 101.404C337.095 101.269 337.182 100.965 337.048 100.724L336.174 101.209ZM336.083 100.017L335.646 100.26L336.083 100.017ZM326.472 112.293L334.965 100.224L334.147 99.6485L325.654 111.717L326.472 112.293ZM335.646 100.26L336.174 101.209L337.048 100.724L336.521 99.7746L335.646 100.26ZM334.965 100.224C335.136 99.9809 335.502 100 335.646 100.26L336.521 99.7746C336.018 98.8699 334.742 98.8022 334.147 99.6485L334.965 100.224Z"
            fill="black"
          />
          <path
            d="M327.535 99.0039L330.938 96.9182C333.335 95.4489 336.452 96.0021 338.197 98.2066V98.2066C339.213 99.49 339.612 101.156 339.286 102.76L336.895 114.544C336.543 116.282 336.044 117.987 335.403 119.642L333.422 124.76L331.933 127.825C330.282 131.224 326.895 133.44 323.119 133.591V133.591"
            stroke="black"
          />
          <path
            d="M237.265 97.7774L233.862 95.6916C231.465 94.2223 228.347 94.7755 226.602 96.9801V96.9801C225.586 98.2634 225.188 99.9294 225.513 101.534L227.904 113.317C228.257 115.056 228.756 116.761 229.396 118.415L231.378 123.534L232.866 126.599C234.517 129.998 237.904 132.213 241.68 132.364V132.364"
            stroke="black"
          />
          <path
            d="M310.854 158.121L311.993 171.135C312.358 175.305 314.63 179.072 318.149 181.339L323.61 184.859"
            stroke="black"
            stroke-width="1.5"
          />
          <path
            d="M255.417 158.367L254.278 171.38C253.913 175.55 251.641 179.317 248.122 181.585L242.661 185.104"
            stroke="black"
            stroke-width="1.5"
          />
          <path
            d="M237.755 97.0419L242.8 89.5861C246.565 84.0199 249.041 77.6833 250.046 71.0385L250.869 65.5946C251.221 63.2673 253.302 61.6009 255.65 61.766L279.673 63.4551C281.815 63.6057 283.966 63.6033 286.108 63.4478L308.977 61.7879C311.714 61.5893 313.813 62.9832 314.473 65.6465C315.691 70.5585 317.468 78.3858 317.995 81.1315C318.775 85.1913 329.078 95.6173 328.025 97.0419"
            stroke="black"
            stroke-dasharray="2.71 2.71"
          />
          <path
            d="M235.534 81.9384L241.225 128.923C241.851 134.093 243.367 139.116 245.706 143.769L248.013 148.36C250.155 152.623 252.96 156.519 256.322 159.904L264.019 167.652C269.033 172.699 275.852 175.537 282.966 175.537C290.135 175.537 297.003 172.655 302.025 167.538L309.049 160.382C312.679 156.685 315.644 152.39 317.817 147.687L319.934 143.103C321.882 138.884 323.168 134.39 323.745 129.779L329.692 82.2575C330.214 78.0888 330.151 73.8677 329.506 69.7163L328.68 64.4015C327.46 56.5552 323.738 49.1963 317.029 44.9501C309.132 39.9526 297.064 34.2452 283.136 34.2451C269.415 34.245 257.124 39.7836 248.887 44.7261C241.637 49.0762 237.581 56.8857 236.367 65.2525L235.675 70.0279C235.102 73.9744 235.055 77.9795 235.534 81.9384Z"
            stroke="black"
            stroke-width="1.5"
          />
          <path
            d="M330.233 109.061L331.439 110.267C331.771 110.599 331.992 111.028 332.069 111.492L332.165 112.066C332.185 112.188 332.195 112.312 332.195 112.437V113.253C332.195 113.402 332.181 113.55 332.152 113.696L332.016 114.372C331.972 114.591 331.896 114.803 331.79 115L330.233 117.892L329.641 119.224C329.384 119.801 329.252 120.426 329.252 121.058V122.307"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M228.871 100.964C228.737 101.205 228.433 101.292 228.191 101.158C227.95 101.024 227.863 100.719 227.997 100.478L228.871 100.964ZM228.961 99.7718L229.399 100.015L228.961 99.7718ZM238.573 112.047L230.08 99.9784L230.898 99.4029L239.391 111.472L238.573 112.047ZM229.399 100.015L228.871 100.964L227.997 100.478L228.524 99.5289L229.399 100.015ZM230.08 99.9784C229.909 99.7353 229.543 99.7547 229.399 100.015L228.524 99.5289C229.027 98.6243 230.303 98.5565 230.898 99.4029L230.08 99.9784Z"
            fill="black"
          />
          <path
            d="M234.812 108.816L233.606 110.021C233.274 110.354 233.053 110.782 232.976 111.247L232.88 111.821C232.86 111.943 232.85 112.067 232.85 112.192V113.008C232.85 113.156 232.864 113.305 232.893 113.45L233.029 114.127C233.073 114.346 233.149 114.558 233.255 114.755L234.812 117.647L235.404 118.979C235.661 119.556 235.793 120.181 235.793 120.812V122.062"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M251.53 107.839L251.291 108.042C251.269 108.061 251.271 108.097 251.295 108.114L253.677 109.781C258.149 112.911 264.062 113.052 268.677 110.137L270.334 109.091C270.358 109.075 270.362 109.042 270.342 109.021L270.15 108.818C265.191 103.592 257.009 103.161 251.53 107.839Z"
            stroke="black"
          />
          <path
            d="M264.729 108.325C264.729 110.163 263.033 111.75 260.814 111.75C258.594 111.75 256.898 110.163 256.898 108.325C256.898 106.487 258.594 104.9 260.814 104.9C263.033 104.9 264.729 106.487 264.729 108.325Z"
            stroke="black"
          />
          <path
            d="M314.006 107.839L314.244 108.042C314.267 108.061 314.265 108.097 314.241 108.114L311.858 109.781C307.387 112.911 301.473 113.052 296.858 110.137L295.202 109.091C295.178 109.075 295.174 109.042 295.193 109.021L295.386 108.818C300.344 103.592 308.527 103.161 314.006 107.839Z"
            stroke="black"
          />
          <path
            d="M300.807 108.325C300.807 110.163 302.503 111.75 304.722 111.75C306.941 111.75 308.637 110.163 308.637 108.325C308.637 106.487 306.941 104.9 304.722 104.9C302.503 104.9 300.807 106.487 300.807 108.325Z"
            stroke="black"
          />
          <path
            d="M565.278 96.551L565.728 96.2665C568.123 94.7544 571.272 95.2914 573.029 97.5116V97.5116C574.027 98.7711 574.428 100.401 574.129 101.98L571.738 114.618C571.357 116.633 570.793 118.609 570.052 120.521L568.222 125.251L566.733 128.316C565.082 131.715 561.695 133.931 557.919 134.082V134.082"
            stroke="black"
          />
          <path
            d="M469.612 97.0416L468.614 96.3765C466.267 94.812 463.112 95.31 461.362 97.5214V97.5214C460.371 98.7726 459.983 100.397 460.3 101.961L462.704 113.808C463.056 115.546 463.556 117.252 464.196 118.906L466.177 124.024L467.666 127.089C469.317 130.489 472.704 132.704 476.48 132.855V132.855"
            stroke="black"
          />
          <path
            d="M517.935 35.4718C504.588 35.4717 492.579 40.7898 484.402 45.6467C477.125 49.9689 472.907 57.7369 471.39 66.1947L470.277 72.405C469.673 75.7725 469.428 79.1947 469.547 82.6138L470.098 98.4441C470.262 103.157 470.883 107.843 471.953 112.435L476.363 131.373C477.229 135.095 478.534 138.7 480.25 142.114L484.01 149.594C485.571 152.7 487.616 155.622 490.079 158.086C490.617 158.624 490.911 159.365 490.844 160.123L489.861 171.362C489.445 176.12 486.852 180.418 482.837 183.005L477.86 186.213L477.062 184.976L482.04 181.768C485.672 179.427 488.018 175.539 488.395 171.234L489.329 160.558C489.394 159.818 489.116 159.093 488.599 158.561C486.223 156.111 484.231 153.311 482.695 150.255L478.935 142.775C477.167 139.257 475.822 135.542 474.929 131.707L470.519 112.769C469.428 108.084 468.794 103.303 468.627 98.4953L468.076 82.665C467.954 79.1417 468.206 75.6153 468.828 72.1452L469.942 65.9349C471.51 57.1915 475.902 48.983 483.65 44.3813C491.939 39.4583 504.215 33.9999 517.935 34C532.072 34.0001 544.289 39.7951 552.245 44.8339C559.185 49.2289 563.157 56.6877 564.798 64.6064L565.992 70.3668C566.823 74.3766 567.156 78.4736 566.984 82.565L566.214 100.886C566.078 104.107 565.63 107.308 564.876 110.443L559.521 132.698C558.757 135.872 557.683 138.963 556.314 141.926L552.351 150.507C551.006 153.419 549.246 156.116 547.129 158.516C546.704 158.997 546.482 159.628 546.538 160.267L547.476 170.989C547.852 175.293 550.198 179.182 553.83 181.523L558.808 184.731L558.011 185.968L553.033 182.76C549.019 180.173 546.426 175.875 546.01 171.117L545.114 160.877C544.999 159.569 545.474 158.288 546.322 157.285C548.206 155.055 549.802 152.516 551.015 149.89L554.978 141.309C556.306 138.433 557.348 135.433 558.09 132.353L563.445 110.099C564.177 107.057 564.612 103.95 564.743 100.824L565.514 82.5032C565.681 78.5327 565.357 74.5568 564.551 70.6655L563.357 64.9051C561.769 57.2433 557.961 50.1956 551.458 46.0773C543.621 41.1141 531.682 35.4719 517.935 35.4718Z"
            fill="black"
            stroke="black"
            stroke-width="0.2"
          />
          <path
            d="M479.178 140.95L491.35 147.442C493.029 148.337 494.5 149.576 495.668 151.077L498.033 154.118C498.707 154.985 499.273 155.93 499.719 156.933L501.918 161.881C502.571 163.35 503.955 164.361 505.553 164.536L516.873 165.774C518.067 165.904 519.272 165.876 520.458 165.689L530.403 164.118C531.818 163.895 533.043 163.013 533.704 161.742L537.3 154.827C538.433 152.649 540.136 150.819 542.228 149.534L556.202 140.95"
            stroke="black"
            stroke-dasharray="1.81 1.81"
          />
          <path
            d="M302.514 317.978L302.648 318.427C304.711 325.352 310.088 330.794 316.987 332.941V332.941"
            stroke="black"
            stroke-linecap="round"
            stroke-dasharray="0.9 0.9"
          />
          <path
            d="M238.491 286.579L242.773 286.284C244.616 286.157 246.455 286.599 248.04 287.55L254.19 291.24"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M242.907 312.336L243.217 313.19C243.661 314.41 243.888 315.698 243.888 316.997V316.997"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M296.872 291.24L297.228 291.54C299.078 293.106 301.338 294.108 303.741 294.429V294.429"
            stroke="black"
          />
          <path
            d="M266.701 365.566L265.848 357.931C265.573 355.474 263.981 353.361 261.694 352.421L257.87 350.848"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M299.571 312.091V312.091C301.668 311.284 303.547 309.999 305.058 308.336L305.213 308.166"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M294.419 297.127V290.179C294.419 288.051 295.354 286.031 296.975 284.652V284.652C298.477 283.376 300.433 282.766 302.395 282.962L303.09 283.031C305.395 283.262 307.519 284.382 309.011 286.153L309.055 286.206C310.073 287.415 310.758 288.87 311.041 290.425L311.592 293.458C311.917 295.242 312.005 297.062 311.854 298.869L311.822 299.254C311.509 303.009 310.261 306.627 308.191 309.776L305.703 313.562L302.074 317.71C301.107 318.815 299.709 319.45 298.24 319.45V319.45C295.976 319.45 293.984 317.955 293.35 315.782L292.702 313.562"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M308.401 301.052C308.401 300.59 308.401 296.985 308.401 294.109C308.401 292.715 308.004 291.351 307.256 290.176L306.52 289.019C305.56 287.511 303.865 286.634 302.079 286.723V286.723C300.785 286.788 299.568 287.356 298.686 288.305L298.439 288.571C297.432 289.656 296.872 291.081 296.872 292.561V293.125C296.872 294.146 297.087 295.156 297.502 296.089L297.786 296.73C298.475 298.28 299.526 299.642 300.851 300.702L301.288 301.052"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M298.099 297.127L299.893 297.779C300.492 297.997 301.054 298.306 301.56 298.695L301.98 299.018C303.245 299.991 303.986 301.496 303.986 303.092V303.834C303.986 304.723 303.633 305.575 303.005 306.203V306.203C302.377 306.831 301.525 307.184 300.636 307.184H299.518C299.076 307.184 298.649 307.339 298.31 307.621L297.84 308.013C297.55 308.255 297.145 308.302 296.808 308.133V308.133C296.313 307.886 296.134 307.27 296.419 306.796L297.063 305.723C297.259 305.395 297.363 305.02 297.363 304.638V303.542C297.363 303.204 297.229 302.88 296.99 302.641L296.619 302.27C296.242 301.894 296.305 301.267 296.747 300.972V300.972C297.1 300.737 297.572 300.799 297.85 301.118L300.797 304.486"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M294.419 317.977L292.301 329.627C291.481 334.141 288.43 337.933 284.197 339.702L257.895 350.69C256.097 351.442 254.168 351.828 252.22 351.828H250.995C248.156 351.828 245.417 350.78 243.303 348.885L242.511 348.175C240.577 346.441 239.473 343.967 239.473 341.37V340.832C239.473 340.316 239.546 339.803 239.692 339.308V339.308C240.303 337.232 239.615 334.991 237.944 333.615L236.916 332.769C236.66 332.557 236.439 332.306 236.263 332.025L235.919 331.474C235.539 330.865 235.519 330.098 235.867 329.471V329.471C236.265 328.754 236.179 327.866 235.649 327.24L235.189 326.696C234.373 325.732 234.247 324.362 234.874 323.266L235.253 322.601C235.607 321.982 235.793 321.282 235.793 320.569V318.958C235.793 317.468 234.585 316.26 233.095 316.26V316.26H231.697C230.418 316.26 229.215 315.648 228.463 314.613V314.613C227.966 313.93 227.698 313.107 227.698 312.262V311.935C227.698 311.072 227.921 310.224 228.346 309.472L236.559 294.941C237.022 294.123 237.265 293.199 237.265 292.259V292.034C237.265 291.193 237.036 290.368 236.604 289.648V289.648C236.078 288.771 235.857 287.746 235.974 286.73L236.529 281.918L238.246 274.805L239.718 269.408L240.185 266.37C240.526 264.156 241.194 262.005 242.168 259.988L243.067 258.126C246.021 252.007 250.453 246.722 255.964 242.747V242.747C260.3 239.619 265.207 237.373 270.407 236.135L275.925 234.821C280.7 233.684 285.629 233.333 290.517 233.783L297.611 234.435C302.162 234.854 306.623 235.961 310.841 237.718L315.444 239.636C317.925 240.67 320.2 242.138 322.165 243.971L324.261 245.928C325.782 247.347 327.099 248.97 328.176 250.75L331.727 256.623C332.528 257.948 333.19 259.351 333.704 260.811L336.162 267.796C337.107 270.482 337.535 273.322 337.424 276.167L336.94 288.585C336.884 290.025 336.691 291.455 336.362 292.858L334.064 302.663C333.477 305.168 332.466 307.554 331.074 309.719L324.346 320.185L320.974 324.736C319.955 326.113 319.095 327.601 318.412 329.172L318.178 329.711C317.387 331.529 316.84 333.443 316.549 335.404L316.249 337.428C316.087 338.523 316.006 339.629 316.006 340.736V344.318C316.006 345.562 316.108 346.803 316.313 348.029L317.347 354.232C317.597 355.733 317.998 357.205 318.544 358.625L321.402 366.056"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M236.284 327.79H244.609C244.613 327.79 244.615 327.784 244.611 327.782L238.797 323.905C238.278 323.559 237.668 323.375 237.044 323.375H235.303"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M236.529 331.96L237.513 331.837C239.462 331.593 241.364 331.056 243.152 330.243V330.243"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M237.756 315.77L235.597 316.49C235.136 316.643 234.631 316.461 234.373 316.05V316.05C233.989 315.434 234.328 314.624 235.037 314.467L235.307 314.406C235.619 314.337 235.946 314.39 236.22 314.554L237.427 315.279C238.673 316.026 240.24 315.975 241.434 315.149L241.732 314.942C242.328 314.529 242.741 313.901 242.883 313.19V313.19C243.053 312.342 242.821 311.463 242.254 310.809L239.963 308.166"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M241.19 290.504L242.907 291.262M242.907 301.052L242.77 300.689C242.374 299.631 242.171 298.512 242.171 297.382V297.382C242.171 297.228 242.265 297.09 242.408 297.033L242.907 296.833M242.907 291.262L244.379 291.911M242.907 291.262L242.834 292.097C242.719 293.415 242.72 294.74 242.838 296.058L242.907 296.833M242.907 296.833L244.379 296.244M244.379 291.911L248.547 293.75C248.913 293.912 248.904 294.434 248.533 294.583L244.379 296.244M244.379 291.911V291.911C244.542 293.351 244.542 294.805 244.379 296.244V296.244"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M243.888 256.898H252.698C255.944 256.898 259.152 257.599 262.104 258.951L265.729 260.613C268.064 261.683 269.833 263.698 270.593 266.152L275.777 282.9L276.702 285.06C277.548 287.033 278.795 288.808 280.364 290.272V290.272C281.228 291.078 282.181 291.783 283.206 292.372L291.476 297.127"
            stroke="black"
            stroke-linecap="round"
            stroke-dasharray="0.9 0.9"
          />
          <path
            d="M497.821 319.086L497.687 319.536C495.624 326.461 490.248 331.903 483.348 334.05V334.05"
            stroke="black"
            stroke-linecap="round"
            stroke-dasharray="0.9 0.9"
          />
          <path
            d="M561.844 287.688L557.563 287.393C555.719 287.265 553.88 287.707 552.296 288.658L546.145 292.349"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M557.428 313.444L557.118 314.298C556.674 315.518 556.447 316.807 556.447 318.105V318.105"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M503.463 292.349L503.108 292.649C501.257 294.215 498.997 295.217 496.594 295.538V295.538"
            stroke="black"
          />
          <path
            d="M533.634 366.674L534.488 359.04C534.762 356.582 536.355 354.47 538.642 353.529L542.465 351.956"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M500.764 313.199V313.199C498.668 312.393 496.789 311.107 495.277 309.445L495.123 309.274"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M505.916 298.236V291.288C505.916 289.16 504.981 287.139 503.36 285.761V285.761C501.858 284.484 499.902 283.874 497.94 284.07L497.245 284.14C494.94 284.37 492.816 285.49 491.324 287.262L491.28 287.315C490.262 288.524 489.577 289.978 489.294 291.533L488.743 294.567C488.418 296.351 488.33 298.17 488.481 299.977L488.513 300.362C488.826 304.118 490.074 307.735 492.144 310.885L494.632 314.671L498.261 318.818C499.228 319.924 500.626 320.558 502.095 320.558V320.558C504.359 320.558 506.352 319.064 506.985 316.89L507.633 314.671"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M491.934 302.161C491.934 301.699 491.934 298.094 491.934 295.218C491.934 293.824 492.331 292.46 493.079 291.285L493.816 290.127C494.775 288.619 496.471 287.743 498.256 287.832V287.832C499.55 287.897 500.767 288.465 501.649 289.414L501.896 289.68C502.903 290.765 503.463 292.19 503.463 293.67V294.234C503.463 295.255 503.248 296.265 502.834 297.198L502.549 297.839C501.86 299.389 500.809 300.751 499.484 301.811L499.047 302.161"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M502.236 298.236L500.442 298.888C499.843 299.106 499.281 299.415 498.776 299.803L498.355 300.127C497.09 301.1 496.349 302.605 496.349 304.201V304.943C496.349 305.832 496.702 306.684 497.33 307.312V307.312C497.959 307.94 498.811 308.293 499.699 308.293H500.818C501.259 308.293 501.686 308.448 502.025 308.73L502.495 309.122C502.785 309.364 503.19 309.411 503.527 309.242V309.242C504.022 308.995 504.201 308.379 503.917 307.905L503.273 306.831C503.076 306.504 502.972 306.129 502.972 305.747V304.651C502.972 304.313 503.106 303.989 503.345 303.75L503.716 303.379C504.093 303.002 504.031 302.376 503.588 302.08V302.08C503.235 301.846 502.764 301.908 502.485 302.227L499.538 305.595"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M505.916 319.086L508.034 330.736C508.855 335.25 511.905 339.042 516.138 340.81L542.44 351.799C544.238 352.551 546.167 352.937 548.115 352.937H549.34C552.179 352.937 554.918 351.889 557.032 349.994L557.824 349.284C559.758 347.55 560.863 345.076 560.863 342.479V341.941C560.863 341.425 560.789 340.912 560.643 340.417V340.417C560.032 338.34 560.72 336.1 562.391 334.724L563.419 333.877C563.675 333.666 563.896 333.415 564.072 333.134L564.416 332.583C564.797 331.974 564.816 331.207 564.468 330.58V330.58C564.07 329.863 564.157 328.975 564.686 328.349L565.147 327.804C565.962 326.841 566.088 325.471 565.462 324.375L565.082 323.71C564.728 323.091 564.542 322.391 564.542 321.678V320.067C564.542 318.577 565.75 317.369 567.24 317.369V317.369H568.638C569.918 317.369 571.12 316.757 571.872 315.722V315.722C572.369 315.039 572.637 314.216 572.637 313.371V313.044C572.637 312.181 572.414 311.332 571.989 310.581L563.776 296.05C563.313 295.232 563.07 294.308 563.07 293.368V293.142C563.07 292.302 563.299 291.477 563.731 290.757V290.757C564.257 289.88 564.479 288.855 564.361 287.839L563.806 283.027L562.089 275.914L560.617 270.517L560.15 267.478C559.809 265.265 559.141 263.114 558.167 261.097L557.269 259.235C554.315 253.116 549.882 247.83 544.371 243.856V243.856C540.036 240.728 535.128 238.482 529.928 237.243L524.41 235.93C519.635 234.793 514.706 234.442 509.819 234.892L502.725 235.544C498.174 235.962 493.712 237.069 489.494 238.827L484.891 240.745C482.411 241.779 480.135 243.247 478.17 245.08L476.074 247.037C474.553 248.456 473.236 250.079 472.159 251.859L468.608 257.732C467.807 259.056 467.145 260.46 466.631 261.92L464.174 268.905C463.229 271.591 462.8 274.431 462.911 277.276L463.395 289.694C463.451 291.133 463.645 292.564 463.973 293.966L466.271 303.772C466.859 306.277 467.87 308.663 469.261 310.828L475.989 321.294L479.361 325.845C480.38 327.222 481.24 328.71 481.923 330.281L482.158 330.82C482.948 332.638 483.495 334.552 483.786 336.513L484.086 338.537C484.248 339.632 484.329 340.738 484.329 341.845V345.427C484.329 346.671 484.227 347.912 484.022 349.138L482.989 355.341C482.738 356.842 482.337 358.314 481.791 359.734L478.933 367.165"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M564.051 328.898H555.726C555.722 328.898 555.72 328.892 555.724 328.89L561.538 325.014C562.057 324.668 562.667 324.483 563.291 324.483H565.033"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M563.806 333.068L562.822 332.945C560.873 332.702 558.972 332.164 557.183 331.351V331.351"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M562.58 316.879L564.738 317.598C565.199 317.752 565.705 317.57 565.962 317.158V317.158C566.346 316.543 566.007 315.732 565.299 315.575L565.028 315.515C564.716 315.446 564.389 315.498 564.115 315.663L562.908 316.387C561.663 317.135 560.095 317.083 558.902 316.257L558.603 316.05C558.007 315.638 557.594 315.01 557.452 314.299V314.299C557.282 313.45 557.515 312.571 558.081 311.918L560.372 309.274"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M559.145 291.613L557.428 292.37M557.428 302.161L557.565 301.797C557.961 300.74 558.164 299.62 558.164 298.491V298.491C558.164 298.337 558.07 298.198 557.928 298.141L557.428 297.941M557.428 292.37L555.957 293.02M557.428 292.37L557.501 293.206C557.616 294.523 557.615 295.849 557.497 297.167L557.428 297.941M557.428 297.941L555.957 297.353M555.957 293.02L551.788 294.859C551.422 295.02 551.431 295.543 551.802 295.691L555.957 297.353M555.957 293.02V293.02C555.794 294.459 555.794 295.913 555.957 297.353V297.353"
            stroke="black"
            stroke-linecap="round"
          />
          <path
            d="M556.447 258.007H547.637C544.391 258.007 541.183 258.707 538.232 260.06L534.606 261.721C532.271 262.792 530.502 264.806 529.742 267.26L524.558 284.008L523.633 286.168C522.787 288.141 521.54 289.916 519.972 291.38V291.38C519.108 292.187 518.154 292.891 517.129 293.481L508.859 298.236"
            stroke="black"
            stroke-linecap="round"
            stroke-dasharray="0.9 0.9"
          />
        </svg>
        <canvas
          height="400"
          width="800"
          @mousedown="startPainting"
          @mouseup="finishedPainting"
          @mousemove="draw"
          id="canvas"
          class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px] cursor-crosshair"
        ></canvas>
      </div>
      <div>
        <a class="clear-button" @click.prevent="clearCanvas">Clear Canvas</a>
        <a class="clear-button" @click.prevent="setEraser">Set Penghapus</a>
        <a class="clear-button" @click.prevent="setPen">Set Pen</a>
        <a class="clear-button" @click.prevent="saveCanvas">Save</a>
        <a class="clear-button" @click.prevent="loadImage">Load</a>
      </div>
    </div>
  </div>
</template>

<style>
/* canvas {
  display: block;
  border: 2px solid #333;
  border-radius: 5px;
  cursor: crosshair;
} */

.color-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 50%;
}

.color-picker {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.clear-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.clear-button:hover {
  background-color: #444;
}
</style>
