import { add, format, nextDay, sub } from "date-fns";
import ko from "date-fns/locale/ko";
import { rem } from "polished";
import { createContext, ReactElement, useCallback, useEffect, useState } from "react";
import { RoundedButton } from "./Buttons";
import { BaseDialog, IconButton } from "~/components";
import { ScheduleCalendar } from "~/components/Calendar";
import { Div, Heading } from "~/components/Elements";
import { NextMonthIcon, PrevMonthIcon } from "~/components/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCounselingDate, setCounselingDate } from "~/store/calendarDetailSlice";

export const DatePickerContext = createContext<{
  pickedDate: Date;
  setPickedDate: (date: Date) => void;
}>({
  pickedDate: new Date(),
  setPickedDate: () => { },
});

export function DatePicker({
  date,
  setDate,
  open,
}: {
  open: boolean;
  date: Date;
  setDate: (date: Date) => void;
}): ReactElement {
  const [showCalendar, setShowCalendar] = useState(open);
  const [selectedDate, setSelectedDate] = useState(date);
  const dispatch = useDispatch();
  const today = new Date()
  const day = today.getDay()

  let handlePrevDateClick = useCallback(() => {
    setSelectedDate(sub(selectedDate, { days: 1 }));
  }, [selectedDate]);

  let handleNextDateClick = useCallback(() => {
    setSelectedDate(add(selectedDate, { days: 1 }));
  }, [selectedDate]);

  let handleDateSelect = () => {
    setDate(selectedDate);
    setShowCalendar(false);
    dispatch(setCounselingDate(selectedDate));
  };

  return (
    <DatePickerContext.Provider
      value={{
        pickedDate: selectedDate,
        setPickedDate: setSelectedDate,
      }}
    >
      <BaseDialog
        aria-label="달력 팝업"
        showDialog={showCalendar}
        close={() => {
          setShowCalendar(false);
        }}
        css={{
          "&[data-reach-dialog-content]": {
            padding: 0,
            width: rem(476),
            paddingInline: rem(30),
            paddingBlockEnd: rem(30),
          },
        }}
      >
        <Heading
          as="h1"
          css={{ display: "flex", fontSize: rem(15), fontWeight: "bold" }}
        >
          날짜 선택
        </Heading>
        <Div css={{ height: rem(45) }} />
        <ScheduleCalendar />
        <Div css={{ height: rem(55) }} />
        <RoundedButton
          disabled={selectedDate.getDay() < day ? true : false}
          color={selectedDate.getDay() < day ? "gray" : "orange"}
          css={{
            fontSize: rem(15),
            fontWeight: "bold",
            height: rem(50),
            width: "100%",
          }}
          onClick={handleDateSelect}
        >
          {console.log("selectedDate", selectedDate)}
          {format(selectedDate, "PPP", { locale: ko })} 선택
        </RoundedButton>
      </BaseDialog>
    </DatePickerContext.Provider>
  );
}
