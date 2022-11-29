import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
    DoctorInfoResponse,
    DoctorSignUpResponse,
    Counselor,
    CounselorPayload
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

    update: async (id: number | undefined, payload: CounselorPayload) => {
        const sessions = await getSession();
        const { data } = await axios.request<
            DoctorInfoResponse,
            AxiosResponse<DoctorInfoResponse>
        >({
            url: URLS.COUNSELOR.UPDATE(id),
            method: "PATCH",
            data: payload,
            headers: {
                Authorization: `jwt ${sessions?.accessToken}`,
            },
        });

        return data;
    },
}