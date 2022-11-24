import { rem } from "polished";
import { styled } from "~/stitches.config";

export const StepBadgeWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  paddingLeft: rem(30),
  alignItems: "start",
  '[aria-label="text"]': {
    color: "$primary",
    textAlign: "left",
    marginBottom: rem(2),
    width: rem(55),
  },
  lineHeight: "1.4",
  fontSize: rem(14),
  textAlign: "center",
  "& svg": {
    margin: `${rem(6)} 0 ${rem(10)}`,
  },
  variants: {
    step: {
      waiting: {
        '[aria-label="time"]': {
          color: "$primary",
          fontWeight: "bold",
        },
      },
      inTreatment: {
        color: "$primary",
      },
      prescription: {
        color: "$primary",
      },
      ended: {
        '[aria-label="time"]': {
          color: "$primary",
          fontWeight: "bold",
        },
      },
    },
  },
});
