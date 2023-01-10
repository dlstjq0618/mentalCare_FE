import Link from "next/link";
import { rem } from "polished";
import { Div, P } from "../Elements";
import { RocketDoctorLogo } from "../icons";
import { BI, Image } from "~/components";
import { styled } from "~/stitches.config";
import counselorLogo from '../../public/counser.png';

const BISectionWrapper = styled("aside", {
  flex: "auto",
  flexBasis: "230px",
  maxWidth: rem(350),
  color: "$white",
  padding: `78px 0 0 ${rem(30)}`,
  backgroundColor: "transparent",
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
        <div style={{ display: 'flex' }}>
          <Image src={counselorLogo} width={100} height={50} />
          <StyledInput style={{ fontSize: 10 }}>마음상담</StyledInput>
        </div>
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
