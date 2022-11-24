import { format } from "date-fns";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import { rem } from "polished";
import { ComponentProps, ReactElement, VFC } from "react";
import { VariantProps } from "@stitches/react";
import {
  DgnCanceled,
  DgnOnGoing,
  PrivateDiagnosisReservationListItemResponse,
} from "~//interfaces";
import {
  Div,
  EditButton,
  Heading,
  PrivateBookedIcon,
  PrivateFailIcon,
  PrivateFinishedIcon,
  PrivateWaitingIcon,
  Span,
} from "~/components";
import { styled } from "~/stitches.config";

const PrivateDiagnosisStatusWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: rem(80),
  height: rem(94),
  borderRadius: rem(20),
  fontSize: rem(13),
  variants: {
    status: {
      waiting: {
        backgroundColor: "$privateReservationStatusWaitingBg",
      },
      finished: {
        backgroundColor: "$privateReservationStatusFinishedBg",
      },
      canceled: {
        backgroundColor: "$privateReservationStatusFailedBg",
      },
      booked: {
        backgroundColor: "$privateReservationStatusBookedBg",
      },
    },
  },
  defaultVariants: {
    status: "접수 대기",
  },
});

type PrivateDiagnosisStatus = Exclude<
  PrivateDiagnosisReservationListItemResponse["status"],
  DgnCanceled | DgnOnGoing
>;

const statusMap: Record<
  PrivateDiagnosisStatus,
  VariantProps<typeof PrivateDiagnosisStatusWrapper>["status"]
> = {
  "예약 완료": "booked",
  rsv_completed: "booked",
  "예약 취소": "canceled",
  rsv_canceled: "canceled",
  "접수 대기": "waiting",
  waiting: "waiting",
  "진료 완료": "finished",
  dgn_completed: "finished",
};

const StatusIcon: Record<PrivateDiagnosisStatus, () => ReactElement> = {
  "예약 완료": PrivateBookedIcon,
  rsv_completed: PrivateBookedIcon,
  "예약 취소": PrivateFailIcon,
  rsv_canceled: PrivateFailIcon,
  "진료 완료": PrivateFinishedIcon,
  dgn_completed: PrivateFinishedIcon,
  "접수 대기": PrivateWaitingIcon,
  waiting: PrivateWaitingIcon,
} as const;

const PrivateReservationStatus: VFC<{
  status: PrivateDiagnosisStatus;
}> = ({ status }) => {
  const Icon = StatusIcon[status];

  return (
    <PrivateDiagnosisStatusWrapper status={statusMap[status]}>
      <Icon />
      {status}
    </PrivateDiagnosisStatusWrapper>
  );
};

export const PrivateReservationListItem: VFC<
  PrivateDiagnosisReservationListItemResponse &
  Omit<ComponentProps<typeof Div>, "id">
> = ({
  id,
  status,
  username,
  mobile,
  reservedAt,
  patientName,
  resRgst,
  css,
  ...rest
}) => {
    const router = useRouter();

    return (
      <Div
        css={{
          display: "grid",
          gridTemplateColumns: "min-content auto min-content",
          backgroundColor: "$white",
          borderRadius: rem(20),
          ...css,
        }}
        {...rest}
      >
        <Div css={{ padding: `${rem(15)}`, paddingRight: rem(30) }}>
          <PrivateReservationStatus status={status} />
        </Div>
        <Div
          css={{
            display: "flex",
            flexDirection: "column",
            gap: rem(6),
            padding: `${rem(26)} 0 ${rem(22)}`,
          }}
        >
          <Heading css={{ fontSize: rem(19), fontWeight: "bold" }}>
            {username}
            <Span
              css={{
                fontSize: rem(13),
                fontWeight: "normal",
                marginLeft: rem(8),
              }}
            >
              ({mobile})
            </Span>
          </Heading>
          {patientName ? (
            <Div
              css={{
                fontSize: rem(13),
                fontWeight: "normal",
                height: rem(30),
                padding: `${rem(8)} ${rem(12)}`,
              }}
            >
              {patientName} {resRgst}
            </Div>
          ) : (
            <Div css={{ fontSize: rem(13) }}>{resRgst ?? "-"}</Div>
          )}
          <Span css={{ fontSize: rem(13), color: "$gray05" }}>
            예약 일시:{" "}
            {format(new Date(Number(reservedAt) * 1000), "yyyy-MM-dd HH:mm")}
          </Span>
        </Div>
        <Div css={{ padding: rem(20) }}>
          <EditButton
            onClick={() => {
              router.push(`/private/reservation/${id}`);
            }}
          />
        </Div>
      </Div>
    );
  };
