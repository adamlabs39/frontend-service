<script setup lang="ts">
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
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
const status=ref()
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
        <CustomTextfield
          label="Keadaan Gigi"
          placeholder="Masukkan Keadaan Gigi"
        />
        <CustomTextfield label="Upload File" placeholder="Upload File" />
        <CustomTextArea label="Catatan" placeholder="Masukkan Catatan" />
        <hr class="col-span-2 border-grey-200" />
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
  </CustomDialog>
</template>
