<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import TambahDataRoleDialog from "./TambahDataRoleDialog.vue";
const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      id: "1",
      code: "SAD",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
    {
      no: "2",
      code: "ADM",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
    {
      no: "3",
      code: "DKT",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
    {
      no: "4",
      code: "RRW",
      name: "Admin",
      permission: ["Dashboard", "Admisi", "Antrian", "IGD", "Rawat Jalan"],
      status: "AKTIF",
    },
  ];
});

const addData = ref(false);

function handleClose() {
  addData.value = false;
}
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="Role" :filter="false" class="mb-5">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="addData = true" />
          <TambahDataRoleDialog
            v-model:isDialogVisible="addData"
            @close="handleClose"
          />
        </template>
      </Header>
    </template>

    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        stripedRows
        scrollable
        scrollHeight="flex"
        class="text-xs"
      >
        <Column header="No." headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="code"
          header="Kode Role"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama Role"
          class="w-3/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="permission"
          header="Menu Akses"
          class="w-6/12"
          headerClass="bg-adameds-50"
        >
          <template #body="slotProps">
            <div class="flex flex-wrap gap-2">
              <div v-for="items in slotProps.data.permission" :key="items">
                <CustomChip
                  :label="items"
                  :showCheckedIcon="false"
                  border-color="border-none"
                  bg-color="bg-adameds-300"
                  customClass="text-xs font-semibold cursor-auto h-6 bg-adameds-300 text-white pr-2 pl-3 "
                />
              </div>
            </div>
          </template>
        </Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 flex items-center justify-center"
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
                :bgColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'bg-white'
                "
                :borderColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'border-none'
                    : 'border-[#80868d]'
                "
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
    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
