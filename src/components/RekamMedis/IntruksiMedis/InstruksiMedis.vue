<script lang="ts" setup>
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const messages = ref([
  {
    role: "Dokter Spesialis",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    time: "10:01",
    isSender: false,
    avatar: "@/assets/icons/Avatar/avatar_dokter.svg",
  },
  {
    role: "Dokter Spesialis",
    text: "Lorem ipsum dolor sit amet consecteturrrrrrrrrrrrrrrrrrrrr.",
    date: "01 Januari 2024",
    time: "10:05",
    isSender: false,
    avatar: "@/assets/icons/Avatar/avatar_dokter.svg",
  },
  {
    role: "Anda",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    time: "10:10",
    isSender: true,
    avatar: "@/assets/icons/Avatar/avatar_dokter.svg",
  },
]);

const selectedDoctor = ref(null);
const newMessage = ref("");

const sendMessage = () => {
  if (selectedDoctor.value && newMessage.value) {
    messages.value.push({
      role: selectedDoctor.value,
      text: newMessage.value,
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
      avatar: "@/assets/icons/Avatar/avatar_dokter.svg",
    });
    newMessage.value = "";
    selectedDoctor.value = null;
  }
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Instruksi Medis</template>
    <template #content>
      <div class="flex flex-col pt-5 gap-2.5">
        <div v-for="(message, index) in messages" :key="index" :class="{'justify-end': message.isSender}" class="flex items-start gap-2.5">
          <img src="@/assets/icons/Avatar/avatar_dokter.svg" alt="Avatar" :class="message.isSender?'order-2':''" />
          <div class="flex flex-col gap-2.5">
            <div class="flex w-full gap-5">
              <div class="text-adameds-300 font-semibold text-SM">
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
              :class="message.isSender ? 'rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px]' : 'rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]'"
              class="min-h-[45px] bg-adameds-50 flex items-center px-4 text-SM font-normal"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
        <hr class="border-grey-200 my-2.5" />
        <div class="flex gap-[30px]">
          <CustomSelect
            label="Dokter Pemberi Instruksi"
            place-holder="Pilih Dokter Pemberi Instruksi"
          />
          <div class="flex flex-col grow gap-2.5">
            <CustomTextArea
              v-model="newMessage"
              label="Instruksi Medis"
              placeholder="Ketik Instruksi..."
            />
            <CustomButton @click="sendMessage" :full="true" icon="PhPaperPlaneTilt" label="Kirim Instruksi" />
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
