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
const products = ref<any[]>([]);

const router = useRouter();

onMounted(() => {
  products.value = [
    {
      no: "1",
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
      no: "2",
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
      no: "3",
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
      no: "4",
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
    <Header title="Ruangan">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="testDialog = true" />
        <CustomDialog
          width="600px"
          v-model:visible="testDialog"
          headerBg="bg-adameds-300"
        >
          <template #header>Tambah Data Ruangan</template>
          <template #body>
            <div class="my-5 flex flex-col gap-2.5">
              <div class="flex gap-2.5">
                <CustomTextfield
                  label="Kode Ruangan"
                  placeholder="Kode Ruangan"
                  class="basis-2/6"
                />
                <CustomSelect
                  label="Kategori Ruangan"
                  place-holder="Kategori Ruangan"
                  :is-loading="false"
                  class="basis-4/6"
                />
              </div>
              <div class="flex gap-2.5">
                <CustomTextfield
                  label="Nama Ruangan"
                  placeholder="Nama Ruangan"
                  class="basis-4/6"
                />
                <CustomTextfield
                  label="No"
                  placeholder="Kode Ruangan"
                  class="basis-2/6"
                />
              </div>
              <div class="flex gap-2.5">
                <CustomSelect
                  label="Kategori Ruangan"
                  place-holder="Kategori Ruangan"
                  :is-loading="false"
                  class="basis-4/6"
                />
                <CustomTextfield
                  label="No"
                  placeholder="Kode Ruangan"
                  class="basis-2/6"
                />
              </div>
              <hr />

              <hr />
              <div class="flex gap-2.5">
                <CustomSwitch v-model="status" />
                <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
              </div>
            </div>
          </template>
          <template #footer>
            <CustomButton label="Batal"> </CustomButton>
            <CustomButton label="Simpan"> </CustomButton>
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
          field="nama_ruangan"
          header="Nama Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="no_kamar"
          header="No.Kamar"
          headerClass="bg-adameds-50"
        ></Column>

        <Column
          field="kategori_ruangan"
          header="Kategori Ruangan"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="jml_bed"
          header="Jml.Bed"
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
        <Column header="Action" headerClass="bg-adameds-50">
          <template #body="slotProps">
            <div class="flex items-center justify-center">
              <CustomButton label="" background-color="bg-[#3D84E5] rounded-lg">
                <img src="@/assets/icons/edit.svg" alt="" width="15px" />
              </CustomButton>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Footer />
  </div>
</template>
