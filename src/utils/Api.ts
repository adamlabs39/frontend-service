import axios, { type AxiosResponse } from "axios";

// NOTE Helper Converter
type AnyObject = { [key: string]: any };

// Convert camelCase to snake_case
const toSnakeCase = (obj: AnyObject | any[]): AnyObject | any[] => {
  if (typeof obj !== "object" || obj === null || obj instanceof FormData)
    return obj;

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
  if (typeof obj !== "object" || obj === null || obj instanceof FormData)
    return obj;

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

// login
const authInstance = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_AUTH,
});

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    config.headers["Authorization"] = "";
  } else {
    config.headers["Authorization"] = `${token}`;
  }
  if (config.data) {
    config.data = toSnakeCase(config.data);
  }

  return config;
});

authInstance.interceptors.response.use(
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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTFmNWZlLWE3NWItN2RkNC1iNDhlLTJlYWZmMzZlYWU5MSIsInVzZXJuYW1lIjoiYWRhbS1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxZjVmZS1hZGJmLTc1ZjItOGVhNi0xNzUxZjJiYzA2NWUiLCJpYXQiOjE3MjczNDM2MzYsImV4cCI6MTcyOTkzNTYzNiwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.DUAm62beCvH5znNBPbkhpbEM26Kv5jvfgdEYAcQ4lLRgehaZt-k89AYWM31aT83G-HlM5mkEbwTqrw4zb2gj2OiuNUPmwugBIXZVARM99Gcp4AHuomFkgC7d2n8VGnt7gvoIRK7blRPtYymKNFATk36XhDZUI3glXVy3yQQ4M7etjvbIv9q7RqqgDyo1gc8gIvcieSNuSk-4SQh4u7pSCeNqduji3McEKvZVbzxa9L2mtpZhYK5X3c3CNwMkUCR2SXY6o50uibjEO8EzE1alN824Jf8_Vr2CDYtP90O0MtquZLkeLbd7IHBjZfqWGjTFQU7drtrdwT7-33-Q-4F1dw";

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
    const token = localStorage.getItem("access_token");

    if (!token) {
      config.headers["Authorization"] = "";
    } else {
      config.headers["Authorization"] = `${token}`;
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

//Admisi
const baseInstanceAdmisi = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_ADMISI,
});

baseInstanceAdmisi.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTI5Mzc1LTg5MzQtNzllNi1iNTc2LWI3Nzc3OTAwYTIyNyIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwibmFtZSI6ImFsbGlhbm8iLCJpYXQiOjE3MjkwNTA5MjksImV4cCI6MTczNzY5MDkyOSwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.opmy0ugOdt0WKFY_sRmEtIeVWuJj94F5X9BuCOcwzpjbqStjAs6BD_eEiMSU-nsXs-ht7Kk-sUd338_MLQeP_pmP0KIn7sTzuCwceM7VnxtnrX9eVfJKMohTcRr61xnOwIcW0zFPMGwO0uhS2Q75gqSSE2Q87go51TznjAQMaSsxnqhk23CT1xJ9ZejDUCC0G6oKLUm6E_ScdRve3Qw3ebo8vm7pAKgmd_5VVNvmOkjTR-uQhmz_kFD5RFhN5ZZjI9hjmkT90ilgFr-tLWD5GZxoxkjRHKcNoyI9UcEnXQRM8C_Sx8xohFaKQIk-DJMRl_PS6mpDjRELXymv-UJ5Jw";
    if (!token) {
      config.headers["Authorization"] = "";
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
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

baseInstanceAdmisi.interceptors.response.use(
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

// INVENTORY 
const baseInstanceInventory = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_INVENTORY,
});


baseInstanceInventory.interceptors.request.use(
  (config) => {
    const token = "";
    if (!token) {
      config.headers["Authorization"] = "";
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
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

baseInstanceInventory.interceptors.response.use(
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

export {
  baseInstance,
  authInstance,
  settingInstance,
  baseInstanceDatamaster,
  baseInstanceAdmisi,
  baseInstanceInventory
};
