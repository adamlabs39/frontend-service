<script lang="ts" setup>
import { ref } from "vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);
</script>

<template>
    <div class="bg-white flex flex-col justify-between overflow-hidden h-full">
        <div class="flex justify-between px-5 items-center">
            <CustomButton label="" icon="PhArrowClockwise" @click.stop="" />
            <CustomBreadCrumb :home="dataBreadHome" :model="dataBreadCrumb" class="grow" />
            <CustomButton label="Kembali" icon="PhCaretLeft" />
        </div>
        <div class="grow flex flex-row pl-5 overflow-hidden">
            <div class="basis-1/2 flex flex-col gap-5 overflow-hidden">
                <CustomSelect label="Role" placeHolder="Pilih Role" />
                <div class="border grow overflow-auto p-2">
                    <div>dfdfd</div>
                    <div>dfdfd</div>
                    <div>dfdfd</div>
                </div>
            </div>
            <div class="basis-1/2 px-5 flex flex-col gap-2.5 overflow-hidden">
                <div class="grow overflow-auto flex flex-col gap-2.5">
                    <CustomAccordion headerClass="">
                        <template #collapseIcon>
                            <PhCaretUp :size="20" class="text-adameds-A300" />
                        </template>
                        <template #expandIcon>
                            <PhCaretDown :size="20" class="text-adameds-A300" />
                        </template>
                        <template #header>Akun</template>
                        <template #content>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit
                                corrupti ad qui, ex atque dolore quidem suscipit? Pariatur sint in
                                deleniti laudantium alias voluptas sapiente veniam molestias eligendi
                                nihil.
                            </div>
                        </template>
                    </CustomAccordion>
                    <CustomAccordion headerClass="">
                        <template #collapseIcon>
                            <PhCaretUp :size="20" class="text-adameds-A300" />
                        </template>
                        <template #expandIcon>
                            <PhCaretDown :size="20" class="text-adameds-A300" />
                        </template>
                        <template #header>Data User</template>
                        <template #content>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit
                                corrupti ad qui, ex atque dolore quidem suscipit? Pariatur sint in
                                deleniti laudantium alias voluptas sapiente veniam molestias eligendi
                                nihil.
                            </div>
                        </template>
                    </CustomAccordion>
                    <div>
                        <div>Status</div>
                        <div class="w-full border rounded-lg p-2.5">
                            <CustomSwitch />
                        </div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div class="w-full border rounded-lg p-2.5">
                            <CustomSwitch />
                        </div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div class="w-full border rounded-lg p-2.5">
                            <CustomSwitch />
                        </div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div class="w-full border rounded-lg p-2.5">
                            <CustomSwitch />
                        </div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div class="w-full border rounded-lg p-2.5">
                            <CustomSwitch />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-2.5 px-5 py-2.5">
            <CustomButton label="Batal" @click.stop="" />
            <CustomButton label="Simpan" @click.stop="" />
        </div>
    </div>
</template>
