import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import useSWR from "swr";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  DiagnosisStatus,
  AddPrescriptionAndPriceResponse,
  CancelCallPayLoad,
  DeletePrescriptionAndPricePayload,
  FinalSavePayLoad,
  PatientInfoResponse,
  StartCallPayLoad,
  TerminateCallPayLoad,
  RequestPrivateDiagnosisPayload,
  BooleanResponse,
  RequestPrivateDiagnosisReservationUpdatePayload,
  PrivateDiagnosisTreatmentListResponse,
  DateStringKebab,
  PrivateDiagnosisReservationTimeListResponse,
  PrivateDiagnosisReservationListResponse,
  PrivateDiagnosisReservationDetailResponse,
  PrivateReservationStatusType,
  PrivateDiagnosisImmediatelyResponse,
  DiagnosisNoticeListResponse,
} from "~/interfaces";
import { DiagnosisListResponse } from "~/interfaces";

export const diagnosis = {
  getTodayList: async ({
    order,
    page = 1,
    status,
  }: {
    order?: "past";
    page?: number;
    status?: DiagnosisStatus;
  }) => {
    let url = `/api/service/diagnosis${page ? `?page=${page}` : ""}${
      order ? `&order=${order}` : ""
    }${status ? `&status=${status}` : ""}`;

    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: url,
      method: "GET",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });
    return data;
  },

  getPastList: async ({
    order,
    page,
    search,
    term,
    status,
  }: {
    order?: "past";
    page?: number;
    search?: string;
    term?: string;
    status?: DiagnosisStatus;
  }) => {
    let url = `/api/service/diagnosis?now=False${page ? `&page=${page}` : ""}${
      order ? `&order=${order}` : ""
    }${search ? `&search=${search}` : ""}${status ? `&status=${status}` : ""}${
      term ? `&term=${term}` : ""
    }`;

    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: url,
      method: "GET",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  getDiagnosisWaitingList: async (url: string) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request<DiagnosisListResponse>({
      url,
      method: "GET",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  getDiagnosisDetailInfo: async (id: number) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request<
      PatientInfoResponse,
      AxiosResponse<PatientInfoResponse>
    >({
      url: URLS.DIAGNOSIS.GET_DIAGNOSIS_DETAIL(id),
      method: "GET",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  startCall: async (id: number, payload: StartCallPayLoad) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: URLS.DIAGNOSIS.START_CALL(id),
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  cancelCall: async (id: number, payload: CancelCallPayLoad) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request<CancelCallPayLoad>({
      url: URLS.DIAGNOSIS.CANCEL_CALL(id),
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  terminateCall: async (payload: TerminateCallPayLoad) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: URLS.DIAGNOSIS.TERMINATION,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  retryCall: async (id: number) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: URLS.DIAGNOSIS.RETRY_CALL(id),
      method: "POST",
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  addPrescriptionAndPrice: async ({
    file,
    price,
    diagnosisResultId,
  }: {
    file: File;
    price: string;
    diagnosisResultId: string;
  }) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const fileUploadData = new FormData();

    fileUploadData.append("file", file);
    fileUploadData.append("price", price);
    fileUploadData.append("diagnosis_result_id", diagnosisResultId);

    const { data } = await axios.request<
      AddPrescriptionAndPriceResponse,
      AxiosResponse<AddPrescriptionAndPriceResponse>,
      FormData
    >({
      url: URLS.DIAGNOSIS.ADD_PRESCRIPTION_AND_PRICE,
      method: "POST",
      data: fileUploadData,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  delete: async (payload: DeletePrescriptionAndPricePayload) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: URLS.DIAGNOSIS.DELETE,
      method: "DELETE",
      data: payload,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  finalSave: async (payload: FinalSavePayLoad) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } = await axios.request({
      url: URLS.DIAGNOSIS.FINAL_SAVE,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${accessToken}`,
      },
    });

    return data;
  },

  requestPrivateDiagnosis: async (payload: RequestPrivateDiagnosisPayload) => {
    const session = await getSession();

    const { data } = await axios.request<
      PrivateDiagnosisImmediatelyResponse,
      AxiosResponse<PrivateDiagnosisImmediatelyResponse>,
      RequestPrivateDiagnosisPayload
    >({
      url: URLS.DIAGNOSIS.PRIVATE,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${session?.accessToken || ""}`,
      },
    });

    return data;
  },

  updatePrivateReservation: async (
    id: number,
    payload: RequestPrivateDiagnosisReservationUpdatePayload
  ) => {
    const session = await getSession();

    const { data } = await axios.request<
      BooleanResponse,
      AxiosResponse<BooleanResponse>,
      RequestPrivateDiagnosisReservationUpdatePayload
    >({
      url: URLS.DIAGNOSIS.PRIVATE_RESERVATION(id),
      method: "PUT",
      data: payload,
      headers: {
        Authorization: `jwt ${session?.accessToken || ""}`,
      },
    });

    return data;
  },
  getPrivateDiagnosisList: async ({
    order,
    search,
    page = 1,
    status,
  }: {
    order?: "past";
    search?: string;
    page?: number;
    status?: PrivateReservationStatusType;
  }) => {
    const session = await getSession();
    const accessToken = session?.accessToken;

    const { data } =
      await axios.request<PrivateDiagnosisReservationListResponse>({
        url: `${URLS.DIAGNOSIS.PRIVATE}${order ? `?order=${order}` : ""}${
          search ? `&search=${search}` : ""
        }${page ? `&page=${page}` : ""}${status ? `&status=${status}` : ""}`,
        method: "GET",
        headers: {
          Authorization: `jwt ${accessToken || ""}`,
        },
      });

    return data;
  },

  getPrivateTreatmentList: async () => {
    const session = await getSession();

    const { data } = await axios.request<PrivateDiagnosisTreatmentListResponse>(
      {
        url: URLS.DIAGNOSIS.PRIVATE_TREATMENT_LIST,
        method: "GET",
        headers: {
          Authorization: `jwt ${session?.accessToken || ""}`,
        },
      }
    );

    return data.data;
  },
  getNoticeList: async () => {
    const session = await getSession();

    const { data } = await axios.request<DiagnosisNoticeListResponse>({
      url: URLS.DIAGNOSIS.NOTICE,
      method: "GET",
      headers: {
        Authorization: `jwt ${session?.accessToken || ""}`,
      },
    });

    return data;
  },
  getNoticeListMain: async () => {
    const session = await getSession();

    const { data } = await axios.request<DiagnosisNoticeListResponse>({
      url: URLS.DIAGNOSIS.NOTICE_MAIN,
      method: "GET",
      headers: {
        Authorization: `jwt ${session?.accessToken || ""}`,
      },
    });

    return data;
  },
  getPrivateReservationTimeList: async (date: DateStringKebab) => {
    const session = await getSession();

    const { data } =
      await axios.request<PrivateDiagnosisReservationTimeListResponse>({
        url: URLS.DIAGNOSIS.PRIVATE_RESERVATION_TIME_LIST(date),
        method: "GET",
        headers: {
          Authorization: `jwt ${session?.accessToken || ""}`,
        },
      });

    return data;
  },
  getPrivateReservationDetail: async (id: number) => {
    const session = await getSession();

    const { data } =
      await axios.request<PrivateDiagnosisReservationDetailResponse>({
        url: URLS.DIAGNOSIS.PRIVATE_RESERVATION(id),
        method: "GET",
        headers: {
          Authorization: `jwt ${session?.accessToken || ""}`,
        },
      });

    return data;
  },
};

export const usePrivateTreatmentList = () =>
  useSWR(
    URLS.DIAGNOSIS.PRIVATE_TREATMENT_LIST,
    diagnosis.getPrivateTreatmentList,
    {
      refreshInterval: 1000 * 60 * 60,
    }
  );
