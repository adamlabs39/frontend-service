<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

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
    {
      no: "1",
      nama: "Petugas Adameds",
      role: "Admin",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "2",
      nama: "Petugas Adameds",
      role: "Admin",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "3",
      nama: "Petugas Adameds",
      role: "Admin",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "4",
      nama: "Petugas Adameds",
      role: "Admin",
      status: "AKTIF",
      action: "edit",
    },
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

const first = ref(0);
</script>
<template>
  <div
    class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive"
  >
    <CustomAccordion headerClass="">
      <template #collapseIcon>
        <CustomButton label="" icon="PhCaretUp" />
      </template>
      <template #expandIcon>
        <CustomButton label="" icon="PhCaretDown" />
      </template>
      <template #header>
        <div class="flex items-center justify-between w-full gap-5 mr-2.5">
          <div class="flex-none">
            <CustomButton label="" icon="PhArrowClockwise" @click.stop="" />
          </div>
          <div class="grow">
            <div
              class="font-semibold text-heading text-adameds-A300 leading-[30px]"
            >
              User
            </div>
          </div>
          <div class="flex-none">
            <CustomButton label="Data" icon="PhPlus" />
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-2.5">
          <CustomTextfield
            label="Pencarian"
            aria-placeholder="jfdf"
            prependIcon="PhMagnifyingGlass"
            :modelValue="search"
            placeholder="Cari Nama User"
          />
          <div class="flex items-center gap-2.5">
            <div class="min-w-32 border-r-[0.71px]">Filter Status</div>
            <CustomChip
              label="AKTIF"
              borderColor="border-[#80868d]"
              textColor="text-[#80868d]"
              selected-border-color="border-white bg-[#14B8A6]"
              icon-color="#80868d"
              :isSelected="selectedChipValues.includes('AKTIF')"
              @selected="onChipSelected"
            />
            <CustomChip
              label="NON-AKTIF"
              borderColor="border-[#80868d]"
              textColor="text-[#80868d]"
              selected-border-color="border-white bg-[#14B8A6]"
              icon-color="#80868d"
              :isSelected="selectedChipValues.includes('NON-AKTIF')"
              @selected="onChipSelected"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>
    <div class="overflow-scroll grow">
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
          pt:header:class="bg-blue-500"
      >
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
    <div class="flex justify-between mx-5">
      <div class="flex items-center gap-2.5">
        <CustomButton label="Import">
          <img src="../../assets/icons/File Import.svg" alt="" />Import
        </CustomButton>
        <CustomButton label="Eksport">
          <img src="../../assets/icons/File Import.svg" alt="" />Eksport
        </CustomButton>
      </div>
      <div class="flex gap-2.5 items-center">
        <div>Total Data: 100</div>
        <Paginator
          :rows="10"
          :totalRecords="120"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="{first}"
          :rowsPerPageOptions="[10, 20, 30]"
          pt:page:root:class="bg-black"
        >
        </Paginator>
      </div>
    </div>
  </div>
</template>
<style scoped>
.p-paginator-first .disabled {
  background-color: black;
}
</style>
