<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';
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
						<li>Ukuran minimum yang disarankan adalah <span class="font-bold">960x540</span></li>
						<li>Rasio aspek yang disarankan adalah <span class="font-bold">16:9</span></li>
					</ul>
				</div>
			</div>

			<!-- Gambar -->
			<div class="flex flex-col items-end justify-end w-1/3">
				<div class="flex flex-col items-center justify-center">
					<div class="mb-1 text-lg font-bold text-adameds-300">Preview Logo</div>
					<div class="px-5 py-3 bg-white rounded-lg">
						<img src="../../../../assets/images/adamedsPicture.svg" alt="Logo Preview"
							class="h-auto max-w-full">
					</div>
				</div>
			</div>
		</div>

		<!-- Setelah Gambar -->
		<div class="flex items-center justify-between mt-8">
			<div>
				<div class="text-sm font-semibold font-poppins">Warna Tema</div>
				<div class="text-SM text-[#858D9D]">
					Warna yang dipilih akan mengubah seluruh tema warna LIS.
				</div>
				<ul class="list-disc list-inside text-SM ml-[6px] text-[#858D9D]">
					<li>Pilihlah warna yang akan ditampilkan.</li>
				</ul>
			</div>
			<div>
				<CustomButton icon="PhCheck" class="w-[100px] h-14"/>
			</div>

		</div>
	</div>
</template>
