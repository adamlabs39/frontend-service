<script setup lang="ts">
import FormAlergi from '@/components/RekamMedis/Alergi/FormAlergi.vue';
import FormAsesmenNyeri from '@/components/RekamMedis/AsesmenNyeri/FormAsesmenNyeri.vue';
import FormTandaVital from '@/components/RekamMedis/TandaVital/FormTandaVital.vue';
</script>

<template>
    <div class="flex flex-col h-screen gap-4 m-4 overflow-scroll">
        <FormAlergi/>
         <FormTandaVital/>
         <FormAsesmenNyeri/>
        
    </div>
</template>