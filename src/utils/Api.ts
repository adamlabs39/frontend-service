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

  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE1MDZlLTIwMTUtNzRiOC1hY2ExLTVmNjhkY2NiOTE0OSIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNTA2ZS0yMDIwLTdkY2ItODdjMy1iMmU4ZjE1NDMzZjEiLCJpYXQiOjE3MjM3OTA1NTQsImV4cCI6MTcyMzgwMTM1NCwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.nYMZVYwKLi-rg0k-LGQTq7lxAoyWrt7DV7Sxn7GMhH1wNlLaGzBKzxsVTORIhNy6nSjBGR-b46l0Oi-yHGFr6nBLDr7cTlx-3ZtaCfgyIAmBlZHcXURiUm_YZmMwsJkaXC1MAJCzwyIiq0SlCaRGFGrWB3TZaSFl7cM8mdh3d21bEMlkSf-fEEbqsH2_tO5xzbC_kHMDSjccaaOEG_CECmqCiiYkA1EZ6yNd6UXYld2K7gzTpRoiygPa9jy50gmBPCT9aKE80EryBwR67g7KgpAv9kWO_57eoDNJYAF3m4F8_w_PYyWfrBEG8ZdZgtiK0KY-Z59wkx8i5qVPcMqyzA";

  if (!token) {
    config.headers["Authorization"] = "";
  } else {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { baseInstance, settingInstance };
