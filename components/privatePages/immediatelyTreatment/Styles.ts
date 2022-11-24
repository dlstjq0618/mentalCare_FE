import { rem } from "polished";
import { styled } from "~/stitches.config";

export const Title = styled("div", {
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  fontSize: rem(20),
  color: "$black",
  fontWeight: "bold",
  lineHeight: "1.4",
  gap: rem(12),
  margin: `${rem(28)} 0 ${rem(24)}`,
});

export const Text = styled("div", {
  fontSize: "$p3-15",
  lineHeight: "1.4",
  marginBottom: rem(30),
  color: "$gray01",
  '[aria-label="orange-text"]': { color: "$primary" },
});

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: `${rem(135)} 2fr`,
  alignItems: "center",
});

export const SubmitButton = styled("div", {
  width: "100%",
  marginTop: rem(30),
  border: "1px solid $primary",
  borderRadius: rem(20),
  padding: `${rem(30)} ${rem(100)} ${rem(30)} ${rem(40)}`,
  display: "grid",
  gridTemplateColumns: `${rem(89)} 2fr`,
  p: {
    margin: `${rem(10)} 0 ${rem(19)}`,
    color: "$gray01",
    fontSize: rem(18),
    lineHeight: "1.4",
  },
  ".text": {
    display: "inline-block",
    fontSize: rem(14),
    color: "$gray03",
    marginBottom: rem(30),
  },
  '[aria-label="orange-text"]':{
    color: "$primary"
  }
});
