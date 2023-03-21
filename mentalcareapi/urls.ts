import { DateStringKebab } from "~/interfaces";

export const HOST =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://bo.api.woozoo.clinic" // TODO: production api base url
    : "https://bo.dev.api.woozoo.clinic";

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
    BOARD: "/counselor-board/post",
    BOARD_PUT: "/counselor-board/post",
    COMMENT: `/counselor-board/post/comment`,
    CHAT: `/counseling/chat`,
    LIST: `/counselor-board/post/all`,
    LISTS: (id: number) => `/counselor-board/post/${id}`,
    DETAIL: (id: number) => `/counselor-board/post/detail/${id}`,
  },
};
