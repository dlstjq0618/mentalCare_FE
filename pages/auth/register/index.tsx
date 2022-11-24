import { useRouter } from "next/router";
import { rem } from "polished";
import { FC, FormEventHandler, ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { registerFormSchema } from "~/utils/form.utils";
import { api } from "~/woozooapi";

const isDev = process.env.NODE_ENV !== "production";

export const RegisterPageLayout: FC = ({ children }) => {
  const formMethods = useForm({
    mode: "onChange",
    resolver: yupResolver(registerFormSchema),
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
        mobile: data.mobile,
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
      .catch((error: { response: { data: { password: any; }; }; }) => {
        if (error.response.data.password) {
          return alert("비밀번호 8자리 이상 입력 하세요.")
        }
      });
  };

  const onError = (e: any) => {
    console.log("onEorror");
    // if (e.phone) {
    //   return alert("휴대폰 번호를 확인해주세요.")
    // }
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
        <Div css={{ fontSize: rem(44) }}>
          <RocketDoctorLogo />
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
              css={{ marginTop: rem(20), cursor: "pointer" }}
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
