import { defineStore } from "pinia";
import { apiAdmisiGet, apiAdmisiPatch } from "@/utils/apiHandler";

export const useMonitoringKamarStore = defineStore({
  id: "monitoringKamar",
  state: () => ({}),
  getters: {},
  actions: {
    async getMonitoringKamar(
      { q = "", filterKelas = "", filterKategori = "" },
      payload = {}
    ) {
      // return apiAdmisiGet(
      //   `/monitoring-rooms?q=${q},filter_kelas=${filterKelas}&filter_kategori=${filterKategori}`,
      //   payload
      // );
      return {
        message: "Success get all room",
        payload: [
          {
            uuid: "0191690f-1cb3-7a48-8bad-b21700bd19f4",
            code: "VIP-1",
            name: "VIP 1",
            noRoom: "101",
            kelasRuangan: "VVIP",
            status: true,
            roomMonitorings: [
              {
                uuid: "01928f90-91db-727d-884e-a39e37832229",
                patientUuid: null,
              },
            ],
            kategoriRuangan: {
              uuid: "0191690f-1cb3-7884-afeb-6ad62f0e0a1a",
              code: "VIP",
              name: "VIP",
            },
            totalBed: 1,
            available: 1,
          },
          {
            uuid: "0191690f-1cb3-7a48-8bad-b21700bd19f5",
            code: "VIP-2",
            name: "VIP 2",
            noRoom: "102",
            kelasRuangan: "VIP",
            status: true,
            roomMonitorings: [
              {
                uuid: "0191696e-5a95-7965-8381-acf76b03879b",
                patientUuid: null,
              },
              {
                uuid: "0191696e-5a95-7965-8381-acf76b03876b",
                patientUuid: null,
              },
            ],
            kategoriRuangan: {
              uuid: "0191690f-1cb3-7884-afeb-6ad62f0e0a1a",
              code: "VIP",
              name: "VIP",
            },
            totalBed: 2,
            available: 2,
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 3,
          nextPage: null,
          prevPage: null,
        },
      };
    },

    async updateBed(uuid = "", payload = {}) {
      return apiAdmisiPatch(`/monitoring-rooms/${uuid}`, payload);
    },

    async getDetailMonitoringKamar(uuid = "", payload = {}) {
      // return apiAdmisiGet(`monitoring-rooms/${uuid}`, payload);
      return {
        message: "Success get detail room",
        payload: {
          totalBed: 2,
          detail: [
            {
              uuid: "0191696e-5a95-7fbc-ae6f-c1730ef77b79",
              patientUuid: null,
              roomCategory: "VIP",
              roomClass: "1",
              room: "101",
              bedName: "Kasur 2",
              noBed: "2",
              patient: null,
              isAvailable: true,
            },
            {
              uuid: "0191696e-5a95-7928-b2aa-4a1cf58aee69",
              patientUuid: "019293b2-b05c-7522-a3b6-3eb5ac457793",
              roomCategory: "VIP",
              roomClass: "1",
              room: "101",
              bedName: "Kasur 1",
              noBed: "1",
              patient: {
                noRm: "00-00-06",
                name: "John Doe",
                gender: "Male",
              },
              isAvailable: false,
            },
          ],
        },
      };
    },
  },
});
