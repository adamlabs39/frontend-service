<script setup lang="ts">


import { ref } from 'vue';
import MainHeaderSetting from '../MainHeaderSetting.vue'
import DataRow from './DataRow.vue'

const items = ref([
  { id: 1, name: 'Pembayaran', status: 'AKTIF' },
  { id: 2, name: 'Farmasi', status: 'AKTIF' },
  { id: 3, name: 'Lab', status: 'NON-AKTIF' },
  // Tambahkan data lainnya di sini
]);

const handleEdit = (id:any) => {
  console.log(`Edit button clicked for item ${id}`);
  // Tambahkan logika edit di sini
};

</script>

<template>
    <div class="bg-white rounded-lg shadow-md">
        <MainHeaderSetting heading="Password Otorisasi" />
        <DataRow  v-for="item in items" 
        :key="item.id" 
        :nomor="item.id" 
        :menuPassword="item.name" 
        :status="item.status"
        @edit="handleEdit"/>
    </div>
</template>



<style lang="scss" scoped></style>
