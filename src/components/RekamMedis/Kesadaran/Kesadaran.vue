<script lang="ts" setup>
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Kesadaran</template>
    <template #content>
      <div class="grid grid-cols-2 gap-[30px] mt-5">
        <div class="flex flex-col ">
          <div>Mata (Respon Membuka Mata)</div>
          <div class="grid grid-cols-4 justify-items-center mb-5 mx-5">
            <div class="flex flex-col gap-2.5 items-center text-center">
              <div class="py-7">
                <img
                  src="@/assets/images/RekamMedis/Kesadaran/spontanMeresponOn.svg"
                  alt=""
                  srcset=""
                />
              </div>
              <div>Spontan Merespon</div>
            </div>
            <div class="flex flex-col gap-2.5">
              <div class="py-7">
                <img
                  src="@/assets/images/RekamMedis/Kesadaran/spontanMeresponOn.svg"
                  alt=""
                  srcset=""
                />
              </div>
              <div>Spontan<br />Merespon</div>
            </div>
            <div class="flex flex-col gap-2.5">
              <div class="py-7">
                <img
                  src="@/assets/images/RekamMedis/Kesadaran/spontanMeresponOn.svg"
                  alt=""
                  srcset=""
                />
              </div>
              <div>Spontan<br />Merespon</div>
            </div>
            <div class="flex flex-col gap-2.5">
              <div class="py-7">
                <img
                  src="@/assets/images/RekamMedis/Kesadaran/spontanMeresponOn.svg"
                  alt=""
                  srcset=""
                />
              </div>
              <div>Spontan<br />Merespon</div>
            </div>
          </div>
        </div>
        <div
          class="grid grid-rows-4 grid-flow-col gap-4 justify-items-center items-center"
        >
          <div>01</div>
          <div>01</div>
          <div>09</div>
          <div>01</div>
          <div>01</div>
          <div>01</div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
