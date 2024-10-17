<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useForm, useFieldArray, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { utilsStore } from "@/stores/utils";
import { useRouter } from "vue-router";
import type { selectedBedType } from "@/utils/Interface";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import type { DataTableRowClickEvent } from "primevue/datatable";
import MonitoringBedCard from "./Section/MonitoringBedCard.vue";
import EmptyMonitoringBedCard from "./Section/EmptyMonitoringBedCard.vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import { useMonitoringKamarStore } from "@/stores/admisi/monitoringKamar";

// NOTE Store
const storeUtils = utilsStore();
const monitoringKamarStore = useMonitoringKamarStore();

const filterRoomCategoryList = ref([
  "RAWATAN UMUM",
  "RAWATAN ANAK",
  "RAWATAN BAYI",
  "ICU",
]);
const selectedFilterRoomCategory = ref<string[]>([]);
const onRoomCategorySelect = (label: string) => {
  if (selectedFilterRoomCategory.value.includes(label)) {
    selectedFilterRoomCategory.value = selectedFilterRoomCategory.value.filter(
      (item) => item != label
    );
  } else {
    selectedFilterRoomCategory.value.push(label);
  }
};

const filterRoomClassList = ref([
  "KELAS I",
  "KELAS II",
  "KELAS III",
  "VIP",
  "VIIP",
]);
const selectedRoomClass = ref<string[]>([]);
const onRoomClassSelect = (label: string) => {
  if (selectedRoomClass.value.includes(label)) {
    selectedRoomClass.value = selectedRoomClass.value.filter(
      (item) => item != label
    );
  } else {
    selectedRoomClass.value.push(label);
  }
};

const properties = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});
const itemsRoom = ref<any[]>([]);

const fetchData = async () => {
  storeUtils.setLoading(true);
  try {
    const response = await monitoringKamarStore.getMonitoringKamar({});
    if (response && response.payload) {
      properties.value.total = response.properties.totalData;
      itemsRoom.value = response.payload;
    } else itemsRoom.value = [];
  } catch (error) {
    console.error("Failed to fetch data", error);
  } finally {
    storeUtils.setLoading(false);
  }
};

const roomSettingDialog = ref(false);
const itemsBedSetting = ref([{}]);

const openedRoomData = ref<any>({});
const itemsBed = ref<any[]>([]);

const fetchBedData = async (data: any) => {
  storeUtils.setLoading(true);
  try {
    openedRoomData.value = data;
    const response = await monitoringKamarStore.getDetailMonitoringKamar(
      data.uuid
    );
    if (response && response.payload) {
      return response.payload.detail;
    } else return [];
  } catch (error) {
    throw new Error(error as string);
  } finally {
    storeUtils.setLoading(false);
  }
};

const showBedList = async (data: DataTableRowClickEvent) => {
  itemsBed.value = await fetchBedData(data.data);
};

const showBedForm = async (data: any) => {
  try {
    const fetchedData = await fetchBedData(data);
    itemsBedSetting.value = fetchedData.length ? fetchedData : [{}];
    itemsBedSetting.value.forEach((bed: any) => {
      bed.noBed = Number(bed.noBed);
    });
    setValues({ bedData: [...itemsBedSetting.value] as any });
    roomSettingDialog.value = true;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const schema = toTypedSchema(
  yup.object({
    bedData: yup.array().of(
      yup.object({
        uuid: yup.string().nullable(),
        bedName: yup.string().required("Jenis Bed harus diisi"),
        noBed: yup.number().required("Nomor Bed harus diisi"),
      })
    ),
  })
);

const { errors, handleSubmit, resetForm, setValues, defineField } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values) => {
  storeUtils.setLoading(true);
  try {
    await monitoringKamarStore.updateBed(
      openedRoomData.value.uuid,
      values.bedData
    );
  } catch (error) {
  } finally {
    storeUtils.setLoading(false);
  }
});

const { remove, push, fields } = useFieldArray("bedData");

const confirmRegisterDialog = ref(false);
const tempSelectedRoom = ref<selectedBedType | null>(null);
const setSelectedRoomData = (selectedData: selectedBedType | null) => {
  tempSelectedRoom.value = selectedData;
  confirmRegisterDialog.value = true;
};

const router = useRouter();
const admisiRegistration = () => {
  storeUtils.setSelectedRoom(tempSelectedRoom.value);
  router.push("/admisi/rawat-inap");
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder initialState="0">
          <template #header>
            <div class="flex justify-between w-full align-middle">
              <div class="flex mr-[60px]">
                <CustomButton icon="PhArrowClockwise" class="mr-5" />
                <span class="leading-10 text-adameds-300 text-heading">
                  Monitoring Kamar
                </span>
              </div>
              <div class="grow">
                <CustomTextfield
                  :showLabel="false"
                  prependIcon="PhMagnifyingGlass"
                  placeholder="Cari Ruangan / Kamar"
                  class="mr-5"
                />
              </div>
            </div>
          </template>
          <template #content>
            <div class="font-semibold text-SM text-grey-300">
              <div>
                <div class="flex mb-[10px] mt-5">
                  <div class="w-[15%]">Filter Poli</div>
                  <div class="flex">
                    |
                    <CustomChip
                      v-for="(poli, index) in filterRoomCategoryList"
                      :key="poli + index"
                      :label="poli"
                      borderColor="border-adameds-300"
                      iconColor="text-adameds-300"
                      textColor="text-adameds-300"
                      :iconSize="16"
                      class="ml-[10px]"
                      selectedColor="bg-adameds-300 border-adameds-300"
                      :isSelected="selectedFilterRoomCategory.includes(poli)"
                      @selected="onRoomCategorySelect"
                    />
                  </div>
                </div>
                <div class="flex my-[10px]">
                  <div class="w-[15%]">Filter Kelas Ruangan</div>
                  <div class="flex">
                    |
                    <CustomChip
                      v-for="(method, index) in filterRoomClassList"
                      :key="method + index"
                      :label="method"
                      borderColor="border-adameds-300"
                      iconColor="text-adameds-300"
                      textColor="text-adameds-300"
                      :iconSize="16"
                      class="ml-[10px]"
                      selectedColor="bg-adameds-300 border-adameds-300"
                      :isSelected="selectedRoomClass.includes(method)"
                      @selected="onRoomClassSelect"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #collapseIcon>
            <CustomButton
              icon="PhCaretUp"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
          <template #expandIcon>
            <CustomButton
              icon="PhCaretDown"
              backgroundColor="bg-adameds-75"
              textColor="text-adameds-300"
            />
          </template>
        </CustomAccordion>
      </template>
      <template #content>
        <div class="grid grid-cols-[40%_60%] gap-5 h-full mr-5">
          <div class="overflow-auto">
            <DataTable
              :value="itemsRoom"
              scrollable
              scrollHeight="flex"
              :pt="{ headerRow: 'text-SM' }"
              @rowClick="showBedList"
            >
              <Column
                field="room"
                header="Ruangan"
                headerClass="bg-adameds-50"
                bodyClass="text-SM"
              >
                <template #body="{ data }">
                  <div class="flex">
                    <PhHospital
                      :size="20"
                      class="text-adameds-300"
                      weight="fill"
                    />
                    <span class="ml-1 leading-6">{{ data.name }}</span>
                  </div>
                  <div class="flex mt-[5px]">
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="data.kategoriRuangan.name"
                      bgColor="bg-adameds-300"
                      textColor="text-white"
                      customClass="h-5 border-none"
                      class="mr-1"
                    />
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="data.kelasRuangan"
                      bgColor="bg-adameds-300"
                      textColor="text-white"
                      customClass="h-5 border-none"
                      class=""
                    />
                  </div>
                </template>
              </Column>
              <Column
                field="status"
                headerClass="bg-adameds-50"
                bodyClass="text-SM"
                style="width: 100px"
              >
                <template #header>
                  <div class="w-full font-semibold text-center">Status</div>
                </template>
                <template #body="{ data }">
                  <div class="flex">
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="data.available == 0 ? 'PENUH' : 'TERSEDIA'"
                      :bgColor="
                        data.available == 0 ? 'bg-danger-300' : 'bg-success-300'
                      "
                      textColor="text-white"
                      customClass="h-5 pr-[6px] border-none"
                      class="mx-auto"
                    />
                  </div>
                </template>
              </Column>
              <Column
                field="action"
                headerClass="bg-adameds-50"
                bodyClass="text-SM"
                style="width: 100px"
              >
                <template #header>
                  <div class="w-full font-semibold text-center">Action</div>
                </template>
                <template #body="{ data }">
                  <PhGearSix
                    @click.stop="showBedForm(data)"
                    :size="24"
                    class="mx-auto cursor-pointer text-grey-300"
                    weight="fill"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
          <div v-if="itemsBed.length" class="relative overflow-hidden">
            <div
              class="relative bg-adameds-50 h-[60px] rounded-t-[10px] px-5 flex items-center"
            >
              <PhHospital
                :size="40"
                class="text-adameds-300 mr-[10px]"
                weight="fill"
              />
              <span class="font-bold text-MD mr-[10px]">{{
                openedRoomData.name
              }}</span>
              <CustomChip
                :showCheckedIcon="false"
                :label="openedRoomData.kategoriRuangan.name"
                bgColor="bg-grey-300"
                textColor="text-white"
                customClass="h-5 border-none"
                class="mr-1"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="openedRoomData.kelasRuangan"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 border-none"
                class=""
              />
            </div>
            <div
              class="absolute inset-0 top-[60px] border-[1px] overflow-auto rounded-b-[10px] py-[10px] px-5 grid grid-cols-2 gap-[10px]"
            >
              <div v-for="(bed, index) in itemsBed">
                <EmptyMonitoringBedCard
                  v-if="bed.isAvailable"
                  :bedData="bed"
                  @click="() => {}"
                />
                <MonitoringBedCard v-else :bedData="bed" />
              </div>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col text-center border-dashed border-[1px] border-grey-300 h-full rounded-lg"
          >
            <div class="m-auto text-SM">
              <img
                src="../../assets/icons/no-data-icon-2.svg"
                alt="no data"
                class="mx-auto"
              />
              <div class="text-grey-200">Silahkan Pilih Ruangan</div>
              <div class="text-grey-200">Terlebih Dahulu</div>
            </div>
          </div>
        </div>
      </template>
    </Card>
    <CustomDialog v-model:visible="confirmRegisterDialog" width="600px">
      <template #header> Admisi Pasien </template>
      <template #body>
        <div class="mt-5 text-normal">
          Mendaftarkan pasien ke
          <span class="font-bold text-adameds-300">Bed 6</span>?
        </div>
      </template>
      <template #footer>
        <CustomButton
          @click="confirmRegisterDialog = false"
          label="Batal"
          outlined
          class="mr-[10px]"
          borderColor="border-grey-200"
          textColor="text-grey-300"
        />
        <CustomButton
          @click="admisiRegistration()"
          label="Daftar Admisi"
          class=""
          backgroundColor="bg-adameds-300"
        />
      </template>
    </CustomDialog>
    <CustomDialog v-model:visible="roomSettingDialog" width="600px">
      <template #header> Setting Kamar </template>
      <template #body>
        <div class="mt-5">
          <DataTable
            :value="fields"
            class="overflow-hidden rounded-[10px]"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
          >
            <Column
              field="no"
              headerClass="bg-adameds-300 text-white"
              bodyClass="text-SM"
              style="width: 60px"
            >
              <template #header>
                <div class="w-full font-semibold text-center">No.</div>
              </template>
              <template #body="{ index }">
                <div class="text-center">{{ index + 1 }}</div>
              </template>
            </Column>
            <Column
              field="bedType"
              header="Jenis Bed"
              headerClass="bg-adameds-300 text-white"
              bodyClass="text-SM align-top"
            >
              <template #body="{ data, index }">
                <CustomSelect
                  v-model="data.value.bedName"
                  :showLabel="false"
                  placeHolder="Pilih Jenis Bed"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['Bed', 'Bed Cadangan', 'Box Bayi']"
                  :invalid="!!(errors as any)[`bedData[${index}].bedName`]"
                  :invalidMessage="(errors as any)[`bedData[${index}].bedName`]"
                />
              </template>
            </Column>
            <Column
              field="noBed"
              headerClass="bg-adameds-300 text-white"
              bodyClass="text-SM align-top"
              style="width: 100px"
            >
              <template #header>
                <div class="w-full font-semibold text-center">No. Bed</div>
              </template>
              <template #body="{ data, index }">
                <CustomInputNumber
                  v-model="data.value.noBed"
                  :showLabel="false"
                  class="w-full mr-[30px]"
                  placeholder="0"
                  :invalid="!!(errors as any)[`bedData[${index}].noBed`]"
                  :invalidMessage="(errors as any)[`bedData[${index}].noBed`]"
                />
              </template>
            </Column>
            <Column
              field="action"
              headerClass="bg-adameds-300 text-white"
              bodyClass="text-SM  align-top"
              style="width: 100px"
            >
              <template #header>
                <div class="w-full font-semibold text-center">Action</div>
              </template>
              <template #body="{ index }">
                <div class="flex">
                  <CustomButton
                    @click="remove(index)"
                    icon="PhTrash"
                    label=""
                    class="h-[30px] mx-auto mt-1"
                    backgroundColor="bg-danger-300"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
          <div
            class="border-2 h-20 border-adameds-75 m-5 rounded-[10px] border-dashed flex"
          >
            <CustomButton
              @click="push({ noBed: 0 })"
              icon="PhPlus"
              label="Bed"
              outlined
              class="m-auto"
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
          <hr class="border-grey-200 mb-[30px]" />
          <div class="font-semibold text-normal">Total Bed : 0</div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <CustomButton
            @click="setValues({ bedData: [{ bedName: '', noBed: 0 }] })"
            label="Reset"
            outlined
            class="mr-[10px]"
            borderColor="border-grey-200"
            textColor="text-grey-300"
          />
          <CustomButton
            @click="onSubmit"
            label="Simpan"
            class=""
            backgroundColor="bg-adameds-300"
          />
        </div>
      </template>
    </CustomDialog>
  </div>
</template>
