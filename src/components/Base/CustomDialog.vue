<script setup lang="ts">
import { ref, type PropType } from "vue";

const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "",
  },
  position: {
    type: String as PropType<
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "topleft"
      | "topright"
      | "bottomleft"
      | "bottomright"
      | undefined
    >,
    default: "center",
  },
  headerBg: {
    type: String,
    default: "bg-adameds-A300",
  },
});

const dialog = ref();

const maximize = () => {
  console.log("masuk", dialog.value.maximized, !props.fullScreen);

  if (dialog.value.maximized || !props.fullScreen) return;
  dialog.value.maximize();
};
</script>

<template>
  <Dialog
    ref="dialog"
    modal
    class=""
    @show="maximize"
    :maximizable="fullScreen"
    :position="position"
    :pt:header:class="`h-[60px] rounded-t-[10px] ${headerBg}`"
    pt:root:class="border-none"
    pt:pcCloseButton:root:class="hover:bg-transparent focus:outline-none"
    pt:pcMaximizeButton:root:class="hidden"
    :style="fullScreen ? '' : `width: ${width ? width : '400px'}`"
  >
    <template #header>
      <div class="font-semibold text-white text-MD">
        <slot name="header" />
      </div>
    </template>
    <template #closeicon class="hover:bg-none">
      <PhXCircle :size="32" color="white" weight="fill" />
    </template>
    <template #default>
      <slot name="body" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
