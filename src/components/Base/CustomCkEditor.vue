<script setup lang="ts">
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Alignment,
  Heading,
  FontSize,
  FontBackgroundColor,
  FontColor,
  Link,
  List,
  Table,
  HeadingButtonsUI,
  ParagraphButtonUI,
} from "ckeditor5";
import { computed, ref } from "vue";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

const editor = ref(ClassicEditor);
const editorConfig = ref({
  plugins: [
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    Alignment,
    Heading,
    FontSize,
    FontBackgroundColor,
    FontColor,
    Link,
    List,
    Table,
    HeadingButtonsUI,
    ParagraphButtonUI,
  ],
  toolbar: [
    "heading",
    "alignment",
    "|",
    "fontBackgroundColor",
    "fontColor",
    "fontSize",
    "bold",
    "italic",
    "link",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "undo",
    "redo",
    "|",
    "insertTable",
  ],
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
});

const props = defineProps({
  modelValue: {
    type: String,
    default: "<p>Hello from CKEditor 5 in Vue!</p>",
  },
});

const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="max-w-full prose">
    <ckeditor v-model="value" :editor="editor" :config="editorConfig" />
  </div>
</template>
