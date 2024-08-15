<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useIndexStore } from "@/stores";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomAutoComplete from "@/components/Base/CustomAutoComplete.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { downloadPdf } from "@/utils/PdfMake";

const props = defineProps({
  filter: {
    type: String,
    default: "",
  },
});

const indexStore = useIndexStore();

const schema = toTypedSchema(
  yup.object({
    email: yup
      .string()
      .email("Format email tidak sesuai")
      .required("Email harus diisi"),
    password: yup
      .string()
      .min(8, "Password minimal 8 digit")
      .required("Password harus diisi"),
    confirmPassword: yup
      .string()
      .min(8, "Password minimal 8 digit")
      .required("Password harus diisi")
      .oneOf([yup.ref("password")], "Password tidak sama"),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
});

const [email] = defineField("email");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");

const testLog = () => {
  console.log(email.value);
};

const dataApi = ref();
const testAutoComplete = ref();
const itemsAutoComplete = ref([
  "Indonesia",
  "Malaysia",
  "Singapura",
  "Timor Leste",
  "Filipina",
  "Thailand",
]);
// const itemsAutoComplete = ref([
//   { name: "Indonesia", id: 1 },
//   { name: "Malaysia", id: 2 },
//   { name: "Singapura", id: 3 },
//   { name: "Timor Leste", id: 4 },
//   { name: "Filipina", id: 5 },
//   { name: "Thailand", id: 6 },
// ]);

onBeforeMount(async () => {
  setValues({ email: "fahminugroho@gmail.com" });
  dataApi.value = await indexStore.getApi();
});

const testDialog = ref(false);
const dataBreadHome = ref({ label: "Electronics", home: true });
const dataBreadCrumb = ref([{ label: "Components" }, { label: "Components" }]);

console.log(dataApi.value)

const testRef = ref<any>(null);
const testRefFunction = () => {
  testRef.value?.alerTest();
};
</script>
<template>
  <div>
    <CustomBreadCrumb :home="dataBreadHome" :model="dataBreadCrumb" />
    Filter = {{ props.filter }}
    <form class="w-[400px]">
      <CustomTextfield
        ref="testRef"
        v-model="email"
        @input="testLog"
        label="Email"
        :invalid="errors.email ? true : false"
        :invalidMessage="errors.email"
      >
      </CustomTextfield>
      <CustomTextfield
        v-model="password"
        label="Password"
        appendIcon="PhLock"
        :invalid="errors.password ? true : false"
        :invalidMessage="errors.password"
        
      />
      <CustomTextfield
        v-model="confirmPassword"
        label="Confirm Password"
        appendIcon="PhLock"
        :invalid="errors.confirmPassword ? true : false"
        :invalidMessage="errors.confirmPassword"
      />
      <button @click="onSubmit">Submit</button>
    </form>
    <CustomAutoComplete
      v-model="testAutoComplete"
      :options="itemsAutoComplete"
      label="AutoComplete"
      multiple
    />
    <div>Data: {{ testAutoComplete }}</div>
    <div @click="testDialog = true">Show</div>
    <CustomDialog
      class=""
      v-model:visible="testDialog"
      headerBg="bg-danger-300"
    >
      <template #header> 1 </template>
      <template #body>2</template>
      <template #footer>3</template>
    </CustomDialog>
    <div @click="testRefFunction">Semua Poli</div>
    <div v-for="(data, index) in dataApi" :key="index">{{ data.title }}</div>
    <div @click="downloadPdf({ data: { nama: 'fahmi' } })">Download PDF</div>
    <CustomAccordion headerClass="">
      <template #header> Ini adalah header </template>
      <template #content>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem impedit
          corrupti ad qui, ex atque dolore quidem suscipit? Pariatur sint in
          deleniti laudantium alias voluptas sapiente veniam molestias eligendi
          nihil.
        </div>
      </template>
    </CustomAccordion>
  </div>
</template>
