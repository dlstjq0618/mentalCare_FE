import { rem } from "polished";
import { ComponentProps, useEffect, useState } from "react";
import { Div, Dropdown, DropdownOnChange } from "~/components";
import { TIME_OPTIONS, TIME_OPTIONS1 } from "~/utils/constants";

interface HourOption {
  value: string;
  label: string;
}

interface HourState {
  start: HourOption;
  end: HourOption;
}

export const DropdownHourSelect = ({
  initialHours = {
    start: TIME_OPTIONS[0],
    end: TIME_OPTIONS1[1],
  },
  onHourChange,
  onChange,
  index,
}: {
  initialHours: HourState;
  onHourChange: (data: HourState) => void;
  index?: number;
} & ComponentProps<typeof Div>) => {
  const [hour, setHour] = useState<HourState>(() => initialHours);
  const handleStartTimeChange: DropdownOnChange = (newStart) => {
    const [newStartHour, newStartMinute] = (newStart?.value as string).split(
      ":"
    );
    // const { end: currentEnd } = hour;
    // if (Number(currentEnd.value.split(":")[0]) > Number(newStartHour)) {
    //   setHour({
    //     ...hour,
    //     start: newStart as HourOption,
    //   });
    //   return;
    // }

    const nextEnd = (
      newStartMinute === "00"
        ? [String(Number(newStartHour) + 1), "00"]
        : [String(Number(newStartHour) + 1), "00"]
    ).join(":");
    const nextHour = newStartHour === "14" ? String(Number(newStartHour)) + ":00" : String(Number(newStartHour) + 1) + ":00"

    setHour({
      start: newStart as HourOption,
      end: TIME_OPTIONS.find((time) => time.value === nextEnd) ?? {
        value: nextHour,
        label: nextHour,
      },
    });
  };


  const handleEndTimeChange: DropdownOnChange = (value) => {
    setHour((prev) => ({ ...prev, end: value as HourOption }));
  };

  useEffect(() => {
    if (onHourChange) {
      onHourChange(hour);
    }
  }, [hour]);

  return (
    <>
      {index === 0 ?
        <Div
          css={{
            flex: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            gap: rem(8),
            ".react-select__control, .react-select__single-value, .react-select__indicator":
            {
              color: "$gray01",
              svg: {
                path: {
                  stroke: "$gray03",
                },
              },
            },
          }}
        >
          <Dropdown // 오전
            value={hour.start}
            className="startTime"
            options={TIME_OPTIONS}
            onChange={handleStartTimeChange}
          />{" "}
          ~{" "}
          <Dropdown
            value={hour.end}
            className="endTime"
            options={TIME_OPTIONS.filter(
              (time) =>
                Number(time.value.split(":").join("")) >
                Number(hour.start.value.split(":").join(""))
            )}
            onChange={handleEndTimeChange}
          />
        </Div> :
        <Div
          css={{
            flex: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "stretch",
            gap: rem(8),
            ".react-select__control, .react-select__single-value, .react-select__indicator":
            {
              color: "$gray01",
              svg: {
                path: {
                  stroke: "$gray03",
                },
              },
            },
          }}
        >
          <Dropdown // 오후
            value={hour.start}
            className="startTime"
            options={TIME_OPTIONS1}
            onChange={handleStartTimeChange}
          />{" "}
          ~{" "}
          <Dropdown
            value={hour.end}
            className="endTime"
            options={TIME_OPTIONS1.filter(
              (time) =>
                Number(time.value.split(":").join("")) >
                Number(hour.start.value.split(":").join(""))

            )}
            onChange={handleEndTimeChange}
          />
        </Div>}
    </>
  );
};
