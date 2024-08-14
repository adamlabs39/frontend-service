<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { computed, ref, type PropType } from "vue";
import Qrcode from "qrcode.vue";
import { getDateNow } from "@/utils/Helpers";

import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";

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

const newBorn = ref(false);
const noIdentity = ref(false);

const mergeBill = ref(false);
const selectedRoom = ref();
const selectedBed = ref([]);
const babyBox = ref(false);
const selectedBabyBed = ref([]);

const selectedPaymentMethod = ref<string[]>(["TUNAI"]);
const onPaymentMethodSelect = (label: string) => {
  selectedPaymentMethod.value[0] = label;
};

const confirmSaveDialog = ref(false);
const generalConsentDialog = ref(false);

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
      <CustomAccordion :openWithHeader="false">
        <template #header>
          <div class="flex justify-between w-full align-middle">
            <div class="flex">
              <span class="leading-10 text-adameds-300 text-heading">
                Identitas Pasien
              </span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="pt-5">
            <div class="flex">
              <CustomSelect
                label="Cari Nama / No. RM"
                placeHolder="Cari Nama / No. RM"
                class="mr-[30px] grow"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
                prependIcon="PhMagnifyingGlass"
                :disabled="noIdentity || newBorn || isDetail()"
              />
              <CustomSwitch
                v-model="newBorn"
                label="Bayi Baru Lahir"
                @update:model-value="noIdentity = false"
                :disabled="isDetail()"
              />
              <CustomSwitch
                v-if="pageType == 'igd'"
                v-model="noIdentity"
                label="Tanpa Identitas"
                class="ml-[8%]"
                @update:model-value="newBorn = false"
                :disabled="isDetail()"
              />
            </div>
            <hr class="mt-5 mb-[30px]" />
            <div
              v-if="newBorn || noIdentity"
              class="grid grid-cols-2 mb-5 gap-x-[30px]"
            >
              <CustomTextfield
                label="Nama Lengkap"
                class="w-full mr-[30px]"
                placeholder="Nama Lengkap"
                :disabled="isDetail()"
              />
              <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
                <CustomSelect
                  label="Identitas"
                  placeHolder="Pilih Identitas"
                  class="mr-[10px]"
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['KTP', 'Passport', 'SIM', 'Lainya']"
                  :disabled="isDetail()"
                />
                <CustomTextfield
                  :label="newBorn ? 'No. KTP Ibu' : ''"
                  class="col-span-3"
                  :class="{ 'mt-auto': noIdentity }"
                  placeholder="KTP"
                  :disabled="isDetail()"
                />
              </div>
            </div>
            <div v-else class="flex mb-5">
              <CustomSelect
                label="Awalan / Gelar"
                placeHolder="Pilih Awalan / Gelar"
                class="pr-[20px] w-1/4"
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="[
                  'Tn. (Tuan)',
                  'Ny. (Nyonya)',
                  'Sdr. (Saudara)',
                  'Nn. (Nona)',
                  'An. (Anak)',
                  'By. (Bayi)',
                ]"
                :disabled="isDetail()"
              />
              <div class="flex ml-[10px] grow">
                <CustomTextfield
                  label="Nama Lengkap"
                  class="w-full mr-[30px]"
                  placeholder="Nama Lengkap"
                  :disabled="isDetail()"
                />
                <CustomSelect
                  label="Identitas"
                  placeHolder="Pilih Identitas"
                  class="mr-[10px]"
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['KTP', 'Passport', 'SIM', 'Lainya']"
                  :disabled="isDetail()"
                />
              </div>
              <CustomTextfield
                label=" "
                class="w-[23.5%] mt-auto"
                placeholder="KTP"
                :disabled="isDetail()"
              />
            </div>
            <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
              <!-- Row 1 -->
              <CustomTextfield
                v-if="!noIdentity"
                label="Tempat Lahir"
                class=""
                placeholder="Tempat Lahir"
                :disabled="isDetail()"
              />
              <CustomDatePicker
                label="Tanggal Lahir"
                placeHolder="01-01-2024"
                class=""
                :disabled="isDetail()"
              />
              <CustomDatePicker
                v-if="newBorn"
                label="Jam Lahir"
                placeHolder="00:00"
                class=""
                timeOnly
                :disabled="isDetail()"
              />
              <CustomTextfield
                v-else
                label="Umur"
                class=""
                placeholder="Umur"
                :disabled="isDetail()"
              />
              <CustomSelect
                label="Jenis Kelamin"
                placeHolder="Pilih Jenis Kelamin"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['Laki-laki', 'Perempuan']"
                :disabled="isDetail()"
              />
              <!-- Row 2 -->
              <CustomTextfield
                v-if="!newBorn"
                label="No. Handphone"
                class=""
                placeholder="08XX-XXXX-XXXX"
                :disabled="isDetail()"
              />
              <CustomSelect
                v-if="!newBorn && !noIdentity"
                label="Agama"
                placeHolder="Pilih Agama"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="[
                  'Islam',
                  'Kristen',
                  'Katolik',
                  'Hindu',
                  'Buddha',
                  'Konghucu',
                  'Lain-lain',
                ]"
                :disabled="isDetail()"
              />
              <CustomSelect
                v-if="!newBorn && !noIdentity"
                label="Negara"
                placeHolder="Pilih Negara"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['Indonesia', 'Jepang', 'Amerika Serikat']"
                :disabled="isDetail()"
              />
              <CustomSelect
                v-if="!newBorn && !noIdentity"
                label="Bahasa yang Dikuasai"
                placeHolder="Pilih Bahasa yang Dikuasai"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['Bahasa Indonesia', 'Bahasa Inggris', 'Bahasa Jawa']"
                :disabled="isDetail()"
              />
              <!-- Row 3 -->
              <CustomSelect
                v-if="!newBorn && !noIdentity"
                label="Status Pernikahan"
                placeHolder="Pilih Status Pernikahan"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']"
                :disabled="isDetail()"
              />
              <CustomTextfield
                v-if="!noIdentity"
                label="Nama Ibu Kandung"
                class="col-span-3"
                placeholder="Nama Ibu Kandung"
                :disabled="isDetail()"
              />
            </div>
            <hr v-if="!noIdentity" class="my-[30px]" />
            <div
              v-if="!noIdentity"
              class="grid grid-cols-4 gap-y-5 gap-x-[30px]"
            >
              <CustomSelect
                label="Provinsi"
                placeHolder="Pilih Provinsi"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['DKI Jakarta', 'Jawa Barat', 'Jawa Timur']"
                :disabled="isDetail()"
              />
              <CustomSelect
                label="Kabupaten / Kota"
                placeHolder="Pilih Kabupaten / Kota"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="[
                  'Kota Jakarta Pusat',
                  'Kota Bandung',
                  'Kota Surabaya',
                ]"
                :disabled="isDetail()"
              />
              <CustomSelect
                label="Kecamatan"
                placeHolder="Pilih Kecamatan"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="[
                  'Kecamatan Gambir',
                  'Kecamatan Cidadap',
                  'Kecamatan Wonokromo',
                ]"
                :disabled="isDetail()"
              />
              <CustomSelect
                label="Kelurahan / Desa"
                placeHolder="Pilih Kelurahan / Desa"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="[
                  'Kelurahan Menteng',
                  'Desa Ciburial',
                  'Kelurahan Dukuh Menanggal',
                ]"
                :disabled="isDetail()"
              />
              <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
                <CustomTextfield
                  label="RT"
                  class=""
                  placeholder="0"
                  :disabled="isDetail()"
                />
                <CustomTextfield
                  label="RW"
                  class=""
                  placeholder="0"
                  :disabled="isDetail()"
                />
              </div>
              <CustomSelect
                label="Kode Pos"
                placeHolder="Pilih Kode Pos"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['10110', '40115', '60241']"
                :disabled="isDetail()"
              />
              <CustomTextArea
                label="Alamat"
                class="col-span-2"
                placeholder="Alamat"
                height="h-10"
                :disabled="isDetail()"
              />
            </div>
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" />
        </template>
        <template #expandIcon>
          <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" />
        </template>
      </CustomAccordion>
      <CustomAccordion :openWithHeader="false" class="mt-[10px]">
        <template #header>
          <div class="flex justify-between w-full align-middle">
            <div class="flex">
              <span class="leading-10 text-adameds-300 text-heading">
                Detail Kunjungan Dokter
              </span>
              <CustomChip
                label="TUNAI"
                borderColor="border-adameds-300"
                bgColor="bg-adameds-50"
                iconColor="text-adameds-300"
                textColor="text-adameds-300"
                customClass="h-5"
                class="my-auto ml-5"
                :isSelected="selectedPaymentMethod.includes('TUNAI')"
                @selected="onPaymentMethodSelect"
                selectedColor="bg-adameds-300 border-adameds-300"
              />
              <CustomChip
                label="ASURANSI"
                borderColor="border-warning-300"
                bgColor="bg-warning-50"
                iconColor="text-warning-300"
                textColor="text-warning-300"
                customClass="h-5"
                class="ml-[10px] my-auto"
                :isSelected="selectedPaymentMethod.includes('ASURANSI')"
                @selected="onPaymentMethodSelect"
                selectedColor="bg-warning-300 border-warning-300"
              />
            </div>
          </div>
        </template>
        <template #content>
          <div class="pt-5">
            <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
              <CustomSelect
                v-if="pageType == 'rawat-jalan'"
                label="Poli"
                placeHolder="Pilih Poli"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['POLI UMUM', 'POLI ANAK', 'POLI GIGI POLI MATA']"
                :disabled="isDetail()"
              />
              <CustomSelect
                label="DPJP"
                placeHolder="Pilih DPJP"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
                :disabled="isDetail()"
              />
              <CustomTextfield
                v-if="pageType == 'igd' || pageType == 'rawat-inap'"
                label="Keluhan Utama"
                class=""
                placeholder="Keluhan Utama"
                :disabled="isDetail()"
              />
            </div>
            <div
              class="grid grid-cols-5 gap-y-5 gap-x-[30px] mt-5"
              :class="{ 'grid-cols-6': pageType == 'rawat-inap' }"
            >
              <CustomSwitch
                label="Pasien Maternitas"
                sideLabel="Iya"
                :disabled="isDetail()"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                label="Pasien Titipan"
                sideLabel="Iya"
                :disabled="isDetail()"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                label="Naik Kelas"
                sideLabel="Iya"
                :disabled="isDetail()"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                v-model="mergeBill"
                label="Gabung Tagihan"
                sideLabel="Iya"
                :disabled="isDetail()"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                :disabled="!mergeBill || isDetail()"
                label="Tagihan Sebelumnya"
                sideLabel="Iya"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                :disabled="!mergeBill || isDetail()"
                label="Tagihan Keluarga"
                sideLabel="Iya"
              />
              <CustomTextfield
                v-if="pageType == 'rawat-jalan'"
                label="Keluhan Utama"
                class="col-span-2"
                placeholder="Keluhan Utama"
                :disabled="isDetail()"
              />
              <CustomTextArea
                v-if="pageType != 'rawat-inap'"
                label="Catatan"
                class="col-span-2"
                :class="{ 'col-span-4': pageType == 'igd' }"
                placeholder="Catatan"
                height="h-10"
                :disabled="isDetail()"
              />
            </div>
            <div v-if="selectedPaymentMethod.includes('ASURANSI')">
              <hr class="my-[30px]" />
              <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
                <CustomSelect
                  label="Nama Penjamin"
                  placeHolder="Pilih Nama Penjamin"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="[
                    'BPJS Kesehatan',
                    'Asuransi Prudential',
                    'Asuransi Allianz',
                  ]"
                  :disabled="isDetail()"
                />
                <CustomTextfield
                  label="No. Penjamin"
                  class=""
                  placeholder="No. Penjamin"
                  :disabled="isDetail()"
                />
              </div>
            </div>
            <div v-if="pageType == 'rawat-inap'">
              <hr class="my-[30px]" />
              <div class="grid grid-cols-3 gap-x-[30px]">
                <CustomSelect
                  label="Kategori Ruangan"
                  placeHolder="Pilih Kategori Ruangan"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['Ruangan Rawat Umum']"
                  :disabled="isDetail()"
                />
                <CustomSelect
                  label="Kelas"
                  placeHolder="Pilih Kelas"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['Kelas 2']"
                  :disabled="isDetail()"
                />
                <CustomSelect
                  v-model="selectedRoom"
                  label="Ruangan"
                  placeHolder="Pilih Ruangan"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['Mawar']"
                  :disabled="isDetail()"
                />
              </div>
              <div v-if="selectedRoom" class="grid grid-cols-3 mt-[30px]">
                <div class="col-span-2">
                  <div>
                    <div class="font-semibold text-normal">
                      <span class="text-adameds-300">{{ selectedRoom }}</span> >
                      Pilih Bed
                    </div>
                    <div class="grid grid-cols-2 gap-[10px] mr-[15px]">
                      <CustomCheckbox
                        v-for="(data, index) in [1, 2, 3, 4, 5, 6]"
                        v-model="selectedBed"
                        :title="
                          selectedBed[0] == data || data == 2 || data == 4
                            ? 'Nama Lengkap Pasien'
                            : '-'
                        "
                        :subTitle="'Bed ' + data"
                        :endText="
                          selectedBed[0] == data
                            ? 'Terpilih'
                            : data == 2 || data == 4
                            ? 'Terisi'
                            : 'Kosong'
                        "
                        :key="data + index"
                        :binary="false"
                        :value="`${data}`"
                        :multiple="false"
                        :disabled="data == 2 || data == 4 || isDetail()"
                      />
                    </div>
                  </div>
                  <div v-if="babyBox">
                    <div class="mt-5 font-semibold text-normal">
                      <span class="text-adameds-300">{{ selectedRoom }}</span> >
                      Pilih Bed - Box Bayi
                    </div>
                    <div
                      class="grid grid-cols-2 col-span-2 gap-[10px] mr-[15px]"
                    >
                      <CustomCheckbox
                        v-for="(data, index) in [
                          'Bed 1',
                          'Bed 2',
                          'Bed 3',
                          'Bed 4',
                          'Bed 5',
                          'Bed 6',
                        ]"
                        v-model="selectedBabyBed"
                        title="-"
                        :subTitle="'Box ' + data"
                        endText="Kosong"
                        :key="data + index"
                        :binary="false"
                        :value="`${data}`"
                        :multiple="false"
                        :disabled="isDetail()"
                      />
                    </div>
                  </div>
                </div>
                <div class="border-l-[1px] border-gray-100 pl-[15px]">
                  <CustomSwitch
                    label="Tambahan"
                    class="mb-[30px]"
                    sideLabel="Bed Cadangan"
                    :disabled="isDetail()"
                  />
                  <CustomSwitch
                    v-model="babyBox"
                    label=""
                    sideLabel="Box Bayi"
                    :disabled="isDetail()"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton icon="PhCaretUp" backgroundColor="bg-adameds-75" />
        </template>
        <template #expandIcon>
          <CustomButton icon="PhCaretDown" backgroundColor="bg-adameds-75" />
        </template>
      </CustomAccordion>
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
            @click="() => {}"
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
      <template #header>General Consent - Rawat Jalan</template>
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
          @click="(confirmSaveDialog = false), (generalConsentDialog = true)"
          label="Buat"
          class=""
          backgroundColor="bg-adameds-300"
        />
      </template>
    </CustomDialog>

    <CustomDialog v-model:visible="generalConsentDialog" width="1000px">
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
            />
            <CustomSelect
              label="Jenis Kelamin"
              placeHolder="Pilih Jenis Kelamin"
              class=""
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Laki-laki', 'Perempuan']"
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
        <CustomButton
          label="Batal"
          outlined
          class=""
          borderColor="border-grey-200"
          textColor="text-grey-300"
        />
        <CustomButton
          @click="emit('goToDetail'), (generalConsentDialog = false)"
          label="Setuju & Simpan"
          class=""
          backgroundColor="bg-adameds-300"
        />
      </template>
    </CustomDialog>
  </div>
</template>
