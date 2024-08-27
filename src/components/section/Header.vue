<script setup lang="ts">
import { PhCaretDown, PhHouse } from "@phosphor-icons/vue";
import { ref } from "vue";
import CustomDialog from "../Base/CustomDialog.vue";
import CustomButton from "../Base/CustomButton.vue";
import { useRouter } from "vue-router";

const router = useRouter()

const profileEdit = () => {
  isDialogVisible.value = false;
  router.push({ name: "setting-profil-akun" })
}

const clickSetting = () => {
  isDialogVisible.value = false;
  router.push({ name: "setting-profil-faskes" })
}
const isDialogVisible = ref(false);

const showDialog = () => {
  isDialogVisible.value = true;
};
</script>

<template>
  <div class="flex justify-between gap-5 pr-5 mt-[10px] bg-adameds-300 rounded-xl max-md:flex-wrap shadow-md mx-3">
    <div class="flex justify-between gap-5 text-sm leading-5 text-white whitespace-nowrap max-md:flex-wrap h-[60px]">
      <div class="flex gap-1 justify-center items-center px-2.5 rounded-xl shadow-sm bg-white">
        <img loading="lazy" src="../../assets/images/adameds-logo.png"
          class="shrink-0 self-stretch my-auto mx-1 aspect-square w-[50px] h-[50px]" />
        <div class="bg-adameds-300 w-[3px] h-[50px] my-auto rounded-md"></div>
        <img loading="lazy" src="../../assets/images/adameds.png"
          class="self-stretch object-cover w-[106px] my-auto shrink-0" />
      </div>
      <div class="flex gap-2.5 my-auto">
        <div class="cursor-pointer flex gap-2.5 justify-center text-adameds-300 bg-white rounded-xl h-8 px-3">
          <PhHouse weight="fill" class="my-auto" />
          <div class="self-center">Menu</div>
        </div>
        <div class="cursor-pointer flex gap-2.5 justify-center rounded-xl bg-white bg-opacity-30 h-8 px-3">
          <PhHouse weight="fill" class="my-auto" />
          <div class="self-center">Menu</div>
        </div>
        <div class="cursor-pointer flex gap-2.5 justify-center items-center rounded-xl bg-white bg-opacity-30 h-8 px-3">
          <PhHouse weight="fill" class="my-auto" />
          <div class="self-center">Menu</div>
          <PhCaretDown weight="bold" class="my-auto" />
        </div>
      </div>
    </div>
    <div class="flex gap-5 my-auto">
      <div class="flex justify-between">
        <img loading="lazy" src="../../assets/icons/Bell Notification.svg" class="relative w-8 aspect-square" />
        <img src="../../assets/icons/notif.svg" alt="" class="absolute right-[92px] top-6 aspect-square">
      </div>
      <div class="flex items-center justify-center cursor-pointer">
        <div class="">
          <img loading="lazy" src="../../assets/icons/User Account.svg" class="relative w-10 aspect-square"
            @click="showDialog" />
          <img src="../../assets/icons/green_profile.svg" alt="" class="absolute right-9 top-6">
        </div>
        <Dialog v-model:visible="isDialogVisible" width="400px" position="topright" pt:root:class="rounded-2xl">
          <template #container>
            <div class="p-2.5 rounded-2xl">
              <div class="">
                <div class="font-semibold text-black text-SM">NAMA AKUN</div>
                <div class="text-[#79808F] text-[8px]">Terakhir Login 4 Mar 2024 | 12:00</div>
                <hr class="border-[#D9DCE1] border-1 " />
                <div class="py-2">
                  <CustomButton label="Profile" class="text-sm font-semibold font-poppins"
                    text-color="text-adameds-300" border-color="border-adameds-300" outlined @click="profileEdit"
                    icon="ph-user-circle" iconPos="left" />
                </div>
                <hr class="border-[#D9DCE1] border-1 mb-2.5" />
              </div>

              <div class="flex w-full gap-5 cursor-pointer">
                <img src="../../assets/icons/gear_setting.svg" width="30px" height="30px" @click="clickSetting">
                <CustomButton label="LOGOUT" full class="font-bold" />
              </div>
            </div>
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
