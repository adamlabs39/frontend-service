<script lang="ts" setup>
import { ref } from "vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const props = defineProps({
  rows: {
    type: Number,
  },
  totalRecords: {
    type: Number,
  },
  rowsPerPageOptions: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["update:rows", "update:current-page"]);

// untuk handle perubahan rows per page
const handleRowsUpdate = (newRows: number) => {
  emits("update:rows", newRows);
};

// untuk handle perubahan halaman
const handlePageUpdate = (newPage: number) => {
  emits("update:current-page", newPage);
};
</script>
<template>
  <div class="flex justify-between px-5 py-2.5">
    <CustomPaginator
      class="ml-auto"
      :rows="rows"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="rowsPerPageOptions"
      @update:rows="handleRowsUpdate"
      @update:current-page="handlePageUpdate"
    />
  </div>
</template>
