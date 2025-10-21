<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:isDialogVisible", "close", "cancel"]);

const alasanPembatalan = ref("");

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const closeDialog = () => {
  alasanPembatalan.value = "";
  emit("update:isDialogVisible", false);
};

const batalkanPermintaan = () => {
  emit("cancel", alasanPembatalan.value);
  alasanPembatalan.value = "";
  emit("update:isDialogVisible", false);
};
</script>

<template>
  <CustomDialog
    width="600px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-danger-300"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <span class="text-white font-semibold">Batal Permintaan</span>
      </div>
    </template>
    <template #body>
      <div class="pt-5">
        <div class="mb-4">
          <label class="block text-sm font-extrabold text-gray-700 mb-2">
            Alasan Pembatalan
          </label>
          <CustomTextfield
            v-model="alasanPembatalan"
            placeholder="Alasan Pembatalan"
            :showLabel="false"
            class="w-full"
          />
        </div>
        <div class="text-sm text-red-500">
          <span class="text-red-500">*</span>Setelah membatalkan, riwayat
          permintaan akan masuk ke tab menu
          <span class="font-extrabold text-red-500">DIBATALKAN</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-3">
          <CustomButton
            label="Tidak"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="closeDialog"
          />
          <CustomButton
            label="Iya, Batalkan"
            backgroundColor="bg-danger-300"
            textColor="text-white"
            @click="batalkanPermintaan"
          />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
