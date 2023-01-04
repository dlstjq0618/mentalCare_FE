import Link from "next/link";
import { useRouter } from "next/router";
import { rem } from "polished";
import { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Aside,
  AutoLoginToggle,
  Div,
  FormFieldErrorMessage,
  Input,
} from "~/components";
import { styled } from "~/stitches.config";
import { loginFormSchema } from "~/utils/form.utils";
import { signIn } from "~/utils/nextAuth.utils";
import { api } from "~/woozooapi";
import counselorLogo from '../../public/counser.png';
import { Image } from "~/components";

const LoginFormSectionWrapper = styled("article", {
  position: "relative",
  flex: "auto",
  display: "flex",
  flexDirection: "column",
  color: "$gray01",
  padding: `${rem(72)} ${rem(40)} ${rem(90)} ${rem(50)}`,
  h1: {
    fontSize: rem(24),
    fontWeight: "normal",
    marginBottom: rem(56),
  },
  form: {
    fontSize: rem(15),
    display: "flex",
    flexDirection: "column",
    'input[type="email"]': {
      marginBottom: rem(15),
    },
    'input[type="submit"]': {
      marginTop: rem(30),
      marginBottom: rem(70),
      height: rem(60),
      fontSize: rem(15),
      backgroundColor: "$primary",
    },
  },
  aside: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const StyledInput = styled("div", {
  height: "23px",
  borderRadius: "18px",
  border: "solid 2px #e73e11",
  letterSpacing: "-0.4px",
  backgroundColor: "#e8440a",
  marginTop: "30px",
  marginLeft: "-12px",
  width: "60px",
  textAlign: "center",
  color: "#fff",
  lineHeight: 1.4,
  Zindex: 20,
  padding: 3
});


const resolver: Resolver<{ email: string; password: string }> =
  yupResolver(loginFormSchema);

export const LoginFormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    mode: "onChange",
    resolver,
  });
  const [apiErrorMessage, setApiErrorMessage] = useState<string>("");
  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // use next-auth's signIn function to sign in the user
    const signInResult = await signIn({
      uid: email,
      password,
    })
    console.log("signInResult", signInResult);
    if (signInResult?.error) {
      setApiErrorMessage("로그인에 실패했습니다.");
      return;
    }
    setApiErrorMessage("");

    // Redirection rules
    // Case 1. redirect to the page the user was on before logging in if there was one.
    // We can use `signInResult.url` here.
    if (signInResult?.url) {
      router.push(signInResult.url);
    }
    // Temporally redirect to the diagnosis page for the test 22/02/10
    router.push("/calendar");
  };


  return (
    <LoginFormSectionWrapper>
      <h1>로그인</h1>
      {/* <div style={{ display: 'flex', alignSelf: 'center', marginBottom: '38.8px' }}>
        <Image src={counselorLogo} width={100} height={50} />
        <StyledInput style={{ fontSize: 10 }}>마음상담</StyledInput>
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Div
          css={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input
            aria-label="이메일"
            usage="loginPage"
            type="email"
            placeholder="이메일을 입력해 주세요"
            {...register("email", { required: true })}
          />
          <Input
            aria-label="비밀번호"
            usage="loginPage"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register("password", { required: true })}
          />
          <Div css={{ position: "absolute", bottom: rem(-24), left: rem(2) }}>
            {errors.email?.message && (
              <FormFieldErrorMessage>
                {errors.email.message}
              </FormFieldErrorMessage>
            )}
            {apiErrorMessage && (
              <FormFieldErrorMessage>{apiErrorMessage}</FormFieldErrorMessage>
            )}
          </Div>
        </Div>

        <Input usage="loginPage" type="submit" value="로그인" />
        <Aside css={{ a: { color: "$gray05", textDecoration: "underline" } }}>
          <AutoLoginToggle />
          {/* <Link href="/auth/recovery">아이디 비밀번호 찾기</Link> */}
        </Aside>
      </form>
    </LoginFormSectionWrapper>
  );
};
