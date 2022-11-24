import { rem } from "polished";
import { styled } from "~/stitches.config";

export const Wrapper = styled("div", {
  width: "100%",
  minHeight: "fit-content",
  position: "relative",
  "&::after": {
    content: "",
    display: "block",
    width: rem(490),
    height: rem(70),
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    borderRadius: rem(20),
    bottom: rem(-6),
    marginLeft: rem(22),
    filter: "blur(4px)",
    position: "absolute",
    zIndex: "1",
  },
});

export const ContentWrapper = styled("div", {
  '[aria-label="orange-text"]': { color: "$primary" },
  '[aria-label="gray-text"]': { color: "$gray04", fontSize: rem(14) },
  lineHeight: "1.4",
  letterSpacing: "normal",
  fontSize: rem(16),
  backgroundColor: "white",
  width: "100%",
  height: "100%",
  borderRadius: rem(20),
  position: "relative",
  zIndex: "2",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: `${rem(42)} ${rem(30)} ${rem(29)} ${rem(30)}`,
});

export const Flex = styled("div", {
  width: "100%",
  display: "flex",
});
