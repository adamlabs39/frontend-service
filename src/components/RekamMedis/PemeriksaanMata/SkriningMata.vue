<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const segmentAnteriorKanan = ref("");
const segmentAnteriorKiri = ref("");
</script>

<template>
  <CustomAccordion ref="accordion" headerClass="bg-adameds-50">
    <template #header>Skrining Mata</template>
    <template #content>
      <div class="pt-5">
        <!-- Tajam Penglihatan -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Tajam Penglihatan menggunakan Tes Uncorrected Snelled Chart
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr_min-content_1fr_min-content_1fr]"
          >
            <CustomInputNumber label="Pemeriksaan Visus Kanan" />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
            <CustomInputNumber :showLabel="false" class="mt-auto" />
            <div class="border border-gray-200 mx-[35px]"></div>
            <CustomInputNumber label="Pemeriksaan Visus Kiri" />
            <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
            <CustomInputNumber :showLabel="false" class="mt-auto" />
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow label="Pemeriksaan Visus Kanan" value="-" />
              <hr class="border-adameds-300" />
              <CustomInfoRow label="Pemeriksaan Visus Kiri" value="-" />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Katarak -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Katarak
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Pinhole Kanan
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber :showLabel="false" class="" />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber :showLabel="false" class="mt-auto" />
                </div>
              </div>
              <CustomTextfield
                :showLabel="false"
                placeholder="Hasil Pemeriksaan Pinhole Kanan"
                class="mt-auto"
                readOnly
              />
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Segment Anterior (Pupil) Kanan
                </label>
                <div class="flex">
                  <CustomRadio
                    v-model="segmentAnteriorKanan"
                    value="curigaKatarak"
                    sideLabel="Curiga Katarak"
                    class="mr-5"
                  />
                  <CustomRadio
                    v-model="segmentAnteriorKanan"
                    value="lainya"
                    sideLabel="Kelainan Mata Lainnya"
                  />
                </div>
              </div>
              <CustomSelect
                v-if="segmentAnteriorKanan == 'lainya'"
                :showLabel="false"
                placeHolder="Kelainan Mata Lain (Snomed-CT)"
                class="col-span-2"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Pinhole Kiri
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber :showLabel="false" class="" />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber :showLabel="false" class="mt-auto" />
                </div>
              </div>
              <CustomTextfield
                :showLabel="false"
                placeholder="Hasil Pemeriksaan Pinhole Kiri"
                class="mt-auto"
                readOnly
              />
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Pemeriksaan Segment Anterior (Pupil) Kiri
                </label>
                <div class="flex">
                  <CustomRadio
                    v-model="segmentAnteriorKiri"
                    value="curigaKatarak"
                    sideLabel="Curiga Katarak"
                    class="mr-5"
                  />
                  <CustomRadio
                    v-model="segmentAnteriorKiri"
                    value="lainya"
                    sideLabel="Kelainan Mata Lainnya"
                  />
                </div>
              </div>
              <CustomSelect
                v-if="segmentAnteriorKiri == 'lainya'"
                :showLabel="false"
                placeHolder="Kelainan Mata Lain (Snomed-CT)"
                class="col-span-2"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow label="Pemeriksaan Pinhole Kanan" value="-" />
              <CustomInfoRow
                label="Pemeriksaan Segment Anterior (Pupil) Kanan*"
                value="-"
              />
              <hr class="border-adameds-300" />
              <CustomInfoRow label="Pemeriksaan Pinhole Kiri" value="-" />
              <CustomInfoRow
                label="Pemeriksaan Segment Anterior (Pupil) Kiri*"
                value="-"
              />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Jika Pemeriksaan Pupil -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Jika Pemeriksaan Pupil hasilnya Positif, maka dilanjutkan
            pemeriksaan dengan Oftalmoskop/Shadow test
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div>
              <CustomSelect
                label="Pemeriksaan Refleks Fundus Kanan"
                placeHolder="Pilih Pemeriksaan Refleks Fundus Kanan"
                class="mb-5"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
              <CustomSelect
                label="Pemeriksaan Shadow Test Kanan"
                placeHolder="Pilih Pemeriksaan Shadow Test Kanan"
                class=""
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div>
              <CustomSelect
                label="Pemeriksaan Refleks Fundus Kiri"
                placeHolder="Pilih Pemeriksaan Refleks Fundus Kiri"
                class="mb-5"
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
              <CustomSelect
                label="Pemeriksaan Shadow Test Kiri"
                placeHolder="Pilih Pemeriksaan Shadow Test Kiri"
                class=""
                optionLabel=""
                optionValue=""
                :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
              />
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow
                label="Pemeriksaan Reflek Fundus Kanan"
                value="-"
              />
              <CustomInfoRow label="Pemeriksaan Shadow Test Kanan" value="-" />
              <hr class="border-adameds-300" />
              <CustomInfoRow label="Pemeriksaan Reflek Fundus Kiri" value="-" />
              <CustomInfoRow label="Pemeriksaan Shadow Test Kiri" value="-" />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Kelainan Refraksi Mata -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Kelainan Refraksi Mata Jauh
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kanan
              </label>
              <CustomInputNumber label="Sph" class="mb-5" />
              <CustomInputNumber label="Cyl" class="mb-5" />
              <CustomInputNumber label="Axis" class="mb-5" />
              <div class="grid grid-cols-2">
                <label
                  class="block font-semibold mb-[5px] text-normal col-span-2"
                >
                  Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kanan
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber :showLabel="false" class="" />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber :showLabel="false" class="mt-auto" />
                </div>
                <CustomTextfield
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Visus Tajam"
                  class="mt-auto ml-5"
                  readOnly
                />
              </div>
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kiri
              </label>
              <CustomInputNumber label="Sph" class="mb-5" />
              <CustomInputNumber label="Cyl" class="mb-5" />
              <CustomInputNumber label="Axis" class="mb-5" />
              <div class="grid grid-cols-2">
                <label
                  class="block font-semibold mb-[5px] text-normal col-span-2"
                >
                  Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kiri
                </label>
                <div class="grid grid-cols-[1fr_min-content_1fr]">
                  <CustomInputNumber :showLabel="false" class="" />
                  <span class="text-adameds-300 mx-[30px] mt-auto mb-2">/</span>
                  <CustomInputNumber :showLabel="false" class="mt-auto" />
                </div>
                <CustomTextfield
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Visus Tajam"
                  class="mt-auto ml-5"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kanan
              </div>
              <div class="grid grid-cols-2 gap-y-[19px]">
                <CustomInfoRow label="Sph" value="-" />
                <CustomInfoRow label="Cyl" value="-" />
                <CustomInfoRow label="Axis" value="-" />
              </div>
              <div class="font-semibold underline text-normal">
                Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kanan
              </div>
              <div class="grid grid-cols-2">
                <CustomInfoRow label="Nilai" value="-" />
                <CustomInfoRow label="Hasil" value="-" />
              </div>
              <hr class="border-adameds-300" />
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Subjektif Jauh Mata Kiri
              </div>
              <div class="grid grid-cols-2 gap-y-[19px]">
                <CustomInfoRow label="Sph" value="-" />
                <CustomInfoRow label="Cyl" value="-" />
                <CustomInfoRow label="Axis" value="-" />
              </div>
              <div class="font-semibold underline text-normal">
                Pemeriksaan Visus Tajam Penglihatan Jarak Jauh Mata Kiri
              </div>
              <div class="grid grid-cols-2">
                <CustomInfoRow label="Nilai" value="-" />
                <CustomInfoRow label="Hasil" value="-" />
              </div>
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Jika hasil pemeriksaan adalah buta -->
        <div
          class="border-adameds-300 rounded-[10px] mb-[30px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Jika hasil pemeriksaan adalah buta, maka dilakukan pemeriksaan
            lanjutan
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <CustomSelect
              label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kanan"
              placeHolder="Pilih Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kanan"
              class="mb-5"
              optionLabel=""
              optionValue=""
              :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
            />
            <div class="border border-gray-200 mx-[35px]"></div>
            <CustomSelect
              label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kiri"
              placeHolder="Pilih Pemeriksaan Lanjutan Jika Dinyatakan Buta Mata Kiri"
              class="mb-5"
              optionLabel=""
              optionValue=""
              :options="['dr. Budi', 'dr. Ali', 'dr. Doom']"
            />
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <CustomInfoRow
                label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Warna Kanan"
                value="-"
              />
              <hr class="border-adameds-300" />
              <CustomInfoRow
                label="Pemeriksaan Lanjutan Jika Dinyatakan Buta Warna Kiri"
                value="-"
              />
            </div>
            <hr class="-mx-4 border-grey-200 mt-[10px]" />
          </div>
        </div>
        <!-- Kelainan Refraksi Mata Dekat -->
        <div
          class="border-adameds-300 rounded-[10px]"
          :class="[method == 'form' ? 'border p-5' : '']"
        >
          <div class="font-semibold text-adameds-300 text-normal mb-[30px]">
            Kelainan Refraksi Mata Dekat
          </div>
          <div
            v-if="method == 'form'"
            class="grid grid-cols-[1fr_min-content_1fr]"
          >
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Dekat Mata Kanan
              </label>
              <CustomInputNumber
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +)"
                class="mb-5"
              />
              <div class="grid grid-cols-2 mb-5 gap-x-5">
                <label
                  class="block col-span-2 mb-[5px] font-semibold text-normal"
                >
                  Dicurigai Glaukoma pada Mata Kanan
                </label>
                <CustomInputNumber :showLabel="false" class="" />
                <CustomTextfield
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Glukoma"
                  class="mt-auto"
                  readOnly
                />
              </div>
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Dicurigai Retinopati pada Mata Kanan
                </label>
                <div class="flex">
                  <CustomRadio value="normal" sideLabel="Normal" class="mr-5" />
                  <CustomRadio
                    value="suspekRetinopati"
                    sideLabel="Suspek Retinopati"
                  />
                </div>
              </div>
            </div>
            <div class="border border-gray-200 mx-[35px]"></div>
            <div>
              <label class="block mb-5 font-semibold text-normal">
                Pemeriksaan Refraksi Dekat Mata Kiri
              </label>
              <CustomInputNumber
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +)"
                class="mb-5"
              />
              <div class="grid grid-cols-2 mb-5 gap-x-5">
                <label
                  class="block col-span-2 mb-[5px] font-semibold text-normal"
                >
                  Dicurigai Glaukoma pada Mata Kiri
                </label>
                <CustomInputNumber :showLabel="false" class="" />
                <CustomTextfield
                  :showLabel="false"
                  placeholder="Hasil Pemeriksaan Glukoma"
                  class="mt-auto"
                  readOnly
                />
              </div>
              <div class="col-span-2">
                <label class="block font-semibold mb-[5px] text-normal">
                  Dicurigai Retinopati pada Mata Kiri
                </label>
                <div class="flex">
                  <CustomRadio value="normal" sideLabel="Normal" class="mr-5" />
                  <CustomRadio
                    value="suspekRetinopati"
                    sideLabel="Suspek Retinopati"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex flex-col gap-[19px]">
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Dekat Mata Kanan
              </div>
              <CustomInfoRow
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +) Kanan"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Glaukoma pada mata Kanan"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Retinopati pada Mata Kanan"
                value="-"
              />
              <hr class="border-adameds-300" />
              <div class="font-semibold underline text-normal">
                Pemeriksaan Refraksi Dekat Mata Kiri
              </div>
              <CustomInfoRow
                label="Koreksi Lensa addisi untuk penglihatan dekat (Sph +) Kiri"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Glaukoma pada mata Kiri"
                value="-"
              />
              <CustomInfoRow
                label="Dicurigai Retinopati pada Mata Kiri"
                value="-"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
