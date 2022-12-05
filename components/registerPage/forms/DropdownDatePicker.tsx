import { rem } from "polished";
import { useEffect, useReducer } from "react";
import { Dropdown, Div, DropdownOnChange } from "~/components";
import { styled } from "~/stitches.config";
import { useSelector } from "react-redux";
import { selectCounselingInfoData } from "~/store/calendarDetailSlice";
import {
  getDayOptions,
  getDaysInMonth,
  getMonthOptions,
  getYearOptions,
} from "~/utils/date.utils";

const yearOptions = getYearOptions();
const monthOptions = getMonthOptions();

const PickerWrapper = styled("div", {
  display: "flex",
  justifyContent: "stretch",
  alignItems: "center",
  gap: rem(5),
  flex: 4,
  "[data-reach-listbox-input]": {
    flex: "auto",
  },
  variants: {
    year: {
      true: {
        flex: 4,
      },
      false: {
        flex: 2,
      },
    },
  },
  defaultVariants: {
    year: false,
  },
});

function dateStateReducer(
  state: {
    year: string;
    month: string;
    day: string;
    days: string;
  },
  action:
    | {
      type: "year" | "month" | "day";
      payload: string;
    }
    | {
      type: "days";
      payload: { year: string; month: string };
    }
) {
  switch (action.type) {
    case "year":
      return {
        ...state,
        year: action.payload,
      };
    case "month":
      return {
        ...state,
        month: action.payload,
      };
    case "day":
      return {
        ...state,
        day: action.payload,
      };
    case "days":
      return {
        ...state,
        days: getDaysInMonth(
          action.payload.year,
          action.payload.month
        ).toString(),
      };
    default:
      return state;
  }
}

export const DropdownDatePicker = ({
  onComplete,
}: {
  onComplete?: (dateStr: string) => void;
}) => {
  const [dateState, dispatch] = useReducer(dateStateReducer, {
    year: "",
    month: "",
    day: "",
    days: "",
  });

  useEffect(() => {
    dispatch({
      type: "days",
      payload: { year: dateState.year, month: dateState.month },
    });
  }, [dateState.year, dateState.month]);

  useEffect(() => {
    if (onComplete && dateState.year && dateState.month && dateState.day) {
      onComplete(
        `${dateState.year}-${dateState.month.length === 1 ? "0" + dateState.month : dateState.month
        }-${dateState.day.length === 1 ? "0" + dateState.day : dateState.day}`
      );
    }
  }, [dateState.year, dateState.month, dateState.day, onComplete]);

  const infoData = useSelector(selectCounselingInfoData);
  const placeAccountBirthdate = infoData?.accountInfo?.accountHolderBirthdate
  const placeYear = placeAccountBirthdate?.substr(0, 4)
  const placeMonth = placeAccountBirthdate?.substr(5, 2)
  const placeDay = placeAccountBirthdate?.substr(8, 2)

  const handleYearChange: DropdownOnChange = (year) => {
    if (!year?.value) return;
    dispatch({ type: "year", payload: year?.value });
  };

  const handleMonthChange: DropdownOnChange = (month) => {
    if (!month?.value) return;
    dispatch({ type: "month", payload: month?.value });
  };

  const handleDayChange: DropdownOnChange = (day) => {
    if (!day?.value) return;
    dispatch({ type: "day", payload: day?.value });
  };

  return (
    <Div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: rem(25),
      }}
    >
      <PickerWrapper year>
        <Dropdown
          aria-label="년도 선택"
          id="date-picker-yyyy"
          placeholder={placeYear}
          options={yearOptions}
          onChange={handleYearChange}
        />
        년
      </PickerWrapper>
      <PickerWrapper>
        <Dropdown
          aria-label="월 선택"
          id="date-picker-mm"
          instanceId="date-picker-mm"
          placeholder={placeMonth}
          options={monthOptions}
          onChange={handleMonthChange}
        />
        월
      </PickerWrapper>
      <PickerWrapper>
        <Dropdown
          aria-label="일 선택"
          id="date-picker-dd"
          instanceId="date-picker-dd"
          placeholder={placeDay}
          options={getDayOptions(dateState.days)}
          onChange={handleDayChange}
        />
        일
      </PickerWrapper>
    </Div>
  );
};
