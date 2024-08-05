<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomUpload from "@/components/Base/CustomUpload.vue";
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
				<CustomButton icon="PhCheck" />
			</div>
		</div>
	</div>
</template>
