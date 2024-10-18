<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomChip from "@/components/Base/CustomChip.vue";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";

const status = ref(false);
</script>

<template>
    <Card pt:body:class="h-full pt-0 overflow-auto" pt:content:class="h-full overflow-auto">
        <template #header>
          <div class="flex mt-5 mb-[20px] ml-5">
            <CustomButton icon="PhArrowClockwise" class="mr-5" />
            <CustomBreadCrumb
              :home="{
                label: 'Datamaster',
                home: true,
              }"
            />
            <PhCaretRight :size="25" weight="bold" class="ml-[10px] mt-[8px] text-adameds-300" />
            <div class="">
              <p class="font-semibold text-heading text-grey-400 ml-[10px] mt-[5px]">Konfigurasi Harga</p>
            </div>
          </div>
        </template>
        <template #content>
          <hr class="border border-slate-200"/>
          <!-- Metode Pemotong Stok -->
          <div class="mt-[10px] p-4 rounded-lg bg-adameds-50">
            <div class="flex justify-between">
              <div class="">
                <p class="text-lg font-bold text-adameds-300 font-poppins">Metode Pemotongan Stok</p>
              </div>
              <div>
                <CustomChip
                  label="FIFO"
                  textColor="text-white"
                  bgColor="bg-adameds-300"
                  borderColor="border-none"
                  icon-color="white"
                  customClass="text-sm font-semibold h-6"
                />
              </div>
            </div>
            <hr class="mt-[10px] border border-slate-200"/>
            <!-- FIFO -->
            <div class="flex justify-between">
              <div class="mt-[10px]">
                <p class="font-bold">First In First Out (FIFO)</p>
                <p class="text-xs text-mediumGrey-400">Persediaan yang diperoleh diawal akan dipotong (digunakan) terlebih dahulu</p>
              </div>
              <div class="mt-[20px]">
                <CustomSwitch
                  v-model="status"
                  :show-label="false"
                  sideLabel="NON-AKTIF"
                  sideLabelTrue="AKTIF"
                />
              </div>
            </div>
            <!-- LIFO -->
            <div class="flex justify-between">
              <div class="mt-[20px]">
                <p class="font-bold">Last In First Out (LIFO)</p>
                <p class="text-xs text-mediumGrey-400">Persediaan yang diperoleh diakhir akan dipotong (digunakan) terlebih dahulu</p>
              </div>
              <div class="mt-[30px]">
                <CustomSwitch
                  v-model="status"
                  :show-label="false"
                  sideLabel="NON-AKTIF"
                  sideLabelTrue="AKTIF"
                />
              </div>
            </div>
            <!-- FEFO -->
            <div class="flex justify-between">
              <div class="mt-[20px]">
                <p class="font-bold">First Expired First Out (FEFO)</p>
                <p class="text-xs text-mediumGrey-400">Persediaan yang akan kadaluarsa (*Jika tanggal kadaluarsa diisi ketika penerimaan / produksi) akan tipotong (digunakan) terlebih dahulu</p>
              </div>
              <div class="mt-[30px]">
                <CustomSwitch
                  v-model="status"
                  :show-label="false"
                  sideLabel="NON-AKTIF"
                  sideLabelTrue="AKTIF"
                />
              </div>
            </div>
          </div>

          <!-- Metode HPP -->
          <div class="mt-[10px] p-4 rounded-lg bg-adameds-50">
            <div class="flex justify-between">
              <div class="">
                <p class="text-lg font-bold text-adameds-300 font-poppins">Metode HPP</p>
              </div>
              <div>
                <CustomChip
                  label="Harga Terakhir"
                  textColor="text-white"
                  bgColor="bg-adameds-300"
                  borderColor="border-none"
                  icon-color="white"
                  customClass="text-sm font-semibold h-6"
                />
              </div>
            </div>
            <hr class="mt-[10px] border border-slate-200"/>
            <!-- Harga Terakhir -->
            <div class="flex justify-between">
              <div class="mt-[10px]">
                <p class="font-bold">Harga Terakhir</p>
                <p class="text-xs text-mediumGrey-400">Penggunaan HPP dengan Harga Terakhir</p>
              </div>
              <div class="mt-[20px]">
                <CustomSwitch
                  v-model="status"
                  :show-label="false"
                  sideLabel="NON-AKTIF"
                  sideLabelTrue="AKTIF"
                />
              </div>
            </div>
            <!-- Rata-rata -->
            <div class="flex justify-between">
              <div class="mt-[20px]">
                <p class="font-bold">Rata-rata</p>
                <p class="text-xs text-mediumGrey-400">Penggunaan HPP dengan rata-rata</p>
              </div>
              <div class="mt-[30px]">
                <CustomSwitch
                  v-model="status"
                  :show-label="false"
                  sideLabel="NON-AKTIF"
                  sideLabelTrue="AKTIF"
                />
              </div>
            </div>
          </div>

          <!-- Margin -->
          <div class="mt-[10px] p-4 rounded-lg bg-adameds-50">
            <div class="flex justify-between">
              <div class="">
                <p class="text-lg font-bold text-adameds-300 font-poppins">Margin</p>
              </div>
              <div>
                <CustomChip
                  label="5%"
                  textColor="text-white"
                  bgColor="bg-adameds-300"
                  borderColor="border-none"
                  icon-color="white"
                  customClass="text-sm font-semibold h-6"
                />
              </div>
            </div>
            <hr class="mt-[10px] border border-slate-200"/>
            <!-- Presentasi Margin -->
            <div class="flex justify-between">
              <div class="mt-[10px]">
                <p class="font-bold">Presentasi Margin</p>
                <li class="text-xs text-mediumGrey-400 mt-[5px]">Mempengaruhi pada kolom <span class="font-bold text-black">Harga Dasar</span> di master item medis</li>
                <li class="text-xs text-mediumGrey-400">HNA otomatis terhitung</li>
              </div>
              <div class="mt-[10px]">
                <p class="font-bold">Input Margin (%)</p>
                <CustomTextfield placeholder="5" :show-label="false" class="w-[80px] bg-white rounded-xl mt-[5px] ml-[50px]">
                  <template #appendText>
                    <div
                      class="font-semibold bg-white text-sm text-adameds-300 ml-[10px] mt-[10px] rounded-r-xl w-[20px]"
                    >
                      %
                    </div>
                  </template>
                </CustomTextfield>
              </div>
            </div>
          </div>

          <!-- PPN -->
          <div class="mt-[10px] p-4 rounded-lg bg-adameds-50">
            <div class="flex justify-between">
              <div class="">
                <p class="text-lg font-bold text-adameds-300 font-poppins">PPN</p>
              </div>
              <div>
                <CustomChip
                  label="12%"
                  textColor="text-white"
                  bgColor="bg-adameds-300"
                  borderColor="border-none"
                  icon-color="white"
                  customClass="text-sm font-semibold h-6"
                />
              </div>
            </div>
            <hr class="mt-[10px] border border-slate-200"/>
            <!-- Presentasi PPN -->
            <div class="flex justify-between">
              <div class="mt-[10px]">
                <p class="font-bold">Presentasi PPN</p>
                <li class="text-xs text-mediumGrey-400 mt-[5px]">Mempengaruhi pada kolom <span class="font-bold text-black">Harga Dasar</span> di master item medis</li>
                <li class="text-xs text-mediumGrey-400">HJA otomatis terhitung</li>
              </div>
              <div class="mt-[10px]">
                <p class="font-bold">Input PPN (%)</p>
                <CustomTextfield placeholder="12" :show-label="false" class="w-[80px] bg-white rounded-xl mt-[5px] ml-[50px]">
                  <template #appendText>
                    <div
                      class="font-semibold bg-white text-sm text-adameds-300 ml-[10px] mt-[10px] rounded-r-xl w-[20px]"
                    >
                      %
                    </div>
                  </template>
                </CustomTextfield>
              </div>
            </div>
          </div>
        </template>
    </Card>
</template>
