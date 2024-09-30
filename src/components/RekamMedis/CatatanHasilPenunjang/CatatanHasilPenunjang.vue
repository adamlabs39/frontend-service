<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomCkEditor from "@/components/Base/CustomCkEditor.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriCatatanHasilPenunjang from "@/components/RekamMedis/CatatanHasilPenunjang/HistoriCatatanHasilPenunjang.vue";
const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit"]);

const schema = toTypedSchema(
  yup.object({
    catatan: yup.string(),
    petugas: yup.string().required(),
  })
);
const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [catatan] = defineField("catatan");
const [petugas] = defineField("petugas");

onBeforeMount(async () => {
  setValues({
    catatan: "Tidak Ada",
    petugas: "Adam",
  });
});

const onSubmit = handleSubmit((values: any) => {
  console.log("Adding new data:", values);
  emit("submit", values);
  isEditing.value = false;
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
    <template #header>Catatan Hasil Penunjang</template>
    <template #content>
      <div class="pt-5">
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
        <CustomCkEditor
          v-if="isEditing"
          label="Catatan Hasil Penunjang"
          v-model="catatan"
        />
        <div v-if="!isEditing" class="py-5 flex flex-col gap-[19px]">
          <CustomInfoRow label="Catatan Hasil Penunjang" :value="catatan" />
          <hr class="border-grey-200" />
          <CustomInfoRow label="Petugas Input" :value="petugas" />
        </div>
      </div>
      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Catatan Hasil Penunjang</template>
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
                <HistoriCatatanHasilPenunjang />
                <div class="border border-adameds-300 mx-[15px]"></div>
                <HistoriCatatanHasilPenunjang />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <CustomCkEditor
                v-if="isEditing"
                label="Catatan Hasil Penunjang"
                v-model="catatan"
              />
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
        <CustomButton v-if="!isEditing" label="Edit" @click="toggleEdit" />
      </div>
    </template>
  </CustomAccordion>
</template>
