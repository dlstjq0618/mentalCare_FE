import { useRouter } from "next/router";
import { rem } from "polished";
import { RoundedButton } from "./RoundedButton";
import { PrivateIcon_Small } from "~/components";
import { styled } from "~/stitches.config";

const Div = styled("div", {
  position: "relative",
  [`& ${RoundedButton}`]: {
    width: rem(147),
    height: rem(44),
    padding: `${rem(12)} ${rem(34)} ${rem(11)} ${rem(5)}`,
  },
  svg: {
    position: "absolute",
    right: 0,
    top: rem(-4),
  },
});
export const ButtonImmediately = () => {
  const router = useRouter();

  return (
    <Div>
      <RoundedButton color="orange" onClick={() => router.push("/private")}>
        즉시 접수
      </RoundedButton>
      <PrivateIcon_Small />
    </Div>
  );
};
