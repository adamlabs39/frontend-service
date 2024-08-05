<script lang="ts" setup>
  import { ref, watch, defineProps } from 'vue';
  import CustomAccordion from '@/components/Base/CustomAccordion.vue';
  import CustomTextfield from '@/components/Base/CustomTextfield.vue';
  import CustomSelect from '@/components/Base/CustomSelect.vue';
  import CustomSwitch from '@/components/Base/CustomSwitch.vue';
  
  const props = defineProps({
    role: {
      type: String,
      default: ''
    }
  });
  
  const selectedRole = ref(props.role);
  
  watch(() => props.role, (newRole) => {
    selectedRole.value = newRole;
  });
  
  const selectedDokter = ref();
  const toggleSwitch = ref();
  const dokterOptions = ref([
    { label: 'dr.Budi', value: 'dr.Budi' },
    { label: 'dr.Susi', value: 'dr.Susi' },
    { label: 'dr.Adam', value: 'dr.Adam' }
  ]);
  </script>
<template>
    <div class="grow overflow-auto flex flex-col gap-2.5">
      <CustomAccordion headerClass="">
        <template #collapseIcon>
          <PhCaretUp :size="20" class="text-adameds-300" />
        </template>
        <template #expandIcon>
          <PhCaretDown :size="20" class="text-adameds-300" />
        </template>
        <template #header>Akun</template>
        <template #content>
          <div class="flex flex-col gap-5 py-2.5">
            <CustomTextfield label="Username" placeholder="Username" :disabled="!selectedRole" />
            <CustomTextfield label="Password" placeholder="********" appendIcon="PhEye" :disabled="!selectedRole" />
            <CustomTextfield label="Verify Password" placeholder="********" appendIcon="PhEye" :disabled="!selectedRole" />
          </div>
        </template>
      </CustomAccordion>
      <CustomAccordion headerClass="">
        <template #collapseIcon>
          <PhCaretUp :size="20" class="text-adameds-300" />
        </template>
        <template #expandIcon>
          <PhCaretDown :size="20" class="text-adameds-300" />
        </template>
        <template #header>Data User</template>
        <template #content>
          <div class="flex flex-col gap-5 py-2.5">
            <CustomTextfield
              v-if="selectedRole !== 'dokter'"
              label="Nama Lengkap User"
              placeholder="Nama Lengkap User"
              :disabled="!selectedRole"
            />
            <CustomSelect
              v-if="selectedRole === 'dokter'"
              :options="dokterOptions"
              v-model="selectedDokter"
              :isLoading="false"
              label="Nama Lengkap Dokter"
              placeHolder="Nama Lengkap Dokter"
            />
            <div class="flex gap-2.5">
              <CustomTextfield label="No. Handphone" placeholder="08xx-xxxx-xxxx" :disabled="!selectedRole" />
              <CustomTextfield label="Email" placeholder="Email" :disabled="!selectedRole" class="basis-5/6" />
            </div>
          </div>
        </template>
      </CustomAccordion>
      <CustomAccordion v-if="selectedRole === 'admin'" headerClass="">
        <template #collapseIcon>
          <PhCaretUp :size="20" class="text-adameds-300" />
        </template>
        <template #expandIcon>
          <PhCaretDown :size="20" class="text-adameds-300" />
        </template>
        <template #header>Hak Akses Verifikator</template>
        <template #content>
          <div class="flex flex-col gap-5 py-2.5">
            <div class="flex flex-col gap-2.5">
              <div>Verifikator Pengadaan Barang Medis</div>
              <div class="flex w-full border rounded-lg p-2.5 gap-2.5">
                <CustomSwitch v-model="toggleSwitch" />
                <div>Penanggung Jawab</div>
              </div>
            </div>
            <div v-if="toggleSwitch === true" class="flex flex-col gap-2.5">
              <div>Verifikator Pengadaan Barang Non-Medis</div>
              <div class="flex w-full border rounded-lg p-2.5 gap-2.5">
                <CustomSwitch />
                <div>Penanggung Jawab</div>
              </div>
            </div>
          </div>
        </template>
      </CustomAccordion>
      <div>
        <div>Status</div>
        <div class="w-full border rounded-lg p-2.5">
          <CustomSwitch />
        </div>
      </div>
    </div>
  </template>
  
  
  