import { AxiosInstance, AxiosRequestConfig } from "axios";
import axiosInstance from "~/services/axios";

class HttpRequest {
  private api: AxiosInstance;
  private prefix: string;
  private internalConfig?: AxiosRequestConfig;

  constructor(prefix: string, config?: AxiosRequestConfig) {
    this.api = axiosInstance;
    this.prefix = prefix;
    this.internalConfig = config;
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.get(`${this.prefix}${url}`, {
      ...this.internalConfig,
      ...config,
    });
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api.post(`${this.prefix}${url}`, data, {
      ...this.internalConfig,
      ...config,
    });
  }

  async put<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api.put(`${this.prefix}${url}`, data, {
      ...this.internalConfig,
      ...config,
    });
  }

  async patch<T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api.patch(`${this.prefix}${url}`, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.api.delete(`${this.prefix}${url}`, {
      ...this.internalConfig,
      ...config,
    });
  }
}

const httpRequest = new HttpRequest("/api/v1");

export default httpRequest;
