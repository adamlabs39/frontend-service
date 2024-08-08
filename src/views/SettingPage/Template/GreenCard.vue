<script setup lang="ts">
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const props = defineProps({
	cardHeading: {
		type: String,
		default: "",
	},
	showButton: {
		type: Boolean,
		default: false,
	},
	labelButton: {
		type: String,
		default: "",
	},
	hrCustomClass: {
		type: String,
		default: "my-[10px]",
	},
	hrEnableCustomClass: {
		type: Boolean,
		default: false,
	},
	hrDefaultClass: {
		type: String,
		default: "border-[#D9DCE1] border-1 mr-[87px] my-[10px]",
	},
	showChip: {
        type: Boolean,
        default: false,
	},
	buttonClickHandler: {
		type: Function as () => any,
		default: () => {}
	}
});
</script>

<template>
	<div class="p-5 mx-5 mt-2 rounded-lg bg-adameds-50">
		<div class="flex items-center justify-between">
			<div class="font-bold text-adameds-300 font-poppins text-heading">
				{{ props.cardHeading }}
			</div>
			<div class="flex items-center gap-3 font-poppins" v-if="showButton">
				<CustomChip label="AKTIF" v-if="showChip" bg-color="bg-adameds-300" border-color="border-transparent"
					text-color="text-white" icon-color="text-white"/>
				<CustomButton :label="props.labelButton" class="px-5 py-[10px] font-poppins font-semibold text-sm" @click="buttonClickHandler"/>
			</div>
		</div>

		<hr :class="hrEnableCustomClass ? props.hrCustomClass : props.hrDefaultClass" />
		<slot></slot>
	</div>
</template>

<script setup lang="ts"></script>
