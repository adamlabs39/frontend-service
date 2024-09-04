<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
const props = defineProps({
  method: {
    type: String,
    default: "form",
  },
});

const schema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        listTindakan: yup.string().required("List tindakan harus diisi"),
        harga: yup.string(),
        jumlah: yup.string(),
        petugas: yup.string(),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,

  initialValues: {
    datas: [{ listTindakan: "", harga: "", jumlah: "", petugas: "" }],
  },
});

const { remove, push, fields } = useFieldArray("datas");

const myPushFunction = () => {
  push({ listTindakan: "", harga: "", jumlah: "", petugas: "" });
};

const listTindakanOptions = ref([
  { label: "Pemeriksaan Dokter Spesialis", value: "spesialis" },
  { label: "Pemeriksaan Dokter Biasa", value: "bbiasa" },
]);

const petugasOption = ref([
  { label: "dr.Spesialis Sp. M", value: "spesialis" },
  { label: "Perawat", value: "perawat" },
]);
const tambahTindakan = ref(false);

const products = ref<any[]>([]);
onMounted(() => {
  products.value = [
    {
      nama: "Pemeriksaan Dokter Spesialis",
      harga: "Rp. 100.000",
    },
    {
      nama: "Asuhan Keperawatan",
      harga: "Rp. 50.000",
    },
  ];
});
</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Pemeriksaan dan Tindakan</template>
    <template #content>
      <div v-if="props.method == 'form'" class="pt-5">
        <DataTable
          :value="fields"
          tableStyle="min-width: 50rem"
          class="text-xs bg-adameds-50"
        >
          <Column headerClass="bg-adameds-50 font-semibold text-SM">
            <template #header>
              <div class="flex items-center">No.</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                {{ slotProps.index + 1 }}
              </div>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-2/6">
            <template #header>
              <div class="font-semibold">List Tindakan</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
              prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.value.listTindakan"
                :options="listTindakanOptions"
                optionValue="value"
                optionLabel="label"
                label=""
                place-holder="Jenis Pembayaran Lain"
              />
              <ErrorMessage
                :name="`datas[${slotProps.index}].jenisPembayaran`"
                class="text-danger-300"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" >
            <template #header>
              <div class="font-semibold">Harga</div>
            </template>
            <template #body="slotProps"> Rp.100000 </template>
          </Column>
          <Column headerClass="bg-adameds-50 " class="w-[150px]">
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
              <CustomInputNumber
                :show-label="false"
                v-model="slotProps.data.value.jumlah"
                :show-buttons="true"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-2/6">
            <template #header>
              <div class="w-full font-semibold text-center">Petugas</div>
            </template>
            <template #body="slotProps">
              <CustomMultiSelect
              prepend-icon="PhMagnifyingGlass"
                v-model="slotProps.data.value.petugas"
                :options="petugasOption"
                optionValue="value"
                optionLabel="label"
                label=""
                place-holder="Jenis Pembayaran Lain"
              />
              <ErrorMessage
                :name="`datas[${slotProps.index}].jenisPembayaran`"
                class="text-danger-300"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex items-center justify-center">
                <CustomButton
                  label=""
                  background-color="bg-danger-300 rounded-lg"
                  @click="remove(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" width="15px" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <div
          class="flex items-center justify-center p-5 m-5 border border-dashed rounded-lg border-adameds-300 gap-2.5"
        >
          <CustomButton
            icon="PhPlus"
            label="Tambah Tindakan"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="myPushFunction"
          />
          <CustomButton
            icon="PhPlus"
            label="Tambah Tindakan Multiple"
            borderColor="border-adameds-300"
            textColor="text-adameds-300"
            backgroundColor="bg-white"
            @click="tambahTindakan = true"
          />
        </div>
        <CustomDialog
          width="800px"
          class=""
          v-model:visible="tambahTindakan"
          headerBg="bg-adameds-300"
        >
          <template #header> Tambah Tindakan Multiple </template>
          <template #body>
            <div class="flex flex-col gap-5 mt-5">
              <div class="flex gap-5 items-end w-full">
                <CustomSelect
                prepend-icon="PhMagnifyingGlass"
                  label="Cari Item"
                  place-holder="Asuhan Keperawatan"
                  class="grow"
                />
                <CustomButton><PhPlus :size="16" /></CustomButton>
              </div>
              <DataTable
                :value="products"
                tableStyle="min-width: 40rem"
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
                  field="nama"
                  header="Nama Obat"
                  headerClass="bg-adameds-50"
                ></Column>
                <Column
                  field="harga"
                  header="Harga"
                  headerClass="bg-adameds-50"
                ></Column>
                <Column headerClass="bg-adameds-50">
                  <template #header>
                    <div
                      class="flex items-center justify-center w-full font-semibold text-SM"
                    >
                      Action
                    </div>
                  </template>
                  <template #body="slotProps">
                    <div class="flex items-center gap-2.5 justify-center">
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
              <hr class="border-grey-200" />
              <div class="font-semibold text-MD">Total Item Terpilih : 2</div>
            </div>
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
      </div>
      <div
        v-if="props.method == 'detail'"
        class="py-5 flex flex-col gap-[19px]"
      >
        <CustomInfoRow
          label="List Tindakan"
          value="Pemeriksaan Dokter Spesialis"
        />
        <CustomInfoRow label="Harga" value="Rp. 100,000" />
        <CustomInfoRow label="Jumlah" value="1" />
        <CustomInfoRow label="Petugas" value="dr. Spesialis Sp. M" />
        <hr class="border-grey-200" />
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          v-if="props.method == 'form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="props.method == 'form'" label="Simpan" />
        <CustomButton v-if="props.method == 'detail'" label="Edit" />
      </div>
    </template>
  </CustomAccordion>
</template>
