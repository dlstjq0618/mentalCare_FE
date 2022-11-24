import { useRouter } from "next/router";
import { rem } from "polished";
import { VariantProps } from "@stitches/react";
import { ArrowIcon } from "~/components";
import { styled } from "~/stitches.config";
import { DIAGNOSIS_STATUS } from "~/utils/constants";
import { useDispatch } from "react-redux";

const LinkButtons = styled("button", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: rem(129),
  height: rem(40),
  cursor: "pointer",
  padding: "10px 22px 10px 33px",
  boxShadow: "0 3px 3px 0 rgba(140, 140, 140, 0.2)",
  fontSize: "$p4-12",
  fontWeight: "bold",
  lineHeight: "1.4",
  letterSpacing: "normal",
  fontStyle: "normal",
  borderRadius: "20px 5px 5px 20px",
  position: "absolute",
  top: rem(25),
  right: rem(-5),
  "@bp1": {
    width: rem(160),
    height: rem(54),
    borderRadius: "40px 5px 5px 40px",
    fontSize: rem(17),
  },
  variants: {
    status: {
      ongoing: {
        border: "solid 1px $$primary",
        color: "$white",
        svg: {
          path: {
            stroke: "$white",
          },
        },
        backgroundColor: "$primary",
        boxShadow: "$button",
        "&:hover, &:focus, &:active": {
          backgroundColor: "$orange01",
          color: "$white",
          boxShadow: "none",
        },
      },
      waiting: {
        border: "solid 1px $primary",
        color: "$primary",
        backgroundColor: "$white",
        "&:hover, &:focus, &:active": {
          backgroundColor: "$orange01",
          color: "$white",
          svg: {
            path: {
              stroke: "$white",
            },
          },
        },
      },
      pay_ready: {
        border: "solid 1px $gray03",
        color: "$gray03",
        backgroundColor: "$white",
        svg: {
          path: {
            stroke: "$gray03",
          },
        },
        "&:hover, &:focus, &:active": {
          backgroundColor: "$gray01",
          color: "$white",
          svg: {
            path: {
              stroke: "$white",
            },
          },
        },
      },
      terminated: {
        border: "solid 1px $gray03",
        color: "$gray03",
        backgroundColor: "$white",
        svg: {
          path: {
            stroke: "$gray03",
          },
        },
        "&:hover, &:focus, &:active": {
          backgroundColor: "$gray01",
          color: "$white",
          svg: {
            path: {
              stroke: "$white",
            },
          },
        },
      },
      canceled: {
        border: "solid 1px $gray03",
        color: "$gray03",
        backgroundColor: "$white",
        "&:hover": {
          color: "$white",
          backgroundColor: "$gray01",
          svg: {
            path: {
              stroke: "$white",
            },
          },
        },
        svg: {
          path: {
            stroke: "$gray03",
          },
        },
      },
      cs_cancel: {
        border: "solid 1px $gray03",
        color: "$gray03",
        backgroundColor: "$white",
        "&:hover": {
          color: "$white",
          backgroundColor: "$gray01",
          svg: {
            path: {
              stroke: "$white",
            },
          },
        },
        svg: {
          path: {
            stroke: "$gray03",
          },
        },
      },
      finished: {},
    },
  },
});

type StateVariants = VariantProps<typeof LinkButtons>;

type Props = { id?: number } & StateVariants;

export const WaitingRoomBtn = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch()

  let statusText = "";

  switch (props.status) {
    case DIAGNOSIS_STATUS.REUPLOAD:
    case DIAGNOSIS_STATUS.REUPLOAD_KR:
      statusText = "처방전 재등록";
      break;
    case DIAGNOSIS_STATUS.WAITING:
    case DIAGNOSIS_STATUS.WAITING_KR:
      statusText = "진료 하기";
      break;
    case DIAGNOSIS_STATUS.IN_PROGRESS:
    case DIAGNOSIS_STATUS.IN_PROGRESS_KR:
      statusText = "진료중";
      break;
    case DIAGNOSIS_STATUS.PAY_READY:
    case DIAGNOSIS_STATUS.PAY_READY_KR:
      statusText = "수납하기";
    default:
      statusText = "진료 내역";
      break;
  }

  return (
    <LinkButtons
      status={props.status}
      onClick={() => { router.push("/diagnosis/" + props.id) }}
    >
      <span>{statusText}</span>
      <ArrowIcon />
    </LinkButtons>
  );
};
