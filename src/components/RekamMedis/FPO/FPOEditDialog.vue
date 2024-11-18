<script setup lang="ts">
import { ref, watch } from "vue";
import CustomDialog from "@/components/Base/CustomDialog.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomTextArea from "@/components/Base/CustomTextArea.vue";
import CustomDatePicker from "@/components/Base/CustomDatePicker.vue";
import { format } from "date-fns";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

// Define props to accept the payload and visibility status
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    default: false,
  },
  payload: {
    type: Object,
    default: () => ({}),
  },
});

// Emit events to update visibility or signal data change
const emit = defineEmits(["update:isDialogVisible", "close", "data-updated"]);

// Reactive state for handling form data
const jamPemberian = ref(new Date());
const catatan = ref("");
const selectedObat = ref<any>(null);
const isEditing = ref(false);

// Watch for changes in the payload to update the dialog's content
watch(
  () => props.payload,
  (newPayload: any) => {
    selectedObat.value = newPayload;
    jamPemberian.value = new Date();
    catatan.value = "";
    isEditing.value = false; // reset editing state
  }
);

// Update dialog visibility
const updateVisibility = (value: boolean) => {
  emit("update:isDialogVisible", value);
};

// Close the dialog
const closeDialog = () => {
  emit("close");
};

// Toggle editing state
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// Save edited data
const saveEdit = () => {
  const updatedData = {
    jamPemberian: format(jamPemberian.value, "HH:mm"),
    catatan: catatan.value,
  };
  emit("data-updated", updatedData);
  toggleEdit();
};

// Group pemberian by time slots
const timeSessions = [
  { label: "Pagi", timeRange: "07:00 - 12:00", start: "07:00", end: "12:00" },
  { label: "Siang", timeRange: "12:00 - 16:00", start: "12:00", end: "16:00" },
  { label: "Sore", timeRange: "16:00 - 18:00", start: "16:00", end: "18:00" },
  { label: "Malam", timeRange: "18:00 - 00:00", start: "18:00", end: "00:00" },
  { label: "Khusus", timeRange: "00:00 - 07:00", start: "00:00", end: "07:00" },
];

// Define the interface for a single medication administration
interface Pemberian {
  waktuPemberian: string;
  qtyPemberian: string;
  petugasPemberian: string;
  catatan: string;
}

// Update the function to use the new interface
const getPemberianByTimeRange = (start: string, end: string): Pemberian[] => {
  const result: Pemberian[] = [];
  const timeFormat = (time: string) => time.split(":").map(Number);

  if (!selectedObat.value) return result; // Return empty if no selectedObat

  selectedObat.value.pemberian.forEach((pemberian: Pemberian) => {
    const pemberianTime = timeFormat(pemberian.waktuPemberian);
    const startTime = timeFormat(start);
    const endTime = timeFormat(end);

    if (pemberianTime[0] >= startTime[0] && pemberianTime[0] < endTime[0]) {
      result.push(pemberian);
    }
  });

  return result;
};

const editObat=ref(false)
</script>

<template>
  <CustomDialog
    width="800px"
    :visible="isDialogVisible"
    @update:visible="updateVisibility"
    headerBg="bg-adameds-300"
  >
    <!-- Dialog Header -->
    <template #header>
      <div class="flex justify-between w-[700px] items-center">
        <div class="flex items-center gap-2.5">
          <div class="font-semibold text-MD">
            {{ selectedObat.namaObat }}
          </div>
          <PhLineVertical :size="20" color="#ffffff" />
          <CustomButton
            label="RSP123"
            background-color="bg-grey-50"
            text-color="text-adameds-300"
            class="rounded-lg h-7"
          />
        </div>
        <div class="text-MD">
          Tgl. Pemberian: {{ format(new Date(), "dd-MM-yyyy") }}
        </div>
      </div>
    </template>

    <!-- Dialog Body -->
    <template #body>
      <div class="flex flex-col gap-5 pt-5 overflow-hidden h-full">
        <!-- Card Section -->
        <Card
          pt:root:class="border rounded-lg shadow border-adameds-300 shadow-inherit"
          pt:body:class="h-full p-2.5"
        >
          <template #content>
            <div class="flex justify-between">
              <div class="flex flex-col gap-2.5">
                <div class="flex items-center gap-2.5 text-SM">
                  {{ selectedObat.frekuensi }}
                  <span><img src="@/assets/icons/Vector-arows.svg" /></span>
                  {{ selectedObat.satuanPenggunaan }} gram
                </div>
                <CustomChip
                  :label="selectedObat.caraPakai"
                  :showCheckedIcon="false"
                  border-color="border-adameds-300"
                  bg-color="bg-adameds-50"
                  text-color="text-adameds-300"
                  customClass="text-xs font-semibold cursor-auto h-5 max-w-fit"
                />
              </div>
              <div class="flex flex-col items-end justify-between">
                <div class="flex items-center gap-2.5 text-SM">
                  Jml. Order
                  <span><img src="@/assets/icons/Vector-arows.svg" /></span>
                  {{ selectedObat.qtyOrder }} Tablet
                </div>
                <div class="flex items-center gap-2.5" v-if="!editObat">
                  <div class="text-SM">
                    Sisa Obat
                    <span class="font-bold"
                      >({{ selectedObat.sisaStok }} Tab)</span
                    >
                  </div>
                  <CustomButton
                    label=""
                    background-color="bg-[#3D84E5] rounded-lg"
                    class="h-6 w-[26px] p-0"
                    @click="editObat=true"
                    
                  >
                    <img src="@/assets/icons/edit.svg" alt="" />
                  </CustomButton>
                </div>
                <div class="flex gap-2.5 items-center" v-if="editObat">
                  <div class="text-SM">Sisa Obat</div>
                  <div class="w-[130px]">
                    <CustomInputNumber showButtons label=""  />
                  </div>
                  <CustomButton
                    label=""
                    background-color="bg-adameds-300 rounded-lg"
                    class="h-6 w-[26px] p-0"
                     @click="editObat=false"
                  >
                    <PhCheck />
                  </CustomButton>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Form Section -->
        <div class="flex items-end gap-5">
          <CustomDatePicker
            v-model="jamPemberian"
            label="Jam Pemberian"
            time-only
          />
          <CustomTextArea
            v-model="catatan"
            label="Catatan"
            placeholder="Catatan"
            class="grow"
            height="h-10"
          />

          <!-- Save/Cancel Buttons -->
          <CustomButton
            v-if="isEditing"
            label="Simpan Edit"
            background-color="bg-adameds-300"
            text-color="text-white"
            class="ml-2.5"
          />
          <CustomButton
            v-if="!isEditing"
            background-color="bg-adameds-300"
            text-color="text-white"
            class="ml-2.5"
            icon="PhPlus"
          />
        </div>

        <hr class="border-grey-200" />

        <div class="flex flex-col gap-5 overflow-y-auto h-[30vh]">
          <!-- Accordion Section -->
          <div v-for="(session, index) in timeSessions" :key="index">
            <CustomAccordion header-class="bg-adameds-50">
              <template #header>
                <div class="flex justify-between w-full pr-2.5 items-center">
                  <div class="font-normal text-normal">
                    {{ session.label }}
                    <span class="text-grey-500">({{ session.timeRange }})</span>
                  </div>
                  <div
                    class="flex items-center gap-2.5 font-normal text-normal"
                  >
                    Jumlah Pemberian
                    <CustomButton
                      :label="
                        getPemberianByTimeRange(
                          session.start,
                          session.end
                        ).length.toString()
                      "
                      background-color="bg-transparent"
                      border-color="border-2 border-adameds-300"
                      text-color="text-adameds-300"
                      class="h-[21px] px-[10.5px] rounded-[5px]"
                    />
                  </div>
                </div>
              </template>
              <template #content>
                <div class="items-center pt-5 gap-2.5">
                  <div
                    v-for="pemberian in getPemberianByTimeRange(
                      session.start,
                      session.end
                    )"
                    :key="pemberian.waktuPemberian"
                  >
                    <Card
                      pt:root:class="rounded-lg shadow bg-adameds-100 shadow-inherit"
                      pt:body:class="h-full p-2.5"
                      class="grow"
                    >
                      <template #content>
                        <div class="flex w-full gap-5">
                          <div class="flex flex-col gap-2.5">
                            <div
                              class="font-semibold text-white truncate text-SM"
                            >
                              Jam Pemberian
                            </div>
                            <div
                              class="font-semibold text-heading text-adameds-300 px-[14.5px] rounded-lg py-1.5 bg-white text-center"
                            >
                              {{ pemberian.waktuPemberian }}
                            </div>
                            <CustomButton
                              v-if="!isEditing"
                              label="Edit"
                              @click="toggleEdit"
                            >
                              <PhPencilSimple :size="20" weight="fill" />
                              Edit
                            </CustomButton>

                            <CustomButton
                              v-if="isEditing"
                              label="Batal"
                              background-color="bg-danger-300"
                              @click="toggleEdit"
                            />
                          </div>
                          <div class="flex flex-col gap-2.5 grow">
                            <div class="font-semibold text-white text-SM">
                              Catatan
                            </div>
                            <div
                              class="rounded-lg p-2.5 bg-white grow text-XS flex flex-col gap-1"
                            >
                              <div>
                                {{ pemberian.catatan }}
                              </div>
                              <hr class="border-grey-200" />
                              <div class="flex items-center gap-2.5">
                                Petugas
                                <span>
                                  <ArrowRightBrokenIcon
                                    class="text-adameds-300"
                                  />
                                </span>
                                {{ pemberian.petugasPemberian }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Card>
                  </div>
                </div>
              </template>
            </CustomAccordion>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <CustomButton label="Simpan" />
      </div>
    </template>
  </CustomDialog>
</template>
