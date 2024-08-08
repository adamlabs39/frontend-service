<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import TambahKategoriRuanganDialog from "./TambahKategoriRuanganDialog.vue";
const products = ref<any[]>([]);

const router = useRouter();

onMounted(() => {
  products.value = [
    {
      no: "1",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "2",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "3",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
    {
      no: "4",
      kode_ruangan: "MWR",
      nama_kategori_ruangan: "Mawar",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const addDataPage = () => {
  router.push({ name: "datamaster-user-tambah-data" });
};
const testDialog = ref(false);
const status = ref();
</script>

<template>
  <div
    class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive"
  >
    <Header title="Kategori Ruangan">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="testDialog = true" />
        <CustomDialog
          width="600px"
          v-model:visible="testDialog"
          headerBg="bg-adameds-300"
        >
          <template #header>Tambah Data Ruangan</template>
          <template #body>
            <TambahKategoriRuanganDialog/>
          </template>
          <template #footer>
            <div class="w-full">
              <hr class="-mx-5 border-grey-200" />
              <div class="mt-5 flex justify-end gap-2.5">
                <CustomButton label="Batal"> </CustomButton>
                <CustomButton label="Simpan"> </CustomButton>
              </div>
            </div>
          </template>
        </CustomDialog>
      </template>
    </Header>

    <div class="overflow-scroll grow px-5 pt-2.5">
      <DataTable
        :value="products"
        tableStyle="min-width: 50rem"
        :pt="{ headerRow: 'bg-blue-500 text-white' }"
        class="text-xs"
      >
        <Column header="No" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              {{ slotProps.index + 1 }}
            </div>
          </template>
        </Column>
        <Column
          field="kode_ruangan"
          header="Kode Ruangan"
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
            <div class="flex justify-center items-center min-w-[120px]">
              <CustomChip
                :label="slotProps.data.status"
                :textColor="
                  slotProps.data.status === 'AKTIF'
                    ? 'text-white'
                    : 'text-[#80868d]'
                "
                :icon-color="
                  slotProps.data.status === 'AKTIF' ? 'white' : '#80868d'
                "
                :customClass="`text-xs font-semibold h-6 flex ${
                  slotProps.data.status === 'AKTIF'
                    ? 'bg-adameds-300'
                    : 'border'
                }`"
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
