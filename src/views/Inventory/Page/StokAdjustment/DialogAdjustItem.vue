<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { ref, type PropType } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
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
    <template #header>{{ title }} </template>
    <template #body>
      <!-- {{ detailData }} -->
      <div class="py-5 italic font-normal text-normal text-danger-300">
        *Setelah simpan, stok akan mengupdate sesuai hasil adjustment
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5">
        <CustomButton
          label="Tidak"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Iya, Adjust Item" />
      </div>
    </template>
  </CustomDialog>
</template>
