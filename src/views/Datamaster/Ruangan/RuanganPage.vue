<script lang="ts" setup>
import { ref, onMounted} from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import TambahDataRuanganDialog from "./TambahDataRuanganDialog.vue";
const products = ref<any[]>([]);

const router = useRouter();

onMounted(() => {
  products.value = [
    {
      id: "1",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode_ruangan: "MWR",
      nama_ruangan: "Mawar",
      no_kamar: "1 A",
      kategori_ruangan: "Rawat Umum",
      kelas_ruangan: "Kelas III",
      jml_bed: "4",
      status: "AKTIF",
      action: "edit",
    },
  ];
});


const testDialog = ref(false);
</script>

<template>
  <div
    class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive"
  >
    <Header title="Ruangan" :search="false" :filter="false">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="testDialog = true" />
        <CustomDialog
          width="600px"
          v-model:visible="testDialog"
          headerBg="bg-adameds-300"
        >
          <template #header>Tambah Data Ruangan</template>
          <template #body>
            <TambahDataRuanganDialog/>
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
      </template>
      <template #content>
        <div class="flex items-end justify-between gap-5">
          <CustomTextfield
            class="grow"
            label="Cari Ruangan"
            placeholder="Cari Ruangan"
            prependIcon="PhMagnifyingGlass"
          />
          <CustomSelect class="grow" :is-loading="false" label="Kategori" place-holder="Kategori"/>
          <CustomSelect class="grow" :is-loading="false" label="Kelas" place-holder="Kelas" />
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
          field="nama_ruangan"
          header="Nama Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="no_kamar"
          headerClass="bg-adameds-50"
          class="text-center"
        >
        <template #header>
            <div
              class="w-full font-semibold text-center text-SM"
            >
            No.Kamar
            </div>
        </template></Column>

        <Column
          field="kategori_ruangan"
          header="Kategori Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="kelas_ruangan"
          header="Kelas Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="jml_bed"
          headerClass="bg-adameds-50"
          class="text-center"
        >
        <template #header>
            <div
              class="w-full font-semibold text-center text-SM"
            >
              Jml.Bed
            </div>
        </template></Column>
        <Column
          field="status"
          headerClass="bg-adameds-50"
        >
        <template #header="slotProps">
            <div
              class="w-full font-semibold text-center text-SM"
            >
              Action
            </div>
        </template>
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
    </div>

    <Footer />
  </div>
</template>
