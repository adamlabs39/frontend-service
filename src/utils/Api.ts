import axios, { type AxiosResponse } from "axios";

// NOTE Helper Converter
type AnyObject = { [key: string]: any };

// Convert camelCase to snake_case
const toSnakeCase = (obj: AnyObject | any[]): AnyObject | any[] => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item));
  }

  return Object.keys(obj).reduce((acc: AnyObject, key: string) => {
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`
    );
    acc[snakeKey] = toSnakeCase(obj[key]);
    return acc;
  }, {});
};

// Convert snake_case to camelCase
const toCamelCase = (obj: AnyObject | any[]): AnyObject | any[] => {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  return Object.keys(obj).reduce((acc: AnyObject, key: string) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    acc[camelKey] = toCamelCase(obj[key]);
    return acc;
  }, {});
};

const baseInstance = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});

baseInstance.interceptors.request.use(
  (config) => {
    const token = "";
    if (!token) {
      config.headers["Authorization"] = "";
    } else {
      config.headers["Authorization"] = token;
    }
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE1MDZlLTIwMTUtNzRiOC1hY2ExLTVmNjhkY2NiOTE0OSIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNTA2ZS0yMDIwLTdkY2ItODdjMy1iMmU4ZjE1NDMzZjEiLCJpYXQiOjE3MjM3OTA1NTQsImV4cCI6MTcyMzgwMTM1NCwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.nYMZVYwKLi-rg0k-LGQTq7lxAoyWrt7DV7Sxn7GMhH1wNlLaGzBKzxsVTORIhNy6nSjBGR-b46l0Oi-yHGFr6nBLDr7cTlx-3ZtaCfgyIAmBlZHcXURiUm_YZmMwsJkaXC1MAJCzwyIiq0SlCaRGFGrWB3TZaSFl7cM8mdh3d21bEMlkSf-fEEbqsH2_tO5xzbC_kHMDSjccaaOEG_CECmqCiiYkA1EZ6yNd6UXYld2K7gzTpRoiygPa9jy50gmBPCT9aKE80EryBwR67g7KgpAv9kWO_57eoDNJYAF3m4F8_w_PYyWfrBEG8ZdZgtiK0KY-Z59wkx8i5qVPcMqyzA";

  if (!token) {
    config.headers["Authorization"] = "";
  } else {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (config.data) {
    config.data = toSnakeCase(config.data);
  }

  return config;
});

settingInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Datamaster
const baseInstanceDatamaster = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_DATAMASTER,
});

baseInstanceDatamaster.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE1YTI2LWI0MjAtN2VjOC1hYzc4LWJiZjgwYTMxMjU2ZiIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNWEyNi1iNDJlLTcyODAtOTc1ZC0yMGEwNjNjZDI1NDEiLCJpYXQiOjE3MjQxMzQ3NjMsImV4cCI6MTcyNDE0NTU2MywiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.VtxG20POdBL-EO9ImszuvQUFwbivLGd-SZfDD1Zjsg8vw5_LJkEmPFO5Kp9Re6nL3OCGpCl0UjjPYi2Wa4vtHaYZsoP_aS7ThImeg8KS920QqMc4u8Yzhj5IzNwEkON2tUEhugEeCghJgyq4fftMB89DsXwhwtkPSpRXXqG4Yh8O8k2-Mxittu_r_UkzZOZz9T0G7q3XmBaUSyAtr9SlSz7QuLIrhRfLBSKNQXf0GBKyIdTySbSU60Pg9T3Mrk1AzgNqCOOJryMGZUiKPZ05Sp4OgQT0qTo7Znr1wEV6if79CKt8kdG60v4DnkUzfWoVhOF3gRaSg7qMC-F4SOeb_g";
    if (!token) {
      config.headers["Authorization"] = "";
    } else {
      config.headers["Authorization"] =`Bearer ${token}`;
    }
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseInstanceDatamaster.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { baseInstance, settingInstance, baseInstanceDatamaster };
