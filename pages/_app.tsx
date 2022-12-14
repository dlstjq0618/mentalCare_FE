import React, { useState } from "react"
import $ from "jquery";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { getAuth, signInAnonymously } from "firebase/auth";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { ReactElement, ReactNode, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import "antd/dist/antd.css";
import "~/styles/globals.css";
import { store } from "~/store";
import { firebaseApp, RECAPTCHA_ENTERPRISE_SITE_KEY } from "~/utils/firebase";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ContextWrapper from '../context/ContextWrapper'
import { io } from "socket.io-client";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    console.log("RECAPTCHA_ENTERPRISE_SITE_KEY", RECAPTCHA_ENTERPRISE_SITE_KEY)
    if (process.env.NODE_ENV !== "production") {
      // @ts-ignore
      // For dev/local env, we need to init debug mode
      globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_ENTERPRISE_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });

    // Sign in firestore anonymously
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log("Sign in anonymously success.");
      })
      .catch((error) => {
        console.log("code", error.code);
      });
  }, []);


  useEffect(() => {
    const userId = '888';
    // const socket = io("http://bo.local.api.woozoo.clinic", {

    const socket = io("https://bo.dev.api.woozoo.clinic", {
      // transports: ["websocket"],
      transports: ["polling"],
      extraHeaders: {
        "identity": "counselor",
        "x-auth-token": btoa(userId + "_doraemon01"),
      }
    });
    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });
    socket.emit("counsel_noti", '여기는 우주상담사 웹에서 보내고 있다!');
    socket.on("counsel_noti", (res: any) => {
      console.log('받은 내용!', res);
    });
    // socket disconnect on component unmount if exists
    socket.on("disconnect", () => {
      console.log("SOCKET DIE!", socket.id);
    });
  }, [])

  return (
    <>
      <ReactNotifications />
      <ReduxProvider store={store}>
        <ContextWrapper >
          <SessionProvider session={session}>
            <Head>
              <title>우주상담소</title>
              <meta name="description" content="로켓닥터" />
              <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Script
              type="text/javascript"
              id="daum-map-api"
              src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a4f5384da54ac94fefe3367966943a3d&libraries=services&autoload=false"
            />
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </ContextWrapper>
      </ReduxProvider>
    </>
  );
}
