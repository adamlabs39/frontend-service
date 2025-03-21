import {
  baseInstance,
  settingInstance,
  baseInstanceDatamaster,
  baseInstanceAdmisi,
  baseInstanceIgd,
  baseInstanceFarmasi,
  authInstance,
  baseInstancePembayaran,
  baseInstanceLaboratorium,
  baseInstanceRawatJalan,
  baseInstanceRekamMedis,
  baseInstanceRawatInap,
  baseInstanceInventory,
} from "./Api";
import { app } from "@/main";

const cekHost = (baseUrl: unknown, nextUrl: string) => {
  const url = new URL(baseUrl as string);
  const tempUrl = `:${url.port}${url.pathname}`;
  let newUrl = nextUrl;
  const currentHostUrl = window.location.hostname;
  if (
    !currentHostUrl.includes("localhost") &&
    !currentHostUrl.includes("adameds")
  ) {
    newUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      tempUrl +
      nextUrl;
  }
  return newUrl;
};

const errorApiHandler = (error: any) => {
  let tempSummary = ``;
  let tempDetail = ``;
  if (error.response.data.message) {
    if (
      error.response.data.message == "token tidak valid!" ||
      ((error.response.data.message == "Authentikasi gagal" ||
        error.response.data.message == "Authorization gagal" ||
        error.response.data.message == "jwt expired") &&
        (error.response.data.errors[0].type.toLowerCase() == "invalid token" ||
          error.response.data.errors[0].type == "Invalid signature" ||
          (error.response.data.errors[0].type == "auth" &&
            error.response.data.errors[0].message == "jwt expired")))
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("permission");
      localStorage.removeItem("user");
      localStorage.removeItem("faskes");
      window.location.reload();
    }
    tempSummary = error.response.data.message;
    error.response.data.errors?.forEach((errorMsg: any, index: number) => {
      if (error.response.data.errors.length == index + 1) {
        tempDetail += "- " + errorMsg.message;
      } else {
        tempDetail += "- " + errorMsg.message + "\n";
      }
    });
  } else {
    tempSummary = error.message;
  }

  app.config.globalProperties.$toast.add({
    severity: "error",
    summary: tempSummary,
    detail: tempDetail,
    life: 3000,
  });
  throw new Error(tempSummary);
};

const apiBasePost = async (url: string, data: object) => {
  try {
    let response = await baseInstance.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiBaseGet = async (url: string, data: object) => {
  try {
    let response = await baseInstance.get(url, data);
    return response.data.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiBasePut = async (url: string, data: object) => {
  try {
    let response = await baseInstance.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiBaseDelete = async (url: string, data: object) => {
  try {
    let response = await baseInstance.delete(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Auth
const apiAuthPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_AUTH, url);
  try {
    let response = await authInstance.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });

    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAuthDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_AUTH, url);
  try {
    let response = await authInstance.delete(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });

    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAuthGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_AUTH, url);
  try {
    let response = await authInstance.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAuthPut = async (url: string, data: object) => {
  try {
    let response = await authInstance.put(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Setting
const apiSettingPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_URL_SETTING, url);
  try {
    let response = await settingInstance.post(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiSettingGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_URL_SETTING, url);
  try {
    let response = await settingInstance.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiSettingPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_URL_SETTING, url);
  try {
    let response = await settingInstance.put(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiSettingDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_URL_SETTING, url);
  try {
    let response = await settingInstance.delete(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};

//Datamaster
const apiDatamasterGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_DATAMASTER, url);
  try {
    let response = await baseInstanceDatamaster.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiDatamasterPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_DATAMASTER, url);
  try {
    let response = await baseInstanceDatamaster.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiDatamasterPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_DATAMASTER, url);
  try {
    let response = await baseInstanceDatamaster.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiDatamasterDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_DATAMASTER, url);
  try {
    let response = await baseInstanceDatamaster.delete(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: "Data berhasil dihapus",
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};

//Pembayaran
const apiPembayaranGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_PEMBAYARAN, url);
  try {
    let response = await baseInstancePembayaran.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiPembayaranPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_PEMBAYARAN, url);
  try {
    let response = await baseInstancePembayaran.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiPembayaranPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_PEMBAYARAN, url);
  try {
    let response = await baseInstancePembayaran.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiPembayaranDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_PEMBAYARAN, url);
  try {
    let response = await baseInstancePembayaran.delete(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: "Data berhasil dihapus",
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Laboratorium
const apiLaboratoriumGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_LABORATORIUM, url);
  try {
    let response = await baseInstanceLaboratorium.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiLaboratoriumPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_LABORATORIUM, url);
  try {
    let response = await baseInstanceLaboratorium.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiLaboratoriumPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_LABORATORIUM, url);
  try {
    let response = await baseInstanceLaboratorium.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiLaboratoriumDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_LABORATORIUM, url);
  try {
    let response = await baseInstanceLaboratorium.delete(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: "Data berhasil dihapus",
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};

//Admisi
const apiAdmisiGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_ADMISI, url);
  try {
    let response = await baseInstanceAdmisi.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAdmisiPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_ADMISI, url);
  try {
    let response = await baseInstanceAdmisi.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAdmisiPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_ADMISI, url);
  try {
    let response = await baseInstanceAdmisi.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAdmisiPatch = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_ADMISI, url);
  try {
    let response = await baseInstanceAdmisi.patch(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiAdmisiDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_ADMISI, url);
  try {
    let response = await baseInstanceAdmisi.delete(url, { data: data });
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

//Igd
const apiIgdGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_IGD, url);
  try {
    let response = await baseInstanceIgd.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiIgdPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_IGD, url);
  try {
    let response = await baseInstanceIgd.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiIgdPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_IGD, url);
  try {
    let response = await baseInstanceIgd.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiIgdDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_IGD, url);
  try {
    let response = await baseInstanceIgd.delete(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

//Farmasi
const apiFarmasiGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_FARMASI, url);
  try {
    let response = await baseInstanceFarmasi.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiFarmasiPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_FARMASI, url);
  try {
    let response = await baseInstanceFarmasi.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiFarmasiPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_FARMASI, url);
  try {
    let response = await baseInstanceFarmasi.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiFarmasiDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_FARMASI, url);
  try {
    let response = await baseInstanceFarmasi.delete(url, { data: data });
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Rawat Jalan
const apiRawatJalanGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_RAWAT_JALAN, url);
  try {
    let response = await baseInstanceRawatJalan.get(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Rekam Medis
const apiRekamMedisGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_REKAM_MEDIS, url);
  try {
    let response = await baseInstanceRekamMedis.get(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiRekamMedisPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_REKAM_MEDIS, url);
  try {
    let response = await baseInstanceRekamMedis.post(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiRekamMedisPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_REKAM_MEDIS, url);
  try {
    let response = await baseInstanceRekamMedis.put(url, data);
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiRekamMedisDelete = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_REKAM_MEDIS, url);
  try {
    let response = await baseInstanceRekamMedis.delete(url, { data: data });
    app.config.globalProperties.$toast.add({
      severity: "success",
      summary: response.data.message,
      life: 3000,
    });
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Rawat inap Perpindahan Bangsal
const apiRawatInapGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_RAWAT_INAP, url);
  try {
    let response = await baseInstanceRawatInap.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiRawatInapPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_RAWAT_INAP, url);
  try {
    let response = await baseInstanceRawatInap.post(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiRawatInapPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_RAWAT_INAP, url);
  try {
    let response = await baseInstanceRawatInap.put(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Inventory
const apiInventoryGet = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_INVENTORY, url);
  try {
    let response = await baseInstanceInventory.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiInventoryPost = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_INVENTORY, url);
  try {
    let response = await baseInstanceInventory.post(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiInventoryPut = async (url: string, data: object) => {
  url = cekHost(import.meta.env.VITE_BASE_INVENTORY, url);
  try {
    let response = await baseInstanceInventory.put(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

export {
  apiBasePost,
  apiBaseGet,
  apiBasePut,
  apiBaseDelete,
  apiAuthPost,
  apiAuthDelete,
  apiAuthGet,
  apiAuthPut,
  apiSettingPost,
  apiSettingGet,
  apiSettingPut,
  apiSettingDelete,
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
  apiPembayaranGet,
  apiPembayaranPost,
  apiPembayaranPut,
  apiPembayaranDelete,
  apiLaboratoriumGet,
  apiLaboratoriumPost,
  apiLaboratoriumPut,
  apiLaboratoriumDelete,
  apiAdmisiGet,
  apiAdmisiPost,
  apiAdmisiPut,
  apiAdmisiPatch,
  apiAdmisiDelete,
  apiIgdGet,
  apiIgdPost,
  apiIgdPut,
  apiIgdDelete,
  apiRawatJalanGet,
  apiFarmasiGet,
  apiFarmasiPost,
  apiFarmasiPut,
  apiFarmasiDelete,
  apiRekamMedisGet,
  apiRekamMedisPost,
  apiRekamMedisPut,
  apiRawatInapGet,
  apiRawatInapPost,
  apiRawatInapPut,
  apiInventoryGet,
  apiInventoryPost,
  apiInventoryPut,
  apiRekamMedisDelete,
};
