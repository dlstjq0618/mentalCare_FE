import { OpeningHourItem } from "~/components";
import { Openingtime } from "~/interfaces";

export const toLabel = (string: string) => {
  const [h, m] = string.split(":");
  if (Number(h) > 12) {
    return [Number(h) - 12, m].join(":");
  }
  return [Number(h), m].join(":");
};

export const transformOpeningTimeForForm = (time: Openingtime) => {
  const weekday = String(time.weekday);
  const schedule1 = {
    start: {
      label: time.startTime.slice(0, 5),
      value: time.startTime.slice(0, 5),
    },
    end: {
      label: time.breakStTime.slice(0, 5),
      value: time.breakStTime.slice(0, 5),
    },
  };
  const schedule2 = {
    start: {
      label: time.breakEdTime.slice(0, 5),
      value: time.breakEdTime.slice(0, 5),
    },
    end: {
      label: time.endTime.slice(0, 5),
      value: time.endTime.slice(0, 5),
    },
  };

  return { id: time.id, weekday, hours: [schedule1, schedule2] };
};

export const transformOpeningTimesForRequest = (
  day: OpeningHourItem
): Partial<Openingtime> => ({
  weekday: Number(day.weekday),
  startTime: day.hours[0].start.value + ":00",
  endTime: day.hours[1] && day.hours[1].end.value + ":00",
  breakStTime: day.hours[0] && day.hours[0].end.value + ":00",
  breakEdTime: day.hours[1] && day.hours[1].start.value + ":00",
});
