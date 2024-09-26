<script setup lang="ts">
import { ref } from 'vue';
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const trafficAccident = ref(false);
const suplesi = ref(false);
const manualSEP = ref(false);

const submitForm = () => {
  console.log("Submited SEP Form");
};

defineExpose({
  submitForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false" class="mt-[10px]" initialState="0">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <img src="../../../assets/images/BPJS.png" alt="" />
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
        <div class="flex mb-5">
          <div class="flex w-1/4 pr-[10px]">
            <CustomTextfield
              label="Nama Terdaftar"
              class="mr-[10px] grow"
              placeholder="Nama Terdaftar"
            />
            <CustomButton
              @click="() => {}"
              label="Cari"
              class="mt-auto"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <CustomTextfield
            label="Nama Terdaftar"
            class="w-[37.5%] ml-[20px]"
            placeholder="Nama Terdaftar"
          />
          <CustomSelect
            label="No. KTP"
            placeHolder="No. KTP"
            class="w-[37.5%] ml-[30px]"
            optionLabel=""
            optionValue=""
            :options="['KTP1', 'KTP2', 'KTP3']"
            prependIcon="PhMagnifyingGlass"
          />
        </div>
        <div class="grid grid-cols-4 gap-y-5 gap-x-[30px]">
          <CustomTextfield label="No. RM" class="" placeholder="No. RM" />
          <CustomDatePicker
            label="Tanggal Lahir"
            placeHolder="01-01-2024"
            class=""
          />
          <CustomSelect
            label="Hak Kelas"
            placeHolder="Pilih Hak Kelas"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomTextfield
            label="Asal Rujukan"
            class=""
            placeholder="Asal Rujukan"
          />
          <div class="flex">
            <CustomTextfield
              label="No. Rujukan"
              class="mr-[10px] grow"
              placeholder="No. Rujukan"
            />
            <CustomButton
              @click="() => {}"
              label="Cari"
              class="mt-auto"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <CustomDatePicker
            label="Tanggal Rujukan"
            placeHolder="01-01-2024"
            class=""
          />
          <CustomSelect
            label="Asal Faskes"
            placeHolder="Pilih Asal Faskes"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomSelect
            label="Asal Rujukan"
            placeHolder="Pilih Asal Rujukan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomTextfield label="Kode PPK" class="" placeholder="Kode PPK" />
          <CustomSwitch label="Operasi Katarak" sideLabel="Iya" />
          <div class="flex">
            <CustomTextfield
              label="No. Kontrol / RJ"
              class="mr-[10px] grow"
              placeholder="No. Kontrol / RJ"
            />
            <CustomButton
              @click="() => {}"
              label="Cari"
              class="mt-auto"
              backgroundColor="bg-adameds-300"
            />
          </div>
          <CustomSelect
            label="Jenis Kepesertaan"
            placeHolder="Pilih Jenis Kepesertaan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomDatePicker
            label="Tanggal SEP"
            placeHolder="01-01-2024"
            class=""
          />
          <CustomSelect
            label="Poli"
            placeHolder="Pilih Poli"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomSelect
            label="DPJP"
            placeHolder="Pilih DPJP"
            class="col-span-2"
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomSelect
            label="Tujuan Kunjungan"
            placeHolder="Pilih Tujuan Kunjungan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomSelect
            label="Procedure"
            placeHolder="Pilih Procedure"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomSelect
            label="Penunjang"
            placeHolder="Pilih Penunjang"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomSelect
            label="Assesmen pelayanan"
            placeHolder="Pilih Assesmen pelayanan"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Laki-laki', 'Perempuan']"
          />
          <CustomTextArea
            label="Catatan"
            class="col-span-4"
            placeholder="Catatan"
            height="h-10"
          />
          <CustomSwitch
            v-model="trafficAccident"
            label="Kecelakaan Lalu Lintas"
            sideLabel="Iya"
          />
          <div v-if="!trafficAccident" class="col-span-3"></div>
          <CustomSelect
            v-if="trafficAccident"
            label="Provinsi"
            placeHolder="Pilih Provinsi"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['DKI Jakarta', 'Jawa Barat', 'Jawa Timur']"
          />
          <CustomSelect
            v-if="trafficAccident"
            label="Kabupaten / Kota"
            placeHolder="Pilih Kabupaten / Kota"
            class=""
            optionLabel=""
            optionValue=""
            :showFilter="false"
            :options="['Kota Jakarta Pusat', 'Kota Bandung', 'Kota Surabaya']"
          />
          <CustomSelect
            v-if="trafficAccident"
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
          <CustomSwitch v-model="suplesi" label="Suplesi" sideLabel="Iya" />
          <CustomTextfield
            v-if="suplesi"
            label="Nomor Suplesi"
            class="col-span-3"
            placeholder="Nomor Suplesi"
          />
        </div>
        <hr class="my-[40px]" />
        <div class="grid grid-cols-7 gap-x-[10px]">
          <CustomButton @click="() => {}" label="Buat SEP" class="" />
          <CustomButton
            @click="manualSEP = !manualSEP"
            label="SEP Manual"
            class=""
          />
          <CustomTextfield
            :showLabel="false"
            class="w-full mr-[30px] col-span-3"
            placeholder="0"
            :disabled="!manualSEP"
          />
          <CustomButton
            @click="() => {}"
            label="Simpan SEP Manual"
            class=""
            :disabled="!manualSEP"
          />
          <CustomButton
            @click="() => {}"
            icon="PhTrash"
            label="Hapus SEP"
            class=""
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
