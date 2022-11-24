import Head from "next/head";
import { ReactNode } from "react";

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Head>
      <title>{children} | 우주상담소</title>
    </Head>
  );
};
