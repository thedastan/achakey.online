import axios from "axios";

export const API_ADDRESS = process.env.REACT_APP_BACK_API_URL;

const API = axios.create({
  baseURL: API_ADDRESS,
});

export const PUBLIC_API = axios.create({
  baseURL: API_ADDRESS,
});

API.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("accessToken") || ""
  )}`;
  return config;
});

API.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !err.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${API_ADDRESS}account/token/refresh/`,
          {
            refresh: localStorage.getItem("refreshToken"),
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("accessToken", response.data.access);
        return API.request(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      return Promise.reject(err);
    }
  }
);

export default API;
