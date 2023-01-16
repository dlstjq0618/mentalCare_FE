import { DateStringKebab } from "~/interfaces";

export const HOST =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://httpbin.org" // TODO: production api base url
    : "https://httpbin.org";

console.log({ HOST });

export const URLS = {
  COUNSELOR: {
    SIGN_UP: "/api/user/v1/counselor",
    INFO: (id: number) => `/api/user/v1/counselor/${id}/info`,
    UPDATE: (id: number | undefined) => `/api/user/v1/counselor/${id}/info`,
    CALCULATE: (id: number | undefined, year: number) =>
      `/api/psychological/v1/calculate/${id}?diff=${year}`,
    STATUS: "/api/user/v1/counselor/activate",
    STATUS2: "/api/user/v1/counselor/immediately",
    TEST: "/get",
  },
};
