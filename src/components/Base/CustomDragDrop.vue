<script setup lang="ts">
import { ref, defineProps, computed, watch } from 'vue';
import CustomButton from './CustomButton.vue';

// Definisikan props sebagai array
const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    allowedFileTypes: {
        type: Array as () => string[],
        default: () => ['image/png']
    },
    maxFileSize: {
        type: Number,
        default: 2 * 1024 * 1024
    },
    width: {
        type: String,
        default: '100%' // Nilai default bisa disesuaikan
    },
    height: {
        type: String,
        default: '200px' // Nilai default bisa disesuaikan
    },
    backgroundColor: {
        type: String,
        default: 'white'
    },
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const imageSrc = ref("");

// untuk PDF
const fileName = ref<string | null>(null);
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
        if (file.type === 'application/pdf') {
            fileName.value = file.name;
            imageSrc.value = "";
            emit('update:modelValue', fileName.value);
             console.log('PDF uploaded:', { imageSrc: imageSrc.value, fileName: fileName.value });
        } else {
            // Membaca file sebagai data URL (base64) untuk gambar
            const reader = new FileReader();
            reader.onload = (e) => {
                imageSrc.value = e.target?.result as string;
                fileName.value = null;
                emit('update:modelValue', imageSrc.value);
                console.log('Image uploaded:', { imageSrc: imageSrc.value, fileName: fileName.value });
            };
            reader.readAsDataURL(file);
        }

    }
};

// Computed property untuk v-model binding dua arah
const value = computed({
    get: () => props.modelValue,
    set: (newValue: string) => emit('update:modelValue', newValue),
});

// Memperbarui imageSrc jika modelValue berubah dari luar
watch(() => props.modelValue, (newValue) => {
    if (newValue.endsWith('.pdf')) {
        fileName.value = newValue;
        imageSrc.value = "";
    } else {
        imageSrc.value = newValue;
        fileName.value = null;
    }
});
</script>

<template>
    <div class="flex items-center justify-center p-6 mt-2 text-center border-2 border-dashed rounded-md"
        @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onDrop"
        :class="{ 'border-adameds-200': isDragging, backgroundColor: props.backgroundColor, width: props.width, height: props.height }">

        <div v-if="!imageSrc && !fileName">
            <p class="font-semibold text-black text-SM">Seret file ke sini</p>
            <p class="mb-4 text-gray-500 text-SM">atau</p>
            <CustomButton label="Cari File" @click="browseFile"
                class="inline-flex items-center px-3 py-2 mb-4 transition text-XSwhite text- rounded-xl bg-adameds-300 hover:bg-adameds-400" />
            <p class="text-gray-500 text-SM">File {{ allowedFileTypes.join(', ') }}</p>
            <input type="file" ref="fileInput" class="hidden" @change="onFileChange" />
            <!-- Menampilkan error message jika ada -->
            <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
        </div>

        <div v-else-if="fileName">
            <p class="font-semibold text-black text-SM">{{ fileName }}</p>
        </div>
        <div v-else>
            <img :src="imageSrc" alt="Uploaded Image" class="mx-auto mt-4 rounded-md" />
        </div>
    </div>
</template>



<style scoped></style>
