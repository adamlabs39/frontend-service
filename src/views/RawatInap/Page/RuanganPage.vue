<script setup lang="ts">
import { onMounted, ref } from "vue";
import DataPoliBPJSHeader from "../Layout/Header/DataPoliBPJSHeader.vue";
import DataPasienRawatInap from "../Layout/Tabel/Ruangan/DataPasienRawatInap.vue";
import { useRoute } from "vue-router";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomPaginator from "@/components/Base/CustomPaginator.vue";

const props = defineProps({
  filterRuang: {
    type: String,
    default: "",
  },
});
const value = ref("1");

const showCancelVisit = ref(false);
const cancelReason = ref<string>();

const route = useRoute();
const currentRouteName = ref("");

onMounted(() => {
  currentRouteName.value = route.name ? String(route.name) : "";
});
</script>
<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
    class=""
  >
    <template #header>
      <DataPoliBPJSHeader
        :activeTab="value"
        :filter-menu="props.filterRuang"
        :current-route-name="currentRouteName"
      >
        <template #content>
          <div class="flex items-center gap-2">
            <CustomButton
              label=""
              icon="PhListBullets"
              class="w-[60px]"
              :class="value === 'all' ? 'bg-adameds-300' : 'bg-white'"
              :text-color="value === 'all' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === 'all' ? 'border-none' : 'border-adameds-300'
              "
              @click="value = 'all'"
              :outlined="value !== 'all'"
            />
            <!-- Filter = {{ props.filter }} -->
            <CustomButton
              label="PELAYANAN"
              class="grow"
              :text-color="value === '1' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '1' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '1' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '1'"
              :outlined="value !== '1'"
            />
            <CustomButton
              label="DISCHARGE"
              class="grow"
              :text-color="value === '2' ? 'text-white' : 'text-adameds-300'"
              :border-color="
                value === '2' ? 'border-none' : 'border-adameds-300'
              "
              :class="value === '2' ? 'bg-adameds-300' : 'bg-white'"
              @click="value = '2'"
              :outlined="value !== '2'"
            />
          </div>
        </template>
      </DataPoliBPJSHeader>
    </template>
    <template #content>
      <DataPasienRawatInap :show-cancel-visit="showCancelVisit" />
    </template>
    <template #footer>
      <div :class="value === '1' ? 'flex justify-between' : 'flex justify-end'">
        <div class="flex" v-if="value == '1'">
          <CustomButton
            v-if="!showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto bg-danger-300"
            label="Batal Kunjungan"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="showCancelVisit = false"
            class="my-auto mr-[10px]"
            label="Batal"
            outlined
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            v-if="showCancelVisit"
            @click="showCancelVisit = true"
            class="my-auto mr-5 bg-danger-300"
            label="Iya, Batalkan"
            :disabled="!cancelReason"
          />
          <CustomTextfield
            v-if="showCancelVisit"
            v-model="cancelReason"
            :showLabel="false"
            class="my-auto w-[400px]"
            placeholder="Alasan Batal Kunjungan"
          />
        </div>
        <CustomPaginator :rows="10" :totalRecords="120" @page="() => {}" />
      </div>
    </template>
  </Card>
</template>
