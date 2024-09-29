<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { computed, ref } from "vue";
import sangatRingan from "@/assets/images/RekamMedis/AsesmenNyeri/1sangatRingan.svg";
import agakRingan from "@/assets/images/RekamMedis/AsesmenNyeri/2agakRingan.svg";
import lumayanRingan from "@/assets/images/RekamMedis/AsesmenNyeri/3lumayanRingan.svg";
import sedang from "@/assets/images/RekamMedis/AsesmenNyeri/4sedang.svg";
import sedangg from "@/assets/images/RekamMedis/AsesmenNyeri/5sedangg.svg";
import sedanggg from "@/assets/images/RekamMedis/AsesmenNyeri/6sedanggg.svg";
import berat from "@/assets/images/RekamMedis/AsesmenNyeri/7berat.svg";
import beratt from "@/assets/images/RekamMedis/AsesmenNyeri/8beratt.svg";
import berattt from "@/assets/images/RekamMedis/AsesmenNyeri/9berattt.svg";
import beratttt from "@/assets/images/RekamMedis/AsesmenNyeri/10beratttt.svg";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { onBeforeMount } from "vue";
import Scaler from "@/components/RekamMedis/AsesmenNyeri/Scaler.vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const emit = defineEmits(["edit"]);
const currentMethod = ref(props.method);

const handleImageClick = (id: number) => {
  skalaNyeri.value = id;
};

const schemaAsesmenNyeri = computed(() =>
  toTypedSchema(
    yup.object({
      skalaNyeri: yup.number(),
      catatan: yup.string(),
      petugas: yup.string().required("Petugas is Required"),
    })
  )
);

const {
  handleSubmit: handleSubmitAsesmenNyeri,
  defineField: defineFieldAsesmenNyeri,
  setValues,
} = useForm({
  validationSchema: schemaAsesmenNyeri,
});

const [skalaNyeri] = defineFieldAsesmenNyeri("skalaNyeri");
const [catatan] = defineFieldAsesmenNyeri("catatan");
const [petugas] = defineFieldAsesmenNyeri("petugas");

const onSubmitAsesmenNyeri = handleSubmitAsesmenNyeri((values: any) => {
  currentMethod.value = "detail";
  emit("edit");
});

const onEditClick = () => {
  currentMethod.value = "form";
};

const imagePengkajianNyeri = ref([
  { id: 1, value: sangatRingan },
  { id: 2, value: agakRingan },
  { id: 3, value: lumayanRingan },
  { id: 4, value: sedang },
  { id: 5, value: sedangg },
  { id: 6, value: sedanggg },
  { id: 7, value: berat },
  { id: 8, value: beratt },
  { id: 9, value: berattt },
  { id: 10, value: beratttt },
]);

// const selectedImage = computed(() => {
//   return imagePengkajianNyeri.value.find(
//     (image) => image.id === skalaNyeri.value
//   )?.id;
// });
const getStringSkalaNyeri = () => {
  if (skalaNyeri.value! >= 1 && skalaNyeri.value! <= 3) {
    return `${skalaNyeri.value} (Ringan)`;
  } else if (skalaNyeri.value! >= 4 && skalaNyeri.value! <= 6) {
    return `${skalaNyeri.value} (Sedang)`;
  } else if (skalaNyeri.value! >= 7 && skalaNyeri.value! <= 10) {
    return `${skalaNyeri.value} (Berat)`;
  }
};

onBeforeMount(async () => {
  setValues({ petugas: "Adam" });
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
});
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50" ref="accordion">
    <template #header> Asesmen Nyeri</template>
    <template #content>
      <div
        v-if="currentMethod == 'form'"
        class="grid grid-cols-2 py-5 gap-[30px] gap-y-5"
      >
        <div class="flex flex-col">
          <div class="font-semibold text-normal">Pilih Pengkajian Nyeri</div>
          <div
            class="grid grid-cols-10 gap-1.5 py-3 justify-items-between gap-y-4"
          >
            <div
              v-for="(image, index) in imagePengkajianNyeri"
              :key="image.id"
              :class="[
                'w-16 p-1 flex items-center justify-center cursor-pointer bg-[#E4E7EC] rounded-lg',
                { 'border-4 border-adameds-300': image.id === skalaNyeri },
              ]"
              @click="handleImageClick(image.id)"
            >
              <img
                :src="image.value"
                :alt="'Image ' + image.id"
                class="w-full h-auto"
              />
            </div>
          </div>
          <Scaler />
          <div
            class="grid grid-cols-3 text-center border-y-2 border-[#D9DCE1] mt-2.5 p-2"
          >
            <div class="font-semibold text-normal">
              1-3 = <span class="text-success-300">Ringan</span>
            </div>
            <div class="font-semibold text-normal">
              4-6 = <span class="text-warning-300">Sedang</span>
            </div>
            <div class="font-semibold text-normal">
              7-10 = <span class="text-danger-300">Berat</span>
            </div>
          </div>
        </div>
        <div class="">
          <CustomTextfield
            label="Catatan"
            placeholder="Masukkan Catatan"
            v-model:modelValue="catatan"
          />
        </div>
      </div>
      <div
        v-if="currentMethod == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow label="Pengkajian Nyeri" :value="getStringSkalaNyeri()" />
        <CustomInfoRow label="Catatan" :value="catatan" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" :value="petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="currentMethod == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton
          v-if="currentMethod == 'form'"
          label="Simpan"
          @click="onSubmitAsesmenNyeri"
        />
        <CustomButton
          v-if="currentMethod == 'detail'"
          label="Edit"
          @click="onEditClick"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
