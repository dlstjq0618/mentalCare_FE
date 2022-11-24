import { rem } from "polished";
import { styled } from "~/stitches.config";

export const Flex = styled("div", {
  display: "flex",
  width: "100%",
});

export const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: `${rem(103)} 2fr`,
});

export const MainTitle = styled("div", {
  width: "100%",
  height: rem(28),
  margin: `${rem(39)} 0 ${rem(30)}`,
  color: "$black",
  fontSize: rem(20),
  fontWeight: "bold",
  lineHeight: "1.4",
  letterSpacing: "normal",
  textAlign: "left",
});
export const Title = styled("span", {
  width: "100%",
  color: "$gray01",
  fontSize: rem(15),
  fontWeight: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",
});

export const Details = styled("div", {
  width: "100%",
  height: "fit-content",
  padding: `${rem(29)} ${rem(30)} ${rem(30)}`,
  margin: `${rem(4)} 0 ${rem(28)} `,
  borderRadius: rem(20),
  color: "$gray03",
  fontSize: rem(15),
  lineHeight: "1.4",
  backgroundColor: "$white",
  ".account-holder": {
    color: "$gray01",
    fontSize: rem(20),
    fontWeight: "bold",
    letterSpacing: "normal",
    lineHeight: "1.4",
  },
  ".bank-info": {
    display: "inline-block",
    fontSize: rem(16),
    color: "$gray01",
    marginLeft: rem(30),
  },
});

export const EditForm = styled("div", {
  width: "100%",
  height: "fit-content",
  borderRadius: rem(20),
  backgroundColor: "$white",
  margin: `${rem(16)} 0 ${rem(28)} `,
  padding: rem(31),
  fontSize: rem(15),
  color: "$gray01",
  '[aria-label="orange-text"]': {
    color: "$primary",
  },
});
export const Year = styled("div", {
  borderRight: "1px solid $gray05",
  textAlign: "left",
  span: {
    display: "inline-block",
    marginTop: rem(30),
    color: "$primary",
    fontSize: rem(22),
    lineHeight: "1.4",
    lineSpacing: rem(-1.1),
    fontWeight: "normal",
  },
  button: {
    border: "none",
    backgroundColor: "transparent",
    padding: 0,
    cursor: "pointer",
  },
  ".disabled": {
    svg: {
      path: {
        stroke: "$gray05",
      },
    },
  },
});
export const List = styled("div", {
  padding: `${rem(30)} 0 ${rem(30)} ${rem(30)}`,
});
export const ListCard = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  lineHeight: "1.4",
  ".month": {
    fontSize: rem(16),
    color: "$gray03",
  },
  ".amount": {
    fontSize: rem(15),
    fontWeight: "bold",
    color: "$gray01",
  },
});
