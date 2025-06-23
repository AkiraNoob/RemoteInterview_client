import axios, { AxiosError, AxiosRequestConfig } from "axios";
import cookieCommons from "~/helpers/cookieCommon";

const baseApi = process.env.BASE_API_URL
  ? `${process.env.BASE_API_URL}`
  : "https://localhost:7063";

const requestConfig: AxiosRequestConfig = {
  baseURL: baseApi,
  //https://stackoverflow.com/questions/63064393/getting-axios-error-connect-etimedout-when-making-high-volume-of-calls
};

const axiosInstance = axios.create(requestConfig);

console.log(process.env.BASE_API_URL, baseApi);

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      const accessToken = cookieCommons.getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error: AxiosError) => {
    const statusCode = error.response?.status as number;

    return Promise.reject(error);
  }
);

export default axiosInstance;
