import { createAxiosInstance } from "./axios";
import { HOST } from "./urls";


export const axios = createAxiosInstance({
  config: {
    baseURL: HOST,
    // ...configs
  },
  caseConverter: true,
});