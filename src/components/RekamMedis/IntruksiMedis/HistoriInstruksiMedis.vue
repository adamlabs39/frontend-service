<!-- <script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import dokterPerempuan from "@/assets/icons/Avatar/avatar_dokter_perempuan.svg";
import dokterLaki from "@/assets/icons/Avatar/avatar_dokter_laki.svg";

const messages = ref([
  {
    role: "Dokter Spesialis",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    instruksiDokter: "Bambang",
    time: "10:01",
    isSender: false,
    gender: "female",
  },
  {
    role: "Dokter Spesialis",
    text: "Lorem ipsum dolor sit amet consecteturrrrrrrrrrrrrrrrrrrrr.",
    date: "01 Januari 2024",
    instruksiDokter: "Bambang",

    time: "10:05",
    isSender: false,
    gender: "male",
  },
  {
    role: "Anda",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    instruksiDokter: "Bambang",

    time: "10:10",
    isSender: true,
    gender: "female",
  },
]);

const getAvatar = (gender: string) => {
  return gender === "female" ? dokterPerempuan : dokterLaki;
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{ 'justify-end': message.isSender }"
          class="flex items-start gap-2.5"
        >
          <img
            :src="getAvatar(message.gender)"
            alt="Avatar"
            :class="message.isSender ? 'order-2' : ''"
          />
          <div class="flex flex-col gap-2.5">
            <div class="flex w-full gap-5">
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
              :class="
                message.isSender
                  ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                  : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]'
              "
              class="min-h-[45px] bg-adameds-50 flex items-center px-4 text-SM font-normal"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
        <hr class="border-grey-200" />
        <div class="flex justify-between">
          <CustomInfoRow
            label="Petugas Input"
            :value="`petugas`"
            type="vertical"
          />
          <CustomInfoRow
            label="Jam Input"
            :value="`petugas`"
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
import dokterPerempuan from "@/assets/icons/Avatar/avatar_dokter_perempuan.svg"; // Mewakili 'Anda'
import dokterLaki from "@/assets/icons/Avatar/avatar_dokter_laki.svg"; // Mewakili pengguna lain
import { epochToDate } from "@/utils/Helpers";
import { PhCalendarDots, PhClock } from "@phosphor-icons/vue";
import { computed } from "vue";

const props = defineProps({
  history: {
    type: Object,
    default: () => ({}),
  },
  // Prop untuk membandingkan UUID pengguna yang login
  currentUserUuid: {
    type: String,
    default: "",
  },
});

// Computed properties untuk footer agar aman jika data kosong
const petugasInput = computed(() => {
  return props.history?.petugas || 'N/A';
});

const jamInput = computed(() => {
  return props.history?.waktuInput ? epochToDate(props.history.waktuInput, 'time') : 'N/A';
});
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>
      {{ history.date ? epochToDate(history.date, 'date') : "Data Riwayat" }}
    </template>
    <template #content>
      <div v-if="history && history.data && history.data.length > 0" class="py-5 flex flex-col gap-[10px]">
        <div
          v-for="(message, index) in history.data"
          :key="message._id || index"
          class="flex items-start gap-2.5"
          :class="{ 'justify-end': message.user_uuid === currentUserUuid }"
        >
          <img
            :src="message.user_uuid === currentUserUuid ? dokterPerempuan : dokterLaki"
            alt="Avatar"
            :class="message.user_uuid === currentUserUuid ? 'order-2' : ''"
          />
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center w-full gap-5">
              <div class="font-semibold text-adameds-300 text-SM">
                {{ message.user_uuid === currentUserUuid ? 'Anda' : message.name }} ({{ message.dokter_name }})
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
                message.user_uuid === currentUserUuid
                  ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]'
                  : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]'
              "
              class="min-h-[45px] bg-adameds-50 flex items-center px-4 text-SM font-normal"
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
        Tidak ada data instruksi medis pada tanggal ini.
      </div>
    </template>
  </CustomAccordion>
</template>
