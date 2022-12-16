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
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import "~/styles/globals.css";
import { store } from "~/store";
import { firebaseApp, RECAPTCHA_ENTERPRISE_SITE_KEY } from "~/utils/firebase";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ContextWrapper from '../context/ContextWrapper'
import { io } from "socket.io-client";
import _footer from "./_footer";

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
  const [isChatting, setIsChatting] = useState<any>([]);
  let chatting;

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


  /*
  1. 로그인하면
  2. 소캣을 연결하는데
  3. 응답해야할것들을 받아야 한다.
  4. 응답해야할것들은 couselor_noti 이벤트로 받는다.
  */


  useEffect(() => {
    const userId = window?.localStorage?.getItem("userId");
    console.log("🚀 ~ file: _app.tsx:65 ~ useEffect ~ userId", userId)
    // 로그인 비로그인 체크 해야함
    const base64EncodedText = Buffer.from(userId + "_doraemon01", "utf8").toString('base64');
    const base64DecodedText = Buffer.from(base64EncodedText, 'base64').toString('utf8');
    console.log("🚀 ~ file: _app.tsx:67 ~ useEffect ~ base64DecodedText", base64DecodedText)
    // const socket = io("http://bo.local.api.woozoo.clinic", {
    const socket = io("https://bo.dev.api.woozoo.clinic", {
      // transports: ["websocket"],
      transports: ["polling"],
      extraHeaders: {
        "identity": "counselor",
        "x-auth-token": base64EncodedText,
      }
    });
    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });
    socket.emit("counsel_noti", '여기는 우주상담사 웹에서 보내고 있다!');
    socket.on("counsel_noti", (res: any) => {

      chatting = [...isChatting, res]
      console.log("chatting", chatting);
      console.log("받은 내용!", res);
      <_footer chat={chatting} />
      // console.log('받은 내용!', res + `${userNumber}`);

      switch (res.method) {
        case 'new-1': res.data.a; // 들어온값을 어딘가 보여주면됨
      }
      // 먼가 왓는데 그게 상담을 받는거야
      // 상담사에게 상담예약을 하라고 서버가 알려준거야.
    });
    // 이곳은 상담요청이 들어 왓을때 데이터가 들어오는 곳입니다.
    socket.on('advice/request', (res: any) => {
      console.log("advice", res)
    })
    socket.on('ping', (res: any) => {
      console.log("ping", res)
    })

    // socket disconnect on component unmount if exists
    socket.on("disconnect", () => {
      console.log("SOCKET DIE!", socket.id);
    });
    // socket.disconnect(); // 로그아웃시 작동해야함
  }, []);



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
