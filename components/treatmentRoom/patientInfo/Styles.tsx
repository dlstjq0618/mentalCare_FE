import { rem } from "polished";
import { styled } from "~/stitches.config";

export const Wrapper = styled("div", {
  width: "100%",
  margin: `${rem(30)} 0 ${rem(1)}`,
});

export const PatientInfoHeader = styled("div", {
  marginTop: rem(20),
  display: "flex",
  justifyContent: "space-between",
  marginBottom: rem(8),
  color: "$gray01",
  fontSize: rem(15),
  lineHeight: "1.4",
  "& [data-custom]": {
    fontSize: rem(13),
    color: "$black40",
  },
});

export const LeftColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  fontSize: rem(14),
  color: "$gray01",
  lineHeight: "1.4",
  lineSpacing: "normal",
  padding: `${rem(20)} 0 0 ${rem(30)}`,
  span: {
    marginBottom: rem(9),
  },
  '[aria-label="name"]': {
    fontSize: rem(20),
    fontWeight: "bold",
  },
  '[aria-label="treatment item"]': {
    fontSize: rem(20),
    fontWeight: "bold",
  },
});

export const RightColumn = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "start",
  padding: `${rem(20)} ${rem(30)}`,
  fontSize: rem(14),
  color: "$gray04",
  lineHeight: "1.4",
  lineSpacing: "normal",
  ".symptom": {
    color: "#666666",
  },
});
