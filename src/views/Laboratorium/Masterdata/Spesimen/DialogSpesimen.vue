<script setup lang="ts">
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const visible = ref(false);
const kodeSpesimen = ref("");
const namaSpesimen = ref("");
const status = ref(false);
const editMode = ref(false);
const selectedSpesimenId = ref<string | null>(null);

const emit = defineEmits(["submit", "reset"]);

// Fungsi untuk mereset form
const resetForm = () => {
  kodeSpesimen.value = "";
  namaSpesimen.value = "";
  status.value = false;
  editMode.value = false;
  selectedSpesimenId.value = null;
};

// Fungsi untuk menangani saat dialog ditutup
const onDialogClose = (isVisible: boolean) => {
  if (!isVisible) {
    resetForm(); // Reset form ketika dialog ditutup
  }
};

// Fungsi untuk submit data
const submitSpesimen = () => {
  emit("submit", {
    code: kodeSpesimen.value,
    name: namaSpesimen.value,
    status: status.value,
    id: selectedSpesimenId.value,
  });
};

defineExpose({
  visible,
  kodeSpesimen,
  namaSpesimen,
  status,
  editMode,
  selectedSpesimenId,
  resetForm,
});
</script>

<template>
  <CustomDialog v-model:visible="visible"  @update:visible="onDialogClose" :style="{ width: '600px' }">
    <template #header>
      <div class="grid grid-cols-1">
        <p>{{ editMode ? "Edit Data Spesimen" : "Tambah Data Spesimen" }}</p>
      </div>
    </template>
    <template #body>
      <div class="flex gap-3">
        <div class="mt-[20px]">
          <CustomTextfield
            v-model="kodeSpesimen"
            label="Kode Spesimen"
            placeholder="Kode Spesimen"
            class="mr-2"
          />
        </div>
        <div class="mt-[20px] grow">
          <CustomTextfield
            v-model="namaSpesimen"
            label="Nama Spesimen"
            placeholder="Nama Spesimen"
            class="mr-2"
          />
        </div>
      </div>

      <hr class="mt-[20px] border border-slate-200" />
      <div class="grid grid-cols-1 mt-[15px]">
        <div>
          <CustomSwitch
            v-model="status"
            :show-label="true"
            label="Status"
            sideLabel="NON-AKTIF"
            sideLabelTrue="AKTIF"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Reset"
            textColor="text-grey-300"
            backgroundColor="bg-transparent"
            borderColor="border-2 border-grey-200"
            @click="resetForm"
          />
          <CustomButton label="Simpan" @click="submitSpesimen" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
