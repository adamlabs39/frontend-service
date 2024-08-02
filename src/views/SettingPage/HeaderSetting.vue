<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';


const props = defineProps({
	heading: {
		type: String,
		default:""
	},
	labelButton: {
		type: String,
		default:""
	},
	showButton: {
		type: Boolean,
		default:false,
	}
})
</script>

<template>
	<div class="flex items-center justify-between">
		<div class="mt-5 ml-5 font-semibold font-poppins text-heading text-adameds-A300">
			{{ props.heading }}
		</div>
		<div class="mt-5 ml-5 mr-5 font-poppins" v-if="showButton">
			<CustomButton :label="props.labelButton" class="px-5 py-[10px] font-poppins font-semibold text-sm"/>
		</div>
		
	</div>
	<hr class="border-[#D9DCE1] border-1 mx-5 mt-5 mb-2" />
</template>
