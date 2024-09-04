<script setup lang="ts">
import GreenCard from '../GreenCard.vue';

const props = defineProps({
	konfigurasiIntegrasiResponse: {
		type: Object,
		required: true,
	},
	editHandler: {
		type: Function,
		required: true,
	},

});
</script>

<template>
	<GreenCard cardHeading="Konfigurasi VCLAIM" hrEnableCustomClass showButton labelButton="Edit"
		:button-click-handler="props.editHandler">

		<div class="pl-2 text-base">
			<div class="grid grid-cols-2 gap-3">
				<!-- 7 kolom di sebelah kiri -->
				<div class="mb-4">
					<div class="text-sm font-normal underline">Base URL</div>
					<div class="font-semibold text-MD">{{ props.konfigurasiIntegrasiResponse.baseUrl }}</div>
				</div>
				<div class="mb-4">
					<div class="text-sm font-normal underline">user Key</div>
					<div class="font-semibold text-MD">{{ props.konfigurasiIntegrasiResponse.userKey }}</div>
				</div>
				<div class="mb-4">
					<div class="text-sm font-normal underline">Cons ID (BPJS)</div>
					<div class="font-semibold text-MD">{{ props.konfigurasiIntegrasiResponse.consId }}</div>
				</div>
				<div class="mb-4">
					<div class="text-sm font-normal underline">Secret Key</div>
					<div class="font-semibold text-MD">{{ props.konfigurasiIntegrasiResponse.secretKey }}</div>
				</div>
				<div class="col-span-2 mb-4">
					<div class="text-sm font-normal underline">PPK</div>
					<div class="font-semibold text-MD">{{ props.konfigurasiIntegrasiResponse.PPK }}</div>
				</div>
			</div>
		</div>
	</GreenCard>
</template>
