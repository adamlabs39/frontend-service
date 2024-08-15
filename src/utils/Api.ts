import axios from "axios";

const baseInstance = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});

baseInstance.interceptors.request.use((config) => {
  const token = "";
  
  if (!token) {
    config.headers["Authorization"] = "";
  } else {
    config.headers["Authorization"] = token;
  }

  return config;
});

// Setting

const settingInstance = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_URL_SETTING,
});

settingInstance.interceptors.request.use((config) => {
  console.log(import.meta.env.VITE_URL_SETTING);

  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE1MDZlLTIwMTUtNzRiOC1hY2ExLTVmNjhkY2NiOTE0OSIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNTA2ZS0yMDIwLTdkY2ItODdjMy1iMmU4ZjE1NDMzZjEiLCJpYXQiOjE3MjM3MTU0MTksImV4cCI6MTcyMzcyNjIxOSwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.QtkTFBmSksdzl8ugkvYnv7YQcEsYuZ-cJnA5mFdkq_0CiGmOvp_HXnEjbgHPu6r03mu5pFNZytP5aiuGWC656HuPRvl_xQ7d_erI_2nODgCz4YWEd_FIt5wJHBlzlJoukhLFwiD0jQD9Gk2r4KW7CsvhrYp4nkkSfrTDoF_huqkNz0ta62gIJCUk5-oLxG8wJvjTwRY0hd86v-1F9iEmdlyYHBLW_dWz3ayt0xzUYYdHL47qjb5X3jak73PjynIe1_R172CYM1sQ6w6S9horFLdxewCvrLyLkV0t-BbS_RJ4Q_ELut2OvEdObEvsPAd5Gz71W_gmJVN9dguGuvm2jw";

  if (!token) {
    config.headers["Authorization"] = "";
  } else {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { baseInstance, settingInstance };
