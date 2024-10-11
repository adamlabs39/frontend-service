import {
  baseInstance,
  settingInstance,
  baseInstanceDatamaster,
  authInstance,
} from "./Api";
import { app } from "@/main";

const errorApiHandler = (error: any) => {
  let tempSummary = ``;
  let tempDetail = ``;
  if (error.response) {
    if (
      error.response.data.message == "Token tidak valid atau telah kadaluarsa"
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("permission");
      localStorage.removeItem("user");
    }
    tempSummary = error.response.data.message;
    error.response.data.errors.forEach((errorMsg: any, index: number) => {
      if (error.response.data.errors == index + 1) {
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
  try {
    let response = await authInstance.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};

// Setting
const apiSettingPost = async (url: string, data: object) => {
  try {
    let response = await settingInstance.post(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiSettingGet = async (url: string, data: object) => {
  try {
    let response = await settingInstance.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiSettingPut = async (url: string, data: object) => {
  try {
    let response = await settingInstance.put(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiSettingDelete = async (url: string, data: object) => {
  try {
    let response = await settingInstance.delete(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};

//Datamaster
const apiDatamasterGet = async (url: string, data: object) => {
  try {
    let response = await baseInstanceDatamaster.get(url, data);
    return response.data;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiDatamasterPost = async (url: string, data: object) => {
  try {
    let response = await baseInstanceDatamaster.post(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiDatamasterPut = async (url: string, data: object) => {
  try {
    let response = await baseInstanceDatamaster.put(url, data);
    return response;
  } catch (error) {
    errorApiHandler(error);
  }
};
const apiDatamasterDelete = async (url: string, data: object) => {
  try {
    let response = await baseInstanceDatamaster.delete(url, data);
    return response;
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
  apiSettingPost,
  apiSettingGet,
  apiSettingPut,
  apiSettingDelete,
  apiDatamasterGet,
  apiDatamasterPost,
  apiDatamasterPut,
  apiDatamasterDelete,
};
