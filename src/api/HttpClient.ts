import axios, { AxiosInstance } from "axios";

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(protected readonly baseURL: string) {
    this.instance = axios.create({
      baseURL: this.baseURL
    });
  }
}
