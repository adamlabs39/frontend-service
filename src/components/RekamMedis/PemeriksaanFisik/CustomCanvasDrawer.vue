<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { isCanvasEmpty } from "./pemeriksaanFisikUtils";

const emit = defineEmits(["editAsesmen"]);

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    default: "form",
  },
  openedData: {
    type: Object as PropType<any>,
    default: null,
  },
});

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const canvas2 = ref<HTMLCanvasElement | null>(null);
const ctx2 = ref<CanvasRenderingContext2D | null>(null);

const painting = ref<boolean>(false);
const textMode = ref(false);

const colors = ref("e9594c");
const lineWidth = ref(5);
const isStartPainting = ref(false);
const selectedTool = ref("pencil");
const selectedArrow = ref("");
const detailDialog = ref(false);

const startX = ref(0);
const startY = ref(0);
const currentRect = ref<any>({});

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
  finishedPainting(e);
};

const clearCanvas = () => {
  ctx.value!.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
};

const startPainting = (e: MouseEvent) => {
  if (textMode.value) return;
  if (selectedTool.value == "eraser") {
    ctx.value!.globalCompositeOperation = "destination-out";
  } else {
    ctx.value!.globalCompositeOperation = "source-over";
  }
  if (selectedTool.value.includes("arrow-")) {
    drawArrow(e);
  } else {
    painting.value = true;
    ctx.value!.strokeStyle = `#${colors.value}`;

    startX.value = e.offsetX;
    startY.value = e.offsetY;
    currentRect.value = { x: startX, y: startY, width: 0, height: 0 };
  }
};

const finishedPainting = (e: MouseEvent) => {
  ctx.value!.beginPath();
  if (selectedTool.value == "line" && isStartPainting.value) {
    ctx.value!.moveTo(startX.value, startY.value);
    ctx.value!.lineTo(e.offsetX, e.offsetY);
  } else if (selectedTool.value == "circle" && isStartPainting.value) {
    const radius = Math.sqrt(
      (e.offsetX - startX.value) ** 2 + (e.offsetY - startY.value) ** 2
    );
    ctx.value!.arc(startX.value, startY.value, radius, 0, Math.PI * 2);
  } else if (selectedTool.value == "square" && isStartPainting.value) {
    currentRect.value.width = e.offsetX - startX.value;
    currentRect.value.height = e.offsetY - startY.value;

    // Draw the current rectangle
    ctx.value!.rect(
      currentRect.value.x,
      currentRect.value.y,
      currentRect.value.width,
      currentRect.value.height
    );
  }
  ctx.value!.stroke();
  ctx2.value!.clearRect(0, 0, canvas2.value!.width, canvas2.value!.height);

  painting.value = false;
  ctx.value!.beginPath();
};

const draw = (e: MouseEvent) => {
  if (
    !painting.value ||
    !isStartPainting.value ||
    (selectedTool.value != "pencil" && selectedTool.value != "eraser")
  )
    return;

  const rect = canvas.value!.getBoundingClientRect();

  ctx.value!.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.value!.stroke();

  ctx.value!.beginPath();
  ctx.value!.moveTo(e.clientX - rect.left, e.clientY - rect.top);

  ctx.value!.stroke();
};

const drawLine = (e: MouseEvent) => {
  if (!painting.value || !isStartPainting.value || selectedTool.value != "line")
    return;

  // Bersihkan canvas
  ctx2.value!.clearRect(0, 0, canvas2.value!.width, canvas2.value!.height);

  // Gambar garis dari titik awal ke titik akhir saat ini
  ctx2.value!.beginPath();
  ctx2.value!.moveTo(startX.value, startY.value);
  ctx2.value!.lineTo(e.offsetX, e.offsetY);
  ctx2.value!.stroke();
};

const drawCircle = (e: MouseEvent) => {
  if (
    !painting.value ||
    !isStartPainting.value ||
    selectedTool.value != "circle"
  )
    return;

  const radius = Math.sqrt(
    (e.offsetX - startX.value) ** 2 + (e.offsetY - startY.value) ** 2
  );

  // Bersihkan canvas
  ctx2.value!.clearRect(0, 0, canvas2.value!.width, canvas2.value!.height);

  // Gambar garis dari titik awal ke titik akhir saat ini
  ctx2.value!.beginPath();
  ctx2.value!.arc(startX.value, startY.value, radius, 0, Math.PI * 2);
  ctx2.value!.stroke();
};

const drawSquare = (e: MouseEvent) => {
  if (
    !painting.value ||
    !isStartPainting.value ||
    selectedTool.value != "square"
  )
    return;

  currentRect.value.width = e.offsetX - startX.value;
  currentRect.value.height = e.offsetY - startY.value;

  // Clear the canvas and redraw everything
  ctx2.value!.clearRect(0, 0, canvas2.value!.width, canvas2.value!.height);

  // Draw the current rectangle
  ctx2.value!.beginPath();
  ctx2.value!.rect(
    currentRect.value.x,
    currentRect.value.y,
    currentRect.value.width,
    currentRect.value.height
  );
  ctx2.value!.stroke();
};

const drawArrow = async (e: MouseEvent) => {
  const svgPath = getArrowSVG(selectedArrow.value, selectedTool.value);

  const response = await fetch(svgPath);
  let svgData = await response.text();

  if (selectedArrow.value == "TidakDapatGerak") {
    svgData = svgData.replace('stroke="black"', `stroke="#${colors.value}"`);
  } else {
    svgData = svgData.replace('fill="black"', `fill="#${colors.value}"`);
  }

  const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = url;

  img.onload = () => {
    const rect = canvas.value!.getBoundingClientRect();
    // Gambar SVG ke canvas
    ctx.value!.drawImage(
      img,
      e.clientX - rect.left - 18,
      e.clientY - rect.top - 18
    );

    // Bebaskan URL Blob
    URL.revokeObjectURL(url);
  };
};

const drawing = (e: MouseEvent) => {
  ctx.value!.lineCap = "round";
  ctx.value!.strokeStyle = `#${colors.value}`;
  ctx.value!.lineWidth = lineWidth.value;
  ctx2.value!.lineCap = "round";
  ctx2.value!.strokeStyle = `#${colors.value}`;
  ctx2.value!.lineWidth = lineWidth.value;
  if (selectedTool.value === "line") {
    drawLine(e);
  } else if (
    selectedTool.value === "pencil" ||
    selectedTool.value === "eraser"
  ) {
    draw(e);
  } else if (selectedTool.value === "circle") {
    drawCircle(e);
  } else if (selectedTool.value === "square") {
    drawSquare(e);
  }
};

const keterangan = ref("");
const saveCanvas = () => {
  let tempData: any = {};
  let dataURL = canvas.value!.toDataURL("image/png");
  if (keterangan.value || !isCanvasEmpty(dataURL)) {
    tempData[props.type.toLowerCase()] = true;
  } else {
    dataURL = "";
    tempData[props.type.toLowerCase()] = false;
  }
  tempData[`gambar_${props.type.toLowerCase()}`] = dataURL;
  tempData[`ket_${props.type.toLowerCase()}`] = keterangan.value;
  return tempData;
};

const loadImage = () => {
  const img = new Image();
  img.src = props.openedData ? props.openedData[`gambar${props.type}`] : "";
  img.onload = () => {
    ctx.value!.drawImage(img, 0, 0);
  };
};

onMounted(() => {
  if (canvas.value) {
    // const canvasElement = document.getElementById("canvas");
    // canvas.value = canvasElement as HTMLCanvasElement;
    ctx.value = canvas.value!.getContext("2d");

    // Set default stroke color
    ctx.value!.strokeStyle = `#${colors.value}`;
    keterangan.value = props.openedData
      ? props.openedData[`ket${props.type}`]
      : "";
    loadImage();
  }

  if (canvas2.value) {
    // const canvasElement2 = document.getElementById("canvas2");
    // canvas2.value = canvasElement2 as HTMLCanvasElement;
    ctx2.value = canvas2.value!.getContext("2d");
  }
});

watch(
  () => canvas.value,
  (newCanvas) => {
    if (newCanvas) {
      // const canvasElement = document.getElementById("canvas");
      // canvas.value = canvasElement as HTMLCanvasElement;
      ctx.value = canvas.value!.getContext("2d");

      // Set default stroke color
      ctx.value!.strokeStyle = `#${colors.value}`;
      keterangan.value = props.openedData
        ? props.openedData[`ket${props.type}`]
        : "";
      loadImage();

      ctx2.value = canvas2.value!.getContext("2d");
    }
  }
);

const getSVG = (svg: string) => {
  const imgUrl = new URL(
    `../../../assets/images/PhisicalExam/${svg}.svg`,
    import.meta.url
  ).href;
  return imgUrl;
};

const listTidakAdaHambatanGerak = ref([
  "arrow-up-left-bold",
  "arrow-up-bold",
  "arrow-up-right-bold",
  "arrow-left-bold",
  "arrow-right-bold",
  "arrow-down-left-bold",
  "arrow-down-bold",
  "arrow-down-right-bold",
]);
const listTerdapatHambatanGerak = ref([
  "arrow-line-up-left-bold",
  "arrow-line-up-bold",
  "arrow-line-up-right-bold",
  "arrow-line-left-bold",
  "arrow-line-right-bold",
  "arrow-line-down-left-bold",
  "arrow-line-down-bold",
  "arrow-line-down-right-bold",
]);
const listTidakDapatGerak = ref([
  "arrow-T-line-up-left-bold",
  "arrow-T-line-up-bold",
  "arrow-T-line-up-right-bold",
  "arrow-T-line-left-bold",
  "arrow-T-line-right-bold",
  "arrow-T-line-down-left-bold",
  "arrow-T-line-down-bold",
  "arrow-T-line-down-right-bold",
]);

const getArrowSVG = (path: string, svg: string) => {
  const imgUrl = new URL(
    `../../../assets/icons/medical-record/pemeriksaan-mata/${path}/${svg}.svg`,
    import.meta.url
  ).href;
  return imgUrl;
};

const historyDialog = ref(false);
const showDialogHistory = () => {
  historyDialog.value = true;
};

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
  saveCanvas,
  props,
});
</script>

<template>
  <div>
    <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
      <template #header>{{ header }}</template>
      <template #content>
        <div v-if="method == 'form'" class="flex flex-col">
          <CustomButton
            @click="showDialogHistory"
            class="!rounded-md my-[10px] ml-auto"
            label="Riwayat Pemeriksaan"
            size="small"
            icon="PhClockCounterClockwise"
          />
          <hr class="mb-[30px]" />
        </div>
        <div v-if="method == 'form'" class="flex pt-5">
          <div class="relative h-[400px] w-[800px]">
            <img :src="getSVG(type)" alt="" />
            <canvas
              height="400"
              width="800"
              id="canvas"
              ref="canvas"
              class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
              :class="[isStartPainting ? 'cursor-crosshair' : 'cursor-default']"
            ></canvas>
            <canvas
              height="400"
              width="800"
              @mousedown="startPainting"
              @mouseup="finishedPainting"
              @mousemove="drawing"
              id="canvas2"
              ref="canvas2"
              class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
              :class="[isStartPainting ? 'cursor-crosshair' : 'cursor-default']"
            ></canvas>
          </div>
          <div class="px-[30px] grow">
            <CustomButton
              @click="isStartPainting = true"
              class="w-full mb-[10px]"
              icon="PhPaintBrush"
              label="Mulai Menggambar"
              :disabled="isStartPainting"
            />
            <div v-if="isStartPainting">
              <div
                class="grid grid-cols-[13%_13%_13%_13%_13%_13%_22%] h-[54px] bg-adameds-50 rounded-[10px] mb-[10px]"
              >
                <div
                  @click="selectedTool = 'pencil'"
                  class="p-2 m-auto rounded-full cursor-pointer"
                  :class="{ 'bg-adameds-75': selectedTool == 'pencil' }"
                >
                  <PhPencilSimple :size="25" color="#000000" weight="fill" />
                </div>
                <div
                  @click="selectedTool = 'eraser'"
                  class="p-2 m-auto rounded-full cursor-pointer"
                  :class="{ 'bg-adameds-75': selectedTool == 'eraser' }"
                >
                  <PhEraser :size="25" color="#000000" weight="fill" />
                </div>
                <div
                  @click="selectedTool = 'line'"
                  class="p-2 m-auto rounded-full cursor-pointer"
                  :class="{ 'bg-adameds-75': selectedTool == 'line' }"
                >
                  <PhLineVertical :size="25" color="#000000" weight="bold" />
                </div>
                <div
                  @click="selectedTool = 'circle'"
                  class="p-2 m-auto rounded-full cursor-pointer"
                  :class="{ 'bg-adameds-75': selectedTool == 'circle' }"
                >
                  <PhCircle :size="25" color="#000000" weight="bold" />
                </div>
                <div
                  @click="selectedTool = 'square'"
                  class="p-2 m-auto rounded-full cursor-pointer"
                  :class="{ 'bg-adameds-75': selectedTool == 'square' }"
                >
                  <PhSquare :size="25" color="#000000" weight="bold" />
                </div>
                <ColorPicker class="m-auto" v-model="colors" />
                <Slider
                  v-model="lineWidth"
                  :min="0"
                  :max="20"
                  class="h-[10px] my-auto"
                  :dt="{
                    handleContentWidth: '25px',
                    handleContentHeight: '25px',
                    handleWidth: '25px',
                    handleHeight: '25px',
                    handleContentBackground: '#14b8a6',
                  }"
                  pt:root="rounded-lg"
                  pt:range="rounded-lg bg-adameds-300"
                />
              </div>
              <div v-if="type == 'Oftalmologis'">
                <div class="font-semibold text-normal">
                  Tidak Ada Hambatan Gerak
                </div>
                <div
                  class="grid grid-cols-8 h-[54px] bg-adameds-50 rounded-[10px] mb-[10px]"
                >
                  <div
                    v-for="(list, index) in listTidakAdaHambatanGerak"
                    @click="
                      (selectedTool = list),
                        (selectedArrow = 'TidakAdaHambatanGerak')
                    "
                    class="p-2 m-auto rounded-full cursor-pointer"
                    :class="{
                      'bg-adameds-75': selectedTool == list,
                    }"
                    :key="`${list}-${index}`"
                  >
                    <img
                      :src="getArrowSVG('TidakAdaHambatanGerak', list)"
                      alt=""
                    />
                  </div>
                </div>
                <div class="font-semibold text-normal">
                  Terdapat Hambatan Gerak
                </div>
                <div
                  class="grid grid-cols-8 h-[54px] bg-adameds-50 rounded-[10px] mb-[10px]"
                >
                  <div
                    v-for="(list, index) in listTerdapatHambatanGerak"
                    @click="
                      (selectedTool = list),
                        (selectedArrow = 'TerdapatHambatanGerak')
                    "
                    class="p-2 m-auto rounded-full cursor-pointer"
                    :class="{
                      'bg-adameds-75': selectedTool == list,
                    }"
                    :key="`${list}-${index}`"
                  >
                    <img
                      :src="getArrowSVG('TerdapatHambatanGerak', list)"
                      alt=""
                    />
                  </div>
                </div>
                <div class="font-semibold text-normal">Tidak Dapat Gerak</div>
                <div
                  class="grid grid-cols-8 h-[54px] bg-adameds-50 rounded-[10px] mb-[10px]"
                >
                  <div
                    v-for="(list, index) in listTidakDapatGerak"
                    @click="
                      (selectedTool = list), (selectedArrow = 'TidakDapatGerak')
                    "
                    class="p-2 m-auto rounded-full cursor-pointer"
                    :class="{
                      'bg-adameds-75': selectedTool == list,
                    }"
                    :key="`${list}-${index}`"
                  >
                    <img :src="getArrowSVG('TidakDapatGerak', list)" alt="" />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-[10px]">
                <CustomButton
                  @click="clearCanvas"
                  class="w-full mb-[10px]"
                  label="Reset"
                  outlined
                  borderColor="border-grey-200"
                  textColor="text-grey-300"
                />
                <CustomButton
                  @click="
                    saveCanvas(),
                      (isStartPainting = false),
                      (selectedTool = 'pencil')
                  "
                  class="w-full mb-[10px]"
                  label="Simpan"
                />
              </div>
            </div>
            <div v-if="type == 'Anterior'">
              <CustomTextArea
                label="Keterangan Oculus Dextra"
                class="mt-[30px]"
                placeholder="Keterangan oculus dextra"
                height="h-10"
              />
              <CustomTextArea
                label="Keterangan Oculus Sinistra"
                class="mt-[30px]"
                placeholder="Keterangan oculus sinistra"
                height="h-10"
              />
            </div>
            <CustomTextArea
              v-else-if="type != 'Posterior' && type != 'Oftalmologis'"
              v-model="keterangan"
              :label="'Keterangan ' + header"
              class="mt-[30px]"
              :placeholder="'Keterangan ' + header.toLowerCase()"
              height="h-10"
            />
          </div>
        </div>
        <div
          v-if="props.method == 'detail'"
          class="py-5 flex flex-col gap-[19px]"
        >
          <CustomInfoRow
            label="Tanda Pada Gambar"
            :value="
              openedData && openedData[`gambar${props.type}`]
                ? 'Ada'
                : 'Tidak Ada'
            "
          />
          <div v-if="type == 'Anterior'">
            <CustomInfoRow
              label="Keterangan Oculus Dextra"
              value="-"
              class="mb-[19px]"
            />
            <CustomInfoRow label="Keterangan Oculus Sinistra" value="-" />
          </div>
          <CustomInfoRow
            v-else-if="type != 'Posterior' && type != 'Oftalmologis'"
            :label="`Keterangan ${type}`"
            :value="openedData ? openedData[`ket${props.type}`] : '-'"
          />
          <hr class="border-grey-200" />
          <CustomInfoRow
            label="Petugas Input"
            :value="openedData ? openedData.petugas : '-'"
          />
        </div>
      </template>
      <template v-if="method != 'form'" #footer>
        <div class="flex justify-between">
          <CustomButton
            @click="detailDialog = true"
            label="Detail"
            icon="DetailIcon"
          />
          <CustomButton label="Edit" @click="emit('editAsesmen')" />
        </div>
      </template>
    </CustomAccordion>
    <CustomDialog class="" v-model:visible="detailDialog" width="840px">
      <template #header>Detail Pemeriksaan Fisik - {{ type }}</template>
      <template #body>
        <div class="pt-5">
          <div class="relative h-[400px] w-[800px]">
            <img :src="getSVG(type)" alt="" />
            <canvas
              height="400"
              width="800"
              id="canvas"
              ref="canvas"
              class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
              :class="[isStartPainting ? 'cursor-crosshair' : 'cursor-default']"
            ></canvas>
            <canvas
              height="400"
              width="800"
              @mousedown="startPainting"
              @mouseup="finishedPainting"
              @mousemove="drawing"
              id="canvas2"
              ref="canvas2"
              class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
              :class="[isStartPainting ? 'cursor-crosshair' : 'cursor-default']"
            ></canvas>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton label="Edit" @click="emit('editAsesmen')" />
        </div>
      </template>
    </CustomDialog>
    <!-- Dialog History -->
    <CustomDialog class="" v-model:visible="historyDialog" width="80%">
      <template #header>Pemeriksaan Fisik</template>
      <template #body>
        <div class="pt-5 grid grid-cols-[1fr_min-content_1fr]">
          <div class="mb-[18px] flex justify-between col-span-3">
            <div class="font-semibold text-grey-400">Riwayat Sebelumnya</div>
            <div class="flex">
              <CustomButton
                @click="() => {}"
                class="!rounded-md mr-[10px]"
                size="small"
                icon="PhCaretLeft"
              />
              <CustomButton
                @click="() => {}"
                class="!rounded-md"
                size="small"
                icon="PhCaretRight"
              />
            </div>
          </div>
          <div>
            <div class="relative h-[400px] w-[800px]">
              <img :src="getSVG(type)" alt="" />
              <canvas
                height="400"
                width="800"
                id="canvas"
                ref="canvas"
                class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
                :class="[
                  isStartPainting ? 'cursor-crosshair' : 'cursor-default',
                ]"
              ></canvas>
              <canvas
                height="400"
                width="800"
                @mousedown="startPainting"
                @mouseup="finishedPainting"
                @mousemove="drawing"
                id="canvas2"
                ref="canvas2"
                class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
                :class="[
                  isStartPainting ? 'cursor-crosshair' : 'cursor-default',
                ]"
              ></canvas>
            </div>
            <div class="py-5 flex flex-col gap-[19px]">
              <div v-if="type == 'Anterior'">
                <CustomInfoRow
                  label="Keterangan Oculus Dextra"
                  value="-"
                  class="mb-[19px]"
                />
                <CustomInfoRow label="Keterangan Oculus Sinistra" value="-" />
              </div>
              <CustomInfoRow
                v-else-if="type != 'Posterior' && type != 'Oftalmologis'"
                :label="`Keterangan ${type}`"
                value="Nama Asesmen Ulang"
              />
              <hr class="border-grey-200" />
              <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
          </div>
          <div class="border border-adameds-300 mx-[15px]"></div>
          <div>
            <div class="relative h-[400px] w-[800px]">
              <img :src="getSVG(type)" alt="" />
              <canvas
                height="400"
                width="800"
                id="canvas"
                ref="canvas"
                class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
                :class="[
                  isStartPainting ? 'cursor-crosshair' : 'cursor-default',
                ]"
              ></canvas>
              <canvas
                height="400"
                width="800"
                @mousedown="startPainting"
                @mouseup="finishedPainting"
                @mousemove="drawing"
                id="canvas2"
                ref="canvas2"
                class="absolute top-0 left-0 z-10 w-full border-2 border-adameds-75 rounded-[10px]"
                :class="[
                  isStartPainting ? 'cursor-crosshair' : 'cursor-default',
                ]"
              ></canvas>
            </div>
            <div class="py-5 flex flex-col gap-[19px]">
              <div v-if="type == 'Anterior'">
                <CustomInfoRow
                  label="Keterangan Oculus Dextra"
                  value="-"
                  class="mb-[19px]"
                />
                <CustomInfoRow label="Keterangan Oculus Sinistra" value="-" />
              </div>
              <CustomInfoRow
                v-else-if="type != 'Posterior' && type != 'Oftalmologis'"
                :label="`Keterangan ${type}`"
                value="Nama Asesmen Ulang"
              />
              <hr class="border-grey-200" />
              <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
            </div>
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
