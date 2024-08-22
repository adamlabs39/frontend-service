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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE1YTI2LWI0MjAtN2VjOC1hYzc4LWJiZjgwYTMxMjU2ZiIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNWEyNi1iNDJlLTcyODAtOTc1ZC0yMGEwNjNjZDI1NDEiLCJpYXQiOjE3MjQyMzA1NzQsImV4cCI6MTcyNDI0MTM3NCwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.lCYlhliErN9aHiQJT9OOR6iIJm4Jk40IB8HNvxhhMqloioVkVrHLjBLZgUrwgJUsa_wUxbZUmjmqVO-gVoiiq2Th-ExBZZsIllpex1bcyja1_diz_g5U23nI7zLmug1czLxVcJ05zySNQwi1O2bYEZqGJrLkTR7clrW9FDmmu0YgUtk91S05JU4iJHslZnduIKB2-7b9UQzlDC6M2toXxKjKjGfiR98IiAQgkgiaNZg4fmnrzH9fuxbJbKqHoVcYOLFFnDjFTHhHYo4BzB3HrXlmlJMOUpzClXKOtPzmMPK2QZ5GhP6E_DM5VMfYcRrWP7zKntbel0i27ezlBFrwKg";

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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE1YTI2LWI0MjAtN2VjOC1hYzc4LWJiZjgwYTMxMjU2ZiIsInVzZXJuYW1lIjoiYWxsaWFuby1kZXYiLCJmYXNrZXNVdWlkIjoiOWQ0MDN1ZmpoNDN1ZmgzdWY4NDMwaWhmIiwidXNlclV1aWQiOiIwMTkxNWEyNi1iNDJlLTcyODAtOTc1ZC0yMGEwNjNjZDI1NDEiLCJpYXQiOjE3MjQyMzQ5OTAsImV4cCI6MTcyNDI0NTc5MCwiaXNzIjoiYXV0aGVudGljYXRpb24tc2VyaXZpY2UifQ.mNEVAqvYREPLXtSYF9mz5UjPj-JI6MaAL2Sin0QOi6jveE1ntRSEYa9ix5CpW_DPjcd6XJDykkTXrybgPcY7Z3B09ewaeKkSxG9YhZfmYW18czpf2p3RRiXWhYthfwiZmiBKfPC-kdT2XL2v5Kdzlj6VCQXPYhJoZVdgPdoO-Df2UHpOUSjm-nq1R6CZF2fj2M__dBxk-BoVSGcakOSButZ5IRaF252CXYrmhAssHtvnJAKMoUoWIKIKOEE_Q02ZOf8ujaN7IqZ5o20137VdcZ22HDzB7YBHuywcQzbeire2MA7aQc_XbsrSp8Usso2HhKriwimKvHKTb5wXVaeRnQ";
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

export { baseInstance, settingInstance, baseInstanceDatamaster };
