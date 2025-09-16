<script setup lang="ts">
import { computed } from "vue";
import { epochToDate, formatStringDate } from "@/utils/Helpers";

const props = defineProps({
  tiketAntrian: {
    default: Object,
  },
  showPrintButton: {
    type: Boolean,
    default: false,
  },
});

const displayNoAntrian = computed(() => {
  const adm = props.tiketAntrian?.noAntrianAdmisi;
  const poli = props.tiketAntrian?.noAntrianPoli;

  const hasValue = (v: any) =>
    !(
      v === null ||
      v === undefined ||
      (typeof v === "string" && v.trim() === "")
    );

  return hasValue(adm) ? adm : hasValue(poli) ? poli : "";
});

const handlePrint = () => {
  window.print();
};
</script>
<template>
  <Card class="overflow-hidden w-full h-[350px]">
    <template #content>
      <div class="flex gap-7 justify-between">
        <div class="space-y-3 w-full">
          <div class="font-bold leading-8 text-heading">
            Data Pasien
            <hr class="border-black border-1" />
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">No. RM</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.patient.noRm }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">No. Booking</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.kodeBooking }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">
              No. Registrasi
            </div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noReg }}
            </div>
          </div>
          <div
            class="grid p-0 grid-cols-[140px_auto_1fr]"
            v-if="tiketAntrian.noBPJS"
          >
            <div class="font-semibold leading-5 text-normal">No. BPJS</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.noBPJS }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">No. Identitas</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.patient.noIdentity }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">Nama</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.patient.name }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">Tgl. Lahir</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{
                formatStringDate(
                  tiketAntrian.patient.birthDetail.birthDate,
                  "date"
                )
              }}
            </div>
          </div>
          <div class="grid p-0 grid-cols-[140px_auto_1fr]">
            <div class="font-semibold leading-5 text-normal">Jenis Kelamin</div>
            <div class="px-3">:</div>
            <div class="font-normal leading-5 text-normal">
              {{ tiketAntrian.patient.gender }}
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="mb-4 font-bold leading-8 text-heading">
            Pelayanan
            <hr class="border-black border-1" />
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-normal underline-offset-4"
              >
                Poliklinik
              </div>
              <div class="font-bold leading-8 text-subheading text-adameds-300">
                {{ tiketAntrian.lokasi.name }}
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-normal underline-offset-4"
              >
                Dokter
              </div>
              <div class="font-bold leading-8 text-subheading text-adameds-300">
                <span v-if="tiketAntrian.practitioner.pegawai.firstTitle">{{
                  tiketAntrian.practitioner.pegawai.firstTitle
                }}</span>
                {{ tiketAntrian.practitioner.pegawai.nama }}
                <span v-if="tiketAntrian.practitioner.pegawai.lastTitle">{{
                  tiketAntrian.practitioner.pegawai.lastTitle
                }}</span>
              </div>
            </div>
            <div class="flex flex-col">
              <div
                class="font-normal leading-7 underline text-normal underline-offset-4"
              >
                Jadwal
              </div>
              <div class="font-bold leading-8 text-subheading text-adameds-300">
                {{ tiketAntrian.jadwalDokter.startTime }} -
                {{ tiketAntrian.jadwalDokter.endTime }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex relative justify-center items-center w-3/4 h-[420px]">
          <div class="absolute right-0 -top-16">
            <img src="../../assets/icons/Rectangle 1023.svg" alt="" />
            <div
              class="flex absolute top-14 gap-2 flex-col justify-center items-center w-full"
            >
              <!-- Tombol Print hanya tampil jika showPrintButton = true -->
              <button
                v-if="showPrintButton"
                type="button"
                @click="handlePrint"
                class="inline-flex items-center gap-2 px-10 py-2 rounded-xl bg-white text-adameds-300 shadow-md hover:opacity-90 transition"
                aria-label="Print tiket antrian"
              >
                <PhPrinter :size="32" color="#14B8A6" weight="fill" />
                <span class="font-bold">Print</span>
              </button>
              <div
                class="flex justify-center items-center w-48 border-b-2 border-dashed"
              >
                <div class="mx-5 my-4 text-center">
                  <div class="font-bold leading-8 text-white text-subheading">
                    No. Antrian
                    <span v-if="tiketAntrian.noAntrianAdmisi">loket</span>
                  </div>
                  <hr />
                  <div
                    class="mt-1 text-sm font-normal leading-7 text-white opacity-85"
                  >
                    {{ epochToDate(tiketAntrian.tanggalCheckin, "dateTime") }}
                  </div>
                </div>
              </div>
              <div class="text-[34px] font-bold leading-10 text-white mt-6">
                {{ displayNoAntrian }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
