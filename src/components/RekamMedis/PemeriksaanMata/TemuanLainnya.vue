<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import HistoriTemuanLainnya from "@/components/RekamMedis/PemeriksaanMata/HistoriTemuanLainnya.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const compareDialog = ref(false);
const showDialogCompare = () => {
  compareDialog.value = true;
};
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Temuan Lainnya</template>
    <template #content>
      <div class="pt-5">
        <div v-if="method == 'form'" class="flex flex-col">
          <CustomButton
            @click="showDialogCompare"
            class="!rounded-md my-[10px] ml-auto"
            label="Mode Compare"
            size="small"
            icon="LayoutIcon"
          />
          <hr class="mb-[30px]" />
        </div>
        <CustomTextArea
          v-if="method == 'form'"
          label="Temuan Lainnya"
          placeholder="Masukkan Temuan Lainnya..."
        />
        <CustomInfoRow v-else label="Temuan Lainnya" value="-" />
      </div>

      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Antropometri</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr]">
            <div>
              <div class="mb-[18px] flex justify-between">
                <div class="font-semibold text-grey-400">
                  Riwayat Sebelumnya
                </div>
                <div class="flex">
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md mr-[10px]"
                    size="small"
                    icon="PhCaretLeft"
                  />
                  <CustomButton
                    @click="() => {}"
                    class="!rounded-md"
                    size="small"
                    icon="PhCaretRight"
                  />
                </div>
              </div>
              <div class="grid grid-cols-[1fr_min-content_1fr]">
                <HistoriTemuanLainnya />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriTemuanLainnya />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <CustomTextArea
                label="Temuan Lainnya"
                placeholder="Masukkan Temuan Lainnya..."
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="method == 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="method == 'form'"
              label="Simpan"
              @click="() => {}"
            />
            <CustomButton
              v-if="method == 'detail'"
              label="Edit"
              @click="() => {}"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
  </CustomAccordion>
</template>
