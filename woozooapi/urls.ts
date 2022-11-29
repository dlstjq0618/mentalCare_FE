import { DateStringKebab } from "~/interfaces";

export const HOST =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
    ? "https://dev.server.woozoo.clinic/" // TODO: production api base url
    : // : "https://devserver.woozoo.clinic";
      "https://dev.server.woozoo.clinic/";
// "https://stag.server.woozoo.clinic/"; // Staging Server

console.log({ HOST });

export const URLS = {
  SITE: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    SETTINGS: "/settings",
    DIAGNOSIS: "/diagnosis",
    PRIVATE_IMMEDIATE: "/private",
    PRIVATE_RESERVATION: "/private/reservation",
  },
  TERMS: {
    PRIVACY: `/terms/privacy`,
    SERVICE: `/terms/service`,
  },
  FILE_UPLOAD: `/api/base/file/upload`,
  AUTH: {
    SIGN_IN: `/api/user/v1/counselor/signin`,
    VERIFY_TOKEN: `/api/authentication/verify`,
    REFRESH_TOKEN: `/api/authentication/refresh`,
    CERTIFICATE_PHONE_NUMBER: "/certification/danal",
  },
  DOCTOR: {
    SIGN_UP: "/api/user/doctor",
    SIGN_UP_V2: "/api/user/v2/doctor/",
    INFO: `/api/user/doctor/info?lang_type=ko`,
    TREATMENT_SUBJECT_LIST: "/api/service/treatment/subject",
    REIMBURSEMENT_ITEMS_LIST: "/api/service/treatment/item",
    NO_REIMBURSEMENT_ITEMS_LIST:
      "/api/service/treatment/item?is_reimbursement=False",

    ACTIVATE: (id: number) => `api/user/v1/doctor/activate/${id}`,
    PUBLIC_STATE: `/api/hospital/v1/operate/check`,
  },
  HOSPITAL: {
    OPENING_TIME: "/api/service/openingtime",
    OPENING_TIME_READ: (uid: string) =>
      `/api/service/openingtime?agency_id=${uid}`,
    TREATMENT_INFO_READ: (uid: string) =>
      `/api/hospital/treatment?profile_id=${uid}`,
    SEARCH_BY_NAME: `/api/hospital/info?lang_type=ko&order_by=id&name=`,
  },
  COUNSELOR: {
    SIGN_UP: "/api/user/v1/counselor",
    INFO: (id: number) => `/api/user/v1/counselor/${id}/info`,
    UPDATE: (id: number | undefined) => `/api/user/v1/counselor/${id}/info`,
  },
  DIAGNOSIS: {
    GET_LIST: `/api/service/diagnosis`,
    GET_DIAGNOSIS_DETAIL: (id: number) =>
      `/api/service/diagnosis/${id}?lang_type=ko`,
    START_CALL: (id: number) => `/api/service/diagnosis/${id}/begin`,
    CANCEL_CALL: (id: number) => `/api/service/diagnosis/${id}/cancel/doctor`,
    CANCEL_HISTORY: `/api/service/diagnosis/cancel/history`,
    TERMINATION: `/api/service/diagnosis/termination`,
    RETRY_CALL: (id: number) => `api/service/diagnosis/${id}/reconnect`,
    ADD_PRESCRIPTION_AND_PRICE: `/api/service/diagnosis/completion`,
    DELETE: `/api/service/diagnosis/completion`,
    FINAL_SAVE: `/api/service/diagnosis/completion/final`,
    PRIVATE: "/api/service/diagnosis/private?lang_type=ko",
    NOTICE: "/api/base/v1/notice?app=6",
    NOTICE_MAIN: "/api/base/v1/notice?app=11",
    PRIVATE_TREATMENT_LIST:
      "/api/service/diagnosis/private/treatment?lang_type=ko",
    PRIVATE_RESERVATION: (id: number) =>
      `/api/service/diagnosis/private/${id}?lang_type=ko`,
    PRIVATE_RESERVATION_UPDATE: (id: number) =>
      `/api/service/diagnosis/private/${id}`,
    PRIVATE_RESERVATION_TIME_LIST: (date: DateStringKebab) =>
      `/api/service/diagnosis/private/time?reserved_date=${date}`,
  },
  SETTLEMENT_ACCOUNT: {
    GET_ACCOUNT_DETAILS: `/api/user/doctor/account`,
    EDIT_ACCOUNT_DETAILS: `/api/user/doctor/account`,
    GET_SETTLEMENT_LIST: `/api/hospital/settlement`,
  },
};
