<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import catatanPerawat01 from "@/assets/icons/Avatar/catatanPerawat01.svg";
import catatanPerawatAnda from "@/assets/icons/Avatar/catatanPerawatAnda.svg";
import { PhCalendarDots, PhClock } from "@phosphor-icons/vue";
import { computed, ref } from "vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import HistoriCatatanPerawat from "@/components/RekamMedis/CatatanPerawat/HistoriCatatanPerawat.vue";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

const emit = defineEmits(["edit"]);

const currentMethod = ref(props.method);
const modeChat = ref("");

interface Message {
  role: string;
  roleYangDibalas?: string;
  text: string;
  textLama?: string;
  date: string;
  time: string;
  isSender: boolean;
  avatar: string;
  actions: { text: string; icon: string }[];
}

const messages = ref<Message[]>([
  {
    role: "Perawat 01",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    time: "10:01",
    isSender: false,
    avatar: catatanPerawat01,
    actions: [{ text: "Balas", icon: "PhArrowUUpLeft" }],
  },
  {
    role: "Anda",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    time: "10:10",
    isSender: true,
    avatar: catatanPerawatAnda,
    actions: [
      { text: "Edit", icon: "PhPencil" },
      { text: "Balas", icon: "PhArrowUUpLeft" },
    ],
  },
]);

const schemaCatatanPerawat = computed(() =>
  toTypedSchema(
    yup.object({
      catatanPerawat: yup.string(),
    })
  )
);

const {
  handleSubmit: handleSubmitCatatanPerawat,
  defineField: defineFieldCatatanPerawat,
  resetForm,
} = useForm({
  validationSchema: schemaCatatanPerawat,
});

const [catatanPerawat] = defineFieldCatatanPerawat("catatanPerawat");

const replyMessageRole = ref<string | null>(null);
const editMessageRole = ref<string | null>(null);
const editMessageIndex = ref<number | null>(null);
const textLama = ref("");

const handleActionClick = (actionText: string, message: any, index: number) => {
  if (actionText === "Balas") {
    onReplyMessage(message);
  } else if (actionText === "Edit") {
    onEditMessage(message, index);
  }
};

const onEditMessage = (message: any, index: number) => {
  editMessageRole.value = message.role;
  catatanPerawat.value = message.text;
  editMessageIndex.value = index;
  modeChat.value = "Edit";
};

const onReplyMessage = (message: any) => {
  replyMessageRole.value = message.role;
  modeChat.value = "Balas";
  textLama.value = message.text;
  catatanPerawat.value = "";
};

const onSubmitCatatanPerawat = handleSubmitCatatanPerawat((values: any) => {
  if (modeChat.value === "Edit" && editMessageIndex.value !== null) {
    messages.value[editMessageIndex.value].text = values.catatanPerawat;
    resetForm();
  } else if (modeChat.value === "Add") {
    const newMessage = {
      role: "Anda",
      text: values.catatanPerawat,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
      avatar: catatanPerawatAnda,
      actions: [
        { text: "Edit", icon: "PhPencil" },
        { text: "Balas", icon: "PhArrowUUpLeft" },
      ],
    };
    messages.value.push(newMessage);
    emit("edit", newMessage);
    resetForm();
  } else if (modeChat.value === "Balas") {
    const newReplyMessage = {
      role: "Anda",
      roleYangDibalas: replyMessageRole.value || "",
      text: values.catatanPerawat,
      textLama: textLama.value,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
      avatar: catatanPerawatAnda,
      actions: [
        { text: "Edit", icon: "PhPencil" },
        { text: "Balas", icon: "PhArrowUUpLeft" },
      ],
    };
    messages.value.push(newReplyMessage);
    emit("edit", newReplyMessage);
    resetForm();
  }
  currentMethod.value = "detail";
  modeChat.value = "";
  replyMessageRole.value = null;
  editMessageRole.value = null;
  editMessageIndex.value = null;
});

const onEditClick = () => {
  currentMethod.value = "form";
  modeChat.value = "Add";
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
    <template #header>Catatan Perawat</template>
    <template #content>
      <div v-if="currentMethod == 'form'" class="flex flex-col">
        <CustomButton
          @click="showDialogCompare"
          class="!rounded-md my-[10px] ml-auto"
          label="Mode Compare"
          size="small"
          icon="LayoutIcon"
        />
        <hr class="mb-[30px]" />
      </div>
      <div class="pt-5 space-y-2.5">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex items-start gap-2.5"
          :class="{ 'flex-row-reverse': message.isSender }"
        >
          <img :src="message.avatar" alt="Avatar" />
          <div class="space-y-2.5">
            <div class="flex items-center w-full gap-5">
              <div class="font-semibold text-adameds-300 text-SM">
                {{ message.role }}
              </div>
              <div class="flex gap-2.5 font-medium text-SM text-grey-400">
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
              :class="[
                message.isSender
                  ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                  : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]',
                'min-h-[45px] bg-adameds-50 px-4 text-SM font-normal flex',
                message.textLama
                  ? 'flex-col-reverse gap-4 py-4 justify-center'
                  : 'items-center',
              ]"
            >
              {{ message.text }}

              <div
                v-if="message.textLama"
                class="rounded-md bg-grey-50 p-2.5 border border-[#3DD5C6]"
              >
                <div class="flex justify-start">
                  <span class="font-semibold text-adameds-300">
                    {{ message.roleYangDibalas }}
                  </span>
                </div>
                <hr class="border-t my-2 border-[#E2E8F0]" />
                <div class="text-black">{{ message.textLama }}</div>
              </div>
            </div>
            <div
              :class="message.isSender ? 'justify-start' : 'justify-end'"
              class="flex gap-4"
            >
              <button
                v-for="action in message.actions"
                :key="action.text"
                v-if="currentMethod == 'form'"
                class="flex items-center gap-2 font-medium text-SM"
                :class="[
                  action.text === 'Edit' ? 'text-info-300' : 'text-adameds-300',
                ]"
                @click="handleActionClick(action.text, message, index)"
              >
                <component :is="action.icon" :size="16" />
                {{ action.text }}
              </button>
            </div>
          </div>
        </div>

        <hr class="border-grey-200 my-2.5" v-if="currentMethod == 'form'" />
        <div v-if="currentMethod == 'form'" class="space-y-2.5">
          <CustomChip
            v-if="replyMessageRole || editMessageRole"
            :label="
              modeChat === 'Balas'
                ? `Membalas Pesan ${replyMessageRole}`
                : `Edit Pesan ${editMessageRole}`
            "
            selected-color="border-0 bg-adameds-300"
            :showCheckedIcon="false"
            bgColor="bg-adameds-300"
            textColor="text-white"
            borderColor="border-transparent"
            customClass="h-5 pr-[6px]"
          />
          <div class="space-y-2.5">
            <CustomTextArea
              v-model="catatanPerawat"
              label="Catatan Antar Perawat"
              placeholder="Ketik Catatan..."
            />
            <CustomButton
              :full="true"
              icon="PhPaperPlaneTilt"
              label="Kirim Catatan"
              @click="onSubmitCatatanPerawat"
            />
          </div>
        </div>
      </div>
      <!-- Dialog compare -->
      <CustomDialog class="" v-model:visible="compareDialog" width="80%">
        <template #header>Catatan Perawat</template>
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
              <HistoriCatatanPerawat />
            </div>
            <div class="border border-adameds-300 mx-[15px]"></div>
            <div class="flex flex-col gap-y-5">
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="flex items-start gap-2.5"
                :class="{ 'flex-row-reverse': message.isSender }"
              >
                <img :src="message.avatar" alt="Avatar" />
                <div class="space-y-2.5">
                  <div class="flex items-center w-full gap-5">
                    <div class="font-semibold text-adameds-300 text-SM">
                      {{ message.role }}
                    </div>
                    <div class="flex gap-2.5 font-medium text-SM text-grey-400">
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
                    :class="[
                      message.isSender
                        ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                        : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]',
                      'min-h-[45px] bg-adameds-50 px-4 text-SM font-normal flex',
                      message.textLama
                        ? 'flex-col-reverse gap-4 py-4 justify-center'
                        : 'items-center',
                    ]"
                  >
                    {{ message.text }}

                    <div
                      v-if="message.textLama"
                      class="rounded-md bg-grey-50 p-2.5 border border-[#3DD5C6]"
                    >
                      <div class="flex justify-start">
                        <span class="font-semibold text-adameds-300">
                          {{ message.roleYangDibalas }}
                        </span>
                      </div>
                      <hr class="border-t my-2 border-[#E2E8F0]" />
                      <div class="text-black">{{ message.textLama }}</div>
                    </div>
                  </div>
                  <div
                    :class="message.isSender ? 'justify-start' : 'justify-end'"
                    class="flex gap-4"
                  >
                    <button
                      v-for="action in message.actions"
                      :key="action.text"
                      v-if="currentMethod == 'form'"
                      class="flex items-center gap-2 font-medium text-SM"
                      :class="[
                        action.text === 'Edit'
                          ? 'text-info-300'
                          : 'text-adameds-300',
                      ]"
                      @click="handleActionClick(action.text, message, index)"
                    >
                      <component :is="action.icon" :size="16" />
                      {{ action.text }}
                    </button>
                  </div>
                </div>
              </div>

              <hr
                class="border-grey-200 my-2.5"
                v-if="currentMethod == 'form'"
              />
              <div v-if="currentMethod == 'form'" class="space-y-2.5">
                <CustomChip
                  v-if="replyMessageRole || editMessageRole"
                  :label="
                    modeChat === 'Balas'
                      ? `Membalas Pesan ${replyMessageRole}`
                      : `Edit Pesan ${editMessageRole}`
                  "
                  selected-color="border-0 bg-adameds-300"
                  :showCheckedIcon="false"
                  bgColor="bg-adameds-300"
                  textColor="text-white"
                  borderColor="border-transparent"
                  customClass="h-5 pr-[6px]"
                />
                <div class="space-y-2.5">
                  <CustomTextArea
                    v-model="catatanPerawat"
                    label="Catatan Antar Perawat"
                    placeholder="Ketik Catatan..."
                  />
                  <CustomButton
                    :full="true"
                    icon="PhPaperPlaneTilt"
                    label="Kirim Catatan"
                    @click="onSubmitCatatanPerawat"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex items-end justify-end gap-3">
            <CustomButton
              v-if="currentMethod == 'form'"
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton
              v-if="currentMethod == 'form'"
              label="Simpan"
              @click="() => {}"
            />
            <CustomButton
              v-if="currentMethod == 'detail'"
              label="Edit"
              @click="onEditClick"
            />
          </div>
        </template>
      </CustomDialog>
    </template>
    <template #footer v-if="currentMethod == 'detail'">
      <div class="flex items-end justify-end gap-3">
        <CustomButton label="Edit" @click="onEditClick" />
      </div>
    </template>
  </CustomAccordion>
</template>
