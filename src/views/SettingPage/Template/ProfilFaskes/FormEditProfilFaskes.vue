<script setup lang="ts">
import CustomTextfield from "../../../../components/Base/CustomTextfield.vue";
import CustomSelect from "../../../../components/Base/CustomSelect.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import { onMounted, ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { computed } from "vue";
import axios from "axios";
import GreenCard from "../GreenCard.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import { useSettingStore } from "@/stores/setting";




const props = defineProps({
	profilFaskesResponse: {
		type: Object,
		required: true,
	},
	isEditProfilFaskes: {
		type: Boolean,
		required: true,
	},
});

const settingStore = useSettingStore();

const emit = defineEmits(['update:isEditProfilFaskes', 'update:afterEditProfilFaskes']);

const API_URL_ALAMAT = "https://alamat.thecloudalert.com/api/";


// Pilihan di select
const provinces = ref<{ id: string; name: string }[]>([]);
const regencies = ref<{ id: string; name: string }[]>([]);
const districts = ref<{ id: string; name: string }[]>([]);
const villages = ref<{ id: string; name: string }[]>([]);
const postalCodes = ref<{ id: string; name: string }[]>([]);

const schemaProfilFaskes = computed(() =>
    toTypedSchema(
        yup.object({
            code: yup.string().required("Kode wajib diisi"),
            name: yup.string().required("Nama Faskes wajib diisi"),
			fullAddress: yup.string().required("Alamat wajib diisi"),
			addressUuid: yup.string(),
			logo: yup.string(),
			bgWarna: yup.string(),
            selectedProvinceId: yup.string().required("Provinsi wajib dipilih"),
            selectedRegencyId: yup.string().required("Kabupaten wajib dipilih"),
            selectedDistrictId: yup.string().required("Kecamatan wajib dipilih"),
            selectedVillageId: yup.string().required("Kelurahan wajib dipilih"),
            selectedPostalCodeId: yup.string().required("Kode Pos wajib dipilih"),
			phone: yup.string().required("No Telpon wajib diisi"),
			email:yup.string().required("Email wajib diisi"),
			website:yup.string().required("Website wajib diisi"),
			urlGmaps:yup.string().required("Link Google Maps wajib diisi")
        })
    )
);

const {errors: profilFaskesErrors, handleSubmit: handleSubmitProfilFaskes, defineField: defineFieldProfilFaskes, resetForm:resetProfilFaskesForm } = useForm({
    validationSchema: schemaProfilFaskes,
	initialValues: {
		code:props.profilFaskesResponse.code,
		name: props.profilFaskesResponse.name,
		fullAddress: props.profilFaskesResponse.address.fullAddress || '',
		addressUuid: props.profilFaskesResponse.addressUuid,
		logo: "",
		bgWarna:"",
		selectedProvinceId: "",
		selectedRegencyId: "",
		selectedDistrictId : "",
		selectedVillageId: "",
		selectedPostalCodeId: "",
        phone: props.profilFaskesResponse.phone,
		email: props.profilFaskesResponse.email,
		website: props.profilFaskesResponse.website,
		urlGmaps: props.profilFaskesResponse.urlGmaps,
    },
});

const [code] = defineFieldProfilFaskes("code")
const [name] = defineFieldProfilFaskes("name")
const [fullAddress] = defineFieldProfilFaskes("fullAddress")
const [addressUuid] = defineFieldProfilFaskes("addressUuid")
const [logo] = defineFieldProfilFaskes("logo")
const [bgWarna] = defineFieldProfilFaskes("bgWarna")
const [selectedProvinceId] = defineFieldProfilFaskes("selectedProvinceId")
const [selectedRegencyId] = defineFieldProfilFaskes("selectedRegencyId")
const [selectedDistrictId] = defineFieldProfilFaskes("selectedDistrictId")
const [selectedVillageId] = defineFieldProfilFaskes("selectedVillageId")
const [selectedPostalCodeId] = defineFieldProfilFaskes("selectedPostalCodeId")
const [phone] = defineFieldProfilFaskes("phone")
const [email] = defineFieldProfilFaskes("email")
const [website] = defineFieldProfilFaskes("website")
const [urlGmaps] = defineFieldProfilFaskes("urlGmaps")

const resetForm = () => {
    resetProfilFaskesForm({
        values: {
            code: '',
            name: '',
            fullAddress: '',
            selectedProvinceId: '',
            selectedRegencyId: '',
            selectedDistrictId: '',
            selectedVillageId: '',
			selectedPostalCodeId: '',
			phone: '',
			email: '',
			website: '',
			urlGmaps:''
        },
    });
};

const onSubmitProfilFaskes = handleSubmitProfilFaskes(async (values) => {
    try {
		const payload = {
			code : values.code,
            name: values.name,
			full_address: values.fullAddress,
			address_uuid: values.addressUuid,
			logo: values.logo,
			bg_warna: values.bgWarna,
            prov: values.selectedProvinceId,
			city: values.selectedRegencyId,
			district: values.selectedDistrictId,
			village: values.selectedVillageId,
			postal_code: values.selectedPostalCodeId,
			phone: values.phone,
			email: values.email,
			website: values.website,
			url_gmaps: values.urlGmaps,
			
        };
		const response = await settingStore.putProfilFaskesApi(payload);
		console.log("API Response:", response);
  
        if (response?.status === 200) {
            emit('update:isEditProfilFaskes', false);
            emit('update:afterEditProfilFaskes', { ...props.profilFaskesResponse, ...payload });
        } else {
            console.error("Failed to update profile:");
        }
    } catch (error) {
        console.error("Error during submission:", error);
    }
});

const fetchData = async (url: string, refVar: any) => {
	try {
		const response = await axios.get(url);
		refVar.value = response.data.result.map((item: any) => ({
			text: item.text,
			id: item.id,
		}));
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
	}
};

const fetchProvinces = () => fetchData(`${API_URL_ALAMAT}provinsi/get/`, provinces);
const fetchRegencies = (provinceId: string) => fetchData(`${API_URL_ALAMAT}kabkota/get/?d_provinsi_id=${provinceId}`, regencies);
const fetchDistricts = (regencyId: string) => fetchData(`${API_URL_ALAMAT}kecamatan/get/?d_kabkota_id=${regencyId}`, districts);
const fetchVillages = (districtId: string) => fetchData(`${API_URL_ALAMAT}kelurahan/get/?d_kecamatan_id=${districtId}`, villages);
const fetchPostalCode = (regencyId: string, districtId: string) => fetchData(`${API_URL_ALAMAT}kodepos/get/?d_kabkota_id=${regencyId}&d_kecamatan_id=${districtId}`, postalCodes);

watch(
	() => [selectedProvinceId.value, selectedRegencyId.value, selectedDistrictId.value],
	([newProvinceId, newRegencyId, newDistrictId]) => {
		if (newProvinceId) fetchRegencies(newProvinceId);
		if (newRegencyId) fetchDistricts(newRegencyId);
		if (newDistrictId) {
			fetchVillages(newDistrictId);
			fetchPostalCode(newRegencyId || '', newDistrictId);
		}
	},
);

onMounted(() => {
	fetchProvinces();
});



</script>

<template>
	<GreenCard cardHeading="Profile" hr-enable-custom-class showButton labelButton="Batal Edit"
		:button-click-handler="() => emit('update:isEditProfilFaskes', false)" outlined borderColor="border-adameds-300"
		textColor="text-adameds-300">

		<div class="rounded-lg text-normal">
			<!-- Kode Faskes dan Nama Faskes berada dalam dua kolom -->
			<div class="flex gap-[30px] mb-4">
				<div class="w-[200px]">
					<CustomTextfield label="Kode Faskes" placeholder="Kode Faskes" v-model="code"/>
				</div>
				<div class="grow">
					<CustomTextfield label="Nama Faskes" class="w-full" placeholder="Nama Faskes" v-model="name"/>
				</div>
			</div>

			<!-- Alamat mengambil dua kolom penuh -->
			<div class="mb-4">
				<CustomTextArea label="Alamat" placeholder="Alamat" v-model:model-value="fullAddress" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false"/>
			</div>

			<div class="grid grid-cols-2 gap-[30px]">
				<!-- Provinsi, Kabupaten, Kecamatan, dan Kelurahan berada dalam dua kolom -->
				<div>
					<CustomSelect label="Provinsi" v-model="selectedProvinceId" :options="provinces" optionValue="id"
						optionLabel="text" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Provinsi" customSelectClass="border-[#C7CBD2]"  />
				</div>
				<div>
					<CustomSelect label="Kabupaten" v-model="selectedRegencyId" :options="regencies" optionValue="id"
						optionLabel="text" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kabupaten" customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomSelect label="Kecamatan" v-model="selectedDistrictId" :options="districts" optionValue="id"
						optionLabel="text" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kecamatan" customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomSelect label="Kelurahan" v-model="selectedVillageId" :options="villages" optionValue="id"
						optionLabel="text" :isLoading="false" :invalid="false" invalidMessage="Wajib diisi"
						:disabled="false" placeHolder="Pilih Kelurahan" customSelectClass="border-[#C7CBD2]" />
				</div>

				<div>
					<CustomSelect label="Kode Pos" v-model="selectedPostalCodeId" :options="postalCodes"
						optionValue="id" optionLabel="text" :isLoading="false" :invalid="false"
						invalidMessage="Wajib diisi" :disabled="false" placeHolder="Pilih Kode Pos"
						customSelectClass="border-[#C7CBD2]" />
				</div>
				<div>
					<CustomTextfield label="No. Telpon" class="w-full" placeholder="No. Telpon" v-model="phone"/>
				</div>
				<div>
					<CustomTextfield label="Email" class="w-full" placeholder="ex: mail@Email.com"  v-model="email" />
				</div>
				<div>
					<CustomTextfield label="Website" class="w-full" placeholder="ex: www.website.com"  v-model="website"/>
				</div>

				<!-- Link Google Map mengambil dua kolom penuh -->
				<div class="">
					<CustomTextfield label="Link Google Map" class="w-full border-[#C7CBD2]"
						placeholder="Link Google Map" v-model="urlGmaps" />
				</div>
			</div>
			<hr class="border-[#D9DCE1] border-1 mt-5" />
			<div class="flex items-end justify-end gap-3 py-2.5">
				<CustomButton label="Reset" textColor="text-[#9DA4B1]" backgroundColor="bg-transparent"
					borderColor="border-2 border-[#9DA4B1]" @click="resetForm"/>
				<CustomButton label="Simpan" @click="onSubmitProfilFaskes" />
			</div>
		</div>
	</GreenCard>

</template>

<style scoped>
/* Custom styles if needed */
</style>
