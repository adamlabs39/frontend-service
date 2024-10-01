<script setup lang="ts">
import { ref } from "vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";

const emit = defineEmits(["showDetail"]);

const itemsOdontogram = ref([{ test: "" }]);
</script>

<template>
  <CustomAccordion headerClass="bg-adameds-50" initialState="0">
    <template #header>01 Jan 2024</template>
    <template #content>
      <div class="py-5 flex flex-col gap-[10px]">
        <DataTable
          :value="itemsOdontogram"
          class="mt-5"
          tableStyle=""
          scrollable
          scrollHeight="flex"
          :pt="{ headerRow: 'text-SM' }"
        >
          <Column
            field="nomor"
            headerClass="bg-adameds-50"
            headerStyle="width: 82px"
          >
            <template #header>
              <div class="w-full font-semibold text-center">No. Gigi</div>
            </template>
            <template #body="slotProps">
              <div class="text-center">
                <div class="text-SM">{{ slotProps.data.toothNumber }}</div>
              </div>
            </template>
          </Column>
          <Column
            field="keadaanGigi"
            header="Keadaan Gigi"
            headerClass="bg-adameds-50"
          >
            <template #body="slotProps">
              <div class="flex">
                <CustomChip
                  label="Karies Bustal"
                  :show-checked-icon="false"
                  bg-color="bg-adameds-300"
                  borderColor="border-none"
                  text-color="text-white"
                />
                <CustomChip
                  label="Karies Distal"
                  :show-checked-icon="false"
                  bg-color="bg-adameds-300"
                  borderColor="border-none"
                  text-color="text-white"
                />
              </div>
            </template>
          </Column>
          <Column
            field="action"
            headerClass="bg-adameds-50"
            headerStyle="width: 85px"
          >
            <template #header>
              <div class="w-full font-semibold text-center">Action</div>
            </template>
            <template #body="slotProps">
              <div class="flex justify-center">
                <CustomButton
                  @click="() => {}"
                  icon="PhTrash"
                  label=""
                  class="h-[30px]"
                  backgroundColor="bg-danger-300"
                  size="small"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <CustomInfoRow label="Oklusi" value="Oklusi" type="vertical" />
        <CustomInfoRow
          label="Torus Palatinus"
          value="Torus Palatinus"
          type="vertical"
        />
        <CustomInfoRow
          label="Torus Mandibularis"
          value="Torus Mandibularis"
          type="vertical"
        />
        <CustomInfoRow label="Palatum" value="Palatum" type="vertical" />
        <CustomInfoRow
          label="Frenulum Labialis"
          value="Frenulum Labialis"
          type="vertical"
        />
        <CustomInfoRow
          label="Frenulum Lingualis"
          value="Frenulum Lingualis"
          type="vertical"
        />
        <CustomInfoRow label="Diastema" value="Tidak" type="vertical" />
        <CustomInfoRow label="Gigi Anomali" value="Tidak" type="vertical" />
        <CustomInfoRow label="Jml. Gigi Decayed" value="0" type="vertical" />
        <CustomInfoRow label="Jml. Gigi Missing" value="0" type="vertical" />
        <CustomInfoRow label="Jml. Gigi Filled" value="0" type="vertical" />
        <CustomInfoRow label="Temuan Lainnya" value="0" type="vertical" />
        <CustomInfoRow
          label="Keterangan Tindakan Gigi"
          value="-"
          type="vertical"
        />
        <hr class="border-grey-200" />
        <div class="flex">
          <div class="flex justify-between grow">
            <CustomInfoRow
              label="Petugas Input"
              value="Nama Petugas"
              type="vertical"
            />
            <CustomInfoRow
              label="Jam Input"
              :value="`petugas`"
              type="vertical"
              alignment="right"
            />
          </div>
          <div class="flex">
            <div class="border border-adameds-300 mx-[15px] my-[10px]"></div>
            <CustomButton
              @click="emit('showDetail')"
              class="!rounded-md my-[10px] ml-auto"
              label="Detail"
              size="small"
            />
          </div>
        </div>
      </div>
    </template>
  </CustomAccordion>
</template>
