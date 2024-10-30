<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import type { PropType } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  detailData: {
    type: Object as PropType<Record<string, any> | null>, // allow null
    default: null,
  },
});

const emit = defineEmits(["update:isDialogVisible"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header>{{ title }}</template>
    <template #body> {{ detailData }} </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton label="Edit" />
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
