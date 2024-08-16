<script setup lang="ts">
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomChip from '@/components/Base/CustomChip.vue';

const props = defineProps({
	nomor: {
		type: Number,
		default:0
	},
	menuPassword: {
		type:String,
		default:""
	}
})
</script>


<template>
	<div class="mx-5 my-2.5 rounded-lg bg-adameds-50">
		<div class="flex justify-between">
			<div class="flex items-center">
				<div
					class="flex bg-adameds-300 rounded-xl w-[60px] h-[60px] items-center justify-center text-white font-semibold text-base font-poppins">
					{{ props.nomor }}
				</div>
				<div class="ml-4 font-semibold text-black">
					{{ props.menuPassword }}
				</div>
			</div>
			<div class="flex items-center gap-2.5 mr-2.5">
				<CustomChip label="AKTIF" bg-color="bg-adameds-300" border-color="border-transparent"
					text-color="text-white" icon-color="text-white" />
				<CustomButton label="Edit" @click="$emit('edit', nomor)"/>
			</div>
		</div>

	</div>
</template>
