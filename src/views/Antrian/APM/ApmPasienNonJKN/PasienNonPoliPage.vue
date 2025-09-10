<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CardAktivitas from "@/components/Antrian/CardAktivitas.vue";
import CardDokter from "@/components/Antrian/CardDokter.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, type PropType } from "vue";
import Stethoscop from "@/components/icons/Stethoscop.vue";
import CardJam from "@/components/Antrian/CardJam.vue";
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";
import { useJadwalDokterStore } from "@/stores/antrian/jadwalDokter";
import { utilsStore } from "@/stores/utils";
import { watch } from "vue";

const router = useRouter();
const route = useRoute();

const handleBack = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn/data-pasien");
};
const handleBerhasil = () => {
  router.push("/antrian/apm/aktif/pasien/non-jkn/berhasil");
};

const selectedType = ref<string | null>(null);
const isDisabled = computed(() => !selectedType.value);
const selectType = (type: string) => {
  selectedType.value = type;
};

const selectedTime = ref<string | null>(null);
const selectTime = (time: string) => {
  selectedTime.value = time;
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
  dataPasien: {
    default: Object,
  },
  excludedDokterUuids: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  excludedDoctorUuidsByPoli: {
    type: Object as PropType<Record<string, string[]>>,
    default: () => ({}),
  },
});

const jadwalDokterStore = useJadwalDokterStore();
const useUtilsStore = utilsStore();

const getDokterPayload = ref<any[]>([]);
const getDokterProperties = ref({
  poliUuid: "",
  name: "",
});

const poliName = ref<string>("");

const jadwalDokterPayload = ref<any[]>([]);
const jadwalDokterProperties = ref({
  page: 1,
  page_size: 99999999999999,
  total: 0,
});

const fetchJadwalDokter = async () => {
  useUtilsStore.setLoading(true);
  try {
    const response = await jadwalDokterStore.getApi(
      jadwalDokterProperties.value.page,
      jadwalDokterProperties.value.page_size
    );

    const selectedPoliUuid = getDokterProperties.value.poliUuid;

    // response.payload adalah array (lihat console.txt), setiap item punya struktur: { doctor, poli, jadwal_dokter }
    if (Array.isArray(response?.payload)) {
      const filtered = selectedPoliUuid
        ? response.payload.filter(
            (item: any) => item?.poli?.uuid === selectedPoliUuid
          )
        : response.payload;

      jadwalDokterPayload.value = filtered;
      // total diset sesuai hasil filter agar merepresentasikan data yang sedang ditampilkan
      jadwalDokterProperties.value.total = filtered.length;
      console.log("filtered:", jadwalDokterPayload.value);
    } else {
      // fallback jika payload tidak sesuai ekspektasi
      jadwalDokterPayload.value = [];
      jadwalDokterProperties.value.total = 0;
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    jadwalDokterPayload.value = [];
    jadwalDokterProperties.value.total = 0;
  } finally {
    useUtilsStore.setLoading(false);
  }
};

onMounted(() => {
  getDokterProperties.value.poliUuid = (route.query.poli_uuid as string) || "";
  poliName.value = (route.query.poli_name as string) || "";
  fetchJadwalDokter();
});

// watch(
//   () => route.query.poli_uuid,
//   (newVal) => {
//     selectedPoliUuid.value = (newVal as string) || "";
//     fetchGetDokter(selectedPoliUuid.value);
//   }
// );

const cardDokterNamaPanjang = ref({
  namaDokter: "dr. Nama Dokter Nama Panjang",
});
const cardDokterNamaPanjangSekali = ref({
  namaDokter: "dr. Nama Dokter Nama Panjang Sekali",
});
const cardDokterNama = ref({
  namaDokter: "dr. Nama Dokter",
});

const cardJamPagi = ref({
  jam: "07:00 - 10:00",
});
const cardJamSiang = ref({
  jam: "12:00 - 15:00",
});
const cardJamMalam = ref({
  jam: "18:00 - 20:00",
});

const selectedDokter = ref<string | null>(null);
const selectDokter = (doctorUuid: string) => {
  selectedDokter.value = doctorUuid;
  selectedTime.value = null;
};

const selectedDoctorDetail = computed(() => {
  if (!selectedDokter.value) return null;
  return (
    jadwalDokterPayload.value.find(
      (item: any) => item?.doctor?.uuid === selectedDokter.value
    ) || null
  );
});
</script>

<template #body>
  <div class="flex flex-col py-5 w-full min-h-screen">
    <div
      class="flex relative z-10 gap-5 justify-between py-0 pr-5 mx-3 rounded-xl shadow-md bg-adameds-300 max-md:flex-wrap"
    >
      <NavbarAntrian />
    </div>
    <div class="flex relative flex-1 justify-center items-center mx-36">
      <div
        class="flex overflow-hidden flex-col justify-center w-full rounded-3xl"
      >
        <div
          class="bg-white bg-opacity-30 w-full h-[540px] items-center justify-center"
        >
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between w-48 h-10 bg-white rounded-xl shadow-md"
            >
              <div
                class="flex gap-2 items-center text-sm leading-5 whitespace-nowrap text-adameds-300"
              >
                <!-- Logo Container -->
                <div
                  class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
                >
                  <PlusIcon class="text-white" :size="30" />
                </div>

                <!-- Text Container with Background -->
                <div class="px-2 py-1 font-bold rounded-xl text-adameds-300">
                  Pasien Non-JKN
                </div>
              </div>
            </div>

            <!-- Title Container (Center) -->
            <div
              class="flex col-span-1 justify-center items-center text-2xl font-extrabold text-adameds-300"
            >
              <Stethoscop class="text-adameds-300" :size="28" />
              &nbsp {{ poliName || "Poli" }}
            </div>

            <!-- Button Container (Right) -->
            <div class="flex col-span-1 justify-end items-center mr-6">
              <CustomButton
                label="< &nbsp Kembali"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="w-[120px]"
                @click="handleBack"
              />
            </div>
          </div>

          <div class="flex items-start mx-16 my-5">
            <div class="pr-6 pl-6 w-full">
              <div class="justify-start pl-1 text-lg font-bold">
                List Dokter
              </div>
              <hr class="bg-black h-[2px] my-2 ml-1" />
              <div class="justify-start pb-4 pl-1 text-sm text-adameds-300">
                Silahkan Pilih Dokter
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="dokter in jadwalDokterPayload" :key="dokter.uuid">
                  <cardDokter
                    :cardDokter="{
                      namaDokter: dokter?.doctor?.name || 'Dokter',
                    }"
                    class="w-full transition-transform duration-300 hover:scale-95"
                    @click="selectDokter(dokter?.doctor?.uuid)"
                  />
                </div>

                <div
                  v-if="jadwalDokterPayload.length === 0"
                  class="col-span-2 text-sm italic text-gray-500"
                >
                  Tidak ada dokter untuk poli ini.
                </div>
              </div>
            </div>

            <!-- Divider vertikal sesuai Figma -->
            <div
              class="mx-8 w-[4px] bg-adameds-300 rounded self-stretch mt-16"
              v-show="selectedDokter"
            ></div>

            <!-- Panel Jam Praktek (selalu tampil) -->
            <div class="" v-show="selectedDokter">
              <div>
                <div class="justify-start pl-1 text-lg font-bold">
                  Jam Praktek
                </div>
                <hr class="bg-black h-[2px] my-2" />
                <div class="justify-start pb-4 pl-1 text-sm text-adameds-300">
                  Silahkan Pilih Jam Praktek
                </div>

                <!-- Daftar Jam sesuai Figma -->
                <!-- Ganti kontainer menjadi pembungkus lebar + area scroll di dalamnya -->
                <div class="w-[280px]">
                  <!-- Area daftar yang dibatasi tinggi dan bisa scroll -->
                  <div
                    class="grid overflow-y-auto grid-cols-1 gap-4 pr-2 max-h-64"
                  >
                    <template v-if="selectedDoctorDetail">
                      <template
                        v-for="j in selectedDoctorDetail.jadwalDokter"
                        :key="j.jadwalDokterUuid"
                      >
                        <button
                          type="button"
                          :class="[
                            'relative flex items-center justify-center h-[60px] w-[280px] rounded-2xl shadow-md transition-all duration-300',
                            selectedTime === j.jadwalDokterUuid
                              ? 'bg-adameds-100 text-white'
                              : 'bg-white text-adameds-300 hover:bg-adameds-100 hover:text-white',
                            'hover:scale-95',
                          ]"
                          @click="selectTime(j.jadwalDokterUuid)"
                        >
                          <span class="font-extrabold text-[16px]">
                            {{ j.startTime }} - {{ j.endTime }}
                          </span>
                          <CheckCircleIcon
                            :size="20"
                            class="absolute right-4"
                            :class="
                              selectedTime === j.jadwalDokterUuid
                                ? 'text-white'
                                : 'text-transparent'
                            "
                          />
                        </button>
                      </template>
                    </template>
                  </div>

                  <!-- Tombol di luar area scroll sehingga tidak terpengaruh max-h -->
                  <CustomButton
                    v-show="selectedTime"
                    label="Lanjutkan"
                    class="w-[280px] mt-2"
                    backgroundColor="bg-adameds-100"
                    textColor="text-white"
                    @click="handleBerhasil"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
