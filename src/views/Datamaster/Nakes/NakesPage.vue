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
import TambahDataNakesDialog from "./TambahDataNakesDialog.vue";
const products = ref<any[]>([]);

const router = useRouter();

onMounted(() => {
  products.value = [
    {
      id: "1",
      kode: "001",
      nama: "Cholera disease",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "2",
      kode: "002",
      nama: "Typhoid and paratyphoid fevers",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "3",
      kode: "003",
      nama: "Other Salmonella",
      status: "AKTIF",
      action: "edit",
    },
    {
      id: "4",
      kode: "004",
      nama: "Dizziness and giddiness",
      status: "AKTIF",
      action: "edit",
    },
  ];
});

const testDialog = ref(false);
const status = ref();
</script>

<template>
  <div
    class="flex flex-col justify-between overflow-hidden bg-white border rounded border-neutral-lightActive"
  >
    <Header title="Nakes" :filter="false">
      <template #header>
        <CustomButton label="Data" icon="PhPlus" @click="testDialog = true" />
        <CustomDialog
          width="600px"
          v-model:visible="testDialog"
          headerBg="bg-adameds-300"
        >
          <template #header>Tambah Data Role</template>
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
          field="kode"
          header="Kode"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="nama"
          header="Nama Nakes"
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
