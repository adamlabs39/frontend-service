<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import TambahKategoriRuanganDialog from "./TambahKategoriRuanganDialog.vue";
const products = ref<any[]>([]);

onMounted(() => {
  products.value = [
    {
      id: "1",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const dialogData = ref({
  isVisible: false,
  method: "add",
  title: "Tambah Data"
});

function handleAdd() {
  dialogData.value = {
    isVisible: true,
    method: "add",
    title: "Tambah Data"
  };
}

function handleEdit() {
  dialogData.value = {
    isVisible: true,
    method: "edit",
    title: "Edit Data"
  };
}

function handleClose() {
  dialogData.value.isVisible = false;
}


</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
  <template #header >
    <Header title="Kategori Ruangan" class="mb-5">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="handleAdd" />
        
      </template>
    </Header>
  </template>
    
<template #content>
  <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        stripedRows
        class="text-xs"
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
          field="kode_ruangan"
          header="Kode Kategori Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="nama_kategori_ruangan"
          header="Nama Kategori Ruangan"
          headerClass="bg-adameds-50"
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
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg"  @click="handleEdit">
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
      <TambahKategoriRuanganDialog  
        v-model:isDialogVisible="dialogData.isVisible"
        :title="dialogData.title"
        :method="dialogData.method"
        @close="handleClose"/>

</template>

<template #footer>
  <Footer />
</template>
    
  </Card>
</template>
