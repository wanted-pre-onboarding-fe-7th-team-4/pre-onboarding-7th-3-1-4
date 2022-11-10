import { AxiosResponse } from "axios";
import { HttpClient } from "./HttpClient";

export interface APIService {
  fetch: <T>(endPoint: string) => Promise<AxiosResponse<T, any>>;
}

export class APIServiceImpl extends HttpClient implements APIService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  fetch = <T>(endPoint: string) => {
    console.info("calling api");
    return this.instance.get<T>(this.baseURL + endPoint);
  };
}
