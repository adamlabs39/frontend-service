<script setup lang="ts">
import { ref, defineProps } from 'vue';
import CustomButton from './CustomButton.vue';

// Definisikan props sebagai array
const props = defineProps({
    allowedFileTypes: {
        type: Array as () => string[],
        default: () => ['image/png'] 
    },
    maxFileSize: {
        type: Number,
        default: 2 * 1024 * 1024 
    }
});

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const imageSrc = ref<string | null>(null); 
const errorMessage = ref<string | null>(null);

const browseFile = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const onDragOver = () => {
    isDragging.value = true;
};

const onDragLeave = () => {
    isDragging.value = false;
};

const onDrop = (event: DragEvent) => {
    isDragging.value = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
        handleFiles(files);
    }
};

const onFileChange = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
        handleFiles(files);
    }
};

const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file) {
        // Validasi tipe file berdasarkan props array
        if (!props.allowedFileTypes.includes(file.type)) {
            errorMessage.value = "Format File tidak sesuai";
            return;
        }

        // Validasi ukuran file
        if (file.size > props.maxFileSize) {
            errorMessage.value = "Ukuran file terlalu besar. Maksimal 2 MB.";
            return;
        }

        errorMessage.value = null; // Reset error message jika file valid

        // Membaca file sebagai data URL (base64)
        const reader = new FileReader();
        reader.onload = (e) => {
            imageSrc.value = e.target?.result as string;
            console.log("Image source (base64):", imageSrc.value); 
        };
        reader.readAsDataURL(file);
    }
};
</script>

<template>
    <div class="p-6 mt-2 text-center bg-white border-2 border-dashed rounded-md " @dragover.prevent="onDragOver"
        @dragleave="onDragLeave" @drop.prevent="onDrop" :class="{ 'border-green-500': isDragging }">

        <div v-if="!imageSrc">
            <p class="font-semibold text-black text-SM">Seret file ke sini</p>
            <p class="mb-4 text-gray-500 text-SM">atau</p>
            <CustomButton label="Cari File" @click="browseFile" class="inline-flex items-center px-3 py-2 mb-4 transition text-XSwhite text- rounded-xl bg-adameds-300 hover:bg-adameds-400" />
            <p class="text-gray-500 text-SM">File {{ allowedFileTypes.join(', ') }}</p>
            <input type="file" ref="fileInput" class="hidden" @change="onFileChange" />
            <!-- Menampilkan error message jika ada -->
            <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
        </div>
        <div v-else>
            <img :src="imageSrc" alt="Uploaded Image" class="mx-auto mt-4 rounded-md" />
        </div>
    </div>
</template>



<style scoped>
.border-green-500 {
    border-color: #38a169;
    /* Warna hijau saat drag */
}
</style>
