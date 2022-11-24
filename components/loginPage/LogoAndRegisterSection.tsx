import Link from "next/link";
import { rem } from "polished";
import { Div, P } from "../Elements";
import { RocketDoctorLogo } from "../icons";
import { BI, Image } from "~/components";
import { styled } from "~/stitches.config";

const BISectionWrapper = styled("aside", {
  flex: "auto",
  flexBasis: "230px",
  maxWidth: rem(350),
  color: "$white",
  padding: `78px 0 0 ${rem(30)}`,
  backgroundColor: "transparent",
});

const MAIN_COPY = `가장 빠른
나만의 주치의

미래에 꿈꾸던
차원이 다른 진료`;

export const LogoAndRegisterSection = () => {
  return (
    <BISectionWrapper css={{ position: "relative", fontSize: rem(20) }}>
      <Div
        css={{
          position: "absolute",
          zIndex: 2,
          fontSize: rem(48),
          a: {
            fontSize: rem(14),
            color: "$primary",
            textDecoration: "underline",
          },
        }}
      >
        <RocketDoctorLogo />
        <P
          css={{
            fontSize: rem(20),
            wordBreak: "keep-all",
            whiteSpace: "pre-line",
            paddingTop: rem(50),
            paddingBottom: rem(70),
          }}
        >
          {MAIN_COPY}
        </P>
        <Link href="/auth/register">회원가입</Link>
      </Div>
      <Image priority src="/bg_login.png" alt="우주" layout="fill" />
    </BISectionWrapper>
  );
};
