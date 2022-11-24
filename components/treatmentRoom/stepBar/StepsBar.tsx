import { rem } from "polished";
import React from "react";
import { PlayIcon, WaitingIcon, CompletedIcon } from "~/components/icons";
import { styled } from "~/stitches.config";
import { DIAGNOSIS_STEPS, DIAGNOSIS_STEPS_CANCELED } from "~/utils/constants";

const Steps = styled("div", {
  fontSize: rem(12),
  display: "flex",
  justifyContent: "center",
  height: rem(70),
  backgroundColor: "white",
  borderRadius: rem(20),
  paddingInline: `calc(calc(100% - ${rem(320)}) / 2)`,
  paddingBlockStart: rem(16),

  ".progress-bar": {
    flex: 1,
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,

    "&.canceled": {
      flex: 0,
      minWidth: rem(112),
    },

    "&:after": {
      position: "absolute",
      content: "",
      width: "calc(100% - 12px)",
      borderTop: "1px dashed $gray05",
      left: rem(2),
      top: rem(5.5),
      zIndex: 0,
    },
  },

  ".progress-bar li": {
    flex: rem(100),
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    listStyle: "none",
    zIndex: 1,

    "&.active:before, &.current:before, &.next:before": {
      position: "absolute",
      content: "",
      height: rem(1),
      width: "100%",
      borderTop: "1px solid $primary",
      top: rem(5.5),
      right: rem(4),
      zIndex: 0,
    },

    "&:first-of-type": {
      flex: 0,
      "&:before": {
        width: 0,
      },
    },

    ".text": {
      position: "absolute",
      width: "max-content",
      fontSize: rem(13),
      bottom: rem(10),
      right: 0,
      transform: "translateX(35%)",
    },

    "&.current .text": {
      color: "$primary",
    },
  },

  ".icon": {
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 1,
  },
});

interface Props {
  current: number;
  canceled?: boolean;
}

const getLiClassName = ({
  current,
  index,
  canceled,
}: {
  current: number;
  index: number;
  canceled?: boolean;
}) => {
  if (current === index || (canceled && index === 1)) return "current";
  if (current === index - 1) return "next";
  if (current > index) return "active";
  return "";
};

export const StepsBar: React.FC<Props> = ({ current, canceled }) => {
  const steps = canceled ? DIAGNOSIS_STEPS_CANCELED : DIAGNOSIS_STEPS;

  return (
    <Steps>
      <ul className={canceled ? "canceled progress-bar" : "progress-bar"}>
        {steps?.map((step, index) => (
          <li
            key={index}
            className={getLiClassName({ current, index, canceled })}
          >
            <div className="icon">
              {current === index || (canceled && index === 1) ? (
                <PlayIcon />
              ) : current > index ? (
                <CompletedIcon />
              ) : (
                <WaitingIcon />
              )}{" "}
            </div>
            <span className="text">{step}</span>
          </li>
        ))}
      </ul>
    </Steps>
  );
};
