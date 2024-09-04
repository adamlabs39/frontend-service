<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import Qrcode from "qrcode.vue";
import { getDateNow } from "@/utils/Helpers";

import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import PatientIdentityForm from "../Section/PatientIdentityForm.vue";
import DoctorVisitDetail from "../Section/DoctorVisitDetail.vue";

const props = defineProps({
  pageType: {
    type: String,
    required: true,
  },
  dataBreadCrumb: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
});

const emit = defineEmits(["back", "goToDetail", "goToEdit"]);

const confirmSaveDialog = ref(false);
const inputGeneralConsentDialog = ref(false);
const generalConsentDialog = ref(false);
const generalConsentDialogInputType = ref("create");

const generalConsentType = ref(["Pasien", "Keluarga"]);
const selectedGeneralConsent = ref("Pasien");
const onFilterBedRoomSelect = (label: string) => {
  selectedGeneralConsent.value = label;
};

const isDetail = () => {
  if (props.dataBreadCrumb[0].label == "Detail") return true;
  else return false;
};
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <Card class="h-min mb-[10px] absolute right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="{
              label:
                pageType == 'rawat-jalan'
                  ? 'Rawat Jalan'
                  : pageType == 'rawat-inap'
                  ? 'Rawat Inap'
                  : 'IGD',
              home: true,
            }"
            :model="dataBreadCrumb"
            class=""
          />
          <div class="flex">
            <CustomButton
              @click="emit('back')"
              icon="PhCaretLeft"
              label="Kembali"
              class="mr-[10px]"
              outlined
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
            <CustomButton
              v-if="isDetail()"
              @click="emit('goToEdit')"
              label="Edit"
              class="mr-[10px]"
              backgroundColor="bg-adameds-300"
            />
          </div>
        </div>
      </template>
    </Card>
    <div class="relative h-full overflow-auto top-[90px] pb-[180px]">
      <PatientIdentityForm :pageType="pageType" :isDetail="isDetail()" />
      <DoctorVisitDetail :pageType="pageType" :isDetail="isDetail()" />
    </div>
    <Card class="h-min mt-[10px] absolute bottom-0 right-0 left-0">
      <template #content>
        <div v-if="isDetail()" class="flex">
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Cetak Kunjungan"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
          <CustomButton
            @click="() => {}"
            icon="PhPrinter"
            label="Cetak Label"
            class=""
            backgroundColor="bg-adameds-300"
          />
          <div class="bg-adameds-300 w-[1px] my-[5px] mx-[15px]"></div>
          <CustomButton
            @click="generalConsentDialog = true"
            label="General Consent"
            class="mr-[10px]"
            backgroundColor="bg-adameds-300"
          />
        </div>
        <div v-else class="flex justify-end">
          <CustomButton
            label="Reset"
            class="mr-[10px]"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="confirmSaveDialog = true"
            label="Simpan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </Card>

    <CustomDialog v-model:visible="confirmSaveDialog" width="600px">
      <template #header>
        General Consent -
        {{
          pageType == "rawat-jalan"
            ? "Rawat Jalan"
            : pageType == "rawat-inap"
            ? "Rawat Inap"
            : "IGD"
        }}
      </template>
      <template #body>
        <div class="mt-5">
          <div class="mb-2">
            Pasien belum menyetujui
            <span class="font-bold">General Consent - Rawap Inap.</span>
          </div>
          <div>
            Membuat kesepakatan <span class="font-bold">General Consent?</span>
          </div>
        </div>
      </template>
      <template #footer>
        <CustomButton
          @click="emit('goToDetail'), (confirmSaveDialog = false)"
          label="Lewati"
          outlined
          class=""
          borderColor="border-adameds-300"
          textColor="text-adameds-300"
        />
        <CustomButton
          @click="
            (confirmSaveDialog = false), (inputGeneralConsentDialog = true)
          "
          label="Buat"
          class=""
          backgroundColor="bg-adameds-300"
        />
      </template>
    </CustomDialog>

    <CustomDialog v-model:visible="inputGeneralConsentDialog" width="1000px">
      <template #header>
        <div class="flex">
          <div>General Consent</div>
          <CustomChip
            v-for="(GC, index) in generalConsentType"
            :label="GC"
            borderColor="border-white"
            iconColor="text-white"
            textColor="text-white"
            selected-icon-color="text-adameds-300"
            selectedTextColor="text-adameds-300"
            :iconSize="16"
            class="ml-[10px]"
            selectedColor="bg-white border-white"
            :isSelected="selectedGeneralConsent == GC"
            @selected="onFilterBedRoomSelect"
            :key="GC + index"
          />
        </div>
      </template>
      <template #body>
        <div class="mt-5">
          <div
            v-if="selectedGeneralConsent == 'Keluarga'"
            class="grid grid-cols-2 gap-x-[30px] gap-y-5 mb-5"
          >
            <CustomTextfield
              label="Nama Lengkap Keluarga"
              class="col-span-2"
              placeholder="Nama Lengkap Keluarga"
              :disabled="generalConsentDialogInputType == 'detail'"
            />
            <CustomSelect
              label="Jenis Kelamin"
              placeHolder="Pilih Jenis Kelamin"
              class=""
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Laki-laki', 'Perempuan']"
              :disabled="generalConsentDialogInputType == 'detail'"
            />
            <CustomSelect
              label="Hubungan Dengan Pasien"
              placeHolder="Pilih Hubungan Dengan Pasien"
              class=""
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="[
                'Kepala Keluarga',
                'Mertua',
                'Menantu',
                'Kepokanan',
                'Sepupu',
                'Teman',
                'Kerabat',
                'Asisten Rumah Tangga',
                'Suami',
                'Istri',
                'Ayah',
                'Ibu',
                'Anak',
                'Kakak',
                'Adik',
                'Cucu',
                'Kakek',
                'Nenek',
                'Lainnya',
                'Family Lain',
              ]"
              :disabled="generalConsentDialogInputType == 'detail'"
            />
          </div>
          <CustomSelect
            label="Format General Consent"
            :placeHolder="`General Consent ${
              pageType == 'rawat-jalan'
                ? 'Rawat Jalan'
                : pageType == 'rawat-inap'
                ? 'Rawat Inap'
                : 'IGD'
            }`"
            class=""
            optionLabel=""
            optionValue=""
            :options="['Format 1', 'Format 2', 'Format 3']"
            prependIcon="PhMagnifyingGlass"
            :disabled="generalConsentDialogInputType == 'detail'"
          />
          <div
            class="h-[400px] border-[1px] border-grey-200 border-dashed rounded-[10px] mt-5 flex"
          >
            <div class="m-auto font-semibold text-normal">
              Default General Consent Rawat Jalan Pilihan Awal
            </div>
          </div>
          <div class="grid grid-cols-2 mt-10 text-center">
            <div class="font-semibold text-normal">Petugas</div>
            <div class="font-semibold text-normal">
              {{ selectedGeneralConsent == "Pasien" ? "Pasien" : "Keluarga" }}
            </div>
            <Qrcode
              class="mx-auto my-[10px]"
              :value="`Dikeluarkan di Klinik ADAMEDS, Ditandatangani secara elektronik oleh Petugas, Pada tanggal ${getDateNow()}`"
            />
            <Qrcode
              class="mx-auto my-[10px]"
              :value="`Dikeluarkan di Klinik ADAMEDS, Ditandatangani secara elektronik oleh ${
                selectedGeneralConsent == 'Pasien'
                  ? 'Pasien'
                  : 'Keluarga Pasien'
              }, Pada tanggal ${getDateNow()}`"
            />
            <div class="text-SM">Nama Petugas</div>
            <div class="text-SM">
              {{
                selectedGeneralConsent == "Pasien"
                  ? "Nama Pasien"
                  : "Nama Keluarga Pasien"
              }}
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div
          v-if="generalConsentDialogInputType == 'detail'"
          class="flex w-full"
        >
          <CustomButton
            @click="emit('goToDetail'), (inputGeneralConsentDialog = false)"
            icon="PhPrinter"
            label="Cetak"
            class="mr-auto"
            backgroundColor="bg-adameds-300"
          />
          <CustomButton
            @click="generalConsentDialogInputType = 'edit'"
            label="Edit"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
        <div v-else-if="generalConsentDialogInputType == 'edit'" class="flex">
          <CustomButton
            @click="inputGeneralConsentDialog = false"
            label="Batal Edit"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="emit('goToDetail'), (inputGeneralConsentDialog = false)"
            label="Simpan Edit"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
        <div v-else>
          <CustomButton
            @click="inputGeneralConsentDialog = false"
            label="Batal"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="emit('goToDetail'), (inputGeneralConsentDialog = false)"
            label="Setuju & Simpan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </CustomDialog>

    <CustomDialog v-model:visible="generalConsentDialog" width="600px">
      <template #header>General Consent</template>
      <template #body>
        <div class="mt-[10px]">
          <div v-for="data in [1, 2]">
            <div
              @click="
                (generalConsentDialogInputType = 'detail'),
                  (inputGeneralConsentDialog = true)
              "
              class="text-black cursor-pointer text-SM"
            >
              <div class="font-bold">
                General Consent
                {{ data == 1 ? " Umum" : "Tidak Menggunakan BPJS" }}
              </div>
              <div class="text-adameds-300">Rawat Jalan</div>
              <div class="flex">
                Tanggal
                <PhArrowRight
                  :size="18"
                  class="mx-5 ml-2 mr-3 text-success-300"
                  weight="bold"
                />
                2024-3-10 10:00
              </div>
            </div>
            <hr class="my-[10px]" />
          </div>
          <div
            class="border-[1px] border-dashed border-grey-200 h-20 rounded-[10px] flex"
          >
            <CustomButton
              @click="
                (generalConsentDialog = false),
                  (inputGeneralConsentDialog = true)
              "
              icon="PhPlus"
              label="General Consent Baru"
              class="m-auto"
              backgroundColor="bg-adameds-300"
            />
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
