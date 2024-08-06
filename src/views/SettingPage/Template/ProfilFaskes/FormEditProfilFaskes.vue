<script setup>
import CustomTextfield from "../../../../components/Base/CustomTextfield.vue";
import CustomSelect from "../../../../components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import { ref } from "vue";

const selectedProvince = ref();
const province = ref([
	{ name: "Jawa Timur", code: "JATIM" },
	{ name: "Jawa Tengah", code: "JATENG" },
	{ name: "Jawa Barat", code: "JABAR" },
	{ name: "Sulawesi Utara", code: "SULUT" },
	{ name: "Kalimantan Selatan", code: "KALSEL" },
]);
</script>

<template>
	<div class="rounded-lg">
		<div class="">
			<!-- Kode Faskes dan Nama Faskes berada dalam dua kolom -->
			<div class="flex gap-[30px] mb-4">
				<div class="w-[200px]">
					<CustomTextfield label="Kode Faskes" class="border-[#C7CBD2]" placeholder="Kode Faskes" />
				</div>
				<div class="grow">
					<CustomTextfield label="Nama Faskes" class="w-full" placeholder="Nama Faskes"/>
				</div>
			</div>

			<!-- Alamat mengambil dua kolom penuh -->
			<div class="mb-4">
				<CustomTextArea label="Alamat" placeholder="Alamat" />
			</div>

			<div class="grid grid-cols-2 gap-[30px]">
				<!-- Provinsi, Kabupaten, Kecamatan, dan Kelurahan berada dalam dua kolom -->
				<div>
					<CustomSelect label="Provinsi" v-model="selectedProvince" :options="province" optionValue="code"
						optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Provinsi" customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomSelect label="Kabupaten" v-model="selectedProvince" :options="province" optionValue="code"
						optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kabupaten"  customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomSelect label="Kecamatan" v-model="selectedProvince" :options="province" optionValue="code"
						optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kecamatan"  customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomSelect label="Kelurahan" v-model="selectedProvince" :options="province" optionValue="code"
						optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kelurahan"  customSelectClass="border-[#C7CBD2]"/>
				</div>

				<!-- Kode Pos, No. Telpon, Email, dan Website berada dalam dua kolom -->
				<div>
					<CustomSelect label="Kode Pos" v-model="selectedProvince" :options="province" optionValue="code"
						optionLabel="name" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kode Pos"  customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomTextfield label="No. Telpon" class="w-full" placeholder="No. Telpon" />
				</div>
				<div>
					<CustomTextfield label="Email" class="w-full" placeholder="ex: mail@Email.com"/>
				</div>
				<div>
					<CustomTextfield label="Website" class="w-full" placeholder="ex: www.website.com"/>
				</div>

				<!-- Link Google Map mengambil dua kolom penuh -->
				<div class="">
					<CustomTextfield label="Link Google Map" class="w-full border-[#C7CBD2]" placeholder="Link Google Map"/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Custom styles if needed */
</style>
