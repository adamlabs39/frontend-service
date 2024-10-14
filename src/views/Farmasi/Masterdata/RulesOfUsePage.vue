<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const emits = defineEmits(['update:rows', 'update:current-page']);
const rulesDialog = ref(false);
const rowsPerPage = ref(10);
const currentPage = ref(0);

const handleRowsUpdate = (newRows: number) => {
  rowsPerPage.value = newRows;
  currentPage.value = 0;
};

const handlePageUpdate = (newPage: number) => {
  currentPage.value = newPage;
};

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string().required("Nama Role harus diisi"),
    permission: yup
      .array()
      .of(yup.string().required("Permission harus dipilih")),  // Validate that each permission is a string and required
    status: yup.bool(),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const [name] = defineField("name");
const [code] = defineField("code");
const [status] = defineField("status");

const dataAturanPakai = ref([
  { kodeAturan: "123", namaAturan: "Tiap 8 jam", status:"AKTIF" },
  { kodeAturan: "321", namaAturan: "Tiap 7 hari", status:"AKTIF" },
  { kodeAturan: "123", namaAturan: "3 x Sehari", status:"AKTIF" },
  { kodeAturan: "321", namaAturan: "3 - 4 x Sehari", status:"AKTIF" },
  { kodeAturan: "123", namaAturan: "Tiap sejam 1x", status:"NON-AKTIF" },
  { kodeAturan: "123", namaAturan: "Tiap sejam 1x", status:"NON-AKTIF" },
  { kodeAturan: "123", namaAturan: "Tiap sejam 1x", status:"NON-AKTIF" },
  { kodeAturan: "123", namaAturan: "Tiap sejam 1x", status:"NON-AKTIF" },
]);
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <CustomBreadCrumb
                  :home="{
                    label: 'Datamaster',
                    home: true,
                  }"
                />
                <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
                <div class="">
                  <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Aturan Pakai</p>
                </div>
              </div>
              <CustomButton
                @click="rulesDialog = true"
                icon="PhPlus"
                label="Beli"
                class="mr-[10px]"
              />
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 mt-[10px]">
              <CustomTextfield
                label="Cari Aturan Pakai"
                prependIcon="PhMagnifyingGlass"
                placeholder="Cari Aturan Pakai"
                class=""
              />
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <DataTable
          :value="dataAturanPakai"
          tableStyle="min-width: 50rem"
          stripedRows
          class="text-xs"
          scrollable
          scrollHeight="flex"
        >
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column field="kodeAturan" header="Kode Aturan Pakai" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="namaAturan" header="Nama Aturan Pakai" headerClass="bg-adameds-50 font-semibold text-SM"></Column>
          <Column field="status" headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="w-full text-center">Status</div>
            </template>
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
                  customClass="text-xs font-semibold h-5 flex"
                />
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header="slotProps">
              <div
                class="w-full font-semibold text-center text-SM"
              >
                Action
              </div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center gap-2.5 justify-center">
                <CustomButton
                  label=""
                  background-color="bg-[#3D84E5] rounded-lg"
                  class="h-6 w-[26px] p-0"
                >
                  <img src="@/assets/icons/edit.svg" alt="" />
                </CustomButton>
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  class="h-6 w-[26px] p-0"
                >
                  <img src="@/assets/icons/delete.svg" alt="" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
      <template #footer>
        <div class="flex justify-between px-5 py-2.5">
          <div class="flex items-center gap-2.5">
            <CustomButton label="Import">
              <img src="@/assets/icons/File Import.svg" alt="" />Import
            </CustomButton>
            <CustomButton label="Eksport">
              <img src="@/assets/icons/File Import.svg" alt="" />Eksport
            </CustomButton>
          </div>
          <CustomPaginator
            :rows="rowsPerPage"
            :totalRecords="dataAturanPakai.length"
            :rowsPerPageOptions="[10, 20, 30]"
            @update:rows="handleRowsUpdate"
            @update:current-page="handlePageUpdate"
          />
        </div>
      </template>
    </Card>

    <!-- rulesDialog -->
    <CustomDialog v-model:visible="rulesDialog" width="600px">
      <template #header>
        <div class="grid grid-cols-1">
          <p>Tambah Data Aturan Pakai</p>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-[30%,70%]">
          <div class="mt-[20px]">
            <CustomTextfield
              v-model = "code"
              :invalid="!!errors.code"
              :invalidMessage="errors.code"
              label="Kode Aturan Pakai"
              placeholder="Kode Aturan Pakai"
              class="mr-2"
            />
          </div>
          <div class="mt-[20px]">
            <CustomTextfield
              v-model = "name"
              :invalid="!!errors.name"
              :invalidMessage="errors.name"
              label="Nama Aturan Pakai"
              placeholder="Nama Aturan Pakai"
              class="ml-2"
            />
          </div>
        </div>
        <div class="grid grid-cols-[30%,30%,10%,30%] mt-[20px]">
          <div class="">
            <CustomSelect
              label="Periode Unit"
              class="mr-2"
              optionLabel=""
              optionValue=""
              :options="['Pagi', 'Siang', 'Sore', 'Malem']"
            />
          </div>
          <div class="ml-[10px]">
            <CustomTextfield
              label="Frekuensi"
              placeholder="3"
            />
          </div>
          <div class="text-center ml-[10px]">
            <p class="font-bold mt-[30px]">X</p>
          </div>
          <div class="ml-[10px]">
            <CustomTextfield
              label="Periode"
              placeholder="1"
              class=""
            />
          </div>
        </div>
        <div class="grid grid-cols-1 p-3 rounded-lg bg-adameds-50 mt-[20px]">
          <div>
            <p>Contoh Pengisian Aturan Pakai :</p>
          </div>
          <hr class="mt-[10px] border border-slate-300"/>
          <div class="grid grid-cols-[30%,30%,10%,30%] mt-[10px]">
            <div>
              <p class="text-xs font-bold underline underline-offset-2">Periode Unit</p>
              <p class="">Hari</p>
            </div>
            <div class="ml-[10px]">
              <p class="text-xs font-bold underline underline-offset-2">Frekuensi</p>
              <p>3</p>
            </div>
            <div class="text-center ml-[10px]">
              <p class="font-bold mt-[10px]">X</p>
            </div>
            <div class="ml-[10px]">
              <p class="text-xs font-bold underline underline-offset-2">Periode</p>
              <p>1</p>
            </div>
          </div>
        </div>
        <hr class="mt-[20px] border border-slate-300"/>
        <div class="grid grid-cols-1 mt-[15px]">
          <div>
            <CustomSwitch
              v-model="status"
              :show-label="true"
              label="Status"
              sideLabel="NON-AKTIF"
              sideLabelTrue="AKTIF"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="w-full">
          <!-- <hr class="-mx-5 border-grey-200" /> -->
          <div class="mt-5 flex justify-end gap-2.5">
            <CustomButton
              label="Reset"
              textColor="text-grey-300"
              backgroundColor="bg-transparent"
              borderColor="border-2 border-grey-200"
            />
            <CustomButton label="Simpan"/>
          </div>
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
