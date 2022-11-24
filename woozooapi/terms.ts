import { AxiosResponse } from "axios";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import { TermsResponse } from "~/interfaces";

export const terms = () =>
  Promise.all([
    axios
      .request<TermsResponse, AxiosResponse<TermsResponse>>({
        url: URLS.TERMS.PRIVACY,
        method: "GET",
      })
      .then((res) => res.data),
    axios
      .request<TermsResponse, AxiosResponse<TermsResponse>>({
        url: URLS.TERMS.SERVICE,
        method: "GET",
      })
      .then((res) => res.data),
  ]);
