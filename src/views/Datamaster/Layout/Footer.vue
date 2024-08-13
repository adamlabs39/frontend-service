<script lang="ts" setup>
import {ref} from 'vue'
import CustomButton from '@/components/Base/CustomButton.vue';
import CustomPaginator from '@/components/Base/CustomPaginator.vue';
const rows = ref(10);
const props=defineProps({
    totalRecords:{
        default:120
    },
    importExport:{
        default:true
    },
    rowsPerPageOptions:{
      default:[]
    }
})
const emits = defineEmits(['update:rows', 'update:current-page']);

</script>
<template>
  <div class="flex justify-between px-5 py-2.5">
    <div v-if="importExport" class="flex items-center gap-2.5">
      <CustomButton label="Import">
        <img src="@/assets/icons/File Import.svg" alt="" />Import
      </CustomButton>
      <CustomButton label="Eksport">
        <img src="@/assets/icons/File Import.svg" alt="" />Eksport
      </CustomButton>
    </div>
    <CustomPaginator
      :rows="rows"
      :totalrecords="totalRecords"
      :rowsPerPageOptions="rowsPerPageOptions"
      @update:rows="$emit('update:rows', $event)"
      @update:current-page="$emit('update:current-page', $event)"
    />
    
  </div>
</template>
