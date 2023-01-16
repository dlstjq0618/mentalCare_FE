import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import applyCaseMiddleware from "axios-case-converter";

export const createAxiosInstance = ({
  config,
  caseConverter,
}: {
  config: AxiosRequestConfig;
  caseConverter?: boolean;
}): AxiosInstance => {
  const instance = axios.create(config);
  if (caseConverter) {
    // automatically convert snake_case to camelCase
    return applyCaseMiddleware(instance);
  }
  return instance;
};
