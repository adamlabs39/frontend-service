<script setup lang="ts">
import type { ListMenu, Module } from "@/utils/Interface";
import { onMounted, ref, onBeforeMount, reactive, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { utilsStore } from "@/stores/utils";
import CustomButton from "../Base/CustomButton.vue";
import { useRoute, useRouter } from "vue-router";
import RMCustomSelect from "@/components/Base/RMCustomSelect.vue";
import { useFaskesStore } from "@/stores/datamaster/faskes";
import { useSettingStore } from "@/stores/setting";
import CustomSelect from "../Base/CustomSelect.vue";
import CardPanggilanAdmisi from "@/components/Base/CardPanggilanAdmisi.vue";
import { PhMegaphone, PhX } from '@phosphor-icons/vue';

interface userData {
  name: string;
  role: string;
}

const authStore = useAuthStore();
const emit = defineEmits(["selectedFaskes"]);
const UseUtilsStore = utilsStore();
const faskesStore = useFaskesStore();
const settingStore = useSettingStore();

const faskesPayload = ref<any[]>([]);
const router = useRouter();
const route = useRoute();
const goToPage = (url: string) => {
  router.push(url);
};

const listMenu = ref<ListMenu[]>([]);
const templistMenu = ref<ListMenu[]>([
  {
    title: "Dashboard",
    icon: "PhChartLine",
    iconWeight: "bold",
    url: "/dashboard",
  },
  {
    title: "Antrian",
    icon: "PhUsers",
    url: "/antrian",
  },
  {
    title: "Admisi",
    icon: "PhAddressBook",
    url: "/admisi",
  },
  {
    title: "Rawat Jalan",
    icon: "PhHospital",
    url: "/rawat-jalan",
  },
  {
    title: "Rawat Inap",
    icon: "PhHospital",
    url: "/rawat-inap",
  },
  {
    title: "IGD",
    icon: "PhHospital",
    url: "/igd",
  },
  {
    title: "Farmasi",
    icon: "PhAsclepius",
    iconWeight: "bold",
    url: "/farmasi",
  },
  {
    title: "Laboratorium",
    icon: "PhMicroscope",
    iconWeight: "bold",
    url: "/laboratorium",
  },
  {
    title: "Fisioterapi",
    icon: "FisioIcon",
    url: "/fisioterapi",
  },
  {
    title: "Training",
    icon: "TrainingIcon",
    url: "/training",
  },
  {
    title: "Pembayaran",
    icon: "PhMoneyWavy",
    url: "/pembayaran",
  },
  {
    title: "Inventory",
    icon: "DoubleBoxIcon",
    url: "/inventory",
  },
  {
    title: "Datamaster",
    icon: "PhDatabase",
    url: "/datamaster",
  },
  {
    title: "Laporan",
    icon: "FileReportIcon",
    url: "/laporan",
  },
]);

const profileEdit = () => {
  isDialogVisible.value = false;
  router.push({ name: "setting-profil-akun" });
};

const clickSetting = () => {
  isDialogVisible.value = false;
  router.push({ name: "setting-profil-faskes" });
};
const isDialogVisible = ref(false);

const showDialog = () => {
  isDialogVisible.value = true;
};

const isCardPanggilanVisible = ref(false);

const toggleCardPanggilan = () => {
  isCardPanggilanVisible.value = !isCardPanggilanVisible.value;
};

const daftarPanggilan = ref([
  {
    id: 1,
    nomorAntrian: "A-012",
    namaPasien: 'Siti Aisyah',
    nomorIdentitas: '3201234567890002',
    status: 'selesai',
    showIconPanggil: false,
    showIconLewati: false,
    showIconProcess: false,
  },
  {
    id: 2,
    nomorAntrian: "B-005",
    namaPasien: 'Budi Santoso',
    nomorIdentitas: '3201234567890003',
    status: 'selesai',
    showIconPanggil: false,
    showIconLewati: false,
    showIconProcess: false,
  },
  {
    id: 3,
    nomorAntrian: "C-021",
    namaPasien: 'Rina Melati',
    nomorIdentitas: '3201234567890004',
    status: 'aktif',
    showIconPanggil: true,
    showIconLewati: true,
    showIconProcess: true,
  },
  {
    id: 4,
    nomorAntrian: "D-007",
    namaPasien: 'Agus Wijaya',
    nomorIdentitas: '3201234567890005',
    status: 'terlewat',
    showIconPanggil: true,
    showIconLewati: true,
    showIconProcess: true,
  },
]);

const activeTab = ref('aktif');

const filteredPanggilan = computed(() => {
  if (activeTab.value === 'aktif') {
    return daftarPanggilan.value.filter(p => p.status !== 'selesai');
  }
  return daftarPanggilan.value.filter(p => p.status === activeTab.value);
});


const userData = ref<userData>();
const logout = async () => {
  UseUtilsStore.setLoading(true);
  try {
    await authStore.logoutApi();
    router.push("login");
  } catch (error: any) {
    console.log(error.message);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

onBeforeMount(async () => {
  await fetchFaskes();
  authStore.setFaskesUuid(faskesUuid.value ?? "");
  emit("selectedFaskes");
});

onMounted(() => {
  fetchFaskes();
  loadFaskesFromLocalStorage();
  listMenu.value.push(templistMenu.value[0]);
  userData.value = JSON.parse(localStorage.getItem("user") ?? "");
  const listPermissionStr = localStorage.getItem("permission");
  if (listPermissionStr) {
    const listPermission: Module[] = JSON.parse(listPermissionStr);
    listPermission.forEach((module) => {
      const listMenuFind = templistMenu.value.find(
        (menu) => menu.title == module.module && menu.title != "Dashboard"
      );
      if (listMenuFind) {
        listMenu.value.push(listMenuFind);
      }
    });
  }
});

const checkActiveTab = (url: string) => {
  let split = route.path.split("/");
  return `/${split[1]}` == url;
};
const fetchFaskes = async () => {
  try {
    const response = await faskesStore.getAktifApi();
    if (response && response.payload) {
      faskesPayload.value = response.payload;
    } else {
      faskesPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch faskes", error);
    faskesPayload.value = [];
  }
};

const fetchSettingProfilFaskesData = async () => {
  UseUtilsStore.setLoading(true);
  try {
    const response = await settingStore.getProfilFaskesApi();
    if (response) {
      UseUtilsStore.setProfilFaskes(response);
    } else {
      console.error("Unexpected response Structure", response);
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    UseUtilsStore.setLoading(false);
  }
};

const faskesName = ref<string>("");
const faskesSelected = ref<string>("");
const faskesUuid = ref<string>("");

const updateDataFaskes = async (value: string) => {
  const response = await authStore.tokenApi(faskesSelected.value);
  localStorage.setItem("access_token", `Bearer ${response.payload.newToken}`);
  localStorage.setItem("faskes", JSON.stringify(response.payload));
  authStore.setFaskesUuid(value);
  await fetchSettingProfilFaskesData();
  loadFaskesFromLocalStorage();
  window.location.reload()
};

const loadFaskesFromLocalStorage = () => {
  const faskesData = localStorage.getItem("faskes");
  if (faskesData) {
    try {
      const parsedFaskesData = JSON.parse(faskesData);
      faskesSelected.value = parsedFaskesData.faskesUuid || "";
      faskesName.value = parsedFaskesData.faskesName || "";
      faskesUuid.value = parsedFaskesData.faskesUuid || "";
    } catch (error) {
      console.error("Error parsing faskes data from localStorage:", error);
    }
  }
};

const getUserRole = () => {
  const userDataString = localStorage.getItem("user");
  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      return userData.role;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  }
  return null;
};

const isSuperAdmin = getUserRole() === "super admin";
</script>

<template>
  <div
    class="flex justify-between gap-5 pr-5 mt-[10px] bg-adameds-300 rounded-xl max-md:flex-wrap shadow-md mx-3"
  >
    <div
      class="flex justify-between gap-5 text-sm leading-5 text-white whitespace-nowrap max-md:flex-wrap h-[60px] overflow-auto"
    >
      <div
        class="grid grid-cols-[max-content_max-content_max-content] gap-1 justify-center items-center px-2.5 rounded-xl shadow-sm bg-white"
      >
        <img
          loading="lazy"
          src="../../assets/images/adameds-logo.png"
          class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[50px] h-[50px]"
        />
        <div class="bg-adameds-300 w-[3px] h-[50px] my-auto rounded-md"></div>
        <img
          loading="lazy"
          src="../../assets/images/adameds.png"
          class="self-stretch object-cover w-[106px] my-auto shrink-0"
        />
      </div>
      <div class="flex gap-2.5 my-auto overflow-x-scroll">
        <div
          v-for="menu in listMenu"
          :key="menu.title"
          @click="goToPage(menu.url)"
          class="cursor-pointer flex gap-2.5 justify-center bg-white rounded-xl h-8 px-3"
          :class="[
            checkActiveTab(menu.url)
              ? 'text-adameds-300 font-semibold'
              : 'bg-opacity-30',
          ]"
        >
          <component
            :is="menu.icon"
            :weight="menu.iconWeight ? menu.iconWeight : 'fill'"
            class="my-auto"
          />
          <div class="self-center">{{ menu.title }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-shrink-0 gap-5 my-auto">
      <div
        v-if="isSuperAdmin && faskesName"
        class="flex gap-2.5 bg-white px-3 rounded-[75px] text-adameds-300 items-center justify-center min-w-[156px] h-8"
      >
        <HospitalFillIcon class="text-adameds-300" />
        <div class="font-semibold truncate text-MD">
          {{ faskesName }}
        </div>
      </div>
      <div class="flex justify-between">
        <svg
          @click="toggleCardPanggilan" class="relative w-8 aspect-square mr-4 cursor-pointer" viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5333 6.06673H2.86662C2.15937 6.06673 1.4811 6.34768 0.981 6.84778C0.480903 7.34788 0.199951 8.02615 0.199951 8.7334V14.0667C0.199951 14.774 0.480903 15.4523 0.981 15.9523C1.4811 16.4524 2.15937 16.7334 2.86662 16.7334H4.19995V22.0667C4.19995 22.4204 4.34043 22.7595 4.59048 23.0095C4.84052 23.2596 5.17966 23.4001 5.53328 23.4001H8.19995C8.55357 23.4001 8.89271 23.2596 9.14276 23.0095C9.39281 22.7595 9.53329 22.4204 9.53329 22.0667V16.7334H13.5333L20.2 22.0667V0.733398L13.5333 6.06673ZM26.2 11.4001C26.2 13.6801 24.92 15.7467 22.8666 16.7334V6.06673C24.9066 7.06673 26.2 9.1334 26.2 11.4001Z"
            fill="white"
          />
        </svg>
        <img
          loading="lazy"
          src="../../assets/icons/Bell Notification.svg"
          class="relative w-8 aspect-square"
        />
        <img
          src="../../assets/icons/notif.svg"
          alt=""
          class="absolute right-[92px] top-6 aspect-square"
        />
      </div>
      <div class="flex items-center justify-center cursor-pointer">
        <div class="">
          <img
            loading="lazy"
            src="../../assets/icons/User Account.svg"
            class="relative w-10 aspect-square"
            @click="showDialog"
          />
          <img
            src="../../assets/icons/green_profile.svg"
            alt=""
            class="absolute right-9 top-6"
          />
        </div>
        <Dialog
          v-model:visible="isDialogVisible"
          position="topright"
          pt:root:class="rounded-2xl"
          :dismissableMask="true"
          :modal="true"
        >
          <template #container>
            <div class="p-2.5 rounded-2xl w-[180px]">
              <div class="font-semibold text-black text-XS">
                {{ userData?.name }}
              </div>
              <div class="text-[#79808F] text-[8px]">
                Terakhir Login 4 Mar 2024 | 12:00
              </div>
              <div
                class="flex items-center gap-1 p-2 my-2.5 rounded-md bg-adameds-75"
              >
                <span class="w-2 h-2 bg-teal-500 rounded-full"></span>
                <span class="font-semibold text-adameds-300 text-[8px]">{{
                  userData?.role
                }}</span>
              </div>
              <RMCustomSelect
                v-if="isSuperAdmin"
                v-model="faskesSelected"
                :options="faskesPayload"
                place-holder="Pilih Faskes"
                optionLabel="name"
                optionValue="uuid"
                :showCal="false"
                @update:modelValue="updateDataFaskes"
              />
              <hr class="border-[#D9DCE1] border-1 mt-2.5" />
              <div class="flex flex-col items-start py-2">
                <CustomButton
                  label="Profile"
                  text-color="text-gray-300"
                  outlined
                  @click="profileEdit"
                  icon="PhUser"
                  iconPos="left"
                  pt:label:class="font-normal text-SM"
                />
                <CustomButton
                  label="Setting"
                  text-color="text-gray-300"
                  outlined
                  @click="clickSetting"
                  iconPos="left"
                  icon="PhGearSix"
                  pt:label:class="font-normal text-SM "
                />
              </div>
              <hr class="border-[#D9DCE1] border-1 mb-2.5" />

              <div class="flex w-full gap-5 cursor-pointer">
                <CustomButton
                  @click="logout"
                  label="LOGOUT"
                  full
                  class="font-semibold"
                  iconPos="left"
                  icon="PhSignOut"
                  pt:label:class="text-XS"
                />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
    </div>
     <div
      v-if="isCardPanggilanVisible"
      class="fixed top-[80px] right-4 z-50 w-[500px] bg-white rounded-lg shadow-lg flex flex-col"
    >
      <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center gap-x-2">
          <PhMegaphone :size="24" class="text-gray-600" />
          <h2 class="font-bold text-lg text-gray-800">Panggilan Antrian</h2>
        </div>
        <button @click="toggleCardPanggilan" class="text-gray-500 hover:text-gray-800">
          <PhX :size="20" weight="bold" />
        </button>
      </div>

            <div class="flex items-center justify-around p-4 border-b">
        <button
          @click="activeTab = 'aktif'"
          :class="[activeTab === 'aktif' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent']"
          class="pb-2 text-sm font-semibold border-b-2 transition-colors"
        >
          Antrian Aktif
        </button>
        <button
          @click="activeTab = 'terlewat'"
          :class="[activeTab === 'terlewat' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent']"
          class="pb-2 text-sm font-semibold border-b-2 transition-colors"
        >
          Terlewat
        </button>
        <button
          @click="activeTab = 'selesai'"
          :class="[activeTab === 'selesai' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent']"
          class="pb-2 text-sm font-semibold border-b-2 transition-colors"
        >
          Selesai
        </button>
      </div>

      <div class="flex flex-col gap-y-3 p-4 overflow-y-auto max-h-[calc(100vh-215px)]">
        <CardPanggilanAdmisi
          v-for="panggilan in filteredPanggilan"
          :key="panggilan.id"
          :nomor-antrian="panggilan.nomorAntrian"
          :nama-pasien="panggilan.namaPasien"
          :nomor-identitas="panggilan.nomorIdentitas"
          :status="panggilan.status"
          :show-icon-panggil="panggilan.showIconPanggil"
          :show-icon-lewati="panggilan.showIconLewati"
          :show-icon-process="panggilan.showIconProcess"
        />
      </div>
    </div>
  </div>
</template>