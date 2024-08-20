<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataNakesDialog from "./TambahDataNakesDialog.vue";
import DetailNakesDialog from "./DetailNakesDialog.vue";
const products = ref<any[]>([]);
const selectedProduct = ref(null);
const onRowSelect = (event: any) => {
  selectedProduct.value = event.data;
  detailNakesDialog.value = true;
};

onMounted(() => {
  products.value = [
    {
      id: "1",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Laki-laki",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Laki-laki",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Perempuan",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      nik: "1666666666",
      STR: "10000000000000",
      name_nakes: "Nama Lengkap Nakes",
      jenis_kelamin: "Laki-laki",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const tambahDataDialog = ref(false);
const detailNakesDialog = ref(false);
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="Nakes" :filter="false" class="mb-5">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="tambahDataDialog = true" />
      </template>
    </Header>
    </template>

    <template #content>
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        class="text-xs"
        selectionMode="single"
        stripedRows
        v-model:selection="selectedProduct"
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
          field="nik"
          header="NIK"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="STR"
          header="STR"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name_nakes"
          header="Name Nakes"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          headerClass="bg-adameds-50"
        >
        <template #header>
          <div class="w-full font-semibold text-center text-SM">
            Jenis Kelamin
          </div>
        </template>
        <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomChip
                :label="slotProps.data.jenis_kelamin"
                :show-checked-icon="false"
                :textColor="
                  slotProps.data.jenis_kelamin === 'Laki-laki'
                    ? 'text-male-300'
                    : 'text-female-300'
                "
                :bgColor="slotProps.data.jenis_kelamin === 'Laki-laki' ? 'bg-male-75':'bg-female-75'"
                :border-color="slotProps.data.jenis_kelamin === 'Laki-laki' ? 'border-male-75':'border-female-75'"
                
                customClass="text-xs font-semibold h-6 flex"
              />
            </div> </template
        ></Column>
        <Column
          field="status"
          header="Status"
          headerClass="bg-adameds-50 flex items-center justify-center"
        >
          <template #body="slotProps">
            <div class="flex items-center justify-center">
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
            <!-- Dialog for Tambah Data Nakes -->
            <CustomDialog
          width="600px"
          v-model:visible="tambahDataDialog"
          headerBg="bg-adameds-300"
        >
          <template #header>Tambah Data Nakes</template>
          <template #body>
            <TambahDataNakesDialog/>
          </template>
          <template #footer>
            <div class="w-full">
              <hr class="-mx-5 border-grey-200" />
              <div class="mt-5 flex justify-end gap-2.5">
                <CustomButton label="Batal" border-color="border-grey-200"  background-color="bg-white" text-color="text-grey-300" > </CustomButton>
                <CustomButton label="Simpan"> </CustomButton>
              </div>
            </div>
          </template>
        </CustomDialog>
    
    <!-- Dialog for Detail Nakes -->
    <CustomDialog
      width="600px"
      v-model:visible="detailNakesDialog"
      headerBg="bg-adameds-300"
    >
      <template #header>Detail Nakes</template>
      <template #body>
        <DetailNakesDialog />
      </template>
      <template #footer>
        <div class="w-full">
          <hr class="-mx-5 border-grey-200" />
          <div class="mt-5 flex justify-end gap-2.5">
            <CustomButton label="Batal" @click="detailNakesDialog = false" border-color="border-grey-200"  background-color="bg-white" text-color="text-grey-300" >
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
