import { useRouter } from "next/router";
import { rem } from "polished";
import { VFC } from "react";
import { Div, Header, Heading, PrivateIcon_Title, RoundedButton } from "~/components";

export const PrivateDiagnosisReservationHeader: VFC<{}> = () => {
  const router = useRouter();

  return (
    <Header
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: rem(20),
        marginBottom: rem(30),
      }}
    >
      <Div>
        <Div css={{ display: "flex", alignItems: "center", gap: rem(10) }}>
          프라이빗 진료 서비스
          <PrivateIcon_Title />
        </Div>
        <Heading css={{ fontSize: rem(26), fontWeight: "bold" }}>
          예약 접수
        </Heading>
      </Div>
      <RoundedButton color="orange" css={{ height: rem(50), width: rem(148) }} onClick={() => {
        router.push("/private/reservation/register");
      }}>
        예약하기
      </RoundedButton>
    </Header>
  );
};
