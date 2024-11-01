<script setup lang="ts">
import { ref } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const dataBreadHome = ref({ label: "Daftar Kelas", home: true });
const dataBreadCrumb = ref([{ label: "Daftar" }]);
const emit = defineEmits(["back"]);
const selectedPaymentMethod = ref<string>("TUNAI");
const onPaymentMethodSelect = (label: string) => {
  selectedPaymentMethod.value = label;
  paymentMethod.value = label;
};
const paymentMethod = ref();
</script>
<template>
  <div class="relative w-full overflow-hidden">
    <Card class="h-min mb-[10px] absolute right-0 left-0">
      <template #content>
        <div class="flex justify-between">
          <CustomBreadCrumb
            :home="dataBreadHome"
            :model="dataBreadCrumb"
            class="grow"
          />
          <CustomButton
            label="Kembali"
            icon="PhCaretLeft"
            @click="emit('back')"
            background-color="bg-white"
            border-color="border-adameds-300"
            text-color="text-adameds-300"
          />
        </div>
      </template>
    </Card>
    <div class="relative h-full overflow-auto top-[100px] pb-[180px]">
      <CustomAccordion noBorder initial-state="0">
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
          <div class="grid grid-cols-12 gap-5 pt-5 items-end">
            <CustomSelect
              place-holder="Cari Nama/No. RM"
              label="Cari Nama/No.RM"
              class="border-r pr-5 border-grey-200 col-span-9"
            />
            <CustomTextfield
              label="No. RM"
              class="col-span-3"
              placeholder="No. RM"
              readOnly
            />
            <hr class="col-span-12" />
            <CustomSelect
              label="Awalan / Gelar"
              placeHolder="Pilih Awalan / Gelar"
              class="col-span-3"
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
            <CustomTextfield
              label="Nama Lengkap"
              class="col-span-4"
              placeholder="Nama Lengkap"
            />
            <CustomSelect
              label="Identitas"
              placeHolder="Pilih Identitas"
              class="col-span-2"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['KTP', 'Passport', 'SIM', 'Lainya']"
            />
            <CustomTextfield label=" " class="col-span-3" placeholder="KTP" />
            <CustomTextfield
              label="Tempat Lahir"
              class="col-span-3"
              placeholder="Tempat Lahir"
            />
            <CustomDatePicker
              label="Tanggal Lahir"
              placeHolder="01-01-2024"
              class="col-span-3"
            />
            <CustomTextfield
              label="Umur"
              class="col-span-3"
              placeholder="Umur"
            />
            <CustomSelect
              label="Jenis Kelamin"
              placeHolder="Pilih Jenis Kelamin"
              class="col-span-3"
              optionLabel="label"
              optionValue="value"
              :showFilter="false"
              :options="[
                { label: 'Laki-laki', value: 'Male' },
                { label: 'Perempuan', value: 'Female' },
              ]"
            />
            <CustomTextfield
              label="No. Handphone"
              class="col-span-3"
              placeholder="08XX-XXXX-XXXX"
            />
            <CustomSelect
              label="Agama"
              placeHolder="Pilih Agama"
              class="col-span-3"
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
              label="Negara"
              placeHolder="Pilih Negara"
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Indonesia', 'Jepang', 'Amerika Serikat']"
            />
            <CustomSelect
              label="Bahasa yang Dikuasai"
              placeHolder="Pilih Bahasa yang Dikuasai"
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Bahasa Indonesia', 'Bahasa Inggris', 'Bahasa Jawa']"
            />
            <CustomSelect
              label="Status Pernikahan"
              placeHolder="Pilih Status Pernikahan"
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']"
            />
            <CustomTextfield
              label="Nama Ibu Kandung"
              class="col-span-9"
              placeholder="Nama Ibu Kandung"
            />
            <hr class="col-span-12" />
            <CustomSelect
              label="Provinsi"
              placeHolder="Pilih Provinsi"
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['DKI Jakarta', 'Jawa Barat', 'Jawa Timur']"
            />
            <CustomSelect
              label="Kabupaten / Kota"
              placeHolder="Pilih Kabupaten / Kota"
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['Kota Jakarta Pusat', 'Kota Bandung', 'Kota Surabaya']"
            />
            <CustomSelect
              label="Kecamatan"
              placeHolder="Pilih Kecamatan"
              class="col-span-3"
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
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="[
                'Kelurahan Menteng',
                'Desa Ciburial',
                'Kelurahan Dukuh Menanggal',
              ]"
            />
            <div class="flex col-span-3 gap-2.5">
              <CustomTextfield label="RT" class="" placeholder="0" />
              <CustomTextfield label="RW" class="" placeholder="0" />
            </div>
            <CustomSelect
              label="Kode Pos"
              placeHolder="Pilih Kode Pos"
              class="col-span-3"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['10110', '40115', '60241']"
            />
            <CustomTextArea
              label="Alamat"
              class="col-span-6"
              placeholder="Alamat"
              height="h-10"
            />
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-adameds-75"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-adameds-75"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion
        noBorder
        initial-state="0"
        class="mt-[10px]"
        :openWithHeader="false"
      >
        <template #header>
          <div class="flex justify-between w-full align-middle">
            <div class="flex">
              <span class="leading-10 text-adameds-300 text-heading">
                Detail Kelas
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
          <div class="flex justify-between gap-5 pt-5">
            <CustomDatePicker label="Tanggal Kelas" placeHolder="01-01-2024" class="w-full" />
            <CustomSelect label="Kelas" place-holder="Pilih Kelas" class="w-full" />
            <CustomSelect label="Sesi" place-holder="Pilih Sesi" class="w-full" />
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-adameds-75"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-adameds-75"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
    </div>
    <Card class="h-min mt-[10px] absolute bottom-0 right-0 left-0">
      <template #content>
        <div class="flex justify-end gap-2.5">
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
