<script setup lang="ts">
import GreenCard from "../GreenCard.vue";
import MainHeaderSetting from "../MainHeaderSetting.vue";
import FormEditKonfigurasiVCLAIM from "../KonfigurasiIntegrasi/FormEditKonfigurasiVCLAIM.vue";
import FormEditKonfigurasiLainnya from "./FormEditKonfigurasiLainnya.vue";


</script>

<template>
      <div class="bg-white rounded-lg shadow-md">
            <MainHeaderSetting heading="Konfigurasi Integrasi" />
            <GreenCard cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass>
                  <FormEditKonfigurasiVCLAIM />
            </GreenCard>
            <GreenCard cardHeading="Konfigurasi Lainnya" hrEnableCustomClass class="mb-4">
                  <FormEditKonfigurasiLainnya />
            </GreenCard>
      </div>
</template>

<style lang="scss" scoped></style>
