<script setup lang="ts">
</script>
<template>
    <Card style="width: full; overflow: hidden;height: full;" pt:body:class="bg-adameds-A50">
        <template #content>
            <div class="flex items-center justify-between">
                <div>
                    <div class="flex gap-2">
                        <p class="text-sm font-bold leading-5">UGD</p>
                        <div>button</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <img src="../../assets/icons/user-doctor-solid.svg" />
                        <div class="text-sm font-normal leading-5 text-neutral-normal">dr. Adameds bin Adameds</div>
                    </div>
                    <div class="flex gap-2 text-sm font-normal leading-5">
                        <p>Tanggal</p>
                        <div class="flex items-center justify-center">
                            <PhArrowRight :size="18" />
                        </div>
                        <div>2024-6-12</div>
                        <div>09:00</div>
                    </div>
                </div>
                <div class="flex items-center justify-center">kanan</div>
            </div>
        </template>
    </Card>

</template>