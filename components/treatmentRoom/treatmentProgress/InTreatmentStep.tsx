import Link from "next/link";
import { rem } from "polished";
import { Div, P, RoundedButton } from "~/components";
import { Article } from "~/components/Elements";

export const OnGoingStep: React.FC<{
  endCallHandler: () => void;
}> = ({ endCallHandler }) => {
  return (
    <Article
      css={{
        flexDirection: "column",
        alignItems: "center",
        paddingBlockEnd: rem(15),
      }}
    >
      <P
        css={{
          fontSize: rem(17),
          textAlign: "center",
          marginBlock: `${rem(28)} ${rem(38)}`,
          strong: {
            fontWeight: "normal",
            color: "$primary",
          },
        }}
      >
        진료를 종료하셨다면 <strong>처방전</strong> 및 <strong>진료비</strong>를
        등록해주세요.
      </P>
      <Div
        css={{
          display: "flex",
          justifyContent: "center",
          gap: rem(15),
        }}
      >
        <Link href="/diagnosis" passHref>
          <RoundedButton
            color="black"
            css={{
              flex: 1,
              height: rem(50),
              maxWidth: rem(350),
              paddingInline: rem(10),
            }}
          >
            대기실로 이동
          </RoundedButton>
        </Link>
        <RoundedButton
          color="orange"
          css={{
            flex: 1,
            height: rem(50),
            maxWidth: rem(350),
            paddingInline: rem(10),
          }}
          onClick={endCallHandler}
        >
          처방전&진료비 등록
        </RoundedButton>
      </Div>
    </Article>
  );
};
