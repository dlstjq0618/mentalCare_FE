import React, { useState } from "react"
import $ from "jquery";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
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
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ContextWrapper from '../context/ContextWrapper'
import _footer from "./_footer";
import 'react-quill/dist/quill.snow.css';

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

  return (
    <>
      <ReactNotifications />
      <ReduxProvider store={store}>
        <ContextWrapper >
          <SessionProvider session={session}>
            <Head>
              <title>우주약방 마음상담</title>
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
