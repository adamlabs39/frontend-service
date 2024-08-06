<script lang="ts" setup>
import CustomAccordion from '../Base/CustomAccordion.vue';
</script>
<template>
    <CustomAccordion headerClass="">
      <template #header>
        <div class="flex justify-end w-full pr-5">
            <div class="grow">Komponen Tarif</div>
            <div class="min-w-[100px]">Persen (%)</div>
            <div class="min-w-[250px] flex justify-end">Total</div>
        </div>
      </template>
      <template #content>
        <div class="py-2.5 flex justify-end w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit
          corrupti ad qui, ex atque dolore quidem suscipit? Pariatur sint in
          deleniti laudantium alias voluptas sapiente veniam molestias eligendi
          nihil.
        </div>
      </template>
    </CustomAccordion>
</template>