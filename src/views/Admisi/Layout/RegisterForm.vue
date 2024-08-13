<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { ref, type PropType } from "vue";

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

const emit = defineEmits(["back"]);

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
          <CustomButton
            @click="emit('back')"
            icon="PhCaretLeft"
            label="Kembali"
            class="mr-[10px]"
            outlined
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
          />
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
                :disabled="noIdentity || newBorn"
              />
              <CustomSwitch
                v-model="newBorn"
                label="Bayi Baru Lahir"
                @update:model-value="noIdentity = false"
              />
              <CustomSwitch
                v-if="pageType == 'igd'"
                v-model="noIdentity"
                label="Tanpa Identitas"
                class="ml-[8%]"
                @update:model-value="newBorn = false"
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
                />
                <CustomTextfield
                  :label="newBorn ? 'No. KTP Ibu' : ''"
                  class="col-span-3"
                  :class="{ 'mt-auto': noIdentity }"
                  placeholder="KTP"
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
              />
              <div class="flex ml-[10px] grow">
                <CustomTextfield
                  label="Nama Lengkap"
                  class="w-full mr-[30px]"
                  placeholder="Nama Lengkap"
                />
                <CustomSelect
                  label="Identitas"
                  placeHolder="Pilih Identitas"
                  class="mr-[10px]"
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['KTP', 'Passport', 'SIM', 'Lainya']"
                />
              </div>
              <CustomTextfield
                label=" "
                class="w-[23.5%] mt-auto"
                placeholder="KTP"
              />
            </div>
            <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
              <!-- Row 1 -->
              <CustomTextfield
                v-if="!noIdentity"
                label="Tempat Lahir"
                class=""
                placeholder="Tempat Lahir"
              />
              <CustomDatePicker
                label="Tanggal Lahir"
                placeHolder="01-01-2024"
                class=""
              />
              <CustomDatePicker
                v-if="newBorn"
                label="Jam Lahir"
                placeHolder="00:00"
                class=""
                timeOnly
              />
              <CustomTextfield
                v-else
                label="Umur"
                class=""
                placeholder="Umur"
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
              <!-- Row 2 -->
              <CustomTextfield
                v-if="!newBorn"
                label="No. Handphone"
                class=""
                placeholder="08XX-XXXX-XXXX"
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
              />
              <CustomTextfield
                v-if="!noIdentity"
                label="Nama Ibu Kandung"
                class="col-span-3"
                placeholder="Nama Ibu Kandung"
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
              />
              <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
                <CustomTextfield label="RT" class="" placeholder="0" />
                <CustomTextfield label="RW" class="" placeholder="0" />
              </div>
              <CustomSelect
                label="Kode Pos"
                placeHolder="Pilih Kode Pos"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['10110', '40115', '60241']"
              />
              <CustomTextArea
                label="Alamat"
                class="col-span-2"
                placeholder="Alamat"
                height="h-10"
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
              />
              <CustomSelect
                label="DPJP"
                placeHolder="Pilih DPJP"
                class=""
                optionLabel=""
                optionValue=""
                :showFilter="false"
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
              <CustomTextfield
                v-if="pageType == 'igd' || pageType == 'rawat-inap'"
                label="Keluhan Utama"
                class=""
                placeholder="Keluhan Utama"
              />
            </div>
            <div
              class="grid grid-cols-5 gap-y-5 gap-x-[30px] mt-5"
              :class="{ 'grid-cols-6': pageType == 'rawat-inap' }"
            >
              <CustomSwitch label="Pasien Maternitas" sideLabel="Iya" />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                label="Pasien Titipan"
                sideLabel="Iya"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                label="Naik Kelas"
                sideLabel="Iya"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                v-model="mergeBill"
                label="Gabung Tagihan"
                sideLabel="Iya"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                :disabled="!mergeBill"
                label="Tagihan Sebelumnya"
                sideLabel="Iya"
              />
              <CustomSwitch
                v-if="pageType == 'rawat-inap'"
                :disabled="!mergeBill"
                label="Tagihan Keluarga"
                sideLabel="Iya"
              />
              <CustomTextfield
                v-if="pageType == 'rawat-jalan'"
                label="Keluhan Utama"
                class="col-span-2"
                placeholder="Keluhan Utama"
              />
              <CustomTextArea
                v-if="pageType != 'rawat-inap'"
                label="Catatan"
                class="col-span-2"
                :class="{ 'col-span-4': pageType == 'igd' }"
                placeholder="Catatan"
                height="h-10"
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
                />
                <CustomTextfield
                  label="No. Penjamin"
                  class=""
                  placeholder="No. Penjamin"
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
                />
                <CustomSelect
                  label="Kelas"
                  placeHolder="Pilih Kelas"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['Kelas 2']"
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
                        :disabled="data == 2 || data == 4"
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
                      />
                    </div>
                  </div>
                </div>
                <div class="border-l-[1px] border-gray-100 pl-[15px]">
                  <CustomSwitch
                    label="Tambahan"
                    class="mb-[30px]"
                    sideLabel="Bed Cadangan"
                  />
                  <CustomSwitch
                    v-model="babyBox"
                    label=""
                    sideLabel="Box Bayi"
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
        <div class="flex justify-end">
          <CustomButton
            label="Reset"
            class="mr-[10px]"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            label="Simpan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
