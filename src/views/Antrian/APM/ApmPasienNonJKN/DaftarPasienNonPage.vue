<script lang="ts" setup>
import NavbarAntrian from "@/components/Antrian/NavbarAntrian.vue";
import OrnamentAntrian from "@/components/Antrian/OrnamentAntrian.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { useApmStore } from "@/stores/antrian/apm";
import { utilsStore } from "@/stores/utils";
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { useApmFlowStore } from "@/utils/apmFlow";

const router = useRouter();

const selectedType = ref<string | null>(null);
const isDisabled = computed(() => !selectedType.value);

const useUtilsStore = utilsStore();
const apmStore = useApmStore();
const authStore = useAuthStore();
const apmFlow = useApmFlowStore();

const faskesUuid = computed(() => authStore.getFaskesUuid);

const selectType = (type: string) => {
  selectedType.value = type;
};

const handleHome = () => {
  router.push("/antrian/apm/aktif");
};

// Validasi dinamis berdasarkan tipe yang dipilih
const schema = toTypedSchema(
  yup.object({
    no_identity: yup
      .string()
      .required("Nomor identitas wajib diisi")
      .test("by-type", "", function (val) {
        const type = selectedType.value;
        const value = (val ?? "").trim();

        switch (type) {
          case "KTP":
            // 16 digit angka
            return (
              /^\d{16}$/.test(value) ||
              this.createError({
                message: "Nomor KTP harus terdiri dari 16 digit angka",
              })
            );

          case "Passport":
            // diawali huruf besar, diikuti angka (contoh: E1230887)
            return (
              /^[A-Z][0-9]+$/.test(value) ||
              this.createError({
                message:
                  "Nomor Passport harus diawali huruf besar diikuti angka (contoh: E1230887)",
              })
            );

          case "RM":
            // format 01-02-10 => 8 karakter dengan 2 tanda dash
            return (
              /^\d{2}-\d{2}-\d{2}$/.test(value) ||
              this.createError({
                message:
                  "Nomor RM harus terdiri dari 8 karakter dengan format 01-02-10 (2 tanda dash)",
              })
            );

          case "Lainnya":
          default:
            // bebas (tidak ada validasi panjang/format)
            return true;
        }
      }),
  })
);

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: schema,
});

const [no_identity] = defineField("no_identity");

const identityLabel = computed(() =>
  selectedType.value ? `No. ${selectedType.value}` : "No."
);

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  try {
    useUtilsStore.setLoading(true);

    const payload = {
      faskes_uuid: faskesUuid.value,
      no_identity: values.no_identity,
      identity: selectedType.value,
    };

    const response = await apmStore.checkPasien(payload);

    if (response?.payload && response.payload.uuid) {
      // Simpan ke store, lalu navigasi tanpa query sensitif
      apmFlow.setPatientStatus("success");
      apmFlow.setIdentity(selectedType.value || "", values.no_identity);
      apmFlow.setPatientData(response.payload);

      router.push({
        path: "/antrian/apm/aktif/pasien/non-jkn/data-pasien",
      });
    } else {
      throw new Error("Patient not found");
    }
  } catch (error) {
    // Pasien baru (not_found)
    apmFlow.setPatientStatus("not_found");
    apmFlow.setIdentity(selectedType.value || "", values.no_identity);
    apmFlow.setPatientData(null);

    router.push({
      path: "/antrian/apm/aktif/pasien/non-jkn/data-pasien",
    });
  } finally {
    useUtilsStore.setLoading(false);
  }
});

const props = defineProps({
  isDialogVisible: {
    default: false,
  },
  title: {
    type: String,
  },
  method: {
    type: String,
  },
});
</script>

<template #body>
  <div class="flex flex-col py-5 w-full min-h-screen">
    <div
      class="flex relative z-10 gap-5 justify-between py-0 pr-5 mx-3 rounded-xl shadow-md bg-adameds-300 max-md:flex-wrap"
    >
      <NavbarAntrian />
    </div>
    <div class="flex relative flex-1 justify-center items-center mx-36">
      <div
        class="flex overflow-hidden flex-col justify-center w-full rounded-3xl"
      >
        <div class="bg-white bg-opacity-30 w-full h-[540px] space-y-16">
          <div class="grid grid-cols-3 gap-4 pt-10">
            <div
              class="inline-flex items-center h-10 bg-white rounded-xl shadow-md w-fit"
            >
              <div
                class="flex items-center px-2.5 py-2.5 rounded-r-lg bg-adameds-300"
              >
                <PlusIcon class="text-white" :size="30" />
              </div>
              <div
                class="px-2 py-1 font-bold whitespace-nowrap text-adameds-300"
              >
                Pasien Non-JKN
              </div>
            </div>

            <!-- Title Container (Center) -->
            <div
              class="flex col-span-1 justify-center items-center text-2xl font-extrabold text-adameds-300"
            >
              Pendaftaran Pasien
            </div>

            <!-- Button Container (Right) -->
            <div class="flex col-span-1 justify-end items-center mr-6">
              <CustomButton
                label="< &nbsp Kembali"
                outlined
                borderColor="border-adameds-300"
                textColor="text-adameds-300"
                class="w-[120px]"
                @click="handleHome"
              />
            </div>
          </div>

          <div class="flex flex-col items-center">
            <div class="">
              <div class="text-center">Silahkan Pilih Tipe Nomor</div>
              <div class="py-6 space-y-4">
                <div class="flex gap-7 justify-around items-center w-full">
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'RM' ? 'bg-adameds-100' : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'RM' ? 'text-white' : 'text-adameds-300'
                    "
                    @click="selectType('RM')"
                    :icon="selectedType === 'RM' ? 'CheckCircleIcon' : ''"
                    label="RM"
                    iconPos="right"
                  />
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'KTP' ? 'bg-adameds-100' : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'KTP' ? 'text-white' : 'text-adameds-300'
                    "
                    @click="selectType('KTP')"
                    :icon="selectedType === 'KTP' ? 'CheckCircleIcon' : ''"
                    label="KTP"
                    iconPos="right"
                  />
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'Passport'
                        ? 'bg-adameds-100'
                        : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'Passport'
                        ? 'text-white'
                        : 'text-adameds-300'
                    "
                    @click="selectType('Passport')"
                    :icon="selectedType === 'Passport' ? 'CheckCircleIcon' : ''"
                    label="Passport"
                    iconPos="right"
                  />
                  <CustomButton
                    class="border-none py-3 w-[160px] text-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg"
                    :backgroundColor="
                      selectedType === 'Lainnya' ? 'bg-adameds-100' : 'bg-white'
                    "
                    :textColor="
                      selectedType === 'Lainnya'
                        ? 'text-white'
                        : 'text-adameds-300'
                    "
                    @click="selectType('Lainnya')"
                    :icon="selectedType === 'Lainnya' ? 'CheckCircleIcon' : ''"
                    label="Lainnya"
                    iconPos="right"
                  />
                </div>
                <div
                  class="w-[calc(100%+30px)] mx-[-15px] h-2 bg-adameds-300 rounded-xl"
                ></div>
              </div>
            </div>
            <!-- Input dengan validasi -->
            <CustomTextfield
              :disabled="isDisabled"
              v-model="no_identity"
              :label="identityLabel"
              :placeholder="`Masukkan ${identityLabel}`"
              class="mb-1 w-2/5"
            ></CustomTextfield>
            <!-- Error message -->
            <div
              v-if="errors.no_identity"
              class="mb-3 w-2/5 text-xs text-red-500"
            >
              {{ errors.no_identity }}
            </div>
            <CustomButton
              :disabled="isDisabled"
              label="Lanjutkan"
              class="w-2/5"
              @click="onSubmit"
            />
          </div>
        </div>
      </div>
    </div>
    <OrnamentAntrian />
  </div>
</template>
