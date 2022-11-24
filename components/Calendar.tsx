import { isPast, isToday } from "date-fns";
import { rem } from "polished";
import { memo, useContext, useEffect } from "react";
import { useCalendar } from "@h6s/calendar";
import { DatePickerContext } from "./DatePicker";
import { Div } from "~/components/Elements";
import { styled } from "~/stitches.config";

export const PrevMonthIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m18 8-6 7 6 7" stroke="#333" strokeLinecap="round" />
  </svg>
);

export const NextMonthIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m12 8 6 7-6 7" stroke="#333" strokeLinecap="round" />
  </svg>
);

export function getNextMonth(date: Date) {
  return date.getMonth() > 10 ? 1 : date.getMonth() + 2;
}

const DayElement = styled("div", {
  placeSelf: "center",
  display: "grid",
  placeItems: "center",
  width: rem(40),
  height: rem(40),
  cursor: "pointer",
  borderRadius: "100%",
  variants: {
    currentMonth: {
      true: {
        color: "$gray01",
        fontWeight: "bold",
      },
      false: {
        color: "$gray04",
      },
    },
    today: {
      true: {
        border: "1px solid $primary",
        backgroundColor: "$white",
        color: "$gray01",
      },
    },
    selectedDay: {
      true: {
        color: "$white",
        backgroundColor: "$primary",
      },
    },
    disabled: {
      true: {
        fontWeight: "normal",
        color: "$gray04",
      },
    },
  },
  compoundVariants: [
    {
      disabled: true,
      currentMonth: true,
      css: {
        color: "#b4b4b4",
        fontWeight: "normal",
      },
    },
  ],
});

function Calendar() {
  const { pickedDate, setPickedDate } = useContext(DatePickerContext);
  const { cursorDate, headers, body, navigation } = useCalendar({
    defaultDate: pickedDate,
  });

  const handleDayClick = (value: Date) => {
    navigation.setDate(value);
  };

  useEffect(() => {
    setPickedDate(cursorDate);
  }, [cursorDate, setPickedDate]);

  return (
    <Div
      role="grid"
      css={{
        fontSize: rem(15),
        width: "100%",
        maxWidth: rem(476),
        display: "grid",
        gridTemplateRows: "auto",
        rowGap: rem(42),
        color: "$gray03",
        ".body": {
          display: "grid",
          gridTemplateRows: "auto",
          rowGap: rem(42),
        },
        ".weekrow": {
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          placeItems: "center",
        },
      }}
    >
      <Div
        role="rowheader"
        css={{ display: "flex", justifyContent: "space-between" }}
      >
        <Div
          role="button"
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: rem(60),
          }}
          onClick={() => {
            navigation.setToday();
          }}
        >
          오늘
        </Div>
        <Div
          role="group"
          css={{ display: "flex", alignItems: "center", gap: rem(17) }}
        >
          <Div role="heading" css={{ color: "$primary", fontSize: rem(22) }}>
            {cursorDate.getMonth() + 1}월
          </Div>
          <Div role="heading" css={{ fontSize: rem(17) }}>
            {cursorDate.getFullYear()}년
          </Div>
        </Div>
        <Div role="group" css={{ display: "flex" }}>
          <Div
            role="button"
            onClick={() => {
              navigation.toPrev();
            }}
          >
            <PrevMonthIcon />
          </Div>
          <Div
            role="button"
            onClick={() => {
              navigation.toNext();
            }}
          >
            <NextMonthIcon />
          </Div>
        </Div>
      </Div>
      <Div role="rowgroup" className="body">
        <Div role="row" className="weekrow">
          {headers.weekDays.map(({ key, value }) => {
            return (
              <Div role="cell" key={key}>
                {value.toLocaleString("ko", {
                  weekday: "short",
                })}
              </Div>
            );
          })}
        </Div>
        {body.value.map(({ key, value: days }) => (
          <Div key={key} role="row" className="weekrow">
            {days.map(({ key, value, isCurrentMonth, isCurrentDate }) => (
              <DayElement
                role="button"
                key={key}
                today={value.getDate() === new Date().getDate()}
                currentMonth={isCurrentMonth}
                selectedDay={value.toDateString() === cursorDate.toDateString()}
                disabled={!isToday(value) && isPast(value)}
                onClick={() => {
                  if (isPast(value)) return;
                  handleDayClick(value);
                }}
              >
                {!isCurrentMonth && value.getDate() === 1
                  ? `${getNextMonth(cursorDate)}/${value.getDate()}`
                  : value.getDate()}
              </DayElement>
            ))}
          </Div>
        ))}
      </Div>
    </Div>
  );
}

export const ScheduleCalendar = memo(Calendar);
