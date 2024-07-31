<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useIndexStore } from "@/stores";
import Textfield from "@/components/Base/Textfield.vue";
import AutoComplete from "@/components/Base/AutoComplete.vue";
import Dialog from "@/components/Base/Dialog.vue";
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

const testRef = ref<any>(null);
const testRefFunction = () => {
  testRef.value?.alerTest();
};
</script>
<template>
  <div>
    Filter = {{ props.filter }}
    <form class="w-[400px]">
      <Textfield
        ref="testRef"
        v-model="email"
        @input="testLog"
        label="Email"
        :invalid="errors.email ? true : false"
        :invalidMessage="errors.email"
      >
      </Textfield>
      <Textfield
        v-model="password"
        label="Password"
        appendIcon="PhLock"
        :invalid="errors.password ? true : false"
        :invalidMessage="errors.password"
      />
      <Textfield
        v-model="confirmPassword"
        label="Confirm Password"
        appendIcon="PhLock"
        :invalid="errors.confirmPassword ? true : false"
        :invalidMessage="errors.confirmPassword"
      />
      <button @click="onSubmit">Submit</button>
    </form>
    <AutoComplete
      v-model="testAutoComplete"
      :options="itemsAutoComplete"
      label="AutoComplete"
      multiple
    />
    <div>Data: {{ testAutoComplete }}</div>
    <div @click="testDialog = true">Show</div>
    <Dialog class="" v-model:visible="testDialog" headerBg="bg-danger-D300">
      <template #header> 1 </template>
      <template #body>2</template>
      <template #footer>3</template>
    </Dialog>
    <div @click="testRefFunction">Semua Poli</div>
    <div v-for="(data, index) in dataApi" :key="index">{{ data.title }}</div>
    <div @click="downloadPdf({ data: { nama: 'fahmi' } })">Download PDF</div>
  </div>
</template>
