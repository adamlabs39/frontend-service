<script setup lang="ts">
const props = defineProps({
	iconKegiatan: {
		type: String,
		default:""
	},
	namaKegiatan: {
		type: String,
		default:"Tidak Tau"
	},
	data: {
		type: String,
		default:"HALO"
	},
	satuanData: {
		type: String,
		default:"KM"
	},
	percentage: {
		type: String,
		default:"10%"
	},
	arrowIcon: {
		type: String,
		default:""
	}
})
</script>

<template>
	<div class="w-auto p-5 bg-white rounded-lg shadow-md">
		<!-- Header Section -->
		<div class="flex items-center gap-2.5 mb-4">
			<div class="w-10 h-10 text-white bg-teal-400 rounded-full">
				<img :src="props.iconKegiatan" alt="Icon Kegiatan" class="w-full h-full rounded-full">
			</div>
			<div class="font-semibold text-black text-SM">{{ props.namaKegiatan }}</div>
		</div>

		<!-- Main Content -->
		<div class="">
			<div class="flex flex-col justify-end">
				<div class="font-bold text-black text-[40px]">{{ props.data }}</div>
				<div class="text-gray-400 text-normal">{{props.satuanData}}</div>
			</div>
			<div class="flex justify-end -mt-6">
				<div>
					<img :src="props.arrowIcon" alt="Icon Kegiatan" class="w-full h-full rounded-full">
				</div>
				<div class="text-normal text-success-300">{{props.percentage}}</div>
			</div>

		</div>
	</div>
</template>
