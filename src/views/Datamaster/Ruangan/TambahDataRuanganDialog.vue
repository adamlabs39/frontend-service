<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomButton from "@/components/Base/CustomButton.vue";

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
});

const schema = toTypedSchema(
  yup.object({
    code: yup.string().required("Kode harus diisi"),
    name: yup.string(),
    kategori: yup.string().required("Kategori harus dipilih"),
    nomorKamar: yup
      .number()
      .typeError("Nomor kamar harus diisi")
      .required("Nomor kamar harus diisi")
      .min(1, "Nomor kamar harus lebih besar dari 0")
      .positive("Nomor kamar harus lebih besar dari 0")
      .integer("Nomor kamar harus berupa bilangan bulat"),
    kelas: yup.string().required("Kelas ruangan harus dipilih"),
    jumlahBed: yup
      .number()
      .min(1, "Nomor kamar harus lebih besar dari 0")
      .positive("Nomor kamar harus lebih besar dari 0")
      .integer("Nomor kamar harus berupa bilangan bulat"),
    status: yup
      .bool()
      .required("Status harus diisi")
      .oneOf([true], "Status harus dipilih"),
  })
);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
  emit("close");
});

const [code] = defineField("code");
const [name] = defineField("name");
const [kategori] = defineField("kategori");
const [nomorKamar] = defineField("nomorKamar");
const [kelas] = defineField("kelas");
const [jumlahBed] = defineField("jumlahBed");
const [status] = defineField("status");
const emit = defineEmits(["update:isDialogVisible", "close"]);

function updateVisibility(value: any) {
  emit("update:isDialogVisible", value);
}
function closeDialog() {
  emit("close");
}
watch(
  () => props.isDialogVisible,
  (newValue) => {
    if (!newValue) {
      resetForm();
    }
  }
);
const itemsRuangan = ref([
  { name: "Mawar", code: "MWR" },
  { name: "Melati", code: "MLT" },
  { name: "Anggrek", code: "AGR" },
  { name: "Dahlia", code: "DHL" },
]);
const itemsKategori = ref([
  { name: "Rawat Umum", code: "RU" },
  { name: "VVIP", code: "VVIP" },
  { name: "VIP", code: "VIP" },
]);
</script>
<template>
  <CustomDialog
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    width="600px"
    headerBg="bg-adameds-300"
  >
    <template #header>Tambah Data Ruangan</template>
    <template #body>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex gap-2.5">
          <CustomTextfield
            label="Kode Ruangan"
            v-model="code"
            placeholder="Kode Ruangan"
            :invalid="errors.code ? true : false"
            :invalidMessage="errors.code"
            class="basis-2/6"
          />
          <CustomTextfield
            label="Nama Ruangan"
            v-model="name"
            placeholder="Nama Ruangan"
            class="basis-4/6"
          />
        </div>
        <div class="flex gap-2.5">
          <CustomSelect
            label="Kategori Ruangan"
            v-model="kategori"
            :options="itemsKategori"
            optionValue="code"
            optionLabel="name"
            place-holder="Kategori Ruangan"
            class="basis-4/6"
            :invalid="errors.kategori ? true : false"
            :invalidMessage="errors.kategori"
          />
          <CustomTextfield
            label="Nomor Kamar"
            v-model="nomorKamar"
            placeholder="0"
            class="basis-2/6"
            type="number"
            :invalid="errors.nomorKamar ? true : false"
            :invalidMessage="errors.nomorKamar"
          />
        </div>
        <div class="flex gap-2.5">
          <CustomSelect
            label="Kelas Ruangan"
            v-model="kelas"
            :options="itemsRuangan"
            optionValue="code"
            optionLabel="name"
            place-holder="Kelas Ruangan"
            class="basis-4/6"
            :invalid="errors.kelas ? true : false"
            :invalidMessage="errors.kelas"
          />
          <CustomTextfield
            label="Jumlah Bed"
            v-model="jumlahBed"
            placeholder="0"
            class="basis-2/6"
            type="number"
          >
            <template #appendText>
              <div class="font-semibold text-adameds-300 text-SM m-2.5">
                Bed
              </div>
            </template>
          </CustomTextfield>
        </div>
        <hr class="border-grey-200" />
        <div class="flex gap-2.5 items-end">
          <CustomSwitch
            v-model="status"
            :invalid="errors.status ? true : false"
            :invalidMessage="errors.status"
            label="Status"
          />
          <div>{{ status === true ? "Aktif" : "Non-Aktif" }}</div>
        </div>
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
            @click="closeDialog"
          >
          </CustomButton>
          <CustomButton label="Simpan" @click="onSubmit"> </CustomButton>
        </div>
      </div>
    </template>
  </CustomDialog>
</template>
