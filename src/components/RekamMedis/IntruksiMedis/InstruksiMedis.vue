<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import dokterPerempuan from "@/assets/icons/Avatar/avatar_dokter_perempuan.svg";
import dokterLaki from "@/assets/icons/Avatar/avatar_dokter_laki.svg";

const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        instruksi: yup.string(),
      })
    ),
  })
);

const messages = ref([
  {
    role: "Dokter Spesialis",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    time: "10:01",
    isSender: false,
    gender: "female",
  },
  {
    role: "Dokter Spesialis",
    text: "Lorem ipsum dolor sit amet consecteturrrrrrrrrrrrrrrrrrrrr.",
    date: "01 Januari 2024",
    time: "10:05",
    isSender: false,
    gender: "male",
  },
  {
    role: "Anda",
    text: "Lorem ipsum dolor sit amet consectetur.",
    date: "01 Januari 2024",
    time: "10:10",
    isSender: true,
    gender: "female",
  },
]);

const selectedDoctor = ref(null);
const newMessage = ref("");

// Function to determine avatar based on gender
const getAvatar = (gender: string) => {
  return gender === "female" ? dokterPerempuan : dokterLaki;
};
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Instruksi Medis</template>
    <template #content>
      <div class="flex flex-col pt-5 gap-2.5">
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
            <CustomButton
              :full="true"
              class="w-full"
              >
              <div class="flex items-center gap-2">
                <PhPaperPlaneTilt :size="20" weight="fill" />
                <div>Kirim Instruksi</div>
              </div>
            </CustomButton>
              <!-- <template #icon>
                <PhPaperPlaneTilt :size="32" weight="fill" />


              </template -->
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
