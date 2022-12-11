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
import { api } from "~/woozooapi"

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

  console.log("login_dev");

  return (
    <LoginFormSectionWrapper>
      <h1>로그인(개발서버)</h1>
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
