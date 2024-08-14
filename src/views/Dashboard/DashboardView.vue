<script setup lang="ts">
import { ref } from 'vue';
import CardDashboard from './CardDashboard.vue'
import CustomDatePicker from '@/components/Base/CustomDatePicker.vue';
import LineChartDashboard from './Grafik/LineChartDashboard.vue';
import DoughnutChart from './Grafik/DoughnutChart.vue';
import ProgressBarDashboard from './Grafik/ProgressBarDashboard.vue';
import IconTotalKunjungan from '../../assets/icons/icon_totalKunjungan.svg'
import IconPasienBaru from '../../assets/icons/icon_pasienBaru.svg'
import IconPenjualanObat from '../../assets/icons/icon_penjualanObat.svg'
import IconPendapatanKlinik from '../../assets/icons/icon_pendapatanKlinik.svg'
import ArrowIcon from '../../assets/icons/icon_circleUp.svg'
import IconDashboard from '../../assets/icons/icon_returnDashboard.svg'
import CardGrafik from './Grafik/CardGrafik.vue';

import PopUpDownload from './Grafik/PopUpDownload.vue'

const startDateFilter = ref<Date>(new Date())
const endDateFilter = ref<Date>(new Date())

const currentVisibleMenu = ref<string | null>(null);

const toggleMenu = (menuName: string) => {
  if (currentVisibleMenu.value === menuName) {
    currentVisibleMenu.value = null;  
  } else {
    currentVisibleMenu.value = menuName;  
  }
};

</script>



<template>
  <div class="flex flex-col max-h-full gap-5 overflow-auto grow">
    <div class="flex items-center gap-2.5 p-5 bg-white rounded-lg">
      <div class="p-2 text-white rounded-lg bg-adameds-300">
        <img :src="IconDashboard" alt="Icon Kegiatan" width="20px">
      </div>
      <div class="flex items-center justify-between w-full font-semibold text-teal-500 text-subTitle ">Dashboard
        <div class="flex">
          <CustomDatePicker v-model="startDateFilter" label="" class="w-[150px]" />
          <PhMinus class="mt-auto mb-2 mx-[10px] text-black" />
          <CustomDatePicker v-model="endDateFilter" :showLabel="false" class="mt-auto w-[150px]" />
        </div>
      </div>
    </div>


    <div class="flex gap-5">
      <div class="w-1/4">
        <CardDashboard namaKegiatan="Total Kunjungan" data="125" satuanData="Pasien" :iconKegiatan="IconTotalKunjungan"
          :arrowIcon="ArrowIcon" />
      </div>
      <div class="w-1/4">
        <CardDashboard namaKegiatan="Pasien Baru" data="10" satuanData="Pasien" :iconKegiatan="IconPasienBaru"
          :arrowIcon="ArrowIcon" />
      </div>
      <div class="w-1/4">
        <CardDashboard namaKegiatan="Total Penjualan Obat" data="150" satuanData="Transaksi"
          :iconKegiatan="IconPenjualanObat" :arrowIcon="ArrowIcon" />
      </div>
      <div class="w-1/4">
        <CardDashboard namaKegiatan="Total Pendapatan Klinik" data="Rp. 100.000.000"
          satuanData="Indonesian Rupiah (IDR)" dataFont="font-bold text-black text-[20px]"
          :iconKegiatan="IconPendapatanKlinik" :arrowIcon="ArrowIcon" />
      </div>
    </div>

    <div class="flex gap-5">
      <div class="bg-white rounded-lg shadow-md grow">
        <CardGrafik header-grafik="Kunjungan Pasien" showDots @dot-click="toggleMenu('kunjunganPasien')"/>
         <PopUpDownload v-if="currentVisibleMenu === 'kunjunganPasien'" />
        <LineChartDashboard :labels="['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04']" :datasets="[
          {
            label: 'Kunjungan Pasien',
            data: [3.7, 1.8, 1.6, 3.5],
            fill: false,
            borderColor: '#77D6CB',
            tension: 0.4,
            pointBackgroundColor: '#0E8174',
            pointBorderColor: '#0E8174',
            pointBorderWidth: 2,
            pointRadius: 7,
            pointHoverRadius: 9,
          }
        ]" />
      </div>
      <div class="w-[500px]  bg-white rounded-lg shadow-md">
        <CardGrafik headerGrafik="Status Pelayanan Rawat Jalan" />
        <ProgressBarDashboard statusPemeriksaan="Belum Diperiksa" jumlahPasien="45 Pasien" progressColor="#AFCDF4"
          :value="25" persenPasien="25" />
        <ProgressBarDashboard statusPemeriksaan="Diperiksa" jumlahPasien="25 Pasien" progressColor="#FCE8B8" :value="75"
          persenPasien="75" />
        <ProgressBarDashboard statusPemeriksaan="Selesai" jumlahPasien="75 Pasien" progressColor="#9FDDBC" :value="50"
          persenPasien="50" />
      </div>
    </div>

    <div class="w-full bg-white rounded-lg shadow-md">
      <CardGrafik headerGrafik="Kunjungan Berdasarkan Status Rawat" showDots @dot-click="toggleMenu('kunjunganStatusRawat')" />
      <PopUpDownload v-if="currentVisibleMenu === 'kunjunganStatusRawat'"/>
      <LineChartDashboard :labels="['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04']" :datasets="[
        {
          label: 'Rawat Jalan',
          data: [3.9, 2.8, 2, 3.3],
          fill: false,
          borderColor: '#8EB8F0',
          tension: 0.4,
          pointBackgroundColor: '#2B5CA0',
          pointBorderColor: '#2B5CA0',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
        },
        {
          label: 'Rawat Inap',
          data: [1.5, 2, 1.1, 1.9],
          fill: false,
          borderColor: '#77CFA0',
          tension: 0.4,
          pointBackgroundColor: '#0E7840',
          pointBorderColor: '#0E7840',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
        },
        {
          label: 'IGD',
          data: [2, 1.5, 3.1, 2.8],
          fill: false,
          borderColor: '#F29F97',
          tension: 0.4,
          pointBackgroundColor: '#A33E35',
          pointBorderColor: '#A33E35',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
        },

      ]" showLegend legendPosition="bottom" labelsColor="#000000" />
    </div>
    <div class="w-full bg-white rounded-lg shadow-md">
      <CardGrafik headerGrafik="Pemasukan dan Pengeluaran" showDots />
      <LineChartDashboard :labels="['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04']" :datasets="[
        {
          label: 'Kunjungan Pasien',
          data: [3.7, 1.8, 1.6, 3.5],
          fill: false,
          borderColor: '#77D6CB',
          tension: 0.4,
          pointBackgroundColor: '#0E8174',
          pointBorderColor: '#0E8174',
          pointBorderWidth: 2,
          pointRadius: 7,
          pointHoverRadius: 9,
        },
      ]" />
    </div>

    <div class="flex gap-5">
      <div class="w-1/3 bg-white rounded-lg shadow-md">
        <CardGrafik headerGrafik="Kunjungan Per-jenis Kelamin" />
        <DoughnutChart :labels="['Perempuan', 'Laki-laki']" :data="[60, 40]"
          :backgroundColor="['#FAB8DC', '#AED6FF']" />
      </div>

      <div class="w-1/3 bg-white rounded-lg shadow-md">
        <CardGrafik headerGrafik="Top 5 Poli" />
        <DoughnutChart :labels="['Umum', 'Anak', 'Gigi', 'THT', 'Bidan']" :data="[300, 50, 100, 80, 120]"
          :backgroundColor="['#F28B82', '#C1E1C1', '#A7C7E7', '#AFE1E1', '#FFE0B2']" />
      </div>

      <div class="w-1/3 bg-white rounded-lg shadow-md">
        <CardGrafik headerGrafik="Top 5 Penjamin" />
        <DoughnutChart :labels="['BPJS', 'Prudential', 'Periksain', 'Tunai', 'Inhealth']"
          :data="[300, 50, 100, 80, 120]" :backgroundColor="['#A7C7E7', '#F28B82', '#C1E1C1', '#AFE1E1', '#FFE0B2']" />
      </div>
    </div>

  </div>
</template>
