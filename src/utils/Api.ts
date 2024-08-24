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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlVXVpZCI6IjAxOTE3OTU5LWY5ZDktNzk5Zi1hOGE3LWFlZjk2YmM3YzdhMyIsInVzZXJuYW1lIjoiaGFiaWItZGV2IiwiZmFza2VzVXVpZCI6IjlkNDAzdWZqaDQzdWZoM3VmODQzMGloZiIsInVzZXJVdWlkIjoiMDE5MTc5NTktZmM5MS03Y2EwLTlkNGYtN2U3N2M3M2Y4MGU3IiwiaWF0IjoxNzI0MzE3ODQwLCJleHAiOjE3MjY5MDk4NDAsImlzcyI6ImF1dGhlbnRpY2F0aW9uLXNlcml2aWNlIn0.f1lUymDMagYxbNI-IbZoB9uiKiltrigarFg4cZXcbDggAIiTuiV4X0rg1pHisyBS86fE_gLN4nhrfpTCCYGyfg-r3DCKW1mxqVqsLdb5bFVhlobP_YENmwkJ0rGjIjKj7El15KxwOrVea2hRdlvwSd6Q7VFkOafsO7W-Rgl8mTVpS1qFmlSLCu6u_sfTm4l4TUZppm8-42w4IYrMfINBw6zm2sb2TiCFCGyHDgzcCvnHniK3xnegJdkmnlzhJvR9MAzrVUL6yvYDGS2VS5pEcGOFfdoVtOMG-lLvHWrhnz1Mnt-J4sH9IwCYrYEa3k4koBSQ4xJ7QS_zcjWyD6VO-A";
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
