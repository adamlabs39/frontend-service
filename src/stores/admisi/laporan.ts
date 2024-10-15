import { defineStore } from "pinia";
import { apiAdmisiGet } from "@/utils/apiHandler";

export const useAdmisiIGDStore = defineStore({
  id: "admisiReport",
  getters: {},
  actions: {
    async getKunjunganReport(
      {
        q = "",
        practitionerUuid = "",
        jenisKunjungan = "",
        startDate = "",
        endDate = "",
      },
      payload = {}
    ) {
      // return apiAdmisiGet(
      //   `/report/kunjungan?q=${q}&practitioner_uuid=${practitionerUuid}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "berhasil mendapatkan data",
        payload: [
          {
            tglRegistrasi: 1728874066,
            noreg: "REG2410140001",
            noPelayanan: "RJ2410140001",
            jenisKunjungan: "RJ",
            patientUuid: "019288ec-b1c8-7670-979e-1835bd4a2a36",
            patient: {
              uuid: "019288ec-b1c8-7670-979e-1835bd4a2a36",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A123568231",
              phone: "+621234567890",
              gender: "Male",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
              birthDetail: {
                ageYear: 34,
                ageMonth: 9,
                ageDay: 13,
                birthDate: "1990-01-01T00:00:00.000Z",
              },
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
            polyclinic: "Faskes Example",
          },
          {
            tglRegistrasi: 1728878342,
            noreg: "REG2410140002",
            noPelayanan: "RI2410140001",
            jenisKunjungan: "RI",
            patientUuid: "0192892d-f186-7af1-83d9-9728156a0fdb",
            patient: {
              uuid: "0192892d-f186-7af1-83d9-9728156a0fdb",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A123568231",
              phone: "+621234567890",
              gender: "Male",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
              birthDetail: {
                ageYear: 34,
                ageMonth: 9,
                ageDay: 13,
                birthDate: "1990-01-01T00:00:00.000Z",
              },
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
            polyclinic: "-",
          },
          {
            tglRegistrasi: 1728880139,
            noreg: "REG2410140003",
            noPelayanan: "IGD2410140001",
            jenisKunjungan: "IGD",
            patientUuid: "01928949-5c05-7557-905f-2d2369eb7ec6",
            patient: {
              uuid: "01928949-5c05-7557-905f-2d2369eb7ec6",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A114563s8",
              phone: "+621234567890",
              gender: "Male",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
              birthDetail: {
                ageYear: 34,
                ageMonth: 9,
                ageDay: 13,
                birthDate: "1990-01-01T00:00:00.000Z",
              },
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
            polyclinic: "-",
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
    async getPenjaminReport(
      {
        q = "",
        practitionerUuid = "",
        penjamin = "",
        jenisKunjungan = "",
        startDate = "",
        endDate = "",
      },
      payload = {}
    ) {
      // return apiAdmisiGet(
      //   `/report/penunjang?q=${q}&practitioner_uuid=${practitionerUuid}&penjamin=${penjamin}&jenis_kunjungan=${jenisKunjungan}&start_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "berhasil mendapatkan data",
        payload: [
          {
            tglRegistrasi: 1728962544,
            noreg: "REG2410150001",
            noPelayanan: "RJ2410150001",
            jenisKunjungan: "RJ",
            patientUuid: "01928e32-c4c1-7337-be44-f04277c06a27",
            lokasiUuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
            paymentMethod: 2,
            patient: {
              uuid: "01928e32-c4c1-7337-be44-f04277c06a27",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A123568231",
              phone: "+621234567890",
              gender: "Male",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
              birthDetail: {
                ageYear: 34,
                ageMonth: 9,
                ageDay: 14,
                birthDate: "1990-01-01T00:00:00.000Z",
              },
            },
            lokasi: {
              name: "Faskes Example",
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
            noPenjamin: {
              code: "BPJS",
              accountNumber: "1234567890",
              name: "BPJS",
            },
          },
          {
            tglRegistrasi: 1728962875,
            noreg: "REG2410150002",
            noPelayanan: "RJ2410150002",
            jenisKunjungan: "RJ",
            patientUuid: "01928e37-cea0-7b1e-9f7a-a57ea1839ac1",
            lokasiUuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
            paymentMethod: 1,
            patient: {
              uuid: "01928e37-cea0-7b1e-9f7a-a57ea1839ac1",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A12338231",
              phone: "+621234567890",
              gender: "Male",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
              birthDetail: {
                ageYear: 34,
                ageMonth: 9,
                ageDay: 14,
                birthDate: "1990-01-01T00:00:00.000Z",
              },
            },
            lokasi: {
              name: "Faskes Example",
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
            noPenjamin: null,
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 2,
          nextPage: null,
          prevPage: null,
        },
      };
    },
    async getBatalKunjunganReport(
      { q = "", jenisKunjungan = "", startDate = "", endDate = "" },
      payload = {}
    ) {
      // FIXME Kurang search nama pasien
      // return apiAdmisiGet(
      //   `/report/cancel-visit?q=${q}&jenis_kunjungan=${jenisKunjungan}&start_date=&end_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "berhasil mendapatkan data",
        payload: [
          {
            tglRegistrasi: 1728962544,
            noreg: "REG2410150001",
            noPelayanan: "RJ2410150001",
            jenisKunjungan: "RJ",
            patientUuid: "01928e32-c4c1-7337-be44-f04277c06a27",
            lokasiUuid: "0191a18a-22e4-773b-8229-a023f420d0bb",
            cancelReason: "Dokternya gila",
            patient: {
              uuid: "01928e32-c4c1-7337-be44-f04277c06a27",
              title: "Mr.",
              name: "John Doe",
              identity: "KTP",
              noIdentity: "A123568231",
              phone: "+621234567890",
              address: {
                prov: "Jawa Timur",
                city: "Jakarta Selatan",
                district: "Pancoran",
                rt: "01",
                rw: "02",
                fullAddress: "Jl. Raya No. 123",
                country: "Indonesia",
                village: "Kampung",
              },
              birthDetail: {
                ageYear: 34,
                ageMonth: 9,
                ageDay: 14,
              },
            },
            practitioner: {
              title: "Ir",
              nama: "Rudi tabuti",
              gender: "L",
            },
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 1,
          nextPage: null,
          prevPage: null,
        },
      };
    },
    async getStatusRuanganReport(
      { q = "", ruangan = "", startDate = "", endDate = "" },
      payload = {}
    ) {
      // FIXME Kurang search nama pasien
      // return apiAdmisiGet(
      //   `/report/room?q=${q}&class=${ruangan}&start_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "berhasil mendapatkan data",
        payload: [
          {
            roomClass: "1",
            room: "101",
            totalPatients: "0",
          },
          {
            roomClass: "1",
            room: "102",
            totalPatients: "0",
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 2,
          nextPage: null,
          prevPage: null,
        },
      };
    },
    async getKeperawatanInapReport(
      { q = "", ruangan = "", startDate = "", endDate = "" },
      payload = {}
    ) {
      // FIXME Kurang search kelas
      // return apiAdmisiGet(
      //   `/report/rawat-inap?q=${q}&class=${ruangan}&start_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "berhasil mendapatkan data",
        payload: [
          {
            noRm: "00-00-03",
            tanggalDaftar: 1728963487,
            tanggalDirawat: null,
            dischargeDate: null,
            monitoringRoom: {
              uuid: "0191696e-5a95-7928-b2aa-4a1cf58aee69",
              roomUuid: "0191690f-1cb3-7a48-8bad-b21700bd19f4",
              roomCategory: "VIP",
              roomClass: "1",
              room: "101",
              bedName: "Kasur 1",
              noBed: "1",
            },
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 1,
          nextPage: null,
          prevPage: null,
        },
      };
    },
    async getBayiBaruLahirReport(
      { q = "", jenisKunjungan = "", startDate = "", endDate = "" },
      payload = {}
    ) {
      // return apiAdmisiGet(
      //   `/report/new-born?q=${q}&jenis_kunjungan=${jenisKunjungan}&start_date=&end_date=${startDate}&end_date=${endDate}`,
      //   payload
      // );
      return {
        message: "berhasil mendapatkan data",
        payload: [
          {
            identifierMom: "KTP",
            nameMom: "Jane Doe",
            nameBaby: "John Doe",
            noRmBaby: "00-00-03",
            birthDetailUuid: "01928e41-27f5-7506-bb1f-b8c0de8a60d7",
            birthTimeBaby: "10:38:07",
            genderBaby: "Male",
            multipleBirth: false,
            addressUuid: "01928e41-27e7-7bd7-8e12-9bae2da0e792",
            tanggalDaftar: "1970-01-21T00:16:03.487Z",
          },
        ],
        properties: {
          page: 1,
          pageSize: 10,
          totalPage: 1,
          totalData: 1,
          nextPage: null,
          prevPage: null,
        },
      };
    },
    // FIXME Belum mulai develop BPJS
    // async getJumlahBPJSReport({}, payload = {}) {
    //   return apiAdmisiGet(
    //     `/report/new-born?start_date=&end_date=&jenis_kunjungan=`,
    //     payload
    //   );
    // },
  },
});
