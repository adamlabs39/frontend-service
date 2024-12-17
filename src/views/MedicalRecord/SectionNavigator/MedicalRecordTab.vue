<script setup lang="ts">
import { ref } from "vue";
import SessionTab from "./SessionTab.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

const props = defineProps({
  rmType: {
    type: String,
    default: "rawat-jalan",
  },
});

const selectedTab = defineModel<string>("selectedTab", {
  default: "rekam-medis",
});
const selectedSessionTab = defineModel<string>("selectedSessionTab", {
  default: "non-sesi",
});

const deleteSessionDialog = ref(false);
</script>

<template>
  <div>
    <Tabs
      v-model:value="selectedTab"
      :dt="{
        tabActiveBackground: '#E8F8F6',
        tabActiveColor: '#14B8A6',
        tabActiveBorderColor: '#14B8A6',
      }"
    >
      <TabList :pt="{ tabList: 'h-10 text-SM' }">
        <Tab
          class="py-0 px-[10px]"
          value="rekam-medis"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhListPlus
              v-if="selectedTab == 'rekam-medis'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Rekam Medis
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="asesmen"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhListChecks
              v-if="selectedTab == 'asesmen'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Asesmen
          </div>
        </Tab>
        <Tab
          v-if="rmType != 'fisioterapi'"
          class="py-0 px-[10px]"
          value="soap"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhStethoscope
              v-if="selectedTab == 'soap'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            S.O.A.P
          </div>
        </Tab>
        <Tab
          v-else
          class="py-0 px-[10px]"
          value="soapier"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhStethoscope
              v-if="selectedTab == 'soapier'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            S.O.A.P.I.E.R
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="penunjang"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhFirstAidKit
              v-if="selectedTab == 'penunjang'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Penunjang
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="alkes"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhFirstAidKit
              v-if="selectedTab == 'alkes'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Alkes
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="inform-consent"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhFileText
              v-if="selectedTab == 'inform-consent'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Inform Consent
          </div>
        </Tab>
        <Tab
          class="px-0 py-0"
          value="-"
          :pt="{ root: 'rounded-t-lg' }"
          disabled
        >
          <PhLineVertical :size="26" weight="bold" class="text-adameds-300" />
        </Tab>
        <Tab
          v-if="rmType == 'rawat-inap' || rmType == 'igd'"
          class="py-0 px-[10px]"
          value="fpo"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhPill
              v-if="selectedTab == 'fpo'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            FPO
          </div>
        </Tab>
        <Tab
          v-if="rmType == 'rawat-inap'"
          class="py-0 px-[10px]"
          value="perpindahan"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhArrowsClockwise
              v-if="selectedTab == 'perpindahan'"
              :size="18"
              weight="bold"
              class="mr-[10px]"
            />
            perpindahan
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="unggah-berkas"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <UploadPictureIcon
              v-if="selectedTab == 'unggah-berkas'"
              :size="18"
              class="mr-[10px]"
            />
            Unggah Berkas
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="resume-discharge"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhListStar
              v-if="selectedTab == 'resume-discharge'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Resume & Discharge
          </div>
        </Tab>
        <Tab
          class="py-0 px-[10px]"
          value="cetak-hasil-surat"
          :pt="{ root: 'rounded-t-lg' }"
        >
          <div class="flex">
            <PhEnvelopeSimple
              v-if="selectedTab == 'cetak-hasil-surat'"
              :size="18"
              weight="fill"
              class="mr-[10px]"
            />
            Cetak Hasil & Surat
          </div>
        </Tab>
      </TabList>
    </Tabs>
    <div
      v-if="
        (selectedTab == 'rekam-medis' ||
          selectedTab == 'asesmen' ||
          selectedTab == 'soap') &&
        (rmType == 'rawat-inap' || rmType == 'igd')
      "
      class="flex"
    >
      <SessionTab
        :key="selectedTab"
        v-model="selectedSessionTab"
        :selectedTab="selectedTab"
        :dataSession="['Sesi 1', 'Sesi 2']"
        class="mt-[10px] grow"
      />
      <div class="flex border-b border-grey-100">
        <CustomButton
          @click="deleteSessionDialog = true"
          class="my-auto bg-danger-300 !rounded-md"
          label="Hapus Sesi"
          size="small"
          icon="PhTrash"
          iconType="fill"
        />
      </div>
    </div>

    <!-- Dialog konfirmasi hapus sesi -->
    <CustomDialog
      class=""
      v-model:visible="deleteSessionDialog"
      headerBg="bg-danger-300"
      width="600px"
    >
      <template #header>Hapus Sesi</template>
      <template #body>
        <div class="pt-5">
          <CustomTextfield
            label="Alasan Menghapus Sesi"
            class="w-full mr-[30px]"
            placeholder="Alasan Menghapus Sesi"
          />
          <div class="mt-5 text-normal">
            <div>Seluruh data pemeriksaan pasien pada sesi akan terhapus.</div>
            <div class="mt-1">
              Anda yakin akan menghapus <span class="font-bold">Sesi 1</span> ?
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="() => {}"
            label="Tidak"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="() => {}"
            class="my-auto bg-danger-300"
            label="Iya, Hapus"
            iconType="fill"
          />
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
