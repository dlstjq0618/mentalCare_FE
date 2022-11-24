import { rem } from "polished";
import { ComponentProps, forwardRef, Fragment } from "react";
import { Root, Item, Indicator } from "@radix-ui/react-radio-group";
import { TimeString } from "~//interfaces";
import { Heading } from "~/components";
import { styled } from "~/stitches.config";
import { ALL_TIME_OPTIONS } from "~/utils/constants";

const RadioRoot = styled(Root, {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: rem(12),
  rowGap: rem(12),
  fontSize: rem(15),
});
const RadioItem = styled(Item, {
  backgroundColor: "$white",
  border: "none",
  borderRadius: rem(100),
  height: rem(50),
  span: {
    color: "$primary",
  },
  '&[data-state="checked"]': {
    color: "$white",
    backgroundColor: "$primary",
    span: {
      color: "$white",
    },
  },
});
const RadioIndicator = styled(Indicator, {});

export const ReservationTimeRadioGroup = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof RadioRoot> & {
    reservedTimes?: Record<TimeString, number>;
  }
>(({ reservedTimes, ...props }, ref) => {
  return (
    <RadioRoot ref={ref} {...props}>
      <Heading
        as="h3"
        css={{
          gridColumn: "1/4",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: rem(15),
        }}
      >
        오전
      </Heading>
      {/* 
        오전: 08:00 ~ 12:00 까지 30분 단위로 예약
        임의로 19:00 이후는 삭제하였음.
      */}
      {ALL_TIME_OPTIONS?.filter((_, i) => i < 21).map((item, index) => {
        // index === 9 이면 오후 1시.
        if (index === 9) {
          return (
            <Fragment key={`${item.value}-${index}-key`}>
              <Heading
                as="h3"
                css={{
                  gridColumn: "1/4",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: rem(15),
                }}
              >
                오후
              </Heading>
              <RadioItem id={item.value} key={item.value} value={item.value}>
                {item.label}{" "}
                {reservedTimes?.[item.value as TimeString] && (
                  <span>({reservedTimes[item.value as TimeString]})</span>
                )}
              </RadioItem>
            </Fragment>
          );
        }
        return (
          <RadioItem id={item.value} key={item.value} value={item.value}>
            {item.label}{" "}
            {reservedTimes?.[item.value as TimeString] && (
              <span>({reservedTimes[item.value as TimeString]})</span>
            )}
          </RadioItem>
        );
      })}
    </RadioRoot>
  );
});
