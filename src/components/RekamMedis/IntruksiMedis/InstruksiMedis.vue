<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useForm, useField, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import dokterPerempuan from "@/assets/icons/Avatar/avatar_dokter_perempuan.svg";
import dokterLaki from "@/assets/icons/Avatar/avatar_dokter_laki.svg";

const props = defineProps({
  method: {
    type: String,
    default: "detail",
  },
});

// Variabel lokal untuk mengatur apakah sedang dalam mode editing atau tidak
const isEditing = ref(props.method === "form");
const emit = defineEmits(["edit", "submit"]);

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

const selectedDoctor = ref();
const optionsDokter = ref(["Dokter Aminah", "Dokter Siti", "Dokter Adam"]);

// Function to determine avatar based on gender
const getAvatar = (gender: string) => {
  return gender === "female" ? dokterPerempuan : dokterLaki;
};

// Schema for validation
const schema = yup.object({
  instruksi: yup.string().required("Instruksi Medis tidak boleh kosong"),
  dokter: yup.string().required("Dokter harus dipilih"),
});

// Use form with validation schema
const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: schema,
});

const [instruksi] = defineField("instruksi");
const [dokter] = defineField("dokter");

const onSubmitInstruksiMedis = handleSubmit((values: any) => {
  // Push new message to the messages array
  messages.value.push({
    role: "Anda",
    text: values.instruksi,
    instruksiDokter: values.dokter,
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
    gender: "female", // Assuming the sender is always female in this context
  });
  emit("submit", values);

  resetForm();

  console.log(instruksi);
  console.log(messages);
});

const toggleEdit = () => {
  isEditing.value = true;
  emit("edit");
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
        <div v-if="isEditing" class="flex gap-[30px]">
          <CustomSelect
            label="Dokter Pemberi Instruksi"
            v-model="dokter"
            place-holder="Pilih Dokter Pemberi Instruksi"
            :options="optionsDokter"
            option-label=""
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
          <CustomButton label="Edit" @click="toggleEdit" />
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
