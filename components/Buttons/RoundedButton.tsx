import { rem } from "polished";
import { styled } from "~/stitches.config";

export const RoundedButton = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: rem(10),
  borderRadius: rem(100),
  color: "white",
  fontSize: "$p3-15",
  fontWeight: "normal",
  lineHeight: "1.4",
  cursor: "pointer",
  variants: {
    outlined: {
      true: {
        border: "1px solid",
      },
    },
    color: {
      orange: {
        backgroundColor: "$primary",
        border: "none",
        "&:hover, &:focus": {
          backgroundColor: "$orange01",
        },
      },
      orange2: {
        backgroundColor: "$primary",
        border: "none",
        "&:hover, &:focus": {
          backgroundColor: "$orange01",
        },
      },
      lightOrange: {
        color: "$primary",
        backgroundColor: "rgba(235, 84, 30, 0.09);",
        border: "none",
        "&:hover , &:focus": {
          backgroundColor: "$primary",
          color: "$white",
        },
      },
      lightOrange2: {
        color: "$primary",
        backgroundColor: "#fff",
        border: '1px solid #eb541e',
        fontWeight: 'bold',
      },
      black: {
        backgroundColor: "$gray01",
        border: "none",
        "&:hover, &:focus": {
          backgroundColor: "$black",
        },
      },
      gray: {
        backgroundColor: "$gray08",
        color: "$gray01",
        border: "none",
        "&:hover, &:focus": {
          backgroundColor: "$gray05",
        },
      },
      gray1: {
        backgroundColor: "#575757",
        color: "#fff",
        border: "none",
        "&:hover, &:focus": {
          backgroundColor: "#4a4545",
        },
      },
      white: {
        backgroundColor: "$white",
        border: "none",
        color: "$gray01",
        "&:hover, &:focus": {
          backgroundColor: "$primary",
          color: "$white",
        },
      },
    },
  },
  compoundVariants: [
    {
      color: "black",
      outlined: true,
      css: {
        color: "$gray01",
        backgroundColor: "$white",
        border: "1px solid $gray01",
        "&:hover, &:focus": {
          color: "white",
          backgroundColor: "$gray01",
        },
      },
    },
    {
      color: "lightOrange",
      outlined: true,
      css: {
        color: "$gray01",
        backgroundColor: "$white",
        "&:hover, &:focus": {
          backgroundColor: "$white",
          border: "1px solid $primary",
        },
      },
    },
    {
      color: "orange",
      outlined: true,
      css: {
        color: "$primary",
        backgroundColor: "$white",
        border: "1px solid $primary",
        boxShadow: "0 3px 3px 0 rgba(140, 140, 140, 0.3)",
        "&:hover, &:focus": {
          backgroundColor: "$primary",
          border: "1px solid $primary",
          color: "white",
        },
      },
    },
    {
      color: "orange2",
      outlined: true,
      css: {
        color: "$primary",
        backgroundColor: "$white",
        border: "1px solid $primary",
        boxShadow: "0 3px 3px 0 rgba(140, 140, 140, 0.3)",
        "&:hover, &:focus": {
          backgroundColor: "$white",
          border: "1px solid #BC4318",
          color: "#BC4318",
        },
      },
    },
  ],
});
