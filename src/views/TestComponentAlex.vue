<script setup lang="ts">
import FormAlergi from "@/components/RekamMedis/Alergi/FormAlergi.vue";
import FormAsesmenNyeri from "@/components/RekamMedis/AsesmenNyeri/FormAsesmenNyeri.vue";
import FormTandaVital from "@/components/RekamMedis/TandaVital/FormTandaVital.vue";
import FormCatatanPerawat from "@/components/RekamMedis/CatatanPerawat/FormCatatanPerawat.vue";
import FormDiagnosaDokterICD10 from "@/components/RekamMedis/DiagnosaDokter/FormDiagnosaDokterICD10.vue";
import Anamnesis from "@/components/RekamMedis/Anamnesis/Anamnesis.vue";

import AnamnesisIGD from "@/components/RekamMedis/AnamnesisIGD/AnamnesisIGD.vue";
import Triase from "@/components/RekamMedis/Triase/Triase.vue";
import riwayatPerpindahanBed from "@/components/RekamMedis/Perpindahan/riwayatPerpindahanBed.vue";
import FormPerpindahan from "@/components/RekamMedis/Perpindahan/FormPerpindahan.vue";

import FormEvaluation from "@/components/Fisioterapi/Evaluation/FormEvaluation.vue";
import FormImplementation from "@/components/Fisioterapi/Implementation/FormImplementation.vue";
import FormReassesment from "@/components/Fisioterapi/Reassesment/FormReassesment.vue";
</script>

<template>
  <div class="flex flex-col h-screen gap-4 m-4 overflow-scroll">
    <h1 class="font-bold">component Adam</h1>
    <FormAlergi />
    <FormTandaVital />
    <FormAsesmenNyeri />
    <FormCatatanPerawat />
    <FormDiagnosaDokterICD10 />
    <br />
    <h1 class="font-bold">component Naya</h1>
    <Anamnesis />
    <br />
    
    <h1 class="font-bold">component Alex</h1>
    <AnamnesisIGD />
    <Triase />
    <riwayatPerpindahanBed />
    <FormPerpindahan />

    <h1 class="font-bold">component Alex - Fisioterapi</h1>
    <FormImplementation />
    <FormEvaluation />
    <FormReassesment />
  </div>
</template>
