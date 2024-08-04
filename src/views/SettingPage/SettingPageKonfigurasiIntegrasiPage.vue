<script setup lang="ts">

import CardSettingTemplate from './Template/CardSettingTemplate.vue';
import MainHeaderSetting from './Template/MainHeaderSetting.vue';
import KonfigurasiVCLAIM from './Template/KonfigurasiIntegrasi/KonfigurasiVCLAIM.vue';
import KonfigurasiLainnya from './Template/KonfigurasiIntegrasi/KonfigurasiLainnya.vue';
</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Konfigurasi Internal"/>
        <CardSettingTemplate cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass showButton labelButton="Edit">
            <KonfigurasiVCLAIM/>
        </CardSettingTemplate>
        <CardSettingTemplate cardHeading="Konfigurasi Lainnya" hrEnableCustomClass showButton labelButton="Edit" showChip>
            <KonfigurasiLainnya/>
        </CardSettingTemplate>
    </div>
</template>