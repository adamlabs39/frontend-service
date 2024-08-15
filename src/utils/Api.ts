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


const baseInstanceICD9 = axios.create({
  headers: {
    common: {
      Accept: "text/plain, */*",
    },
    
  },
  baseURL: import.meta.env.VITE_BASE_ICD9,
  
});

export { baseInstance, baseInstanceICD9 };
