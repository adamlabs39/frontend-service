<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import { epochToDate } from "@/utils/Helpers";
import type { PropType } from "vue";

const props = defineProps({
  history: {
    type: Object as PropType<any>,
    default: null,
  },
});
</script>

<template>
  <div v-if="history">
    <CustomAccordion headerClass="bg-adameds-50" :initialState="'0'">
      <template #header>
        {{ epochToDate(history.updatedAt, "date") || "Data Riwayat" }}
      </template>
      <template #content>
        <div class="py-5 flex flex-col gap-[10px]">
          <div class="font-semibold text-adameds-300 text-normal mb-[15px]">
            Tajam Penglihatan menggunakan Tes Uncorrected Snelled Chart
          </div>
          <CustomInfoRow
            label="Pemeriksaan Visus Kanan"
            :value="`${history.odVisusDenominator ?? '-'} / ${history.odVisusNumerator ?? '-'}`"
            type="vertical"
          />
          <hr class="border-adameds-300" />
          <CustomInfoRow
            label="Pemeriksaan Visus Kiri"
            :value="`${history.osVisusDenominator ?? '-'} / ${history.osVisusNumerator ?? '-'}`"
            type="vertical"
          />
          <hr class="-mx-4 border-grey-200 mt-[10px]" />

          <div class="font-semibold text-adameds-300 text-normal my-[15px]">
            Katarak
          </div>
          <CustomInfoRow
            label="Pemeriksaan Pinhole Kanan"
            :value="history.odHasilPinhole || '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Pemeriksaan Segment Anterior (Pupil) Kanan"
            :value="history.odPupilIsKatarak ? 'Curiga Katarak' : history.odSnomed || 'Kelainan Mata Lainnya'"
            type="vertical"
          />
          <hr class="border-adameds-300" />
          <CustomInfoRow
            label="Pemeriksaan Pinhole Kiri"
            :value="history.osHasilPinhole || '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Pemeriksaan Segment Anterior (Pupil) Kiri"
            :value="history.osPupilIsKatarak ? 'Curiga Katarak' : history.osSnomed || 'Kelainan Mata Lainnya'"
            type="vertical"
          />
          <hr class="-mx-4 border-grey-200 mt-[10px]" />

          <div class="font-semibold text-adameds-300 text-normal my-[15px]">
            Pemeriksaan dengan Oftalmoskop/Shadow test
          </div>
          <CustomInfoRow
            label="Pemeriksaan Reflek Fundus Kanan"
            :value="history.odFundus || '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Pemeriksaan Shadow Test Kanan"
            :value="history.odShadowTest || '-'"
            type="vertical"
          />
          <hr class="border-adameds-300" />
          <CustomInfoRow
            label="Pemeriksaan Reflek Fundus Kiri"
            :value="history.osFundus || '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Pemeriksaan Shadow Test Kiri"
            :value="history.osShadowTest || '-'"
            type="vertical"
          />
          <hr class="-mx-4 border-grey-200 mt-[10px]" />

          <div class="font-semibold text-adameds-300 text-normal my-[15px]">
            Kelainan Refraksi Mata Jauh
          </div>
          <div class="font-semibold underline text-normal">Mata Kanan</div>
          <div class="grid grid-cols-3 gap-y-[19px] mt-2">
            <CustomInfoRow label="Sph" :value="history.odSphJauh ?? '-'" type="vertical" />
            <CustomInfoRow label="Cyl" :value="history.odCyl ?? '-'" type="vertical" />
            <CustomInfoRow label="Axis" :value="history.odAxis ?? '-'" type="vertical" />
          </div>
          <div class="grid grid-cols-2 mt-2">
            <CustomInfoRow label="Visus Tajam" :value="`${history.odVisusTajamDenominator ?? '-'} / ${history.odVisusTajamNumerator ?? '-'}`" />
            <CustomInfoRow label="Hasil" :value="history.odHasilVisusTajam ?? '-'" />
          </div>
          <div class="font-semibold underline text-normal mt-4">Mata Kiri</div>
          <div class="grid grid-cols-3 gap-y-[19px] mt-2">
            <CustomInfoRow label="Sph" :value="history.osSphJauh ?? '-'" type="vertical" />
            <CustomInfoRow label="Cyl" :value="history.osCyl ?? '-'" type="vertical" />
            <CustomInfoRow label="Axis" :value="history.osAxis ?? '-'" type="vertical" />
          </div>
          <div class="grid grid-cols-2 mt-2">
            <CustomInfoRow label="Visus Tajam" :value="`${history.osVisusTajamDenominator ?? '-'} / ${history.osVisusTajamNumerator ?? '-'}`" />
            <CustomInfoRow label="Hasil" :value="history.osHasilVisusTajam ?? '-'" />
          </div>
          <hr class="-mx-4 border-grey-200 mt-[10px]" />

          <div class="font-semibold text-adameds-300 text-normal my-[15px]">
            Pemeriksaan Lanjutan (Jika Buta)
          </div>
          <CustomInfoRow
            label="Pemeriksaan Lanjutan Kanan"
            :value="history.odPemeriksaanLanjutan || '-'"
            type="vertical"
          />
          <hr class="border-adameds-300" />
          <CustomInfoRow
            label="Pemeriksaan Lanjutan Kiri"
            :value="history.osPemeriksaanLanjutan || '-'"
            type="vertical"
          />
          <hr class="-mx-4 border-grey-200 mt-[10px]" />

          <div class="font-semibold text-adameds-300 text-normal my-[15px]">
            Kelainan Refraksi Mata Dekat
          </div>
          <div class="font-semibold underline text-normal">Mata Kanan</div>
          <CustomInfoRow
            label="Koreksi Lensa addisi (Sph +)"
            :value="history.odSphDekat ?? '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Dicurigai Glaukoma"
            :value="history.odHasilGlaukoma || '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Dicurigai Retinopati"
            :value="history.odIsRetinopati ? 'Suspek Retinopati' : 'Normal'"
            type="vertical"
          />
          <div class="font-semibold underline text-normal mt-4">Mata Kiri</div>
          <CustomInfoRow
            label="Koreksi Lensa addisi (Sph +)"
            :value="history.osSphDekat ?? '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Dicurigai Glaukoma"
            :value="history.osHasilGlaukoma || '-'"
            type="vertical"
          />
          <CustomInfoRow
            label="Dicurigai Retinopati"
            :value="history.osIsRetinopati ? 'Suspek Retinopati' : 'Normal'"
            type="vertical"
          />

          <hr class="border-grey-200 mt-4" />
          <div class="flex justify-between">
            <CustomInfoRow
              label="Petugas Input"
              :value="history.petugas || '-'"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="String(epochToDate(history.updatedAt, 'time'))"
              type="vertical"
              alignment="right"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>
  </div>
  <div v-else class="text-center text-grey-400 p-4">Tidak ada riwayat.</div>
</template>