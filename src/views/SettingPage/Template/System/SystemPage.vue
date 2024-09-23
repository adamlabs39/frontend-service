<script setup lang="ts">
import CustomChip from '@/components/Base/CustomChip.vue';
import GreenCard from '../GreenCard.vue';
import MainHeaderSetting from '../MainHeaderSetting.vue';
</script>

<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
            <MainHeaderSetting heading="System"/>
            
        </template>
        <template #content>
            <GreenCard  cardHeading="PPN"  :disableLine="true" showButton labelChip="HALOCUK"/>
            <CustomChip label="SEPERTINUA" bg-color="bg-adameds-300"
                                border-color="border-transparent" text-color="text-white" icon-color="text-white"/>
        </template>
    </Card>
</template>