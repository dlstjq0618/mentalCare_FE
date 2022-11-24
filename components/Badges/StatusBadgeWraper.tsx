import { styled } from "~/stitches.config";

export const StatusBadgeWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 80,
  height: 94,
  padding: "12px 0px 17.6px 0px",
  borderRadius: 20,
  color: "$gray01",
  fontSize: 13,
  textAlign: "center",
  variants: {
    status: {
      waiting: {
        backgroundColor: "#fff6e9",
        '[aria-label="time"]': {
          color: "$orange",
          fontWeight: "bold",
        },
      },
      ongoing: {
        color: "$primary",
        backgroundColor: "rgba(255, 229, 220, 0.4)",
      },
      terminated: {
        backgroundColor: "$terminatedStatusBg",
      },
      pay_ready: {
        backgroundColor: "$payReadyStatusBg",
      },
      finished: {
        backgroundColor: "$finishedStatusBg",
        '[aria-label="time"]': {
          color: "$yellowwishgreen",
          fontWeight: "bold",
        },
      },
      canceled: {
        backgroundColor: "$failedStatusBg",
      },
      cs_cancel: {
        backgroundColor: "$failedStatusBg",
      },
    },
  },
  defaultVariants: {
    status: "waiting",
  },
});
