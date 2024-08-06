<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomColorPicker from "@/components/Base/CustomColorPicker.vue";
import CustomUpload from "@/components/Base/CustomUpload.vue";
import { ref } from 'vue';

// Definisikan warna berdasarkan gambar
const colors = ref([
	{ name: 'Color 1', value: '#E57373' },
	{ name: 'Color 2', value: '#EF5350' },
	{ name: 'Color 3', value: '#FFEB3B' },
	{ name: 'Color 4', value: '#81C784' },
	{ name: 'Color 5', value: '#4DB6AC' },
	{ name: 'Color 6', value: '#F06292' },
	{ name: 'Color 7', value: '#F48FB1' },
	{ name: 'Color 8', value: '#FFF59D' },
	{ name: 'Color 9', value: '#AED581' },
	{ name: 'Color 10', value: '#4DD0E1' }
]);

const updateColor = (index: number, color: string) => {
	colors.value[index].value = color;
};
</script>

<template>
	<div>
		<!-- Sebelum tulisan Warna Tema  -->
		<div class="flex w-full">
			<!-- Bagian Konten Kiri -->
			<div class="w-full">
				<div class="mb-8">
					<div class="text-sm font-semibold font-poppins">Logo</div>
					<div class="text-SM text-[#858D9D]">
						Logo ini akan ditampilkan di bagian
						<span class="font-bold">Halaman Login, Header Menu sebelah kiri, Loading Screen,</span>
						dan <span class="font-bold">Print Out</span>.
					</div>
					<ul class="list-disc list-inside text-SM ml-[6px] text-[#858D9D]">
						<li>
							Ukuran minimum yang disarankan adalah
							<span class="font-bold">960x540</span>
						</li>
						<li>
							Rasio aspek yang disarankan adalah
							<span class="font-bold">16:9</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Gambar -->
			<div class="flex flex-col items-end justify-end w-1/2">
				<div class="flex flex-col justify-center w-full">
					<div class="text-lg font-bold text-center text-adameds-300">Preview Logo</div>
					<div class="bg-white border-dashed border-[1px] rounded-lg ">
						<CustomUpload chooseLabel="Cari File" mode="advanced" :showUploadButton="false"
							:show-cancel-button="false" class="border-none bg-adameds-300" :maxFileSize="1000000"
							name="demo[]" url="/api/upload" />
					</div>
				</div>
			</div>
		</div>

		<!-- Setelah Gambar -->
		<div class="flex items-center justify-between mt-8">
			<div class="">
				<div class="text-sm font-semibold font-poppins">Warna Tema</div>
				<div class="text-SM text-[#858D9D]">Warna yang dipilih akan mengubah seluruh tema warna LIS.</div>
				<ul class="list-disc list-inside text-SM ml-[6px] text-[#858D9D]">
					<li>Pilihlah warna yang akan ditampilkan.</li>
				</ul>
			</div>
			<div class="flex items-center gap-2 ">
				<!-- Color pembungkus -->
				<div class="flex flex-col">
					<!-- Color Baris atas -->
					<div class="flex gap-x-2">
						<div v-for="(color, index) in colors.slice(0, 5)" :key="index" class="flex items-center">
							<CustomColorPicker v-model="color.value"
								@change="(newColor) => updateColor(index, newColor)" />
						</div>
					</div>
					<!-- Color Baris Bawah	 -->
					<div class="flex mt-1 gap-x-2">
						<div v-for="(color, index) in colors.slice(5, 10)" :key="index" class="flex items-center">
							<CustomColorPicker v-model="color.value"
								@change="(newColor) => updateColor(index + 5, newColor)" />
						</div>
					</div>
				</div>

				<div class="">
					<CustomButton icon="PhCheck" fluid class="w-24 h-14" />
				</div>

				<!-- Eyedrop -->
				<div class="flex items-start justify-end w-24 border-[#858D9D] rounded-lg border-[1px] h-14">
					<div class="p-2">
						<PhEyedropper :size="18" color="#858d9d" weight="fill" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
