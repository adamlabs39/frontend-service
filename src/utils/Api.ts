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
  const token = localStorage.getItem('access_token')

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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE3OTU5LWY5ZDktNzk5Zi1hOGE3LWFlZjk2YmM3YzdhMyIsInVzZXJuYW1lIjoiYWRhbS1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNzk1OS1mYmZlLTdmZDgtODUzYi0zNGQ2MmY3YTAyMDAiLCJpYXQiOjE3MjQzMTkzMDksImV4cCI6MTcyNjkxMTMwOSwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.iVYDV6imU7DqqgKN1MYQx43zZPUcrskCk93NdFV6MhmRYVxykRorTRpHCawLwhvVzBTb2-rKQy_oYQJLZ_08P0FU8fnnufcNhsBv5lEy46CDhgI3HvnTj65YsY7t4-yCOcdptq40PTcgfMRkRkzYKn3SEmXggJc01WZ5hY-BasmdxsPL3H_pUMYE8IwDOTy5u7Skos90AqcGGPl969e_LK1PD4aXrK0MgLA8FCQlv6n6uQgtXW5IBCe6hRaOqsFuVTFel_d_CzRHmw8VMWrhm1_F5pS_RlH9RPI6X2rOkL_hwWH267UFlePQf_-f0X1ttTMlM9bKZwKrBuR4R5_VbQ";

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
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTFmNWZlLWE3NWItN2RkNC1iNDhlLTJlYWZmMzZlYWU5MSIsInVzZXJuYW1lIjoiaGFiaWItZGV2IiwiZmFza2VzVXVpZCI6IjlkNDAzdWZqaDQzdWZoM3VmODQzMGloZiIsInVzZXJVdWlkIjoiMDE5MWY1ZmUtYWVjNC03MmMyLWIyNjUtZGRhMTkwNGZhZjdlIiwiaWF0IjoxNzI3MDU5Njk3LCJleHAiOjE3Mjk2NTE2OTcsImlzcyI6ImF1dGhlbnRpY2F0aW9uLXNlcml2aWNlIn0.kfAtpjzJgYLOtmdojlCmwFbYZUQm8JajhdB7chQVugNIail9qOJ101KHTHiw9VRXwAB-JAQ1jz5reTfXGGsZztO4I5eWnu5PMlmefuhSSb_pX5QpOiARh97X9K_VC9wAp-L9tp88cTtnKOyeJ2v2UyDvgp33JbNXWLdzJzsdx-XiA9t71-VTH61UdhSpFrlKdYzlNdfeT3c0K2IqlMzgAeEuKO6nxVpdmPthZ5sSABGSAVylfGSrE_o6f-odFZg1A7ki6PJ_Qvd2dVWl-u8U84bOOeMudv2FtwTIjEIZV7-7P4MnZ9FLoDQ4yrudxrbTi8nfYdAzai0L5NEBRVu40w";
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

export { baseInstance, authInstance, settingInstance, baseInstanceDatamaster };
