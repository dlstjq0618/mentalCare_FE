import React, { useState, useEffect } from "react";
import {
  LoginPageWrapper,
  LoginPageMain,
  LogoAndRegisterSection,
  LoginFormSection,
} from "~/components";
import { PageTitle } from "~/components/PageTitle";

const LoginPage = () => {
  return (
    <>
      <PageTitle>로그인</PageTitle>
      <LoginPageWrapper>
        <LoginPageMain>
          {/* <LogoAndRegisterSection /> */}
          <LoginFormSection />
        </LoginPageMain>
      </LoginPageWrapper>
    </>
  );
};

export default LoginPage;
