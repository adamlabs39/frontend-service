<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  fullScreen: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "",
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
