<script setup lang="ts">
import { ref } from "vue";
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

const storeUtils = utilsStore();

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

const itemsRoom = ref([
  {
    room: "Mawar",
    kategoriRoom: "RAWATAN UMUM",
    kelasRoom: "KELAS 1",
    status: "PENUH",
  },
  {
    room: "Melati",
    kategoriRoom: "RAWATAN UMUM",
    kelasRoom: "KELAS 2",
    status: "TERSEDIA",
  },
  {
    room: "Anggrek",
    kategoriRoom: "RAWATAN UMUM",
    kelasRoom: "KELAS 3",
    status: "TERSEDIA",
  },
]);
const roomSettingDialog = ref(false);
const itemsBedSetting = ref([{}]);

const openedRoomData = ref<any>({});
const itemsBed = ref([]);

const showBedList = (data: DataTableRowClickEvent) => {
  openedRoomData.value = data.data;
};

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
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <Card
      pt:body:class="h-full pt-0 overflow-auto"
      pt:content:class="h-full overflow-hidden"
      class="h-full overflow-hidden"
    >
      <template #header>
        <CustomAccordion :openWithHeader="false" noBorder>
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
                      class="ml-[10px]"
                      :isSelected="selectedFilterRoomCategory.includes(poli)"
                      @selected="onRoomCategorySelect"
                    />
                  </div>
                </div>
                <div class="flex my-[10px]">
                  <div class="w-[15%]">Filter Cara Daftar</div>
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
                    <span class="ml-1 leading-6">{{ data.room }}</span>
                  </div>
                  <div class="flex mt-[5px]">
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="data.kategoriRoom"
                      bgColor="bg-grey-300"
                      textColor="text-white"
                      customClass="h-5 border-none"
                      class="mr-1"
                    />
                    <CustomChip
                      :showCheckedIcon="false"
                      :label="data.kelasRoom"
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
                      :label="data.status"
                      :bgColor="
                        data.status == 'PENUH'
                          ? 'bg-danger-300'
                          : 'bg-adameds-300'
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
                <template #body>
                  <PhGearSix
                    @click.stop="roomSettingDialog = true"
                    :size="24"
                    class="mx-auto cursor-pointer text-grey-300"
                    weight="fill"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
          <div v-if="openedRoomData.room" class="relative overflow-hidden">
            <div
              class="relative bg-adameds-50 h-[60px] rounded-t-[10px] px-5 flex items-center"
            >
              <PhHospital
                :size="40"
                class="text-adameds-300 mr-[10px]"
                weight="fill"
              />
              <span class="font-bold text-MD mr-[10px]">{{
                openedRoomData.room
              }}</span>
              <CustomChip
                :showCheckedIcon="false"
                :label="openedRoomData.kategoriRoom"
                bgColor="bg-grey-300"
                textColor="text-white"
                customClass="h-5 border-none"
                class="mr-1"
              />
              <CustomChip
                :showCheckedIcon="false"
                :label="openedRoomData.kelasRoom"
                bgColor="bg-adameds-300"
                textColor="text-white"
                customClass="h-5 border-none"
                class=""
              />
            </div>
            <div
              class="absolute inset-0 top-[60px] border-[1px] overflow-auto rounded-b-[10px] py-[10px] px-5 grid grid-cols-2 gap-[10px]"
            >
              <MonitoringBedCard />
              <EmptyMonitoringBedCard
                @click="
                  setSelectedRoomData({
                    roomCategory: 'Rawatan Umum',
                    roomClass: 'Kelas 2',
                    room: 'Mawar',
                    bed: 1,
                  })
                "
              />
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
            :value="itemsBedSetting"
            class="overflow-hidden rounded-[10px]"
            scrollable
            scrollHeight="flex"
            :pt="{ headerRow: 'text-SM' }"
            @rowClick="showBedList"
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
              bodyClass="text-SM"
            >
              <template #body="{ data }">
                <CustomSelect
                  :showLabel="false"
                  placeHolder="Pilih Jenis Bed"
                  class=""
                  optionLabel=""
                  optionValue=""
                  :showFilter="false"
                  :options="['Bed', 'Bed Cadangan', 'Box Bayi']"
                />
              </template>
            </Column>
            <Column
              field="noBed"
              headerClass="bg-adameds-300 text-white"
              bodyClass="text-SM"
              style="width: 100px"
            >
              <template #header>
                <div class="w-full font-semibold text-center">No. Bed</div>
              </template>
              <template #body="{ data }">
                <CustomInputNumber
                  :showLabel="false"
                  class="w-full mr-[30px]"
                  placeholder="0"
                />
              </template>
            </Column>
            <Column
              field="action"
              headerClass="bg-adameds-300 text-white"
              bodyClass="text-SM"
              style="width: 100px"
            >
              <template #header>
                <div class="w-full font-semibold text-center">Action</div>
              </template>
              <template #body>
                <div class="flex">
                  <CustomButton
                    @click="itemsBedSetting.pop()"
                    icon="PhTrash"
                    label=""
                    class="h-[30px] mx-auto"
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
              @click="itemsBedSetting.push({})"
              icon="PhPlus"
              label="Bed"
              outlined
              class="m-auto"
              borderColor="border-adameds-300"
              textColor="text-adameds-300"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <CustomButton
          @click="roomSettingDialog = false"
          label="Batal"
          outlined
          class="mr-[10px]"
          borderColor="border-grey-200"
          textColor="text-grey-300"
        />
        <CustomButton
          @click="() => {}"
          label="Simpan"
          class=""
          backgroundColor="bg-adameds-300"
        />
      </template>
    </CustomDialog>
  </div>
</template>
