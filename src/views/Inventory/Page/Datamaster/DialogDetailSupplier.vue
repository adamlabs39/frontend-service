<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
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

const tes = () => {
  console.log("tes");
};
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header>{{ title }}</template>
    <template #body>
      <!-- {{ detailData }} -->
      <div class="flex flex-col gap-4 py-2.5">
        <CustomInfoRow label="Kode Supplier" :value="detailData?.code" />
        <CustomInfoRow label="Nama Supplier" :value="detailData?.name" />
        <CustomInfoRow label="Provinsi" :value="detailData?.provinsiCode" />
        <CustomInfoRow label="Kabupaten" :value="detailData?.kabupatenCode" />
        <CustomInfoRow label="Kecamatan" :value="detailData?.kecamatanCode" />
        <CustomInfoRow label="Alamat" :value="detailData?.alamat" />
        <CustomInfoRow label="No. Telepon" :value="detailData?.noTlp" />
           <CustomInfoRow label="Status">
          <template #value>
            <CustomChip
              :label="detailData?.status ? 'AKTIF' : 'NON-AKTIF'"
              :textColor="detailData?.status? 'text-white' : 'text-[#80868d]'"
              :bgColor="detailData?.status? 'bg-adameds-300' : 'bg-white'"
              :borderColor="detailData?.status? 'border-none' : 'border-[#80868d]'"
              :icon-color="detailData?.status? 'white' : '#80868d'"
              customClass="text-xs font-semibold h-5 flex w-fit"
            />
          </template>
        </CustomInfoRow>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton label="Edit" @click="tes"/>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
