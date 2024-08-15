<script lang="ts" setup>
import { ref, onMounted, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import TambahDataICD9CMDialog from "./TambahDataICD9CMDialog.vue";
import { useIcd9Store } from "@/stores/icd9";
const products = ref<any[]>([]);

const icd9Store = useIcd9Store();
const icd9Response = ref();

onBeforeMount(async () => {
  const response = await icd9Store.getApi();
  icd9Response.value = response.payload;
});

//   icd9Response.value=await icd9Response.value.payload
//   console.log('test 2', icd9Response.value)
// })
// onMounted(() => {
//   products.value = [
//     {
//       id: "1",
//       kode: "001",
//       nama: "Cholera disease",
//       status: "AKTIF",
//       action: "edit",
//     },
//     {
//       id: "2",
//       kode: "002",
//       nama: "Typhoid and paratyphoid fevers",
//       status: "AKTIF",
//       action: "edit",
//     },
//     {
//       id: "3",
//       kode: "003",
//       nama: "Other Salmonella",
//       status: "AKTIF",
//       action: "edit",
//     },
//     {
//       id: "4",
//       kode: "004",
//       nama: "Dizziness and giddiness",
//       status: "AKTIF",
//       action: "edit",
//     },
//   ];
// });

const testDialog = ref(false);
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <Header title="ICD 9 CM" :filter="false">
        <template #header>
          <CustomButton label="Data" icon="PhPlus" @click="testDialog = true" />
          <CustomDialog
            width="600px"
            v-model:visible="testDialog"
            headerBg="bg-adameds-300"
          >
            <template #header>Tambah Data Role</template>
            <template #body>
              <TambahDataICD9CMDialog />
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
                  >
                  </CustomButton>
                  <CustomButton label="Simpan"> </CustomButton>
                </div>
              </div>
            </template>
          </CustomDialog>
        </template>
      </Header>
    </template>
    <template #content>
      <DataTable
        :value="icd9Response"
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
          field="code"
          header="Kode"
          class="w-2/12"
          headerClass="bg-adameds-50"
        ></Column>
        <Column
          field="name"
          header="Nama ICD 9 CM"
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
                :label="slotProps.data.status ? 'AKTIF' : 'NON-AKTIF'"
                :textColor="
                  slotProps.data.status ? 'text-white' : 'text-[#80868d]'
                "
                :bgColor="slotProps.data.status ? 'bg-adameds-300' : 'bg-white'"
                :borderColor="
                  slotProps.data.status ? 'border-none' : 'border-[#80868d]'
                "
                :icon-color="slotProps.data.status ? 'white' : '#80868d'"
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
