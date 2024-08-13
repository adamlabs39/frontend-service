<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";

const products = ref<any[]>([]);

const router = useRouter();

onMounted(() => {
  products.value = [
    { id: "1", name: "Petugas Adameds", role: "Admin", status: "AKTIF" },
    { id: "2", name: "Petugas Adameds", role: "Dokter", status: "NON-AKTIF" },
    { id: "2", name: "dr. Umum", role: "Admin", status: "AKTIF" },
    { id: "4", name: "Perawat", role: "Perawat", status: "NON-AKTIF" },
  ];
});

const addDataPage = () => {
  router.push({ name: "datamaster-user-tambah-data" });
};
</script>

<template>
  <div
    class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive"
  >
    <Header title="User" :filter="false" :search="false">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="addDataPage" />
      </template>
      <template #content>
        <div class="flex items-end justify-between gap-5">
          <CustomTextfield class="grow" label="Cari User" placeholder="Cari Nama User" prependIcon="PhMagnifyingGlass"/>
          <CustomSelect class="grow" :is-loading="false" />
          <div class="flex gap-2.5">
            <CustomButton label="Cari" icon="PhMagnifyingGlass" @click="" />
            <CustomButton
              label="Reset"
              @click=""
              background-color="bg-white"
              border-color="border-adameds-300"
              text-color="text-adameds-300"
            />
          </div>
        </div>
      </template>
    </Header>

    <div class="overflow-scroll grow px-5 pt-2.5">
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        stripedRows
        class="text-xs"
      >
        <Column header="No." headerClass="bg-adameds-50 font-semibold text-SM">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="name"
          header="Nama User"
          class="w-1/2"
          headerClass="bg-adameds-50 font-semibold text-SM"
        ></Column>
        <Column
          field="role"
          header="Role"
          class="w-1/2"
          headerClass="bg-adameds-50 font-semibold text-SM"
        ></Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 flex items-center justify-center font-semibold text-SM"
        >
          <template #body="slotProps">
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status"
                :textColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'text-white'
                    : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status === 'AKTIF' ? 'bg-adameds-300':'bg-white'"
                :borderColor="slotProps.data.status === 'AKTIF' ? 'border-none':'border-[#80868d]'"
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                customClass="text-xs font-semibold h-6 flex"
              />
            </div>
          </template>
        </Column>
        <Column headerClass="bg-adameds-50" class="min-w-[120px]">
          <template #header="slotProps">
            <div
              class="flex items-center justify-center w-full font-semibold text-SM"
            >
              Action
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center gap-2.5 justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
              <CustomButton
                label=""
                background-color="bg-danger-300 rounded-lg"
              >
                <img src="@/assets/icons/delete.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Footer />
  </div>
</template>
