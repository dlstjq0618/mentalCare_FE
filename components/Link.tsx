import { rem } from "polished";
import { styled } from "~/stitches.config";

export const LinkComponent = styled("a", {
  fontSize: "$p6-12",
  fontWeight: "normal",
  lineHeight: "1.4",
  letterSpacing: "normal",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  margin: `${rem(1)} 0 ${rem(2)}`,
  variants: {
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
    colors: {
      orange: {
        color: "$primaryFont",
        "&:hover": {
          color: "$gray05",
        },
      },
      black: {
        color: "$gray01",
        "&:hover": {
          color: "$primaryFont",
        },
      },
      gray: {
        color: "$gray04",
        "&:hover": {
          color: "$primaryFont",
        },
      },
    },
  },
});
