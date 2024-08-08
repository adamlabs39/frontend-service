<script lang="ts" setup>
import { ref } from "vue";

const value = ref('');
</script>
<template>
    <div class="card">
        <Editor v-model="value" editorStyle="height: 320px" />
    </div>
</template>


