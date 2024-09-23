<script lang="ts" setup>
import { ref } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CardPasien from "@/components/Antrian/CardPasien.vue";
import CardAktivitas from "@/components/Antrian/CardAktivitas.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleBackAntrian = () => {
  router.push("/antrian/apm");
};

const handlePasienJKN = () => {
  router.push("/antrian/apm/aktif/pasien/jkn");
};
const handlePasienNonJKN = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn");
};
const handleCheckin = () => {
  router.push("/antrian/apm/aktif/checkin");
};
const handlePrint = () => {
  router.push("/antrian/apm/aktif/print");
};

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
});

const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}

function closeDialog() {
  emit("close");
}

const currentIndex = ref(0);

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % 2; // Change 2 to the number of images in the carousel
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + 2) % 2; // Change 2 to the number of images in the carousel
}

const cardPasienJKN = ref({
  keterangan: "Pasien JKN",
});
const cardPasienNonJKN = ref({
  keterangan: "Pasien Non-JKN",
});
const cardAktivitasCheckIn = ref({
  keterangan: "Checkin",
});
const cardAktivitasPrint = ref({
  keterangan: "Print",
});

const device = ref(["Carousel 1", "Carousel 2", "Carousel 3"]);

const getImage = (image: string) => {
  const imgUrl = new URL(
    `@/assets/images/APM/img-carousel-1.svg`,
    import.meta.url
  ).href;
  return imgUrl;
};
</script>

<template #body>
  <div class="bg-adameds-75">
    <div
      class="flex justify-between gap-5 pr-5 mt-[15px] bg-adameds-300 rounded-xl max-md:flex-wrap shadow-md py-0 mx-3"
      @click="handleBackAntrian"
    >
      <div
        class="flex justify-between w-full gap-5 text-sm leading-5 text-white whitespace-nowrap max-md:flex-wrap"
      >
        <!-- Logo and Divider -->
        <div
          class="flex gap-1 justify-center items-center px-2.5 rounded-lg shadow-sm bg-white"
        >
          <img
            loading="lazy"
            src="@/assets/images/adameds-logo.png"
            class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[70px] h-[70px]"
          />
          <div class="bg-adameds-300 w-[2px] h-[50px] my-auto rounded-md"></div>
          <img
            loading="lazy"
            src="@/assets/images/adameds.png"
            class="self-stretch object-cover w-[120px] my-auto shrink-0 mx-1"
          />
        </div>

        <!-- Main Title and Subtitle -->
        <div class="flex flex-col mx-1 my-auto">
          <!-- Added mx-4 for spacing -->
          <div class="mb-1 font-bold text-MD">
            Anjungan Pendaftaran Pribadi (APM)
          </div>
          <div class="text-sm">Klinik Adameds</div>
        </div>

        <!-- Clock and Date -->
        <div class="flex flex-col my-auto ml-auto text-right">
          <!-- Align text to the right -->
          <div class="text-lg font-bold">09:00 AM</div>
          <div class="text-sm">Senin, 01 Jan 2024</div>
        </div>
      </div>
    </div>
    <!-- Carousel Section -->
    <Carousel
      :value="device"
      circular
      :autoplayInterval="3000"
      :showNavigators="false"
    >
      <template #item="slotProps">
        <div
          class="relative items-center justify-center mt-16 mb-4 mx-36 w-150"
        >
          <div class="overflow-hidden rounded-xl">
            <div class="flex transition-transform duration-300">
              <div
                class="bg-adameds-300 w-3/5 h-[280px] flex items-center justify-center"
              >
                <div class="text-center text-white">
                  <div class="mb-2 text-5xl">#Improving</div>
                  <div class="text-5xl font-extrabold">Healthcare</div>
                </div>
              </div>

              <img
                loading="lazy"
                src="@/assets/images/APM/img-carousel-1.svg"
                class="w-2/5 h-[280px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>

    <div class="flex h-[220px] justify-center">
      <div class="w-[350px] my-10">
        <CardPasien :cardPasien="cardPasienJKN" @click="handlePasienJKN" class="transition-transform duration-300 hover:scale-95"/>
      </div>
      <div class="w-[350px] mx-8 my-10">
        <CardPasien :cardPasien="cardPasienNonJKN" @click="handlePasienNonJKN" class="transition-transform duration-300 hover:scale-95"/>
      </div>
      <div class="w-1 my-auto rounded-md h-28 bg-adameds-300"></div>
      <div class="w-[180px] mx-8 my-10">
        <CardAktivitas :cardAktivitas="cardAktivitasCheckIn" @click="handleCheckin" class="transition-transform duration-300 hover:scale-95"/>
      </div>
      <div class="w-[180px] my-10">
        <CardAktivitas :cardAktivitas="cardAktivitasPrint" @click="handlePrint" class="transition-transform duration-300 hover:scale-95"/>
      </div>
    </div>
  </div>
</template>
