<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import Chart from 'primevue/chart';
import CustomChip from '@/components/Base/CustomChip.vue';

// Define the prop for width
const props = defineProps({
    headerGrafik: {
        type: String,
        default: ""
    },
    width: {
        type: String,
        default: '100%' // Default width if not specified
    },
});

// Inisialisasi chartData dan chartOptions sebagai objek kosong
const chartData = ref({});
const chartOptions = ref({});

// Set data dan opsi grafik ketika komponen telah dimuat
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const setChartData = () => {

    return {
        labels: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04'],
        datasets: [
            {
                label: 'Kunjungan Pasien',
                data: [3.7, 1.8, 1.6, 3.5],
                fill: false,
                borderColor: "#77D6CB",
                tension: 0.4,
                pointBackgroundColor: '#0E8174',
                pointBorderColor: '#0E8174',
                pointBorderWidth: 2,
                pointRadius: 7,
                pointHoverRadius: 9,
            },
        ],
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');

    return {
        maintainAspectRatio: true,
        responsive: true,
        aspectRatio: 3,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    padding: 2, 
                    
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                offset:true
            },
            y: {
                min: 0,
                max: 4,
                ticks: {
                    stepSize: 1 ,
                    color: textColorSecondary,
                    padding: 2,
                },
                grid: {
                    display: false,
                },
            },
        },
        elements: {
            line: {
                borderWidth: 6,
              
            },
            point: {
                radius: 2,
            },
        },
    };
};
</script>

<template>
    <div class="w-auto p-5 bg-white rounded-lg shadow-md">
        <div class="flex items-center justify-between">
            <div class="text-lg font-bold">{{ props.headerGrafik }}</div>
            <div class="flex gap-2.5 items-center">
                <CustomChip label="Detail" bg-color="bg-adameds-300" border-color="border-transparent" customClass="h-[30px] font-semibold text-normal pl-3"
                    text-color="text-white" icon-color="text-white" :show-checked-icon="false" />
                <div class="w-[24px] h-[24px]"><PhDotsThreeVertical :size="24" color="#667085" class=""/></div>
            </div>
        </div>
        <hr class="border-[#D9DCE1] border-1 mt-4 mb-2" />

        <Chart type="line" :data="chartData" :options="chartOptions" />
        <div class="mt-4 text-center">
            <span class="text-gray-600">Tanggal Kunjungan</span>
        </div>
    </div>
</template>
