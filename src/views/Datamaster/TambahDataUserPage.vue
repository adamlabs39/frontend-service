<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";

const router = useRouter();

function goBack() {
  router.back(); // Menggunakan Vue Router untuk kembali ke halaman sebelumnya
}

const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);

const selectedRole = ref();
const roleOptions = ref([
  { label: "Admin", value: "admin" },
  { label: "Dokter", value: "dokter" },
  { label: "Perawat", value: "perawat" },
]);
</script>

<template>
  <div class="bg-white flex flex-col justify-between overflow-hidden h-full">
    <div class="flex justify-between px-5 items-center">
      <CustomButton label="" icon="PhArrowClockwise" @click.stop="" />
      <CustomBreadCrumb
        :home="dataBreadHome"
        :model="dataBreadCrumb"
        class="grow"
      />
      <CustomButton label="Kembali" icon="PhCaretLeft" @click.stop="goBack" background-color="bg-white" border-color="border-adameds-300" text-color="text-adameds-300"/>
    </div>
    <div class="grow flex flex-row pl-5 overflow-hidden">
      <div class="basis-1/2 flex flex-col gap-5 overflow-hidden">
        <CustomSelect
          label="Role"
          placeHolder="Pilih Role"
          v-model="selectedRole"
          :options="roleOptions"
          :isLoading="false"
        />
        <div
          class="border border-dashed grow overflow-auto p-2 rounded-md flex flex-col justify-center items-center"
        >
          <img src="../../assets/icons/empty role.svg" alt="" />
          <div class="font-normal text-sm text-[#9CA3AF] leading-5 mt-[18.5px]">
            Pilih Role Terlebih Dahulu
          </div>
        </div>
      </div>
      <div class="basis-1/2 px-5 flex flex-col gap-2.5 overflow-hidden">
        <div class="grow overflow-auto flex flex-col gap-2.5">
          <CustomAccordion headerClass="">
            <template #collapseIcon>
              <PhCaretUp :size="20" class="text-adameds-A300" />
            </template>
            <template #expandIcon>
              <PhCaretDown :size="20" class="text-adameds-A300" />
            </template>
            <template #header>Akun</template>
            <template #content>
              <div class="flex flex-col gap-5 py-2.5">
                <CustomTextfield
                  label="Username"
                  placeholder="Username"
                  disabled
                >
                </CustomTextfield>
                <CustomTextfield
                  label="Password"
                  placeholder="********"
                  appendIcon="PhEye"
                  disabled
                ></CustomTextfield>
                <CustomTextfield
                  label="Verify Password"
                  placeholder="********"
                  appendIcon="PhEye"
                  disabled
                ></CustomTextfield>
              </div>
            </template>
          </CustomAccordion>
          <CustomAccordion headerClass="">
            <template #collapseIcon>
              <PhCaretUp :size="20" class="text-adameds-A300" />
            </template>
            <template #expandIcon>
              <PhCaretDown :size="20" class="text-adameds-A300" />
            </template>
            <template #header>Data User</template>
            <template #content>
              <div class="flex flex-col gap-5 py-2.5">
                <CustomTextfield
                  label="Nama Lengkap User"
                  placeholder="Nama Lengkap User"
                  disabled
                >
                </CustomTextfield>
                <div class="flex gap-2.5">
                  <CustomTextfield
                    label="No. Handphone"
                    placeholder="08xx-xxxx-xxxx"
                    disabled
                  >
                  </CustomTextfield>
                  <CustomTextfield
                    label="Email"
                    placeholder="Email"
                    disabled
                    class="basis-5/6"
                  >
                  </CustomTextfield>
                </div>
              </div>
            </template>
          </CustomAccordion>
          <div>
            <div>Status</div>
            <div class="w-full border rounded-lg p-2.5">
              <CustomSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-2.5 px-5 py-2.5">
      <CustomButton label="Batal" @click.stop="" />
      <CustomButton label="Simpan" @click.stop="" />
    </div>
  </div>
</template>
