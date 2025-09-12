<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import { useRoute, useRouter } from "vue-router";
import TiketAntrian from "@/components/Antrian/TiketAntrian.vue";
import { onMounted, ref } from "vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";

const router = useRouter();
const route = useRoute();

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};
// const handleBack = () => {
//   router.push("/antrian/apm/aktif/pasien/jkn");
// };

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
});

const tiketAntrian = ref({
  noRM: "00-00-00",
  noBooking: "63DJ83",
  noRegistrasi: "REG2407010049",
  noBPJS: "523214315123123",
  nik: "327012371204102",
  nama: "Nama Lengkap Pasien Jika Panjang",
  tanggalLahir: "01 Januari 2000",
  gender: "Laki-laki",
  namaPoli: "Poli Anak",
  dokter: "dr. Nama Dokter",
  jadwal: "07:00 - 10:00",
  tanggal: "10 Jan 2024",
  noAntri: "PD-02-01",
});

const formatDateId = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return iso;
  }
};

const mapGender = (g?: string) => {
  if (!g) return "";
  const m = g.toLowerCase();
  if (m === "male") return "Laki-laki";
  if (m === "female") return "Perempuan";
  return g;
};

const getTiketData = ref();

onMounted(() => {
  // Log response dari apmSucces.txt
  if (route.query.data) {
    try {
      const responseData = JSON.parse(
        decodeURIComponent(route.query.data as string)
      );
      console.log("APM Success Response (apmSucces.txt):", responseData);
      getTiketData.value = responseData;
      console.log(getTiketData.value);

      // // Update tiket antrian dengan data dari response
      // if (responseData) {
      //   tiketAntrian.value = {
      //     noRM: responseData.patient?.no_rm || "00-00-00",
      //     noBooking: responseData.kode_booking || "63DJ83",
      //     noRegistrasi: responseData.no_reg || "REG2407010049",
      //     noBPJS: "", // Tidak ada di response
      //     nik: responseData.patient?.no_identity || "327012371204102",
      //     nama:
      //       responseData.patient?.name || "Nama Lengkap Pasien Jika Panjang",
      //     tanggalLahir:
      //       formatDateId(responseData.patient?.birth_detail?.birth_date) ||
      //       "01 Januari 2000",
      //     gender: mapGender(responseData.patient?.gender) || "Laki-laki",
      //     namaPoli: responseData.lokasi?.name || "Poli Anak",
      //     dokter: `${
      //       responseData.practitioner?.pegawai?.first_title || "dr."
      //     } ${responseData.practitioner?.pegawai?.nama || "Nama Dokter"} ${
      //       responseData.practitioner?.pegawai?.last_title || ""
      //     }`.trim(),
      //     jadwal: `${responseData.jadwal_dokter?.start_time || "07:00"} - ${
      //       responseData.jadwal_dokter?.end_time || "10:00"
      //     }`,
      //     tanggal: new Date().toLocaleDateString("id-ID", {
      //       day: "2-digit",
      //       month: "short",
      //       year: "numeric",
      //     }),
      //     noAntri: responseData.no_antrian_poli || "PD-02-01",
      //   };
      // }
    } catch (error) {
      console.error("Error parsing response data:", error);
    }
  }
});
</script>

<template #body>
  <div class="flex flex-col py-5 w-full min-h-screen">
    <div
      class="flex relative z-10 gap-5 justify-between py-0 pr-5 mx-3 rounded-xl shadow-md bg-adameds-300 max-md:flex-wrap"
    >
      <NavbarAntrian />
    </div>
    <div class="flex relative flex-1 justify-center items-center mx-36">
      <div
        class="flex overflow-hidden flex-col justify-center w-full rounded-3xl"
      >
        <div
          class="bg-white bg-opacity-30 w-full h-[540px] items-center justify-center"
        >
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="flex justify-between w-48 h-10 bg-white rounded-xl shadow-md"
            >
              <div
                class="flex gap-2 items-center text-sm leading-5 whitespace-nowrap text-adameds-300"
              >
                <!-- Logo Container -->
                <div
                  class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
                >
                  <PlusIcon class="text-white" :size="30" />
                </div>

                <!-- Text Container with Background -->
                <div class="px-2 py-1 font-bold rounded-xl text-adameds-300">
                  Pasien Non-JKN
                </div>
              </div>
            </div>

            <!-- Title Container (Center) -->
            <div
              class="flex col-span-1 justify-center items-center text-2xl font-extrabold text-adameds-300"
            >
              Pendaftaran Berhasil
            </div>

            <!-- Button Container (Right) -->
            <div class="flex col-span-1 justify-end items-center mr-6">
              <CustomButton
                label="< &nbsp Halaman Utama"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="w-fit"
                @click="handleHome"
              />
            </div>
          </div>

          <div class="flex justify-center items-center px-16">
            <TiketAntrian :tiketAntrian="getTiketData" class="mt-14" />
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
