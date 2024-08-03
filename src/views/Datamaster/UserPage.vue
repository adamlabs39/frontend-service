<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const search = ref();
const selectedChipValues = ref<string[]>([]);

const products = ref();

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
    <div class="overflow-scroll grow px-5">
      <DataTable :value="products" tableStyle="min-width: 50rem"
      :pt="{
      	headerRow: 'bg-blue-500 text-white'
    }"
      >
        <Column field="no" header="No"></Column>
        <Column field="nama" header="Nama User" class="w-1/2"></Column>
        <Column field="role" header="Role" class="w-1/2"></Column>
        <Column header="Status">
          <template #body="slotProps">
            <CustomChip
              label="AKTIF"
              borderColor="border-[#80868d]"
              textColor="text-[#80868d]"
              selected-border-color="border-white bg-[#14B8A6]"
              icon-color="#80868d"
              :isSelected="selectedChipValues.includes('AKTIF')"
              @selected="onChipSelected"
            />
          </template>
        </Column>
        <Column header="Action">
          <template #body="slotProps">
            <CustomButton
              label=""
              icon="PhPencilSimple"
              background-color="bg-blue"
            />
          </template>
        </Column>
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
          :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]" :pageLinkSize=1
          :pt="{
            content: {
              class: 'flex gap-0 p-0 m-0 h-[30px] items-center justify-center',
            },
            first: { class: 'rounded-none h-full' },
            prev: { class: 'rounded-none h-full' },
            pages: { class: 'rounded-none h-full' },
            page: {
              class:
                'rounded-none h-full bg-adameds-A300 text-white w-10 h-10 flex items-center justify-center',
            },
            next: { class: 'rounded-none h-full' },
            last: { class: 'rounded-none h-full' },
            pcRowPerPageDropdown: {
              root: 'border-b-2 rounded-none border-white border-b-black ml-5 h-full items-center justify-center',
            },
          }"
        >
          <template #rowsperpagedropdownicon class="border bg-blue">
            <PhCaretDown :size="20" weight="fill" />
          </template>
        </Paginator>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
