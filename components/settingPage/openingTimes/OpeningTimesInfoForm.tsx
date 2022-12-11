import { rem } from "polished";
import { Fragment, MouseEventHandler, useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { DevTool } from "@hookform/devtools";
import {
  Div,
  Dropdown,
  Form,
  IconButton,
  PlusIcon,
  RoundedButton,
  OpeningTimesList,
} from "~/components";
import {
  useCreateOpeningTimesMutation,
  useGetOpeningTimesQuery,
  useUpdateOpeningTimesMutation,
} from "~/services/doctor";
import { setOpeningHoursEditState } from "~/store/settingsSlice";
import { DAY_OPTIONS, TIME_OPTIONS } from "~/utils/constants";
import {
  transformOpeningTimeForForm,
  transformOpeningTimesForRequest,
} from "~/utils/transform.utils";
import NewOpeningTimesinfoForm from "./NewOpeningTimesinfoForm";

const defaultDayHours: OpeningHourItem["hours"] = [
  {
    start: { label: "9:00", value: "09:00" },
    end: { label: "12:00", value: "12:00" },
  },
  {
    start: { label: "14:00", value: "14:00" },
    end: { label: "18:00", value: "18:00" },
  },
];

const defaultWeekHours = ["0", "1", "2", "3", "4", "5", "6"].map((weekday) => ({
  weekday,
  hours: defaultDayHours,
}));

export interface OpeningHourState {
  data: OpeningHourItem[];
}

export interface OpeningHourItem {
  weekday: string;
  hours: {
    start: typeof TIME_OPTIONS[number];
    end: typeof TIME_OPTIONS[number];
  }[];
}

export const OpeningTimesInfoForm = () => {

  const dispatch = useDispatch();

  const { data: openingTimesResponse } = useGetOpeningTimesQuery();
  const [requestCreateOpeningTimes] = useCreateOpeningTimesMutation();
  const [requestUpdateOpeningTimes] = useUpdateOpeningTimesMutation();
  const [type, setType] = useState<boolean>()
  const [count, setCount] = useState<any>([0]);
  const [arrayCount, setArrayCount] = useState(1);
  var maxData = Math.max(...count)

  const CountAddControll = (addCount: number) => setCount([...count, ...[addCount]])
  const CountMinusControll = (index: number[]) => { setCount(index.filter((data: any) => data !== maxData)) }

  const initialSchedule = openingTimesResponse?.data?.map(
    transformOpeningTimeForForm
  );

  const { control, handleSubmit, setValue, getValues, watch } = useForm<{
    openingTimes: typeof defaultWeekHours;
  }>({
    mode: "onChange",
    defaultValues: { openingTimes: initialSchedule ?? [] },
  });

  const formData = watch("openingTimes");

  const handleCancel = () => {
    dispatch(setOpeningHoursEditState("idle"));
    document.querySelector(".OpeningTimesInfoSection")?.scrollIntoView();
  };

  const handleSave: SubmitHandler<{
    openingTimes: typeof defaultWeekHours;
  }> = async (formData) => {
    const openingTimes = formData.openingTimes?.map(
      transformOpeningTimesForRequest
    );
    try {
      const result =
        openingTimesResponse && openingTimesResponse?.data.length > 0
          ? await requestUpdateOpeningTimes({ openingTimes }).unwrap()
          : await requestCreateOpeningTimes({ openingTimes }).unwrap();

      if (result.isSuccess) {
        dispatch(setOpeningHoursEditState("idle"));
      }
    } catch (e: any) {
      alert("운영 시간을 확인해 주세요.")
    }
  };

  const handleAddDayButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    handleTestButton()
    e.preventDefault();
    if (type) {
      const day =
        formData.length > 0 && formData.length < 7
          ? String(Number(formData[formData.length - 1].weekday) + 1)
          : "0";
      setValue(`openingTimes.${formData.length}`, {
        weekday: day,
        hours: defaultDayHours,
      });
    } else {
      if (formData.length < 1) {
        const day =
          formData.length > 0 && formData.length < 7
            ? String(Number(formData[formData.length - 1].weekday) + 1)
            : "0";
        setValue(`openingTimes.${formData.length}`, {
          weekday: day,
          hours: defaultDayHours,
        });
      }
    }
  };

  const handleTestButton = () => {
    setArrayCount(arrayCount + 1);
    CountAddControll(arrayCount);
  }

  useEffect(() => {
    formData.map((data) => Number(data.weekday) < 6 ? setType(true) : setType(false))
  })

  const handleDayCopy = (dayData: OpeningHourItem) => {
    const prev = getValues("openingTimes");

    setValue("openingTimes", [
      ...prev,
      {
        ...dayData,
        weekday: String(
          Number(dayData.weekday) < 6
            ? Number(dayData.weekday) + 1
            : dayData.weekday
        ),
      },
    ]);
  };

  const handleDayDelete = (dayValueToDelete: OpeningHourItem["weekday"]) => {
    const prev = getValues("openingTimes");
    setValue(
      "openingTimes",
      prev.filter(
        (dayOpeningHourData) => dayOpeningHourData.weekday !== dayValueToDelete
      )
    );
  };


  return (
    <Form onSubmit={handleSubmit(handleSave)}>
      <Div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          borderBottom: "1px solid $gray06",
          paddingInlineEnd: rem(30),
          paddingBlock: rem(20),
        }}
      >
        <RoundedButton
          color="orange"
          css={{ height: rem(50), width: rem(180) }}
          onClick={handleAddDayButton}
        >
          <PlusIcon />
          요일 추가
        </RoundedButton>
      </Div>
      {formData && formData?.length > 0 && (
        <Div
          css={{
            display: "grid",
            gridTemplateColumns: `${rem(128)} 1fr`,
            rowGap: rem(10),
            fontSize: rem(14),
            paddingInlineEnd: rem(30),
            paddingBlock: rem(20),
            alignItems: "center",
            ".selectDay": {
              ".react-select__control": {
                border: "none",
                fontWeight: "bold",
              },
              ".react-select__single-value": {
                color: "$gray01",
              },
            },
          }}
        >
          {formData?.map((dailyWorkingHoursData, weekdayListIndex) => (
            <Fragment key={"day" + weekdayListIndex}>
              <Controller
                name={`openingTimes.${weekdayListIndex}.weekday`}
                control={control}
                render={() => (
                  <Dropdown
                    className="selectDay"
                    placeholder="요일 선택"
                    options={DAY_OPTIONS}
                    value={DAY_OPTIONS.find(
                      (option) => option.value === dailyWorkingHoursData.weekday
                    )}
                    onChange={(selectedWeekDayOption) => {
                      setValue(
                        `openingTimes.${weekdayListIndex}.weekday`,
                        selectedWeekDayOption?.value ?? "0"
                      );
                    }}
                  />
                )}
              />

              <Div css={{ justifySelf: "end" }}>
                {/* <IconButton
                  css={{ marginRight: rem(8), color: "$primary" }}
                  onClick={() => handleDayCopy(dailyWorkingHoursData)}
                >
                  요일 복사
                </IconButton> */}
                <IconButton
                  onClick={() => handleDayDelete(dailyWorkingHoursData.weekday)}
                >
                  요일 삭제
                </IconButton>
              </Div>
              <Controller
                name={`openingTimes.${weekdayListIndex}.hours`}
                control={control}
                render={() => (
                  <OpeningTimesList
                    initialHours={dailyWorkingHoursData.hours}
                    handleHoursChange={(hours) => {
                      setValue(`openingTimes.${weekdayListIndex}.hours`, hours);
                    }}
                  />
                )}
              />
            </Fragment>
          ))}
        </Div>
      )}
      {/* <NewOpeningTimesinfoForm count={count} /> */}
      <Div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          padding: rem(30),
          gap: rem(8),
          button: {
            height: rem(50),
            width: rem(166),
          },
        }}
      >
        <RoundedButton color="black" onClick={handleCancel}>
          취소
        </RoundedButton>
        <RoundedButton type="submit" color="orange">
          저장
        </RoundedButton>
      </Div>
      <DevTool control={control} />
    </Form>
  );
};
