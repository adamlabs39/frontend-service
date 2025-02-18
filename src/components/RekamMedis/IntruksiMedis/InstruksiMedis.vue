<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import GeneralIcon from "@/assets/icons/Avatar/general.svg";
import HistoriInstruksiMedis from "@/components/RekamMedis/IntruksiMedis/HistoriInstruksiMedis.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import { utilsStore } from "@/stores/utils";
import { useRekamMedisStore } from "@/stores/rekamMedis/rekamMedis";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { epochToDate } from "@/utils/Helpers";

// NOTE Store
const storeUtils = utilsStore();
const rekamMedisStore = useRekamMedisStore();
const praktisiStore = usePraktisiStore();

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

// Variabel lokal untuk mengatur apakah sedang dalam mode editing atau tidak
const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit", "editAsesmen"]);

const messages = ref<any>([]);

// Schema for validation
const schema = yup.object({
  instruksi: yup.string().required("Instruksi Medis tidak boleh kosong"),
  dokter: yup.mixed<any>().required("Dokter harus dipilih"),
});

// Use form with validation schema
const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
});

const [instruksi] = defineField("instruksi");
const [dokter] = defineField("dokter");

const onSubmitInstruksiMedis = handleSubmit(async (values: any) => {
  try {
    storeUtils.setLoading(true);
    const response = await rekamMedisStore.insertInstruksi({
      sessionUuid: props.sessionUuid,
      message: values.instruksi,
      dokterName: values.dokter.pegawai.name,
    });
    if (response && response.payload) {
      rekamMedisStore.setAsesmentRekamMedisData(response.payload);
      resetForm();
      const responseInstruksi = await rekamMedisStore.getInstruksi(
        props.sessionUuid
      );
      if (responseInstruksi && responseInstruksi.payload) {
        messages.value = responseInstruksi.payload;
      }
    }
  } catch (error) {
    console.error("Failed to post data", error);
  } finally {
    storeUtils.setLoading(false);
  }
});

const listDpjp = ref<any[]>([]);
const fetchPraktisi = async () => {
  // FIXME Masih menggunakan api biasa dan filter by FE
  const responseDpjp = await praktisiStore.getApi({
    limit: 9999,
    non_doctor: false,
  });
  if (responseDpjp && responseDpjp.payload) {
    listDpjp.value = responseDpjp.payload.filter(
      (praktisi: any) => praktisi.isDoctor && praktisi.status
    );
  }
};

const setFormData = async () => {
  if (rekamMedisStore.openedRekamMedis.data.instruksiMedis) {
    const responseInstruksi = await rekamMedisStore.getInstruksi(
      props.sessionUuid
    );
    if (responseInstruksi && responseInstruksi.payload) {
      messages.value = responseInstruksi.payload;
    }
  } else resetForm();
};

onBeforeMount(() => {
  setFormData();
  fetchPraktisi();
});

// NOTE Untuk merefresh form yang sedang dibuka jika ada perubahan data
const storedRMData = computed(() => rekamMedisStore.openedRekamMedis);
watch(storedRMData, (newRM) => {
  setFormData();
});

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
    <template #header>Instruksi Medis</template>
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
      <div class="flex flex-col pt-5 gap-2.5">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{ 'justify-end': message.isMe }"
          class="flex items-start gap-2.5"
        >
          <img
            :src="GeneralIcon"
            alt="Avatar"
            :class="message.isMe ? 'order-2' : ''"
          />
          <div class="flex flex-col gap-2.5">
            <div class="flex w-full gap-5">
              <div class="font-semibold text-adameds-300 text-SM">
                {{ message.isMe ? 'Anda' : message.name }} ({{ message.dokterName }})
              </div>
              <div class="flex gap-2.5 font-medium text-SM text-grey-400">
                <div class="flex items-center gap-[2px]">
                  <PhCalendarDots :size="12" weight="fill" />
                  {{ epochToDate(message.time, "date") }}
                </div>
                <div class="flex items-center gap-[2px]">
                  <PhClock :size="12" weight="fill" />
                  {{ epochToDate(message.time, "time") }}
                </div>
              </div>
            </div>
            <div
              :class="
                message.isMe
                  ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                  : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]'
              "
              class="min-h-[45px] bg-adameds-50 flex items-center px-4 text-SM font-normal"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
        <hr class="border-grey-200 my-2.5" />
        <div v-if="isEditing" class="flex gap-[30px]">
          <CustomSelect
            label="Dokter Pemberi Instruksi"
            v-model="dokter"
            place-holder="Pilih Dokter Pemberi Instruksi"
            :options="listDpjp"
            option-label="pegawai.name"
            option-value=""
            :invalid="!!errors.dokter"
            :invalidMessage="errors.dokter"
          />
          <div class="flex flex-col grow gap-2.5">
            <CustomTextArea
              v-model="instruksi"
              label="Instruksi Medis"
              placeholder="Ketik Instruksi..."
              :invalid="!!errors.instruksi"
              :invalidMessage="errors.instruksi"
            />
            <CustomButton
              :full="true"
              class="w-full"
              @click="onSubmitInstruksiMedis"
            >
              <div class="flex items-center gap-2">
                <PhPaperPlaneTilt :size="20" weight="fill" />
                <div>Kirim Instruksi</div>
              </div>
            </CustomButton>
          </div>
        </div>

        <div v-else class="flex items-end justify-end gap-3">
          <CustomButton label="Edit" @click="emit('editAsesmen')" />
        </div>
      </div>

      <!-- Dialog compare -->
      <CustomDialog
        class=""
        v-model:visible="compareDialog"
        width="80%"
        noScroll
      >
        <template #header>Instruksi Medis</template>
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
              <div class="overflow-auto grow">
                <HistoriInstruksiMedis />
              </div>
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col overflow-hidden">
              <div class="flex flex-col pb-1 overflow-auto gap-y-5 grow">
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  :class="{ 'justify-end': message.isMe }"
                  class="flex items-start gap-2.5"
                >
                  <img
                    :src="GeneralIcon"
                    alt="Avatar"
                    :class="message.isMe ? 'order-2' : ''"
                  />
                  <div class="flex flex-col gap-2.5">
                    <div class="flex w-full gap-5">
                      <div class="font-semibold text-adameds-300 text-SM">
                        {{ message.role }}
                      </div>
                      <div
                        class="flex gap-2.5 font-medium text-SM text-grey-400"
                      >
                        <div class="flex items-center gap-[2px]">
                          <PhCalendarDots :size="12" weight="fill" />
                          {{ message.date }}
                        </div>
                        <div class="flex items-center gap-[2px]">
                          <PhClock :size="12" weight="fill" />
                          {{ message.time }}
                        </div>
                      </div>
                    </div>
                    <div
                      :class="
                        message.isMe
                          ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                          : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]'
                      "
                      class="min-h-[45px] bg-adameds-50 flex items-center px-4 text-SM font-normal"
                    >
                      {{ message.text }}
                    </div>
                  </div>
                </div>
                <hr class="border-grey-200 my-2.5" />
                <div v-if="isEditing" class="flex flex-col gap-[10px]">
                  <CustomSelect
                    label="Dokter Pemberi Instruksi"
                    v-model="dokter"
                    place-holder="Pilih Dokter Pemberi Instruksi"
                    :options="listDpjp"
                    option-label="pegawai.name"
                    option-value=""
                    :invalid="!!errors.dokter"
                    :invalidMessage="errors.dokter"
                  />
                  <div class="flex flex-col grow gap-2.5">
                    <CustomTextArea
                      v-model="instruksi"
                      label="Instruksi Medis"
                      placeholder="Ketik Instruksi..."
                      :invalid="!!errors.instruksi"
                      :invalidMessage="errors.instruksi"
                    />
                    <CustomButton
                      :full="true"
                      class="w-full"
                      @click="onSubmitInstruksiMedis"
                    >
                      <div class="flex items-center gap-2">
                        <PhPaperPlaneTilt :size="20" weight="fill" />
                        <div>Kirim Instruksi</div>
                      </div>
                    </CustomButton>
                  </div>
                </div>
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
            <CustomButton v-if="isEditing" label="Simpan" @click="() => {}" />
            <CustomButton
              v-if="!isEditing"
              label="Edit"
              @click="emit('editAsesmen')"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
  </CustomAccordion>
</template>
