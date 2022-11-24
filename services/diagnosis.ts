import camelcaseKeys from "camelcase-keys";
import { getSession } from "next-auth/react";
import qs from "qs";
import snakecaseKeys from "snakecase-keys";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DiagnosisListResponse } from "~/interfaces";
import {
  AddPrescriptionAndPriceResponse,
  DeletePrescriptionAndPricePayload,
  DiagnosisCancelHistoryByHospitalUserIdResponse,
  DiagnosisCancelReasonByDiagnosisResultIdResponse,
  DiagnosisDetailResponse,
  DiagnosisStatus,
  FinalSavePayLoad,
} from "~/interfaces";
import { HOST, URLS } from "~/woozooapi/urls";

type DiagnosisListQueryParams = {
  order?: "past";
  page?: number;
  search?: string;
  term?: string;
  status?: DiagnosisStatus;
  now?: "False";
  station?: "True";
};

export const diagnosisApi = createApi({
  reducerPath: "diagnosisApi",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders: async (headers) => {
      const sessions = await getSession();
      if (sessions) {
        headers.set("Authorization", `jwt ${sessions.accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDiagnosisList: builder.query<
      DiagnosisListResponse,
      DiagnosisListQueryParams | void
    >({
      query: (params = {}) =>
        URLS.DIAGNOSIS.GET_LIST + `${params ? "?" + qs.stringify(params) : ""}`,
      transformResponse: (response) => {
        return camelcaseKeys(response as DiagnosisListResponse, { deep: true });
      },
    }),
    getDiagnosisDetail: builder.query<DiagnosisDetailResponse, number>({
      query: (id) => URLS.DIAGNOSIS.GET_DIAGNOSIS_DETAIL(id),
      transformResponse: (response) => {
        return camelcaseKeys(response as DiagnosisDetailResponse, {
          deep: true,
        });
      },
    }),
    addPrescriptionAndPrice: builder.mutation<
      AddPrescriptionAndPriceResponse,
      FormData
    >({
      query: (payload) => ({
        url: URLS.DIAGNOSIS.ADD_PRESCRIPTION_AND_PRICE,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => {
        return camelcaseKeys(response as AddPrescriptionAndPriceResponse, {
          deep: true,
        });
      },
    }),
    deletePrescriptionAndPrice: builder.mutation<
      AddPrescriptionAndPriceResponse,
      DeletePrescriptionAndPricePayload
    >({
      query: ({ ...payload }) => ({
        url: URLS.DIAGNOSIS.DELETE,
        method: "DELETE",
        body: snakecaseKeys(payload),
      }),
      transformResponse: (response) => {
        return camelcaseKeys(response as AddPrescriptionAndPriceResponse, {
          deep: true,
        });
      },
    }),
    finalSave: builder.mutation<any, FinalSavePayLoad>({
      query: ({ ...payload }) => ({
        url: URLS.DIAGNOSIS.FINAL_SAVE,
        method: "POST",
        body: snakecaseKeys(payload),
      }),
      transformResponse: (response) => {
        return camelcaseKeys(response as any, {
          deep: true,
        });
      },
    }),
    getCancelHistory: builder.query<
      DiagnosisCancelHistoryByHospitalUserIdResponse,
      number | void
    >({
      query: (hospitalUserId) =>
        URLS.DIAGNOSIS.CANCEL_HISTORY +
        `?hospital_user_id=${String(hospitalUserId)}`,
      transformResponse: (response) => {
        return camelcaseKeys(
          response as DiagnosisCancelHistoryByHospitalUserIdResponse,
          {
            deep: true,
          }
        );
      },
    }),
    getCancelReason: builder.query<
      DiagnosisCancelReasonByDiagnosisResultIdResponse,
      number | void
    >({
      query: (diagnosisResultId) =>
        URLS.DIAGNOSIS.CANCEL_HISTORY +
        `?diagnosis_result_id=${String(diagnosisResultId)}`,
      transformResponse: (response) => {
        return camelcaseKeys(
          response as DiagnosisCancelReasonByDiagnosisResultIdResponse,
          {
            deep: true,
          }
        );
      },
    }),
  }),
});

export const {
  useGetDiagnosisListQuery,
  useGetDiagnosisDetailQuery,
  useAddPrescriptionAndPriceMutation,
  useDeletePrescriptionAndPriceMutation,
  useFinalSaveMutation,
  useGetCancelHistoryQuery,
  useGetCancelReasonQuery,
} = diagnosisApi;
export const useGetDiagnosisListQueryState = (
  params?: DiagnosisListQueryParams
) => diagnosisApi.endpoints.getDiagnosisList.useQueryState(params ?? {});
