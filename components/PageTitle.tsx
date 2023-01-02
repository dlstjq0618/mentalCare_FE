import Head from "next/head";
import { ReactNode } from "react";

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Head>
      <title>{children} | 우주약방 마음상담</title>
    </Head>
  );
};
