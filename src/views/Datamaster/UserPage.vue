<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const search = ref("");
const selectedChipValues = ref<string[]>([]);
const products = ref<any[]>([]);
const rows = ref(10);
const rowsPerPageOptions = [10, 20, 30];

const router = useRouter();

onMounted(() => {
  products.value = [
    { no: "1", nama: "Petugas Adameds", role: "Admin", status: "AKTIF", action: "edit" },
    { no: "2", nama: "Petugas Adameds", role: "Dokter", status: "NON-AKTIF", action: "edit" },
    { no: "3", nama: "Petugas Adameds", role: "Admin", status: "AKTIF", action: "edit" },
    { no: "4", nama: "Petugas Adameds", role: "Perawat", status: "NON-AKTIF", action: "edit" },
  ];
});

const filteredProducts = computed(() => {
  // Filter berdasarkan status
  const statusFilteredProducts = selectedChipValues.value.length === 0
    ? products.value
    : products.value.filter(product => selectedChipValues.value.includes(product.status));

  // Filter berdasarkan pencarian
  const searchFilteredProducts = statusFilteredProducts.filter(product =>
    product.nama.toLowerCase().includes(search.value.toLowerCase())
  );

  return searchFilteredProducts;
});

const onChipSelected = (label: string) => {
  if (selectedChipValues.value.includes(label)) {
    selectedChipValues.value = selectedChipValues.value.filter(item => item !== label);
  } else {
    selectedChipValues.value.push(label);
  }
};

const addDataPage = () => {
  router.push({ name: "datamaster-user-tambah-data" });
};

const handleRowsUpdate = (newRows: number) => {
  rows.value = newRows;
};

const handlePageUpdate = (newPage: number) => {
  console.log("Current page:", newPage);
};
</script>

<template>
  <div class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive">
    <CustomAccordion headerClass="">
      <template #collapseIcon>
        <CustomButton label="" icon="PhCaretUp" />
      </template>
      <template #expandIcon>
        <CustomButton label="" icon="PhCaretDown" />
      </template>
      <template #header>
        <div class="flex items-center justify-between w-full gap-5 mr-2.5">
          <CustomButton label="" icon="PhArrowClockwise" @click.stop="" />
          <div class="grow font-semibold text-heading text-adameds-300 leading-[30px]">
            User
          </div>
          <CustomButton label="Data" icon="PhPlus" @click.stop="addDataPage" />
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-2.5">
          <CustomTextfield
            label="Pencarian"
            prependIcon="PhMagnifyingGlass"
            v-model="search"
            placeholder="Cari Nama User"
          />
          <div class="flex items-center gap-2.5">
            <div class="min-w-32 border-r-[0.71px]">Filter Status</div>
            <CustomChip
              label="AKTIF"
              textColor="text-[#80868d]"
              selected-border-color="border-white bg-[#14B8A6]"
              icon-color="#80868d"
              :isSelected="selectedChipValues.includes('AKTIF')"
              customClass="text-xs font-semibold cursor-pointer border border-grey-400 h-6 flex"
              @selected="() => onChipSelected('AKTIF')"
            />
            <CustomChip
              label="NON-AKTIF"
              textColor="text-[#80868d]"
              selected-border-color="border-white bg-[#14B8A6]"
              icon-color="#80868d"
              :isSelected="selectedChipValues.includes('NON-AKTIF')"
              customClass="text-xs font-semibold cursor-pointer border border-grey-400 h-6 flex"
              @selected="() => onChipSelected('NON-AKTIF')"
            />
          </div>
        </div>
      </template>
    </CustomAccordion>

    <div class="overflow-scroll grow px-5 pt-2.5">
      <DataTable
        :value="filteredProducts"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
      >
        <Column header="No" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column field="nama" header="Nama User" class="w-1/2" headerClass="bg-adameds-50"></Column>
        <Column field="role" header="Role" class="w-1/2" headerClass="bg-adameds-50"></Column>
        <Column field="status" header="Status" headerClass="bg-adameds-50 flex items-center justify-center">
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status"
                :textColor="slotProps.data.status === 'AKTIF' ? 'text-white' : 'text-[#80868d]'"
                :icon-color="slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'"
                :customClass="`text-xs font-semibold h-6 flex ${slotProps.data.status === 'AKTIF' ? 'bg-adameds-300' : 'border'}`"
              />
            </div>
          </template>
        </Column>
        <Column header="Action" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
                <img src="../../assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="flex justify-between px-5 py-2.5">
      <div class="flex items-center gap-2.5">
        <CustomButton label="Import">
          <img src="../../assets/icons/File Import.svg" alt="" />Import
        </CustomButton>
        <CustomButton label="Eksport">
          <img src="../../assets/icons/File Import.svg" alt="" />Eksport
        </CustomButton>
      </div>
      <CustomPaginator
        :rows="rows"
        :total-records="products.length"
        :rowsPerPageOptions="rowsPerPageOptions"
        @update:rows="handleRowsUpdate"
        @update:first="handlePageUpdate"
      />
    </div>
  </div>
</template>

<style scoped></style>
