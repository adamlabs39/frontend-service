<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const props = defineProps({
  rows: {
    type: Number,
    required: true,
  },
  totalRecords: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["page", "export", "import"]);

const handlePage = (event: any) => {
  emit("page", event);
};
</script>
<template>
  <div class="flex justify-between py-2.5">
    <div class="flex items-center gap-2.5">
      <!-- <CustomButton label="Import" @click="emit('import')">
        <img src="@/assets/icons/File Import.svg" alt="" />Import
      </CustomButton> -->
      <FileUpload
        mode="basic"
         accept=".xls,.xlsx"
        :maxFileSize="1000000"
        label="Import"
        chooseLabel="Import"
        auto
        class="bg-adameds-300 rounded-[10px] font-black text-normal h-10 text-white border-adameds-300"
      >
        <template #uploadicon>
          <FileImportIcon />
        </template>
      </FileUpload>

      <CustomButton
        label="Eksport"
        @click="emit('export')"
        icon="FileImportIcon"
      />
    </div>
    <CustomPaginator
      :rows="rows"
      :totalRecords="totalRecords"
      @page="handlePage"
    />
  </div>
</template>
<style  scoped>
span{}
</style>
