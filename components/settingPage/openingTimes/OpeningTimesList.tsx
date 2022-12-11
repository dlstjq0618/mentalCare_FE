import { rem } from "polished";
import {
  ComponentProps,
  Fragment,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import {
  DelIcon,
  Div,
  IconButton,
  Label,
  PlusIcon,
  RoundedButton,
  DropdownHourSelect,
} from "~/components";

interface OpeningTimesItem {
  start: {
    value: string;
    label: string;
  };
  end: {
    value: string;
    label: string;
  };
}

export const OpeningTimesList = ({
  initialHours = [
    {
      start: { label: "09:00", value: "09:00" },
      end: { label: "09:30", value: "09:30" },
    },
  ],
  handleHoursChange,
}: {
  initialHours?: OpeningTimesItem[];
  handleHoursChange: (data: OpeningTimesItem[]) => void;
} & ComponentProps<typeof Div>) => {
  const [hours, setHours] = useState<OpeningTimesItem[]>(() => initialHours);

  const handleAddHourClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setHours((prevHours) => [
      ...prevHours,
      {
        start: { label: "00:00", value: "00:00" },
        end: { label: "00:00", value: "00:00" },
      },
    ]);
  };

  const handleDeleteHourClick = (hourIndex: number) => {
    setHours((prevHours) =>
      prevHours.filter((_, index) => index !== hourIndex)
    );
  };

  useEffect(() => {
    if (handleHoursChange) {
      handleHoursChange(hours);
    }
  }, [hours]);

  return (
    <>
      <>
        {hours?.map((hour, hourIndex) => (
          <Fragment key={hourIndex}>
            <Label css={{ paddingLeft: rem(30) }}>
              {hourIndex === 0 ? "오전 진료" : "오후 진료"}
            </Label>
            <Div
              css={{
                display: "flex",
                alignItems: "center",
                gap: rem(4),
              }}
            >
              <DropdownHourSelect
                index={hourIndex}
                initialHours={hour}
                onHourChange={(change) => {
                  setHours((prev) => prev?.map((h, i) => (i === hourIndex ? change : h)));
                }}
              />
              {/* <IconButton onClick={() => handleDeleteHourClick(hourIndex)}>
                <DelIcon />
              </IconButton> */}
            </Div>
          </Fragment>
        ))}
      </>
      {hours.length < 2 && (
        <RoundedButton
          css={{
            gridColumn: "2/3",
            height: rem(50),
            backgroundColor: "transparent",
            color: "$primary",
            borderColor: "$primary",
            svg: {
              path: {
                stroke: "$primary",
              },
            },
          }}
          outlined
          onClick={handleAddHourClick}
        >
          <PlusIcon />
          진료 시간 추가
        </RoundedButton>
      )}
    </>
  );
};
