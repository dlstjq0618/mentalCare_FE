import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  DoctorInfoResponse,
  DoctorSignUpResponse,
  Counselor,
  TestResponse,
} from "~/interfaces";

export const counselor = {
  signUp: async (payload: Counselor) => {
    const sessions = await getSession();
    const { data } = await axios.request<
      DoctorSignUpResponse,
      AxiosResponse<DoctorSignUpResponse>,
      Counselor
    >({
      url: URLS.COUNSELOR.SIGN_UP,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${sessions?.accessToken}`,
      },
    });

    return data;
  },

  info: async (id: number) => {
    const sessions = await getSession();

    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.INFO(id),
      method: "GET",
      headers: {
        Authorization: `jwt ${sessions?.accessToken}`,
      },
    });
    return data;
  },

  test: async () => {
    // const sessions = await getSession();
    const { data } = await axios.request<
      TestResponse,
      AxiosResponse<TestResponse>
    >({
      url: URLS.COUNSELOR.TEST,
      method: "GET",
    });
    return data;
  },
  board: async (payload: any) => {
    // const sessions = await getSession();
    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.BOARD,
      data: payload,
      method: "POST",
    });
    return data;
  },
};
