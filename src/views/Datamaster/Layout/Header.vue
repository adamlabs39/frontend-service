<script lang="ts" setup>
import CustomAccordion from '@/components/Base/CustomAccordion.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomChip from '@/components/Base/CustomChip.vue';
import CustomTextfield from '@/components/Base/CustomTextfield.vue';

const props=defineProps({
  title:{
    type:String,
    default:"Title"
  },
  filter:{
    type:Boolean,
    default:true
  },
  search:{
    type:Boolean,
    default:true
  }
})

</script>
<template>
  <CustomAccordion :openWithHeader="false">
    <template #collapseIcon>
      <CustomButton label="" icon="PhCaretUp" />
    </template>
    <template #expandIcon>
      <CustomButton label="" icon="PhCaretDown" />
    </template>
    <template #header>
      <div class="flex  items-center justify-between w-full gap-5 mr-2.5">
        <CustomButton label="" icon="PhArrowClockwise" />
        <div
          class="grow font-semibold text-heading text-adameds-300 leading-[30px]"
        >
          {{ title }}
        </div>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-2.5 mt-2.5">
          <CustomTextfield v-if="search"
            :label="`Cari ${title}`" 
            prependIcon="PhMagnifyingGlass"
            :placeholder="`Cari ${title}`"
          >
        </CustomTextfield>
        <slot name="content"></slot>
        <div v-if="filter" class="flex items-center gap-2.5">
          <div class="min-w-32 border-r-[0.71px] font-semibold text-xs text-grey-300">Filter Status</div>
          <CustomChip
            label="AKTIF"
            textColor="text-[#80868d]"
            selected-border-color="border-white bg-[#14B8A6]"
            icon-color="#80868d"
            customClass="text-xs font-semibold cursor-pointer border border-grey-400 h-6 flex"
          />
          <CustomChip
            label="NON-AKTIF"
            textColor="text-[#80868d]"
            selected-border-color="border-white bg-[#14B8A6]"
            icon-color="#80868d"
            customClass="text-xs font-semibold cursor-pointer border border-grey-400 h-6 flex"
          />
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
