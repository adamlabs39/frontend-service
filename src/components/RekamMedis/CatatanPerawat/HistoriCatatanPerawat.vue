<!-- <script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import catatanPerawat01 from "@/assets/icons/Avatar/catatanPerawat01.svg";
import catatanPerawatAnda from "@/assets/icons/Avatar/catatanPerawatAnda.svg";
import { epochToDate } from "@/utils/Helpers";

const props = defineProps({
  history: {
    type: Object,
    default: null,
  },
});

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
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>
      {{ epochToDate(history.data.createdAt, 'date') || "Data Riwayat" }}
    </template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
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
            </div>
          </div>
        </div>
        <hr class="border-grey-200" />
        <div class="flex justify-between">
          <CustomInfoRow label="Petugas Input" :value="history.data.petugas" type="vertical" />
          <CustomInfoRow
            label="Jam Input"
            :value="String(epochToDate(history.data.createdAt, 'time'))"
            type="vertical"
            alignment="right"
          />
        </div>
      </div>
    </template>
  </CustomAccordion>
</template> -->

<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import catatanPerawat01 from "@/assets/icons/Avatar/catatanPerawat01.svg";
import catatanPerawatAnda from "@/assets/icons/Avatar/catatanPerawatAnda.svg";
import { epochToDate } from "@/utils/Helpers";
import { PhCalendarDots, PhClock } from "@phosphor-icons/vue";
import { computed } from 'vue';
import type { PropType } from 'vue';

interface Message {
  _id: string;
  message: string;
  name: string;
  user_uuid: string;
  time: number;
}

interface HistoryObject {
  date: number;
  data: Message[];
  petugas: string;
  waktuInput?: number; // Optional, as it might not be in all objects
}

const props = defineProps({
  history: {
    type: Object as PropType<HistoryObject | null>,
    default: null,
  },
  currentUserUuid: {
    type: String,
    default: "",
  },
});

const petugasInput = computed(() => {
  return props.history?.petugas || 'N/A';
});

const jamInput = computed(() => {
  if (props.history?.waktuInput) {
    return String(epochToDate(props.history.waktuInput, 'time'));
  }
  // Fallback if waktuInput is not present, use time from the last message in data
  if (props.history?.data && props.history.data.length > 0) {
    return String(epochToDate(props.history.data[props.history.data.length - 1].time, 'time'));
  }
  return 'N/A';
});

</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" initialState="0">
      <template #header>
        {{ epochToDate(history.date, 'date') || "Data Riwayat" }}
      </template>
      <template #content>
        <div v-if="history.data && history.data.length > 0" class="py-5 flex flex-col gap-[10px]">
          <div
            v-for="(message, index) in history.data"
            :key="message._id || index"
            class="flex items-start gap-2.5"
            :class="{ 'flex-row-reverse': message.user_uuid === currentUserUuid }"
          >
            <img :src="message.user_uuid === currentUserUuid ? catatanPerawatAnda : catatanPerawat01" alt="Avatar" />
            <div class="space-y-2.5">
              <div class="flex items-center w-full gap-5">
                <div class="font-semibold text-adameds-300 text-SM">
                  {{ message.user_uuid === currentUserUuid ? 'Anda' : message.name }}
                </div>
                <div class="flex gap-2.5 font-medium text-SM text-grey-400">
                  <div class="flex items-center gap-[2px]">
                    <PhCalendarDots :size="12" weight="fill" />
                    {{ epochToDate(message.time, 'date') }}
                  </div>
                  <div class="flex items-center gap-[2px]">
                    <PhClock :size="12" weight="fill" />
                    {{ epochToDate(message.time, 'time') }}
                  </div>
                </div>
              </div>
              <div
                :class="[
                  message.user_uuid === currentUserUuid
                    ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                    : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]',
                  'min-h-[45px] bg-adameds-50 px-4 text-SM font-normal flex items-center',
                ]"
              >
                {{ message.message }}
              </div>
            </div>
          </div>

          <hr class="border-grey-200" />
          <div class="flex justify-between">
            <CustomInfoRow
              label="Petugas Input"
              :value="petugasInput"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="jamInput"
              type="vertical"
              alignment="right"
            />
          </div>
        </div>
        <div v-else class="py-5 text-center text-grey-400">
          Tidak ada data catatan perawat pada tanggal ini.
        </div>
      </template>
    </CustomAccordion>
  </div>
   <div v-else class="text-center p-4 text-grey-400">
    Tidak ada data riwayat.
  </div>
</template>