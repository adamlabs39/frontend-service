<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataDokter from "./TambahDataDokterDialog.vue";
import DetailDokterDialog from "./DetailDokterDialog.vue";

const products = ref<any[]>([]);
const selectedProduct = ref(null);
const router = useRouter();
const tambahDataDialog = ref(false);
const detailDokterDialog = ref(false);

const onRowSelect = (event: any) => {
  selectedProduct.value = event.data;
  detailDokterDialog.value = true;
};

onMounted(() => {
  products.value = [
    {
      no: "1",
      kode: "001",
      nama: "Cholera disease",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "2",
      kode: "002",
      nama: "Typhoid and paratyphoid fevers",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "3",
      kode: "003",
      nama: "Other Salmonella",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "4",
      kode: "004",
      nama: "Dizziness and giddiness",
      status: "AKTIF",
      action: "edit",
    },
  ];
});
const metaKey = ref(true);
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="Dokter" :filter="false" class="mb-5">
        <template #header>
          <CustomButton
            label="Data"
            icon="PhPlus"
            @click="tambahDataDialog = true"
          />
        </template>
      </Header>
    </template>

    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        class="text-xs"
        selectionMode="single"
        :metaKeySelection="metaKey"
        v-model:selection="selectedProduct"
        stripedRows
        @rowSelect="onRowSelect"
        scrollable
        scrollHeight="flex"
      >
        <Column headerClass="bg-adameds-50">
          <template #header>
            <div class="w-full font-semibold text-center">No.</div>
          </template>
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="kode"
          header="Kode Role"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="nama"
          header="Nama Role"
          class="w-3/12"
          headerClass="bg-adameds-50"
        ></Column>
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
                background-color="bg-adameds-300 rounded-lg"
              >
                <img src="@/assets/icons/dokter.svg" alt="" width="15px" />
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
      <!-- Dialog for Tambah Data Dokter -->
      <CustomDialog
        width="600px"
        v-model:visible="tambahDataDialog"
        headerBg="bg-adameds-300"
      >
        <template #header>Tambah Data Dokter</template>
        <template #body>
          <TambahDataDokter />
        </template>
        <template #footer>
          <div class="w-full">
            <hr class="-mx-5 border-grey-200" />
            <div class="mt-5 flex justify-end gap-2.5">
              <CustomButton
                label="Batal"
                border-color="border-grey-200"
                background-color="bg-white"
                text-color="text-grey-300"
                @click="tambahDataDialog = false"
              >
              </CustomButton>

              <CustomButton label="Simpan"> </CustomButton>
            </div>
          </div>
        </template>
      </CustomDialog>

      <!-- Dialog for Detail Dokter -->
      <CustomDialog
        width="800px"
        v-model:visible="detailDokterDialog"
        headerBg="bg-adameds-300"
      >
        <template #header>Detail Dokter</template>
        <template #body>
          <DetailDokterDialog />
        </template>
        <template #footer>
          <div class="w-full">
            <hr class="-mx-5 border-grey-200" />
            <div class="mt-5 flex justify-end gap-2.5">
              <CustomButton
                label="Batal"
                @click="detailDokterDialog = false"
                border-color="border-grey-200"
                background-color="bg-white"
                text-color="text-grey-300"
              >
              </CustomButton>
              <CustomButton label="Simpan"> </CustomButton>
            </div>
          </div>
        </template>
      </CustomDialog>
    </template>

    <template #footer>
      <Footer />
    </template>
  </Card>
</template>
<style>
.p-datatable-row-selected {
  @apply bg-transparent text-black;
}
</style>
