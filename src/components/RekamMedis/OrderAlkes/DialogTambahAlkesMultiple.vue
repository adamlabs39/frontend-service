<script lang="ts" setup>
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { ref } from "vue";

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  obatToEdit: Object,
  index: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update:isDialogVisible", "add-alkes"]);

function updateVisibility(value: boolean) {
  emit("update:isDialogVisible", value);
}

const tambahAlkesMultipleSchema = toTypedSchema(
  yup.object({
    datas: yup.array().of(
      yup.object({
        listAlkes: yup.string().required("List tindakan harus diisi"),
        sisaStok: yup.number(),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: tambahAlkesMultipleSchema,
  initialValues: {
    datas: [],
  },
});

const { remove, push, fields } = useFieldArray("datas");

const listAlkes = ref([
  { id: "1", value: "Kasa" },
  { id: "2", value: "Perban" },
  { id: "2", value: "Pil" },
]);

const selectedItem = ref(""); // Store selected item

function addItemToDataTable() {
  if (selectedItem.value) {
    push({
      listAlkes: selectedItem.value,
      sisaStok: 100,
    });
    selectedItem.value = "";
  }
}

const onSubmitTambahAlkesMultiple = handleSubmit((values: any) => {
    emit('add-alkes', values.datas);
    console.log(values.datas)
    resetForm(); // Reset form setelah submit
    emit('update:isDialogVisible', false); // Tutup dialog
})
</script>

<template>
  <CustomDialog
    width="800px"
    class=""
    :visible="isDialogVisible"
    headerBg="bg-adameds-300"
    @update:visible="updateVisibility"
  >
    <template #header> {{ title }} </template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex items-end w-full gap-5">
          <CustomSelect
            prepend-icon="PhMagnifyingGlass"
            label="Cari Item"
            place-holder="Cari Item"
            class="grow"
            :options="listAlkes"
            optionValue="value"
            optionLabel="value"
            v-model="selectedItem"
          />
          <CustomButton @click="addItemToDataTable">
            <PhPlus :size="16" />
          </CustomButton>
        </div>
        <DataTable
          tableStyle="min-width: 40rem"
          :value="fields"
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
          <Column headerClass="bg-adameds-50" class="w-1/2">
            <template #header>
              <div class="font-semibold">List Alkes</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.value.listAlkes }}
            </template>
          </Column>
          <Column headerClass="bg-adameds-50" class="w-1/2">
            <template #header>
              <div class="font-semibold">List Alkes</div>
            </template>
            <template #body="slotProps">
              {{ slotProps.data.value.sisaStok }}
            </template>
          </Column>
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
                  @click="remove(slotProps.index)"
                >
                  <img src="@/assets/icons/delete.svg" alt="" />
                </CustomButton>
              </div>
            </template>
          </Column>
        </DataTable>
        <hr class="border-grey-200" />
        <div class="font-semibold text-MD">Total Item Terpilih : {{ fields.length }}</div>
      </div>
    </template>
    <template #footer>
      <div class="w-full">
        <hr class="-mx-5 border-grey-200" />
        <div class="mt-5 flex justify-end gap-2.5">
          <CustomButton
            label="Hapus Semua"
            border-color=" border-2 border-danger-300"
            background-color="bg-white"
            text-color="text-danger-300"
            @click="resetForm"
          >
          </CustomButton>
          <CustomButton label="Ambil Item" @click="onSubmitTambahAlkesMultiple"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
