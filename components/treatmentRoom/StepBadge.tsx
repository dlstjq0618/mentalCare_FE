import React, { ReactElement } from "react";
import { StepBadgeWrapper } from "./StepBadgeWrapper";
import {
  WaitingStepIcon,
  InTreatmentStepIcon,
  PrescriptionStepIcon,
  EndStepIcon,
} from "~/components/icons";
import { StepBadgeState, StepBadgeComponentProps } from "~/interfaces";

const BadgeIcon = ({ step }: { step: StepBadgeState }) => {
  const Icons: Record<StepBadgeState, ReactElement> = {
    waiting: <WaitingStepIcon />,
    inTreatment: <InTreatmentStepIcon />,
    prescription: <PrescriptionStepIcon />,
    ended: <EndStepIcon />,
  };
  return Icons[step];
};

const BADGE_TEXT_MAP: Record<
  StepBadgeState,
  "진료대기" | "진료 중" | "처방전 및 금액 등록" | "진료 종료"
> = {
  waiting: "진료대기",
  inTreatment: "진료 중",
  prescription: "처방전 및 금액 등록",
  ended: "진료 종료",
};

export const StepBadge = ({
  step,
  time,
}: StepBadgeComponentProps<StepBadgeState>) => {
  const badgeText = BADGE_TEXT_MAP[step];

  return (
    <StepBadgeWrapper step={step}>
      <BadgeIcon step={step} />
      <p aria-label="text">{badgeText} </p>
      {time && (
        <span>
          <span aria-label="time">{time}</span>분
        </span>
      )}
    </StepBadgeWrapper>
  );
};
