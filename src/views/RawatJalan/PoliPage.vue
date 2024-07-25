<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import Textfield from "@/components/Base/Textfield.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const schema = toTypedSchema(
  z.object({
    email: z
      .string({ message: "Email harus diisi" })
      .email({ message: "Format email tidak sesuai" }),
  })
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit((values) => {
  console.log("Submitted with", values);
});

const [email] = defineField("email");

const testLog = () => {
  console.log(email.value);
};

onBeforeMount(() => {
  // setValues({ email: "fahminugroho@gmail.com" });
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
      <button @click="onSubmit">Submit</button>
    </form>
    <div>Semua Poli</div>
  </div>
</template>
