<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    mode: {
        type: String as PropType<"basic" | "advanced" | undefined>,
        default: "basic"
    },
    accept: {
        type: String,
        default: "image/png"
    },
    maxFileSize: {
        type: Number,
        default: 0
    },
    fileLimit: {
        type: Number,
        default: 1
    },
    multiple: {
        type: Boolean,
        default: false
    },
    uploadLabel: {
        type: String,
        default: "Upload"
    },
    showUploadButton: {
        type: Boolean,
        default: true
    },
    chooseLabel: {
        type: String,
        default: "Choose"
    },
    showChooseLabel: {
        type: Boolean,
        default: true
    },
    showCancelButton: {
        type: Boolean,
        default: true
    },
    class: {
        type: String,
        default: ""
    }
});

const emit = defineEmits(["upload"]);

const onUploadedValue = (event: any) => {
    emit("upload", event);
};
</script>

<template>


    <div class="flex items-center justify-center">
        <div class="relative flex flex-col w-full p-8 text-center rounded-lg">
            <div class="font-semibold font-poppins">Seret file ke sini</div>
            <div class="text-[#9DA4B1] font-semibold leading-relaxed">atau</div>
            <div class="flex items-center justify-center">
                <FileUpload :name="name" :url="url" :mode="mode" :accept="accept" :upload-label="uploadLabel"
                    :choose-label="chooseLabel" :max-file-size="maxFileSize" :multiple="multiple" :auto="true"
                    :show-upload-button="showUploadButton" :show-cancel-button="showCancelButton" :class="class"
                    @upload="onUploadedValue" pt:root:class="flex flex-col items-center bg-transparent border-none" pt:pcChooseButton:root:class="" >
                </FileUpload>
            </div>
            <p class="italic text-gray-400">File .PNG</p>
        </div>
    </div>
</template>

<style>
    .p-fileupload-content{
        @apply w-full absolute z-10 top-0 left-0 right-0 h-1/2
        
    }

  
</style>
