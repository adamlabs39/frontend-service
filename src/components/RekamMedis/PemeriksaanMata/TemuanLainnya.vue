<script setup lang="ts">
import { computed, onMounted, ref, watch, type PropType } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import HistoriTemuanLainnya from "@/components/RekamMedis/PemeriksaanMata/HistoriTemuanLainnya.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  type: {
    type: String,
    required: true,
  },
  openedData: {
    type: Object as PropType<any>,
    default: null,
  },
});

const temuanLainnya = ref();
const compareDialog = ref(false);
const showDialogCompare = () => {
  compareDialog.value = true;
};

const saveData = () => {
  return {
    temuanLainnya: temuanLainnya.value,
  };
};

const setFormData = () => {
  if (props.openedData) {
    temuanLainnya.value = props.openedData.temuanLainnya;
  } else temuanLainnya.value = undefined;
};

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

onMounted(() => {
  setFormData();
});

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
  saveData,
  props,
});
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
          v-model="temuanLainnya"
          label="Temuan Lainnya"
          placeholder="Masukkan Temuan Lainnya..."
        />
        <CustomInfoRow v-else label="Temuan Lainnya" :value="temuanLainnya" />
      </div>

      <!-- Dialog compare -->
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Antropometri</template>
        <template #body>
          <div class="pt-5 grid grid-cols-[1fr_min-content_1fr] overflow-auto">
            <div class="flex flex-col overflow-auto">
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
              <div
                class="grid grid-cols-[1fr_min-content_1fr] grow overflow-auto"
              >
                <HistoriTemuanLainnya />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriTemuanLainnya />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <CustomTextArea
                  label="Temuan Lainnya"
                  placeholder="Masukkan Temuan Lainnya..."
                />
              </div>
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
