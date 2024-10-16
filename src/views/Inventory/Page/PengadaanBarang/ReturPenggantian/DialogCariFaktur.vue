<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";
import { onMounted } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
});

const alasan = ref("");

const emit = defineEmits(["update:isDialogVisible", "close", "reject"]);

const updateVisibility = (value: any) => {
  emit("update:isDialogVisible", value);
};

const closeDialog = () => {
  emit("update:isDialogVisible", false);
};

const onSubmit = () => {
  // console.log(alasan.value);
  emit("reject", alasan.value);
  alasan.value = "";
  closeDialog();
};
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>Faktur Penerimaan </template>
    <template #body>
      <div class="pt-5">
        <div class="flex items-center">
          <div class="flex flex-col justify-center">
            <div class="font-semibold underline text-SM">Lokasi Gudang</div>
            <div class="font-normal text-normal">Gudang Farmasi</div>
          </div>
          <hr class="mt-1 mx-12 min-h-16 border-[1px] border-adameds-300" />
          <div class="flex items-end gap-5">
            <CustomTextfield
              label="Cari No. Faktur"
              placeholder="Cari Berdasarkan No. Faktur"
              class="w-[350px]"
            />
            <CustomDatePicker label="Tgl. Faktur" />
            <div class="flex gap-2.5">
              <CustomButton class="my-auto bg-danger-300" label="Cari" />
              <CustomButton label="Reset" class="my-auto bg-adameds-300" />
            </div>
          </div>
        </div>
        looko
        <!-- <div>   </div> UNTUK TABEL -->
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <Paginator
          :rows="10"
          :totalRecords="120"
          :rowsPerPageOptions="[10, 20, 30]"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{currentPage}"
        >
          <template #start="slotProps">Total Data: 0</template>
        </Paginator>
      </div>
    </template>
  </CustomDialog>
</template>
