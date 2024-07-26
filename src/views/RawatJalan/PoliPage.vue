<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useIndexStore } from "@/stores";
import Textfield from "@/components/Base/Textfield.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

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

onBeforeMount(async () => {
  setValues({ email: "fahminugroho@gmail.com" });
  dataApi.value = await indexStore.getApi();
});

const testRef = ref<any>(null);
const testRefFunction = () => {
  testRef.value?.alerTest();
};
</script>
<template>
  <div>
    <form class="w-[400px]">
      <Textfield
        ref="testRef"
        v-model="email"
        @input="testLog"
        label="Email"
        appendIcon="PhEnvelope"
        :invalid="errors.email ? true : false"
        :invalidMessage="errors.email"
      />
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
    <div @click="testRefFunction">Semua Poli</div>
    <div v-for="(data, index) in dataApi" :key="index">{{ data.title }}</div>
  </div>
</template>
