import { rem } from "polished";
import { styled } from "~/stitches.config";

export const GlobalMaxWidthWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: `minmax(25px, 1fr) minmax($globalMinWidth, $globalMaxWidth) minmax(25px, 1fr)`,
  "& > *": {
    gridColumn: 2,
  },
  ".full-bleed": {
    gridColumn: "1/3",
  },
  variants: {
    page: {
      register: {
        gridTemplateColumns: `minmax(${rem(25)}, 1fr) ${rem(660)} minmax(${rem(
          25
        )}, 1fr)`,
      },
    },
  },
});


export const GlobalMaxWidthWrapper1 = styled("div", {
  display: "grid",
  gridTemplateRows: "4rem 6rem 4rem",
  gridTemplateColumns: `minmax(25px) minmax($globalMinWidth, $globalMaxWidth) minmax(25px)`,
  "& > *": {
    gridColumn: 2,
  },
  ".full-bleed": {
    gridColumn: "1/3",
  },
  variants: {
    page: {
      register: {
        gridTemplateColumns: `minmax(${rem(25)}, 1fr) ${rem(660)} minmax(${rem(
          25
        )}, 1fr)`,
      },
    },
  },
});
