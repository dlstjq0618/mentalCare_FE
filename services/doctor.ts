import camelcaseKeys from "camelcase-keys";
import { getSession } from "next-auth/react";
import snakecaseKeys from "snakecase-keys";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BooleanResponse,
  DoctorInfoResponse,
  DoctorInfoUpdatePayload,
  DoctorInfoUpdateResponse,
  DoctorSubjectListResponse,
  Openingtime,
  TreatmentItemListResponse,
} from "~/interfaces";
import { HOST, URLS } from "~/woozooapi/urls";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
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
  tagTypes: ["DoctorInfo", "OpeningTimes"],
  endpoints: (builder) => ({
    getDoctorInfo: builder.query<DoctorInfoResponse, void>({
      query: () => URLS.DOCTOR.INFO,
      transformResponse: (response) => {
        return camelcaseKeys(response as DoctorInfoResponse, { deep: true });
      },
      providesTags: ["DoctorInfo"],
    }),
    updateDoctorInfo: builder.mutation<
      DoctorInfoUpdateResponse,
      Partial<DoctorInfoUpdatePayload>
    >({
      query: ({ ...payload }) => ({
        url: URLS.DOCTOR.INFO,
        method: "PUT",
        body: snakecaseKeys(payload),
      }),
      transformResponse: (response: DoctorInfoUpdateResponse) => {
        return camelcaseKeys(response, {
          deep: true,
        });
      },
      invalidatesTags: ["DoctorInfo"],
    }),
    getSpecialList: builder.query<DoctorSubjectListResponse, void>({
      query: () => URLS.DOCTOR.TREATMENT_SUBJECT_LIST,
      transformResponse: (response) => {
        return camelcaseKeys(response as DoctorSubjectListResponse, {
          deep: true,
        });
      },
    }),
    getReimbursementList: builder.query<TreatmentItemListResponse, void>({
      query: () => URLS.DOCTOR.REIMBURSEMENT_ITEMS_LIST,
      transformResponse: (response) => {
        return camelcaseKeys(response as TreatmentItemListResponse, {
          deep: true,
        });
      },
    }),
    getNoReimbursementList: builder.query<TreatmentItemListResponse, void>({
      query: () => URLS.DOCTOR.NO_REIMBURSEMENT_ITEMS_LIST,
      transformResponse: (response) => {
        return camelcaseKeys(response as TreatmentItemListResponse, {
          deep: true,
        });
      },
    }),
    getOpeningTimes: builder.query<
      { total: number; data: Openingtime[] },
      void
    >({
      query: () => URLS.HOSPITAL.OPENING_TIME,
      transformResponse: (response: { total: number; data: Openingtime[] }) => {
        return camelcaseKeys(response, {
          deep: true,
        });
      },
      providesTags: ["OpeningTimes"],
    }),
    createOpeningTimes: builder.mutation<
      BooleanResponse,
      { openingTimes: Partial<Openingtime>[] }
    >({
      query: ({ ...payload }) => ({
        url: URLS.HOSPITAL.OPENING_TIME,
        method: "POST",
        body: snakecaseKeys(payload),
      }),
      transformResponse: (response: BooleanResponse) => {
        return camelcaseKeys(response, {
          deep: true,
        });
      },
      invalidatesTags: ["OpeningTimes"],
    }),
    updateOpeningTimes: builder.mutation<
      BooleanResponse,
      { openingTimes: Partial<Openingtime>[] }
    >({
      query: ({ ...payload }) => ({
        url: URLS.HOSPITAL.OPENING_TIME,
        method: "PUT",
        body: snakecaseKeys(payload),
      }),
      transformResponse: (response: BooleanResponse) => {
        return camelcaseKeys(response, {
          deep: true,
        });
      },
      invalidatesTags: ["OpeningTimes"],
    }),
  }),
});

export const {
  useGetDoctorInfoQuery,
  useUpdateDoctorInfoMutation,
  useGetSpecialListQuery,
  useGetReimbursementListQuery,
  useGetNoReimbursementListQuery,
  useGetOpeningTimesQuery,
  useUpdateOpeningTimesMutation,
  useCreateOpeningTimesMutation,
} = doctorApi;

export const useGetDoctorInfoQueryState =
  doctorApi.endpoints.getDoctorInfo.useQueryState;
