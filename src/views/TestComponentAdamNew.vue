<script setup lang="ts">
import FormAlergi from '@/components/RekamMedis/Alergi/FormAlergi.vue';
import FormAsesmenNyeri from '@/components/RekamMedis/AsesmenNyeri/FormAsesmenNyeri.vue';
import FormTandaVital from '@/components/RekamMedis/TandaVital/FormTandaVital.vue';
import FormCatatanPerawat from '@/components/RekamMedis/CatatanPerawat/FormCatatanPerawat.vue';
import FormDiagnosaDokterICD10 from '@/components/RekamMedis/DiagnosaDokter/FormDiagnosaDokterICD10.vue';
import FormOrderObat from '@/components/RekamMedis/OrderObat/FormOrderObat.vue';
import FormOrderFisio from '@/components/RekamMedis/OrderFisio/FormOrderFisio.vue';
import FormOrderAlkes from '@/components/RekamMedis/OrderAlkes/FormOrderAlkes.vue';
import FormPersetujuanPasien from '@/components/RekamMedis/PersetujuanPasien/FormPersetujuanPasien.vue';
</script>

<template>
    <div class="flex flex-col h-screen gap-4 m-4 overflow-scroll">
        <FormAlergi/>
         <FormTandaVital/>
         <FormAsesmenNyeri/>
         <FormCatatanPerawat/>
         <FormDiagnosaDokterICD10/>
         <FormOrderObat/>
         <FormOrderFisio/>
         <FormOrderAlkes/>
         <FormPersetujuanPasien/>
    </div>
</template>