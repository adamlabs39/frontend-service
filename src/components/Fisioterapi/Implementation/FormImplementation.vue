<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import { ref } from "vue";
import HistoriImplementation from "@/components/Fisioterapi/Implementation/HistoriImplementation.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const implementation = ref();

const emit = defineEmits(["edit"]);

const compareDialog = ref(false);
const showDialogCompare = () => {
  compareDialog.value = true;
};

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Implementation</template>
    <template #content>
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
      <div v-if="props.method == 'form'" class="gap-[30px] py-3">
        <CustomTextArea
          v-model="implementation"
          label="Implementasi"
          placeholder="Ketik Implementasi ..."
        />
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Implementasi" value="Nama Implementasi" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>

      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Implementation</template>
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
                <HistoriImplementation />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriImplementation />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <CustomTextArea
                v-model="implementation"
                label="Implementasi"
                placeholder="Ketik Implementasi ..."
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
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-adameds-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-adameds-300"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton
          v-if="props.method == 'detail'"
          @click="emit('edit')"
          label="Edit"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
