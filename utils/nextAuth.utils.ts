import jwtDecode from "jwt-decode";
import { JWT } from "next-auth/jwt";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  SignOutParams,
} from "next-auth/react";
import { diagnosisApi } from "~/services/diagnosis";
import { doctorApi } from "~/services/doctor";
import { store } from "~/store";
import { api } from "~/woozooapi";

export const resetDoctorInfoApiState = () => {
  store.dispatch(doctorApi.util.resetApiState());
};

export const resetDiagnosisInfoApiState = () => {
  store.dispatch(diagnosisApi.util.resetApiState());
};

export const signIn = async ({
  uid,
  password,
  redirect = false,
}: {
  uid: string;
  password: string;
  redirect?: boolean;
}) => {
  // Reset doctor/diagnosis info api state to workaround rtk-query's cache behavior.
  // TODO: Maybe there's a better way to do this.
  resetDoctorInfoApiState();
  resetDiagnosisInfoApiState();
  try {
    const signInApiResult = await api.auth
      .signIn({
        uid,
        password,
      })
      .then((res: any) => {
        if (res.counselorUserId) {
          window.localStorage.setItem("status", JSON.stringify(res.isWorking));
          return window?.localStorage?.setItem(
            "userId",
            JSON.stringify(res.counselorUserId)
          );
        }
      })
      .then((res: any) => {
        if (res.userSessionId) {
          return window?.localStorage?.setItem(
            "session",
            JSON.stringify(res.userSessionId)
          );
        }
      });
    const { token }: any = signInApiResult;
    window?.localStorage?.setItem("accessToken", token);
  } catch (e) {
    console.error(e);
  }

  return nextAuthSignIn<"credentials">("mental-care", {
    uid,
    password,
    redirect,
  });
};

export const signOut = async (options: SignOutParams<boolean> | undefined) => {
  window?.localStorage?.removeItem("accessToken");
  return nextAuthSignOut(options);
};

export const getTokenExpireTime = (token: string) =>
  jwtDecode<{ exp: number }>(token).exp * 1000;

export interface NextAuthToken extends JWT {
  accessToken: string;
  expires: number;
}

export const refreshAccessToken = (token: NextAuthToken) =>
  api.auth
    .refreshToken({
      token: token.accessToken,
    })
    .then((refreshedAccessToken) => {
      window.localStorage.setItem(
        "accessToken",
        refreshedAccessToken || token.accessToken
      );

      return {
        ...token,
        accessToken: refreshedAccessToken,
        expires: getTokenExpireTime(token.accessToken),
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    });
