import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  DoctorInfoUpdateResponse,
  DoctorSubjectListResponse,
  DoctorActivate,
  DoctorOperate,
  Counselor,
} from "~/interfaces";

export const doctor = {
  specialList: async () => {
    const { data } = await axios.request<
      DoctorSubjectListResponse,
      AxiosResponse<DoctorSubjectListResponse>
    >({
      url: URLS.DOCTOR.REIMBURSEMENT_ITEMS_LIST,
      method: "GET",
    });

    return data.data;
  },
  reimbursementList: async () => {
    const { data } = await axios.request<
      DoctorSubjectListResponse,
      AxiosResponse<DoctorSubjectListResponse>
    >({
      url: URLS.DOCTOR.REIMBURSEMENT_ITEMS_LIST,
      method: "GET",
    });
    return data.data;
  },
  activate: async (id: number, payload: DoctorActivate) => {
    const sessions = await getSession();
    const { data } = await axios.request<
      DoctorInfoUpdateResponse,
      AxiosResponse<DoctorInfoUpdateResponse>,
      DoctorActivate
    >({
      url: URLS.DOCTOR.ACTIVATE(id),
      method: "PUT",
      data: payload,
      headers: {
        Authorization: `jwt ${sessions?.accessToken}`,
      },
    });

    return data;
  },
  operate: async (payload: DoctorOperate) => {
    const sessions = await getSession();
    const { data } = await axios.request<
      DoctorInfoUpdateResponse,
      AxiosResponse<DoctorInfoUpdateResponse>,
      DoctorOperate
    >({
      url: URLS.DOCTOR.PUBLIC_STATE,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${sessions?.accessToken}`,
      },
    });
    return data;
  },
};

export const useSubjectList = () =>
  useSWR<DoctorSubjectListResponse["data"]>(
    URLS.DOCTOR.TREATMENT_SUBJECT_LIST,
    doctor.specialList,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
