<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import { ref, type PropType } from "vue";
import DialogAdjustItem from "./DialogAdjustItem.vue";
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },

  detailData: {
    type: Object as PropType<Record<string, any> | null>, // allow null
    default: null,
  },
});

const itemAdjustmentData = ref(null);
const emit = defineEmits(["update:isDialogVisible"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const dialogAdjustItem = ref({
  isVisible: false,
  title: "",
});

function handleAdjustItem(values: any) {
  //   console.log(values.data);

  dialogAdjustItem.value.isVisible = true;
  dialogAdjustItem.value.title = "Adjust Item";
  itemAdjustmentData.value = values;
}
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header>{{ detailData?.namaItem }} </template>
    <template #body>
      <!-- {{ detailData }} -->
      <div class="py-5">
        <DataTable
          v-if="detailData"
          :value="detailData.subData"
          tableStyle="min-width: 50rem"
          scrollable
          scrollHeight="240px"
          :pt="{ headerRow: 'text-SM' }"
        >
          <Column field="tanggal" headerClass="bg-adameds-50" class="w-[40px]">
            <template #header>
              <div class="font-semibold">No</div>
            </template>
            <template #body="slotProps">
              <div>
                <div class="text-SM">{{ slotProps.index + 1 }}</div>
              </div>
            </template>
          </Column>
          <Column field="noPembelian" headerClass="bg-adameds-50">
            <template #header>
              <div class="font-semibold">Nama Item</div>
            </template>
            <template #body="slotProps">
              <div>
                <div class="text-SM">{{ slotProps.data.namaItem }}</div>
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.kategoriItem"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.jenisStok"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.jenisItem"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
                <CustomChip
                  :showCheckedIcon="false"
                  :label="slotProps.data.jenisObat"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  customClass="h-5 pr-[6px] border-none mr-[5px]"
                />
              </div>
            </template>
          </Column>

          <Column field="minStok" headerClass="bg-adameds-50" class="w-[160px]">
            <template #header>
              <div class="w-full font-semibold text-center">Exp Date</div>
            </template>
            <template #body="slotProps">
              <CustomDatePicker label="" v-model="slotProps.data.expDate" />
            </template>
          </Column>
          <Column field="maxStok" headerClass="bg-adameds-50" class="w-[160px]">
            <template #header>
              <div class="w-full font-semibold text-center">Stok</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                label=""
                v-model:modelValue="slotProps.data.stok"
              >
                <template #appendText>
                  <div class="flex items-center justify-center px-2">
                    Tablet
                  </div>
                </template>
              </CustomInputNumber>
            </template>
          </Column>

          <Column field="action" headerClass="bg-adameds-50" class="w-[75px]">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton
                  label="Adjust"
                  class="my-auto bg-adameds-300"
                  size="small"
                  @click="handleAdjustItem(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <DialogAdjustItem  v-model:is-dialog-visible="dialogAdjustItem.isVisible"
        :title="dialogAdjustItem.title"
        :detailData="itemAdjustmentData"/>
      </div>
    </template>
    <template #footer>
      <div class="w-full font-semibold text-normal">
        Total Stok : 1000 Tablet
      </div>
    </template>
  </CustomDialog>
</template>
