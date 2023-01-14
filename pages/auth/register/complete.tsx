import { rem } from "polished";
import {
  Address,
  Article,
  GlobalMaxWidthWrapper,
  Main,
  P,
  RegisterPageHeading,
  RoundedButton,
} from "~/components";

const RegisterCompleteIcon = () => (
  <svg
    width="70"
    height="80"
    viewBox="0 0 70 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#a)">
      <circle cx="35" cy="37" r="35" fill="#EB541E" />
    </g>
    <path
      d="M22.99 36.872a1.5 1.5 0 1 0-2.23 2.006l2.23-2.006zm6.76 9.753-1.115 1.003a1.5 1.5 0 0 0 2.2.033l-1.085-1.036zm19.46-18.214a1.5 1.5 0 1 0-2.17-2.072l2.17 2.072zM20.76 38.878l7.875 8.75 2.23-2.006-7.875-8.75-2.23 2.006zm10.075 8.783L49.21 28.41l-2.17-2.072-18.375 19.25 2.17 2.072z"
      fill="#fff"
    />
    <defs>
      <filter
        id="a"
        x="-3"
        y="2"
        width="76"
        height="76"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0.2 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_807_3215"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_807_3215"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default function RegisterCompletedPage() {
  return (
    <GlobalMaxWidthWrapper
      page="register"
      css={{
        backgroundColor: "$white",
      }}
    >
      <Main
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <RegisterPageHeading>회원가입</RegisterPageHeading>
        <Article
          css={{
            display: "flex",
            flexDirection: "column",
            padding: `${rem(86)} ${rem(76)}`,
          }}
        >
          <RegisterCompleteIcon />
          <P
            css={{
              fontSize: rem(26),
              fontWeight: "bold",
              paddingTop: rem(40),
              paddingBottom: rem(15),
            }}
          >
            감사합니다!
          </P>
          <P
            css={{
              fontSize: rem(22),
              paddingBottom: rem(15),
            }}
          >
            회원 가입 신청이 완료되었습니다.
          </P>
          <P css={{ fontSize: rem(17), color: "$gray04" }}>
            가입 승인이 완료되면 빠르게 알려드릴게요.
          </P>
          <Address
            css={{
              fontSize: rem(17),
              color: "$primary",
              paddingTop: rem(42),
              paddingBottom: rem(60),
            }}
          >
            문의
            <br />
            <a href="tel:+8225227706">02-522-7706</a>
            <br />
            <a href="mailto:cs@correctionvitale.com">cs@correctionvitale.com</a>
          </Address>
          <RoundedButton
            color="orange"
            css={{ fontSize: rem(15), height: rem(50) }}
            onClick={() => {
              window.location.href = "https://dev.mentalcare.rocketdoctor.co.kr/auth/login";
            }}
          >
            상담실 둘러보기
          </RoundedButton>
        </Article>
      </Main>
    </GlobalMaxWidthWrapper>
  );
}
