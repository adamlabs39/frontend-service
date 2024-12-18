<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriAntropometri from "@/components/RekamMedis/Antropometri/HistoriAntropometri.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
  rmUuid: {
    type: String,
    default: "",
  },
  sessionUuid: {
    type: String,
    default: "",
  },
});
const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit"]);

const schema = toTypedSchema(
  yup.object({
    beratBadan: yup.number(),
    tinggiBadan: yup.number(),
    IMT: yup.number(),
    catatan: yup.string(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});
const [beratBadan] = defineField("beratBadan");
const [tinggiBadan] = defineField("tinggiBadan");
const [IMT] = defineField("IMT");
const [catatan] = defineField("catatan");
const [petugas] = defineField("petugas");

onBeforeMount(async () => {
  setValues({
    beratBadan: 43,
    tinggiBadan: 155,
    IMT: 0,
    catatan: "Normal",
    petugas: "Adam",
  });
  calculateIMT();
});

const calculateIMT = () => {
  if (beratBadan.value && tinggiBadan.value) {
    IMT.value = Number(
      (beratBadan.value / (tinggiBadan.value / 100) ** 2).toFixed(2)
    );
  } else {
    IMT.value = 0;
  }
};

const onSubmit = handleSubmit(async (values: any) => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertAssesment({
      sessionUuid: props.sessionUuid,
      rekamMedisUuid: props.rmUuid,
      // NOTE Apa ini
      isLatest: true,
      key: "antropometri",
      data: values,
    });
    if (response && response.payload) {
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const toggleEdit = () => {
  isEditing.value = true;
  emit("edit");
};

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
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header>Antropometri</template>
    <template #content>
      <div v-if="isEditing" class="flex flex-col">
        <CustomButton
          @click="showDialogCompare"
          class="!rounded-md my-[10px] ml-auto"
          label="Mode Compare"
          size="small"
          icon="LayoutIcon"
        />
        <hr class="mb-[30px]" />
      </div>
      <div v-if="isEditing" class="flex gap-[30px] pt-5">
        <CustomInputNumber
          v-model="beratBadan"
          label="Berat Badan"
          @update:model-value="calculateIMT"
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Kg</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber
          v-model="tinggiBadan"
          label="Tinggi Badan"
          @update:model-value="calculateIMT"
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Cm</div>
          </template>
        </CustomInputNumber>
        <CustomInputNumber
          v-model="IMT"
          label="IMT"
          placeholder="0"
          class=""
          readOnly
        >
          <template #appendText>
            <div class="flex items-center justify-center mr-2.5">Kg/m²</div>
          </template>
        </CustomInputNumber>
        <CustomTextArea
          v-model="catatan"
          class="grow"
          label="Catatan"
          placeholder="Catatan"
          height="h-10"
        />
      </div>
      <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="Berat Badan">
          <template #value>
            <div>{{ beratBadan }} Kg</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Tinggi Badan">
          <template #value>
            <div>{{ tinggiBadan }} Cm</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="IMT">
          <template #value>
            <div>{{ IMT }} Kg/m²</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Catatan" :value="catatan" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
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
                <HistoriAntropometri />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriAntropometri />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <div class="grid grid-cols-3 gap-5">
                  <CustomInputNumber
                    v-model="beratBadan"
                    label="Berat Badan"
                    @update:model-value="calculateIMT"
                  >
                    <template #appendText>
                      <div class="flex items-center justify-center mr-2.5">
                        Kg
                      </div>
                    </template>
                  </CustomInputNumber>
                  <CustomInputNumber
                    v-model="tinggiBadan"
                    label="Tinggi Badan"
                    @update:model-value="calculateIMT"
                  >
                    <template #appendText>
                      <div class="flex items-center justify-center mr-2.5">
                        Cm
                      </div>
                    </template>
                  </CustomInputNumber>
                  <CustomInputNumber
                    v-model="IMT"
                    label="IMT"
                    placeholder="0"
                    class=""
                    readOnly
                  >
                    <template #appendText>
                      <div class="flex items-center justify-center mr-2.5">
                        Kg/m²
                      </div>
                    </template>
                  </CustomInputNumber>
                </div>
                <CustomTextArea
                  v-model="catatan"
                  class="grow"
                  label="Catatan"
                  placeholder="Catatan"
                  height="h-10"
                />
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="isEditing"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit" />
            <CustomButton v-if="!isEditing" label="Edit" @click="toggleEdit" />
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="isEditing"
          @click="resetForm"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="isEditing" label="Simpan" @click="onSubmit" />
        <CustomButton v-else label="Edit" @click="toggleEdit" />
      </div>
    </template>
  </CustomAccordion>
</template>
