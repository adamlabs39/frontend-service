<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import Chart from 'primevue/chart';
import CustomChip from '@/components/Base/CustomChip.vue';

const props = defineProps({
  labels: {
    type: Array as () => string[],
    default: () => ['Umum', 'Anak', 'Gigi', 'THT', 'Bidan']
  },
  data: {
    type: Array as () => number[],
    default: () => [300, 50, 100, 80, 120] // Default data
  },
  backgroundColor: {
    type: Array as () => string[],
    default: () => ['#F28B82', '#C1E1C1', '#A7C7E7', '#AFE1E1', '#FFE0B2']
  },
  hoverBackgroundColor: {
    type: Array as () => string[],
    default: () => ['#F28B82', '#C1E1C1', '#A7C7E7', '#AFE1E1', '#FFE0B2']
  },
  headerGrafik: {
    type: String,
    default: ""
  },

});


const chartData = ref({});
const chartOptions = ref({});


onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const setChartData = () => {
  return {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: props.backgroundColor,
        hoverBackgroundColor: props.hoverBackgroundColor,
        borderWidth: 0,

      }
    ]
  };
};

const setChartOptions = () => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
        },
      },
    },
    cutout: '60%',
  };
};
</script>

<template>
  <div class="w-auto p-5 bg-white rounded-lg shadow-md">
    <div class="flex items-center justify-between">
      <div class="text-lg font-bold ">{{ props.headerGrafik }}</div>
      <CustomChip label="Detail" bg-color="bg-adameds-300" border-color="border-transparent"
        customClass="h-[30px] font-semibold text-normal pl-3" text-color="text-white" icon-color="text-white"
        :show-checked-icon="false" />
    </div>
    <hr class="border-[#D9DCE1] border-1 mt-4 mb-2" />

    <div class="flex justify-center">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
