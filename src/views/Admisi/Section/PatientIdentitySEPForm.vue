<script setup lang="ts">
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
</script>

<template>
  <CustomAccordion :openWithHeader="false" initialState="0">
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
        <div class="flex mb-5">
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
            disabled
          />
          <div class="flex ml-[10px] grow">
            <CustomTextfield
              label="Nama Lengkap"
              class="w-full mr-[30px]"
              placeholder="Nama Lengkap"
              disabled
            />
            <CustomSelect
              label="Identitas"
              placeHolder="Pilih Identitas"
              class="mr-[10px]"
              optionLabel=""
              optionValue=""
              :showFilter="false"
              :options="['KTP', 'Passport', 'SIM', 'Lainya']"
              disabled
            />
          </div>
          <CustomTextfield
            label=" "
            class="w-[23.5%] mt-auto"
            placeholder="KTP"
            disabled
          />
        </div>
        <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
          <!-- Row 1 -->
          <CustomTextfield
            label="Tempat Lahir"
            class=""
            placeholder="Tempat Lahir"
            disabled
          />
          <CustomDatePicker
            label="Tanggal Lahir"
            placeHolder="01-01-2024"
            class=""
            disabled
          />
          <CustomTextfield label="Umur" class="" placeholder="Umur" disabled />
          <CustomSelect
            label="Jenis Kelamin"
            placeHolder="Pilih Jenis Kelamin"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
            disabled
          />
          <!-- Row 2 -->
          <CustomTextfield
            label="No. Handphone"
            class=""
            placeholder="08XX-XXXX-XXXX"
            disabled
          />
          <CustomSelect
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
            disabled
          />
          <CustomSelect
            label="Negara"
            placeHolder="Pilih Negara"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Indonesia', 'Jepang', 'Amerika Serikat']"
            disabled
          />
          <CustomSelect
            label="Bahasa yang Dikuasai"
            placeHolder="Pilih Bahasa yang Dikuasai"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Bahasa Indonesia', 'Bahasa Inggris', 'Bahasa Jawa']"
            disabled
          />
          <!-- Row 3 -->
          <CustomSelect
            label="Status Pernikahan"
            placeHolder="Pilih Status Pernikahan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']"
            disabled
          />
          <CustomTextfield
            label="Nama Ibu Kandung"
            class="col-span-3"
            placeholder="Nama Ibu Kandung"
            disabled
          />
        </div>
        <div class="grid grid-cols-4 gap-y-5 gap-x-[30px] mt-[30px]">
          <CustomSelect
            label="Provinsi"
            placeHolder="Pilih Provinsi"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['DKI Jakarta', 'Jawa Barat', 'Jawa Timur']"
            disabled
          />
          <CustomSelect
            label="Kabupaten / Kota"
            placeHolder="Pilih Kabupaten / Kota"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Kota Jakarta Pusat', 'Kota Bandung', 'Kota Surabaya']"
            disabled
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
            disabled
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
            disabled
          />
          <div class="grid grid-cols-2 gap-y-5 gap-x-[30px]">
            <CustomTextfield label="RT" class="" placeholder="0" disabled />
            <CustomTextfield label="RW" class="" placeholder="0" disabled />
          </div>
          <CustomSelect
            label="Kode Pos"
            placeHolder="Pilih Kode Pos"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['10110', '40115', '60241']"
            disabled
          />
          <CustomTextArea
            label="Alamat"
            class="col-span-2"
            placeholder="Alamat"
            height="h-10"
            disabled
          />
        </div>
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
</template>
