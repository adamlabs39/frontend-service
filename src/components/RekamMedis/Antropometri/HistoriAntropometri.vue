<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <CustomInfoRow label="Berat Badan" type="vertical">
          <template #value>
            <div>{{ `beratBadan` }} Kg</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Tinggi Badan" type="vertical">
          <template #value>
            <div>{{ `tinggiBadan` }} Cm</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="IMT" type="vertical">
          <template #value>
            <div>{{ `IMT` }} Kg/m²</div>
          </template>
        </CustomInfoRow>
        <CustomInfoRow label="Catatan" :value="`catatan`" type="vertical" />
        <hr class="border-grey-200" />
        <div class="flex justify-between">
          <CustomInfoRow
            label="Petugas Input"
            :value="`petugas`"
            type="vertical"
          />
          <CustomInfoRow
            label="Jam Input"
            :value="`petugas`"
            type="vertical"
            alignment="right"
          />
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
