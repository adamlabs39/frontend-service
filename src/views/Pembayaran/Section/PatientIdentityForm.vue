<script setup lang="ts">
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";

const submitForm = () => {
  console.log("Submited Patient Identity Form");
};

defineExpose({
  submitForm,
});
</script>

<template>
  <CustomAccordion :openWithHeader="false">
    <template #header>
      <div class="flex justify-between w-full align-middle">
        <div class="flex">
          <p class="leading-10 text-adameds-300 text-heading">
            Identitas Pasien
          </p>
          <CustomButton class="ml-4">INV1234</CustomButton>
          <CustomChip
            class="mt-2 ml-4"
            :showCheckedIcon="false"
            label="TUNAI"
            bgColor="bg-adameds-50"
            textColor="text-adameds-300"
            borderColor="border-adameds-300"
          />
          <!-- <CustomChip
            class="mt-2 ml-4"
            :showCheckedIcon="false"
            label="PIUTANG"
            bgColor="bg-warning-50"
            textColor="text-warning-300"
            borderColor="border-warning-300"
          /> -->
        </div>
      </div>
    </template>
    <template #content>
      <div class="pt-5">
        <div class="flex flex-row">
          <div class="basis-1/4">
            <p class="font-bold text-MD">Nama lengkap pasien</p>
            <p>REG1231235</p>
            <CustomButton class="w-24 h-5 text-sm">00-00-00</CustomButton>
            <CustomChip
              :showCheckedIcon="false"
              label="Laki-laki"
              bgColor="bg-male-75"
              textColor="text-male-300"
              customClass="h-5 pr-[6px] border-none mr-[5px] ml-2"
            />
            <!-- <CustomChip
              :showCheckedIcon="false"
              label="Perempuan"
              bgColor="bg-female-75"
              textColor="text-female-300"
              customClass="h-5 pr-[6px] border-none mr-[5px]"
            /> -->
          </div>
          <div class="bg-mediumGrey-300 w-[1px] h-[85px] mr-[20px]"></div>
          <div class="mt-[20px] mr-[40px]">
            <p class="text-xs font-bold underline underline-offset-2">Tgl. Lahir</p>
            <p class="">10 Januari 2090</p>
          </div>
          <div class="mt-[20px] mr-[40px]">
            <p class="text-xs font-bold underline underline-offset-2">Umur</p>
            <p class="">24Thn 2Bln 1Hari</p>
          </div>
          <div class="mt-[20px] mr-[40px]">
            <p class="text-xs font-bold underline underline-offset-2">Alergi</p>
            <p class="">Tidak Ada</p>
          </div>
        </div>
        <div class="grid grid-cols-3 mt-10">
          <div>
            <p class="font-bold underline underline-offset-2">KTP</p>
            <p>123123123123123123</p>
            <p class="mt-4 font-bold underline underline-offset-2">Provinsi</p>
            <p>Jawa Timur</p>
            <p class="mt-4 font-bold underline underline-offset-2">Kelurahan/Desa</p>
            <p>Kenjeran</p>
          </div>
          <div>
            <p class="font-bold underline underline-offset-2">No. Handphone</p>
            <p>081212341234</p>
            <p class="mt-4 font-bold underline underline-offset-2">Kabuptaen/Kota</p>
            <p>Surabaya</p>
            <p class="mt-4 font-bold underline underline-offset-2">RT/RW</p>
            <p>01/02</p>
          </div>
          <div>
            <p class="font-bold underline underline-offset-2">Agama</p>
            <p>Islam</p>
            <p class="mt-4 font-bold underline underline-offset-2">Kecamatan</p>
            <p>Kenjeran</p>
            <p class="mt-4 font-bold underline underline-offset-2">Kodepos</p>
            <p>12345</p>
          </div>
        </div>
        <div class="grid grid-cols-2 mt-4">
          <div>
            <p class="font-bold underline underline-offset-2">Alamat</p>
            <p>Jln. sukarno hatta no. 80</p>
          </div>
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
