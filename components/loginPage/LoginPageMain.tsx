import { rem } from "polished";
import { styled } from "~/stitches.config";

export const LoginPageMain = styled("main", {
  flex: 1,
  display: "flex",
  maxWidth: rem(890),
  height: rem(560),
  borderRadius: rem(20),
  outline: "solid 1px $gray03",
  backgroundColor: "$white",
  overflow: "hidden",
  boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.1)",
});
