import { rem } from "polished";
import { styled } from "~/stitches.config";

export const Wrapper = styled("div", {
  width: "100%",
});

export const Main = styled("div", {
  width: "100%",
  display: "grid",
  backgroundColor: "white",
  paddingTop: rem(19.5),
  fontSize: rem(14),
  color: "$gray03",
  lineHeight: "1.4",
  lineSpacing: "normal",
  span: {
    marginBottom: rem(5),
  },
});

export const LeftColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  '[aria-label="treatment item"]': {
    fontSize: rem(20),
    fontWeight: "bold",
    color: "$gray01",
  },
});

export const RightColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});
