import { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";
import { axios } from "./baseAxiosInstance";
import { URLS } from "./urls";
import {
  DanalPhoneCertificationResult,
  GenerateTokenRequestPayload,
  GenerateTokenResponse,
  PhoneNumberCertificationResult,
  RefreshTokenRequestPayload,
  RefreshTokenResponse,
  DanalCertifiedUserDataResult,
  VerifyTokenRequestPayload,
  VerifyTokenResponse,
} from "~/interfaces";

export const auth = {
  signIn: async (
    payload: GenerateTokenRequestPayload
  ): Promise<GenerateTokenResponse> => {
    const { data } = await axios.request<
      GenerateTokenResponse,
      AxiosResponse<GenerateTokenResponse>,
      GenerateTokenRequestPayload
    >({
      url: URLS.AUTH.SIGN_IN,
      method: "POST",
      data: payload,
    });
    return data;
  },
  verifyToken: async (payload: VerifyTokenRequestPayload) => {
    const { data } = await axios.request<
      VerifyTokenResponse,
      AxiosResponse<VerifyTokenResponse>,
      VerifyTokenRequestPayload
    >({
      url: URLS.AUTH.VERIFY_TOKEN,
      method: "POST",
      data: payload,
    });

    if (data.detail) {
      return false;
    }

    return data.token;
  },
  refreshToken: async (payload: RefreshTokenRequestPayload) => {
    const session = await getSession();
    const { data } = await axios.request<
      RefreshTokenResponse,
      AxiosResponse<RefreshTokenResponse>,
      RefreshTokenRequestPayload
    >({
      url: URLS.AUTH.REFRESH_TOKEN,
      method: "POST",
      data: payload,
      headers: {
        Authorization: `jwt ${session?.accessToken}`,
      },
    });

    if (!data.token) {
      return false;
    }

    return data.token;
  },
  certificatePhoneNumber: (
    handleResult: (arg0: PhoneNumberCertificationResult) => void
  ) => {
    const windowAny: any = window;
    if (!windowAny) return;
    if (!windowAny.IMP) return;

    const IMP = windowAny.IMP;

    IMP.init(process.env.NEXT_PUBLIC_IMP_INIT);

    IMP.certification(
      {
        merchant_uid: "merchant_" + new Date().getTime(),
        company: process.env.NEXTAUTH_URL,
      },
      (certificationResult: DanalPhoneCertificationResult) => {
        const { imp_uid, success } = certificationResult;

        if (success) {
          axios
            .request<DanalCertifiedUserDataResult>({
              method: "POST",
              url: URLS.AUTH.CERTIFICATE_PHONE_NUMBER,
              data: {
                imp_uid,
              },
            })
            .then((userDataResult) => {
              handleResult({
                ...userDataResult.data,
                ...certificationResult,
              });
            });
        } else {
          handleResult(certificationResult);
        }
      }
    );
  },
};
