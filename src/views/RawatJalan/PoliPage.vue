<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import Textfield from "@/components/Base/Textfield.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";

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

onBeforeMount(() => {
  setValues({ email: "fahminugroho@gmail.com" });
});
</script>
<template>
  <div>
    <form>
      <Textfield
        v-model="email"
        @input="testLog"
        label="Email"
        appendIcon="PhEnvelope"
        :invalid="errors.email ? true : false"
        :invalidMessage="errors.email"
      />
      <Textfield
        v-model="password"
        @input="testLog"
        label="Password"
        appendIcon="PhLock"
        :invalid="errors.password ? true : false"
        :invalidMessage="errors.password"
      />
      <Textfield
        v-model="confirmPassword"
        @input="testLog"
        label="Confirm Password"
        appendIcon="PhLock"
        :invalid="errors.confirmPassword ? true : false"
        :invalidMessage="errors.confirmPassword"
      />
      <button @click="onSubmit">Submit</button>
    </form>
    <div>Semua Poli</div>
  </div>
</template>
