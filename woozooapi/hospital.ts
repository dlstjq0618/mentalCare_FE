import { AxiosResponse } from "axios";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  HospitalOpeningTimeListResponse,
  HospitalOpeningTimeMutationPayload,
  HospitalOpeningTimeMutationResponse,
  HospitalSearchResponse,
  TutorialOpeningTimes,
} from "~/interfaces";

export const hospital = {
  openningTime: {
    create: async (data: TutorialOpeningTimes) => {
      const res = await axios.request<
        HospitalOpeningTimeMutationResponse,
        AxiosResponse<HospitalOpeningTimeMutationResponse>,
        TutorialOpeningTimes
      >({
        url: URLS.HOSPITAL.OPENING_TIME,
        method: "POST",
        data,
      });

      return res.data;
    },
    update: async (data: HospitalOpeningTimeMutationPayload) => {
      const res = await axios.request<
        HospitalOpeningTimeMutationResponse,
        AxiosResponse<HospitalOpeningTimeMutationResponse>,
        HospitalOpeningTimeMutationPayload
      >({
        url: URLS.HOSPITAL.OPENING_TIME,
        method: "PUT",
        data,
      });

      return res.data;
    },
    list: async (agencyId: string) => {
      const res = await axios.request<
        HospitalOpeningTimeListResponse,
        AxiosResponse<HospitalOpeningTimeListResponse>
      >({
        url: URLS.HOSPITAL.OPENING_TIME_READ(agencyId),
        method: "GET",
      });

      return res.data;
    },
  },
  treatmentInfo: async (profileId: string) => {
    const res = await axios.request<
      HospitalOpeningTimeMutationResponse,
      AxiosResponse<HospitalOpeningTimeMutationResponse>
    >({
      url: URLS.HOSPITAL.TREATMENT_INFO_READ(profileId),
      method: "GET",
    });

    return res.data;
  },
  searchByName: async (name: string) => {
    const res = await axios.request<HospitalSearchResponse>({
      url: `${URLS.HOSPITAL.SEARCH_BY_NAME}${name}`,
      method: "GET",
    });

    return res.data;
  },
  searchByNameWithUserId: async (name: string, id: number) => {
    const res = await axios.request<HospitalSearchResponse>({
      url: `${URLS.HOSPITAL.SEARCH_BY_NAME}${name}&hospital_user_id=${id}`,
      method: "GET",
    });

    return res.data;
  },
};
