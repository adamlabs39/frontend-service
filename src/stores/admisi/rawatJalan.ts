import { defineStore } from "pinia";
import {
  apiAdmisiGet,
  apiAdmisiPost,
  apiAdmisiPut,
  apiAdmisiDelete,
} from "@/utils/apiHandler";

export const useAdmisiRJStore = defineStore({
  id: "admisiRJ",
  state: () => ({}),
  getters: {},
  actions: {
    // FIXME Belum bisa multiple untuk platform dan poli
    // FIXME Belum bisa berjalan untuk dpjp
    async getRJ(
      {
        q = "",
        paymentMethod = "",
        page = 1,
        limit = 10,
        platform = "",
        poly = [] as string[],
        startDate = "",
        endDate = "",
        dpjp = "",
        status = "",
      },
      payload = {}
    ) {
      let tempFilterPoli = "";
      poly.forEach((poli, index) => {
        tempFilterPoli += `${poli}`;
        if (index + 1 < poly.length) {
          tempFilterPoli += ",";
        }
      });
      console.log(poly);
      return apiAdmisiGet(
        `/rawat-jalan?q=${q}&payment_method=${paymentMethod}&page=${page}&limit=${limit}&platform=${platform}&poly=${poly}&start_date=${startDate}&end_date=${endDate}&dpjp=${dpjp}&status=${status}`,
        payload
      );
    },
    async registRJ(payload = {}) {
      return apiAdmisiPost("/rawat-jalan", payload);
    },
    async updateRJ(uuid: string = "", payload = {}) {
      return apiAdmisiPut(`/rawat-jalan/${uuid}`, payload);
    },
    async getDetailRJ(uuid: string = "", payload = {}) {
      return apiAdmisiGet(`/rawat-jalan/${uuid}`, payload);
    },
    async cancelVisitRJ(payload = {}) {
      return apiAdmisiDelete("/rawat-jalan/cancel", payload);
    },
    // FIXME Dummy
    async getListJadwalDokter(payload = {}) {
      // return apiAdmisiGet(`/rawat-jalan/jadwal-dokter`, payload);
      return {
        message: "Data Jadwal Dokter Berhasil Ditampilkan",
        payload: [
          {
            uuid: "0191c056-f9f7-7b95-adf0-e2ae6967c9b2",
            start_time: "08:00:00",
            end_time: "16:00:00",
            day: "Jumat",
            kuota: 20,
            kuota_non_jkn: 10,
            kuota_jkn: 10,
            durasi_pelayanan: 10,
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                first_title: null,
                last_title: null,
                nama: "Rudi tabuti",
                nik: "1234567890",
              },
            },
            lokasi: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
          },
          {
            uuid: "0191c056-f9f7-799b-868b-97cc0abdbbee",
            start_time: "08:00:00",
            end_time: "16:00:00",
            day: "Rabu",
            kuota: 20,
            kuota_non_jkn: 10,
            kuota_jkn: 10,
            durasi_pelayanan: 10,
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                first_title: null,
                last_title: null,
                nama: "Rudi tabuti",
                nik: "1234567890",
              },
            },
            lokasi: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
          },
          {
            uuid: "0191c056-f9f7-755c-8aeb-0d04b3497c82",
            start_time: "08:00:00",
            end_time: "16:00:00",
            day: "Selasa",
            kuota: 20,
            kuota_non_jkn: 10,
            kuota_jkn: 10,
            durasi_pelayanan: 10,
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                first_title: null,
                last_title: null,
                nama: "Rudi tabuti",
                nik: "1234567890",
              },
            },
            lokasi: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
          },
          {
            uuid: "0191c056-f9f7-7421-9f73-d6f93fe4dab2",
            start_time: "08:00:00",
            end_time: "16:00:00",
            day: "Kamis",
            kuota: 20,
            kuota_non_jkn: 10,
            kuota_jkn: 10,
            durasi_pelayanan: 10,
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                first_title: null,
                last_title: null,
                nama: "Rudi tabuti",
                nik: "1234567890",
              },
            },
            lokasi: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
          },
          {
            uuid: "0191c056-f9f7-73e1-9d9c-f54a3e4dd794",
            start_time: "08:00:00",
            end_time: "16:00:00",
            day: "Senin",
            kuota: 20,
            kuota_non_jkn: 10,
            kuota_jkn: 10,
            durasi_pelayanan: 10,
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                first_title: null,
                last_title: null,
                nama: "Rudi tabuti",
                nik: "1234567890",
              },
            },
            lokasi: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
          },
          {
            uuid: "0191c056-f9f7-7beb-a116-ca60bf4a5422",
            start_time: "08:00:00",
            end_time: "16:00:00",
            day: "Sabtu",
            kuota: 20,
            kuota_non_jkn: 10,
            kuota_jkn: 10,
            durasi_pelayanan: 10,
            practitioner: {
              uuid: "0191a18a-22e4-79f7-9da5-a10a6e1a60f9",
              pegawai: {
                first_title: null,
                last_title: null,
                nama: "Rudi tabuti",
                nik: "1234567890",
              },
            },
            lokasi: {
              uuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
              name: "Faskes Example",
              code: "FAC001",
            },
          },
        ],
      };
    },
  },
});
