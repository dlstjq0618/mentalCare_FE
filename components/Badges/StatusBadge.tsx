import { ReactElement } from "react";
import { BadgeStatus } from "interfaces";
import { PayReadyBadgeIcon } from "../icons";
import { StatusBadgeWrapper } from "./StatusBadgeWraper";
import {
  WaitingBadgeIcon,
  InCounselingBadgeIcon,
  TerminatedBadgeIcon,
  FailedBadgeIcon,
  FinishedBadgeIcon,
  ErrorBoundary,
} from "~/components";

const BadgeIcon = ({ status }: { status: BadgeStatus }) => {
  const Icons: Record<BadgeStatus | "finished", ReactElement> = {
    ongoing: <InCounselingBadgeIcon />,
    waiting: <WaitingBadgeIcon />,
    terminated: <TerminatedBadgeIcon />,
    pay_ready: <PayReadyBadgeIcon />,
    canceled: <FailedBadgeIcon />,
    cs_cancel: <FailedBadgeIcon />,
    finished: <FinishedBadgeIcon />,
  };

  return <ErrorBoundary>{Icons[status]}</ErrorBoundary>;
};

const BADGE_TEXT_MAP: Record<
  BadgeStatus | "finished",
  "대기" | "진료중" | "수납대기" | "수납완료" | "실패" | "종료"
> = {
  waiting: "대기",
  ongoing: "진료중",
  terminated: "종료",
  pay_ready: "수납대기",
  canceled: "실패",
  cs_cancel: "실패",
  finished: "수납완료",
};

type StatusBadgeComponentProps<Status extends BadgeStatus> = Status extends
  | "waiting"
  | "terminated"
  ? { status: Status; time: number }
  : { status: Status; time?: never };

export const StatusBadge = ({
  status,
  time,
}: StatusBadgeComponentProps<BadgeStatus>) => {
  const badgeText = BADGE_TEXT_MAP[status];

  return (
    <StatusBadgeWrapper status={status}>
      <BadgeIcon status={status} />
      <span>
        {badgeText}{" "}
        {time && (
          <>
            <span aria-label="time">{time}</span>분
          </>
        )}
      </span>
    </StatusBadgeWrapper>
  );
};
