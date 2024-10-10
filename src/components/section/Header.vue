<script setup lang="ts">
import type { ListMenu, Module } from "@/utils/Interface";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { utilsStore } from "@/stores/utils";
import CustomDialog from "../Base/CustomDialog.vue";
import CustomButton from "../Base/CustomButton.vue";
import { useRoute, useRouter } from "vue-router";

interface userData {
  name: string;
  role: string;
}

const authStore = useAuthStore();
const UseUtilsStore = utilsStore();

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
    url: "tbc",
  },
  {
    title: "Farmasi",
    icon: "PhAsclepius",
    iconWeight: "bold",
    url: "/farmasi",
  },
  {
    title: "Lab",
    icon: "PhMicroscope",
    iconWeight: "bold",
    url: "/laboratorium",
  },
  {
    title: "Fisioterapi",
    icon: "FisioIcon",
    url: "tbc",
  },
  {
    title: "Training",
    icon: "TrainingIcon",
    url: "tbc",
  },
  {
    title: "Pembayaran",
    icon: "PhMoneyWavy",
    url: "/pembayaran",
  },
  {
    title: "Inventory",
    icon: "DoubleBoxIcon",
    url: "tbc",
  },
  {
    title: "Datamaster",
    icon: "PhDatabase",
    url: "/datamaster",
  },
  {
    title: "Laporan",
    icon: "FileReportIcon",
    url: "tbc",
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

onMounted(() => {
  listMenu.value.push(templistMenu.value[0]);
  userData.value = JSON.parse(localStorage.getItem("user") ?? "");
  const listPermissionStr = localStorage.getItem("permission");
  if (listPermissionStr) {
    const listPermission: Module[] = JSON.parse(listPermissionStr);
    listPermission.forEach((module) => {
      const listMenuFind = templistMenu.value.find(
        (menu) => menu.title == module.module
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
    <div class="flex gap-5 my-auto">
      <div class="flex justify-between">
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
              <hr class="border-[#D9DCE1] border-1" />
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
  </div>
</template>
