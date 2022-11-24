import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
const Home: NextPage = (props) => {

  return (
    <Head>
      <title>우주상담소</title>
      <meta name="description" content="우주상담소" />
      {/* TODO: add favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);
  if (session?.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/calendar",
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/auth/login",
    },
  };
}
