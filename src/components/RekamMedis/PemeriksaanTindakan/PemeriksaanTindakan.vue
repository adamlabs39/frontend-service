<script lang="ts" setup>
import { ref,computed,onBeforeMount } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomMultiSelect from "@/components/Base/CustomMultiSelect.vue";

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
        harga: yup
          .string(),
        jumlah: yup.string(),
        petugas: yup.string(),
      })
    )
     
  })
);

const { errors, handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
 
  initialValues: {
    datas: [{ listTindakan: '', harga: '', jumlah:'',petugas:'' }],
  },

});

const { remove, push, fields  } = useFieldArray('datas');

const myPushFunction = () => {
  push({ listTindakan: '', harga: '', jumlah:'',petugas:'' });
};

const listTindakanOptions = ref([
  { label: "Pemeriksaan Dokter Spesialis", value: "spesialis" },
  { label: "Pemeriksaan Dokter Biasa", value: "bbiasa" },
]);

const petugasOption=ref([
{ label: "dr.Spesialis Sp. M", value: "spesialis" },
{ label: "Perawat", value: "perawat" },
])

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Pemeriksaan dan Tindakan</template>
    <template #content>
      <div v-if="props.method=='form'" class="pt-5">
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
          <Column headerClass="bg-adameds-50" class="w-1/2">
            <template #header>
              <div class="font-semibold">List Tindakan</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                v-model="slotProps.data.value.listTindakan"
                :options="listTindakanOptions"
                optionValue="value"
                optionLabel="label"
                label=""
                place-holder="Jenis Pembayaran Lain"
                :invalid="!slotProps.data.value.jenisPembayaran"
              />
              <ErrorMessage
                :name="`datas[${slotProps.index}].jenisPembayaran`"
                class="text-danger-300"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50">
            <template #header>
              <div class="font-semibold ">Harga</div>
            </template>
            <template #body="slotProps">
              Rp.100000
            </template>
          </Column>
          <Column headerClass="bg-adameds-50"> 
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
                <CustomInputNumber :show-label="false" v-model="slotProps.data.value.jumlah" :show-buttons="true" class="w-[100px]"/>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-1/2">
            <template #header>
              <div class="w-full font-semibold text-center">Petugas</div>
            </template>
            <template #body="slotProps">
              
              <CustomMultiSelect
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
            @click="myPushFunction"
          />
        </div>
      </div>
      <div v-if="props.method=='detail'" class="py-5 flex flex-col gap-[19px]">
        <CustomInfoRow label="List Tindakan" value="Pemeriksaan Dokter Spesialis"/>
        <CustomInfoRow label="Harga" value="Rp. 100,000" />
        <CustomInfoRow label="Jumlah" value="1" />
        <CustomInfoRow label="Petugas" value="dr. Spesialis Sp. M" />
        <hr class="border-grey-200">
        <CustomInfoRow label="Petugas Input" value="Nama Petugas" />
      </div>
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
        v-if="props.method=='form'"
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton v-if="props.method=='form'" label="Simpan" />
        <CustomButton v-if="props.method=='detail'" label="Edit" />

      </div>
    </template>
  </CustomAccordion>
</template>
