import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  DoctorInfoResponse,
  DoctorSignUpResponse,
  Counselor,
  TestResponse,
  RestMessageType,
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

  board: async (payload: any) => {
    // const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");
    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.BOARD,
      data: payload,
      method: "POST",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  board_put: async (payload: any) => {
    // const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");
    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.BOARD,
      data: payload,
      method: "PUT",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  comment: async (payload: any) => {
    // const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");
    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.COMMENT,
      data: payload,
      method: "POST",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  chat: async (payload: any) => {
    // const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");
    const { data } = await axios.request<
      RestMessageType,
      AxiosResponse<RestMessageType>
    >({
      url: URLS.COUNSELOR.CHAT,
      data: payload,
      method: "POST",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  delete: async (payload: any) => {
    // const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");
    const { data } = await axios.request<
      RestMessageType,
      AxiosResponse<RestMessageType>
    >({
      url: URLS.COUNSELOR.BOARD,
      method: "DELETE",
      data: payload,
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  detail_List: async (id: any) => {
    // 게시글 상세조회
    const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");

    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.DETAIL(id),
      method: "GET",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  Lists: async (id: any) => {
    // 전체 게시글 리스트 검색용으로 사용
    const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");

    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.LISTS(id),
      method: "GET",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },

  List: async () => {
    // 전체 게시글 리스트 검색용으로 사용
    const sessions = await getSession();
    const userId = window?.localStorage?.getItem("userId");
    const base64EncodedText = Buffer.from(
      userId + "_doraemon01",
      "utf8"
    ).toString("base64");

    const { data } = await axios.request<
      DoctorInfoResponse,
      AxiosResponse<DoctorInfoResponse>
    >({
      url: URLS.COUNSELOR.LIST,
      method: "GET",
      headers: {
        identity: "counselor",
        "x-auth-token": base64EncodedText,
      },
    });
    return data;
  },
};
