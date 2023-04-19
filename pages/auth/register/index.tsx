import { useRouter } from "next/router";
import { rem } from "polished";
import { FC, FormEventHandler, ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from 'next/image';
import styled, { css } from "styled-components";
import {
  Input,
  RegisterPageHeading,
  RegisterForm,
  GlobalMaxWidthWrapper1,
  TermsForm,
  DoctorInfoForm,
  RocketDoctorLogo,
  Div,
  BankAccountInfoForm,
} from "~/components";
import { PageTitle } from "~/components/PageTitle";
import { registerFormSchema2 } from "~/utils/form.utils";
import { api } from "~/woozooapi";
import { useSelector } from "react-redux";
import counselorLogo from '../../../public/counser.png'

const isDev = process.env.NODE_ENV !== "production";

const StyledInput = styled.div`
  height: 23px;
  padding: 3px 4px 0;
  border-radius: 18px;
  border: solid 2px #e73e11;
  letter-spacing: -0.4px;
  background-color: #e8440a;
  margin-top: 30px;
  margin-left: -12px;
    width: 60px;
    text-align: center;
    
  color: #fff;
    line-height: 1.4;
    z-index: 20;
`;

export const RegisterPageLayout: FC = ({ children }) => {
  const formMethods = useForm({
    mode: "onChange",
    resolver: yupResolver(registerFormSchema2),
    defaultValues: {
      termsChecked: "false",
    },
  });

  const router = useRouter();
  const onSubmit = (data: any) => { // vi signUp Api request
    api.counselor
      .signUp({
        email: data.email,
        password: data.password,
        mobile: data.mobile.split("-").join(""),
        username: data.username,
        certificate_image: data.certificate_image,
        bank_name: data.bankName,
        account_holder: data.accountHolder,
        account_holder_birthdate: data.accountHolderBirthdate,
        account_number: data.accountNumber
      })
      .then((e: any) => {
        router.push("/auth/register/complete");
      })
      .catch((error: {
        response: {
          data: {
            detail: string; password: string;
          };
        };
      }) => {
        if (error.response.data.password) {
          return alert("비밀번호 8자리 이상 입력 하세요.")
        }
        if (error.response.data.detail) {
          return alert(error.response.data.detail)
        }
      });
  };

  const onError = (e: any) => {
    console.log("onError", e);
    if (e.phone) {
      return alert("휴대폰 번호를 확인해주세요.")
    }
    // if (e.doctorLicense) {
    //   return alert(e.doctorLicense.message)
    // }
    // if (e.profilePic) {
    //   return alert(e.profilePic.message)
    // }
    // if (e.accountHolder) {
    //   return alert(e.accountHolder.message)
    // }
    // if (e.hospitalRegister) {
    //   return alert(e.hospitalRegister.message)
    // }
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    formMethods.handleSubmit(onSubmit, onError)(e);
  };

  return (
    <>
      <PageTitle>회원가입</PageTitle>
      <GlobalMaxWidthWrapper1
        page="register"
        css={{
          paddingTop: "4rem",
          paddingBottom: rem(60),
          backgroundColor: "$white",
        }}
      >
        <Div css={{ fontSize: rem(44), display: 'flex' }}>
          <div style={{ zIndex: 30 }}>
            <Image src={counselorLogo} width={114} height={45.6} />
          </div>
          <StyledInput style={{ fontSize: 10 }}>마음상담</StyledInput>
        </Div>
        <RegisterPageHeading style={{ display: "flex", justifyContent: "space-between" }}>
          <div>회원가입</div>
          <div style={{ fontSize: rem(14), alignItems: "center", display: "flex", fontWeight: "normal" }}>
            <span style={{ color: "#eb541e" }}>
              *
            </span>
            필수입력사항
          </div>
        </RegisterPageHeading>
        <FormProvider {...formMethods}>
          <RegisterForm onSubmit={handleSubmit}>
            <DoctorInfoForm />
            <BankAccountInfoForm />
            <TermsForm />
            <Input
              css={{ marginBottom: rem(50), marginTop: rem(20), cursor: "pointer" }}
              type="submit"
              value="회원가입"
              usage="registerPage"
            />
          </RegisterForm>
          {children}
        </FormProvider>
        {isDev ? <DevTool control={formMethods.control} /> : null}
      </GlobalMaxWidthWrapper1>
    </>
  );
};

export default function RegisterPage() {
  return null;
}

RegisterPage.getLayout = function getLayout(page: ReactNode) {
  return <RegisterPageLayout>{page}</RegisterPageLayout>;
};
