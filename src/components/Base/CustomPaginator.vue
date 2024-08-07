<script setup lang="ts">
import Paginator from 'primevue/paginator';


const props = defineProps({
    rows: {
        type: Number,
        default: 0
    },
    totalRecords: {
        type: Number,
        default: 0
    },
    rowsPerPageOptions: {
        default: []
    },
});

const emits = defineEmits(['update:rows', 'update:current-page']);
</script>

<template>
    <div class="flex gap-2.5 items-center">
        <div>Total Data: {{ props.totalRecords }}</div>
        <Paginator :rows="props.rows" :totalRecords="props.totalRecords" :rowsPerPageOptions="props.rowsPerPageOptions"
            :pageLinkSize="1" :pt="{
                content: {
                    class: 'flex gap-0 p-0 m-0 h-[30px] items-center justify-center',
                },
                first: { class: 'rounded-none h-full' },
                prev: { class: 'rounded-none h-full' },
                pages: { class: 'rounded-none h-full' },
                page: {
                    class: 'rounded-none h-full bg-adameds-300 text-white w-10 h-10 flex items-center justify-center',
                },
                next: { class: 'rounded-none h-full' },
                last: { class: 'rounded-none h-full' },
                pcRowPerPageDropdown: {
                    root: 'border-b-2 rounded-none border-white border-b-grey-200 ml-5 h-full items-center justify-center',
                },
            }" @update:rows="$emit('update:rows', $event)" @update:first="$emit('update:current-page', $event)">
            <template #rowsperpagedropdownicon>
                <PhCaretDown :size="20" weight="fill" class="text-grey-200" />
            </template>
        </Paginator>
    </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>
