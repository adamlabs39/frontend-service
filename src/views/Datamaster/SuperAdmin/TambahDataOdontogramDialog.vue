<script setup lang="ts">
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import FileUpload from "primevue/fileupload";

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
  editData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}

const status = ref(true);
const src = ref<string | null>(null);

function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e: any) => {
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}
const imageSrc = ref(null);

function handleFileSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    loadImage(file);
  }
}

function handleDrop(event: any) {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    loadImage(file);
  }
}

function loadImage(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageSrc.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}
</script>

<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Odontogram Gigi</template>
    <template #body>
      <div class="grid grid-cols-2 gap-5 mt-5">
        <!-- Keadaan Gigi Input -->
        <CustomTextfield
          label="Keadaan Gigi"
          placeholder="Masukkan Keadaan Gigi"
        />

        <!-- File Upload Section -->
        <div>
          <!-- <CustomTextfield type="file"
          ref="fileInput" @change="handleFileSelect"/> -->
          <input
          
            type="file"
            ref="fileInput"
            class="w-full text-gray-400 font-semibold text-SM bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
            @change="handleFileSelect"
          />
          <p class="text-sm text-gray-400">Ukuran gambar 80 pixel x 80 pixel</p>

        </div>

        <!-- Notes Section -->
        <CustomTextArea label="Catatan" placeholder="Masukkan Catatan" />

        <!-- Image Preview Section -->
        <!-- <div>
          <div class="flex items-center justify-center w-full h-20 border-2 border-dashed rounded-md">
            <img v-if="src" :src="src" alt="Preview Image" class="object-cover w-20 h-20" />
            <span v-else class="text-gray-400">Upload file untuk menampilkan preview</span>
          </div>
        </div> -->
        <div
          class="w-full h-full border-2 border-dashed border-gray-400 flex items-center justify-center relative"
          @drop.prevent="handleDrop"
          @dragover.prevent
        >
          <p v-if="!imageSrc" class="text-gray-600">
            Drag and drop an image here or select one above
          </p>
          <img
            v-if="imageSrc"
            :src="imageSrc"
            alt="Uploaded Image"
            class="absolute inset-0 w-10 h-100 object-cover"
          />
        </div>

        <!-- Divider -->
        <hr class="col-span-2 border-gray-200" />

        <!-- Status Switch -->
        <CustomSwitch
          v-model="status"
          :show-label="true"
          label="Status"
          sideLabel="NON-AKTIF"
          sideLabelTrue="AKTIF"
          class="col-span-2"
        />
      </div>
    </template>

    <!-- Footer Section for Reset and Save Buttons -->
    <template #footer>
      <div class="flex justify-end space-x-3">
        <button class="p-button p-button-secondary" @click="closeDialog">
          Reset
        </button>
        <button class="p-button p-button-primary" @click="closeDialog">
          Simpan
        </button>
      </div>
    </template>
  </CustomDialog>
</template>
