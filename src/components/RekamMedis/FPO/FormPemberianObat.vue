<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import FPOEditDialog from "./FPOEditDialog.vue";

const pemberianObat = ref<any[]>([]);

onMounted(() => {
  pemberianObat.value = [
    {
      tanggal: "01-01-2024",
      obat: [
        {
          prescriptionItemUuid: "",
          namaObat: "Paracetamol",
          sisaStok: "2",
          qtyOrder: "10",
          satuanPenggunaan: "2",
          caraPakai: "Setelah Makan",
          periodeUnit: "",
          periode: "",
          frekuensi: "2 x Sehari",
          dokterPemberiResep: "dr. Nama Dokter Sp. D",
          pemberian: [
            {
              waktuPemberian: "08:00",
              jamPemberian: "",
              qtyPemberian: "1",
              petugasPemberian: "Nama Petugas",
              catatan: "Lorem ipsum dolor sit amet.",
            },
            {
              waktuPemberian: "13:00",
              jamPemberian: "",
              qtyPemberian: "1",
              petugasPemberian: "Nama Petugas",
              catatan: "Lorem ipsum dolor sit amet.",
            },
          ],
        },
      ],
    },
    {
      tanggal: "13-11-2024",
      obat: [
        {
          prescriptionItemUuid: "",
          namaObat: "Paracetamol",
          sisaStok: "2",
          qtyOrder: "10",
          satuanPenggunaan: "2",
          caraPakai: "Setelah Makan",
          periodeUnit: "",
          periode: "",
          frekuensi: "2 x Sehari",
          dokterPemberiResep: "dr. Nama Dokter Sp. D",
          pemberian: [
            {
              waktuPemberian: "06:00",
              jamPemberian: "",
              qtyPemberian: "1",
              petugasPemberian: "Nama Petugas",
              catatan: "Lorem ipsum dolor sit amet.",
            },
            {
              waktuPemberian: "8:00",
              jamPemberian: "",
              qtyPemberian: "1",
              petugasPemberian: "Nama Petugas",
              catatan: "Lorem ipsum dolor sit amet.",
            },
          ],
        },
      ],
    },
  ];
});

const isEditDataDialogVisible = ref(false);

const dialogConfig = ref<any>({
  method: "add",
  title: "Tambah Data",
  data: null,
});

const openDialog = (data: any = null) => {
  dialogConfig.value = { data };
  isEditDataDialogVisible.value = true;
};
const closeDialog = () => {
  isEditDataDialogVisible.value = false;
};

const accordion = ref<HTMLCanvasElement | null>(null);
const open = () => {
  if (accordion.value) {
    (accordion.value as any).open();
  }
};
const close = () => {
  if (accordion.value) {
    (accordion.value as any).close();
  }
};

defineExpose({
  open,
  close,
});
</script>

<template>
  <CustomAccordion
    header-class="bg-adameds-50"
    initial-state="0"
    ref="accordion"
  >
    <template #header> RSP.0001 </template>
    <template #content>
      <div class="grid grid-cols-2 gap-5 pt-5">
        <!-- Looping untuk pemberianObat -->
        <div v-for="(item, itemIndex) in pemberianObat" :key="itemIndex">
          <!-- Looping untuk obat di dalam pemberianObat -->
          <div v-for="(obat, obatIndex) in item.obat" :key="obatIndex">
            <Card
              pt:root:class="border rounded-lg border-adameds-300"
              pt:body:class="h-full p-5"
              @click="openDialog(obat)"
              class="cursor-pointer"
            >
              <template #content>
                <div class="flex justify-between">
                  <div class="flex gap-2.5">
                    <CustomButton label="1" class="h-6 p-3 rounded" />
                    <div class="flex flex-col gap-2.5">
                      <div class="font-bold text-MD">{{ obat.namaObat }}</div>
                      <div class="flex items-center gap-2.5 text-SM">
                        {{ obat.frekuensi }}
                        <span
                          ><img src="@/assets/icons/Vector-arows.svg"
                        /></span>
                        {{ obat.satuanPenggunaan }} Gram
                      </div>
                      <div class="flex items-center gap-2.5 text-SM">
                        Jml. Order
                        <span
                          ><img src="@/assets/icons/Vector-arows.svg"
                        /></span>
                        {{ obat.qtyOrder }} Tablet
                      </div>
                      <CustomChip
                        :label="obat.caraPakai"
                        :showCheckedIcon="false"
                        border-color="border-adameds-300"
                        bg-color="bg-adameds-50"
                        text-color="text-adameds-300"
                        customClass="text-xs font-semibold cursor-auto h-5 max-w-fit"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col items-end justify-between">
                    <div class="font-semibold underline text-SM">
                      Dokter Pemberi Resep
                    </div>
                    <div class="text-SM text-grey-400">
                      {{ obat.dokterPemberiResep }}
                    </div>
                    <div class="text-SM flex gap-2.5">
                      <!-- Placeholder for icons, adjust as needed -->
                      <div
                        v-for="status in ['PA', 'SI', 'SO', 'MA', 'KH']"
                        :key="status"
                        class="flex max-w-fit h-[20px] items-center border border-adameds-300 rounded-[4px] overflow-hidden"
                      >
                        <div
                          class="w-full h-full px-2 font-semibold text-white bg-adameds-300"
                        >
                          {{ status }}
                        </div>
                        <div class="px-2 text-adameds-300">2</div>
                      </div>
                    </div>
                    <div class="text-SM">
                      Sisa Obat
                      <span class="font-bold">({{ obat.sisaStok }} Tab)</span>
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
        <FPOEditDialog
          v-model:isDialogVisible="isEditDataDialogVisible"
          :payload="dialogConfig.data"
          @close="closeDialog"
        />
      </div>
    </template>
  </CustomAccordion>
</template>
