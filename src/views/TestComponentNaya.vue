<script setup lang="ts">
import DatePickers from "@/components/Base/CustomDatePicker.vue";
import Select from "@/components/Base/CustomSelect.vue";
import Switch from "@/components/Base/CustomSwitch.vue";
import CardPanggilan from "@/components/Antrian/CardPanggilan.vue";
import { ref } from "vue";
import TiketAntrian from "@/components/Antrian/TiketAntrian.vue";
import CardRiwayatPemeriksaan from "@/components/Admisi/CardRiwayatPemeriksaan.vue";
import CardMonitoringBed from "@/components/Admisi/CardMonitoringBed.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import KomponenTarif from "@/components/Datamaster/KomponenTarif.vue";
import VarianTarif from "@/components/Datamaster/VarianTarif.vue";
import Kelas from "@/components/Datamaster/Kelas.vue";
import DetailTarifTindakan from "./Datamaster/Tarif/DetailTarifTindakan.vue";
import DetailTarifRuangan from "./Datamaster/Tarif/DetailTarifRuangan.vue";

//For Test Selected Component
const selectedItems = ref();
const items = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

const testLog = (data: any) => {
  console.log("city data: ", data);
  console.log("city: ", selectedItems.value);
};

//For Test Date Picker Component
const selectedDate = ref();
const testDate = (data: any) => {
  console.log("Date: ", data);
};
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let firstDayOfCurrentMonth = new Date(year, month + 1, 10);

//For Test Time Picker Component
const selectedTime = ref();
const testTime = (data: any) => {
  console.log("Time: ", data);
};

//For Test Toggle Switch Component
const toggleSwitch = ref();
const testSwitch = (data: any) => {
  console.log("value: ", toggleSwitch.value);
};

//For Test Card
const cardPanggilan = ref(
  { noAntri: '9349',
    namaPoli:'Poli Gigi',
    namaDokter: 'dr. Adameds bin Adameds',
  },
);

const tiketAntrian = ref(
  { noRM: '001827',
    noBPJS:'9234938492',
    nik: '0932493849382',
    nama:'Adam bin Adam',
    tanggalLahir:'01 Januari 2000',
    gender:'Laki-laki',
    namaPoli:'Poli Anak',
    dokter:'dr. Umum',
    jadwal:'07:00-10:00',
    tanggal:'10 Jan 2024',
    noAntri:'PD-02-01',
  },
);
const riwayatPemerikasaan = ref(
  { ruangan: 'IGD',
    asuransi:'TUNAI',
    dokter: 'dr. Adameds bin Adameds',
    tanggal:'2024-6-12',
    jam:'09:00',
    statusLunas:'Lunas'
  },
);

const monitoringBed = ref(
  { nomorBed: '1',
    nomorRM:'00123456',
    namaPasien: 'Adam bin Adam',
    gender:'Laki-laki Dewasa',
    asuransi:'BPJS',
  },
);

const categories = ref([
    {name: "Accounting", key: "A"},
    {name: "Marketing", key: "M"},
    {name: "Production", key: "P"},
    {name: "Research", key: "R"}
]);
const checkCategorie=ref()
</script>

<template>
  <div class="h-screen overflow-scroll">
    <Select label="Choose a City" v-model="selectedItems" :options="items" optionValue="code" optionLabel="name"
      :isLoading="false" :invalid="false" invalidMessage="Wajib diisi" :disabled="false" @change="testLog" />
    <p>Kota: {{ selectedItems }}</p>
    <br>
    <DatePickers label="Choose a Date" v-model="selectedDate" :invalid="false" invalidMessage="Wajib diisi"
      :disabled="false" :maxDate=firstDayOfCurrentMonth />

    <p>Date: {{ selectedDate }}</p>
    <br>
    <DatePickers label="Choose a Time" timeOnly v-model="selectedTime" :invalid="false" invalidMessage="Wajib diisi"
      :disabled="false" @date-select="testTime" />
    <p>Time: {{ selectedTime }}</p>
    <br>
    <Switch label="Switch" v-model="toggleSwitch" @input="testSwitch" :invalid="false" invalidMessage="Wajib diisi"
      :disabled="false" />
    <p>Switch: {{ toggleSwitch }}</p>
    <br>
    <div class="w-[300px]">
      <CardPanggilan :cardPanggilan="cardPanggilan" />
    </div>
    <br>
    <div class="w-3/4">
      <TiketAntrian :tiketAntrian="tiketAntrian"/>
    </div>
    <br>
    <div class="w-3/4">
      <CardRiwayatPemeriksaan :pemeriksaan="riwayatPemerikasaan"/>
    </div>
    <br>
    <div class="w-3/4">
      <CardMonitoringBed :monitoringBed="monitoringBed" />
    </div>
    <br>
    <div >
      <CustomCheckbox v-model="checkCategorie" :categories="categories"/>
    {{ checkCategorie }}
    </div>
    <br>
    <KomponenTarif/>
    <br>
    <div class="p-5">
      <VarianTarif />
    </div>
    <br>
    <Kelas />
    <br>
    <DetailTarifTindakan/>
    <br>
    <DetailTarifRuangan />
  </div>
</template>
