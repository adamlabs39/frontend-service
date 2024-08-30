<script lang="ts" setup>
import { ref, computed } from 'vue';
import CustomAccordion from '@/components/Base/CustomAccordion.vue';

// Import gambar
import spontanMeresponOn from '@/assets/images/RekamMedis/Kesadaran/spontanMeresponOn.svg';
import spontanMeresponOff from '@/assets/images/RekamMedis/Kesadaran/spontanMeresponOff.svg';
import responSuaraOn from '@/assets/images/RekamMedis/Kesadaran/responSuaraOn.svg';
import responSuaraOff from '@/assets/images/RekamMedis/Kesadaran/responSuaraOff.svg';
import responNyeriOn from '@/assets/images/RekamMedis/Kesadaran/responNyeriOn.svg';
import responNyeriOff from '@/assets/images/RekamMedis/Kesadaran/responNyeriOff.svg';
import mataTidakResponOn from '@/assets/images/RekamMedis/Kesadaran/mataTidakResponOn.svg';
import mataTidakResponOff from '@/assets/images/RekamMedis/Kesadaran/mataTidakResponOff.svg';

const selectedOption = ref<number | null>(null);

const options = [
  {
    label: 'Spontan merespon',
    defaultImage: spontanMeresponOff,
    selectedImage: spontanMeresponOn,
  },
  {
    label: 'Ada respon dengan rangsang suara',
    defaultImage: responSuaraOff,
    selectedImage: responSuaraOn,
  },
  {
    label: 'Ada respon dengan rangsang nyeri',
    defaultImage: responNyeriOff,
    selectedImage: responNyeriOn,
  },
  {
    label: 'Tidak ada respon',
    defaultImage: mataTidakResponOff,
    selectedImage: mataTidakResponOn,
  },
];

const selectOption = (index: number) => {
  console.log('Selected option:', index); 
  // selectedOption.value = index;
  selectedOption.value = selectedOption.value === index ? null : index;

};

const getImageSrc = (index: number) => {
  return selectedOption.value === index
    ? options[index].selectedImage
    : options[index].defaultImage;
};

</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Kesadaran</template>
    <template #content>
      <div class="grid grid-cols-2 gap-6 pt-5">
        <div class="flex flex-col gap-5">
          <div class="font-semibold text-md">Mata (Respon Membuka Mata)</div>
          <div class="grid grid-cols-4">
            <div v-for="(option, index) in options" :key="index">
              <div class="flex flex-col gap-2.5 items-center text-center justify-center cursor-pointer">
                <img
                  :src="getImageSrc(index)"
                  alt="Response Image"
                  @click="selectOption(index)"
                />
                <div class="text-SM font-normal">{{ option.label }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-rows-4 gap-4 justify-items-center items-center">
          <div>01</div>
          <div>01</div>
          <div>09</div>
          <div>01</div>
          <div>01</div>
          <div>01</div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
