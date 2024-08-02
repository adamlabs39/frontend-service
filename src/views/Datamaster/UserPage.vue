<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const search = ref();
const selectedChipValues = ref<string[]>([]);

const products = ref();
const columns = [
  { field: "no", header: "No" },
  { field: "nama", header: "Nama User" },
  { field: "role", header: "Role" },
  { field: "status", header: "Status" },
  { field: "action", header: "Action" },
];

onMounted(() => {
  products.value = [
    { no: '1', nama: 'Petugas Adameds', role: 'Admin', status: 'AKTIF', action:'edit'},
    { no: '2', nama: 'Petugas Adameds', role: 'Admin', status: 'AKTIF', action:'edit'},
    { no: '3', nama: 'Petugas Adameds', role: 'Admin', status: 'AKTIF', action:'edit'},
    { no: '4', nama: 'Petugas Adameds', role: 'Admin', status: 'AKTIF', action:'edit'},
  ];
});

const onChipSelected = (label: string) => {
  if (selectedChipValues.value.includes(label)) {
    selectedChipValues.value = selectedChipValues.value.filter(
      (item) => item !== label
    );
  } else {
    selectedChipValues.value.push(label);
  }
  console.log(selectedChipValues.value);
};
</script>
<template>
  <div>
    <CustomAccordion headerClass="">
      <template #header>
        <div class="flex justify-between w-full gap-5">
          <div class="flex-none">reload</div>
          <div class="grow">
            <div
              class="font-semibold text-heading text-adameds-A300 leading-[30px]"
            >
              User
            </div>
          </div>
          <div class="flex-none">add</div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-2.5">
          <CustomTextfield
            label="Pencarian"
            aria-placeholder="jfdf"
            prependIcon="PhMagnifyingGlass"
            :modelValue="search"
          />
          <div class="flex items-center gap-2.5">
            <div class="min-w-32 border-r-[0.71px]">Filter Status</div>
            <CustomChip
              label="AKTIF"
              :isSelected="selectedChipValues.includes('AKTIF')"
              @selected="onChipSelected"
            />
            <CustomChip
              label="NON-AKTIF"
              :isSelected="selectedChipValues.includes('NON-AKTIF')"
              @selected="onChipSelected"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>
    <div class="card">
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>
