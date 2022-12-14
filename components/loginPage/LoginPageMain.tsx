import { rem } from "polished";
import { styled } from "~/stitches.config";

export const LoginPageMain = styled("main", {
  flex: 1,
  display: "flex",
  maxWidth: rem(560),
  height: "auto",
  borderRadius: rem(20),
  outline: "solid 1px $gray03",
  backgroundColor: "$white",
  overflow: "hidden",
  boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.1)",
  marginTop: '22vh'
});
