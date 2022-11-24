import { rem } from "polished";
import { Toggle, ToggleIcon } from "~/components";
import { styled } from "~/stitches.config";

const AutoLoginToggleWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  fontSize: rem(15),
  color: "$gray01",
  paddingRight: 8,
});

export const AutoLoginToggle = () => {
  return (
    <AutoLoginToggleWrapper>
      <Toggle defaultPressed css={{ marginRight: rem(4) }}>
        <ToggleIcon />
      </Toggle>
      자동로그인
    </AutoLoginToggleWrapper>
  );
};
