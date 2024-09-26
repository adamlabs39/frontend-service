<script setup lang="ts">
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import { utilsStore } from "@/stores/utils";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomRadio from "@/components/Base/CustomRadio.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
  isDetail: {
    type: Boolean,
    required: false,
  },
});

const perpindahan = ref([
  {
    asalBed: "Melati",
    kelasBed: "Kelas 3",
    nomorBed: "Bed 1",
  },
]);

const tipePerpindahan = ref([
  { name: "Bed", key: "B" },
  { name: "Ruangan", key: "R" },
]);
const radioPerpindahan = ref();

const keterangan = ref();

const tambahan = ref(false);
const selectedTambahan = ref([]);

const storeUtils = utilsStore();

onMounted(() => {
  console.log(storeUtils.selectedRoom);
  if (storeUtils.selectedRoom) {
    selectedBed.value.push(`${storeUtils.selectedRoom.bed}`);
    storeUtils.setSelectedRoom(null);
  }
});

const selectedBed = ref<string[]>([]);

const kelas = ref([
  { id: "K1", kelas: "Kelas 1" },
  { id: "K2", kelas: "Kelas 2" },
  { id: "K3", kelas: "Kelas 3" },
  { id: "K4", kelas: "Kelas 4" },
]);
const kategoriRuangan = ref([
  { id: "R1", ruangan: "Rawatan Umum" },
  { id: "R2", ruangan: "Ruang Operasi" },
  { id: "R3", ruangan: "Ruang Radiologi" },
  { id: "R4", ruangan: "Ruang Pemeriksaan Umum" },
]);

const selectedKelas = ref("");
const selectedKategori = ref("");
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Perpindahan</template>
    <template #content>
      <div v-if="props.method == 'form'" class="gap-[30px] py-3">
        <div class="grid grid-cols-12 gap-2 py-4">

          <div class="flex items-start col-span-6 gap-4">
            <div class="mt-3">
              <div class="mb-2 text-xs font-semibold text-gray-600 underline">
                Bed Yang Ditempati Saat Ini
              </div>
              <div class="text-lg font-bold text-gray-900">
                {{ perpindahan[0].asalBed }} - {{ perpindahan[0].kelasBed }} -
                {{ perpindahan[0].nomorBed }}
              </div>
            </div>

            <div class="flex flex-col justify-end ml-auto mr-4 space-y-3">
              <div class="font-bold text-gray-900 text-MD">
                Tipe Perpindahan
              </div>
              <div class="flex gap-4">
                <div
                  v-for="items of tipePerpindahan"
                  :key="items.key"
                  class="flex items-center gap-2.5"
                >
                  <CustomRadio
                    v-model="radioPerpindahan"
                    :value="items.key"
                    :title="items.name"
                    :disabled="false"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="border-l-[2px] border-gray-100 pl-[15px] col-span-6 mr-4">
            <CustomTextArea
              v-model="keterangan"
              label="Keterangan"
              placeholder="Keterangan"
              class="w-full ml-3"
            />
          </div>
        </div>

        <hr class="my-4 border-grey-200" />

        <div v-if="radioPerpindahan === 'R'">
          <div class="grid grid-cols-5 gap-x-[30px] my-6">
            <CustomSelect
            label="Kelas"
            v-model="selectedKelas"
            :options="kelas"
            optionValue="id"
            optionLabel="kelas"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Kelas"
            customSelectClass="border-[#C7CBD2]"
          />
          <CustomSelect
            label="Kategori Ruangan"
            v-model="selectedKategori"
            :options="kategoriRuangan"
            optionValue="id"
            optionLabel="ruangan"
            :isLoading="false"
            :invalid="false"
            invalidMessage="Wajib diisi"
            :disabled="false"
            placeHolder="Pilih Kategori Ruangan"
            customSelectClass="border-[#C7CBD2]"
            class="col-span-4"
          />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-x-[15px]">
          <div class="items-start col-span-2 gap-4">
            <div class="flex mb-2 font-bold">
              <div class="mr-1 text-adameds-300">Mawar</div>
              <div>> Pilih Bed</div>
            </div>
            <div class="grid grid-cols-2 gap-[10px]">
              <CustomCheckbox
                v-for="(data, index) in ['1', '2', '3', '4', '5', '6']"
                v-model="selectedBed"
                :title="
                  selectedBed[0] == data || data == '2' || data == '4'
                    ? 'Nama Lengkap Pasien'
                    : '-'
                "
                :subTitle="'Bed ' + data"
                :endText="
                  selectedBed[0] == data
                    ? 'Terpilih'
                    : data == '2' || data == '4'
                    ? 'Terisi'
                    : 'Kosong'
                "
                :key="data + index"
                :binary="false"
                :value="`${data}`"
                :multiple="false"
                :disabled="data == '2' || data == '4' || isDetail"
              />
            </div>

            <div v-if="tambahan">
              <div class="flex mt-4 mb-2 font-bold">
                <div class="mr-1 text-adameds-300">Mawar</div>
                <div>> Pilih Bed - Bed Cadangan</div>
              </div>
              <div class="grid grid-cols-2 col-span-2 gap-[10px]">
                <CustomCheckbox
                  v-for="(data, index) in ['Cadangan 1', 'Cadangan 2']"
                  v-model="selectedTambahan"
                  title="-"
                  :subTitle="'Box ' + data"
                  endText="Kosong"
                  :key="data + index"
                  :binary="false"
                  :value="`${data}`"
                  :multiple="false"
                  :disabled="isDetail"
                />
              </div>
            </div>
          </div>
          <div class="border-l-[2px] border-gray-100 pl-[15px]">
            <CustomSwitch
              v-model="tambahan"
              label="Tambahan"
              sideLabel="Bed Cadangan"
              sideLabelTrue="Bed Cadangan"
            />
          </div>
        </div>
      </div>

      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <hr class="border-grey-200" />
        <CustomInfoRow label="" value="" />
      </div>
    </template>
    <!-- <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-adameds-300"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-adameds-300"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton v-if="props.method == 'detail'" label="Edit" />
      </div>
    </template> -->
  </CustomAccordion>
</template>