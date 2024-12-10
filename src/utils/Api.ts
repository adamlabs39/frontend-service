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

//Farmasi
const baseInstanceFarmasi = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_FARMASI,
});

baseInstanceFarmasi.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImtoYWJpYkBnbWFpbC5jb20iLCJmYXNrZXNVdWlkIjoiMDE5MzRkMGUtMzJjMi03N2Q5LTkzMjUtZjI0NjVmYzRmYzE3IiwiaWF0IjoxNzMyNjAzMjY0LCJleHAiOjE3MzI2MTQwNjQsImlzcyI6ImF1dGhlbnRpY2F0aW9uLXNlcml2aWNlIn0.WMlHCeBv2Vt9Ux46Jc-RKcpOm5SLNOaU49kH-8B67YcRC9_Y7tV6LCvjEasJskKogMquVNv2KSrngAP3SgZfzULLCIa80XDYrfYckThH4WyxiHROEuGtU0bfu6Tcig1Ih9s73T2xobGeheZH7lzgWNRSq14I7mdgmmTg_CurTo6HNvqi_-NGvIUpTB2BtvpPjbYlIA5_4dgMTGIOjbJbbIv-KQY9azNBrmq16wIpACAHYsklhWpoftTLenQyaoe93SxPrFRWC8vLKeamPG4Wzr9xAKvFaGWRs_p2DegRks2ggOQkJ6QBzyQvwwMRorbOPkNE-ghRWdHwJy6K_1JfLw";
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

baseInstanceFarmasi.interceptors.response.use(
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

//IGD
const baseInstanceIgd = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_IGD,
});

baseInstanceIgd.interceptors.request.use(
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

// Rawat Jalan
const baseInstanceRawatJalan = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
  },
  baseURL: import.meta.env.VITE_BASE_LAPORAN,
});

baseInstanceRawatJalan.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");;

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


baseInstanceRawatJalan.interceptors.response.use(
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
  baseInstanceIgd,
  baseInstanceRawatJalan
  baseInstanceFarmasi
};
