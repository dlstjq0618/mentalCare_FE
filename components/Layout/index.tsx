import { Layout } from "antd";
import { rem } from "polished";
import { FC, useEffect } from "react";
import { GlobalFooter } from "./GlobalFooter";
import Header from "./Header";
import SideBar from "./SideBar";
import { GlobalMaxWidthWrapper } from "~/components";
import { styled } from "~/stitches.config";

export const MainLayout = styled("div", {
  width: "100%",
  backgroundColor: "$gray08",
  margin: "0 auto",
  padding: `${rem(19)} ${rem(25)} ${rem(19)} ${rem(15)}`,
  "@bp1": {
    padding: `${rem(19)} ${rem(40)} ${rem(19)} ${rem(25)}`,
  },
  ".ant-layout": {
    backgroundColor: "$gray08",
  },
  "main.ant-layout-content": {
    paddingLeft: rem(25),
    "@bp1": {
      paddingLeft: rem(40),
    },
  },
});

const { Content } = Layout;
const LayoutComponent: FC = ({ children }) => {

  return (
    <GlobalMaxWidthWrapper>
      <MainLayout>
        <Layout hasSider>
          <SideBar />
          <Layout>
            <Header notificationsNo={0} />
            <Content id="content">{children}</Content>
          </Layout>
        </Layout>
      </MainLayout>
      <GlobalFooter />
    </GlobalMaxWidthWrapper>
  );
};

export default LayoutComponent;
