<script setup lang="ts">
import CustomChip from "@/components/Base/CustomChip.vue";

</script>
<template>
    <Card style="width: full; overflow: hidden;height: full;" pt:body:class="bg-adameds-A50">
        <template #content>
            <div>
                <div class="flex items-center gap-2 text-adameds-A300">
                    <img src="../../assets/icons/fa6-solid_bed-pulse.svg" />
                    <div class="text-xs font-normal leading-5">Bed 1 - <span class="text-xs font-bold leading-5">RM 00123456</span></div>                    
                </div>
                <div class="flex items-center">
                    <div class="text-sm font-medium leading-5">Adam Bin Adam</div>
                </div>
                <div class="flex items-center gap-2 text-sm font-normal leading-5">
                    <CustomChip
                            :showCheckedIcon=false
                            label="Tunai"
                            borderColor="border-adameds-A300"
                            textColor="text-adameds-A300"
                            
                        />
                        <CustomChip
                            :showCheckedIcon=false
                            label="Tunai"
                            borderColor="border-adameds-A300"
                            textColor="text-adameds-A300"
                            
                        />
                </div>
            </div>
        </template>
    </Card>

</template>