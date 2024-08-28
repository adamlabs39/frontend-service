<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomColorPicker from "@/components/Base/CustomColorPicker.vue";
import CustomDragDrop from "@/components/Base/CustomDragDrop.vue";
import CustomUpload from "@/components/Base/CustomUpload.vue";
import { ref } from 'vue';
import GreenCard from "../GreenCard.vue";
import { PhHandTap } from "@phosphor-icons/vue";

const props = defineProps({
	profilFaskesResponse: {
		type: Object,
		required: true,
	},
	isEditLogoWarna: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits(['update:isEditLogoWarna']);
</script>

<template>
		<GreenCard class="mb-4" cardHeading="Logo & Warna" hr-enable-custom-class showButton labelButton="Batal Edit"
			:button-click-handler="() => emit('update:isEditLogoWarna', false)" outlined borderColor="border-adameds-300"
			textColor="text-adameds-300">
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
				<div class="flex flex-col items-end justify-end w-2/5 ">
					<div class="flex flex-col justify-center w-full">
						<div class="font-bold text-center text-normalt- text-adameds-300">Preview Logo</div>
						<CustomDragDrop />
					</div>
				</div>
			</div>

			<!-- Setelah Gambar -->
			<div class="flex items-center justify-between mt-5">
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
							<CustomColorPicker icon="PhHandTap" showIcon/>
						</div>
					</div>
				</div>
			</div>

			<hr class="border-[#D9DCE1] border-1 mt-5" />
			<div class="flex items-end justify-end gap-3 py-2.5">
				<CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
					borderColor="border-2 border-[#9DA4B1]" />
				<CustomButton label="Simpan" />
			</div>
		</GreenCard>
</template>

<style lang="scss" scoped></style>
