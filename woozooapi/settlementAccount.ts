import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  DoctorAccountDetailsResponse,
  EditDoctorAccountDetailsPayload,
  BooleanResponse,
} from "~/interfaces";

export const settlementAccount = {
  getDoctorAccountDetails: async () => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request<
      DoctorAccountDetailsResponse,
      AxiosResponse<DoctorAccountDetailsResponse>
    >({
      url: URLS.SETTLEMENT_ACCOUNT.GET_ACCOUNT_DETAILS,
      method: "GET",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },
  editDoctorAccountDetails: async (
    payload: EditDoctorAccountDetailsPayload
  ) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request<
      BooleanResponse,
      AxiosResponse<BooleanResponse>,
      EditDoctorAccountDetailsPayload
    >({
      url: URLS.SETTLEMENT_ACCOUNT.EDIT_ACCOUNT_DETAILS,
      method: "PUT",
      data: payload,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },
  getSettlementList: async (year: number) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: URLS.SETTLEMENT_ACCOUNT.GET_SETTLEMENT_LIST + `?year=${year}`,
      method: "GET",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },
};
