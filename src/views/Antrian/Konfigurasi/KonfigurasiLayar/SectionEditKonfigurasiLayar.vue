<script lang="ts" setup>
import { ref, computed, onMounted, watch, shallowRef } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
// import CustomUpload from "@/components/Base/CustomUpload.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import Layout3x2Panggilan from "./PreviewLayar/Layout3x2Panggilan.vue";
import Layout3x3Panggilan from "./PreviewLayar/Layout3x3Panggilan.vue";
import LayoutList3Panggilan3 from "./PreviewLayar/LayoutList3Panggilan3.vue";
import Layout2List2Panggilan from "./PreviewLayar/Layout2List2Panggilan.vue";
import Layout1List1Panggilan from "./PreviewLayar/Layout1List1Panggilan.vue";
import { utilsStore } from "@/stores/utils";
import { useJadwalDokterStore } from "@/stores/antrian/jadwalDokter";
import { useConfigLayarAntrianStore } from "@/stores/antrian/configLayarAntrian";
import { useToast } from "primevue/usetoast";
import Chips from "primevue/chips";
import { Vue3Marquee } from "vue3-marquee";

const toast = useToast();

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
  payload: {
    type: Object,
    default: () => {},
  },
});

const configLayarStore = useConfigLayarAntrianStore();
const jadwalDokterStore = useJadwalDokterStore();
const useUtilsStore = utilsStore();

const jadwalPoliPayload = ref<any[]>([]);
const jadwalPoliProperties = ref({
  name: "",
});

const fetchGetPoli = async () => {
  useUtilsStore.setLoading(true);
  try {
    const response = await jadwalDokterStore.getApiPoli(
      jadwalPoliProperties.value.name
    );
    console.log("Hasil get response:", response);
    if (response && response.payload) {
      jadwalPoliPayload.value = response.payload;
    }
  } catch (error) {
    console.log("Error:", error);
    jadwalPoliPayload.value = [];
  } finally {
    useUtilsStore.setLoading(false);
  }
};

const itemsLayar = ref([
  { name: "Layar 3 x 3 Panggilan", code: 1 },
  { name: "Layar 3 x 2 Panggilan", code: 2 },
  { name: "Layar 3 List & 3 Panggilan", code: 3 },
  { name: "Layar 2 List & 2 Panggilan", code: 4 },
  { name: "Layar 1 List, 1 Panggilan, 1 Gambar", code: 5 },
]);

const schema = toTypedSchema(
  yup.object({
    namaLayar: yup.string().required("Nama layar harus diisi"),
    tipeLayar: yup.number().required("Tipe layar harus diisi"),
    judul: yup.string().required("Judul harus diisi"),
    isAdmisi: yup.boolean(),
    isPoli: yup.boolean(),
    isFarmasi: yup.boolean(),
    flashText: yup
      .array()
      .of(yup.string())
      .default(["Selamat Datang di Klinik Adameds"]),
    media: yup
      .string()
      .matches(
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
        "URL harus dari YouTube"
      )
      .nullable(),
    aktif: yup.boolean(),
    poli_uuids: yup.array().of(yup.string()),
  })
);

const { errors, handleSubmit, defineField, resetForm, values, setValues } =
  useForm({
    validationSchema: schema,
  });

const [namaLayar] = defineField("namaLayar");
const [tipeLayar] = defineField("tipeLayar");
const [judul] = defineField("judul");
const [isAdmisi] = defineField("isAdmisi");
const [isPoli] = defineField("isPoli");
const [isFarmasi] = defineField("isFarmasi");
const [flashText] = defineField("flashText");
const [media] = defineField("media");
const [aktif] = defineField("aktif");
const [poli_uuids] = defineField("poli_uuids");

const generateForm = () => schema.cast({});

const form = shallowRef(generateForm());

const emit = defineEmits(["update:isDialogVisible", "close", "refresh"]);

const onSubmit = handleSubmit(async (values: any) => {
  const payload = {
    nama_layar: values.namaLayar,
    tipe_layar: values.tipeLayar,
    judul: values.judul,
    is_admisi: values.is_admisi,
    is_poli: values.isPoli,
    is_farmasi: values.is_farmasi,
    flash_text: values.flashText,
    aktif: values.aktif,
    poli_uuids: values.poli_uuids ?? [],
  };
  console.log("Payload yang dikirim:", payload);
  if (values.media && values.media.trim() !== "") {
    payload.media = values.media;
  }

  try {
    const uuid = props.payload.uuid;

    await configLayarStore.updateLayarAntrian(uuid, payload);
    toast.add({
      severity: "success",
      summary: "Data berhasil disimpan",
      life: 3000,
    });
    emit("refresh");

    closeDialog();
  } catch (error) {
    console.error(error);
  }
});

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}

const layarTitle = computed(() => {
  const selectedLayar = itemsLayar.value.find(
    (item) => item.code === tipeLayar.value // Perbaikan: gunakan tipeLayar bukan namaLayar
  );
  return selectedLayar ? selectedLayar.name : "Layar Antrian";
});

const isLayarSelected = computed(() => !!tipeLayar.value);

const isListAndCallLayout = computed(() => {
  return namaLayar.value === "L-3"; // Layar 3 List & 3 Panggilan
});

const onReset = () => {
  resetForm();
};

onMounted(() => {
  fetchGetPoli();
});

watch(
  () => props.payload,
  (newData) => {
    console.log("Data dari layar page:", newData);
    if (newData) {
      setValues({
        namaLayar: newData.namaLayar || "",
        tipeLayar: newData.tipeLayar || null,
        judul: newData.judul || "",
        isAdmisi: newData.isAdmisi ?? true,
        isPoli: newData.isPoli ?? false,
        isFarmasi: newData.isFarmasi ?? true,
        flashText: Array.isArray(newData.flashText)
          ? newData.flashText
          : ["Selamat Datang di Klinik Adameds"],
        media: newData.media || "",
        aktif: newData.status ?? false,
        poli_uuids: Array.isArray(newData.lokasi)
          ? newData.lokasi.map((l: any) => l.uuid)
          : [],
      });
      // --- pastikan opsi poli tersedia agar label tidak Unknown
      if (Array.isArray(newData.lokasi)) {
        const existing = new Set(jadwalPoliPayload.value.map((p) => p.uuid));
        const tambahan = newData.lokasi.filter(
          (l: any) => !existing.has(l.uuid)
        );
        if (tambahan.length) {
          jadwalPoliPayload.value = [...jadwalPoliPayload.value, ...tambahan];
        }
      }
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <CustomDialog
    width="1000px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <template #header>{{ title }} Layar Antrian</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5 w-full">
          <CustomTextfield
            label="Nama Layar"
            placeholder="Nama Layar"
            v-model="namaLayar"
            optionValue="code"
            optionLabel="name"
            class="mr-5 w-1/2 text-black"
            :invalid="!!errors.namaLayar"
            :invalid-message="errors.namaLayar"
          />
          <CustomSelect
            label="Tipe Layar"
            place-holder="Pilih Tipe Layar"
            v-model="tipeLayar"
            :options="itemsLayar"
            optionValue="code"
            optionLabel="name"
            class="w-1/2 text-black"
            :invalid="!!errors.tipeLayar"
            :invalid-message="errors.tipeLayar"
          />
        </div>

        <!-- Conditional rendering based on layarModel -->
        <div class="flex gap-x-4 gap-y-6 min-h-0">
          <div
            class="w-1/2 min-w-[420px] max-w-[520px] flex-shrink-0"
            v-show="isLayarSelected"
          >
            <div class="text-xl font-bold text-black">
              {{ layarTitle }}
            </div>
            <hr class="mt-4" />
            <CustomTextfield
              label="Teks Judul"
              v-model="judul"
              placeholder="Teks Judul"
              optionValue="code"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black"
              :invalid="!!errors.judul"
              :invalid-message="errors.judul"
            />
            <CustomSwitch
              v-model="isAdmisi"
              label="Admisi"
              sideLabel="Non-Aktif"
              sideLabelTrue="Aktif"
            />
            <div class="flex gap-2.5 items-end mt-4 text-black">
              <CustomSwitch
                v-model="isPoli"
                label="Poli"
                sideLabel="Non-Aktif"
                sideLabelTrue="Aktif"
              />
            </div>
            <CustomMultiSelect
              label="Pilih Poli"
              placeholder="Pilih Poli"
              v-model="poli_uuids"
              :options="jadwalPoliPayload"
              optionValue="uuid"
              optionLabel="name"
              class="mt-4 mr-5 w-full text-black multiselect-wrap"
              v-show="isPoli"
            />
            <CustomSwitch
              v-model="isFarmasi"
              label="Farmasi"
              sideLabel="Non-Aktif"
              sideLabelTrue="Aktif"
            />
            <CustomTextfield
              label="Youtube"
              v-model="media"
              placeholder="URL Youtube"
              class="mt-4 mr-5 w-full text-black"
              v-show="tipeLayar === 5"
              :invalid="!!errors.media"
              :invalid-message="errors.media"
            />
            <div>
              <div class="mt-4 block font-semibold mb-[5px] text-normal">
                Flash Text
              </div>
              <Chips v-model="flashText" class="w-full" />
              <p v-if="errors.flashText" class="mt-1 text-xs text-red-500">
                {{ errors.flashText }}
              </p>
            </div>
          </div>
          <div
            class="flex flex-col flex-1 w-full min-w-0"
            v-show="isLayarSelected"
          >
            <div class="text-xl font-bold text-black">Preview Layar</div>
            <hr class="mt-4" />
            <div
              class="mt-4 w-full flex-1 flex flex-col bg-adameds-75 overflow-hidden rounded-[10px] px-1 pt-1"
            >
              <!-- Navbar Preview Layar -->
              <div
                class="flex gap-4 items-center font-semibold text-white rounded-lg bg-adameds-300 text-subHeading"
              >
                <!-- Logo -->
                <div
                  class="flex bg-white w-[180px] justify-center items-center gap-1 rounded-lg"
                >
                  <img
                    loading="lazy"
                    src="../../../../assets/images/adameds-logo.png"
                    class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[50px] h-[50px]"
                  />
                  <div
                    class="bg-adameds-300 w-[3px] h-[50px] my-auto rounded-md"
                  ></div>
                  <img
                    loading="lazy"
                    src="../../../../assets/images/adameds.png"
                    class="self-stretch object-cover w-[106px] my-auto shrink-0"
                  />
                </div>
                <!-- Komponen di sebelah Logo -->
                <div class="">Klinik Adameds</div>
                <div class="mr-3 ml-auto font-semibold text-right">
                  <div class="text-subHeading">09:00 AM</div>
                  <div class="text-XS">Senin, 01 Jan 2024</div>
                </div>
              </div>
              <!-- Blok Konten -->
              <div class="flex-1 min-h-[500px] px-1" id="wrapper-antrian">
                <template v-if="tipeLayar === 1">
                  <layout-3x3-panggilan />
                </template>
                <template v-else-if="tipeLayar === 2">
                  <layout-3x2-panggilan />
                </template>
                <template v-else-if="tipeLayar === 3">
                  <layout-list-3-panggilan-3 />
                </template>
                <template v-else-if="tipeLayar === 4">
                  <layout-2-list-2-panggilan />
                </template>
                <template v-else-if="tipeLayar === 5">
                  <layout-1-list-1-panggilan />
                </template>
              </div>
              <div
                class="mt-1 text-white rounded-tl-lg rounded-tr-lg bg-adameds-300"
              >
                <Vue3Marquee>
                  <span v-for="item in flashText" :key="item" class="mx-2">{{
                    item
                  }}</span>
                </Vue3Marquee>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <CustomSwitch
          class="text-black"
          v-model="aktif"
          label="Status"
          sideLabel="Non-Aktif"
          sideLabelTrue="Aktif"
        />
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <div class="flex gap-2.5 justify-end mt-5">
          <CustomButton
            label="Reset"
            border-color="border-grey-200"
            background-color="bg-white"
            text-color="text-grey-300"
            @click="onReset"
          >
          </CustomButton>
          <CustomButton label="Simpan" @click="onSubmit"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>

<style scoped>
.multiselect-wrap :deep(.p-multiselect-label-container) {
  @apply flex-wrap content-start min-h-10 h-auto px-2 py-1;
}

.multiselect-wrap :deep(.p-multiselect-chip) {
  @apply mb-1 mr-1;
}

.multiselect-wrap :deep(.p-multiselect) {
  @apply h-auto min-h-10;
}

.multiselect-wrap :deep(.p-multiselect .p-multiselect-label) {
  @apply flex flex-wrap items-start py-1 min-h-6 h-auto;
}

.multiselect-wrap :deep(.p-multiselect-token) {
  @apply mb-1 mr-1;
}
</style>
