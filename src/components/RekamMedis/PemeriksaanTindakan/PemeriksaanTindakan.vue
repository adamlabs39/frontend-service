<script lang="ts" setup>
import { ref,computed,onBeforeMount } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";

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

</script>
<template>
  <CustomAccordion headerClass="bg-adameds-50">
    <template #header>Pemeriksaan dan Tindakan</template>
    <template #content>
      <div class="pt-5">
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
                :options="jenisBayarOptions"
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
              <CustomTextfield
                v-model="slotProps.data.value.harga"
                label=""
                placeholder="0"
                :invalid="!slotProps.data.value.harga"
              >
                <template #prependText>
                  <div
                    class="font-semibold text-MD leading-7 text-adameds-300 w-[53.34px] flex items-center justify-center border-r"
                  >
                    Rp.
                  </div>
                </template>
              </CustomTextfield>
              <ErrorMessage
                :name="`datas[${slotProps.index}].harga`"
                class="text-danger-300"
              />
            </template>
          </Column>
          <Column headerClass="bg-adameds-50"> 
            <template #header>
              <div class="w-full font-semibold text-center">Jumlah</div>
            </template>
            <template #body="slotProps">
                <CustomInputNumber label="" v-model="slotProps.data.value.jumlah"/>
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-1/2">
            <template #header>
              <div class="w-full font-semibold text-center">Petugas</div>
            </template>
            <template #body="slotProps">
              <CustomSelect
                v-model="slotProps.data.value.petugas"
                :options="jenisBayarOptions"
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
    </template>
    <template #footer>
      <div class="flex items-end justify-end gap-3">
        <CustomButton
          label="Reset"
          textColor="text-[#9DA4B1]"
          backgroundColor="bg-transparent"
          borderColor="border-2 border-[#9DA4B1]"
        />
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomAccordion>
</template>
